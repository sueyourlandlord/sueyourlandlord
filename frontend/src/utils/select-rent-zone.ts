import { AREA_QUALITY_POLYGONS } from './constants';

export default function selectRentZone(lat: number, lon: number) {
    for (let i = 0; i < AREA_QUALITY_POLYGONS.features.length; i++) {
        let obj = AREA_QUALITY_POLYGONS.features[i];
        if (inside(lat, lon, obj.geometry.coordinates[0])) {
            return obj.properties.description; //
        }
    }

    return '0';
}

function inside(lat: number, lon: number, coordinates: number[][]) {
    // ray-casting algorithm based on
    // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html

    var x = lon,
        y = lat;

    var inside = false;
    for (
        var i = 0, j = coordinates.length - 1;
        i < coordinates.length;
        j = i++
    ) {
        var xi = coordinates[i][0],
            yi = coordinates[i][1];
        var xj = coordinates[j][0],
            yj = coordinates[j][1];

        var intersect =
            yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
        if (intersect) inside = !inside;
    }

    return inside;
}
