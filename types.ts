import { z } from "zod";

export const formSchema = z.object({
  url: z
    .string()
    .url("Must enter a valid URL")
    .nonempty("URL is required")
    .refine(
      (url) =>
        !url.startsWith("https://mp-5-virid-five.vercel.app") &&
        !url.startsWith("http://mp-5-virid-five.vercel.app"),
      "URL cannot be from this domain"
    ),
  alias: z
    .string()
    .max(20, "Alias must be 20 characters or less")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Alias can only contain letters, numbers, dashes, and underscores"
    ),
});

export type URLProps = z.infer<typeof formSchema>;

export type ActionResult = {
  data: URLProps | null;
  error: string | null;
};
