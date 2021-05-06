const api = {};

api.toHtmlElement = function (template) {
    let wrapperElement = window.document.createElement('div');
    wrapperElement.innerHTML = template.trim();

    return wrapperElement.firstElementChild;
};

export default api;
