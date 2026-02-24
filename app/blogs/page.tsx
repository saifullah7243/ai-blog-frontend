import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getBlogs() {
  const res = await fetch(`${API_URL}/blogs`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <main className="bg-white min-h-screen">
      <section className="section">
        <h1 className="text-4xl font-bold mb-12 text-center">
          Published Blogs
        </h1>

        {blogs.length === 0 ? (
          <p className="text-center text-slate-500">No blogs published yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog: any) => (
              <Link
                key={blog.slug}
                href={`/blogs/${blog.slug}`}
                className="group bg-white border rounded-2xl p-6 hover:shadow-lg transition"
              >
                <div className="h-40 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl mb-5" />

                <h2 className="text-xl font-semibold mb-3 group-hover:text-indigo-600 transition">
                  {blog.title}
                </h2>

                <p className="text-slate-600 text-sm line-clamp-3">
                  {blog.meta_description}
                </p>

                <div className="mt-6 text-indigo-600 text-sm font-medium">
                  Read More →
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
