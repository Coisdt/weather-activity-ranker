
export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  
  export function formatActivityName(activity: string): string {
    const s = activity.replace(/_/g, " ");
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  }
  
  export function getScoreColorClasses(score: number): {
    bg: string;
    text: string;
    dot: string;
  } {
    if (score >= 80) {
      return {
        bg: "bg-green-100 dark:bg-green-900/30",
        text: "text-green-700 dark:text-green-400",
        dot: "bg-green-500 dark:bg-green-400",
      };
    } else if (score >= 60) {
      return {
        bg: "bg-blue-100 dark:bg-blue-900/30",
        text: "text-blue-700 dark:text-blue-400",
        dot: "bg-blue-500 dark:bg-blue-400",
      };
    } else if (score >= 40) {
      return {
        bg: "bg-yellow-100 dark:bg-yellow-900/30",
        text: "text-yellow-700 dark:text-yellow-400",
        dot: "bg-yellow-500 dark:bg-yellow-400",
      };
    } else if (score >= 20) {
      return {
        bg: "bg-orange-100 dark:bg-orange-900/30",
        text: "text-orange-700 dark:text-orange-400",
        dot: "bg-orange-500 dark:bg-orange-400",
      };
    } else {
      return {
        bg: "bg-red-100 dark:bg-red-900/30",
        text: "text-red-700 dark:text-red-400",
        dot: "bg-red-500 dark:bg-red-400",
      };
    }
  }
  