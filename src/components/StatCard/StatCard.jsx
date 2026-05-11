import { Card, CardContent } from "../ui/card";

const StatCard = ({ title, value, icon }) => {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm text-gray-500">
              {title}
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {value}
            </h2>
          </div>

          <div className="text-4xl">
            {icon}
          </div>

        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;