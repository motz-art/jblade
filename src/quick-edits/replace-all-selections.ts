'use strict';
import * as vscode from 'vscode';

export default function replaceAllSelections(
    callback: (texts: string[]) => string[] | Thenable<string[]>) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showWarningMessage('Editor should be active.');
        return; // No open text editor
    }

    const selections = editor.selections;
    if (!selections || selections.length === 0) {
        vscode.window.showWarningMessage('Select text to encode.');
        return;
    }

    let texts = selections.map(selection => editor.document.getText(selection));
    Promise.resolve(callback(texts)).then(texts => {
        if (!texts) {
            return;
        }
        editor.edit(edit => {
            for (let i = 0; i < selections.length; i++) {
                const selection = selections[i];
                let text = texts[i] || '';
                edit.replace(selection, text);
            }
        });
    });

}
