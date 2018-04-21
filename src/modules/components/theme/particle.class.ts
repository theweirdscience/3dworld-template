import { Scene } from "three";
import { LocationService } from "../location/location.class";
import AnimationLoop from "../engine/engine.class";
import { Theme } from "./theme.model";

declare const pusherColor: any;

export class Particle implements Theme {

    public sphere: THREE.Mesh;

    private globe: THREE.SphereGeometry;
    private clouds: THREE.Mesh;

    constructor(scene: Scene) {

    }

}
