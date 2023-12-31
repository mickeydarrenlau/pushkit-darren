import { Modal, Setting } from "obsidian";
import PKPlugin from "../main";

interface Data {
	obsidian: { kit_folder: string };
	site: { id: string; name: string };
}

export default class ReportModal extends Modal {
	data: any;
	pkplugin: PKPlugin;
	callback: Function;

	constructor(pkplugin: PKPlugin, callback?: Function) {
		super(app);
		this.pkplugin = pkplugin;
		this.callback = callback || (() => {});
	}

	onSubmit() {
		this.callback(this.data);
	}

	async onOpen() {
		const { contentEl, pkplugin } = this;
		const { pklib } = pkplugin;
		const cache = pklib.parser.cache;

		const data = (this.data = Object.values(cache.note));
		const summary = pklib.parser.print()
		console.log("preview cache", cache);

		await pklib.dumpFiles()
		await pklib.dbSave()
		console.log("done")
		    
	}

	// // .addSearch((btn) =>
	// //     btn.onChange(v => {
	// //         console.log('ooo', v)
	// //     })
	// // );

	// async onOpen() {
	// 	const { contentEl } = this;

	// 	const data = (this.data = {});
	// 	console.log("pof", data);

	// 	contentEl.createEl("h1", { text: "Publish Kit Report" });

	// 	new Setting(contentEl).setName(
	// 		`${data.rows.length} files (${filer.filesize(data.size)})`
	// 	);
	// 	// .addSearch((btn) =>
	// 	//     btn.onChange(v => {
	// 	//         console.log('ooo', v)
	// 	//     })
	// 	// );

	// 	data.rows.forEach((row: any) => {
	// 		const [date, path, size] = row;

	// 		new Setting(contentEl)
	// 			.setName(path)
	// 			.setDesc([date, size].join(" - "))
	// 			.addExtraButton((btn) =>
	// 				btn.setIcon("trash").onClick(() => {})
	// 			);
	// 	});
	// }

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}

const createCheckbox = (label: string) => {
	const checkBox = document.createElement("input");
	checkBox.setAttribute("type", "checkbox");
	checkBox.checked = true;

	//     <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
	// <label for="vehicle1"> I have a bike</label>

	return checkBox;
};
