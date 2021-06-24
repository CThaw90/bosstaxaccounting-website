import './home.scss';
import ko from 'knockout';

import utils from '../common/utils';

import template from './home.html';

const api = {};
const self = {};

self.serviceDropdownVisible = ko.observable(false);

self.toggleServiceDropdown = function () {
    self.serviceDropdownVisible(!self.serviceDropdownVisible());
};

api.createUI = function (rootElement) {
    if (!self.element) {
        self.element = utils.toHtmlElement(template);
        rootElement.appendChild(self.element);

        ko.applyBindings(self, self.element);
    }
};

export default api;
