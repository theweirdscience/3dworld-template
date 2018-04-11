import { WorldOptions } from './world.model';
import { Lighting } from '../lighting/lighting.class';
import { Composer } from '../shaders/composer.class';
import { Camera } from '../camera/camera.class';
import { UI } from '../ui/ui.class';
import { LocationService } from '../location/location.class';
import { WorldTexture } from '../texture/texture';

export class World {

    public raycaster: THREE.Raycaster;
    public camera: Camera;
    public scene: THREE.Scene;
    public composer: Composer;
    public properties: WorldOptions;

    private locations: LocationService;
    private ui: UI;
    private intersected: any;
    private lighting: Lighting;
    private mouse: any;
    private texture: WorldTexture;
    private globe: any;
    private hasClicked: boolean = false;

    constructor(options: WorldOptions) {
        this.properties = options;
        this.composer = new Composer();
        this.lighting = new Lighting();
        // this.raycaster = new THREE.Raycaster();
        this.scene = new THREE.Scene();
        this.camera = new Camera(options.width, options.height);

        this.addGlobe();
        // this.intersected = false;
        // this.mouse = new THREE.Vector2();
        this.locations = new LocationService(this.scene, options.radius);
        this.mode(options.mode);
        // this.ui = new UI(this);
        //this.globeGenerate();

    }

    public addGlobe() {
        const spGeo = new THREE.SphereGeometry(this.properties.radius,50,50);

        const earthDiffTexture = new THREE.MeshPhongMaterial({
            emissive: new THREE.TextureLoader().load('static/globe/PlanetEarth_EMISSION.jpg'),
            shininess: 5,
            reflectivity: 0.2,
            envMap: new THREE.TextureLoader().load('static/globe/PlanetEarth_REFLECTION.jpg'),
            bumpMap: new THREE.TextureLoader().load('static/globe/PlanetEarth_BUMP.jpg'),
            map: new THREE.TextureLoader().load('static/globe/PlanetEarth_DIFFUSE.jpg'),
            bumpScale: 0.3,
        } as any);

        this.globe = new THREE.Mesh(spGeo,earthDiffTexture);

        this.scene.add(this.globe);

    }

    // add clouds
    private addClouds() {
        const spGeo = new THREE.SphereGeometry(600,50,50);
        const cloudsTexture = new THREE.TextureLoader().load( "static/new-earth/earth_clouds_1024.png" );
        const materialClouds = new THREE.MeshPhongMaterial( { color: 0xffffff, map: cloudsTexture, transparent:true, opacity:0.3 } );

        const clouds = new THREE.Mesh( spGeo, materialClouds );
        clouds.scale.set( 1.015, 1.015, 1.015 );
        this.scene.add( clouds );
    }

    public init(): void {

        this.scene.add(this.lighting.ambientLight());
        this.scene.add(this.lighting.directionalLight());
        // this.camera.cameraControl.dampingFactor = 100;
        // this.camera.cameraControl.zoomSpeed = .1;
        //
        // document.addEventListener('mousemove', this.onDocumentMouseMove.bind(this), false);
        // document.addEventListener('mousedown', this.onDocumentClicked.bind(this), false);
        //
        // document.addEventListener('touchmove', this.onDocumentMouseMove.bind(this), false);
        // document.addEventListener('touchstart', this.onDocumentClicked.bind(this), false);
        //
        this.render();
    }

    private onDocumentClicked(event) {
        event.preventDefault();
        this.hasClicked = true;

        setTimeout(() => {
            this.hasClicked = !this.hasClicked;
        }, 500);
    }

    private onDocumentMouseMove(event) {
        event.preventDefault();
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    private mode(mode) {
        if (mode.flight) {
            this.locations.visualize();
        }
    }

    private globeGenerate() {

        const earthDiffTexture = new THREE.MeshPhongMaterial({
            emissive: new THREE.TextureLoader().load('static/globe/PlanetEarth_EMISSION.jpg'),
            shininess: 5,
            reflectivity: 0.2,
            envMap: new THREE.TextureLoader().load('static/globe/PlanetEarth_REFLECTION.jpg'),
            bumpMap: new THREE.TextureLoader().load('static/globe/PlanetEarth_BUMP.jpg'),
            map: new THREE.TextureLoader().load('static/globe/PlanetEarth_DIFFUSE.jpg'),
            bumpScale: 0.3,
        } as any);

        const loader = new THREE.ColladaLoader();

       loader.load('static/globe/Earth.dae', (collada) => {
//         loader.load('static/new-earth/Earth.dae', (collada) => {
            //console.log(collada.scene);


            collada.scene.traverse(function (node) {

                if (node instanceof THREE.Mesh) {
                    //console.log(node);
                    node.material = earthDiffTexture;
                    Object.assign(node.scale, { x: 6, y: 6, z: -6 });
                    //node.rotateZ(270)
                }
            });

            this.globe = collada.scene;
            this.scene.add(this.globe);
        }, (request) => {

            console.log(request.loaded/request.total)

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
        this.intersected = null;
    }

    private checkIntersections() {

        this.raycaster.setFromCamera(this.mouse, this.camera.camera);

        const intersects = this.raycaster.intersectObjects(this.scene.children);

        if (intersects.length > 0 && this.hasClicked) {

            const object = intersects[0].object;

            if (this.intersected != object && object.name === 'location' && !this.ui.showUI) {

                this.zoomIn(object.position);

                this.ui.showDetailedUI(object[0]);
            }

        } else {

            if (this.intersected) {
                this.intersected.material.emissive.setHex(this.intersected.currentHex);
                this.zoomOut();
            }

        }
    }

    private render(): void {
        // this.camera.camera.updateProjectionMatrix();
        // this.camera.cameraControl.update();
        
        document.querySelector('main.world').appendChild(this.composer.renderer.domElement);
        //this.composer.renderer.autoClear = false;
        //this.composer.renderer.render(this.scene, this.camera.camera);
        //
        // this.checkIntersections();


        var timer = Date.now() * 0.0001;
        this.camera.camera.position.x = (Math.cos( timer ) *  1800);
        this.camera.camera.position.z = (Math.sin( timer ) *  1800) ;
        this.camera.camera.lookAt( this.scene.position );
        this.lighting.directionLight.position.set(this.camera.camera.position.x, this.camera.camera.position.y, this.camera.camera.position.z );
        this.lighting.directionLight.lookAt(this.scene.position);

        this.composer.renderer.render(this.scene, this.camera.camera);

        requestAnimationFrame(this.render.bind(this));
    }

}
