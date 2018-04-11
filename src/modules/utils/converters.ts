import Vector3 = THREE.Vector3;

export function convertLatLonToVec3(lat, lon) {
    lat = lat * Math.PI / 180.0;
    lon = 180-lon * Math.PI / 180.0;
    return new THREE.Vector3(
        Math.cos(lat) * Math.cos(lon),
        Math.sin(lat),
        Math.cos(lat) * Math.sin(lon));
}

export function createSphereArc(P, Q) {
    const sphereArc = new THREE.Curve();
    sphereArc.getPoint = this.greatCircleFunction(P, Q);
    return sphereArc;
}

export function greatCircleFunction(P, Q) {
    const angle = P.angleTo(Q);
    return t => {
        const x = new THREE.Vector3().addVectors(
            P.clone().multiplyScalar(Math.sin((1 - t) * angle)),
            Q.clone().multiplyScalar(Math.sin(t * angle)))
            .divideScalar(Math.sin(angle));
        return x;
    };
}

export function latLongToVector3(lat, lon, radius, height): Vector3 {
    const phi = (lat) * Math.PI / 180;
    const theta = (lon - 180) * Math.PI / 180;

    const x = -(radius + height) * Math.cos(phi) * Math.cos(theta);
    const y = (radius + height) * Math.sin(phi);
    const z = (radius + height) * Math.cos(phi) * Math.sin(theta);

    return new THREE.Vector3(x, y, z);
}
