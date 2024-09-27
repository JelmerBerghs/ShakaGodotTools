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

	const cmdSelectScene = vscode.commands.registerCommand('GodotTools.SelectScene', async () => {
		const files = await vscode.workspace.findFiles("**/*.tscn");
		
		return await vscode.window.showQuickPick(
			files.map(file => { 
				var fileName = file.fsPath.split("\\").pop();
				var item : QuickPickItemScene = {
					label: fileName!,
					description: file.fsPath.replace(cwd, ''),
					file: file
				};
				return item;
			})).then((value => {
				vscode.window.showInformationMessage(`Selected ${value?.label}`);
				if (value !== undefined) {
					return value.description?.replace(cwd, '');
				}
				return "";
			}));
	});

	context.subscriptions.push(cmdSelectScene);
}

// This method is called when your extension is deactivated
export function deactivate() {}

class QuickPickItemScene implements vscode.QuickPickItem {
	label: string;
	kind?: vscode.QuickPickItemKind | undefined;
	iconPath?: vscode.Uri | vscode.ThemeIcon | { light: vscode.Uri; dark: vscode.Uri; } | undefined;
	description?: string | undefined;
	detail?: string | undefined;
	picked?: boolean | undefined;
	alwaysShow?: boolean | undefined;
	buttons?: readonly vscode.QuickInputButton[] | undefined;
	file?: vscode.Uri;
	constructor(_label: string){
		this.label = _label;
	}

  };
