import replaceSelections from './replace-selections';
import * as camelcase from 'camelcase';
import * as decamelize from 'decamelize';
import * as uppercamelcase from 'uppercamelcase';


export default {

    toCamelCase: function () {
        replaceSelections(text => camelcase(text.replace(/[^0-9a-zA-Z]/g, '-')));
    },

    toPascalCase: function () {
        replaceSelections(text => uppercamelcase(text.replace(/[^0-9a-zA-Z]/g, '-')));
    },

    toCebabCase: function () {
        replaceSelections(text => decamelize(camelcase(text.replace(/[^0-9a-zA-Z]/g, '-')), '-'));
    },

};
