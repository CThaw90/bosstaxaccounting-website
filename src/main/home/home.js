import './home.scss';
import ko from 'knockout';

import utils from '../common/utils';

import template from './home.html';

const api = {};
const self = {};

const elements = {};
const scrollToElement = function (elementId) {
    const dimensions = elements[elementId] ? elements[elementId].getBoundingClientRect() : null;
    if (dimensions) {
        window.scrollBy(0, dimensions.y);
    }
};

self.navigateToHome = function () {
    scrollToElement('home-section');
};

self.navigateToServices = function () {
    scrollToElement('services-section');
};

self.navigateToAboutUs = function () {
    scrollToElement('about-us-section');
};

self.navigateToContactUs = function () {
    scrollToElement('contact-us-section');
};

self.initElement = function (element) {
    if (element.id) {
        elements[element.id] = element;
    }
}

api.createUI = function (rootElement) {
    if (!self.element) {
        self.element = utils.toHtmlElement(template);
        rootElement.appendChild(self.element);

        ko.applyBindings(self, self.element);
    }
};

export default api;
