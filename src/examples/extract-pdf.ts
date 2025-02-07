import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { readFileSync } from "fs";
import { z } from "zod";

const schema = z
  .object({
    total: z.number().describe("The total amount of the invoice"),
    currency: z.string().describe("The currency of the total amount"),
    invoiceNumber: z.string().describe("The invoice number"),
    companyAddress: z.string().describe("The address of the company"),
    companyName: z.string().describe("The name of the company"),
    invoiceeAddress: z.string().describe("The address of the invoicee"),
  })
  .describe("The extracted invoice data");

  // path in local fs
export const extractInvoiceData = async (pdfPath: string) => {
  const { object } = await generateObject({
    model: openai("gpt-4o-mini"),
    system:
      "You are a helpful assistant that extracts invoice data from a PDF file.",
    schema,
    messages: [
        {
            role: 'user',
            content: [
                {
                    type: 'file',
                    data: readFileSync(pdfPath),
                    mimeType: 'application/pdf',
                }
            ]
        }
    ]
  });

  return object;
};

const invoiceData = await extractInvoiceData("./invoice.pdf");
console.log(invoiceData);
