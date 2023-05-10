export function doSth() {
  console.log('Do something...');
}

export default class Component {
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
