interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStyles = () => {
    switch (status.toLowerCase()) {
      case "upcoming":
        return "bg-green-500/20 text-green-400 border border-green-500/30";
      case "coming soon":
        return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30";
      case "past":
        return "bg-gray-500/20 text-gray-400 border border-gray-500/30";
      default:
        return "bg-blue-500/20 text-blue-400 border border-blue-500/30";
    }
  };

  return (
    <span
      className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${getStyles()}`}
    >
      {status}
    </span>
  );
}
