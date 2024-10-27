import React, { useEffect } from "react";
import { useGetAvgPollutantsQuery } from "../store/services/pollutantApi";
import { IAvgPollutant, IDevice, PollutantType } from "../types";
import { Moment } from "moment";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface PollutantProps {
  device: IDevice;
  selectedPollutant: IAvgPollutant | null;
  onSelectPollutant: (type: PollutantType, value: number) => void;
  currentDate: Moment;
  goToPreviousDay: () => void;
  goToNextDay: () => void;
}

const PolluatantDetails: React.FC<PollutantProps> = ({
  device,
  selectedPollutant,
  onSelectPollutant,
  currentDate,
  goToPreviousDay,
  goToNextDay,
}) => {
  const { data: pollutantData } = useGetAvgPollutantsQuery({ deviceId: device._id, date: "" });

  useEffect(() => {
    if (pollutantData) {
      onSelectPollutant("p1", pollutantData?.data?.p1);
    }
  }, [pollutantData]);

  return (
    <>
      {selectedPollutant !== null && (
        <div className="w-full mx-16 flex flex-col space-y-4">
          <h2 className="text-center font-semibold text-3xl">{`SES-${device.deviceNo}`}</h2>
          <div className="flex justify-center gap-4 items-center">
            <span className="text-3xl font-thin">{`PM ${
              selectedPollutant.type.split("p")[1]
            }`}</span>
            <span className="text-5xl font-bold">{selectedPollutant.value}</span>
          </div>
          <div className="flex justify-between items-center mx-8">
            <span onClick={() => goToPreviousDay()} className="text-4xl cursor-pointer">
              <MdKeyboardArrowLeft />
            </span>
            <span className="font-medium text-lg">{currentDate.format("D MMMM YYYY")}</span>
            <span onClick={() => goToNextDay()} className="text-4xl cursor-pointer">
              <MdKeyboardArrowRight />
            </span>
          </div>
          <div className="mx-8">
            <div
              onClick={() => onSelectPollutant("p1", pollutantData?.data.p1)}
              className={`cursor-pointer flex px-4 py-2 rounded-lg justify-between gap-16 ${
                selectedPollutant.type === "p1" ? "bg-gray-200" : ""
              }`}
            >
              <span className="font-semibold">PM 1</span>
              <span className="">{pollutantData?.data?.p1}</span>
            </div>
            <div
              onClick={() => onSelectPollutant("p25", pollutantData?.data.p25)}
              className={`cursor-pointer flex px-4 py-2 rounded-lg justify-between gap-16 ${
                selectedPollutant.type === "p25" ? "bg-gray-200" : ""
              }`}
            >
              <span className="font-semibold">PM 25</span>
              <span className="">{pollutantData?.data?.p25}</span>
            </div>
            <div
              onClick={() => onSelectPollutant("p10", pollutantData?.data.p10)}
              className={`cursor-pointer flex px-4 py-2 rounded-lg justify-between gap-16 ${
                selectedPollutant.type === "p10" ? "bg-gray-200" : ""
              }`}
            >
              <span className="font-semibold">PM 10</span>
              <span className="">{pollutantData?.data?.p10}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PolluatantDetails;
