"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";

const GAME_SECONDS = 10;
const SPAWN_INTERVAL_MS = 800;
const MANGO_LIFETIME_MS = 2000;

type Mango = {
  id: number;
  x: number;
  y: number;
  expiresAt: number;
};

export default function GamePage() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_SECONDS);
  const [gameStarted, setGameStarted] = useState(false);
  const [mangoes, setMangoes] = useState<Mango[]>([]);
  const nextId = useRef(0);

  const isPlaying = gameStarted && timeLeft > 0;

  // 產生新芒果，同時移除已超過存活時間、沒被點到的芒果
  const spawnMango = useCallback(() => {
    const now = Date.now();
    const newMango = {
      id: nextId.current++,
      x: Math.random() * 80 + 5, // 5% to 85%
      y: Math.random() * 70 + 10, // 10% to 80%
      expiresAt: now + MANGO_LIFETIME_MS,
    };
    setMangoes((prev) => [...prev.filter((m) => m.expiresAt > now), newMango]);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    const spawner = setInterval(spawnMango, SPAWN_INTERVAL_MS);
    return () => {
      clearInterval(timer);
      clearInterval(spawner);
    };
  }, [isPlaying, spawnMango]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_SECONDS);
    setMangoes([]);
    setGameStarted(true);
  };

  const shootMango = (id: number) => {
    setScore((s) => s + 1);
    setMangoes((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow w-full flex justify-center px-4 pt-24 pb-10">
        <div className="glass w-full max-w-4xl p-8 rounded-3xl text-center">
          <h1 className="text-4xl font-bold mb-4">芒果射擊手</h1>

          {!isPlaying && (
            <div className="space-y-4">
              <p className="text-lg">點擊螢幕上的芒果來射擊！你有 {GAME_SECONDS} 秒時間，芒果出現 2 秒後就會溜走。</p>
              {gameStarted && <p className="text-2xl font-bold">最終得分: {score}</p>}
              <button
                onClick={startGame}
                className="px-6 py-3 bg-amber-500 rounded-full font-bold text-white hover:bg-amber-600 transition"
              >
                {gameStarted ? "再玩一次" : "開始遊戲"}
              </button>
            </div>
          )}

          {isPlaying && (
            <div className="relative h-[60vh] w-full bg-white/20 rounded-2xl overflow-hidden cursor-crosshair">
              <div className="absolute top-4 left-4 text-xl font-bold">得分: {score}</div>
              <div className="absolute top-4 right-4 text-xl font-bold">時間: {timeLeft}s</div>
              {mangoes.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  aria-label="射擊芒果"
                  className="absolute w-16 h-16 cursor-pointer hover:scale-110 transition"
                  style={{ left: `${m.x}%`, top: `${m.y}%` }}
                  onClick={() => shootMango(m.id)}
                >
                  <Image src="/mango-elf.svg" alt="" fill className="object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
