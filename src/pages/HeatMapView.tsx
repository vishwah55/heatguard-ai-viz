import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import { Search, LocateFixed } from "lucide-react";

// Mock heat grid data
const generateGridCells = () => {
  const cells = [];
  const baseLat = 28.6139; // Delhi
  const baseLng = 77.209;
  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 15; j++) {
      const temp = 30 + Math.random() * 20;
      const humidity = 30 + Math.random() * 50;
      const vulnerability = Math.random() * 100;
      cells.push({
        lat: baseLat + (i - 7) * 0.015,
        lng: baseLng + (j - 7) * 0.015,
        temperature: Math.round(temp * 10) / 10,
        humidity: Math.round(humidity),
        vulnerability_score: Math.round(vulnerability),
        heat_index: Math.round((temp + humidity * 0.3) * 10) / 10,
        updated_at: new Date().toISOString(),
      });
    }
  }
  return cells;
};

const getColor = (temp: number) => {
  if (temp < 35) return "#22c55e";
  if (temp < 40) return "#eab308";
  if (temp < 45) return "#f97316";
  return "#ef4444";
};

const HeatMapView = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const [search, setSearch] = useState("");
  const [cells] = useState(generateGridCells);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center: [28.6139, 77.209],
      zoom: 12,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/">OSM</a>',
    }).addTo(map);

    cells.forEach((cell) => {
      const color = getColor(cell.temperature);
      L.circleMarker([cell.lat, cell.lng], {
        radius: 12,
        fillColor: color,
        color: color,
        weight: 1,
        opacity: 0.8,
        fillOpacity: 0.5,
      })
        .bindPopup(
          `<div style="font-family: Inter, sans-serif; min-width: 160px;">
            <div style="font-weight:700;font-size:14px;margin-bottom:8px;">Grid Cell</div>
            <div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span style="opacity:0.7">Temp</span><span style="font-weight:600">${cell.temperature}°C</span></div>
            <div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span style="opacity:0.7">Humidity</span><span style="font-weight:600">${cell.humidity}%</span></div>
            <div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span style="opacity:0.7">Vulnerability</span><span style="font-weight:600;color:${color}">${cell.vulnerability_score}</span></div>
            <div style="display:flex;justify-content:space-between;"><span style="opacity:0.7">Heat Index</span><span style="font-weight:600">${cell.heat_index}</span></div>
            <div style="margin-top:8px;font-size:11px;opacity:0.5">Updated: Just now</div>
          </div>`
        )
        .addTo(map);
    });

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, [cells]);

  const handleLocate = () => {
    navigator.geolocation?.getCurrentPosition((pos) => {
      mapInstance.current?.setView([pos.coords.latitude, pos.coords.longitude], 13);
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple city search demo
    const cities: Record<string, [number, number]> = {
      delhi: [28.6139, 77.209],
      mumbai: [19.076, 72.8777],
      chennai: [13.0827, 80.2707],
      kolkata: [22.5726, 88.3639],
      bangalore: [12.9716, 77.5946],
    };
    const found = cities[search.toLowerCase()];
    if (found) mapInstance.current?.setView(found, 12);
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="font-display text-3xl font-bold mb-2">
            Live <span className="text-gradient-heat">Heat Map</span>
          </h1>
          <p className="text-muted-foreground">Real-time temperature and vulnerability grid overlay</p>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <form onSubmit={handleSearch} className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search city (Delhi, Mumbai, Chennai...)"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <button type="submit" className="px-6 py-3 rounded-xl gradient-primary text-primary-foreground font-medium">
              Search
            </button>
          </form>
          <button onClick={handleLocate} className="flex items-center gap-2 px-6 py-3 rounded-xl glass-card text-foreground hover:bg-muted/50 transition-colors">
            <LocateFixed className="w-4 h-4" /> Locate Me
          </button>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-heat-safe" /> &lt;35°C</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-heat-moderate" /> 35-40°C</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full" style={{ background: "#f97316" }} /> 40-45°C</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-heat-danger" /> &gt;45°C</span>
        </div>

        {/* Map */}
        <div className="rounded-2xl overflow-hidden border border-border/40 shadow-2xl" style={{ height: "65vh" }}>
          <div ref={mapRef} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default HeatMapView;
