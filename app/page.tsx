"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [primaryKeyword, setPrimaryKeyword] = useState("");
  const [secondaryKeywords, setSecondaryKeywords] = useState("");
  const [audience, setAudience] = useState("");
  const [wordCount, setWordCount] = useState(800);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const generateBlog = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        throw new Error("API URL is not configured.");
      }

      const response = await fetch(`${apiUrl}/generate-blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          primary_keyword: primaryKeyword,
          secondary_keywords: secondaryKeywords
            ? secondaryKeywords
                .split(",")
                .map((k) => k.trim())
                .filter(Boolean)
            : [],
          target_audience: audience,
          word_count: Number(wordCount),
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || "Failed to generate blog.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto space-y-6"
      >
        <h1 className="text-4xl font-bold text-center">
          AI SEO Blog Generator
        </h1>

        {/* Form */}
        <Card className="p-6 space-y-4">
          <Input
            placeholder="Blog Topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />

          <Input
            placeholder="Primary Keyword"
            value={primaryKeyword}
            onChange={(e) => setPrimaryKeyword(e.target.value)}
          />

          <Input
            placeholder="Secondary Keywords (comma separated)"
            value={secondaryKeywords}
            onChange={(e) => setSecondaryKeywords(e.target.value)}
          />

          <Input
            placeholder="Target Audience"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
          />

          <Input
            type="number"
            placeholder="Word Count"
            value={wordCount}
            onChange={(e) => setWordCount(Number(e.target.value))}
          />

          <Button onClick={generateBlog} disabled={loading} className="w-full">
            {loading ? "Generating..." : "Generate Blog"}
          </Button>
        </Card>

        {/* Error */}
        {error && (
          <Card className="p-4 bg-red-50 border border-red-200 text-red-600">
            {error}
          </Card>
        )}

        {/* Result */}
        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold">{result.title}</h2>
              <p className="text-gray-600">{result.meta_description}</p>

              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: result.content_html,
                }}
              />
            </Card>
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}
