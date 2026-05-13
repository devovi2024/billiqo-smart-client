import { Card, CardContent } from "../ui/card";

const StatCard = ({ title, value, icon, delta, trend }) => {
  return (
    <Card>
      <CardContent>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {title}
            </p>

            <h2 className="text-3xl font-semibold mt-2 text-slate-900 dark:text-white">
              {value}
            </h2>

            {delta && (
              <p
                className={`mt-3 text-sm font-medium ${
                  trend === "up"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {trend === "up" ? "▲" : "▼"} {delta} from last month
              </p>
            )}
          </div>

          <div className="rounded-3xl bg-slate-100 p-4 text-3xl text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;