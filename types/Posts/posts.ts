export type UndongPost = {
  startdate: string;
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
