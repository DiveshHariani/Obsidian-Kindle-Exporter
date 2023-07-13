import {App, Modal} from "obsidian";
import * as React from "react"
import { ExporterComponent } from './ExporterComponent';
import { createRoot } from 'react-dom/client';

export const AppContext = React.createContext<App | undefined>(undefined);

export default class KindleExporterModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const root = createRoot(this.containerEl.children[1]);
        root.render(
			<AppContext.Provider value={this.app}>
				<ExporterComponent />
			</AppContext.Provider>
		)
	}

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
} 