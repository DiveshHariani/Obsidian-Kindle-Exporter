import nodePandoc from "node-pandoc";

export const makePDF = async (filePath: string, filename: string) => {
    console.log(filePath);
    const args = `-o output/${filename}.epub`;

    nodePandoc(filePath, args, (err, result) => {if(err) {
            console.log(err)}
            else {
                console.log(result);
            }
        })
}