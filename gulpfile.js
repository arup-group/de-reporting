'use strict';

const build = require('@microsoft/sp-build-web');

build.configureWebpack.mergeConfig({
    additionalConfiguration: (generatedConfiguration) => {
        generatedConfiguration.externals = generatedConfiguration.externals
            .filter(name => !(["react", "react-dom"].includes(name)))
        return generatedConfiguration;
    }
});

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

build.initialize(require('gulp'));
