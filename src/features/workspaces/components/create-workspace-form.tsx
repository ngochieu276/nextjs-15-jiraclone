"use client";

import { z } from "zod";
import { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createWorkSpaceSchema } from "../schema";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import DottedSeparator from "@/components/dotted-separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "../api/use-create-workspace";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

interface CreateWorkSpaceFormProps {
  onCancel?: () => void;
}

export const CreateWorkspaceForm = ({ onCancel }: CreateWorkSpaceFormProps) => {
  const { mutate, isPending } = useCreateWorkspace();

  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof createWorkSpaceSchema>>({
    resolver: zodResolver(createWorkSpaceSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
    }
  };

  const onSubmit = (values: z.infer<typeof createWorkSpaceSchema>) => {
    const finalValues = {
      ...values,
      image: values.image instanceof File ? values.image : "",
    };
    mutate(
      { form: finalValues },
      {
        onSuccess: () => {
          form.reset();
        },
      }
    );
  };

  return (
    <Card className=" w-full h-full border-none shadow-none">
      <CardHeader className=" flex p-7">
        <CardTitle className=" text-xl font-bold">
          Create a new workspace
        </CardTitle>
      </CardHeader>
      <div className=" p-7">
        <DottedSeparator />
      </div>
      <CardContent className=" px-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className=" flex flex-col gap-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workspace Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter workspace name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <div className=" flex flex-col gap-y-2">
                    <div className="flex items-center gap-x-5">
                      {field.value ? (
                        <div className=" size-[72px] relative rounded-md overflow-hidden">
                          <Image
                            src={
                              field.value instanceof File
                                ? URL.createObjectURL(field.value)
                                : field.value
                            }
                            alt="Logo"
                            fill
                            className=" object-cover"
                          />
                        </div>
                      ) : (
                        <Avatar className=" size-[72px]">
                          <AvatarFallback>
                            <ImageIcon className=" size-[36px] text-neutral-400" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className="flex flex-col">
                        <p className=" tex-sm">Workspace Icon</p>
                        <p className=" tex-sm text-muted-foreground">
                          JPG, PNG, SVG or JPEG, max 1mb
                        </p>
                        <input
                          className="hidden"
                          type="file"
                          accept=".jpg, .png, .jpeg, .svg"
                          ref={inputRef}
                          disabled={isPending}
                          onChange={handleImageChange}
                        />
                        <Button
                          type="button"
                          disabled={isPending}
                          variant={"teritary"}
                          size={"xs"}
                          className="w-fit mt-2"
                          onClick={() => inputRef.current?.click()}
                        >
                          Upload Image
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              />
            </div>
            <DottedSeparator className=" py-7" />
            <div className=" flex items-center justify-between">
              <Button
                type="button"
                size={"lg"}
                variant={"secondary"}
                onClick={onCancel}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" size={"lg"} disabled={isPending}>
                Create Workspace
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
