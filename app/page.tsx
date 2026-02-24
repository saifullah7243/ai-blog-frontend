"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [primaryKeyword, setPrimaryKeyword] = useState("");
  const [secondaryKeywords, setSecondaryKeywords] = useState("");
  const [audience, setAudience] = useState("");
  const [wordCount, setWordCount] = useState(800);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const generateBlog = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) throw new Error("API not configured.");

      const response = await fetch(`${apiUrl}/generate-blog`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

      if (!response.ok) throw new Error("Generation failed");

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background Glow Blobs */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-[140px]" />

      {/* Navbar */}
      <div className="relative z-10 flex justify-between items-center px-10 py-6 border-b border-white/10 backdrop-blur-lg">
        <h1 className="text-xl font-semibold tracking-tight">AI Blog Studio</h1>
        <span className="text-sm text-gray-400">Ultra AI Powered</span>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 text-center py-20 px-6 max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-6xl font-bold leading-tight"
        >
          Build AI-Optimized
          <span className="block bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            SEO Blogs in Seconds
          </span>
        </motion.h2>

        <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
          Generate SEO, AEO & GEO structured content using advanced AI Agents.
          Built for founders, developers & growth teams.
        </p>
      </section>

      {/* Main Grid */}
      <section className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-14 px-10 pb-24">
        {/* Glass Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-[0_0_60px_rgba(139,92,246,0.15)] space-y-6"
        >
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

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
            <Button
              onClick={generateBlog}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:opacity-90 py-6 rounded-xl text-lg font-semibold shadow-lg"
            >
              {loading ? "Generating..." : "Generate Blog"}
            </Button>
          </motion.div>

          {error && <div className="text-red-400 text-sm">{error}</div>}
        </motion.div>

        {/* Live Preview Panel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-[0_0_60px_rgba(59,130,246,0.15)] overflow-auto max-h-[750px]"
        >
          {result ? (
            <>
              <h3 className="text-3xl font-semibold mb-4">{result.title}</h3>
              <p className="text-gray-400 mb-6">{result.meta_description}</p>
              <div
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: result.content_html }}
              />
            </>
          ) : (
            <div className="text-gray-500 text-center mt-32">
              AI-Generated blog preview will appear here ✨
            </div>
          )}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 text-center py-8 text-gray-500 text-sm">
        © 2026 AI Blog Studio — Premium AI Content Engine
      </footer>
    </main>
  );
}
