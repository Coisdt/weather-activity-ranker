import { GraduationCap, Glasses } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <GraduationCap
          className="w-8 h-8 text-blue-600 dark:text-blue-400"
          strokeWidth={2}
        />
        <Glasses
          className="w-5 h-5 text-gray-700 dark:text-gray-300 absolute -bottom-1 -right-1"
          strokeWidth={2}
        />
      </div>
      <span className="text-2xl font-bold text-gray-900 dark:text-white">
        Weather Activity Ranker
      </span>
    </div>
  );
}
