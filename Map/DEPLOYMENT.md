# 🚀 Vercel 部署檢查清單與故障排除

## ✅ 必需文件清單

請確保以下文件都存在於您的 GitHub 倉庫中：

```
✅ /index.html                  (HTML 入口)
✅ /package.json                (含 dev, build, preview 腳本)
✅ /vite.config.ts              (Vite 配置)
✅ /vercel.json                 (Vercel 配置)
✅ /src/main.tsx                (React 入口)
✅ /src/app/App.tsx             (主應用組件)
✅ /.gitignore                  (Git 忽略配置)
```

---

## 🔧 Vercel 項目設置

在 Vercel 項目設置頁面，確認以下配置：

### Framework Preset
```
Vite
```

### Build & Development Settings
```
Build Command:       npm run build
Output Directory:    dist
Install Command:     npm install
Development Command: npm run dev
```

### Root Directory
```
./  (專案根目錄)
```

### Node.js Version
```
18.x 或更高 (推薦 20.x)
```

---

## 🐛 常見 404 錯誤原因

### 1️⃣ 缺少 index.html
**症狀**: 部署成功但顯示 404  
**解決**: 確保根目錄有 `index.html` 文件

### 2️⃣ 缺少 src/main.tsx
**症狀**: 構建錯誤或白屏  
**解決**: 確保 `src/main.tsx` 存在並正確引入 App

### 3️⃣ 錯誤的 Output Directory
**症狀**: Vercel 找不到構建文件  
**解決**: 在 Vercel 設置中將 Output Directory 設為 `dist`

### 4️⃣ package.json 缺少 build 腳本
**症狀**: 構建失敗  
**解決**: 確保 package.json 包含：
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

### 5️⃣ 路由問題
**症狀**: 首頁正常但子路由 404  
**解決**: 已包含 `vercel.json` 配置處理 SPA 路由

---

## 🔍 診斷步驟

### 步驟 1: 檢查 GitHub 倉庫
訪問您的 GitHub 倉庫，確認所有文件都已上傳：
```
https://github.com/您的用戶名/您的倉庫名
```

### 步驟 2: 查看 Vercel 構建日誌
1. 登入 Vercel Dashboard
2. 選擇您的項目
3. 點擊最新的 Deployment
4. 查看 "Building" 標籤下的日誌

**正常構建應該顯示**:
```
✓ built in XXXms
✓ XX modules transformed
```

### 步驟 3: 檢查構建輸出
在構建日誌中查找：
```
dist/index.html                X.XX kB
dist/assets/index-XXXXX.js     XXX.XX kB
dist/assets/index-XXXXX.css    XX.XX kB
```

### 步驟 4: 測試本地構建
在本地測試構建是否成功：
```bash
npm install
npm run build
npm run preview
```

如果本地正常，但 Vercel 404，問題通常是配置問題。

---

## 🆘 如果還是 404

### 選項 A: 重新部署
1. 在 Vercel 項目頁面
2. 點擊 "Deployments" 標籤
3. 找到最新部署，點擊右側的 "..." 菜單
4. 選擇 "Redeploy"

### 選項 B: 清除快取重新部署
1. 進入項目 Settings
2. 選擇 "General"
3. 向下滾動找到 "Delete Project"（不要真的刪除！）
4. 返回 Deployments
5. 點擊 "Redeploy" 並勾選 "Clear build cache"

### 選項 C: 手動觸發部署
1. 在 GitHub 倉庫進行任何小改動（例如修改 README.md）
2. Commit 並 Push
3. Vercel 會自動觸發新的部署

### 選項 D: 刪除並重新導入項目
1. 在 Vercel 刪除當前項目
2. 重新從 GitHub 導入
3. 確保所有設置正確

---

## 📊 成功部署的標誌

部署成功後，您應該看到：

✅ **Vercel Dashboard 顯示**:
- Status: Ready
- 綠色的 ✓ 圖標
- 可訪問的網址

✅ **瀏覽器中顯示**:
- 地圖顯示斗六市
- 左側控制面板
- 熱力圖效果
- 可點擊的地點標記

---

## 💡 專業提示

1. **查看實時日誌**: 部署時保持 Vercel Dashboard 打開，實時查看構建日誌

2. **使用 Preview URL**: 每次 Push 都會生成一個預覽 URL，可以在不影響生產環境的情況下測試

3. **環境變數**: 如果使用 API 密鑰，在 Vercel 的 Settings > Environment Variables 中添加

4. **域名**: 部署成功後可在 Settings > Domains 添加自定義域名

---

## 🆘 還需要幫助？

如果按照以上步驟仍然失敗，請提供：
1. Vercel 構建日誌（完整內容）
2. GitHub 倉庫 URL
3. Vercel 項目設置截圖
4. 錯誤訊息截圖

我會進一步協助您！
