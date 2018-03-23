'use strict';
import * as vscode from 'vscode';

export default function replaceSelections(
    callback: (text: string, i: number, selections: vscode.Selection[]) => string) {
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

    const document = editor.document;
    editor.edit(edit => {
        for (let i = 0; i < selections.length; i++) {
            const selection = selections[i];
            let text = document.getText(selection);

            text = callback(text, i, selections);
            edit.replace(selection, text);
        }
    });
}
