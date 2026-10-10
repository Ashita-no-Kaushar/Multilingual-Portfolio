'use server';
/**
 * @fileOverview An AI flow for analyzing and categorizing contact form submissions.
 *
 * - analyzeContactMessage - A function that handles the message analysis.
 */

import { ai } from '@/ai/genkit';
import {
  ContactAnalysisInputSchema,
  ContactAnalysisOutputSchema,
  type ContactAnalysisInput,
  type ContactAnalysisOutput,
} from '@/ai/schemas/contact-analysis-schema';

export async function analyzeContactMessage(
  input: ContactAnalysisInput
): Promise<ContactAnalysisOutput> {
  return analyzeContactFlow(input);
}

const analyzePrompt = ai.definePrompt({
  name: 'analyzeContactPrompt',
  input: { schema: ContactAnalysisInputSchema },
  output: { schema: ContactAnalysisOutputSchema },
  prompt: `You are an expert at analyzing and categorizing incoming contact messages for a data scientist's portfolio website. Your goal is to process the message and provide a structured output.

Analyze the following message submitted by a user:

- **From:** {{{name}}} ({{{email}}})
- **Subject:** {{{subject}}}
- **Message:**
{{{message}}}

Based on the content, perform the following tasks:
1.  **Categorize the message.** Choose the most fitting category: 'Job Opportunity', 'Collaboration', 'Feedback', 'Spam', or 'Other'.
2.  **Summarize the message.** Create a concise, one-sentence summary of the user's request.
3.  **Draft a suggested reply.** Write a brief, professional, and friendly reply that acknowledges the message and sets expectations for a follow-up. For example, "Thanks for reaching out, [Name]! I've received your message and will get back to you shortly."

Provide the output in the required JSON format.
`,
});

const analyzeContactFlow = ai.defineFlow(
  {
    name: 'analyzeContactFlow',
    inputSchema: ContactAnalysisInputSchema,
    outputSchema: ContactAnalysisOutputSchema,
  },
  async (input) => {
    const { output } = await analyzePrompt(input);
    return output!;
  }
);
