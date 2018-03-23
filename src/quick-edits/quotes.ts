'use strict';
import * as vscode from 'vscode';
import replaceSelections from './replace-selections';
import replaceAllSelections from './replace-all-selections';

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
    quote = quote || selfQuotes || defaultQuote;

    if (selfQuotes) {
        str = str.substr(selfQuotes.length, str.length - (selfQuotes.length * 2));
    }

    str = str.
        replace(RegExp(quote, 'g'), `\\${quote}`).
        replace(/\\/g, '\\\\').
        replace(/\r/g, '\\r').
        replace(/\n$/g, `\\n`).
        replace(/\n/g, `\\n${quote} +\n${quote}`).
        replace(/\t/g, '\\t');

    if (quote === '`') {
        str = str.replace(/\$/g, '\\$');
    }

    return `${quote}${str}${quote}`;
}

function decodeJsString(str: string, quote?: string): string {
    const detectedQuote = hasQuotes(str);
    quote = quote || detectedQuote || defaultQuote;

    if (detectedQuote) {
        str = str.substr(detectedQuote.length, str.length - (detectedQuote.length * 2));
    }

    if (quote === '`') {
        str = str.
            replace(/\\\$/g, '$');
    }
    str = str.
        replace(/\\\\/g, '\\').
        replace(/\\r/g, '\r').
        replace(/\\n/g, '\n').
        replace(/\\t/g, '\t').
        replace(/\\'/g, '\'').
        replace(/\\`/g, '\`').
        replace(/\\"/g, '\"');

    return str;
}

export default {
    encodeToQuotes: function () {
        vscode.window.showQuickPick(["'", '"', '`']).
            then(quote => {
                if (!quote) {
                    return;
                }
                replaceSelections(text => encodeJsString(text, quote));
            })
    },

    encodeJsQuotes: function () {
        replaceAllSelections(texts => texts.map(text => encodeJsString(text)));
    },

    decodeJsQuotes: function () {
        replaceAllSelections(texts => texts.map(text => decodeJsString(text)));
    },

    encodeJsonQuotes: function () {
        replaceAllSelections(texts => texts.map(text => encodeJsString(text, '"')));
    },

};
