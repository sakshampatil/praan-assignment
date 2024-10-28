import { useEffect, useState } from "react";
import { useCreateDeviceMutation, useListDevicesQuery } from "../store/services/deviceApi";
import { IAvgPollutant, IDevice, PollutantType } from "../types";
import PollutantChart from "../components/PollutantChart";
import PolluatantDetails from "../components/PolluatantDetails";
import moment, { Moment } from "moment";
import { ToastContainer, toast } from "react-toastify";
import { MdOutlineAddCircleOutline } from "react-icons/md";

const Dashboard = () => {
  const {
    data: devices,
    refetch,
    isError,
  } = useListDevicesQuery({}, { refetchOnMountOrArgChange: true });

  const [create, { isSuccess: isDeviceSuccess, isError: isDeviceError }] =
    useCreateDeviceMutation();

  const [selectedDevice, setSelectedDevice] = useState<IDevice | null>(null);
  const [selectedPollutant, setSelectedPollutant] = useState<IAvgPollutant | null>(null);
  const [currentDate, setCurrentDate] = useState<Moment>(moment());

  useEffect(() => {
    if (isDeviceSuccess) {
      toast.success("Success");
      refetch();
    } else if (isDeviceError) {
      toast.error("Failed");
    }
  }, [isDeviceSuccess, isDeviceError]);

  useEffect(() => {
    if (devices) {
      setSelectedDevice(devices?.data?.devices[0]);
    }
  }, [devices]);

  useEffect(() => {
    if (isError) {
      refetch();
    }
  }, [isError]);

  const goToPreviousDay = () => {
    setCurrentDate((prevDate) => moment(prevDate).subtract(1, "day"));
  };

  const goToNextDay = () => {
    setCurrentDate((prevDate) => moment(prevDate).add(1, "day"));
  };

  const handleDeviceClick = (device: IDevice) => {
    setSelectedDevice(device);
  };

  const onSelectPollutant = (type: PollutantType, value: number) => {
    setSelectedPollutant({ type, value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="mt-4">
        <div className="flex flex-row items-center gap-4 ml-16 mb-4">
          {devices?.data?.devices.map((ele: IDevice) => (
            <span
              key={ele._id}
              className={`text-lg cursor-pointer ${
                selectedDevice?._id === ele._id ? "font-semibold underline" : ""
              }`}
              onClick={() => handleDeviceClick(ele)}
            >{`Device-${ele.deviceNo}`}</span>
          ))}{" "}
          <span onClick={() => create({})} className="cursor-pointer text-gray-400 text-2xl">
            <MdOutlineAddCircleOutline />
          </span>
        </div>
        <div className="flex flex-row justify-between">
          <div className="w-[60%] mx-8">
            {selectedDevice !== null && (
              <PollutantChart
                currentDate={currentDate}
                pollutantType={selectedPollutant?.type ? selectedPollutant?.type : "p1"}
                deviceId={selectedDevice?._id}
              />
            )}
          </div>
          <div className="w-[40%] flex justify-center">
            {selectedDevice !== null && (
              <PolluatantDetails
                selectedPollutant={selectedPollutant}
                onSelectPollutant={onSelectPollutant}
                device={selectedDevice}
                currentDate={currentDate}
                goToPreviousDay={goToPreviousDay}
                goToNextDay={goToNextDay}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
