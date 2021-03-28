import React, { useEffect, useRef, useState } from 'react';
import { View, Picker, CommonEventFunction } from '@tarojs/components';
import { PickerSelectorProps } from '@tarojs/components/types/Picker';
import { EChart } from 'echarts-taro3-react';

import { getPieOption } from './option';
import {
  getRecord,
  IChangeReasonRecord,
  IPigTypeRecord,
  IRecord,
} from '../../services/record';

import './index.less';

const typeRange = ['时间变化', '变动原因', '🐖类型'];

const Pie: React.FC = () => {
  const refPieChart = useRef<any>();
  const [chartData, setChartData] = useState<
    IRecord[] | IChangeReasonRecord[] | IPigTypeRecord[]
  >([]);
  const [currentType, setCurrentType] = useState<number>(0);

  const getRefPieChart = (node) => {
    refPieChart.current = node;
  };

  const typePickerChange: CommonEventFunction<PickerSelectorProps.ChangeEventDetail> = (
    e,
  ) => {
    const {
      detail: { value },
    } = e;

    setCurrentType(() => +value);
  };

  useEffect(() => {
    getRecord(currentType).then((item) => {
      if (item) {
        setChartData(() => item);
      }
    });
  }, [currentType]);

  useEffect(() => {
    const option = getPieOption(chartData, currentType);
    refPieChart.current?.refresh(option);
  }, [chartData, currentType]);

  return (
    <View className='warp'>
      <Picker mode='selector' range={typeRange} onChange={typePickerChange}>
        <View className='picker'>当前选择：{typeRange[currentType]}</View>
      </Picker>
      <EChart ref={getRefPieChart} canvasId='pie-chart' />
    </View>
  );
};

export default Pie;
