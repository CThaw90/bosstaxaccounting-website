import app from './app';

(function (app, rootElement) {
    rootElement.id = 'application';
    window.document.body.appendChild(rootElement);
    app.createUI(rootElement);
})(app, window.document.createElement('div'));
