import Component, { doSth } from './Component';

export class Tooltip extends Component {
  constructor(closeNotifierFunction, text, hostElementId) {
    super(hostElementId);
    this.closeNotifier = closeNotifierFunction;
    this.text = text;
    doSth();
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
