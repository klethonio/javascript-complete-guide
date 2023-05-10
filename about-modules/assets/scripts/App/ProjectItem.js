import { clearEventListeners } from '../Utility/DOMHelper.js';
// import { Tooltip } from "./Tooltip.js";

export class ProjectItem {
  hasActiveTooltip = false;

  constructor(id, updateProjectListsFuntion, type) {
    this.id = id;
    this.updateProjectListsHandler = updateProjectListsFuntion;
    this.itemElement = document.getElementById(this.id);
    this.infoButton = this.itemElement.getElementsByTagName('button')[0];
    this.swtichButton = this.itemElement.getElementsByTagName('button')[1];
    this.type = type;
    this.connectInfoButton();
    this.connectSwitchButton();
    this.connectDrag();
  }

  async showInfoHandler() {
    if (this.hasActiveTooltip) {
      return;
    }
    const tooltipText = this.itemElement.dataset.extraInfo;
    const module = await import('./Tooltip.js');
    const tooltip = new module.Tooltip(
      () => (this.hasActiveTooltip = false),
      tooltipText,
      this.id
    );
    tooltip.render();
    this.hasActiveTooltip = true;
  }

  connectDrag() {
    this.itemElement.addEventListener('dragstart', (event) => {
      event.currentTarget.style.opacity = '0.5';
      event.dataTransfer.setData('text/plain', this.id);
      event.dataTransfer.effectAllowed = 'move';
    });

    this.itemElement.addEventListener('dragend', (event) => {
      console.log(event);
      event.currentTarget.style.opacity = '1';
    });
  }

  connectInfoButton() {
    this.infoButton.addEventListener('click', this.showInfoHandler.bind(this));
  }

  swtichProjectType() {
    this.type = this.type === 'active' ? 'finished' : 'active';
  }

  connectSwitchButton() {
    this.swtichButton = clearEventListeners(this.swtichButton);
    this.swtichButton.textContent =
      this.type === 'active' ? 'Finish' : 'Activate';
    this.swtichButton.addEventListener(
      'click',
      this.updateProjectListsHandler.bind(null, this.id)
    );
  }

  update(updateProjectListsFn) {
    this.updateProjectListsHandler = updateProjectListsFn;
    this.swtichProjectType();
    this.connectSwitchButton();
  }
}
