import { PieChartType } from '../pages/index/option';
import request from '../utils/request';
import { baseURL } from './index';

export interface IRecord {
  change_reason: null | number;
  date_time: string;
  period_type: number;
  pig_num: number;
  pig_type: number;
  pig_weight: number;
}

export interface IChangeReasonRecord {
  all_num: number;
  all_weight: number;
  change_reason: number | null;
}

export interface IPigTypeRecord {
  all_num: number;
  all_weight: number;
  pig_type: number;
}

export async function getRecord(type: PieChartType = 0) {
  const urls = [
    'record',
    'record/group-by-change-reason',
    'record/group-by-pig-type',
  ];

  return await request.get<
    IRecord[] | IChangeReasonRecord[] | IPigTypeRecord[]
  >(`${baseURL}/${urls[type]}`, {});
}
