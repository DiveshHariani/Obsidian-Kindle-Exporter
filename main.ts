import { App, Plugin, PluginSettingTab, Setting } from 'obsidian';
import ExporterModal from './ExporterModal';

interface KindleExporterSettings {
	email: string,
	password: string,
	kindleEmail: string
}

const DEFAULT_SETTINGS: KindleExporterSettings = {
	email: '',
	password: '',
	kindleEmail: ''
}

export default class KindleExporter extends Plugin {
	settings: KindleExporterSettings;

	async onload() {
		
		await this.loadSettings();

		const ribbonIconEl = this.addRibbonIcon('dice', 'Kindle Exporter Plugin', (evt: MouseEvent) => {
			new ExporterModal(this.app).open();
		});


		ribbonIconEl.addClass('my-plugin-ribbon-class');

		this.addSettingTab(new KindleExporterSettingsTab(this.app, this));

		/* this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});*/

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {
		console.log("unloading");
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class KindleExporterSettingsTab extends PluginSettingTab {
	plugin: KindleExporter;

	constructor(app: App, plugin: KindleExporter) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();
		containerEl.createEl('h2', {text: 'Settings for Kindle Exporter Plugin!'});

		new Setting(containerEl)
			.setName('Kindle Email')
			.setDesc('Add Kindle Email Address')
			.addText(text => text
				.setPlaceholder('Enter your Kindle email')
				.setValue(this.plugin.settings.kindleEmail)
				.onChange(async (value) => {
					this.plugin.settings.kindleEmail = value;
					await this.plugin.saveSettings();
				}));
		
		new Setting(containerEl)
			.setName('Email Address')
			.setDesc('Add your Email Address(Please ensure this email address has authority to write to your kindle device')
			.addText(text => text
				.setPlaceholder('Enter your Email Address')
				.setValue(this.plugin.settings.email)
				.onChange(async (value) => {
					this.plugin.settings.email = value;
					await this.plugin.saveSettings();
				}));
	}
}
