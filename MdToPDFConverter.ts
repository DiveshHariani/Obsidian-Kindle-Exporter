import { exec } from 'child_process';
import * as nodemailer from "nodemailer";
import * as dotenv from "dotenv";

export const makePDF = async (rootDir: string, filename: string, kindleEmail: string) => {
    dotenv.config({
        path: `${rootDir}/.obsidian/plugins/obsidian-sample-plugin/.env`,
        debug: true
    });
    console.log("EMAIL ID", process.env.GMAIL_USER);
    exec(`/opt/homebrew/bin/pandoc /Users/diveshhariani/Study/plugin-development/${filename} -o /Users/diveshhariani/Study/plugin-development/${filename.split(".")[0]}.pdf --pdf-engine=/Library/TeX/texbin/pdflatex`, (err, res) => {
        if(err) {
            console.log(err.message);
        } else {
            console.log(res);
            console.log("GMAIL USER", process.env);
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
                to: kindleEmail,
                subject: "Convert",
                attachments: [
                    {
                        filename: `${filename.split(".")[0]}.pdf`,
                        path:`/Users/diveshhariani/Study/plugin-development/${filename.split(".")[0]}.pdf`,
                        contentType: "application/pdf"
                    }
                ],
                html: '<div dir="auto"></div>'
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