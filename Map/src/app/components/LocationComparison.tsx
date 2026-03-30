import { X, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { LocationData, StoreType } from '../types/store';

interface LocationComparisonProps {
  locations: LocationData[];
  storeType: StoreType;
  onClose: () => void;
  onRemoveLocation: (id: string) => void;
}

export function LocationComparison({ locations, storeType, onClose, onRemoveLocation }: LocationComparisonProps) {
  if (locations.length === 0) return null;

  const getComparisonIcon = (value: number, otherValues: number[]) => {
    const avg = otherValues.reduce((a, b) => a + b, 0) / otherValues.length;
    if (value > avg * 1.1) return <TrendingUp className="size-4 text-green-600" />;
    if (value < avg * 0.9) return <TrendingDown className="size-4 text-red-600" />;
    return <Minus className="size-4 text-gray-400" />;
  };

  const metrics = [
    { key: 'score', label: '綜合評分', format: (v: number) => v.toFixed(1) },
    { key: 'competitors', label: '競爭對手', format: (v: number) => `${v} 家` },
    { key: 'complementaryStores', label: '互補店家', format: (v: number) => `${v} 家` },
    { key: 'population', label: '周邊人口', format: (v: number) => `${v.toLocaleString()} 人` },
    { key: 'busStops', label: '公車站', format: (v: number) => `${v} 個` },
    { key: 'distanceToStation', label: '車站距離', format: (v: number) => `${v}m` },
    { key: 'averageRent', label: '預估租金', format: (v: number) => `NT$ ${v.toLocaleString()}` }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-[2000] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        {/* 標題 */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-xl flex justify-between items-center">
          <div>
            <h2 className="text-xl mb-1">地點比較分析</h2>
            <p className="text-sm text-purple-100">並排比較候選地點的各項指標</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="size-6" />
          </button>
        </div>

        {/* 比較表格 */}
        <div className="p-6 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-4 text-sm text-gray-600 sticky left-0 bg-white z-10">
                  評估項目
                </th>
                {locations.map((location, index) => (
                  <th key={location.id} className="py-4 px-4 min-w-[200px]">
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`size-8 rounded-full flex items-center justify-center text-white text-sm ${
                          index === 0 ? 'bg-red-500' : index === 1 ? 'bg-orange-500' : 'bg-green-500'
                        }`}>
                          {index + 1}
                        </span>
                        <span className="text-sm">{location.name}</span>
                      </div>
                      <button
                        onClick={() => onRemoveLocation(location.id)}
                        className="text-xs text-red-600 hover:text-red-700 hover:underline"
                      >
                        移除
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {metrics.map((metric) => {
                const values = locations.map(loc => 
                  metric.key === 'score' ? loc.score : (loc.details as any)[metric.key]
                );
                
                return (
                  <tr key={metric.key} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 text-sm sticky left-0 bg-white z-10">
                      {metric.label}
                    </td>
                    {locations.map((location, index) => {
                      const value = values[index];
                      const otherValues = values.filter((_, i) => i !== index);
                      
                      return (
                        <td key={location.id} className="py-4 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            {getComparisonIcon(value, otherValues)}
                            <span className="text-sm">{metric.format(value)}</span>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 說明 */}
        <div className="px-6 pb-6">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex gap-4 text-xs text-blue-800">
              <div className="flex items-center gap-1">
                <TrendingUp className="size-4 text-green-600" />
                <span>高於平均</span>
              </div>
              <div className="flex items-center gap-1">
                <Minus className="size-4 text-gray-400" />
                <span>接近平均</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingDown className="size-4 text-red-600" />
                <span>低於平均</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
