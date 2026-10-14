"use client";

import Image from "next/image";
import { useState, useRef, useSyncExternalStore } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";

const USERNAME_KEY = "mango_username";
const USERNAME_EVENT = "mango-username-change";

function subscribeUsername(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(USERNAME_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(USERNAME_EVENT, onChange);
  };
}

export default function Page() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroBgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroCardY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  // 伺服器端為 undefined（未知），瀏覽器端為已存名字或 null（尚未輸入）
  const savedName = useSyncExternalStore(subscribeUsername, () => localStorage.getItem(USERNAME_KEY), () => undefined);
  const username = savedName ?? "";
  const showPrompt = savedName === null;
  const [inputValue, setInputValue] = useState<string>("");
  const [lotteryResult, setLotteryResult] = useState<string>("");
  const [showLotteryModal, setShowLotteryModal] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const handleLottery = () => {
    const isWinner = Math.random() < 0.3;
    if (isWinner) {
      const code = "MANGO-" + Math.random().toString(36).substring(2, 10).toUpperCase();
      setLotteryResult(`恭喜中獎！您的序號是: ${code}`);
    } else {
      setLotteryResult("很遺憾，沒抽中，再接再厲！");
    }
    setShowLotteryModal(true);
  };

  const copyToClipboard = () => {
    const code = lotteryResult.split(": ")[1];
    if (code) {
      navigator.clipboard.writeText(code);
      alert("序號已複製！");
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      alert("感謝您的訂閱！");
      setEmail("");
    } else {
      alert("請輸入正確的 Email 格式。");
    }
  };

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      localStorage.setItem(USERNAME_KEY, inputValue.trim());
      window.dispatchEvent(new Event(USERNAME_EVENT));
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header username={username} />

      {/* Hero Section（視差滾動：背景比內容慢速移動） */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 -top-[10%] h-[120%] bg-center bg-cover"
          style={{
            y: heroBgY,
            backgroundImage: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/images/background.jpg')",
          }}
        />
        <motion.div
          style={{ y: heroCardY }}
          className="relative glass p-8 text-center rounded-3xl backdrop-blur-md bg-white/30 border-white/40"
        >
          <h1 className="text-4xl font-bold mb-2">探索台灣芒果</h1>
          <p className="text-md">
            {username ? `${username}，一同感受來自熱帶的極致美味` : "感受來自熱帶的極致美味"}
          </p>
        </motion.div>
      </section>

      {/* Floating Lottery Button */}
      <button 
        onClick={handleLottery}
        className="fixed bottom-6 right-6 z-[60] px-8 py-4 bg-orange-600 rounded-full font-bold text-white hover:bg-orange-700 transition-all shadow-[0_0_20px_rgba(234,88,12,0.6)] hover:scale-105 border-2 border-orange-400"
      >
        🎁 點我抽獎 (30% 機率)
      </button>

      {/* Lottery Result Modal */}
      {showLotteryModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/55 backdrop-blur-md p-4">
          <div className="glass p-8 max-w-sm w-full text-center bg-white/40 border-white/50 rounded-3xl shadow-2xl">
            <h3 className="text-2xl font-bold mb-4 text-amber-900">抽獎結果</h3>
            <p className="text-lg text-amber-950 mb-6">{lotteryResult}</p>
            <div className="flex flex-col gap-3">
              {lotteryResult.includes("序號") && (
                <button onClick={copyToClipboard} className="w-full py-3 bg-white/50 hover:bg-white/70 font-bold rounded-xl transition">複製序號</button>
              )}
              <button onClick={handleLottery} className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition">再抽一次</button>
              <button onClick={() => setShowLotteryModal(false)} className="w-full py-3 bg-gray-200 hover:bg-gray-300 font-bold rounded-xl transition">關閉</button>
            </div>
          </div>
        </div>
      )}

      {/* Username Prompt Modal */}
      {showPrompt && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/55 backdrop-blur-md p-4">
          <form 
            onSubmit={handleSaveName}
            className="glass p-8 max-w-sm w-full text-center bg-white/40 border-white/50 rounded-3xl shadow-2xl"
          >
            <h3 className="text-2xl font-bold mb-4 text-amber-900">歡迎光臨！</h3>
            <p className="text-sm text-amber-950 mb-6">請輸入您的名字，讓我們為您提供個性化的探索體驗：</p>
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="您的名字" 
              className="w-full px-4 py-3 rounded-xl border border-white/60 bg-white/50 text-amber-950 placeholder-amber-800/50 focus:outline-none focus:ring-2 focus:ring-amber-500 mb-6 text-center text-lg"
              required
              autoFocus
            />
            <button 
              type="submit" 
              className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              開始探索
            </button>
          </form>
        </div>
      )}

      {/* Content Section */}
      <main className="max-w-5xl mx-auto p-6 space-y-12 my-12">
        <section className="glass p-8 flex flex-col md:flex-row gap-6 items-center">
          <div className="relative w-full md:w-1/2 h-64 rounded-lg overflow-hidden bg-white/10">
            <Image src="/images/john-cameron-1OUPlI3M-lk-unsplash.jpg" alt="愛文芒果" fill className="object-contain p-2" />
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="text-3xl font-bold mb-4">愛文芒果</h3>
            <p>台灣最著名的芒果品種，色澤鮮紅，香氣濃郁，甜度高。</p>
          </div>
        </section>

        <section className="glass p-8 flex flex-col md:flex-row-reverse gap-6 items-center">
          <div className="relative w-full md:w-1/2 h-64 rounded-lg overflow-hidden bg-white/10">
            <Image src="/images/phoenix-han-ErtdRiNkXIg-unsplash.jpg" alt="金煌芒果" fill className="object-contain p-2" />
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="text-3xl font-bold mb-4">金煌芒果</h3>
            <p>果肉厚實，甜度高，口感細緻，幾乎沒有纖維。</p>
          </div>
        </section>

        {/* Email Subscription */}
        <section className="glass p-8 text-center max-w-md mx-auto">
          <h3 className="text-xl font-bold mb-4">訂閱最新芒果資訊</h3>
          <form onSubmit={handleEmailSubmit} className="flex flex-col gap-3">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="請輸入您的 Email" 
              className="w-full px-4 py-3 rounded-xl border border-white/60 bg-white/50 text-amber-950 placeholder-amber-800/50 focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
            <button 
              type="submit" 
              className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition shadow-lg"
            >
              送出訂閱
            </button>
          </form>
        </section>
      </main>

      {/* Image Gallery Bar */}
      <section className="max-w-6xl mx-auto my-24 w-full px-6">
        <h3 className="text-2xl font-bold mb-6 text-center">芒果圖集</h3>
        <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide">
          {[
            'alexander-schimmeck-vTXtQ8ZBzvY-unsplash.jpg',
            'allec-gomes-7CMH2a9Vumo-unsplash.jpg',
            'jacqueline-brandwayn-McxsrN3WW48-unsplash.jpg',
            'markus-winkler-H-KyBAT6fxk-unsplash.jpg',
            'prathamesh-rahate-GcBEo-37uPQ-unsplash.jpg'
          ].map((src, index) => (
            <div 
              key={index} 
              className="relative flex-none w-48 h-48 rounded-2xl overflow-hidden glass hover:scale-105 transition-transform cursor-pointer"
              onClick={() => setSelectedImage(`/images/${src}`)}
            >
              <Image src={`/images/${src}`} alt={`芒果 ${index + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Overlay */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-4xl h-[80vh]">
            <Image src={selectedImage} alt="放大圖片" fill className="object-contain" />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
