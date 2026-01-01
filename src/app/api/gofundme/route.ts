import { NextResponse } from 'next/server';

const GOFUNDME_URL =
  'https://www.gofundme.com/f/help-launch-discr-lost-disc-recovery-app-7s6kw';
const CACHE_DURATION_SECONDS = 600; // 10 minutes

interface CampaignData {
  title: string;
  amountRaised: number;
  goalAmount: number;
  donationCount: number;
  percentComplete: number;
  url: string;
}

// Exported for testing
export function extractNumber(text: string): number {
  const match = text.replace(/,/g, '').match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
}

// Exported for testing - strips HTML tags and comments to get plain text
export function stripHtml(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, '') // Remove HTML comments
    .replace(/<[^>]+>/g, ' ') // Remove HTML tags
    .replace(/\s+/g, ' '); // Normalize whitespace
}

function parseGoFundMePage(html: string): CampaignData | null {
  try {
    // Extract title from og:title meta tag
    const titleMatch = html.match(
      /<meta[^>]*property="og:title"[^>]*content="([^"]+)"/i
    );
    const title = titleMatch
      ? titleMatch[1].replace(' - GoFundMe', '').trim()
      : 'Help Launch Discr';

    // Strip HTML to get plain text for parsing amounts
    const plainText = stripHtml(html);

    // Look for amount raised - GoFundMe format: "$50 raised of 450"
    // Pattern 1: "$X raised of $Y" or "$X raised of Y" (goal may not have $)
    const progressMatch = plainText.match(
      /\$?([\d,]+)\s+raised\s+of\s+\$?([\d,]+)/i
    );

    let amountRaised = 0;
    let goalAmount = 450; // Default to known goal

    if (progressMatch) {
      amountRaised = extractNumber(progressMatch[1]);
      goalAmount = extractNumber(progressMatch[2]);
    } else {
      // Pattern 2: Look for separate raised and goal patterns
      const raisedMatch = plainText.match(/\$?([\d,]+)\s+raised/i);
      const goalMatch = plainText.match(/of\s+\$?([\d,]+)/i);

      if (raisedMatch) amountRaised = extractNumber(raisedMatch[1]);
      if (goalMatch) goalAmount = extractNumber(goalMatch[1]);
    }

    // Look for donation count
    const donationMatch = plainText.match(/([\d,]+)\s+donation/i);
    const donationCount = donationMatch ? extractNumber(donationMatch[1]) : 0;

    // Calculate percentage
    const percentComplete =
      goalAmount > 0 ? Math.round((amountRaised / goalAmount) * 100) : 0;

    return {
      title,
      amountRaised,
      goalAmount,
      donationCount,
      percentComplete,
      url: GOFUNDME_URL,
    };
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const response = await fetch(GOFUNDME_URL, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; DiscrBot/1.0; +https://discrapp.com)',
        Accept: 'text/html',
      },
      next: { revalidate: CACHE_DURATION_SECONDS },
    });

    if (!response.ok) {
      throw new Error(`GoFundMe returned ${response.status}`);
    }

    const html = await response.text();
    const data = parseGoFundMePage(html);

    if (!data) {
      // Return fallback data if parsing fails
      return NextResponse.json(
        {
          title: 'Help Launch Discr',
          amountRaised: 0,
          goalAmount: 450,
          donationCount: 0,
          percentComplete: 0,
          url: GOFUNDME_URL,
          fallback: true,
        },
        {
          headers: {
            'Cache-Control': `public, s-maxage=${CACHE_DURATION_SECONDS}, stale-while-revalidate`,
          },
        }
      );
    }

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': `public, s-maxage=${CACHE_DURATION_SECONDS}, stale-while-revalidate`,
      },
    });
  } catch (error) {
    console.error('Error fetching GoFundMe data:', error);

    // Return fallback data on error
    return NextResponse.json(
      {
        title: 'Help Launch Discr',
        amountRaised: 0,
        goalAmount: 450,
        donationCount: 0,
        percentComplete: 0,
        url: GOFUNDME_URL,
        error: true,
      },
      {
        status: 200, // Return 200 even on error so banner still shows
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate',
        },
      }
    );
  }
}
