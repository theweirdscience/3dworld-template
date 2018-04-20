import { WorldOptions } from './world.model';
import { Lighting } from '../lighting/lighting.class';
import { Composer } from '../shaders/composer.class';
import { Camera } from '../camera/camera.class';
import { UI } from '../ui/ui.class';
import { Cloud } from '../cloud/clouds';
import { TweenLite } from 'gsap';
import { Vector2, MeshPhongMaterial } from 'three';
import { Real } from '../theme/real.class';

export class World {
    public raycaster: THREE.Raycaster;
    public camera: Camera;
    public scene: THREE.Scene;
    public composer: Composer;
    public sphere: THREE.Mesh;

    private ui: UI;
    private lighting: Lighting;
    private cloud: Cloud;
    private mouse: Vector2;
    private projector: THREE.Projector;
    private hasClicked: boolean = false;
    private backgroundScene: any;

    constructor(public properties: WorldOptions) {
        this.composer = new Composer();
        this.lighting = new Lighting();
        this.raycaster = new THREE.Raycaster();
        this.scene = new THREE.Scene();
        this.camera = new Camera(this.properties.width, this.properties.height);
        this.projector = new THREE.Projector();
        this.mouse = new THREE.Vector2();
        this.ui = new UI(this.properties, this.camera);
        this.globeGenerateTheme();
    }

    public init(): void {

        this.scene.add(this.sphere);
        this.scene.add(this.lighting.ambientLight());

        this.properties.container.addEventListener('mousemove', this.onDocumentMouseMove.bind(this));
        this.properties.container.addEventListener('mouseup', this.onDocumentClicked.bind(this));

        this.properties.container.appendChild(this.composer.renderer.domElement);

        this.render();

    }

    private onDocumentClicked(event) {
        event.preventDefault();
        this.hasClicked = true;

        setTimeout(() => this.hasClicked = false, 100);
    }

    private onDocumentMouseMove(event) {
        event.preventDefault();
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    private globeGenerateTheme(): void {

        switch (this.properties.theme) {

            case '3d':
                new Real(this.scene, this.properties);
            
            case 'normal':
                new Real(this.scene, this.properties);

            case 'particles':
                new Real(this.scene, this.properties);

        }

    }

    private checkIntersections() {

        this.raycaster.setFromCamera(this.mouse, this.camera.camera);

        const intersects = this.raycaster.intersectObjects(this.scene.children);

        if (intersects.length > 0 && this.hasClicked) {

            const object = intersects[0].object;

            if (object.name === 'location' && !this.ui.isShowing) {

                this.ui.showDetailedUI(object)

            }

        }

    }

    private render(): void {
        this.camera.camera.updateProjectionMatrix();
        this.camera.cameraControl.update();

        this.properties.container.appendChild(this.composer.renderer.domElement);
        this.composer.renderer.autoClear = false;
        this.composer.renderer.render(this.scene, this.camera.camera);

        this.checkIntersections();

        requestAnimationFrame(this.render.bind(this));
    }

}
