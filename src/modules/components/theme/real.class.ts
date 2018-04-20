import { LocationService } from "../location/location.class";

export class Real {

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

        const loader: THREE.ColladaLoader = new THREE.ColladaLoader();

        loader.load('../../../../static/globe/Earth.dae', collada => {

            collada.scene.traverse(function (node: any) {

                if (node.isMesh) {
                    node.material = earthDiffTexture;
                    Object.assign(node.scale, { x: 15, y: 15, z: 15 });
                }

            });

            const locations = new LocationService(scene, this.properties.circumference);

            scene.add(collada.scene);

            locations.visualize();

        });
    }

}