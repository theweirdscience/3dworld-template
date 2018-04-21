import { Scene } from "three";
import { LocationService } from "../location/location.class";
import AnimationLoop from "../engine/engine.class";
import { Theme } from "./theme.model";

export class Flat implements Theme {

    public sphere: THREE.Mesh;

    private globe: THREE.SphereGeometry;
    private clouds: THREE.Mesh;

    constructor(scene: Scene) {

        this.sphere = new THREE.Mesh(this.globeGenerate(), this.decoratePlanet());
        this.sphere.name = 'flat-world';

        this.sphere.rotation.y = 17.25;

        const locations = new LocationService(scene, 15);

        locations.visualize();

        this.sphere.add(this.cloudTexture());
        scene.add(this.sphere);

        AnimationLoop
            .animationEngine$
            .filter(() => !!this.clouds)
            .subscribe(() => {
                this.clouds.rotation.y += .0002;
            });

    }

    private globeGenerate(): THREE.SphereGeometry {

        this.globe = new THREE.SphereGeometry(15, 32, 32);

        return this.globe;

    }

    private decoratePlanet(): THREE.MeshPhongMaterial {

        return new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('../../../../static/images/planets/earthmap4k.jpg'),
            bumpMap: THREE.ImageUtils.loadTexture('../../../../static/images/planets/earthbump4k.jpg'),
            bumpScale: 5,
            normalMap: THREE.ImageUtils.loadTexture('../../../../static/images/planets/earth_normalmap_flat4k.jpg'),
            specularMap: THREE.ImageUtils.loadTexture('../../../../static/images/planets/earthspec4k.jpg'),
            specular: new THREE.Color(0x333333),
            normalScale: new THREE.Vector2(0.5, 0.7)
        } as THREE.MeshBasicMaterialParameters);

    }

    private cloudTexture(): THREE.Mesh {

        const geometry = new THREE.SphereGeometry(15.25, 32, 32);
        const material = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('../../../../static/images/planets/fair_clouds_4k.png'),
            side: THREE.DoubleSide,
            opacity: 0.15,
            transparent: true,
            depthWrite: false
        });

        return this.clouds = new THREE.Mesh(geometry, material);

    }

}
