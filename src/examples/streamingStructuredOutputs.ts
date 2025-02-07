import { openai } from "@ai-sdk/openai";
import { streamObject, } from "ai";
import { z } from "zod";

// eg json schema
// const recipe = {
//     name: "chocolate cake",
//     ingredients: ["flour", "sugar", "cocoa", "eggs", "milk", "butter"],
//     instructions: ["mix ingredients", "bake in oven", "cool down", "decorate"],
// }

// small tool calling model
const model = openai("gpt-4o-mini");

const schema = z.object({
  name: z.string().describe("The name of the recipe"),
  ingredients: z
    .array(z.string())
    .describe("The ingredients needed for the recipe"),
  instructions: z
    .array(z.string())
    .describe("The instructions to prepare the recipe"),
});

export const createRecipe = async (prompt: string) => {
  const result = await streamObject({
    model,
    schema,
    prompt,
    schemaName: 'recipe',
    // schemaDescription: 'A recipe for a dish',
    system: "You are a helpful assistant that can create recipes.",
  });

  // as stream
  for await (const obj of result.partialObjectStream) {
    console.clear();
    console.dir(obj, { depth: null })
    // send chunks over network to client
  }

  const finalobj = await result.object;
  return finalobj;
};

const recipe = await createRecipe("I want to make a chocolate cake");
console.log(recipe);