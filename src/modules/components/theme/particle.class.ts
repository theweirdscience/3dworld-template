import { Scene } from "three";
import { LocationService } from "../location/location.class";
import AnimationLoop from "../engine/engine.class";
import { Theme } from "./theme.model";

export class Particle implements Theme {

    public sphere: THREE.Mesh;

    private globe: THREE.SphereGeometry;
    private clouds: THREE.Mesh;
    private count: number;

    constructor(private scene: Scene) {
        

    }

}
