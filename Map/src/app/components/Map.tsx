import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { MapPin, Navigation } from 'lucide-react';

interface MarkerData {
  id: number;
  position: [number, number];
  title: string;
  marker?: L.Marker;
}

export function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [markers, setMarkers] = useState<MarkerData[]>([
    { id: 1, position: [25.0330, 121.5654], title: '台北 101' },
    { id: 2, position: [25.0478, 121.5170], title: '中正紀念堂' },
    { id: 3, position: [25.0919, 121.5598], title: '士林夜市' },
  ]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Create map instance
    const map = L.map(mapRef.current).setView([25.0330, 121.5654], 13);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add click handler
    map.on('click', (e: L.LeafletMouseEvent) => {
      const newMarker: MarkerData = {
        id: Date.now(),
        position: [e.latlng.lat, e.latlng.lng],
        title: `標記 ${markers.length + 1}`,
      };
      setMarkers(prev => [...prev, newMarker]);
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update markers
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const map = mapInstanceRef.current;

    // Clear existing markers and add new ones
    markers.forEach((markerData) => {
      if (!markerData.marker) {
        const marker = L.marker(markerData.position).addTo(map);
        marker.bindPopup(`
          <div style="text-align: center;">
            <strong>${markerData.title}</strong>
            <p style="font-size: 12px; color: #666; margin-top: 4px;">
              緯度: ${markerData.position[0].toFixed(4)}<br />
              經度: ${markerData.position[1].toFixed(4)}
            </p>
          </div>
        `);
        markerData.marker = marker;
      }
    });

    return () => {
      markers.forEach((markerData) => {
        if (markerData.marker) {
          markerData.marker.remove();
        }
      });
    };
  }, [markers]);

  // Update user location marker
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const map = mapInstanceRef.current;

    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
      userMarkerRef.current = null;
    }

    if (userLocation) {
      const marker = L.marker(userLocation).addTo(map);
      marker.bindPopup('<div style="text-align: center;"><strong>您的位置</strong></div>');
      userMarkerRef.current = marker;
      map.setView(userLocation, 13);
    }
  }, [userLocation]);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('無法獲取您的位置');
        }
      );
    } else {
      alert('您的瀏覽器不支持地理定位');
    }
  };

  return (
    <div className="relative w-full h-full">
      {/* Control Panel */}
      <div className="absolute top-4 right-4 z-[1000] bg-white rounded-lg shadow-lg p-4 space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="size-5" />
          <span>標記數量: {markers.length}</span>
        </div>
        <button
          onClick={handleGetLocation}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          <Navigation className="size-4" />
          定位我的位置
        </button>
        <div className="text-xs text-gray-600 text-center">
          點擊地圖添加標記
        </div>
      </div>

      {/* Map Container */}
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}