'use strict';
import * as vscode from 'vscode';
import replaceSelections from './replace-selections';

const allQuotes = ["'", '"', '`'];
const defaultQuote = allQuotes[0];

function hasQuotes(str: string): string {
    if (typeof str !== 'string') {
        return '';
    }

    for (let i = 0; i < allQuotes.length; i++) {
        const quote = allQuotes[i];
        if (str.startsWith(quote) && str.endsWith(quote)) {
            return quote;
        }
    }

    return '';
}

function encodeJsString(str: string, quote?: string): string {
    str = str || '';
    let selfQuotes = quote ? false : hasQuotes(str);
    quote = quote || selfQuotes || allQuotes[0];

    if (selfQuotes) {
        str = str.substr(selfQuotes.length, str.length - (selfQuotes.length * 2));
    }

    str = str.
        replace(/\\/g, '\\\\').
        replace(/\r/g, '\\r').
        replace(/\n/g, `\\n${quote}\n`).
        replace(/\t/g, '\\t').
        replace(RegExp(quote, 'g'), `\\${quote}`);

    if (quote === '`') {
        str = str.replace(/\$/g, '\\$');
    }

    return `${quote}${str}${quote}`;
}

export default {
    jsEncode: function () {
        replaceSelections(text => encodeJsString(text));
    },

    jsonEncode: function () {
        replaceSelections(text => encodeJsString(text, '"'));
    }
};
