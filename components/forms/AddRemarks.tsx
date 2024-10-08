"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { useToast } from "@/hooks/use-toast";
import ModalDialog from "../ModalDialog";
import CustomButton, { ButtonVariant } from "../CustomButton";
import { Plus, PlusCircle, Send } from "lucide-react";
import { useSession } from "next-auth/react";

const AddRemarks = ({ letterId }: { letterId: string }) => {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const formSchema = z.object({
    remarks: z.string({ required_error: "Please enter a remark" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!session || !session.user) {
      toast({
        description: "You need to be logged in to submit remarks.",
      });
      return;
    }

    const userName = session.user.name;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/letters/add-remark/${letterId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            remark: values.remarks,
            userName: userName,
          }),
        }
      );

      if (response.ok) {
        toast({
          description: "Your remarks were added successfully.",
        });
        setIsOpen(false);
      } else {
        toast({
          title: "Error",
          description: "Failed to add the remark. Please try again.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while adding the remark.",
      });
    }
  }

  return (
    <>
      <CustomButton
        variant={ButtonVariant.DEFAULT}
        text="Add"
        iconSrc={PlusCircle}
        onClick={() => setIsOpen(true)}
      />

      <ModalDialog
        isOpen={isOpen}
        title="Add Remarks"
        description="Enter remarks for the letter"
        onClose={() => setIsOpen(false)}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="remarks"
              label="Remarks"
              placeholder="Enter remarks"
            />
            <CustomButton
              variant={ButtonVariant.DEFAULT}
              text="Submit"
              iconSrc={Send}
              className="w-full"
            />
          </form>
        </Form>
      </ModalDialog>
    </>
  );
};

export default AddRemarks;
