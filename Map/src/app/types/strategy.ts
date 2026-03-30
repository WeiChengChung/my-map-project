import { WeightConfig } from './store';

export interface Strategy {
  id: string;
  name: string;
  description: string;
  icon: string;
  weights: {
    beverage: WeightConfig;
    breakfast: WeightConfig;
  };
}

export const PRESET_STRATEGIES: Strategy[] = [
  {
    id: 'student',
    name: '學生商圈策略',
    description: '高人口密度、適度交通、避免過度競爭',
    icon: '📚',
    weights: {
      beverage: { commerce: 30, accessibility: 30, population: 40 },
      breakfast: { commerce: 25, accessibility: 40, population: 35 }
    }
  },
  {
    id: 'office',
    name: '上班族商圈策略',
    description: '交通便利、商業群聚、中度人口',
    icon: '💼',
    weights: {
      beverage: { commerce: 45, accessibility: 40, population: 15 },
      breakfast: { commerce: 20, accessibility: 55, population: 25 }
    }
  },
  {
    id: 'residential',
    name: '住宅區策略',
    description: '高人口需求、低競爭、步行距離優先',
    icon: '🏘️',
    weights: {
      beverage: { commerce: 25, accessibility: 25, population: 50 },
      breakfast: { commerce: 10, accessibility: 40, population: 50 }
    }
  },
  {
    id: 'balanced',
    name: '均衡策略',
    description: '各維度平衡考量',
    icon: '⚖️',
    weights: {
      beverage: { commerce: 33, accessibility: 34, population: 33 },
      breakfast: { commerce: 33, accessibility: 34, population: 33 }
    }
  }
];