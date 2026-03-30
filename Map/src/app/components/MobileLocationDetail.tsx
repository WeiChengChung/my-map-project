import { X, MapPin, Users, Store, Bus, Train, Banknote, Building2, TrendingUp, Calculator, BarChart3, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { LocationData, StoreType } from '../types/store';
import { RadarChartComponent } from './RadarChart';

interface MobileLocationDetailProps {
  location: LocationData;
  storeType: StoreType;
  onClose: () => void;
  onOpenBudgetCalculator?: () => void;
  onAddToComparison?: () => void;
}

export function MobileLocationDetail({ location, storeType, onClose, onOpenBudgetCalculator, onAddToComparison }: MobileLocationDetailProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const { details } = location;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 60) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (score >= 40) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return '極佳';
    if (score >= 60) return '良好';
    if (score >= 40) return '普通';
    return '較差';
  };

  const getTrafficFlowLabel = (flow: string) => {
    switch (flow) {
      case 'high': return '高流量';
      case 'medium': return '中流量';
      case 'low': return '低流量';
      default: return '未知';
    }
  };

  if (!isExpanded) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-[1000] bg-white rounded-t-2xl shadow-2xl p-4 md:hidden">
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <MapPin className="size-5 text-blue-600" />
            <div className="text-left">
              <div className="text-sm">{location.name}</div>
              <div className="text-xs text-gray-500">評分：{location.score}</div>
            </div>
          </div>
          <ChevronDown className="size-5 text-gray-400 rotate-180" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[1000] bg-white rounded-t-2xl shadow-2xl max-h-[85vh] overflow-y-auto md:hidden">
      {/* 拖拽條 */}
      <div className="flex justify-center pt-2 pb-1">
        <div 
          className="w-12 h-1 bg-gray-300 rounded-full cursor-pointer"
          onClick={() => setIsExpanded(false)}
        />
      </div>

      {/* 標題區 */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="size-5" />
              <h3 className="text-lg">{location.name}</h3>
            </div>
            <p className="text-xs text-blue-100">
              {details.landUse} | {getTrafficFlowLabel(details.trafficFlow)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* 評分顯示 */}
        <div className="flex items-center gap-3">
          <div className={`px-3 py-2 rounded-lg border-2 ${getScoreColor(location.score)}`}>
            <div className="text-xs opacity-80">綜合評分</div>
            <div className="text-xl mt-1">{location.score}</div>
          </div>
          <div className="flex-1">
            <div className="text-xs text-blue-100 mb-1">評級：{getScoreLabel(location.score)}</div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all"
                style={{ width: `${Math.min(location.score, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 內容 */}
      <div className="p-4 space-y-4">
        {/* 快速操作按鈕 */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onAddToComparison}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg text-sm"
          >
            <BarChart3 className="size-4" />
            加入比較
          </button>
          <button
            onClick={onOpenBudgetCalculator}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg text-sm"
          >
            <Calculator className="size-4" />
            預算試算
          </button>
        </div>

        {/* 核心數據 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Store className="size-4 text-orange-600" />
              <span className="text-xs text-gray-600">競爭對手</span>
            </div>
            <div className="text-lg">{details.competitors} 家</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Users className="size-4 text-purple-600" />
              <span className="text-xs text-gray-600">周邊人口</span>
            </div>
            <div className="text-lg">{(details.population / 1000).toFixed(1)}k</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Bus className="size-4 text-green-600" />
              <span className="text-xs text-gray-600">公車站</span>
            </div>
            <div className="text-lg">{details.busStops} 個</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Banknote className="size-4 text-green-600" />
              <span className="text-xs text-gray-600">月租金</span>
            </div>
            <div className="text-lg">{(details.averageRent / 1000).toFixed(0)}k</div>
          </div>
        </div>

        {/* 提示訊息 */}
        {storeType === 'beverage' && details.competitors > 0 && (
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-800">
              💡 手搖飲料業具有集市效應，適度競爭有助於商圈形成
            </p>
          </div>
        )}
        {storeType === 'breakfast' && details.competitors > 5 && (
          <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-xs text-orange-800">
              ⚠️ 早餐店競爭激烈，建議避開同業過度集中區域
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
