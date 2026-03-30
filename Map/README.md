# 雲林縣斗六市店面選址評估系統

專注於手搖飲料店與早餐店的選址分析系統，整合互動地圖、即時熱力圖、權重調整功能與詳細商圈分析。

## 🚀 功能特色

- 📍 **互動地圖**：整合 Leaflet 地圖顯示斗六市商圈
- 🔥 **即時熱力圖**：視覺化展示商圈熱度
- ⚖️ **權重調整**：自訂商業、交通、人口三大維度權重
- 📊 **雷達圖分析**：多維度數據視覺化
- 🏆 **Top 3 推薦**：AI 推薦最佳開店地點
- 💰 **預算計算器**：評估開店成本
- 📱 **響應式設計**：支援桌面與移動裝置
- 🎯 **預設策略**：學生商圈、上班族、住宅區等快速方案

## 📦 技術棧

- **框架**: React 18 + TypeScript
- **構建工具**: Vite
- **樣式**: Tailwind CSS v4
- **地圖**: Leaflet + React Leaflet
- **UI 組件**: Radix UI + Material-UI
- **圖表**: Recharts
- **動畫**: Motion (Framer Motion)

## 🛠️ 開發指南

### 安裝依賴

```bash
# 使用 npm
npm install

# 或使用 pnpm
pnpm install
```

### 開發模式

```bash
npm run dev
```

### 構建生產版本

```bash
npm run build
```

構建後的文件將輸出到 `dist/` 目錄。

## 📈 部署

本項目可部署至：
- Vercel（推薦）
- Netlify
- GitHub Pages
- 任何支援靜態網站的平台

### Vercel 部署配置

專案已包含 `vercel.json` 配置文件，Vercel 會自動識別。

**重要文件：**
- ✅ `index.html` - 應用入口
- ✅ `src/main.tsx` - React 渲染入口
- ✅ `vercel.json` - Vercel 部署配置
- ✅ `.gitignore` - Git 忽略文件

### 部署步驟

1. 將代碼推送到 GitHub
2. 在 [Vercel](https://vercel.com) 導入您的 GitHub 倉庫
3. Vercel 會自動檢測配置並部署
4. 等待構建完成（約 1-3 分鐘）

### 常見問題

**Q: 遇到 404 錯誤？**

確保以下文件存在：
- `/index.html`
- `/src/main.tsx`
- `/vercel.json`

然後重新推送到 GitHub，Vercel 會自動重新部署。

**Q: 構建失敗？**

檢查：
1. Node.js 版本（建議 18 或以上）
2. 所有依賴是否正確安裝
3. Vercel 構建日誌中的錯誤訊息

## 📄 授權

本項目基於學術研究開發，用於店面選址評估。

## 🙏 致謝

數據來源與算法基於學術論文研究成果。