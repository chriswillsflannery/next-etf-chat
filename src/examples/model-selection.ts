import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";
import { generateText, type LanguageModel } from "ai";

export const ask = async (prompt: string, model: LanguageModel) => {
    const { text } = await generateText({
        model,
        prompt,
    });
    
    return text;
}

const prompt = "What is the capital of the moon?";

const anthropicResult = await ask(prompt, anthropic("claude-3-5-haiku-latest"));
const openaiResult = await ask(prompt, openai("gpt-4o"));

console.log(anthropicResult);
console.log(openaiResult);