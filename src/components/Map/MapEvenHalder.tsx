import { useMapEvents } from 'react-leaflet';

const MapEventHandler = ({
  onBoundsChange
}: {
  onBoundsChange: (bounds: any) => void;
}) => {
  const map = useMapEvents({
    load: () => {
      onBoundsChange(map.getBounds());
    },
    moveend: () => {
      onBoundsChange(map.getBounds());
    }
  });
  return null; // doesn't render anything
};

export default MapEventHandler;
