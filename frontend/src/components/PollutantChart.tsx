import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { useListPollutantsQuery } from "../store/services/pollutantApi";
import { Moment } from "moment";

interface PollutantProps {
  deviceId: string;
  pollutantType: string;
  currentDate: Moment;
}

const PollutantChart: React.FC<PollutantProps> = ({ deviceId, pollutantType, currentDate }) => {
  const { data: pollutantList } = useListPollutantsQuery({
    deviceId: deviceId,
    date: currentDate.toISOString(),
  });

  return (
    <>
      {pollutantList?.data && pollutantList?.data.length > 0 ? (
        <ResponsiveContainer height={500}>
          <LineChart data={pollutantList?.data}>
            <CartesianGrid strokeDasharray="10 10" />
            <XAxis dataKey="time" domain={[1, 24]} />
            <YAxis domain={[0, 100]} hide />
            <Line
              type="monotone"
              dataKey={pollutantType}
              stroke="black"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex justify-center items-center h-[500px] text-2xl font-bold text-gray-500 bg-gray-50">
          No data Found
        </div>
      )}
    </>
  );
};

export default PollutantChart;
