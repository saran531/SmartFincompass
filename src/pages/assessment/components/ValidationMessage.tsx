interface ValidationMessageProps {
  message?: string;
}

export default function ValidationMessage({ message }: ValidationMessageProps) {
  if (!message) return null;
  return (
    <p className="mt-1.5 text-xs sm:text-sm font-semibold text-red-600 flex items-center gap-1">
      <span>⚠️</span>
      <span>{message}</span>
    </p>
  );
}

