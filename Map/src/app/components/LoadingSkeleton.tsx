export function LoadingSkeleton() {
  return (
    <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-[5000]">
      <div className="text-center">
        {/* 動畫圖示 */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-blue-200 rounded-full animate-ping"></div>
          <div className="absolute inset-0 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-3xl">🗺️</div>
          </div>
        </div>
        
        {/* 載入文字 */}
        <h2 className="text-xl text-gray-800 mb-2">正在載入選址系統</h2>
        <p className="text-sm text-gray-600">準備為您分析最佳開店地點...</p>
        
        {/* 進度條 */}
        <div className="mt-6 w-64 mx-auto">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-[loading_1.5s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes loading {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
