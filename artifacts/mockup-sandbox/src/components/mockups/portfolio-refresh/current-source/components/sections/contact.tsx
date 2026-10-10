
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from '@portfolio/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@portfolio/components/ui/form";
import { Input } from "@portfolio/components/ui/input";
import { Textarea } from "@portfolio/components/ui/textarea";
import { Card, CardContent } from "@portfolio/components/ui/card";
import { useMemo, useState } from "react";
import { Send } from "lucide-react";
import { InlineMessage } from "@portfolio/components/ui/inline-message";
import { usePortfolioSettings } from '@portfolio/i18n';

const Contact = () => {
  const { t } = usePortfolioSettings();
  const formSchema = useMemo(() => z.object({
    name: z.string().min(2, { message: t('Name must be at least 2 characters.') }),
    email: z.string().email({ message: t('Please enter a valid email address.') }),
    subject: z.string().min(2, { message: t('Subject must be at least 2 characters.') }),
    message: z.string().min(10, { message: t('Message must be at least 10 characters.') }),
  }), [t]);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit() {
    setError(null);
    setError(t("This isolated preview does not send contact form submissions. Your message has not been sent."));
  }

  return (
    <div className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">{t('Get in Touch')}</h2>
          <p className="text-lg text-muted-foreground mt-2">{t('Open to internships, freelance collaborations, and entry-level data roles. I usually respond within 24 hours.')}</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-6 md:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('Name')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('Your Name')} {...field} autoComplete="off"/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('Email')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('your.email@example.com')} {...field} autoComplete="off"/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('Subject')}</FormLabel>
                        <FormControl>
                            <Input placeholder={t('Subject')} {...field} autoComplete="off"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('Message')}</FormLabel>
                        <FormControl>
                            <Textarea placeholder={t('Your message...')} {...field} className="min-h-[150px]" autoComplete="off"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="space-y-2">
                    <Button type="submit" className="w-full">
                      <Send className="mr-2"/> {t('Send Message')}
                    </Button>
                    {error && <InlineMessage variant="destructive">{error}</InlineMessage>}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
