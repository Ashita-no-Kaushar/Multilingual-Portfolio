import { z } from 'zod';

export const ContactAnalysisInputSchema = z.object({
  name: z.string().describe('The name of the person sending the message.'),
  email: z.string().email().describe('The email address of the sender.'),
  subject: z.string().describe('The subject line of the message.'),
  message: z.string().describe('The content of the message.'),
});
export type ContactAnalysisInput = z.infer<typeof ContactAnalysisInputSchema>;

export const ContactAnalysisOutputSchema = z.object({
  category: z
    .enum(['Job Opportunity', 'Collaboration', 'Feedback', 'Spam', 'Other'])
    .describe('The primary category of the contact message.'),
  summary: z.string().describe('A one-sentence summary of the message content.'),
  suggestedReply: z
    .string()
    .describe('A brief, friendly, and professional suggested reply to the sender.'),
});
export type ContactAnalysisOutput = z.infer<
  typeof ContactAnalysisOutputSchema
>;