export class Lighting {

    public light: THREE.AmbientLight;
    public directionLight: THREE.DirectionalLight;

    public ambientLight(): THREE.AmbientLight {
        this.light = new THREE.AmbientLight('#fff');
        this.light.name = 'ambient';

        return this.light;
    }

    public directionalLight(): THREE.DirectionalLight {
        this.directionLight = new THREE.DirectionalLight(0x3333ee, 3.5);
        this.directionLight.name = 'directional';
        this.directionLight.position.set(1800,500,1800);
        return this.directionLight;
    }

}
