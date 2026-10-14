import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow max-w-3xl mx-auto glass p-10 mt-28 mb-10 rounded-3xl">
        <h1 className="text-4xl font-bold mb-6">關於芒果的兒時記憶</h1>
        <p className="text-lg leading-relaxed text-gray-800">
          記憶中，夏天的味道總是與芒果綁在一起。小時候，父親總會在盛產季時，提著兩大袋沉甸甸的愛文芒果回家。那時候，我們總會在客廳中央鋪上一張大大的舊報紙，全家人圍成一圈席地而坐。父親熟練地拿起水果刀，切開金黃香甜的果肉，那股濃郁的香氣瞬間填滿了整間屋子。我們不顧果汁流得滿手都是，只顧著大口享受那份簡單卻極致的美味。那種全家人坐在一起，單純因一顆芒果而感到快樂的時光，至今仍是我心中最溫暖的夏日記憶。
        </p>
        <div className="mt-8">
          <Link href="/" className="text-blue-600 hover:underline">← 返回首頁</Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
