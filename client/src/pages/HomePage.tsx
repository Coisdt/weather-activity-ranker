import SearchForm from "../components/SearchForm";
import ActivityCard from "../components/ActivityCard";
import { useActivityRankings } from "../hooks/useActivityRankings";
import type { DayRanking } from "../types";
import { useSearchCity } from "../hooks/useSearchCity";

function HomePage() {
  const { searchCity, handleSearch } = useSearchCity();
  const { loading, error, data, cityName } = useActivityRankings(searchCity);

  return (
    <>
      <SearchForm onSearch={handleSearch} />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Activity Rankings
            </h1>
            {cityName && (
              <p className="text-gray-600 dark:text-gray-400">{cityName}</p>
            )}
          </div>

          <div className="flex flex-col items-center gap-6">
            {data?.activityRankings?.rankings.map((ranking: DayRanking) => (
              <ActivityCard key={ranking.date} ranking={ranking} />
            ))}

            {loading && (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Loading...
                </p>
              </div>
            )}
            {error && (
              <div className="text-center py-12">
                <p className="text-lg text-red-600 dark:text-red-400">
                  Error: {error.message}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
