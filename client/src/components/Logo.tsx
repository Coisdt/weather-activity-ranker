import { CloudRain } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <CloudRain
        className="w-8 h-8 text-blue-600 dark:text-blue-400"
        strokeWidth={2}
      />
      <span className="text-2xl font-bold text-gray-900 dark:text-white">
        Weather Activity Ranker
      </span>
    </div>
  );
}
