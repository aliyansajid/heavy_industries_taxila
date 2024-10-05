"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { useState } from "react";
import { uploadFormSchema } from "@/lib/utils";
import { z } from "zod";
import CustomButton, { ButtonVariant } from "../CustomButton";
import { SelectItem } from "../ui/select";
import { Save, Send, Upload } from "lucide-react";
import SendLetterModal from "./SendLetterModal";

const UploadForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = uploadFormSchema;

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
            name="reference"
            label="Reference"
            placeholder="Enter reference"
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="confirm_reference"
            label="Confirm Reference"
            placeholder="Enter confirm reference"
          />

          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="priority"
            label="Priority"
            placeholder="Select an option"
          >
            <SelectItem value="Most Immediate">Most Immediate</SelectItem>
            <SelectItem value="Immediate">Immediate</SelectItem>
            <SelectItem value="Priority">Priority</SelectItem>
            <SelectItem value="MMU">MMU</SelectItem>
          </CustomFormField>

          <CustomButton
            variant={ButtonVariant.OUTLINE}
            text={"Upload"}
            className="w-full"
            iconSrc={Upload}
            onClick={() => setIsModalOpen(true)}
          />
          <div className="flex space-x-4">
            <div className="flex-1">
              <CustomButton
                variant={ButtonVariant.OUTLINE}
                text={"Save in system"}
                iconSrc={Save}
                disabled={isLoading}
                isLoading={isLoading}
                className="w-full"
              />
            </div>
            <div className="flex-1">
              <CustomButton
                variant={ButtonVariant.DEFAULT}
                text={"Send"}
                className="w-full"
                iconSrc={Send}
                onClick={() => setIsModalOpen(true)}
              />
            </div>
            {isModalOpen && (
              <SendLetterModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
              />
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UploadForm;
