import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import type { LatLngExpression } from 'leaflet';

// Dynamically import React-Leaflet
const MapContainer = dynamic(
  () => import('react-leaflet').then((m) => m.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((m) => m.TileLayer),
  { ssr: false }
);
const Marker = dynamic(() => import('react-leaflet').then((m) => m.Marker), {
  ssr: false
});
const Popup = dynamic(() => import('react-leaflet').then((m) => m.Popup), {
  ssr: false
});

const MapEventHandler = dynamic(() => import('./MapEvenHalder'), {
  ssr: false
});

const omahaCoordinates: [number, number][] = [
  [41.252, -95.998],
  [41.2581, -95.9755],
  [41.2475, -95.962],
  [41.2632, -95.985],
  [41.2503, -95.9704],
  [41.261, -95.96],
  [41.2458, -95.9785],
  [41.2595, -95.99],
  [41.2512, -95.9675],
  [41.257, -95.9723],
  [41.2485, -95.9821],
  [41.2533, -95.964],
  [41.2601, -95.9762],
  [41.249, -95.9698],
  [41.2545, -95.987],
  [41.2623, -95.9665],
  [41.2467, -95.981],
  [41.2587, -95.9582],
  [41.2529, -95.974],
  [41.2508, -95.968],
  [41.2615, -95.9785],
  [41.2479, -95.965],
  [41.2557, -95.9862],
  [41.2599, -95.971],
  [41.2483, -95.9805],
  [41.2537, -95.963],
  [41.2575, -95.975],
  [41.2517, -95.9672],
  [41.2608, -95.989],
  [41.2496, -95.9725]
];

const FranchiseFinder = () => {
  const [icon, setIcon] = useState<any>(null);
  const [position, setPosition] = useState<LatLngExpression>([41.252, -95.998]);

  // ✅ Load Leaflet only on client
  useEffect(() => {
    (async () => {
      const L = await import('leaflet');
      setIcon(
        L.icon({
          iconUrl: '/images/map-icon.jpg', // path relative to public/
          iconSize: [32, 32], // adjust size
          iconAnchor: [16, 32], // point of icon corresponding to marker position
          popupAnchor: [0, -32]
        })
      );
    })();
  }, []);

  const handleBoundsChange = async (bounds: any) => {
    // const { _northEast, _southWest } = bounds;

    // // Example: send bounding box to Rails API
    // const res = await fetch(`/api/locations?neLat=${_northEast.lat}&neLng=${_northEast.lng}&swLat=${_southWest.lat}&swLng=${_southWest.lng}`);
    // const data = await res.json();

    // // Expecting API returns [{ lat: 41.25, lng: -95.99 }, ...]
    // setMarkers(data.map((d: any) => [d.lat, d.lng]));
    console.log(bounds);
  };

  return (
    <div style={{ height: '70vh', width: '70%' }}>
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {icon &&
          omahaCoordinates.map((pos, i) => (
            <Marker position={pos} icon={icon}>
              <Popup>Custom JPEG Marker</Popup>
            </Marker>
          ))}
        <MapEventHandler onBoundsChange={handleBoundsChange} />
      </MapContainer>
    </div>
  );
};

export default FranchiseFinder;
