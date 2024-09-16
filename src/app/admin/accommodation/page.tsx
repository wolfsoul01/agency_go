"use client";
import Component from "./components/accomodation-container";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormMultiSelect } from "@/components/form/multi-select-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  typeLicencies: z.array(z.string()),
});

type IForm = z.infer<typeof formSchema>;

function Accommodation() {
  const frameworks = [
    { value: "next.js", label: "Next.js" },
    { value: "sveltekit", label: "SvelteKit" },
    { value: "nuxt.js", label: "Nuxt.js" },
    { value: "remix", label: "Remix" },
    { value: "astro", label: "Astro" },
  ];
  const form = useForm<IForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      typeLicencies: ["astro"],
    },
  });

  const { control, watch } = form;
  console.log(watch());
  return (
    <section>
      <header>Accommodation</header>
      <Form {...form}>
        <form>
          <FormMultiSelect
            items={frameworks}
            name="typeLicencies"
            control={control}
          />
        </form>
      </Form>

      <Component />
    </section>
  );
}

export default Accommodation;
