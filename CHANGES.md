# 專案修正紀錄

日期：2026-10-14

依據 `REQUIREMENTS.md` 與程式碼檢視結果，對專案進行以下修正。

## 1. 實作 Hero 區塊視差滾動效果（`app/page.tsx`）

**問題**：需求規格要求 Hero 區塊具備視差滾動 (Parallax)，但原本只是一般的 `bg-cover` 背景，沒有任何視差效果；且 Hero 使用 `flex-grow`，在內容很多時高度幾乎只剩卡片本身。

**修正**：
- Hero 改為 `h-screen` 全螢幕高度。
- 使用已安裝的 `framer-motion`（`useScroll` + `useTransform`）：
  - 背景圖層往下移動 0% → 40%（比頁面捲動慢，形成景深）。
  - 中央玻璃卡片往上移動 0% → -30%（與背景反向，加強層次感）。
- Hero 標題由 `h2` 改為 `h1`（頁面主標題），導覽列的網站名稱改為連結。

## 2. Header / Footer 抽成共用元件

**問題**：三個頁面（首頁、部落格、遊戲）各自重複撰寫相同的 Header 與 Footer，修改時需要改三處。

**修正**：
- 新增 `app/components/Header.tsx`：可選擇傳入 `username` 顯示「你好，名字」。
- 新增 `app/components/Footer.tsx`。
- 三個頁面改為引用共用元件；遊戲頁原本缺少 Footer，一併補上。

## 3. 修正 `package.json` 專案名稱

**問題**：名稱仍為從上一個練習複製來的 `practice1`。

**修正**：`package.json` 與 `package-lock.json` 中的名稱改為 `practice2`。

## 4. 小遊戲改善（`app/game/page.tsx`）

**問題**：
- 沒被點到的芒果會一直累積在畫面上。
- 芒果使用整張照片，而非小圖示。
- 芒果 id 使用 `Date.now()`，理論上可能重複。

**修正**：
- 每顆芒果有 2 秒存活時間，逾時自動消失（每次產生新芒果時順便清除過期芒果，不需額外計時器）。
- 改用 `/mango-elf.svg` 芒果小精靈圖示。
- id 改用遞增計數器 (`useRef`)，保證不重複。
- 芒果改為 `<button>`，鍵盤與螢幕閱讀器也能操作。
- 遊戲狀態改為推導值 `isPlaying = gameStarted && timeLeft > 0`，不再於 `useEffect` 中呼叫 `setState`。
- 遊戲參數（秒數、產生間隔、存活時間）抽成常數，方便調整。
- 第一次進入時不再顯示「最終得分: 0」。

## 5. 修正 ESLint 錯誤：使用者名稱讀取方式（`app/page.tsx`）

**問題**：原本在 `useEffect` 內讀 `localStorage` 再呼叫 `setUsername`，觸發 ESLint 規則 `react-hooks/set-state-in-effect`（會造成多餘的重新渲染）。

**修正**：改用 React 的 `useSyncExternalStore` 讀取 `localStorage`：
- 伺服器端回傳 `undefined`（未知），避免已輸入過名字的使用者看到輸入視窗閃一下。
- 瀏覽器端回傳已存的名字，或 `null`（尚未輸入 → 顯示輸入視窗）。
- 儲存名字時發出自訂事件通知更新；也監聽 `storage` 事件，其他分頁修改名字時會同步。

## 驗證結果

| 檢查項目 | 結果 |
|---|---|
| `npx tsc --noEmit`（型別檢查） | ✅ 通過 |
| `npx eslint app` | ✅ 0 錯誤 0 警告 |
| `GET /`、`/blog`、`/game` | ✅ 皆回應 200 |

## 檔案異動總覽

| 檔案 | 異動 |
|---|---|
| `app/components/Header.tsx` | 新增 |
| `app/components/Footer.tsx` | 新增 |
| `app/page.tsx` | 視差效果、共用元件、`useSyncExternalStore` |
| `app/blog/page.tsx` | 改用共用元件 |
| `app/game/page.tsx` | 遊戲邏輯改善、共用元件 |
| `package.json`、`package-lock.json` | 專案名稱改為 `practice2` |
