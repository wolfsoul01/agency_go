"use client";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form/form-input";
import useSessionStore from "@/store/useSession";

const scheme = z.object({
  email: z.string().email(),
  password: z.string(),
});

type IForm = z.infer<typeof scheme>;

export default function App() {
  const router = useRouter();

  const { setToken } = useSessionStore();

  const form = useForm<IForm>();
  const { handleSubmit, control } = form;

  const onSubmit = async () => {
    router.push("admin");
    setToken("token")
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto grid w-[350px] gap-6"
          >
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Iniciar Sesión</h1>
              <p className="text-balance text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormInput control={control} label="Email" name="email" />
              </div>
              <div className="grid gap-2">
                <div className="">
                  <FormInput
                    control={control}
                    label="Contraseña"
                    name="password"
                    type="password"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="#" className="underline">
                Sign up
              </Link>
            </div>
          </form>
        </Form>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
