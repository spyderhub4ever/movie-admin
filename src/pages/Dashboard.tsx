import { Film, Star, TrendingUp, Users, type LucideIcon } from "lucide-react";

type StatColor = "purple" | "blue" | "yellow" | "green";

interface Stat {
  label: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: StatColor;
}

export default function Dashboard() {
  const stats: Stat[] = [
    {
      label: "Total Movies",
      value: "1,234",
      change: "+12%",
      icon: Film,
      color: "purple",
    },
    {
      label: "Active Users",
      value: "45.2K",
      change: "+8%",
      icon: Users,
      color: "blue",
    },
    {
      label: "Reviews This Month",
      value: "2,891",
      change: "+24%",
      icon: Star,
      color: "yellow",
    },
    {
      label: "Revenue",
      value: "$12.4K",
      change: "+15%",
      icon: TrendingUp,
      color: "green",
    },
  ];

  const colorClasses: Record<StatColor, string> = {
    purple: "from-purple-500 to-pink-500",
    blue: "from-blue-500 to-cyan-500",
    yellow: "from-yellow-400 to-orange-500",
    green: "from-green-400 to-emerald-500",
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-white mb-2">
          Welcome back, John! 🎬
        </h1>
        <p className="text-gray-300">
          Here's what's happening with your movie review platform today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${
                    colorClasses[stat.color]
                  } rounded-xl flex items-center justify-center`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-400 text-sm font-medium">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Recent Reviews
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center space-x-4 p-3 bg-gray-900/50 rounded-xl"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <Film className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-white">Inception</h3>
                  <p className="text-sm text-gray-400">
                    Reviewed by Alex Johnson
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Top Movies</h2>
          <div className="space-y-4">
            {[
              { title: "The Dark Knight", rating: 9.2, reviews: 1250 },
              { title: "Pulp Fiction", rating: 9.1, reviews: 980 },
              { title: "Inception", rating: 8.9, reviews: 1100 },
            ].map((movie, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-gray-900/50 rounded-xl"
              >
                <div>
                  <h3 className="font-medium text-white">{movie.title}</h3>
                  <p className="text-sm text-gray-400">
                    {movie.reviews} reviews
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-yellow-400">
                    {movie.rating}
                  </div>
                  <div className="text-xs text-gray-400">Rating</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
