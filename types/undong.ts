import {LapData} from './Posts/posts';

export type UndongType = {
  id: string;
  startdate: string;
  name?: string | undefined;
  reps?: [] | undefined;
  sets?: [] | LapData;
  enddate: string;
  ActiveTime: number | undefined;
  createType: string;
}[];

export type UndongItemType = {
  id: string;
  startdate: string;
  name?: string | undefined;
  reps?: [] | undefined;
  sets?: [] | LapData;
  enddate: string;
  ActiveTime: number | undefined;
  createType: string;
};
