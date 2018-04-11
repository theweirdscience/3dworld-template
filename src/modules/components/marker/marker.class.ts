import {convertLatLonToVec3, latLongToVector3} from '../../utils/converters';

export class Marker {

    constructor(lat: number, lon: number, scene: THREE.Scene, radius: number, payload) {
        const contextPosition =latLongToVector3(lat, lon, radius , 2);
         const markerMesh = new THREE.MeshLambertMaterial({color: 0x000000, opacity:0.6, emissive:0xffffff});
         let marker = new THREE.Mesh(
             new THREE.CubeGeometry(5,5,90,1,1,1),
             markerMesh
         );

         //const marker = new THREE.Mesh(new THREE.SphereGeometry(.3, .3, .2), new THREE.MeshBasicMaterial({ color: '#cf3f40', name: "location" }));

        marker.position.set(contextPosition.x, contextPosition.y, contextPosition.z);

        Object.assign(marker, payload);
        marker.name = "location";
        scene.add(marker);
    }

}