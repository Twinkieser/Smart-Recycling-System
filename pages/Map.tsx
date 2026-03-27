
import React, { useEffect, useState, useRef } from 'react';
import { Card, Badge, ProgressBar } from '../components/UI';
import { WasteContainer, WasteCategory } from '../types';

interface ExtendedContainer extends WasteContainer {
  temp: number;
  humidity: number;
  lastUpdated: string;
}

const SAMPLE_CONTAINERS: ExtendedContainer[] = [
  { id: '1', name: 'Bayterek Center', type: WasteCategory.PLASTIC, lat: 51.1283, lng: 71.4305, address: 'Nur-Zhol Blvd 14', fillLevel: 0.65, status: 'available', temp: 22, humidity: 45, lastUpdated: '5 min ago' },
  { id: '2', name: 'Khan Shatyr Bin', type: WasteCategory.GLASS, lat: 51.1325, lng: 71.4038, address: 'Turan Ave 37', fillLevel: 0.20, status: 'available', temp: 19, humidity: 30, lastUpdated: '12 min ago' },
  { id: '3', name: 'Opera House Point', type: WasteCategory.METAL, lat: 51.1350, lng: 71.4110, address: 'Turan Ave 2', fillLevel: 0.95, status: 'full', temp: 28, humidity: 60, lastUpdated: '1 min ago' },
  { id: '4', name: 'Mega Silk Way', type: WasteCategory.PAPER, lat: 51.0888, lng: 71.4147, address: 'Kabanbay Batyr Ave 62', fillLevel: 0.40, status: 'available', temp: 21, humidity: 40, lastUpdated: '30 min ago' },
  { id: '5', name: 'Expo District', type: WasteCategory.ORGANIC, lat: 51.0920, lng: 71.4230, address: 'Mangilik El Ave 53', fillLevel: 0.10, status: 'available', temp: 25, humidity: 75, lastUpdated: '2 min ago' },
];

const Map: React.FC = () => {
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<string>('All');
  const [selectedContainer, setSelectedContainer] = useState<ExtendedContainer | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    const L = (window as any).L;
    if (!L) return;

    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current, { zoomControl: false }).setView([51.1283, 71.4305], 13);
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; CartoDB'
      }).addTo(mapRef.current);
      L.control.zoom({ position: 'bottomright' }).addTo(mapRef.current);
    }

    mapRef.current.eachLayer((layer: any) => {
      if (layer instanceof L.Marker) mapRef.current.removeLayer(layer);
    });

    SAMPLE_CONTAINERS.filter(c => filter === 'All' || c.type === filter).forEach(container => {
      const color = container.status === 'full' ? '#EF4444' : '#2C6EED';
      const icon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="background-color: ${color}; width: 14px; height: 14px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7]
      });

      const marker = L.marker([container.lat, container.lng], { icon }).addTo(mapRef.current);
      marker.on('click', () => setSelectedContainer(container));
    });
  }, [filter]);

  const categories = ['All', ...Object.values(WasteCategory)];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Smart City Map</h1>
          <p className="text-gray-500 font-medium">Real-time IoT data for container availability.</p>
        </div>
        <div className="flex gap-2 p-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto max-w-full">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                filter === cat ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow h-[650px] bg-white rounded-[2rem] shadow-2xl shadow-blue-50/50 overflow-hidden relative border border-gray-100">
          <div ref={mapContainerRef} className="w-full h-full"></div>
          
          {/* Map Overlay Info */}
          <div className="absolute top-6 left-6 z-[1000] bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white shadow-xl pointer-events-none hidden md:block">
            <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-3">Live Fleet Status</h4>
            <div className="space-y-2 text-[10px] font-bold">
               <div className="flex items-center gap-2 text-green-600"><span className="w-2 h-2 rounded-full bg-green-500"></span> 12 Available</div>
               <div className="flex items-center gap-2 text-amber-600"><span className="w-2 h-2 rounded-full bg-amber-500"></span> 3 Near Full</div>
               <div className="flex items-center gap-2 text-red-600"><span className="w-2 h-2 rounded-full bg-red-500"></span> 2 Maintenance</div>
            </div>
          </div>
        </div>

        {selectedContainer ? (
          <div className="lg:w-96 animate-in slide-in-from-right duration-300">
            <Card title="Container Hub #ID" subtitle={`Synced: ${selectedContainer.lastUpdated}`}>
              <div className="space-y-6">
                <div>
                  <h4 className="font-black text-gray-900 text-xl">{selectedContainer.name}</h4>
                  <p className="text-sm text-gray-500 font-medium">{selectedContainer.address}</p>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <Badge category={selectedContainer.type} />
                  <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${
                    selectedContainer.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {selectedContainer.status}
                  </span>
                </div>

                <ProgressBar 
                  value={selectedContainer.fillLevel} 
                  label="Fill Level" 
                  color={selectedContainer.fillLevel > 0.8 ? 'bg-red-500' : 'bg-green-500'} 
                />

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                    <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Internal Temp</p>
                    <p className="text-xl font-black text-blue-700">{selectedContainer.temp}°C</p>
                  </div>
                  <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100">
                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Humidity</p>
                    <p className="text-xl font-black text-indigo-700">{selectedContainer.humidity}%</p>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                   <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95">
                    Navigate to Location
                  </button>
                  <button className="w-full py-3 bg-white border border-gray-100 text-gray-400 rounded-2xl font-bold text-sm hover:bg-gray-50 transition-colors">
                    Report Issue
                  </button>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <div className="lg:w-96 hidden lg:flex items-center justify-center p-8 border-4 border-dashed border-gray-100 rounded-[2rem] text-center">
            <div className="space-y-4">
              <div className="text-4xl">📍</div>
              <p className="text-sm text-gray-400 font-bold uppercase tracking-widest leading-loose">Select a point on the map<br/>to view IoT details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Map;
