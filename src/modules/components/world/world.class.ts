import { WorldOptions } from './world.model';
import { Lighting } from '../lighting/lighting.class';
import { Composer } from '../shaders/composer.class';
import { Camera } from '../camera/camera.class';
import { UI } from '../ui/ui.class';
import { Cloud } from '../cloud/clouds';
import { LocationService } from '../location/location.class';
import { TweenLite } from 'gsap';
import { Vector2, MeshPhongMaterial } from 'three';

export class World {
    public raycaster: THREE.Raycaster;
    public camera: Camera;
    public scene: THREE.Scene;
    public composer: Composer;
    public sphere: THREE.Mesh;

    private locations: LocationService;
    private ui: UI;
    private lighting: Lighting;
    private cloud: Cloud;
    private mouse: Vector2;
    private projector: THREE.Projector;
    private hasClicked: boolean = false;

    constructor(public properties: WorldOptions) {
        this.composer = new Composer();
        this.lighting = new Lighting();
        this.raycaster = new THREE.Raycaster();
        this.scene = new THREE.Scene();
        this.camera = new Camera(this.properties.width, this.properties.height);
        this.projector = new THREE.Projector();
        this.mouse = new THREE.Vector2();
        this.ui = new UI(this);
        this.globeGenerate();
        this.loadBackground();
    }

    private loadBackground() {
        var loader = new THREE.ImageLoader();

        const bgTexture = loader.load("../../../../static/globe/gal.jpg",
            (texture) => {
                this.properties.container.querySelector('canvas').drawImage(texture, 100, 100);
            });

        this.scene.background = bgTexture;

    }

    public init(): void {
        this.scene.add(this.sphere);
        this.scene.add(this.lighting.ambientLight());
        this.scene.add(this.lighting.directionalLight());

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

    private globeGenerate() {

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

            this.locations = new LocationService(this.scene, this.properties.circumference);

            this.scene.add(collada.scene);

            this.locations.visualize();

        });

    }

    // extract to UI class
    private zoomIn(coordinates) {
        this.camera.setDetailView(coordinates);
        this.ui.showUI = true;
    }

    public zoomOut() {
        this.camera.setNormalView();
        this.ui.showUI = false;
    }

    private checkIntersections() {

        this.raycaster.setFromCamera(this.mouse, this.camera.camera);

        const intersects = this.raycaster.intersectObjects(this.scene.children);

        if (intersects.length > 0 && this.hasClicked) {

            const object = intersects[0].object;

            if (object.name === 'location' && !this.ui.isShowing) {

                this.zoomIn(object.position);

                this.ui.showDetailedUI(object[0]);
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
