import { ProjectList } from './App/ProjectList';
// with webpack, you can remove .js (or leave it if you want to...)

// window.DEFAULT_VALUE = 'RUNNING APP...';
globalThis.DEFAULT_VALUE = 'RUNNING APP...';

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
    document
      .getElementById('start-analytics-btn')
      .addEventListener('click', this.startAnalytics);
  }

  static startAnalytics() {
    const analyticsScript = document.createElement('script');
    analyticsScript.src = 'assets/scripts/analytics.js';
    analyticsScript.defer = true;
    document.head.append(analyticsScript);
  }
}

App.init();
