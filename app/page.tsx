import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Blog Pro | AI-Powered SEO Blog Generator",
  description:
    "Generate high-ranking SEO blog posts using AI. Built for founders, marketers, and content teams.",
  openGraph: {
    title: "AI Blog Pro",
    description:
      "Create structured, production-ready SEO blogs instantly with AI.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Blog Pro",
    description: "Generate SEO-optimized blogs with AI in seconds.",
  },
};

export default function HomePage() {
  return (
    <main className="bg-white text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50" />
        <div className="relative section text-center">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Generate High-Ranking
            <span className="gradient-text"> SEO Blogs </span>
            with AI
          </h1>

          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
            AI-powered blog generation built for founders, marketers, and modern
            content teams. Structured, optimized, and production-ready.
          </p>

          <div className="mt-10 flex justify-center gap-6">
            <Link
              href="/workspace"
              className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition shadow-sm"
            >
              Start Writing
            </Link>

            <Link
              href="/blogs"
              className="px-8 py-3 border border-slate-300 rounded-xl font-medium hover:bg-slate-50 transition"
            >
              View Blogs
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section">
        <div className="grid md:grid-cols-3 gap-10">
          <Feature
            title="SEO Optimized"
            description="Proper heading hierarchy, metadata, structured data, and keyword optimization included automatically."
          />
          <Feature
            title="AI Agent Powered"
            description="Built using OpenAI Agents SDK for structured, reliable content generation."
          />
          <Feature
            title="Production Ready"
            description="Server-side rendered, database-backed blogs with clean URLs and dynamic metadata."
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-slate-50">
        <div className="section text-center">
          <h2 className="text-3xl font-bold mb-12">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-10 text-left">
            <Step
              number="01"
              title="Enter Topic"
              description="Provide your topic, keywords, audience, and tone."
            />
            <Step
              number="02"
              title="AI Generates"
              description="Our AI agent creates a fully structured, SEO-ready blog."
            />
            <Step
              number="03"
              title="Publish & Rank"
              description="Save, publish, and scale your content strategy."
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section text-center">
        <div className="bg-indigo-600 text-white rounded-3xl p-12">
          <h2 className="text-4xl font-bold">
            Start Generating SEO Blogs Today
          </h2>
          <p className="mt-4 text-indigo-100">
            Join modern content teams using AI to scale faster.
          </p>

          <Link
            href="/workspace"
            className="inline-block mt-8 px-10 py-4 bg-white text-indigo-600 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Go to Workspace
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-10 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} AI Blog Pro. All rights reserved.
      </footer>
    </main>
  );
}

function Feature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="card">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  );
}

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <div className="text-indigo-600 font-bold text-lg mb-2">{number}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  );
}
