import { useState, useEffect } from "react";
import { StoreLocationMap } from "./components/StoreLocationMap";
import { ControlPanel } from "./components/ControlPanel";
import { LocationDetail } from "./components/LocationDetail";
import { MobileLocationDetail } from "./components/MobileLocationDetail";
import { LocationComparison } from "./components/LocationComparison";
import { BudgetCalculator } from "./components/BudgetCalculator";
import { OnboardingTour } from "./components/OnboardingTour";
import { LoadingSkeleton } from "./components/LoadingSkeleton";
import {
  StoreType,
  WeightConfig,
  LocationData,
} from "./types/store";
import { getDefaultWeights } from "./utils/scoreCalculator";
import { BarChart3 } from "lucide-react";

export default function App() {
  const [storeType, setStoreType] =
    useState<StoreType>("beverage");
  const [weights, setWeights] = useState<WeightConfig>(
    getDefaultWeights("beverage"),
  );
  const [selectedLocation, setSelectedLocation] =
    useState<LocationData | null>(null);
  const [comparisonLocations, setComparisonLocations] =
    useState<LocationData[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [showBudgetCalculator, setShowBudgetCalculator] =
    useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // ���次訪問顯示引導和加載
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem(
      "hasSeenOnboarding",
    );

    // 模擬資料載入
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (!hasSeenOnboarding) {
        setShowOnboarding(true);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleStoreTypeChange = (newType: StoreType) => {
    setStoreType(newType);
    setWeights(getDefaultWeights(newType));
    setSelectedLocation(null);
  };

  const handleAddToComparison = () => {
    if (selectedLocation && comparisonLocations.length < 3) {
      if (
        !comparisonLocations.find(
          (loc) => loc.id === selectedLocation.id,
        )
      ) {
        setComparisonLocations([
          ...comparisonLocations,
          selectedLocation,
        ]);
      }
    }
  };

  const handleRemoveFromComparison = (id: string) => {
    setComparisonLocations(
      comparisonLocations.filter((loc) => loc.id !== id),
    );
  };

  const handleCloseOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem("hasSeenOnboarding", "true");
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="size-full relative">
      <StoreLocationMap
        storeType={storeType}
        weights={weights}
        onLocationSelect={setSelectedLocation}
      />
      <ControlPanel
        storeType={storeType}
        weights={weights}
        onStoreTypeChange={handleStoreTypeChange}
        onWeightsChange={setWeights}
        onShowOnboarding={() => setShowOnboarding(true)}
      />
      {selectedLocation && (
        <>
          <LocationDetail
            location={selectedLocation}
            storeType={storeType}
            onClose={() => setSelectedLocation(null)}
            onOpenBudgetCalculator={() =>
              setShowBudgetCalculator(true)
            }
            onAddToComparison={handleAddToComparison}
          />
          <MobileLocationDetail
            location={selectedLocation}
            storeType={storeType}
            onClose={() => setSelectedLocation(null)}
            onOpenBudgetCalculator={() =>
              setShowBudgetCalculator(true)
            }
            onAddToComparison={handleAddToComparison}
          />
        </>
      )}

      {/* 比較按鈕 */}
      {comparisonLocations.length > 0 && (
        <button
          onClick={() => setShowComparison(true)}
          className="absolute top-4 right-4 z-[1000] flex items-center gap-2 bg-purple-600 text-white px-4 py-3 rounded-lg shadow-2xl hover:bg-purple-700 transition-colors"
        >
          <BarChart3 className="size-5" />
          比較地點 ({comparisonLocations.length})
        </button>
      )}

      {/* 地點比較 */}
      {showComparison && (
        <LocationComparison
          locations={comparisonLocations}
          storeType={storeType}
          onClose={() => setShowComparison(false)}
          onRemoveLocation={handleRemoveFromComparison}
        />
      )}

      {/* 預算計算器 */}
      {showBudgetCalculator && selectedLocation && (
        <BudgetCalculator
          location={selectedLocation}
          storeType={storeType}
          onClose={() => setShowBudgetCalculator(false)}
        />
      )}

      {/* 新手引導 */}
      {showOnboarding && (
        <OnboardingTour onClose={handleCloseOnboarding} />
      )}
    </div>
  );
}