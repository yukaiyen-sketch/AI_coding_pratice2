import Link from "next/link";

export default function Header({ username }: { username?: string }) {
  return (
    <header className="fixed top-4 w-full z-50 px-4">
      <nav className="glass max-w-4xl mx-auto px-6 py-2 flex justify-between items-center rounded-full">
        <Link href="/" className="text-lg font-bold">台灣芒果簡介</Link>
        <div className="flex items-center gap-4">
          {username && <span className="text-sm font-medium text-amber-800">你好，{username}</span>}
          <Link href="/blog" className="text-sm font-medium hover:text-gray-600 transition">部落格</Link>
          <Link href="/game" className="text-sm font-medium hover:text-gray-600 transition">小遊戲</Link>
        </div>
      </nav>
    </header>
  );
}
