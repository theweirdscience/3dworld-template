export class Lighting {

    public ambientLight(): THREE.AmbientLight {
        const light = new THREE.AmbientLight('#fff');
        light.name = 'ambient';

        return light;
    }

}
