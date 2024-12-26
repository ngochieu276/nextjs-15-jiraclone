"use client";
import { z } from "zod";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import DottedSeparator from "@/components/dotted-separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { registerSchema } from "../schema";
import { useRegister } from "../api/use-register";
import { signUpWithGithub, signUpWithGoogle } from "@/lib/oauth";

const SignUpCard = () => {
  const { mutate, isPending } = useRegister();

  const form = useForm<z.infer<typeof registerSchema>>({
    defaultValues: { name: "", email: "", password: "" },
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    mutate({ json: values });
  };

  return (
    <Card className=" w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className=" flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>
          By signing up, you agree to our{" "}
          <Link href="/privacy">
            <span className=" text-blue-700">Privacy Policy</span>
          </Link>{" "}
          and{" "}
          <Link href="/terms">
            <span className=" text-blue-700">Term of Service</span>
          </Link>
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form className=" space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={isPending}
                      placeholder="Enter Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      disabled={isPending}
                      placeholder="Enter Email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      disabled={isPending}
                      placeholder="Enter Password here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={false} size={"lg"} className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className=" p-7 flex flex-col gap-y-4">
        <Button
          onClick={signUpWithGoogle}
          variant={"secondary"}
          size={"lg"}
          className="w-full"
        >
          <FcGoogle className="mr-2 size-5" />
          Login with Google
        </Button>
        <Button
          onClick={signUpWithGithub}
          variant={"secondary"}
          size={"lg"}
          className="w-full"
        >
          <FaGithub className="mr-2 size-5" />
          Login with Github
        </Button>
      </CardContent>
      <div className=" px-7">
        <DottedSeparator />
      </div>
      <CardContent className=" p-7 flex items-center justify-center">
        <p>
          Already have an account?
          <Link href={"sign-in"}>
            <span className=" text-blue-700">&nbsp; Sign In</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignUpCard;
