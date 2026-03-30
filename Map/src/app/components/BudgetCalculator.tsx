import { useState } from 'react';
import { X, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { LocationData, StoreType } from '../types/store';

interface BudgetCalculatorProps {
  location: LocationData;
  storeType: StoreType;
  onClose: () => void;
}

export function BudgetCalculator({ location, storeType, onClose }: BudgetCalculatorProps) {
  const [renovation, setRenovation] = useState(300000);
  const [equipment, setEquipment] = useState(storeType === 'beverage' ? 500000 : 200000);
  const [deposit, setDeposit] = useState(location.details.averageRent * 3);
  const [avgTicket, setAvgTicket] = useState(storeType === 'beverage' ? 60 : 80);
  const [dailyCustomers, setDailyCustomers] = useState(100);

  // 計算總投資
  const totalInvestment = renovation + equipment + deposit;

  // 預估月營收（考慮人流和競爭因素）
  const trafficMultiplier = location.details.trafficFlow === 'high' ? 1.2 : location.details.trafficFlow === 'medium' ? 1.0 : 0.8;
  const competitionImpact = storeType === 'beverage' 
    ? Math.min(1.2, 1 + location.details.competitors * 0.02) // 飲料店：競爭帶來人流
    : Math.max(0.7, 1 - location.details.competitors * 0.04); // 早餐店：競爭分散客源
  
  const estimatedDailyCustomers = Math.round(dailyCustomers * trafficMultiplier * competitionImpact);
  const monthlyRevenue = estimatedDailyCustomers * avgTicket * 26; // 假設每月營業26天

  // 預估月成本
  const monthlyCosts = {
    rent: location.details.averageRent,
    labor: storeType === 'beverage' ? 80000 : 60000, // 人事成本
    materials: monthlyRevenue * 0.35, // 原料成本約35%
    utilities: 8000, // 水電瓦斯
    other: 10000 // 雜支
  };
  const totalMonthlyCost = Object.values(monthlyCosts).reduce((a, b) => a + b, 0);

  // 月淨利與回本期
  const monthlyProfit = monthlyRevenue - totalMonthlyCost;
  const breakEvenMonths = monthlyProfit > 0 ? Math.ceil(totalInvestment / monthlyProfit) : Infinity;

  return (
    <div className="fixed inset-0 bg-black/50 z-[2000] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* 標題 */}
        <div className="sticky top-0 bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-t-xl">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="size-6" />
                <h2 className="text-xl">預算與投資回報試算</h2>
              </div>
              <p className="text-sm text-green-100">{location.name}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="size-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* 初期投資 */}
          <div>
            <h3 className="flex items-center gap-2 mb-4">
              <DollarSign className="size-5 text-gray-600" />
              初期投資成本
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <label className="text-sm">裝潢費用</label>
                <input
                  type="number"
                  value={renovation}
                  onChange={(e) => setRenovation(Number(e.target.value))}
                  className="w-32 px-3 py-2 border border-gray-300 rounded-lg text-sm text-right"
                />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <label className="text-sm">設備費用</label>
                <input
                  type="number"
                  value={equipment}
                  onChange={(e) => setEquipment(Number(e.target.value))}
                  className="w-32 px-3 py-2 border border-gray-300 rounded-lg text-sm text-right"
                />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <label className="text-sm">押金（3個月租金）</label>
                <input
                  type="number"
                  value={deposit}
                  onChange={(e) => setDeposit(Number(e.target.value))}
                  className="w-32 px-3 py-2 border border-gray-300 rounded-lg text-sm text-right"
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
                <span className="text-sm">總投資金額</span>
                <span className="text-xl text-blue-700">
                  NT$ {totalInvestment.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* 營收預估 */}
          <div>
            <h3 className="flex items-center gap-2 mb-4">
              <TrendingUp className="size-5 text-gray-600" />
              營收預估參數
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <label className="text-sm">平均客單價（元）</label>
                <input
                  type="number"
                  value={avgTicket}
                  onChange={(e) => setAvgTicket(Number(e.target.value))}
                  className="w-32 px-3 py-2 border border-gray-300 rounded-lg text-sm text-right"
                />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <label className="text-sm">預估日客數（基準）</label>
                <input
                  type="number"
                  value={dailyCustomers}
                  onChange={(e) => setDailyCustomers(Number(e.target.value))}
                  className="w-32 px-3 py-2 border border-gray-300 rounded-lg text-sm text-right"
                />
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-xs text-blue-800 mb-2">
                  <AlertCircle className="size-4 inline mr-1" />
                  根據商圈條件調整後
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-900">實際預估日客數</span>
                  <span className="text-lg text-blue-700">{estimatedDailyCustomers} 人</span>
                </div>
                <div className="text-xs text-blue-600 mt-1">
                  人流係數 {(trafficMultiplier * 100).toFixed(0)}% × 競爭影響 {(competitionImpact * 100).toFixed(0)}%
                </div>
              </div>
            </div>
          </div>

          {/* 月營收與成本 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-xs text-green-700 mb-1">預估月營收</div>
              <div className="text-2xl text-green-700">
                NT$ {monthlyRevenue.toLocaleString()}
              </div>
            </div>
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="text-xs text-red-700 mb-1">預估月成本</div>
              <div className="text-2xl text-red-700">
                NT$ {totalMonthlyCost.toLocaleString()}
              </div>
            </div>
          </div>

          {/* 成本細項 */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-3">月成本細項</div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span>租金</span>
                <span>NT$ {monthlyCosts.rent.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>人事</span>
                <span>NT$ {monthlyCosts.labor.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>原料（35%）</span>
                <span>NT$ {Math.round(monthlyCosts.materials).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>水電</span>
                <span>NT$ {monthlyCosts.utilities.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>雜支</span>
                <span>NT$ {monthlyCosts.other.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* 投資回報 */}
          <div className={`p-6 rounded-lg border-2 ${
            monthlyProfit > 0 
              ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300'
              : 'bg-gradient-to-r from-red-50 to-orange-50 border-red-300'
          }`}>
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">預估月淨利</div>
              <div className={`text-3xl mb-4 ${monthlyProfit > 0 ? 'text-green-700' : 'text-red-700'}`}>
                NT$ {monthlyProfit.toLocaleString()}
              </div>
              {monthlyProfit > 0 ? (
                <>
                  <div className="text-sm text-gray-600 mb-1">預估回本期間</div>
                  <div className="text-2xl text-blue-700">
                    {breakEvenMonths} 個月
                    <span className="text-sm text-gray-600 ml-2">
                      ({(breakEvenMonths / 12).toFixed(1)} 年)
                    </span>
                  </div>
                </>
              ) : (
                <div className="text-sm text-red-700">
                  ⚠️ 預估營收不足以覆蓋成本，建議重新評估
                </div>
              )}
            </div>
          </div>

          {/* 免責聲明 */}
          <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-xs text-yellow-800">
              <AlertCircle className="size-3 inline mr-1" />
              以上試算僅供參考，實際營運狀況會受季節、行銷、服務品質等多重因素影響，建議進行實地市調後再做決策。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
