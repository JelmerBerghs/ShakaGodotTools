// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
let cwd : string = "";
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	if(vscode.workspace.workspaceFolders !== undefined) {
		cwd = vscode.workspace.workspaceFolders[0].uri.fsPath + "\\";
	}

	const command = vscode.commands.registerCommand('godotsceneselector.selectscene', async () => {
		const files = await vscode.workspace.findFiles("**/*.tscn");
		return await vscode.window.showQuickPick(files.map(v => v.fsPath.replace(cwd, ''))).then((value => {
			if (value !== undefined) {
				return value;
			}
			return "";
		}));
	});

	context.subscriptions.push(command);
}

// This method is called when your extension is deactivated
export function deactivate() {}
