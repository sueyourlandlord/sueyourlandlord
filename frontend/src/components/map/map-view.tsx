import { MapContainer, TileLayer, Marker, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import L, { LatLng } from 'leaflet';
import { AREA_QUALITY_POLYGONS } from '../../utils/constants';
import { useMemo } from 'react';

const MapView = (props: { lat: number; lon: number }) => {
    const overlayOptFunc = (feature: any) => {
        switch (feature.properties._umap_options.color) {
            case 'Red':
                return { color: '#ef4444' }; // red-500
            case 'Blue':
                return { color: '#3b82f6' }; // blue-500
            case 'Orange':
                return { color: '#eab308' }; // yellow-500
            case 'Yellow':
                return { color: '#22c55e' }; // green-500
            case 'DeepSkyBlue':
                return { color: '#a855f7' }; // purple-500
        }
    };

    const displayMap = useMemo(() => {
        return (
            <MapContainer
                center={new LatLng(props.lat, props.lon)}
                zoom={15}
                scrollWheelZoom={true}
                dragging={true}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    url={
                        'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'
                    }
                    attribution={
                        '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                    }
                    accessToken={'ef46c64d-29e0-495e-9647-f8dcc2bf46c2'}
                />
                {/* @ts-ignore */}
                <GeoJSON data={AREA_QUALITY_POLYGONS} style={overlayOptFunc} />
                <Marker
                    position={new LatLng(props.lat, props.lon)}
                    draggable={false}
                ></Marker>
            </MapContainer>
        );
    }, [props.lat, props.lon]);

    return <>{displayMap}</>;
};

export default MapView;
