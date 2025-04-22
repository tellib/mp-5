"use client";

import { createNewURL } from "@/actions";
import { formSchema, URLProps } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, FormLabel, Input } from "@mui/joy";
import { useState } from "react";
import { CopyButton } from "./CopyButton";

const WEBSITE_URL = "https://mp-5-virid-five.vercel.app/";

export default function URLForm() {
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<URLProps | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  return (
    <div className="flex flex-col gap-y-4">
      <div className="shadow-sm ring-1 ring-inset ring-white p-8 bg-blue-100 rounded-2xl space-y-6">
        <form
          onSubmit={handleSubmit(async (parsedData) => {
            setError(null);
            setResult(null);
            const { data, error } = await createNewURL(parsedData);
            if (error) {
              setError(error);
              return;
            }
            setError(null);
            setResult(data);
          })}
          className="space-y-6"
        >
          <div className="text-center">
            <h1 className="text-5xl font-bold text-slate-700">URL Shortener</h1>
            <p className="text-slate-500">
              Shorten your long URLs into compact, shareable links
            </p>
          </div>
          <div>
            <FormLabel htmlFor="url">URL</FormLabel>
            <Input
              className="mb-0"
              id="url"
              {...register("url")}
              placeholder="https://github.com/tellib"
            />
            {errors.url?.message && (
              <span className="text-xs text-red-500">{errors.url.message}</span>
            )}
          </div>
          <div>
            <FormLabel htmlFor="alias">Alias</FormLabel>
            <div className="flex items-center space-x-2 mb-0">
              <span className="opacity-50">{WEBSITE_URL}</span>
              <Input
                className="flex-1"
                id="alias"
                {...register("alias")}
                placeholder="custom-alias"
              />
              <Button type="submit">Create Alias</Button>
            </div>
            {errors.alias?.message && (
              <span className="text-xs text-red-500">
                {errors.alias.message}
              </span>
            )}
          </div>
        </form>
      </div>

      {/* confirmation message or error */}
      {error && (
        <div className="border-1 rounded-2xl bg-red-100 border-red-500 text-red-600 p-8">
          <span className="text-wrap">Error: {error}</span>
        </div>
      )}

      {/* success, show the shortened url */}
      {result && (
        <div className="border-1 rounded-2xl bg-green-100 border-green-500 text-green-800 p-8">
          <FormLabel htmlFor="shortened-url" className="font-bold">
            Shortened URL:{" "}
          </FormLabel>
          <div className="flex items-center space-x-2 justify-between">
            <Input
              id="shortened-url"
              value={`${WEBSITE_URL}${result.alias}`}
              readOnly
              className="w-full"
            />
            <CopyButton text={`${WEBSITE_URL}${result.alias}`} />
          </div>
        </div>
      )}
    </div>
  );
}
