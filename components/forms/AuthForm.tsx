"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { useState } from "react";
import { loginSchema } from "@/lib/utils";
import { z } from "zod";
import CustomButton, { ButtonVariant } from "../CustomButton";
import { SelectItem } from "../ui/select";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const AuthForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = loginSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        username: values.username,
        password: values.password,
        role: values.role,
      });

      if (result?.error) {
        toast({
          description: "Invalid credentials",
          variant: "destructive",
        });
      } else {
        switch (values.role) {
          case "Admin":
            router.push("/create-user");
            break;
          case "CR":
            router.push("/upload");
            break;
          case "User":
            router.push("/inbox");
            break;
          default:
            router.push("/");
            break;
        }
      }
    } catch (error) {
      toast({
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <h1 className="text-3xl text-dark-primary font-medium">
            Welcome Back!
          </h1>
          <p className="text-base text-muted-foreground">
            Log in to access your workspace
          </p>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="username"
            label="Username"
            placeholder="Enter your username"
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
            text={"Login"}
            disabled={isLoading}
            isLoading={isLoading}
            className="w-full"
          />
        </form>
      </Form>
    </>
  );
};

export default AuthForm;
