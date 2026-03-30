import { StoreType, WeightConfig, LocationData } from '../types/store';

/**
 * 根據業態類型和權重計算地點評分
 * 
 * 手搖飲料店權重預設：
 * - 商業群聚：50% (正向)
 * - 空間可達性：30% (正向)
 * - 市場需求：20% (正向)
 * 
 * 早餐店權重預設：
 * - 空間可達性：45% (距離越近越好)
 * - 市場需求：35% (正向)
 * - 商業群聚：20% (負向，避免競爭)
 */
export function calculateScore(
  location: LocationData,
  storeType: StoreType,
  weights: WeightConfig
): number {
  const { details } = location;
  
  // 正規化函數
  const normalize = (value: number, min: number, max: number) => {
    return Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  };
  
  let commerceScore = 0;
  let accessibilityScore = 0;
  let populationScore = 0;
  
  if (storeType === 'beverage') {
    // 手搖飲料店評分邏輯
    
    // 商業群聚分數（正向：互補店家多越好，同業適度群聚）
    const complementaryScore = normalize(details.complementaryStores, 0, 60);
    const competitorBonus = normalize(details.competitors, 0, 15); // 適度競爭有助於形成商圈
    commerceScore = (complementaryScore * 0.7 + competitorBonus * 0.3);
    
    // 空間可達性（交通便利性）
    const stationScore = normalize(2000 - details.distanceToStation, 0, 2000); // 距離越近越好
    const busScore = normalize(details.busStops, 0, 15);
    const trafficScore = details.trafficFlow === 'high' ? 100 : details.trafficFlow === 'medium' ? 60 : 30;
    accessibilityScore = (stationScore * 0.4 + busScore * 0.3 + trafficScore * 0.3);
    
    // 市場需求（人口數）
    populationScore = normalize(details.population, 0, 20000);
    
  } else {
    // 早餐店評分邏輯
    
    // 空間可達性（步行距離為關鍵，距離越近越好）
    const distancePenalty = details.distanceToStation > 200 ? 
      normalize(500 - details.distanceToStation, 0, 500) : 100;
    const residentialBonus = details.landUse === '住宅區' || details.landUse === '住商混合' ? 20 : 0;
    accessibilityScore = distancePenalty * 0.8 + residentialBonus * 0.2;
    
    // 市場需求（居住人口與流動人口）
    const popScore = normalize(details.population, 0, 20000);
    const flowBonus = details.trafficFlow === 'high' ? 30 : details.trafficFlow === 'medium' ? 15 : 0;
    populationScore = popScore * 0.7 + flowBonus * 0.3;
    
    // 商業群聚（負向：競爭對手越多扣分越多）
    const competitorPenalty = 100 - normalize(details.competitors, 0, 15);
    commerceScore = competitorPenalty;
  }
  
  // 加權計算總分
  const totalScore = (
    commerceScore * (weights.commerce / 100) +
    accessibilityScore * (weights.accessibility / 100) +
    populationScore * (weights.population / 100)
  );
  
  return Math.round(totalScore * 10) / 10; // 保留一位小數
}

/**
 * 根據業態類型獲取預設權重
 */
export function getDefaultWeights(storeType: StoreType): WeightConfig {
  if (storeType === 'beverage') {
    return {
      commerce: 50,
      accessibility: 30,
      population: 20
    };
  } else {
    return {
      commerce: 20,
      accessibility: 45,
      population: 35
    };
  }
}
