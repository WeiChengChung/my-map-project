// 業態類型
export type StoreType = 'beverage' | 'breakfast';

// 權重配置
export interface WeightConfig {
  commerce: number;      // 商業群聚
  accessibility: number; // 空間可達性
  population: number;    // 市場需求
}

// 地點數據
export interface LocationData {
  id: string;
  position: [number, number];
  name: string;
  score: number;
  details: LocationDetails;
}

// 商圈詳細資訊
export interface LocationDetails {
  competitors: number;        // 競爭對手數量
  complementaryStores: number; // 互補店家數量
  population: number;          // 周邊人口
  busStops: number;           // 公車站數量
  nearestStation: string;     // 最近車站
  distanceToStation: number;  // 車站距離(公尺)
  averageRent: number;        // 平均租金
  landUse: string;            // 土地使用分區
  trafficFlow: 'high' | 'medium' | 'low'; // 人流量
}

// 熱力圖數據點
export interface HeatmapPoint {
  lat: number;
  lng: number;
  intensity: number;
}
