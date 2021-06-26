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
self.submitButtonVisible = ko.observable(true);
self.name = {
    value: ko.observable(),
    error: ko.observable()
};
self.email = {
    value: ko.observable(),
    error: ko.observable()
};
self.services = {
    options: [
        'Tax services', 'Accounting', 'Credit services', 'Expungement services',
        'Uncontested divorce filings', 'Bankruptcy petition preparation',
        'Legal forms', 'Business'
    ],
    value: ko.observable(),
    error: ko.observable()
};
self.name.value.subscribe(v => self.name.error(!v));
self.email.value.subscribe(v => self.email.error(!v));
self.services.value.subscribe(v => self.services.error(!v));

self.submitContact = function () {
    self.name.error(!self.name.value());
    self.email.error(!self.email.value());
    self.services.error(!self.services.value());

    if (!self.name.error() && !self.email.error() && !self.services.error()) {
        window.console.log(self.name.value());
        window.console.log(self.email.value());
        window.console.log(self.services.value());
        self.submitButtonVisible(false);
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

self.navigateToMobileApp = function () {
    window.location.href = 'https://taxestogo.com/App/Download/9881';
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
