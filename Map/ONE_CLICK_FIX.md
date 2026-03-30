# ⚡ 一鍵修復 Vercel 404

## 🎯 最快解決方案（5 分鐘內完成）

### 步驟 1️⃣: 刪除 Vercel 項目

1. 前往 https://vercel.com/dashboard
2. 選擇您的項目
3. Settings → 滾動到底部 → Delete Project
4. 輸入項目名稱確認

### 步驟 2️⃣: 確認 GitHub 文件

前往您的 GitHub 倉庫，確認這 5 個關鍵文件存在：

```
✅ index.html          (根目錄)
✅ package.json        (根目錄)
✅ vercel.json         (根目錄)
✅ vite.config.ts      (根目錄)
✅ src/main.tsx        (在 src 資料夾內)
```

**如果缺少任何文件**：
- 從 Figma Make 重新下載完整專案
- 上傳所有文件到 GitHub

### 步驟 3️⃣: 重新導入到 Vercel

1. Vercel Dashboard → "Add New..." → "Project"
2. 選擇您的 GitHub 倉庫
3. **Framework Preset**: 選擇 **Vite** ⚠️ 這是關鍵！
4. 其他設置保持預設
5. 點擊 "Deploy"

### 步驟 4️⃣: 等待並測試

- 等待 1-3 分鐘構建完成
- 訪問 Vercel 提供的 URL
- 應該看到地圖和控制面板

---

## 🔥 如果還是失敗

### 檢查 Vercel 構建日誌

1. 點擊部署項目
2. 查看 "Building" 標籤
3. 尋找紅色錯誤訊息

### 常見錯誤快速修復

**看到 "Failed to build"**
→ 在 GitHub 確認 package.json 包含：
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

**看到 "Cannot find module"**
→ 刪除 Vercel 項目，重新導入時選擇 **Vite** Framework

**構建成功但訪問還是 404**
→ Settings → Output Directory 設為 `dist`

---

## ✅ 成功標誌

✓ Vercel 顯示 "Ready"（綠色）  
✓ 可以訪問網站  
✓ 看到斗六市地圖  
✓ 左側有控制面板  

---

## 💡 專業提示

**最常見的錯誤原因**：
1. Framework Preset 沒選 "Vite"
2. 文件沒有完整上傳到 GitHub
3. 使用了舊的快取

**預防方法**：
- 每次部署前確認所有文件都在 GitHub
- 重新部署時勾選 "Clear build cache"
- 使用 Vite Framework Preset

---

## 🆘 還需要幫助

如果仍然失敗，請回覆：

1. ✅ 我已確認 GitHub 有所有文件
2. ✅ 我已選擇 Vite Framework
3. ✅ 我已刪除並重新導入項目
4. ❌ Vercel 構建日誌顯示：[貼上錯誤訊息]

我會立即協助！
