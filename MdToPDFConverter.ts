// import nodePandoc from "node-pandoc";
// import * as fs from 'fs';
import { exec } from 'child_process';
import * as nodemailer from "nodemailer";

export const makePDF = async (rootDir: string, filename: string) => {
    // console.log(filePath); pandoc {filename}.md -o pdfs/{filename}.pdf
    console.log(rootDir);
    console.log(filename);
    exec(`/opt/homebrew/bin/pandoc /Users/diveshhariani/Study/plugin-development/Test-Document.md -o /Users/diveshhariani/Study/plugin-development/Test-Document.pdf --pdf-engine=/Library/TeX/texbin/pdflatex`, (err, res) => {
        if(err) {
            console.log(err.message);
        } else {
            console.log(res);
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  type: 'OAuth2',
                  user: process.env.GMAIL_USER,
                  pass: process.env.GMAIL_PASS,
                  clientId: process.env.OAUTH_CLIENT_KEY,
                  clientSecret: process.env.OAUTH_CLIENT_SECRET,
                  refreshToken: process.env.OAUTH_REFRESH_TOKEN
                }
              });
            
            const mailOptions = {
                from: 'diveshkindleaccess@gmail.com',
                to: 'diveshkindleaccess@gmail.com',
                subject: "Test Email",
                text: "This is test email"
            }
            console.log('here');
            transporter.sendMail(mailOptions, (err, res) => {
                if(err) {
                    console.log(err.message);
                } else {
                    console.log("Email sent successfully!");
                }
            })
        }
    });
}