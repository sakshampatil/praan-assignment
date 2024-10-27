export interface IDevice {
  _id: string;
  userId: string;
  deviceNo: number;
  p1: number;
  p25: number;
  p10: number;
  __v: number;
}

export type PollutantType = "p1" | "p25" | "p10";

export interface IAvgPollutant {
  type: PollutantType;
  value: number;
}
