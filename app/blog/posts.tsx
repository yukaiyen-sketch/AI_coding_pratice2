import type { ReactNode } from "react";

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  cover: string;
  content: ReactNode;
};

type Variety = {
  name: string;
  alias: string;
  season: string;
  origin: string;
  features: string;
};

const varieties: Variety[] = [
  {
    name: "愛文芒果",
    alias: "Irwin",
    season: "6 – 7 月",
    origin: "1954 年自美國佛羅里達引進，台南玉井為最具代表性的產地。",
    features:
      "果皮成熟時呈現鮮豔的紅色，俗稱「蘋果芒果」。果肉細緻多汁、香氣濃郁、甜度高，是台灣產量最大、也最受歡迎的芒果品種，芒果冰的主角大多就是它。",
  },
  {
    name: "金煌芒果",
    alias: "Chin Hwang",
    season: "6 – 8 月",
    origin: "由高雄六龜的果農黃金煌先生培育而成，品種名稱即取自他的名字。",
    features:
      "果實碩大，一顆常超過一公斤。果皮成熟後仍帶黃綠色，果肉厚實、纖維極少、種子扁薄，甜度高而酸度低，非常適合切塊大口享用。",
  },
  {
    name: "土芒果",
    alias: "在來種",
    season: "4 – 6 月",
    origin: "相傳於荷蘭時期引進台灣，已有三百多年歷史，南部鄉間與路旁的老芒果樹多半是土芒果。",
    features:
      "果實小巧、纖維較多，但香氣特別濃烈，帶著酸甜的古早味。未成熟的青果可醃漬成「芒果青」（情人果），是許多人記憶中的夏日零嘴。",
  },
  {
    name: "凱特芒果",
    alias: "Keitt",
    season: "8 – 9 月",
    origin: "原產於美國佛羅里達，在台灣屬於晚熟品種，為芒果季畫下句點。",
    features:
      "果實大、外皮即使成熟仍以綠色為主，常被誤以為還沒熟。果肉橙黃、纖維少、口感細滑，酸甜平衡，耐貯藏。",
  },
  {
    name: "玉文芒果",
    alias: "玉文 6 號",
    season: "7 – 8 月",
    origin: "台灣本土選育的品種，主要產於台南玉井一帶。",
    features:
      "外型像是放大版的愛文，果皮紅中帶黃，單顆重量可達一公斤左右。果肉細緻、香氣足，兼具愛文的香甜與大果的飽足感，近年人氣持續上升。",
  },
];

export const posts: Post[] = [
  {
    slug: "mango-varieties",
    title: "認識台灣常見的芒果品種",
    date: "2026-10-14",
    excerpt: "從香氣濃郁的愛文、果肉厚實的金煌，到充滿古早味的土芒果，帶你一次認識台灣五種常見芒果。",
    cover: "/images/phoenix-han-ErtdRiNkXIg-unsplash.jpg",
    content: (
      <>
        <p>
          台灣位於亞熱帶與熱帶交界，南部充足的日照與溫暖氣候，讓這座島嶼成為芒果的理想產地。每年從春末到夏末，不同品種的芒果接力登場，各有各的香氣與口感。以下整理台灣最常見的五種芒果，下次逛市場時就能依照喜好挑選。
        </p>
        {varieties.map((v) => (
          <section key={v.name} className="bg-white/40 rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-amber-900">
              {v.name}
              <span className="ml-2 text-base font-medium text-amber-700">{v.alias}</span>
            </h2>
            <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm text-amber-950">
              <dt className="font-semibold">產季</dt>
              <dd>{v.season}</dd>
              <dt className="font-semibold">由來</dt>
              <dd>{v.origin}</dd>
            </dl>
            <p className="mt-3">{v.features}</p>
          </section>
        ))}
        <p>
          產季會因每年的氣候與產地略有前後差異。挑選時可以聞聞蒂頭附近，香氣明顯、果皮有光澤、按壓略有彈性的芒果，通常就是剛好可以吃的時候。
        </p>
      </>
    ),
  },
  {
    slug: "childhood-memory",
    title: "關於芒果的兒時記憶",
    date: "2026-10-01",
    excerpt: "父親提著兩大袋愛文芒果回家，全家在客廳鋪上舊報紙席地而坐——那是最溫暖的夏日記憶。",
    cover: "/images/john-cameron-1OUPlI3M-lk-unsplash.jpg",
    content: (
      <p>
        記憶中，夏天的味道總是與芒果綁在一起。小時候，父親總會在盛產季時，提著兩大袋沉甸甸的愛文芒果回家。那時候，我們總會在客廳中央鋪上一張大大的舊報紙，全家人圍成一圈席地而坐。父親熟練地拿起水果刀，切開金黃香甜的果肉，那股濃郁的香氣瞬間填滿了整間屋子。我們不顧果汁流得滿手都是，只顧著大口享受那份簡單卻極致的美味。那種全家人坐在一起，單純因一顆芒果而感到快樂的時光，至今仍是我心中最溫暖的夏日記憶。
      </p>
    ),
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
