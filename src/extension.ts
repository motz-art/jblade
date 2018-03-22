'use strict';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "jblade" is now active!');

    let disposable = vscode.commands.registerCommand('extension.moveToFile', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showWarningMessage('Editor should be active.');
            return;
        }

        const selections = editor.selections;
        if (!selections || selections.length === 0) {
            vscode.window.showWarningMessage('Should have at least cursor.');
        }


        try {
            vscode.workspace.openTextDocument(vscode.Uri.parse('untitled://./file.js')).then(doc => {
                if (!doc) {
                    vscode.window.showWarningMessage('Something went wrong, and we can not create new editor. Sorry!');
                    return;
                }
                var text = editor.document.getText(selections[0]);
                editor.edit(x => x.delete(selections[0]));

                vscode.window.showTextDocument(doc).then(newEditor => {
                    if (!newEditor) {
                        vscode.window.showWarningMessage('No new editor????');
                        return;
                    }
                    if (newEditor.document !== doc) {
                        vscode.window.showWarningMessage(`Doc mismatch??? ${doc.fileName} <> ${editor.document.fileName}`);
                    }
                    newEditor.edit(eb => {
                        eb.insert(new vscode.Position(0, 0), text);
                    });
    
                })
            });
        } catch (err) {
            console.error(err);
        }
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}