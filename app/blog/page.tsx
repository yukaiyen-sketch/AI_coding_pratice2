import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { posts } from "./posts";

export const metadata: Metadata = {
  title: "部落格 | 台灣芒果簡介",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow w-full max-w-4xl mx-auto px-4 mt-28 mb-10">
        <h1 className="text-4xl font-bold mb-8 text-center">芒果部落格</h1>
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="glass overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-2xl transition"
            >
              <div className="relative h-48 bg-white/10">
                <Image src={post.cover} alt={post.title} fill className="object-cover" />
              </div>
              <div className="p-6 flex flex-col gap-2">
                <time dateTime={post.date} className="text-sm text-amber-700">{post.date}</time>
                <h2 className="text-2xl font-bold">{post.title}</h2>
                <p className="text-gray-700">{post.excerpt}</p>
                <span className="mt-2 text-sm font-semibold text-amber-800">閱讀全文 →</span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
