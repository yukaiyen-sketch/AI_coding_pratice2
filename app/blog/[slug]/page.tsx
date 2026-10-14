import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { posts, getPost } from "../posts";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  return post ? { title: `${post.title} | 台灣芒果簡介`, description: post.excerpt } : {};
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow w-full max-w-3xl mx-auto px-4 mt-28 mb-10">
        <article className="glass p-10 rounded-3xl">
          <time dateTime={post.date} className="text-sm text-amber-700">{post.date}</time>
          <h1 className="text-4xl font-bold mt-1 mb-6">{post.title}</h1>
          <div className="space-y-6 text-lg leading-relaxed text-gray-800">{post.content}</div>
          <div className="mt-10 flex gap-6">
            <Link href="/blog" className="text-blue-600 hover:underline">← 返回部落格</Link>
            <Link href="/" className="text-blue-600 hover:underline">回首頁</Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
