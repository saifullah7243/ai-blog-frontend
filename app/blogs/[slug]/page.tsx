import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getBlog(slug: string) {
  const res = await fetch(`${API_URL}/blogs/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return { title: "Blog Not Found" };
  }

  return {
    title: blog.title,
    description: blog.meta_description,
    openGraph: {
      title: blog.title,
      description: blog.meta_description,
      type: "article",
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) return notFound();

  const readTime = Math.ceil(
    blog.content_html.replace(/<[^>]+>/g, "").split(" ").length / 200,
  );

  return (
    <main className="bg-white min-h-screen">
      <article className="section max-w-3xl mx-auto">
        {/* Back Link */}
        <Link href="/blogs" className="text-sm text-indigo-600 hover:underline">
          ← Back to Blogs
        </Link>

        {/* Title */}
        <h1 className="text-4xl font-bold mt-6 mb-4">{blog.title}</h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-slate-500 mb-10">
          <span>AI Blog Pro</span>
          <span>•</span>
          <span>{readTime} min read</span>
        </div>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none prose-slate"
          dangerouslySetInnerHTML={{
            __html: blog.content_html,
          }}
        />

        {/* CTA */}
        <div className="mt-16 bg-slate-50 p-8 rounded-2xl text-center">
          <h3 className="text-2xl font-semibold mb-3">
            Want to generate blogs like this?
          </h3>
          <p className="text-slate-600 mb-6">
            Use AI to scale your content strategy.
          </p>
          <Link
            href="/workspace"
            className="px-8 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
          >
            Go to Workspace
          </Link>
        </div>
      </article>
    </main>
  );
}
