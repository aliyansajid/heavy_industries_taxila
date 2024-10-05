"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { useState } from "react";
import { createUserSchema } from "@/lib/utils";
import { z } from "zod";
import CustomButton, { ButtonVariant } from "../CustomButton";
import { SelectItem } from "../ui/select";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CreateUserForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = createUserSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      designation: "",
      rank: "",
      password: "",
      role: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        toast({
          description:
            "There was an error creating the user. Please try again.",
          variant: "destructive",
        });
      }

      const data = await response.json();
      toast({
        description: "User created successfully.",
        variant: "default",
      });
      form.reset();
    } catch (error) {
      toast({
        description: "There was an error creating the user. Please try again.",
        variant: "destructive",
      });
      console.error("Error creating user:", error);
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
          <div className="flex gap-4">
            <div className="flex-1">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="name"
                label="Name"
                placeholder="John Doe"
              />
            </div>
            <div className="flex-1">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="username"
                label="Username"
                placeholder="john"
              />
            </div>
          </div>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="designation"
            label="Designation"
            placeholder="Manager"
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="rank"
            label="Rank"
            placeholder="Commander"
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            type="password"
            control={form.control}
            name="password"
            label="Password"
            placeholder="********"
          />

          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="role"
            label="Role"
            placeholder="Select an option"
          >
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="CR">CR</SelectItem>
            <SelectItem value="User">User</SelectItem>
          </CustomFormField>

          <CustomButton
            type="submit"
            variant={ButtonVariant.DEFAULT}
            iconSrc={Plus}
            text={"Create"}
            disabled={isLoading}
            isLoading={isLoading}
            className="w-full"
          />
        </form>
      </Form>
    </div>
  );
};

export default CreateUserForm;
