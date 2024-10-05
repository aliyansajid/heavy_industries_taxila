import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { z } from "zod";
import { sendLetterSchema } from "@/lib/utils";
import CustomButton, { ButtonVariant } from "../CustomButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectItem } from "../ui/select";
import ModalDialog from "../ModalDialog";
import { Send } from "lucide-react";

const SendLetterModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const formSchema = sendLetterSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {}

  return (
    <ModalDialog
      isOpen={isOpen}
      title="Send Letter"
      description="Select the department and employees to send the letter"
      onClose={() => setIsOpen(false)}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="department"
            label="Department"
            placeholder="Select an option"
          >
            <SelectItem value="Engineering">Engineering</SelectItem>
            <SelectItem value="Marketing">Marketing</SelectItem>
            <SelectItem value="Sales">Sales</SelectItem>
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldType.MULTI_SELECT}
            control={form.control}
            name="employees"
            label="Employees"
            placeholder="Select an option"
            options={[
              { label: "John Doe", value: "john" },
              { label: "Jane Smith", value: "jane" },
              { label: "Mike Johnson", value: "mike" },
            ]}
          />

          <CustomButton
            variant={ButtonVariant.DEFAULT}
            text={"Send"}
            className="w-full"
            iconSrc={Send}
          />
        </form>
      </Form>
    </ModalDialog>
  );
};

export default SendLetterModal;
