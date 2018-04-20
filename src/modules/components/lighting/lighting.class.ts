export class Lighting {

    public ambientLight(): THREE.AmbientLight {
        const light = new THREE.AmbientLight('#fff');
        light.name = 'ambient';

        return light;
    }

    public directionalLight(): THREE.DirectionalLight {
        const directionLight = new THREE.DirectionalLight(0xffffff, 1);

        directionLight.position.x = 10;
        directionLight.position.y = 10;
        directionLight.position.z = -50;

        directionLight.name = 'directional';

        return directionLight;
    }

}
