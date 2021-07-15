import * as vscode from 'vscode';

const EXTENSION_NAME = 'touch-bar-web-dev'

enum DefaultWebDevCommands {
  Install = 'yarn',
  Serve = 'yarn serve',
  Build = 'yarn build',
  Test = 'yarn test'
}

enum ExtensionCommands {
  SaveAll = 'saveAll',
  Install = 'installScript',
  Serve = 'serveScript',
  Build = 'buildScript',
  Test = 'testScript'
}

type Nullable<T> = T | null | undefined

function registerCommand(command: string, fn: (...args: Array<any>) => any): vscode.Disposable {
  return vscode.commands.registerCommand(`${EXTENSION_NAME}.${command}`, fn);
}

function getActiveTerminal(shouldBeShown = true): vscode.Terminal {
  const activeTerminal = vscode.window.activeTerminal ?? vscode.window.createTerminal();
  if (shouldBeShown) {
    activeTerminal.show();
  }
  return activeTerminal;
}

function getConfig(prop: string): Nullable<string> {
  const config = vscode.workspace.getConfiguration(EXTENSION_NAME);
  return config.get(prop);
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext): void {
  console.log(`Congratulations, your extension "${EXTENSION_NAME}" is now active!`);

  const commands = [
    registerCommand(ExtensionCommands.SaveAll, () => {
      vscode.workspace.saveAll();
    }),
    registerCommand(ExtensionCommands.Install, () => {
      const activeTerminal = getActiveTerminal();
      activeTerminal.sendText(getConfig(ExtensionCommands.Install) || DefaultWebDevCommands.Install);
    }),
    registerCommand(ExtensionCommands.Serve, () => {
      const activeTerminal = getActiveTerminal();
      activeTerminal.sendText(getConfig(ExtensionCommands.Serve) || DefaultWebDevCommands.Serve);
    }),
    registerCommand(ExtensionCommands.Build, () => {
      const activeTerminal = getActiveTerminal();
      activeTerminal.sendText(getConfig(ExtensionCommands.Build) || DefaultWebDevCommands.Build);
    }),
    registerCommand(ExtensionCommands.Test, () => {
      const activeTerminal = getActiveTerminal();
      activeTerminal.sendText(getConfig(ExtensionCommands.Test) || DefaultWebDevCommands.Test);
    })
  ];

  context.subscriptions.push(...commands);
}

// this method is called when your extension is deactivated
export function deactivate(): void {}
