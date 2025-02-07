import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";

const model = anthropic("claude-3-5-haiku-latest");

export const answerMyQuestion = async (prompt: string) => {
    const { textStream, text } = await streamText({
        model,
        prompt,
    });

    for await (const text of textStream) {
        process.stdout.write(text);
    }

    // Promise if you want to wait for the full text as one string
    const finalText = await text;

    return { finalText }
}
