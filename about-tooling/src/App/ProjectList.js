import { ProjectItem as PrjItem } from './ProjectItem';
import * as DOMHelper from '../Utility/DOMHelper';

export class ProjectList {
  projects = [];

  constructor(type) {
    this.type = type;
    const items = document.querySelectorAll(`#${this.type}-projects li`);
    for (const item of items) {
      this.projects.push(
        new PrjItem(item.id, this.swtichProject.bind(this), this.type)
      );
    }
    this.connectDroppable();
    console.log(globalThis.DEFAULT_VALUE);
  }

  connectDroppable() {
    const list = document.querySelector(`#${this.type}-projects ul`);

    list.addEventListener('dragenter', (event) => {
      if (event.dataTransfer.types[0] === 'text/plain') {
        list.parentElement.classList.add('droppable');
        event.preventDefault();
      }
    });

    list.addEventListener('dragover', (event) => {
      if (event.dataTransfer.types[0] === 'text/plain') {
        event.preventDefault();
      }
    });

    list.addEventListener('dragleave', (event) => {
      // first argument add for compatability with Firefox
      if (
        event.relatedTarget.closest &&
        event.relatedTarget.closest(`#${this.type}-projects ul`) !== list
      ) {
        list.parentElement.classList.remove('droppable');
      }
    });

    list.addEventListener('dragend', (event) => {
      list.parentElement.classList.remove('droppable');
    });

    list.addEventListener('drop', (event) => {
      event.preventDefault();
      const projectId = event.dataTransfer.getData('text/plain');
      if (this.projects.find((p) => p.id === projectId)) {
        return;
      }

      const button = document
        .getElementById(projectId)
        .getElementsByTagName('button')[1];
      button.click();
      list.parentElement.classList.remove('droppable');
    });
  }

  setSwitchHandlerFunction(switchHandlerFunction) {
    this.switchHandler = switchHandlerFunction;
  }

  addProject(project) {
    this.projects.push(project);
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
    project.update(this.swtichProject.bind(this));
  }

  swtichProject(id) {
    this.switchHandler(this.projects.find((p) => p.id === id));
    this.projects = this.projects.filter((p) => p.id !== id);
  }
}
