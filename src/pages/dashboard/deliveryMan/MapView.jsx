import { useRef, useEffect } from 'react';
import maplibregl from 'maplibre-gl';

const MapView = ({ latitude, longitude }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: `https://api.maptiler.com/maps/basic-v2/style.json?key=${
        import.meta.env.VITE_MAPS_API_KEY
      }`,
      center: [longitude, latitude],
      zoom: 15,
    });

    // Add marker
    new maplibregl.Marker()
      .setLngLat([longitude, latitude]) // [lng, lat]
      .addTo(map);

    return () => map.remove(); // Clean up on unmount
  }, [latitude, longitude]);

  return (
    <div ref={mapContainerRef} className="w-full h-80 rounded-md shadow-md" />
  );
};

export default MapView;
