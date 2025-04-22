import { redirect } from "next/navigation";
import { getURLFromAlias } from "@/actions";

export default async function AliasPage({
  params,
}: {
  params: Promise<{ alias: string }>;
}) {
  const { alias } = await params;
  const { data } = await getURLFromAlias(alias);

  // redirect home if alias not found
  if (!data) {
    redirect("/");
  }

  redirect(data.url); // redirect to the alias URL
}
