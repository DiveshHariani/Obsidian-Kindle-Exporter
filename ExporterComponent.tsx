import * as React from 'react';
import { useState } from 'react';
import useApp from './hooks/useApp';
import { makePDF } from 'MdToPDFConverter';
// import * as path from "path";
import { FileSystemAdapter } from 'obsidian';
import { KindleExporterSettings } from 'main';

export const ExporterComponent = ({settings}: {settings: KindleExporterSettings}) => {
    const [password, setPassword] = useState("");
    const app = useApp();

    const uploadToKindle = () => {
        console.log(password);
        console.log(app?.vault.getMarkdownFiles()[0]);

        let rootDir = "";
        const adapter = app?.vault.adapter;
        if(adapter instanceof FileSystemAdapter) {
            rootDir = adapter.getBasePath();
        } 

        // const markDownFiles = app?.vault.getMarkdownFiles();
        const activeMarkDownFile = app?.workspace.getActiveFile();
        const kindleEmail = settings.kindleEmail;
        console.log(activeMarkDownFile?.name);
        if(activeMarkDownFile && activeMarkDownFile.name) makePDF(rootDir, activeMarkDownFile?.name, kindleEmail);
    }
    return (
        <>
            <input type="password" 
                    placeholder='Enter your Email password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}/>
            <button type="button" onClick={uploadToKindle}>Upload</button>
        </>
    )
}