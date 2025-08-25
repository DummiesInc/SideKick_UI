import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import type { LatLngExpression } from 'leaflet';
import {
  RequestMapDto,
  getInvestmentLocations
} from '@/src/utils/Services/MapService';
import { InvestmentPositionType } from '@/pages/map';

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

interface Props {
  investmentPositions: InvestmentPositionType[];
  setInvestmentPositions: Dispatch<SetStateAction<InvestmentPositionType[]>>;
}

const FranchiseFinder: FC<Props> = ({
  investmentPositions,
  setInvestmentPositions
}) => {
  const [icon, setIcon] = useState<any>(null);
  const [currentPosition, _setPosition] = useState<LatLngExpression>([
    41.252, -95.998
  ]);

  // ✅ Load Leaflet only on client
  useEffect(() => {
    (async () => {
      const L = await import('leaflet');
      setIcon(
        L.icon({
          iconUrl: '/images/map-icon.jpg',
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32]
        })
      );
    })();
  }, []);

  const handleBoundsChange = async (bounds: any) => {
    const { _northEast, _southWest } = bounds;

    const locationObj: RequestMapDto = {
      north: _northEast.lat,
      east: _northEast.lng,
      south: _southWest.lat,
      west: _southWest.lng
    };
    try {
      const data = await getInvestmentLocations(locationObj);
      setInvestmentPositions(
        data
          ? data?.map((item) => {
              const obj: InvestmentPositionType = {
                franchiseId: item.franchise.id,
                franchiseName: item.franchise.name,
                capiSize: item.franchise.capital.name,
                location: [item.latitude, item.longitude]
              };
              return obj;
            })
          : []
      );
    } catch (e) {
      setInvestmentPositions([]);
    }
  };

  return (
    <div style={{ height: '70vh', width: '100%' }}>
      <MapContainer
        center={currentPosition}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {icon &&
          investmentPositions?.map((pos, i) => (
            <Marker position={pos?.location} icon={icon}>
              <Popup>
                <h5>{`Franchise: ${pos.franchiseName}`}</h5>
                <p>{`Investment Range: ${pos.capiSize}`}</p>
              </Popup>
            </Marker>
          ))}
        <MapEventHandler onBoundsChange={handleBoundsChange} />
      </MapContainer>
    </div>
  );
};

export default FranchiseFinder;
