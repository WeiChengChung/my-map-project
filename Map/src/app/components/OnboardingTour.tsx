import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface OnboardingTourProps {
  onClose: () => void;
}

const TOUR_STEPS = [
  {
    title: '歡迎使用選址評估系統 🎉',
    content: '這是一個專為微型創業者打造的數據驅動選址工具，幫助您找到最適合開店的黃金地點。',
    image: '🗺️'
  },
  {
    title: '選擇業態類型 🏪',
    content: '先選擇您想開的店型（手搖飲料店或早餐店），系統會根據不同業態特性自動調整評估權重。',
    image: '☕'
  },
  {
    title: '調整評估權重 ⚖️',
    content: '拉動滑桿調整「商業群聚」、「交通可達性」、「人口需求」三大維度的權重，或直接選用預設策略方案。',
    image: '🎚️'
  },
  {
    title: '查看熱力圖與推薦 📍',
    content: '地圖會即時顯示潛力熱區（顏色越紅越好），並標示出 Top 3 推薦地點。點擊標記可查看詳細分析。',
    image: '🔥'
  },
  {
    title: '深度分析商圈 📊',
    content: '在詳細面板中查看雷達圖、競爭對手、人口數據、交通資訊、預估租金等完整商圈資訊。',
    image: '📈'
  },
  {
    title: '進階功能 🚀',
    content: '使用「地點��較」並排比較多個候選點、「預算計算器」試算投資回報、「自定義評估點」分析任意位置。',
    image: '⭐'
  }
];

export function OnboardingTour({ onClose }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = TOUR_STEPS[currentStep];

  return (
    <div className="fixed inset-0 bg-black/60 z-[3000] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        {/* 關閉按鈕 */}
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="size-5 text-gray-500" />
          </button>
        </div>

        {/* 內容 */}
        <div className="px-8 pb-8 text-center">
          {/* 圖示 */}
          <div className="text-7xl mb-6">{step.image}</div>

          {/* 標題 */}
          <h2 className="text-xl mb-4">{step.title}</h2>

          {/* 內容 */}
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            {step.content}
          </p>

          {/* 步驟指示器 */}
          <div className="flex justify-center gap-2 mb-6">
            {TOUR_STEPS.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentStep
                    ? 'w-8 bg-blue-600'
                    : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* 導航按鈕 */}
          <div className="flex gap-3">
            {currentStep > 0 && (
              <button
                onClick={handlePrev}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="size-5" />
                上一步
              </button>
            )}
            <button
              onClick={handleNext}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${
                currentStep === 0 ? 'w-full' : ''
              }`}
            >
              {currentStep === TOUR_STEPS.length - 1 ? '開始使用' : '下一步'}
              {currentStep < TOUR_STEPS.length - 1 && <ChevronRight className="size-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
