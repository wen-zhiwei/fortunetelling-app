<div id="language-selector" style="text-align: center; margin-bottom: 20px;">
  <button onclick="showLanguage('zh')" style="padding: 8px 16px; margin: 0 5px; background-color: #6c5ce7; color: white; border: none; border-radius: 4px; cursor: pointer;">中文</button>
  <button onclick="showLanguage('en')" style="padding: 8px 16px; margin: 0 5px; background-color: #6c5ce7; color: white; border: none; border-radius: 4px; cursor: pointer;">English</button>
</div>

<div id="zh-content">
# 求签App

一个传统民俗与现代科技碰撞的轻量应用，以像素风演绎掷杯茭仪式，搭配每日肯定语，为日常决策与心境注入正向指引。

## 功能特性

- 🎲 **第一步：掷杯筊** - 点击投掷，三次机会，获得圣杯后可进入下一步
- 📿 **第二步：摇签求签** - 摇动手机进行求签，根据概率分布获得上签/中签/下签
- 🎁 **第三步：领取签** - 根据签文结果进行不同的操作
- ✨ **肯定语系统** - 每次求签后展示对应的肯定语，提供积极心理暗示
- ⭐ **收藏功能** - 可收藏喜欢的肯定语到本地，在"我的收藏"页面查看
- 📊 **历史记录** - 自动记录求签结果，提供统计图表和历史查询
- 🎨 **三种主题** - 紫色、金色、绿色主题切换
- 🌐 **双语支持** - 中文/英文切换
- 🎮 **像素风格** - 90年代掌机风格UI设计
- 🤖 **AI 生成签文** - 基于大语言模型的智能签文生成，提供更多样化的积极肯定语

## 核心功能 | Core Features

* 🎨 像素风视觉设计：复古像素美学，适配多色显示，打造沉浸式体验
* 🎲 掷杯茭互动模块：还原传统圣杯、笑杯、阴杯判定逻辑，像素化交互，仪式感拉满
* 💬 签文肯定语收藏：签文展示的积极文案，支持收藏复看，快速实现心境回顾
* 🌟 传统×现代融合：将千年民俗智慧与AI驱动的轻量化体验结合，既是文化传承也是日常陪伴￼￼￼
* 🔄 动态查看历史：支持求签场景统计和周期历史回顾，持续丰富功能与体验

## 技术栈

- React + TypeScript
- Vite
- CSS Modules
- DeviceMotion API (摇动检测)
- PWA (Service Worker)
- localStorage (本地存储，用于收藏功能)
- Vibe Coding AI 辅助全流程开发

## 安装和运行

1. 安装依赖：

```bash
npm install
```

2. 启动开发服务器：

```bash
npm run dev
```

3. 构建生产版本：

```bash
npm run build
```

## 使用说明

### 第一步：掷杯筊

- 点击"投掷"按钮进行投掷
- 一平一凸 = 圣杯（可进入下一步）
- 两平 = 笑杯（需重新投掷）
- 两凸 = 阴杯（需重新投掷）
- 共有三次机会

### 第二步：摇签求签

- 双手握住手机摇动
- 系统会自动检测摇动并抽取签文
- 概率分布：
  - 上签：32.1%
  - 中签：32.1%
  - 下签：35.8%

### 第三步：领取签

- **上签**：点击"领取好运"按钮
- **中签**：点击"再来一次"返回第二步
- **下签**：点击垃圾桶图标扔掉签文

### 肯定语系统

- 每次求签后，系统会根据签的类型（上签/中签/下签）展示对应的肯定语
- 肯定语提供积极的心理暗示，帮助用户保持乐观心态
- 支持中英文双语显示

### 收藏功能

- 在第三步结果页面，点击肯定语旁边的五角星图标可收藏该肯定语
- 点击已收藏的五角星图标可取消收藏
- 在设置菜单中点击"我的收藏"可查看所有已收藏的肯定语
- 收藏的肯定语会保存在本地存储中，刷新页面后仍然保留

### 历史记录功能

- 系统会自动记录每次求签的结果，包括签的类型、时间和对应的肯定语
- 在设置菜单中点击"历史记录"可查看所有历史求签记录
- 历史记录页面提供签文分布统计图表，直观展示求签结果的分布情况
- 历史记录会保存在本地存储中，刷新页面后仍然保留
- 可通过清空历史记录功能删除所有记录

## 注意事项

- DeviceMotion API需要HTTPS环境或localhost才能工作
- iOS 13+需要用户授权才能使用摇动功能
- PWA需要HTTPS部署才能安装到主屏幕

## 浏览器支持

- Chrome/Edge (推荐)
- Safari (iOS 13+)
- Firefox
- 移动端浏览器

## 开发

项目使用Vite作为构建工具，支持热模块替换(HMR)。

## 许可证

MIT

</div>

<div id="en-content" style="display: none;">
# Fortune Telling App

A pixel-style fortune telling web application with three steps: throwing cups, shaking for fortune, and receiving the fortune.

## Features

- 🎲 **Step 1: Throw Cups** - Click to throw, three chances, get a sacred cup to proceed
- 📿 **Step 2: Shake for Fortune** - Shake your phone to draw a fortune, with probability distribution for good/neutral/bad fortunes
- 🎁 **Step 3: Receive Fortune** - Different operations based on fortune results
- ✨ **Affirmation System** - Displays corresponding affirmations after each fortune telling, providing positive psychological hints
- ⭐ **Favorite Function** - Can save favorite affirmations locally and view them in "My Favorites" page
- 📊 **History Function** - Automatically records fortune results, provides statistics charts and historical queries
- 🎨 **Three Themes** - Purple, gold, and green theme switching
- 🌐 **Bilingual Support** - Chinese/English switching
- 📱 **PWA Support** - Can be installed to phone home screen
- 🎮 **Pixel Style** - 90s handheld game console style UI design
- 🤖 **AI Generated Affirmations** - Intelligent affirmation generation based on large language models, providing more diverse positive affirmations

## Tech Stack

- React + TypeScript
- Vite
- CSS Modules
- DeviceMotion API (shake detection)
- PWA (Service Worker)
- localStorage (local storage for favorite function)

## Installation and Running

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Build production version:

```bash
npm run build
```

## Usage Instructions

### Step 1: Throw Cups

- Click "Throw" button to throw
- One flat one convex = Sacred cup (can proceed to next step)
- Two flat = Smile cup (need to throw again)
- Two convex = Yin cup (need to throw again)
- Three chances in total

### Step 2: Shake for Fortune

- Hold the phone with both hands and shake
- The system will automatically detect shaking and draw a fortune
- Probability distribution:
  - Good fortune: 32.1%
  - Neutral fortune: 32.1%
  - Bad fortune: 35.8%

### Step 3: Receive Fortune

- **Good fortune**: Click "Receive Good Luck" button
- **Neutral fortune**: Click "Try Again" to return to Step 2
- **Bad fortune**: Click trash can icon to discard the fortune

### Affirmation System

- After each fortune telling, the system displays corresponding affirmations based on the fortune type (good/neutral/bad)
- Affirmations provide positive psychological hints to help users maintain an optimistic mindset
- Supports bilingual display in Chinese and English

### Favorite Function

- On the Step 3 result page, click the star icon next to the affirmation to save it
- Click the saved star icon to unsave
- Click "My Favorites" in the settings menu to view all saved affirmations
- Saved affirmations are stored in local storage and remain after page refresh

### History Function

- The system automatically records each fortune telling result, including fortune type, time, and corresponding affirmation
- Click "History" in the settings menu to view all historical fortune telling records
- The history page provides fortune distribution statistics charts, intuitively displaying the distribution of fortune results
- History records are stored in local storage and remain after page refresh
- You can delete all records through the clear history function

## Notes

- DeviceMotion API requires HTTPS environment or localhost to work
- iOS 13+ requires user authorization to use shake function
- PWA requires HTTPS deployment to be installed to home screen

## Browser Support

- Chrome/Edge (recommended)
- Safari (iOS 13+)
- Firefox
- Mobile browsers

## Development

The project uses Vite as the build tool, supporting Hot Module Replacement (HMR).

## License

MIT

</div>

<script>
function showLanguage(lang) {
  if (lang === 'zh') {
    document.getElementById('zh-content').style.display = 'block';
    document.getElementById('en-content').style.display = 'none';
  } else {
    document.getElementById('zh-content').style.display = 'none';
    document.getElementById('en-content').style.display = 'block';
  }
}
</script>

# 强制重新构建
