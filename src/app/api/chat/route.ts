import OpenAI from "openai";
import { streamText } from "ai";
import { DataAPIClient } from "@datastax/astra-db-ts";
import { openai as aisdkOpenai } from "@ai-sdk/openai";
const {
  ASTRA_DB_NAMESPACE,
  ASTRA_DB_COLLECTION,
  ASTRA_DB_API_ENDPOINT,
  ASTRA_DB_APPLICATION_TOKEN,
  OPENAI_API_KEY,
} = process.env;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN);
const db = client.db(ASTRA_DB_API_ENDPOINT || "", {
  namespace: ASTRA_DB_NAMESPACE,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const latestMessage = messages[messages.length - 1]?.content;

    let docContext = "";
    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: latestMessage,
      encoding_format: "float",
    });

    try {
      const collection = await db.collection(ASTRA_DB_COLLECTION || "");
      const cursor = collection.find(
        {},
        {
          sort: {
            $vector: embedding.data[0].embedding,
          },
          limit: 10,
        },
      );

      const documents = await cursor.toArray();
      const docsMap = documents?.map((doc) => doc.text);
      docContext = JSON.stringify(docsMap);
    } catch {
      console.log("Error querying db");
      docContext = "";
    }

    const systemMessage = {
      role: "system",
      content: `You are an AI assistant who knows everything about stock trading.
        Use the below context to augment what you know about stock trading.
        The context will provide you with the most recent page data from various ETF index tracking websites.
        If the context doesn't include the information you need, ALWAYS answer based on your existing knowledge.
        NEVER mention the source of your information.
        NEVER mention what the context does or does not include.
        Format responses using markdown where applicable.
        NEVER return images.
        ---------
        START CONTEXT
        ${docContext}
        END CONTEXT
        ---------`,
    };

    const { textStream } = streamText({
      model: aisdkOpenai("gpt-3.5-turbo"),
      messages: [systemMessage, ...messages],
    });

    // set up streaming response headers
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const text of textStream) {
            controller.enqueue(encoder.encode(text));
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
