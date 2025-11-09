import {
  formatDate,
  formatActivityName,
  getScoreColorClasses, 
} from "@/utils";

const ActivityCard = (props: {
  ranking: {
    date: string;
    activities: { activity: string; reason: string; score: number }[];
  };
}) => {
  const { ranking } = props;

  // Sort activities by score (highest first)
  const sortedActivities = [...ranking.activities].sort(
    (a, b) => b.score - a.score
  );

  return (
    <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Day Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 px-6 py-4">
        <h2 className="text-xl font-bold text-white">
          {formatDate(ranking.date)}
        </h2>
      </div>

      {/* Activities List */}
      <div className="p-6 space-y-4">
        {sortedActivities.map((activity, index) => (
          <div
            key={activity.activity}
            className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
          >
            {/* Rank Badge */}
            <div className="shrink-0 w-10 h-10 rounded-full bg-blue-500 dark:bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
              {index + 1}
            </div>

            {/* Activity Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {formatActivityName(activity.activity)}
                </h3>
                {/* Score Badge */}
                {(() => {
                  const colorClasses = getScoreColorClasses(activity.score);
                  return (
                    <div
                      className={`shrink-0 px-3 py-1 rounded-full ${colorClasses.bg} ${colorClasses.text} text-sm font-medium flex items-center gap-2`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${colorClasses.dot}`}
                      />
                      <span>Score: {activity.score.toFixed(0)}</span>
                    </div>
                  );
                })()}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {activity.reason}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityCard;
