'use server';

/**
 * @fileOverview AI flow to generate ad copy including a catchy title, descriptive caption,
 * relevant hashtags, and optional CTAs for an advertisement based on an uploaded image.
 *
 * - generateAdCopy - A function that generates the ad copy.
 * - GenerateAdCopyInput - The input type for the generateAdCopy function.
 * - GenerateAdCopyOutput - The return type for the generateAdCopy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAdCopyInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the product, place, or scene, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  theme: z.string().describe('The theme of the advertisement (e.g., wedding, birthday, festive, branding).'),
  productName: z.string().describe('The name of the product or service being advertised.'),
});
export type GenerateAdCopyInput = z.infer<typeof GenerateAdCopyInputSchema>;

const GenerateAdCopyOutputSchema = z.object({
  title: z.string().describe('A catchy title for the advertisement.'),
  caption: z.string().describe('A descriptive caption for the advertisement.'),
  hashtags: z.array(z.string()).describe('Relevant hashtags for the advertisement.'),
  callToAction: z.string().optional().describe('Optional call to action for the advertisement (e.g., Book Now, Limited Slots).'),
});
export type GenerateAdCopyOutput = z.infer<typeof GenerateAdCopyOutputSchema>;

export async function generateAdCopy(input: GenerateAdCopyInput): Promise<GenerateAdCopyOutput> {
  return generateAdCopyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAdCopyPrompt',
  input: {schema: GenerateAdCopyInputSchema},
  output: {schema: GenerateAdCopyOutputSchema},
  prompt: `You are a marketing expert specializing in generating engaging advertisement copy.

  Based on the image, theme, and product name provided, you will generate a catchy title, descriptive caption, relevant hashtags, and an optional call to action for the advertisement.

  Image: {{media url=photoDataUri}}
  Theme: {{{theme}}}
  Product Name: {{{productName}}}

  Title:
  Caption:
  Hashtags:
  Call to Action:`, // The final colon is important in Gemini prompting
});

const generateAdCopyFlow = ai.defineFlow(
  {
    name: 'generateAdCopyFlow',
    inputSchema: GenerateAdCopyInputSchema,
    outputSchema: GenerateAdCopyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
