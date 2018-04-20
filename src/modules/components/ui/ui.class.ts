import { SideBar } from "../sidebar/sidebar";
import { World } from "../world/world.class";
import { WorldOptions } from "../world/world.model";

export class UI {

    public isShowing: boolean;

    private detail: HTMLDivElement;
    private sideBar: SideBar;

    constructor(private properties: WorldOptions) {
    }

    public showDetailedUI(content): void {

        this.sideBar = new SideBar(this.properties, content);
        this.isShowing ? this.renderUI() : this.removeUI();

    }

    public set showUI(show) {

        this.isShowing = show;

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
