import {App, Modal} from "obsidian";
import * as React from "react"
import { ExporterComponent } from './ExporterComponent';
import { createRoot } from 'react-dom/client';
import { KindleExporterSettings } from "main";

// interface AppInterface {
// 	app: App,
// 	settings: Sett
// }

export const AppContext = React.createContext<App | undefined>(undefined);

export default class KindleExporterModal extends Modal {
	settings: KindleExporterSettings;
	constructor(app: App, settings: KindleExporterSettings) {
		super(app);
		this.settings = settings;
	}

	onOpen() {
		const root = createRoot(this.containerEl.children[1]);
        root.render(
			<AppContext.Provider value={this.app}>
				<ExporterComponent settings={this.settings} />
			</AppContext.Provider>
		)
	}

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
} 