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
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const formSchema = uploadFormSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      reference: "",
      confirm_reference: "",
      priority: "",
      file: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("subject", values.subject);
      formData.append("reference", values.reference);
      formData.append("priority", values.priority);
      if (file) {
        formData.append("file", file);
      }
      if (session) {
        formData.append("uploadedBy", session?.user.id);
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
        toast({
          description: result.message,
          variant: "default",
        });
        form.reset();
        setFile(null);
      } else {
        toast({
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error uploading letter: ", error);
      toast({
        description: "There was an error uploading the letter.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
