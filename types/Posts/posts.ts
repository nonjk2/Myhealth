export type UndongPost = {
  startdate: string;
  enddate: string;
  name: string;
  activetime: string;
  sets: LapData[];
};

export type LapData = {
  time: string;
  lap: number;
  restTime: string;
  activetime: string;
};

export type RequestLapData = {
  time: string;
  lap?: number;
  restTime: string;
  activetime: string;
};
export type ResponseUndongData = {
  activetime: string;
  createdAt: string;
  id: string;
  myid: string;
  name: string;
  sets: RequestLapData[];
  startdate: string;
  updatedAt: string;
  __v: number;
  _id: string;
}[];

export type ResponseUndongArrayData = {
  activetime: string;
  createdAt: string;
  id: string;
  myid: string;
  name: string;
  sets: RequestLapData[];
  startdate: string;
  updatedAt: string;
  __v: number;
  _id: string;
};
