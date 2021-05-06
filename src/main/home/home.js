import utils from '../common/utils';

import template from './home.html';

const api = {};

api.createUI = function (rootElement) {
    rootElement.appendChild(utils.toHtmlElement(template));
};

export default api;
