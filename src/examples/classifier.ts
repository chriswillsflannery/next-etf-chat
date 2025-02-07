import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";

const model = openai("gpt-4o-mini");

export const classifySentiment = async (prompt: string) => {
    const result = await generateObject({
        model,
        output: 'enum',
        enum: ['positive', 'negative', 'neutral'],
        prompt,
        system: 'You are a sentiment classifier. You will be given a prompt and you will need to classify the sentiment of the prompt.',
    })

    return result.object;
}

const sentiment = await classifySentiment("I love this product!");
console.log(sentiment);
