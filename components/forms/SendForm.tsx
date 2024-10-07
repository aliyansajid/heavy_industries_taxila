"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { useState } from "react";
import { z } from "zod";
import CustomButton, { ButtonVariant } from "../CustomButton";
import { SelectItem } from "../ui/select";
import { Files, Send } from "lucide-react";
import { sendSchema } from "@/lib/utils";
import SendLetterModal from "./SendLetterModal";
import SearchModal from "./AttachmentModal";

const SendForm = () => {
  const [isAttachmentModalOpen, setIsAttachmentModalOpen] = useState(false);
  const [isSendLetterModalOpen, setIsSendLetterModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = sendSchema;

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
            type="file"
            control={form.control}
            name="upload"
            label="Upload"
            placeholder="Select a file"
            className="cursor-pointer"
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

          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="remarks"
            label="Remarks"
            placeholder="Add remarks"
          />

          <CustomButton
            variant={ButtonVariant.OUTLINE}
            text={"Attachments"}
            className="w-full"
            iconSrc={Files}
            onClick={() => setIsAttachmentModalOpen(true)}
          />

          <CustomButton
            variant={ButtonVariant.DEFAULT}
            text={"Send"}
            className="w-full"
            iconSrc={Send}
            onClick={() => setIsSendLetterModalOpen(true)}
          />

          {isAttachmentModalOpen && (
            <SearchModal
              isOpen={isAttachmentModalOpen}
              setIsOpen={setIsAttachmentModalOpen}
            />
          )}

          {isSendLetterModalOpen && (
            <SendLetterModal
              isOpen={isSendLetterModalOpen}
              setIsOpen={setIsSendLetterModalOpen}
            />
          )}
        </form>
      </Form>
    </div>
  );
};

export default SendForm;
