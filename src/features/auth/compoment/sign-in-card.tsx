"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from '@/lib/api/auth';

interface Login2Props {
  heading?: string;
  subheading?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  buttonText?: string;
  signupText?: string;
  signupUrl?: string;
}


const emailSchema = z.string().trim().email("Invalid email");
const passwordSchema = z.string().min(8, "Minimum of 8 characters required");

// 👇 Tổ hợp schema form
const formSchema = z.object({
  
  email: emailSchema,
  password: passwordSchema,
});
export const SignInCard = ({
  heading = "Login",
  subheading = "Welcome back to your account",
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
    alt: "logo",
    title: "shadcnblocks.com",
  },
  buttonText = "Login",
  signupText = "Don't have an account?",
  signupUrl = "https://shadcnblocks.com",
}: Login2Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
const onSubmit = async (values: z.infer<typeof formSchema>) => {
  try {
    const res = await login(values); // gọi API

    if (res.success && res.data?.accessToken) {
      localStorage.setItem('authToken', res.data.accessToken);
      // Có thể gọi thêm API lấy user hoặc redirect ở đây
      console.log('✅ Login thành công:', res.data);
    } else {
      console.warn('❌ Đăng nhập thất bại:', res.message);
    }
  } catch (error) {
    console.error('⚠️ Lỗi hệ thống:', error);
  }
};


  return (
    <section className="bg-muted h-screen">
      <div className="flex h-full items-center justify-center">
        <div className="flex w-full max-w-sm flex-col items-center gap-y-8">
          <div className="flex flex-col items-center gap-y-2">
            <div className="flex items-center gap-1 lg:justify-start">
              <a href={logo.url}>
                <img
                  src={logo.src}
                  alt={logo.alt}
                  title={logo.title}
                  className="h-12 dark:invert"
                />
              </a>
            </div>
            <h1 className="text-3xl font-semibold">{heading}</h1>
            <p className="text-muted-foreground text-sm">{subheading}</p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="border-muted bg-background flex w-full flex-col gap-6 rounded-md border px-6 py-12 shadow-md"
            >
              <FormField
                control={form.control}
                name="email"
                rules={{ required: "Email is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter your email"
                        className="bg-background"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                rules={{ required: "Password is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter your password"
                        className="bg-background"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full mt-2">
                {buttonText}
              </Button>
            </form>
          </Form>

          <div className="text-muted-foreground flex justify-center gap-1 text-sm">
            <p>{signupText}</p>
            <a
              href={signupUrl}
              target="_blank"
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
