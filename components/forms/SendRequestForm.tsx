"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { useState } from "react";
import { z } from "zod";
import CustomButton, { ButtonVariant } from "../CustomButton";
import { Send } from "lucide-react";

const SendRequestForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    subject: z.string({ required_error: "Subject is required" }),
    message: z.string({ required_error: "Message is required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
  }

  return (
    <div className="flex justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 p-8 w-1/2"
        >
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="subject"
            label="Subject"
            placeholder="Enter subject"
          />

          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="message"
            label="Message"
            placeholder="Enter your message"
          />

          <CustomButton
            type="submit"
            variant={ButtonVariant.DEFAULT}
            text={"Send"}
            iconSrc={Send}
            disabled={isLoading}
            isLoading={isLoading}
            className="w-full"
          />
        </form>
      </Form>
    </div>
  );
};

export default SendRequestForm;
