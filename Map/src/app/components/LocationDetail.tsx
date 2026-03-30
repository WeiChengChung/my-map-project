import { X, MapPin, Users, Store, Bus, Train, Banknote, Building2, TrendingUp, Calculator, BarChart3 } from 'lucide-react';
import { LocationData, StoreType } from '../types/store';
import { RadarChartComponent } from './RadarChart';

interface LocationDetailProps {
  location: LocationData;
  storeType: StoreType;
  onClose: () => void;
  onOpenBudgetCalculator?: () => void;
  onAddToComparison?: () => void;
}

export function LocationDetail({ location, storeType, onClose, onOpenBudgetCalculator, onAddToComparison }: LocationDetailProps) {
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

  return (
    <div className="absolute bottom-4 right-4 z-[1000] bg-white rounded-xl shadow-2xl w-96 max-h-[85vh] overflow-y-auto md:block hidden">
      {/* 標題區 */}
      <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-5 rounded-t-xl">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="size-5" />
              <h3>{location.name}</h3>
            </div>
            <p className="text-sm text-blue-100">
              {details.landUse} | {getTrafficFlowLabel(details.trafficFlow)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* 評分顯示 */}
        <div className="mt-4 flex items-center gap-3">
          <div className={`px-4 py-2 rounded-lg border-2 ${getScoreColor(location.score)}`}>
            <div className="text-xs opacity-80">綜合評分</div>
            <div className="text-2xl mt-1">{location.score}</div>
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

      {/* 詳細數據 */}
      <div className="p-5 space-y-4">
        {/* 雷達圖 */}
        <div>
          <h4 className="flex items-center gap-2 mb-3 text-sm">
            <BarChart3 className="size-4 text-gray-600" />
            各維度評分
          </h4>
          <div className="p-4 bg-gray-50 rounded-lg">
            <RadarChartComponent location={location} storeType={storeType} />
          </div>
        </div>

        {/* 商圈概況 */}
        <div>
          <h4 className="flex items-center gap-2 mb-3 text-sm">
            <Building2 className="size-4 text-gray-600" />
            商圈概況
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Store className="size-4 text-orange-600" />
                <span className="text-xs text-gray-600">競爭對手</span>
              </div>
              <div className="text-xl">{details.competitors} 家</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Store className="size-4 text-green-600" />
                <span className="text-xs text-gray-600">互補店家</span>
              </div>
              <div className="text-xl">{details.complementaryStores} 家</div>
            </div>
          </div>
          {storeType === 'beverage' && details.competitors > 0 && (
            <p className="text-xs text-gray-500 mt-2 p-2 bg-blue-50 rounded">
              💡 手搖飲料業具有集市效應，適度競爭有助於商圈形成
            </p>
          )}
          {storeType === 'breakfast' && details.competitors > 5 && (
            <p className="text-xs text-orange-600 mt-2 p-2 bg-orange-50 rounded">
              ⚠️ 早餐店競爭激烈，建議避開同業過度集中區域
            </p>
          )}
        </div>

        {/* 人口與市場 */}
        <div>
          <h4 className="flex items-center gap-2 mb-3 text-sm">
            <Users className="size-4 text-gray-600" />
            人口與市場
          </h4>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">周邊人口（500m）</span>
              <span className="text-lg">{details.population.toLocaleString()} 人</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full"
                style={{ width: `${Math.min((details.population / 20000) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* 交通可達性 */}
        <div>
          <h4 className="flex items-center gap-2 mb-3 text-sm">
            <Train className="size-4 text-gray-600" />
            交通可達性
          </h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Train className="size-4 text-blue-600" />
                <span className="text-sm">{details.nearestStation}</span>
              </div>
              <span className="text-sm">{details.distanceToStation}m</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Bus className="size-4 text-green-600" />
                <span className="text-sm">公車站牌</span>
              </div>
              <span className="text-sm">{details.busStops} 個</span>
            </div>
          </div>
          {storeType === 'breakfast' && details.distanceToStation > 500 && (
            <p className="text-xs text-orange-600 mt-2 p-2 bg-orange-50 rounded">
              ⚠️ 早餐店顧客以步行為主，建議距離住宅區 200m 內
            </p>
          )}
        </div>

        {/* 成本評估 */}
        <div>
          <h4 className="flex items-center gap-2 mb-3 text-sm">
            <Banknote className="size-4 text-gray-600" />
            成本評估
          </h4>
          <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">預估月租金</span>
              <span className="text-xl text-green-700">NT$ {details.averageRent.toLocaleString()}</span>
            </div>
            <p className="text-xs text-gray-500">
              基於周邊實價登錄資料推估
            </p>
          </div>
        </div>

        {/* 選址建議 */}
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="size-4 text-blue-600" />
            <span className="text-sm text-blue-900">選址建議</span>
          </div>
          <ul className="text-xs text-blue-800 space-y-1">
            {storeType === 'beverage' ? (
              <>
                <li>• 鄰近商圈與互補店家，可吸引逛街客流</li>
                <li>• 交通便利處有助於提升可見度</li>
                <li>• 考慮設置外送服務擴大商圈範圍</li>
              </>
            ) : (
              <>
                <li>• 優先選擇住宅區或辦公區 200m 內</li>
                <li>• 確保店面與主要人流在道路同側</li>
                <li>• 避開競爭過度激烈的區域</li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* 按鈕區 */}
      <div className="p-5 bg-gray-50 rounded-b-xl">
        <div className="flex justify-between">
          <button
            onClick={onAddToComparison}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            <BarChart3 className="size-4" />
            加入比較
          </button>
          <button
            onClick={onOpenBudgetCalculator}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg"
          >
            <Calculator className="size-4" />
            預算計算器
          </button>
        </div>
      </div>
    </div>
  );
}