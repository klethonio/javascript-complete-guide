export class Modal {
  constructor(contentId, fallbackText) {
    this.fallbackText = fallbackText;
    this.contentTemplateEl = document.getElementById(contentId);
  }

  initialize() {
    const modalTemplateEl = document.getElementById('modal-template');
    const modalElements = document.importNode(modalTemplateEl.content, true);
    this.modalElement = modalElements.querySelector('.modal');
    this.backdropElement = modalElements.querySelector('.backdrop');
  }

  show() {
    if ('content' in document.createElement('template')) {
      // const modalElements = this.modalTemplateEl.content.cloneNode(true);
      if (!this.modalElement) {
        this.initialize();
      }

      const contentElement = document.importNode(this.contentTemplateEl.content, true);

      this.modalElement.innerHTML = '';
      this.modalElement.appendChild(contentElement);

      document.body.insertAdjacentElement('afterbegin', this.modalElement);
      document.body.insertAdjacentElement('afterbegin', this.backdropElement);
    } else {
      // fallback code
      alert(this.fallbackText);
    }
  }

  hide() {
    if (this.modalElement) {
      document.body.removeChild(this.modalElement); // this.modalElement.remove()
      document.body.removeChild(this.backdropElement);
      this.modalElement = null;
      this.backdropElement = null;
    }
  }
}
