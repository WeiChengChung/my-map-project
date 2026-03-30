import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet.heat';
import { StoreType, WeightConfig, LocationData, HeatmapPoint } from '../types/store';
import { mockLocations, DOULIU_CENTER, generateHeatmapData, competitorLocations } from '../data/mockData';
import { calculateScore } from '../utils/scoreCalculator';

interface StoreLocationMapProps {
  storeType: StoreType;
  weights: WeightConfig;
  onLocationSelect: (location: LocationData) => void;
  customLocations?: LocationData[];
  onAddCustomLocation?: (location: LocationData) => void;
}

// 擴展 Leaflet 類型以支援 heatLayer
declare module 'leaflet' {
  function heatLayer(
    latlngs: [number, number, number][],
    options?: any
  ): L.Layer;
}

export function StoreLocationMap({ storeType, weights, onLocationSelect, customLocations, onAddCustomLocation }: StoreLocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const heatLayerRef = useRef<L.Layer | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const competitorMarkersRef = useRef<L.Marker[]>([]);
  const [scoredLocations, setScoredLocations] = useState<LocationData[]>([]);
  const [mapReady, setMapReady] = useState(false);

  // 計算所有地點的評分
  useEffect(() => {
    const updated = mockLocations.map(location => ({
      ...location,
      score: calculateScore(location, storeType, weights)
    }));
    setScoredLocations(updated);
  }, [storeType, weights]);

  // 初始化地圖
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current).setView(DOULIU_CENTER, 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // 等待地圖完全加載
    map.whenReady(() => {
      // 強制地圖重新計算尺寸
      setTimeout(() => {
        map.invalidateSize();
        setMapReady(true);
      }, 100);
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      setMapReady(false);
    };
  }, []);

  // 更新熱力圖
  useEffect(() => {
    if (!mapInstanceRef.current || !mapReady || scoredLocations.length === 0) return;

    const map = mapInstanceRef.current;

    // 移除舊的熱力圖
    if (heatLayerRef.current) {
      map.removeLayer(heatLayerRef.current);
      heatLayerRef.current = null;
    }

    // 確保地圖容器有有效的尺寸
    const container = map.getContainer();
    if (!container || container.offsetWidth === 0 || container.offsetHeight === 0) {
      console.warn('Map container has no size, skipping heatmap');
      return;
    }

    try {
      // 生成熱力圖數據
      const heatData = generateHeatmapData(scoredLocations);
      const heatPoints: [number, number, number][] = heatData.map(point => [
        point.lat,
        point.lng,
        point.intensity / 100 // 正規化到 0-1
      ]);

      // 創建新的熱力圖層
      const heatLayer = L.heatLayer(heatPoints, {
        radius: 25,
        blur: 20,
        maxZoom: 17,
        max: 1.0,
        gradient: {
          0.0: '#3b82f6',
          0.3: '#06b6d4',
          0.5: '#10b981',
          0.7: '#fbbf24',
          1.0: '#ef4444'
        }
      }).addTo(map);

      heatLayerRef.current = heatLayer;
    } catch (error) {
      console.error('Error creating heatmap:', error);
    }
  }, [scoredLocations, mapReady]);

  // 更新推薦地點標記
  useEffect(() => {
    if (!mapInstanceRef.current || !mapReady || scoredLocations.length === 0) return;

    const map = mapInstanceRef.current;

    // 清除舊標記
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // 排序並取前3名
    const topLocations = [...scoredLocations]
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    // 為每個推薦地點添加標記
    topLocations.forEach((location, index) => {
      const rank = index + 1;
      const color = rank === 1 ? '#ef4444' : rank === 2 ? '#f59e0b' : '#10b981';
      
      // 創建自定義圖標
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            background: ${color};
            width: 40px;
            height: 40px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 3px solid white;
            box-shadow: 0 4px 6px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="
              transform: rotate(45deg);
              color: white;
              font-weight: bold;
              font-size: 16px;
            ">
              ${rank}
            </div>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
      });

      const marker = L.marker(location.position, { icon })
        .addTo(map)
        .bindPopup(`
          <div style="min-width: 200px;">
            <div style="font-weight: bold; margin-bottom: 8px; font-size: 14px;">
              ${rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉'} ${location.name}
            </div>
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 8px; border-radius: 6px; margin-bottom: 8px;">
              <div style="font-size: 12px; opacity: 0.9;">綜合評分</div>
              <div style="font-size: 24px; font-weight: bold;">${location.score}</div>
            </div>
            <div style="font-size: 12px; color: #666; line-height: 1.6;">
              <div>📍 ${location.details.landUse}</div>
              <div>👥 周邊人口 ${location.details.population.toLocaleString()} 人</div>
              <div>🏪 競爭對手 ${location.details.competitors} 家</div>
            </div>
            <button 
              onclick="window.dispatchEvent(new CustomEvent('locationSelect', { detail: '${location.id}' }))"
              style="
                margin-top: 12px;
                width: 100%;
                padding: 8px;
                background: #3b82f6;
                color: white;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-size: 12px;
                font-weight: 500;
              "
            >
              查看詳細分析
            </button>
          </div>
        `);

      markersRef.current.push(marker);
    });
  }, [scoredLocations, mapReady]);

  // 更新競爭對手標記
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const map = mapInstanceRef.current;

    // 清除舊的競爭對手標記
    competitorMarkersRef.current.forEach(marker => marker.remove());
    competitorMarkersRef.current = [];

    // 添加競爭對手標記
    const competitors = competitorLocations[storeType];
    
    const competitorIcon = L.divIcon({
      className: 'competitor-marker',
      html: `
        <div style="
          background: #6b7280;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        "></div>
      `,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

    competitors.forEach(competitor => {
      const marker = L.marker(competitor.position, { icon: competitorIcon })
        .addTo(map)
        .bindPopup(`
          <div style="text-align: center;">
            <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">
              現有${storeType === 'beverage' ? '飲料店' : '早餐店'}
            </div>
            <div style="font-weight: bold;">${competitor.name}</div>
          </div>
        `);
      
      competitorMarkersRef.current.push(marker);
    });
  }, [storeType]);

  // 監聽地點選擇事件
  useEffect(() => {
    const handleLocationSelect = (e: Event) => {
      const customEvent = e as CustomEvent;
      const locationId = customEvent.detail;
      const location = scoredLocations.find(loc => loc.id === locationId);
      if (location) {
        onLocationSelect(location);
      }
    };

    window.addEventListener('locationSelect', handleLocationSelect);
    return () => window.removeEventListener('locationSelect', handleLocationSelect);
  }, [scoredLocations, onLocationSelect]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full" />
      
      {/* 圖例 */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-white rounded-lg shadow-lg p-4">
        <h4 className="text-sm mb-3">圖例說明</h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-red-500 border-2 border-white shadow flex items-center justify-center text-white text-xs">1</div>
            <span>Top 3 推薦地點（數字為排名）</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gray-500 border-2 border-white"></div>
            <span>現有{storeType === 'beverage' ? '飲料店' : '早餐店'}位置</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-4 h-4 bg-blue-500"></div>
              <div className="w-4 h-4 bg-cyan-400"></div>
              <div className="w-4 h-4 bg-green-500"></div>
              <div className="w-4 h-4 bg-yellow-400"></div>
              <div className="w-4 h-4 bg-red-500"></div>
            </div>
            <span>熱力圖（低→高潛力）</span>
          </div>
        </div>
      </div>
    </div>
  );
}