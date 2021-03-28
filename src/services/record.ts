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

export async function getRecord() {
  return await request.get<IRecord[]>(`${baseURL}/record`, {});
}
