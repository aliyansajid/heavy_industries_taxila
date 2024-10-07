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
import { Save, Send } from "lucide-react";
import SendLetterModal from "./SendLetterModal";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";

const UploadForm = () => {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [letterInfo, setLetterInfo] = useState<{
    id: string;
    subject: string;
    reference: string;
  } | null>(null);

  const formSchema = uploadFormSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function uploadLetter(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("subject", values.subject);
    formData.append("reference", values.reference);
    formData.append("priority", values.priority);
    if (file) {
      formData.append("file", file);
    }
    if (session) {
      formData.append("uploadedBy", session?.user.id);
      formData.append("sendBy", session.user.name);
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/letters/upload-letter`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    if (response.ok) {
      setLetterInfo({
        id: result.letter.id,
        subject: values.subject,
        reference: values.reference,
      });
      toast({
        description: result.message,
        variant: "default",
      });
      form.reset({
        subject: "",
        reference: "",
        confirm_reference: "",
        priority: "",
        file: "",
      });
      setFile(null);
      return result.letter;
    } else {
      toast({
        description: result.message,
        variant: "destructive",
      });
    }
  }

  async function handleSaveInSystem(values: z.infer<typeof formSchema>) {
    setIsSaving(true);
    try {
      await uploadLetter(values);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleSend(values: z.infer<typeof formSchema>) {
    setIsSending(true);
    try {
      const uploadedLetter = await uploadLetter(values);
      if (uploadedLetter) {
        setIsModalOpen(true);
      }
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="flex justify-center">
      <Form {...form}>
        <form className="space-y-5 w-1/2 p-8">
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

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            type="file"
            control={form.control}
            name="file"
            label="Browse files"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setFile(e.target.files[0]);
              }
            }}
            className="cursor-pointer"
          />

          <div className="flex space-x-4">
            <div className="flex-1">
              <CustomButton
                variant={ButtonVariant.OUTLINE}
                text={"Save in system"}
                iconSrc={Save}
                disabled={isSaving || isSending}
                isLoading={isSaving}
                className="w-full"
                onClick={form.handleSubmit(handleSaveInSystem)}
              />
            </div>
            <div className="flex-1">
              <CustomButton
                variant={ButtonVariant.DEFAULT}
                text={"Send"}
                className="w-full"
                iconSrc={Send}
                disabled={isSending || isSaving}
                isLoading={isSending}
                onClick={form.handleSubmit(handleSend)}
              />
            </div>
          </div>
        </form>
      </Form>

      {isModalOpen && letterInfo && session?.user?.id && (
        <SendLetterModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          letterId={letterInfo.id}
          subject={letterInfo.subject}
          reference={letterInfo.reference}
          uploadedBy={session.user.id}
        />
      )}
    </div>
  );
};

export default UploadForm;
