import ko from 'knockout';

ko.bindingHandlers.init = {
    init: function (element, valueAccessor) {
        let initializer = valueAccessor();
        if (typeof initializer === 'function') {
            initializer.call(initializer, element);
        }
    }
};
