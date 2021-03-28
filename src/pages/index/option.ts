import type {
  IChangeReasonRecord,
  IPigTypeRecord,
  IRecord,
} from '../../services/record';

// eslint-disable-next-line no-shadow
export enum PieChartType {
  time = 0,
  changeReason,
  pigType,
}

function getPieOptionWithTime(record: IRecord[]) {
  const res = record.filter((item) => {
    return item.period_type === 3;
  });

  const date_time = res.map((item) => {
    return item.date_time;
  });

  const pig_num = res.map((item) => {
    return item.pig_num;
  });

  const pig_weight = res.map((item) => {
    return item.pig_weight;
  });

  return {
    title: {
      text: '对比图',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a}\n{b} : {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['重量', '数量'],
    },
    xAxis: {
      type: 'category',
      data: date_time,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '重量',
        type: 'line',
        data: pig_weight,
        smooth: true,
      },
      {
        name: '数量',
        type: 'line',
        data: pig_num,
        smooth: true,
      },
    ],
  };
}

function getPieOptionWithChangeReason(record: IChangeReasonRecord[]) {
  const res = record.filter((item) => item.change_reason !== null);

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    legend: {
      data: ['重量', '数量'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: ['转群', '购入调拨', '转群', '出售（转出）', '死亡', '淘汰'],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: '重量',
        type: 'bar',
        data: res.map((item) => item.all_weight),
      },
      {
        name: '数量',
        type: 'bar',
        data: res.map((item) => item.all_num),
      },
    ],
  };
}

function getPieOptionWithPigType(record: IPigTypeRecord[]) {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    legend: {
      data: ['重量', '数量'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: ['公猪', '母猪'],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: '重量',
        type: 'bar',
        data: record.map((item) => item.all_weight),
      },
      {
        name: '数量',
        type: 'bar',
        data: record.map((item) => item.all_num),
      },
    ],
  };
}

export function getPieOption(
  record: IRecord[] | IChangeReasonRecord[] | IPigTypeRecord[],
  type: PieChartType = PieChartType.time,
) {
  if (type === PieChartType.time) {
    return getPieOptionWithTime(record as IRecord[]);
  }

  if (type === PieChartType.changeReason) {
    return getPieOptionWithChangeReason(record as IChangeReasonRecord[]);
  }

  if (type === PieChartType.pigType) {
    return getPieOptionWithPigType(record as IPigTypeRecord[]);
  }

  return {};
}
