import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

const model = anthropic("claude-3-5-haiku-latest");

export const summarizeText = async (input: string) => {
    const { text } = await generateText({
        model,
        prompt: input,
        system: `
        You are a helpful assistant that summarizes text.
        `
        // optionally we could pass "messages" instead of system/prompt.
    })

    return text;
}