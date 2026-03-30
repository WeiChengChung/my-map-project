import { Radar, RadarChart as RechartsRadar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';
import { LocationData, StoreType } from '../types/store';

interface RadarChartProps {
  location: LocationData;
  storeType: StoreType;
}

export function RadarChartComponent({ location, storeType }: RadarChartProps) {
  const { details } = location;

  // 正規化函數
  const normalize = (value: number, min: number, max: number) => {
    return Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  };

  // 計算各維度評分
  const data = [
    {
      dimension: '商業群聚',
      score: normalize(details.complementaryStores, 0, 60),
      fullMark: 100
    },
    {
      dimension: '競爭程度',
      score: storeType === 'beverage' 
        ? normalize(details.competitors, 0, 15) // 飲料店：適度競爭是好事
        : 100 - normalize(details.competitors, 0, 15), // 早餐店：競爭越少越好
      fullMark: 100
    },
    {
      dimension: '交通便利',
      score: normalize(2000 - details.distanceToStation, 0, 2000),
      fullMark: 100
    },
    {
      dimension: '公車可達',
      score: normalize(details.busStops, 0, 15),
      fullMark: 100
    },
    {
      dimension: '人口密度',
      score: normalize(details.population, 0, 20000),
      fullMark: 100
    },
    {
      dimension: '人流量',
      score: details.trafficFlow === 'high' ? 100 : details.trafficFlow === 'medium' ? 60 : 30,
      fullMark: 100
    }
  ];

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadar data={data}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis 
            dataKey="dimension" 
            tick={{ fill: '#6b7280', fontSize: 12 }}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]} 
            tick={{ fill: '#9ca3af', fontSize: 10 }}
          />
          <Radar
            name="評分"
            dataKey="score"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.5}
          />
          <Legend 
            wrapperStyle={{ fontSize: '12px' }}
          />
        </RechartsRadar>
      </ResponsiveContainer>
    </div>
  );
}
