import './styles/styles';

import home from './home/home';

const api = {};

api.createUI = function (rootElement) {
    home.createUI(rootElement)
};

export default api;
