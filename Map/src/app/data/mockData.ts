import { LocationData, HeatmapPoint } from '../types/store';

// 斗六市中心座標
export const DOULIU_CENTER: [number, number] = [23.7117, 120.5444];

// 模擬斗六市關鍵地點數據
export const mockLocations: LocationData[] = [
  {
    id: 'loc-1',
    position: [23.7117, 120.5444], // 斗六火車站
    name: '斗六火車站商圈',
    score: 0,
    details: {
      competitors: 8,
      complementaryStores: 45,
      population: 12500,
      busStops: 12,
      nearestStation: '斗六火車站',
      distanceToStation: 50,
      averageRent: 25000,
      landUse: '商業區',
      trafficFlow: 'high'
    }
  },
  {
    id: 'loc-2',
    position: [23.7008, 120.5326], // 雲科大
    name: '雲科大商圈',
    score: 0,
    details: {
      competitors: 12,
      complementaryStores: 38,
      population: 8500,
      busStops: 8,
      nearestStation: '斗六火車站',
      distanceToStation: 2100,
      averageRent: 18000,
      landUse: '文教區',
      trafficFlow: 'high'
    }
  },
  {
    id: 'loc-3',
    position: [23.7145, 120.5395], // 中山路商圈
    name: '中山路商圈',
    score: 0,
    details: {
      competitors: 6,
      complementaryStores: 52,
      population: 15000,
      busStops: 10,
      nearestStation: '斗六火車站',
      distanceToStation: 450,
      averageRent: 28000,
      landUse: '商業區',
      trafficFlow: 'high'
    }
  },
  {
    id: 'loc-4',
    position: [23.7080, 120.5500], // 太平路
    name: '太平路商圈',
    score: 0,
    details: {
      competitors: 5,
      complementaryStores: 28,
      population: 9500,
      busStops: 6,
      nearestStation: '斗六火車站',
      distanceToStation: 800,
      averageRent: 20000,
      landUse: '住商混合',
      trafficFlow: 'medium'
    }
  },
  {
    id: 'loc-5',
    position: [23.7160, 120.5480], // 明德路
    name: '明德路商圈',
    score: 0,
    details: {
      competitors: 4,
      complementaryStores: 22,
      population: 7800,
      busStops: 5,
      nearestStation: '斗六火車站',
      distanceToStation: 1200,
      averageRent: 16000,
      landUse: '住宅區',
      trafficFlow: 'medium'
    }
  }
];

// 生成熱力圖數據點（模擬斗六市各區域的商業活動密度）
export const generateHeatmapData = (locations: LocationData[]): HeatmapPoint[] => {
  const heatPoints: HeatmapPoint[] = [];
  
  // 為每個重點位置周圍生成熱力點
  locations.forEach(location => {
    const [baseLat, baseLng] = location.position;
    const intensity = location.score;
    
    // 中心點
    heatPoints.push({
      lat: baseLat,
      lng: baseLng,
      intensity: intensity
    });
    
    // 周圍散布點（模擬商圈範圍）
    const radius = 0.003; // 約300公尺
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI * 2 * i) / 8;
      const distance = radius * (0.5 + Math.random() * 0.5);
      heatPoints.push({
        lat: baseLat + Math.cos(angle) * distance,
        lng: baseLng + Math.sin(angle) * distance,
        intensity: intensity * (0.6 + Math.random() * 0.4)
      });
    }
  });
  
  return heatPoints;
};

// 競爭對手位置（模擬現有店家分佈）
export const competitorLocations = {
  beverage: [
    { name: '清心福全', position: [23.7120, 120.5450] as [number, number] },
    { name: '五十嵐', position: [23.7115, 120.5440] as [number, number] },
    { name: '迷客夏', position: [23.7010, 120.5330] as [number, number] },
    { name: '茶湯會', position: [23.7148, 120.5398] as [number, number] },
    { name: 'CoCo', position: [23.7012, 120.5328] as [number, number] },
    { name: '鮮茶道', position: [23.7082, 120.5505] as [number, number] }
  ],
  breakfast: [
    { name: '早安美芝城', position: [23.7118, 120.5447] as [number, number] },
    { name: '美而美', position: [23.7009, 120.5327] as [number, number] },
    { name: '麥味登', position: [23.7147, 120.5397] as [number, number] },
    { name: '弘爺漢堡', position: [23.7081, 120.5502] as [number, number] },
    { name: '拉亞漢堡', position: [23.7162, 120.5482] as [number, number] }
  ]
};
