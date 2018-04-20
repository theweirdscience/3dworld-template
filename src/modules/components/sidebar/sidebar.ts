import { World } from "../world/world.class";
import { WorldOptions } from "../world/world.model";
import { UI } from "../ui/ui.class";
import { Camera } from "../camera/camera.class";

export class SideBar {

    public sidebarComponent: HTMLDivElement;

    private props: WorldOptions;

    constructor(private properties: WorldOptions, private content, private camera: Camera) {

        this.sidebarComponent = document.createElement('div');
        const header = document.createElement('h4');
        const close = document.createElement('span');
        close.textContent = 'x';
        close.classList.add('close');
        header.textContent = content.name;
        this.sidebarComponent.appendChild(header);

        close.addEventListener('click', this.removeBar.bind(this));

        const agentList = document.createElement('ul');

        content.agents.forEach(agent => {

            const listItem = document.createElement('li');
            listItem.innerHTML = `<img src="${agent.picture}"> ${agent.name}`;
            listItem.classList.add('agent');
            agentList.appendChild(listItem);

        });

        this.sidebarComponent.appendChild(agentList);
        this.sidebarComponent.appendChild(close);

        this.sidebarComponent.classList.add('detailed-view');

        this.properties.container.appendChild(this.sidebarComponent);

    }

    private removeBar() {
        this.sidebarComponent.blur();
        this.sidebarComponent.classList.add('animated', 'fadeOutLeft');
        setTimeout(() => this.properties.container.removeChild(this.sidebarComponent), 200);
        this.camera.setNormalView();
    }

}