import PKPlugin from "../main";
import Setup from "src/setup";
import Obs from "src/obs";
import { App, FileSystemAdapter, PluginSettingTab, Setting, normalizePath, TextAreaComponent, } from "obsidian";


export class SettingTab extends PluginSettingTab {
  plugin: PKPlugin;
  pkplugin: PKPlugin;
  obs: Obs;

  constructor(app: App, plugin: PKPlugin) {
    super(app, plugin);
    this.plugin = plugin;
    this.pkplugin = plugin;
    
  }

  async display(): Promise<void> {
    let { containerEl, pkplugin } = this;
    const { pklib } = pkplugin;
    containerEl.empty();
    containerEl.createEl("h1", { text: "Darren's KIT" });
    if (!await this.plugin.app.vault.adapter.exists("kitrc.md")) {
      new Setting(containerEl)
      .setName("Config Not Found")
      .setDesc("Create it now?")
      .addButton((btn) =>
			btn
				.setButtonText("Make the config")
				.setCta()
				.onClick(() => {
					new Setup(this.plugin, async (data: object) => {
            await pklib.createKitrc(data);
            const file = this.obs.getFile("kitrc.md");
            file && this.obs.openFile(file, { newPane: true });
          }).open();
				})
		);
    } else {
      containerEl.createEl("h1", { text: "Edit Config Here" });
      const outputEl = new TextAreaComponent(containerEl)
      .setValue(await this.plugin.app.vault.adapter.read("kitrc.md"))
      .setDisabled(false)
      .then((cb) => {
        cb.inputEl.style.width = "100%";
        cb.inputEl.style.height = "100%";
      });
      new Setting(containerEl)
      .addButton((btn) =>
			btn
				.setButtonText("Save")
				.setCta()
				.onClick(() => {
					this.plugin.app.vault.adapter.write("kitrc.md", outputEl.getValue())
				})
		);
    }
    
    

    
  }
}