import { LocationService } from "../location/location.class";
import { Scene } from "three";
import { Theme } from "./theme.model";

export class Real implements Theme {

    public sphere: Scene;

    constructor(private scene, private properties) {

        const earthDiffTexture = new THREE.MeshPhongMaterial({
            emissive: new THREE.TextureLoader().load('../../../../static/globe/PlanetEarth_EMISSION.jpg'),
            shininess: 5,
            reflectivity: 0.2,
            envMap: new THREE.TextureLoader().load('../../../../static/globe/PlanetEarth_REFLECTION.jpg'),
            bumpMap: new THREE.TextureLoader().load('../../../../static/globe/PlanetEarth_BUMP.jpg'),
            map: new THREE.TextureLoader().load('../../../../static/globe/PlanetEarth_DIFFUSE.jpg'),
            bumpScale: 0.3,
        } as any);

        const loader = new THREE.ColladaLoader();

        loader.load('../../../../static/globe/Earth.dae', collada => {

            collada.scene.traverse(function (node: any) {

                if (node.isMesh) {
                    node.material = earthDiffTexture;
                    Object.assign(node.scale, { x: 15, y: 15, z: 15 });
                }

            });

            this.sphere = collada.scene;

            scene.add(this.sphere);

            new LocationService(scene, this.properties.circumference).visualize();

        });

    }

}