import React, { useEffect, useRef, useState } from 'react';
import { View } from '@tarojs/components';
import { EChart } from 'echarts-taro3-react';

import { getPieOption } from './option';
import { getRecord, IRecord } from '../../services/record';

import './index.less';

const Pie: React.FC = () => {
  const refPieChart = useRef<any>();
  const [chartData, setChartData] = useState<IRecord[]>([]);

  const getRefPieChart = (node) => {
    refPieChart.current = node;
  };

  useEffect(() => {
    getRecord().then((item) => {
      if (item) {
        setChartData(() => item);
      }
    });
  }, []);

  useEffect(() => {
    const option = getPieOption(chartData);
    refPieChart.current?.refresh(option);
  }, [chartData]);

  return (
    <View className='pie-chart'>
      <EChart ref={getRefPieChart} canvasId='pie-chart' />
    </View>
  );
};

export default Pie;
