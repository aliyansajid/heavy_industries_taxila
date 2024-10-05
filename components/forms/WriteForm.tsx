"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { useState } from "react";
import { z } from "zod";
import CustomButton, { ButtonVariant } from "../CustomButton";
import { SelectItem } from "../ui/select";
import { Download } from "lucide-react";
import { writeSchema } from "@/lib/utils";

const WriteForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = writeSchema;

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
          className="space-y-5 w-1/2 p-8"
        >
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="subject"
            label="Subject"
            placeholder="Enter subject"
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="draft"
            label="Draft"
            placeholder="Enter draft"
          />

          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="template"
            label="Template"
            placeholder="Select an option"
          >
            <SelectItem value="Most Immediate">Template 1</SelectItem>
            <SelectItem value="Immediate">Template 2</SelectItem>
            <SelectItem value="Priority">Template 3</SelectItem>
          </CustomFormField>

          <CustomButton
            variant={ButtonVariant.DEFAULT}
            text={"Download"}
            className="w-full"
            iconSrc={Download}
            isLoading={isLoading}
            disabled={isLoading}
          />
        </form>
      </Form>
    </div>
  );
};

export default WriteForm;
