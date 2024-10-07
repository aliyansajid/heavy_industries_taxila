import { createDraftSchema } from "@/lib/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import CustomButton, { ButtonVariant } from "../CustomButton";
import { zodResolver } from "@hookform/resolvers/zod";
import ModalDialog from "../ModalDialog";
import { Files, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import AttachmentModal from "./AttachmentModal";
import { useSession } from "next-auth/react";

const CreateDraftForm = ({
  isOpen,
  setIsOpen,
  letterId,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  letterId: string;
}) => {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [selectedAttachments, setSelectedAttachments] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formSchema = createDraftSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleOpen = () => {
    setIsOpen(true);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("draft", values.draft);
      formData.append("subject", values.subject);
      if (file) {
        formData.append("file", file);
      }
      if (session && session.user && session.user.id) {
        formData.append("createdBy", session.user.id);
      }
      formData.append("attachments", JSON.stringify(selectedAttachments));
      formData.append("letterId", letterId);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/draft/create-draft`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        toast({ description: "Draft created successfully!" });
        setIsOpen(false);
      } else {
        const errorData = await response.json();
        toast({ description: errorData.error, variant: "destructive" });
      }
    } catch (error) {
      console.error("Error creating draft: ", error);
      toast({ description: "Error creating draft.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <ModalDialog
        isOpen={isOpen}
        title="Send Letter"
        description="Select the department and employees to send the letter"
        onClose={() => setIsOpen(false)}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="draft"
              label="Draft"
              placeholder="Enter draft"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="subject"
              label="Subject"
              placeholder="Enter subject"
            />
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
            <div className="flex gap-4">
              <div className="flex-1">
                <CustomButton
                  variant={ButtonVariant.OUTLINE}
                  type="button"
                  text={"Attachment"}
                  className="w-full"
                  iconSrc={Files}
                  disabled={isLoading}
                  isLoading={isLoading}
                  onClick={() => setIsModalOpen(true)}
                />
              </div>
              <div className="flex-1">
                <CustomButton
                  variant={ButtonVariant.DEFAULT}
                  text={"Save"}
                  className="w-full"
                  iconSrc={Save}
                  disabled={isLoading}
                  isLoading={isLoading}
                  onClick={handleOpen}
                />
              </div>
            </div>
          </form>
        </Form>
      </ModalDialog>

      {isModalOpen && (
        <AttachmentModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          onAttachmentSelected={(attachment) => {
            setSelectedAttachments((prev) => [...prev, attachment]);
          }}
        />
      )}
    </>
  );
};

export default CreateDraftForm;
