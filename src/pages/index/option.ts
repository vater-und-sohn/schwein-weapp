import type { IRecord } from '../../services/record';

type PieChartType = 'pigType';

export function getPieOption(
  record: IRecord[],
  type: PieChartType = 'pigType',
) {
  const res: {
    name: string;
    value: number;
  }[] = [];

  if (type === 'pigType') {
    const maleRes = record
      .filter((item) => {
        return item.pig_type === 0;
      })
      .reduce((pre, cur) => {
        return pre + cur.pig_num;
      }, 0);

    const femaleRes = record
      .filter((item) => {
        return item.pig_type === 1;
      })
      .reduce((pre, cur) => {
        return pre + cur.pig_num;
      }, 0);

    res.push(
      {
        name: '公猪',
        value: maleRes,
      },
      {
        name: '母猪',
        value: femaleRes,
      },
    );
  }

  const option = {
    title: {
      text: '转入转出对比',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a}\n{b} : {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: res.map((item) => item.name),
    },
    series: [
      {
        name: '类型',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: res,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  return option;
}
