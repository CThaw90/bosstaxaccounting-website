import ko from 'knockout';
import Choices from 'choices.js';

const self = {};

self.setPlaceholder = function (options, config) {
    options.unshift({
        value: config.placeholder,
        label: config.placeholder,
        selected: !ko.unwrap(config.value),
        customProperties: {
            placeholder: true,
            data: null
        }
    });
};

self.setValueSubscription = function (config) {
    config.value.subscribe(function (choice) {
        config.selector.setChoiceByValue(choice ? choice[config.optionsText] || choice : config.placeholder);
    });
};

self.enhanceSelectOptions = function (config) {
    return ko.unwrap(config.options).map(function (option) {
        const value = option[config.optionsText] || option;
        return {
            value,
            label: value,
            selected: ko.unwrap(config.value) === option,
            customProperties: { data: option }
        };
    });
};

ko.bindingHandlers.select = {
    init: function (element, valueAccessor) {
        const config = valueAccessor();
        let choices = [];
        if (ko.unwrap(config.placeholder)) {
            self.setPlaceholder(choices, config);
        }
        if (ko.unwrap(config.options)) {
            choices = choices.concat(self.enhanceSelectOptions(config));
        }
        config.selector = new Choices(element, { choices });
    }
};
