import { Store, Coffee, Sliders, ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';
import { StoreType, WeightConfig } from '../types/store';
import { PRESET_STRATEGIES } from '../types/strategy';
import { useState } from 'react';

interface ControlPanelProps {
  storeType: StoreType;
  weights: WeightConfig;
  onStoreTypeChange: (type: StoreType) => void;
  onWeightsChange: (weights: WeightConfig) => void;
  onShowOnboarding?: () => void;
}

export function ControlPanel({
  storeType,
  weights,
  onStoreTypeChange,
  onWeightsChange,
  onShowOnboarding
}: ControlPanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const handleWeightChange = (key: keyof WeightConfig, value: number) => {
    onWeightsChange({
      ...weights,
      [key]: value
    });
  };

  const handleStrategySelect = (strategyId: string) => {
    const strategy = PRESET_STRATEGIES.find(s => s.id === strategyId);
    if (strategy) {
      onWeightsChange(strategy.weights[storeType]);
    }
  };

  if (isCollapsed) {
    return (
      <div className="absolute top-4 left-4 z-[1000]">
        <button
          onClick={() => setIsCollapsed(false)}
          className="flex items-center gap-2 bg-white rounded-lg shadow-2xl p-3 hover:bg-gray-50 transition-colors"
        >
          <Store className="size-5 text-blue-600" />
          <ChevronRight className="size-4 text-gray-600" />
        </button>
      </div>
    );
  }

  const weightLabels = {
    beverage: {
      commerce: '商業群聚與競爭 (正向)',
      accessibility: '空間可達性與交通',
      population: '市場需求與人口'
    },
    breakfast: {
      commerce: '商業群聚 (避開競爭)',
      accessibility: '空間可達性 (步行距離)',
      population: '市場需求與人潮'
    }
  };

  const weightDescriptions = {
    beverage: {
      commerce: '互補店家密度、適度同業群聚',
      accessibility: '車站距離、公車站、人流量',
      population: '周邊常住人口數'
    },
    breakfast: {
      commerce: '競爭對手數量（越少越好）',
      accessibility: '住宅區距離（越近越好）',
      population: '居住人口與流動人潮'
    }
  };

  return (
    <div className="absolute top-4 left-4 z-[1000] bg-white rounded-xl shadow-2xl p-6 w-96 max-w-[calc(100vw-2rem)] max-h-[90vh] overflow-y-auto">
      {/* 標題 */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Store className="size-6 text-blue-600" />
            <h1 className="text-lg">選址評估系統</h1>
          </div>
          <button
            onClick={() => setIsCollapsed(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors md:hidden"
          >
            <ChevronLeft className="size-5 text-gray-600" />
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-1">雲林縣斗六市 | 數據驅動選址</p>
      </div>

      {/* 業態選擇 */}
      <div className="mb-6">
        <label className="block text-sm mb-3">選擇業態類型</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onStoreTypeChange('beverage')}
            className={`p-4 rounded-lg border-2 transition-all ${
              storeType === 'beverage'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Coffee className="size-6 mx-auto mb-2" />
            <div className="text-sm">手搖飲料店</div>
          </button>
          <button
            onClick={() => onStoreTypeChange('breakfast')}
            className={`p-4 rounded-lg border-2 transition-all ${
              storeType === 'breakfast'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Store className="size-6 mx-auto mb-2" />
            <div className="text-sm">早餐店</div>
          </button>
        </div>
      </div>

      {/* 策略選擇 */}
      <div className="mb-6">
        <label className="block text-sm mb-3">選擇預設策略</label>
        <div className="grid grid-cols-2 gap-3">
          {PRESET_STRATEGIES.map(strategy => (
            <button
              key={strategy.id}
              onClick={() => handleStrategySelect(strategy.id)}
              className={`p-3 rounded-lg border-2 transition-all text-left ${
                JSON.stringify(strategy.weights[storeType]) === JSON.stringify(weights)
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-xl mb-1">{strategy.icon}</div>
              <div className="text-xs leading-tight">{strategy.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 權重調整 */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-4">
          <Sliders className="size-5 text-gray-600" />
          <h3 className="text-sm">調整評估權重</h3>
        </div>

        {/* 商業群聚 */}
        <div className="mb-5">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm">{weightLabels[storeType].commerce}</label>
            <span className="text-sm px-2 py-1 bg-blue-100 text-blue-700 rounded">
              {weights.commerce}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={weights.commerce}
            onChange={(e) => handleWeightChange('commerce', Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <p className="text-xs text-gray-500 mt-1">
            {weightDescriptions[storeType].commerce}
          </p>
        </div>

        {/* 空間可達性 */}
        <div className="mb-5">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm">{weightLabels[storeType].accessibility}</label>
            <span className="text-sm px-2 py-1 bg-green-100 text-green-700 rounded">
              {weights.accessibility}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={weights.accessibility}
            onChange={(e) => handleWeightChange('accessibility', Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
          />
          <p className="text-xs text-gray-500 mt-1">
            {weightDescriptions[storeType].accessibility}
          </p>
        </div>

        {/* 市場需求 */}
        <div className="mb-5">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm">{weightLabels[storeType].population}</label>
            <span className="text-sm px-2 py-1 bg-purple-100 text-purple-700 rounded">
              {weights.population}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={weights.population}
            onChange={(e) => handleWeightChange('population', Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
          />
          <p className="text-xs text-gray-500 mt-1">
            {weightDescriptions[storeType].population}
          </p>
        </div>
      </div>

      {/* 權重總和提示 */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">權重總和</span>
          <span className={`${
            weights.commerce + weights.accessibility + weights.population === 100
              ? 'text-green-600'
              : 'text-orange-600'
          }`}>
            {weights.commerce + weights.accessibility + weights.population}%
          </span>
        </div>
        {weights.commerce + weights.accessibility + weights.population !== 100 && (
          <p className="text-xs text-orange-600 mt-1">
            建議權重總和為 100% 以獲得最佳評估結果
          </p>
        )}
      </div>

      {/* 說明 */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-xs text-blue-800 leading-relaxed">
          <strong>使用說明：</strong>調整權重後，地圖會即時更新熱力圖與推薦地點。
          點擊地圖上的標記可查看詳細商圈數據。
        </p>
      </div>

      {/* 折疊按鈕 */}
      <div className="mt-4">
        <button
          onClick={() => setIsCollapsed(true)}
          className="flex items-center gap-2 bg-white rounded-lg shadow-2xl p-3 hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft className="size-4 text-gray-600" />
          <Store className="size-5 text-blue-600" />
        </button>
      </div>

      {/* 說明按鈕 */}
      {onShowOnboarding && (
        <div className="mt-4">
          <button
            onClick={onShowOnboarding}
            className="flex items-center gap-2 bg-white rounded-lg shadow-2xl p-3 hover:bg-gray-50 transition-colors"
          >
            <HelpCircle className="size-4 text-gray-600" />
            <span className="text-sm text-gray-600">使用說明</span>
          </button>
        </div>
      )}
    </div>
  );
}