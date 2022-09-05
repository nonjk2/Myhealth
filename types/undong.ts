import {LapData} from './Posts/posts';

export type UndongType = {
  startdate: string;
  name?: string | undefined;
  reps?: [] | undefined;
  sets?: [] | LapData;
  enddate: number;
  ActiveTime: number | undefined;
}[];

export type UndongItemType = {
  startdate: string;
  name?: string | undefined;
  reps?: [] | undefined;
  sets?: [] | LapData;
  enddate: number;
  ActiveTime: number | undefined;
};
