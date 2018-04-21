import { SideBar } from "../sidebar/sidebar";
import { World } from "../world/world.class";
import { WorldOptions } from "../world/world.model";
import { Camera } from "../camera/camera.class";
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Subject } from "rxjs";
import { FromEventObservable } from "rxjs/observable/FromEventObservable";

export class UI {

    public isShowing: boolean = false;

    public realGlobe$: any;
    public flatGlobe$: any;

    private detail: HTMLDivElement;
    private sideBar: SideBar;
    private worldPicker: HTMLElement;

    constructor(
        private properties: WorldOptions,
        private camera: Camera) {

        this.createWorldToggle();

    }

    public createWorldToggle(): void {

        const worldPicker = document.createElement('div');
        worldPicker.classList.add('toggle');

        const flat = document.createElement('input');
        const flatLabel = document.createElement('label');
        flatLabel.textContent = 'flat';
        flatLabel.htmlFor = 'flat'
        flat.type = 'radio';
        flat.value = 'flat';
        flat.name = 'world';
        flat.id = 'flat';
        flat.textContent = 'flat';

        const real = document.createElement('input');
        const realLabel = document.createElement('label');
        realLabel.textContent = 'real';
        realLabel.htmlFor = 'real'
        real.type = 'radio';
        real.value = 'real';
        real.name = 'world';
        real.id = 'real';
        real.textContent = 'real';

        worldPicker.appendChild(flat);
        worldPicker.appendChild(flatLabel);

        worldPicker.appendChild(real);
        worldPicker.appendChild(realLabel);

        this.properties.container.appendChild(worldPicker);

        this.realGlobe$ = fromEvent(real, 'click')
            .map((x: any) => x.target.value);

        this.flatGlobe$ = fromEvent(flat, 'click')
            .map((x: any) => x.target.value);

    }

    public showDetailedUI(content): void {

        this.sideBar = new SideBar(this.properties, content[0]);

        this.sideBar.close$
            .subscribe(() => {
                this.removeDetailedUI();
            });

        this.camera.setDetailView(content.position);

        this.detail = this.properties.container.querySelector('.detailed-view');
        this.detail.classList.remove('fadeOutLeft');
        this.detail.classList.add('fadeInLeft', 'animated', 'is-open');

        this.isShowing = true;

    }

    public removeDetailedUI(): void {

        this.sideBar.close();
        this.camera.setNormalView();
        this.isShowing = false;

    }

}
