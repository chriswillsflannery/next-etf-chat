import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { readFileSync } from "fs";

const systemPrompt = `
You will receive an image. Please create alt text for the image.
Be concise. Use adjectives only when necessary.
Do not pass 160 characters.
Use simple language.
`

// image in file explorer
// export const describeImage = async (imagePath: string) => {
//     const imageAsUint8Array = readFileSync(imagePath);

//     const { text } = await generateText({
//         model: openai("gpt-4o-mini"),
//         system: systemPrompt,
//         messages: [
//             {
//                 role: 'user',
//                 content: [
//                     {
//                         type: 'image',
//                         image: imageAsUint8Array,
//                     }
//                 ]
//             }
//         ]
//     })

//     return text;
// }

// image in url
export const describeImage = async (imageUrl: string) => {
    const { text } = await generateText({
        model: openai("gpt-4o-mini"),
        system: systemPrompt,
        messages: [
            {
                role: 'user',
                content: [
                    {
                        type: 'image',
                        image: new URL(imageUrl),
                    }
                ]
            }
        ]
    })

    return text;
}

const altText = await describeImage("https://example.com/image.jpg");
console.log(altText);
