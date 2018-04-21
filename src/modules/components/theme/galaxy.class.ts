import { Scene } from "three";
import { LocationService } from "../location/location.class";
import AnimationLoop from "../engine/engine.class";
import { Theme } from "./theme.model";

export class Galaxy implements Theme {

    public sphere: THREE.PointCloud;

    constructor(scene: Scene) {

        var distance = 100;
        var geometry = new THREE.Geometry();

        for (var i = 0; i < 1500; i++) {

            var vertex = new THREE.Vector3();

            var theta = THREE.Math.randFloatSpread(360);
            var phi = THREE.Math.randFloatSpread(360);

            vertex.x = distance * Math.sin(theta) * Math.cos(phi);
            vertex.y = distance * Math.sin(theta) * Math.sin(phi);
            vertex.z = distance * Math.cos(theta);

            geometry.vertices.push(vertex);
        }
        this.sphere = new THREE.PointCloud(geometry, new THREE.PointCloudMaterial({
            color: 0xffffff
        }));

        this.sphere.boundingSphere = 50;

        scene.add(this.sphere);

    }

}
