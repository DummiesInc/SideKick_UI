import 'leaflet/dist/leaflet.css';
import FranchiseFinder from '@/src/components/Map/FranchiseFinder';
import { useEffect, useState } from 'react';

export interface InvestmentPositionType {
  franchiseId: number;
  franchiseName: string;
  capiSize: string;
  location: [number, number];
}

export default function MapPage() {
  const [investmentPositions, setInvestmentPositions] = useState<
    InvestmentPositionType[]
  >([]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    handler(); // check immediately
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return (
    <div
      style={{
        height: '70vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2
      }}
    >
      <div
        style={{
          width: isMobile ? '100%' : '70%'
        }}
      >
        <FranchiseFinder
          investmentPositions={investmentPositions}
          setInvestmentPositions={setInvestmentPositions}
        />
      </div>
      {!isMobile && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '70vh',
            width: '30%',
            gap: 2,
            overflowX: 'scroll'
          }}
        >
          {investmentPositions?.map((location) => {
            return (
              <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {location.franchiseName}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {location.capiSize}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
