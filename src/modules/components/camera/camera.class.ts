import { TweenLite, Circ } from 'gsap';

export class Camera {

    public camera: THREE.PerspectiveCamera;
    public cameraControl: THREE.OrbitControls;
    public timeline: any;

    constructor(width, height) {

        this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 4000);

//        this.cameraControl = new THREE.OrbitControls(this.camera);

        this.setNormalView();
        this.camera.name = 'main-camera';

    }

    set cameraControls(state: boolean) {
        this.cameraControl.enabled = state;
    }

    public setNormalView(): void {
        /*this.camera.position.x = 1800;
        this.camera.position.y = 500;
        this.camera.position.z = 1800;*/
        this.camera.position.set(1800, 500, 1800);
        this.camera.lookAt(new THREE.Vector3(0,0,0))
        //this.zoom = { level: 5, end: 1 };

        //this.cameraControl.target = new THREE.Vector3(0, 0, 0);
        //
        // this.cameraControl.autoRotateSpeed = .2;
        // this.cameraControl.enableRotate = false;
    }

    public setDetailView({ x, y, z }): void {
        this.cameraControl.target = new THREE.Vector3(x, y, z);
        this.zoom = { level: 1, end: 10 };
        this.cameraControl.enableRotate = true;
    }

    private set zoom({ level, end }) {
        const zoom = { level }

        this.timeline = TweenLite.to(zoom, 1, { level: end, onUpdate: updateZoom.bind(this), ease: Circ.easeOut, })

        function updateZoom() {
            this.camera.zoom = zoom.level;
        }
    }

}
