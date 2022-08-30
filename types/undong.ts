import {labTime} from '../components/playUndong/timer';

export type UndongType = {
  id: number | 0;
  startdate: number;
  name?: string | undefined;
  reps?: [] | undefined;
  sets?: [] | labTime;
  enddate: number;
  ActiveTime: number | undefined;
}[];

export type UndongItemType = {
  id: number | 0;
  startdate: number;
  name?: string | undefined;
  reps?: [] | undefined;
  sets?: [] | labTime;
  enddate: number;
  ActiveTime: number | undefined;
};
