interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

const sizeClasses = {
  sm: 'w-5 h-5',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

export default function LoadingSpinner({
  size = 'md',
  message,
}: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        role="status"
        className={`${sizeClasses[size]} border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin`}
      >
        <span className="sr-only">Loading</span>
      </div>
      {message && (
        <p className="text-violet-700 dark:text-violet-300 text-sm">
          {message}
        </p>
      )}
    </div>
  );
}
