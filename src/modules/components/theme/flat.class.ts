import { Scene } from "three";

export class Flat {

    private globe: THREE.SphereGeometry;
    private cloudMesh: THREE.Mesh;
    private lights: THREE.Mesh;


    constructor(private scene: Scene) {

        const sphere = new THREE.Mesh(this.globeGenerate(), this.decoratePlanet());
        sphere.name = 'flat-world';
        sphere.add(this.cloudTexture());

        this.scene.add(this.earthLightsTexture());

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
        const geometry = new THREE.SphereGeometry(15.2, 32, 32);
        const material = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('../../../../static/images/planets/fair_clouds_4k.png'),
            side: THREE.DoubleSide,
            opacity: 0.15,
            transparent: true,
            depthWrite: false
        });

        return this.cloudMesh = new THREE.Mesh(geometry, material);

    }

    private earthLightsTexture(): THREE.Mesh {
        const geometry = new THREE.SphereGeometry(15.04, 32, 32);

        const material = new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture('../../../../static/images/planets/city_lights_4k.png'),
            transparent: true,
            opacity: .3,
            lights: true
        });

        return this.lights = new THREE.Mesh(geometry, material);

    }

}
