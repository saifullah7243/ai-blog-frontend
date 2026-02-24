"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function WorkspacePage() {
  const [form, setForm] = useState({
    topic: "",
    primary_keyword: "",
    secondary_keywords: "",
    target_audience: "",
    word_count: 800,
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const generateBlog = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/generate-blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          secondary_keywords: form.secondary_keywords
            .split(",")
            .map((k) => k.trim()),
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <main className="bg-slate-50 min-h-screen">
      <div className="section grid lg:grid-cols-2 gap-10">
        {/* LEFT PANEL */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h1 className="text-2xl font-bold mb-6">AI Blog Generator</h1>

          <div className="space-y-4">
            <Input
              placeholder="Blog Topic"
              value={form.topic}
              onChange={(e) => handleChange("topic", e.target.value)}
            />

            <Input
              placeholder="Primary Keyword"
              value={form.primary_keyword}
              onChange={(e) => handleChange("primary_keyword", e.target.value)}
            />

            <Input
              placeholder="Secondary Keywords (comma separated)"
              value={form.secondary_keywords}
              onChange={(e) =>
                handleChange("secondary_keywords", e.target.value)
              }
            />

            <Input
              placeholder="Target Audience"
              value={form.target_audience}
              onChange={(e) => handleChange("target_audience", e.target.value)}
            />

            <Input
              type="number"
              placeholder="Word Count"
              value={form.word_count}
              onChange={(e) =>
                handleChange("word_count", Number(e.target.value))
              }
            />

            <button
              onClick={generateBlog}
              disabled={loading}
              className="w-full mt-4 bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition"
            >
              {loading ? "Generating..." : "Generate Blog"}
            </button>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="bg-white rounded-2xl p-8 shadow-sm overflow-y-auto max-h-[80vh]">
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-slate-500"
            >
              AI is generating your blog...
            </motion.div>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: result.content_html,
              }}
            />
          )}

          {!loading && !result && (
            <p className="text-slate-400">
              Your generated blog will appear here.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

function Input({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  );
}
