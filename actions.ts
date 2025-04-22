"use server";

import { formSchema, URLProps } from "@/types";
import getDb from "@/db";
import { ActionResult } from "@/types";

export async function createNewURL(data: URLProps): Promise<ActionResult> {
  // validate form data on server
  const parsedData = formSchema.safeParse(data);
  if (!parsedData.success) throw new Error("Invalid URL or alias.");

  // get deconstructed data
  const { url, alias } = parsedData.data;

  // connect to database
  const db = await getDb();

  // check if the requested shortener url is already taken
  const existingAlias = await db.collection("url").findOne({ alias });
  if (existingAlias) {
    return {
      data: null,
      error: "Alias already exists. Please choose a different one.",
    };
  }

  // insert new document to collection
  const res = await db.collection("url").insertOne({ url, alias });
  if (!res.acknowledged) {
    return {
      data: null,
      error: "Failed to create new URL. Please try again.",
    };
  }

  // log
  console.log(
    `New URL added to the database: ${res.insertedId}: ${alias} - ${url}`
  );

  // return the data
  return {
    data: { url, alias },
    error: null,
  };
}

export async function getURLFromAlias(alias: string): Promise<ActionResult> {
  // connect to database
  const db = await getDb();

  // find the document in the collection
  const res = await db.collection("url").findOne({ alias });
  if (!res) {
    return {
      data: null,
      error: "URL not found.",
    };
  }

  return {
    data: { url: res.url, alias: res.alias },
    error: null,
  };
}
