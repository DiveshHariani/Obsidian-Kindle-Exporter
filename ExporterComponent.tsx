import * as React from 'react';
import { useState } from 'react';
import useApp from './hooks/useApp';
import { makePDF } from 'MdToPDFConverter';
// import * as path from "path";
import { FileSystemAdapter } from 'obsidian';

export const ExporterComponent = () => {
    const [password, setPassword] = useState("");
    const app = useApp();

    const uploadToKindle = () => {
        console.log(password);
        console.log(app?.vault.getMarkdownFiles()[0]);
        // console.log(app?.vault.getRoot().vault.adapter?.basePath);

        let rootDir = "";
        const adapter = app?.vault.adapter;
        if(adapter instanceof FileSystemAdapter) {
            rootDir = adapter.getBasePath();
        } 

        const markDownFiles = app?.vault.getMarkdownFiles();
        if(markDownFiles)
            for(const i of markDownFiles) {
                makePDF(rootDir, i.name);
                console.log(rootDir);
            }
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