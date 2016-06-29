'use strict';

console.log('hot reload works');

if(module.hot) {
    module.hot.accept();
}