import { SideBar } from "../sidebar/sidebar";
import { World } from "../world/world.class";
import { WorldOptions } from "../world/world.model";
import { Camera } from "../camera/camera.class";
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Subject } from "rxjs";
import { FromEventObservable } from "rxjs/observable/FromEventObservable";

export class UI {

    public isShowing: boolean;

    // refactor
    public realGlobe$: any;
    public flatGlobe$: any;

    private detail: HTMLDivElement;
    private sideBar: SideBar;
    private showUI: boolean;
    private worldPicker: HTMLElement;

    constructor(
        private properties: WorldOptions,
        private camera: Camera) {

        this.createWorldToggle();

    }

    public createWorldToggle(): void {

        const worldPicker = document.createElement('div');
        worldPicker.classList.add('toggle');
        const buttonContainer = document.createElement('ul');

        const flat = document.createElement('li');
        flat.textContent = 'flat';
        flat.classList.add('paper-toggle')

        const real = document.createElement('li');
        real.textContent = 'real';
        real.classList.add('paper-toggle');

        buttonContainer.appendChild(flat);
        buttonContainer.appendChild(real);

        worldPicker.appendChild(buttonContainer);

        this.properties.container.appendChild(worldPicker);

        this.realGlobe$ = fromEvent(real, 'click')
            .map((x: any) => x.target.innerText);

        this.flatGlobe$ = fromEvent(flat, 'click')
            .map((x: any) => x.target.innerText);

    }

    public showDetailedUI(content): void {

        this.sideBar = new SideBar(this.properties, content[0], this.camera);

        this.camera.setDetailView(content.position);

        this.showUI ? this.renderUI() : this.removeUI();

    }

    private renderUI(): void {

        this.detail = this.properties.container.querySelector('.detailed-view');
        this.detail.classList.remove('fadeOutLeft');
        this.detail.classList.add('fadeInLeft', 'animated', 'is-open');

    }

    private removeUI(): void {

        if (this.detail) {
            this.detail.classList.remove('fadeInLeft', 'is-open');
            this.detail.classList.add('fadeOutLeft');
        }

    }
}
