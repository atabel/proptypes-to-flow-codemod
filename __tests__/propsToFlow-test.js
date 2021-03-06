import { defineTest } from 'jscodeshift/dist/testUtils';

defineTest(__dirname, './src/propsToFlow', null, 'flowComment1');
defineTest(__dirname, './src/propsToFlow', null, 'flowComment2');
defineTest(__dirname, './src/propsToFlow', null, 'flowComment3');

const removePropTypesOptions = {
  'remove-prop-types': true,
};

defineTest(__dirname, './src/propsToFlow', null, 'classWithoutSuper');

defineTest(__dirname, './src/propsToFlow', null, 'classPropTypesToFlow1');
defineTest(__dirname, './src/propsToFlow', removePropTypesOptions, 'classPropTypesToFlow2');
defineTest(__dirname, './src/propsToFlow', removePropTypesOptions, 'classPropTypesToFlow3');
defineTest(__dirname, './src/propsToFlow', removePropTypesOptions, 'classPropTypesToFlow4');
defineTest(__dirname, './src/propsToFlow', null, 'classPropTypesToFlow5');
defineTest(__dirname, './src/propsToFlow', removePropTypesOptions, 'classPropTypesToFlow6');
defineTest(__dirname, './src/propsToFlow', removePropTypesOptions, 'classPropTypesToFlow7');
defineTest(__dirname, './src/propsToFlow', removePropTypesOptions, 'classPropTypesToFlow8');
defineTest(__dirname, './src/propsToFlow', removePropTypesOptions, 'classPropTypesToFlow9');
defineTest(__dirname, './src/propsToFlow', removePropTypesOptions, 'classPropTypesToFlow10');
defineTest(__dirname, './src/propsToFlow', removePropTypesOptions, 'classPropTypesToFlow11');
defineTest(__dirname, './src/propsToFlow', removePropTypesOptions, 'classPropTypesToFlow12');
defineTest(__dirname, './src/propsToFlow', removePropTypesOptions, 'classPropTypesToFlow13');

defineTest(__dirname, './src/propsToFlow', null, 'funcComponentPropTypes1');
defineTest(__dirname, './src/propsToFlow', removePropTypesOptions, 'funcComponentPropTypes2');
defineTest(__dirname, './src/propsToFlow', removePropTypesOptions, 'funcComponentPropTypes3');
defineTest(__dirname, './src/propsToFlow', removePropTypesOptions, 'funcComponentPropTypes4');
defineTest(__dirname, './src/propsToFlow', null, 'funcComponentPropTypes5');
defineTest(__dirname, './src/propsToFlow', removePropTypesOptions, 'funcComponentPropTypes6');
defineTest(__dirname, './src/propsToFlow', removePropTypesOptions, 'funcComponentPropTypes7');
defineTest(__dirname, './src/propsToFlow', removePropTypesOptions, 'funcComponentPropTypes8');
defineTest(__dirname, './src/propsToFlow', removePropTypesOptions, 'funcComponentPropTypes9');
defineTest(__dirname, './src/propsToFlow', removePropTypesOptions, 'funcComponentPropTypes10');

defineTest(__dirname, './src/propsToFlow', removePropTypesOptions, 'propTypesAsVariable1');
