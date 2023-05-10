class DOMHelper {
  static clearEventListeners(element) {
    const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
    return clonedElement;
  }

  static moveElement(elementId, newDestinationSelector) {
    const element = document.getElementById(elementId);
    const destinationList = document.querySelector(newDestinationSelector);
    destinationList.append(element);
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

class Component {
  static templateCache = {};

  constructor(hostElhostElementId = null, insertBefore = false) {
    if (hostElhostElementId) {
      this.hostElement = document.getElementById(hostElhostElementId);
    } else {
      this.hostElement = document.body;
    }
    this.insertBefore = insertBefore;
  }

  hide() {
    if (this.tooltipElement) {
      this.overlay.style.display = '';
      // this.element.parentNode.removeChild(this.element);
      this.tooltipElement.remove();
    }
  }

  position() {
    this.tooltipElement.style.position = 'absolute';

    const x =
      (this.hostElement.clientWidth - this.tooltipElement.clientWidth) / 2;
    const y =
      (this.hostElement.clientHeight - this.tooltipElement.clientHeight) / 2;

    this.tooltipElement.style.left = `${x}px`;
    this.tooltipElement.style.top = `${y}px`;
  }

  async getTemplate(templateUrl, templateId) {
    if (!Component.templateCache[templateUrl]) {
      const response = await fetch(templateUrl);
      const data = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, 'text/html');
      Component.templateCache[templateUrl] = doc.querySelector(
        `#${templateId}`
      );
    }

    if (!Component.templateCache[templateUrl]) {
      throw new Error(
        `Template with ID ${templateId} not found in templates.html`
      );
    }

    return Component.templateCache[templateUrl].content.cloneNode(true);
  }

  render() {
    this.hostElement.insertAdjacentElement(
      this.insertBefore ? 'afterbegin' : 'beforeend',
      this.tooltipElement
    );
    this.overlay = this.overlay || this.tooltipElement.previousElementSibling;
    this.overlay.addEventListener('click', this.closeTooltip.bind(this));
    this.overlay.style.display = 'block';
    this.position();
  }
}

class Tooltip extends Component {
  constructor(closeNotifierFunction, text, hostElementId) {
    super(hostElementId);
    this.closeNotifier = closeNotifierFunction;
    this.text = text;
  }

  closeTooltip = () => {
    this.hide();
    this.closeNotifier();
  };

  async buildElement() {
    const tooltipElement = document.createElement('div');
    tooltipElement.className = 'card';

    const tooltipTemplate = await this.getTemplate(
      'assets/templates.html',
      'tooltip'
    );
    const tooltipBody = document.importNode(tooltipTemplate, true);

    tooltipBody.querySelector('p').textContent = this.text;
    tooltipElement.append(tooltipBody);

    tooltipElement.addEventListener('click', this.closeTooltip);
    this.tooltipElement = tooltipElement;
  }

  async render() {
    await this.buildElement();
    super.render();
  }
}

class ProjectItem {
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
  }

  showInfoHandler() {
    if (this.hasActiveTooltip) {
      return;
    }
    const tooltipText = this.itemElement.dataset.extraInfo;
    const tooltip = new Tooltip(
      () => (this.hasActiveTooltip = false),
      tooltipText,
      this.id
    );
    tooltip.render();
    this.hasActiveTooltip = true;
  }

  connectInfoButton() {
    this.infoButton.addEventListener('click', this.showInfoHandler.bind(this));
  }

  swtichProjectType() {
    this.type = this.type === 'active' ? 'finished' : 'active';
  }

  connectSwitchButton() {
    this.swtichButton = DOMHelper.clearEventListeners(this.swtichButton);
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

class ProjectList {
  projects = [];

  constructor(type) {
    this.type = type;
    const items = document.querySelectorAll(`#${type}-projects li`);
    for (const item of items) {
      this.projects.push(
        new ProjectItem(item.id, this.swtichProject.bind(this), this.type)
      );
    }
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

class App {
  static activeProjectsList = new ProjectList('active');
  static finishedProjectsList = new ProjectList('finished');

  static init() {
    this.activeProjectsList.setSwitchHandlerFunction(
      this.finishedProjectsList.addProject.bind(this.finishedProjectsList)
    );
    this.finishedProjectsList.setSwitchHandlerFunction(
      this.activeProjectsList.addProject.bind(this.activeProjectsList)
    );

    // just for testing...
    document.getElementById('start-analytics-btn').addEventListener('click', this.startAnalytics);
  }

  static startAnalytics() {
    const analyticsScript = document.createElement('script');
    analyticsScript.src = 'assets/scripts/analytics.js';
    analyticsScript.defer = true;
    document.head.append(analyticsScript);
  }
}

App.init();
