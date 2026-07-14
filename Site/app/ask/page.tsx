import type { Metadata } from "next";
import { getWorks } from "@/lib/data";
import { AskClient } from "@/components/AskClient";

export const metadata: Metadata = {
  title: "Ask Uncle Charlie",
  description: "A guide to Charlie's work, grounded only in the archive — works, transcripts, and his own words.",
};

export default function AskPage() {
  const works = getWorks().map((w) => ({ id: w.work_id, title: w.title }));
  return <AskClient works={works} />;
}
