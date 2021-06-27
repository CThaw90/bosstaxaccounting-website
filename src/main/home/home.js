import './home.scss';
import ko from 'knockout';

import service from '../common/service';
import utils from '../common/utils';

import template from './home.html';

const api = {};
const self = {};

const elements = {};
const FORM_STATE = {
    IDLE: 'idle',
    PENDING: 'pending',
    SUBMITTED: 'submitted'
};
const scrollToElement = function (elementId) {
    const dimensions = elements[elementId] ? elements[elementId].getBoundingClientRect() : null;
    if (dimensions) {
        window.scrollBy(0, dimensions.y);
    }
};
self.state = { current: ko.observable(FORM_STATE.IDLE) };
self.state.idle = ko.computed(() => self.state.current() === FORM_STATE.IDLE);
self.state.pending = ko.computed(() => self.state.current() === FORM_STATE.PENDING);
self.state.submitted = ko.computed(() => self.state.current() === FORM_STATE.SUBMITTED);
self.name = {
    value: ko.observable(),
    error: ko.observable()
};
self.email = {
    value: ko.observable(),
    error: ko.observable()
};
self.service = {
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
self.service.value.subscribe(v => self.service.error(!v));

self.submitContact = function () {
    self.name.error(!self.name.value());
    self.email.error(!self.email.value());
    self.service.error(!self.service.value());

    if (!self.name.error() && !self.email.error() && !self.service.error()) {
        self.state.current(FORM_STATE.PENDING)
        service.sendEmail({
            name: self.name.value(),
            email: self.email.value(),
            service: self.service.value()
        }).then(response => {
            self.state.current(FORM_STATE[response.status === 200 ? 'SUBMITTED' : 'IDLE']);
        });
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
