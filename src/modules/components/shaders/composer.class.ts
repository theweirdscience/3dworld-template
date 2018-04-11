export class Composer {

    public renderer: THREE.WebGLRenderer;

    constructor() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        this.prepareRenderer();
    }

    private prepareRenderer(): void {
//        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x111111);
        //this.renderer.shadowMap.enabled = true;
    }

}