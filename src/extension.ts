'use strict';
import * as vscode from 'vscode';
import moveToFile from './move-to-file';
import quotesEncode from './quick-edits/quotes-encode'
import casing from './quick-edits/casing';
import numbering from './quick-edits/numbering'
import joinBy from './quick-edits/join-by';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "jblade" is now active!');

    const commandHandlers: { [index: string]: () => void } = {
        moveToFile,
        ...quotesEncode,
        ...casing,
        ...numbering,
        ...joinBy
    }
    
    Object.keys(commandHandlers).forEach(name => {
        const func = commandHandlers[name];
        if (typeof func === 'function') {
            const disposable = vscode.commands.registerCommand(`jblade.${name}`, func);
            context.subscriptions.push(disposable);
        }
    });

}

// this method is called when your extension is deactivated
export function deactivate() {
}