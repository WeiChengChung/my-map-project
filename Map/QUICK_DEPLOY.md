# ⚡ 快速部署指南（修復 404）

## 🎯 問題診斷

您遇到 404 可能是以下原因之一：

### ❌ 情況 1: 白屏或完全 404
**原因**: 缺少必要文件  
**需要上傳的文件**:
- `index.html`
- `src/main.tsx`
- 更新的 `package.json`
- 更新的 `vercel.json`

### ❌ 情況 2: Vercel 顯示構建成功但訪問 404
**原因**: Vercel 配置問題  
**解決**: 按照下方步驟重新配置

---

## ✅ 立即修復步驟

### 第 1 步：下載更新後的項目
從 Figma Make 下載完整項目（包含所有新文件）

### 第 2 步：上傳到 GitHub

#### 方法 A - 網頁上傳（最簡單）
1. 前往您的 GitHub 倉庫
2. 如果倉庫已存在文件，先刪除舊文件或創建新分支
3. 點擊 "Add file" > "Upload files"
4. **拖拽所有文件**（確保包括以下關鍵文件）：
   ```
   index.html          ← 必須！
   package.json        ← 必須！
   vercel.json         ← 必須！
   src/main.tsx        ← 必須！
   vite.config.ts
   (其他所有文件和資料夾)
   ```
5. Commit message: `修復: 完整重新上傳解決 404`
6. 點擊 "Commit changes"

#### 方法 B - Git 命令行
```bash
cd /path/to/your/project

# 添加所有文件
git add .

# 確認哪些文件被添加
git status

# 提交
git commit -m "修復: 完整重新上傳解決 404"

# 強制推送（如果需要）
git push origin main --force
```

### 第 3 步：檢查 Vercel 設置

1. **登入 Vercel** → 選擇您的項目

2. **點擊 "Settings"**

3. **檢查 "General" 設置**:
   ```
   Framework Preset: Vite
   Root Directory: ./
   ```

4. **檢查 "Build & Development Settings"**:
   ```
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

5. **如果設置不對，修改後點擊 "Save"**

### 第 4 步：觸發重新部署

#### 選項 A - 自動重新部署
- GitHub Push 後，Vercel 會自動檢測並重新部署
- 等待 1-3 分鐘

#### 選項 B - 手動重新部署
1. 在 Vercel Dashboard
2. 點擊 "Deployments" 標籤
3. 找到最新部署
4. 點擊右側 "..." 菜單
5. 選擇 "Redeploy"
6. 勾選 "Use existing Build Cache" 或不勾選都可以
7. 點擊 "Redeploy"

### 第 5 步：驗證部署

1. **等待構建完成**（約 1-3 分鐘）

2. **查看構建日誌**，應該看到：
   ```
   ✓ vite build
   ✓ built in XXXms
   dist/index.html
   dist/assets/...
   ```

3. **訪問您的網址**（例如 `https://your-project.vercel.app`）

4. **應該看到**:
   - ✅ 斗六市地圖
   - ✅ 左側控制面板
   - ✅ 熱力圖效果

---

## 🔍 還是 404？嘗試這些

### Debug 選項 1: 查看構建日誌
1. Vercel Dashboard → 您的項目
2. 點擊最新的 Deployment
3. 點擊 "Building" 標籤
4. 查找錯誤訊息（紅色文字）

**常見錯誤**:
- `Cannot find module` → 依賴安裝失敗
- `Failed to resolve entry` → src/main.tsx 路徑錯誤
- `index.html not found` → 文件未上傳

### Debug 選項 2: 測試本地構建
```bash
# 安裝依賴
npm install

# 本地構建
npm run build

# 預覽構建結果
npm run preview
```

如果本地正常但 Vercel 失敗 → 是配置問題  
如果本地也失敗 → 是代碼或依賴問題

### Debug 選項 3: 檢查文件是否上傳
前往您的 GitHub 倉庫，確認這些文件存在：
- https://github.com/您的用戶名/倉庫名/blob/main/index.html
- https://github.com/您的用戶名/倉庫名/blob/main/src/main.tsx
- https://github.com/您的用戶名/倉庫名/blob/main/package.json

### Debug 選項 4: 完全重置
1. **在 Vercel 刪除項目**
   - Settings → General → 滾動到底
   - "Delete Project" → 確認刪除

2. **重新導入**
   - Vercel Dashboard → "Add New..." → "Project"
   - 選擇您的 GitHub 倉庫
   - Framework Preset: **Vite**
   - 點擊 "Deploy"

---

## 📞 需要協助？

如果按照上述步驟仍然失敗，請收集以下資訊：

1. **GitHub 倉庫 URL**
2. **Vercel 項目 URL**
3. **Vercel 構建日誌**（複製完整日誌）
4. **錯誤截圖**

然後提供給我，我會進一步協助！

---

## ✨ 成功部署後

部署成功！您可以：
- 🌐 分享您的網址給其他人
- 🎨 在 Vercel 添加自定義域名
- 📊 查看分析數據（Vercel Analytics）
- 🔄 每次 Push 到 GitHub 都會自動部署

享受您的店面選址評估系統！🎉
