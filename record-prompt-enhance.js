const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

// CLI: node record-prompt-enhance.js "simple prompt" "enhanced prompt"
const simplePrompt = process.argv[2] || 'Ancient tree spirit guardian';
const enhancedPrompt =
  process.argv[3] ||
  'Ancient tree spirit guardian, gnarled bark skin, glowing sapphire moss veins, antler-like mahogany branches, long beard of weeping willow leaves, glowing ethereal green eyes, towering wooden humanoid structure, encrusted with lichen and smooth river stones.';

const TYPING_SPEED_MS = 22;
const totalDuration =
  2000 + 800 + enhancedPrompt.length * TYPING_SPEED_MS + 1200;

(async () => {
  console.log('🎬 Starting prompt enhance video recording...');
  console.log(`📝 Simple: "${simplePrompt}"`);
  console.log(`✨ Enhanced: ${enhancedPrompt.slice(0, 50)}...`);

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 540, height: 960 },
    recordVideo: {
      dir: 'videos/',
      size: { width: 540, height: 960 },
    },
  });

  const page = await context.newPage();

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    :root {
      --voxGreen-50: #f3faf8;
      --voxGreen-100: #d7f0ed;
      --voxGreen-300: #7fc9c2;
      --voxGreen-500: #3b918d;
      --voxGreen-800: #234c4c;
      --voxGreen-850: #1d4545;
      --voxGreen-925: #132A2A;
      --voxGreen-950: #0e2324;
      --accentGlow: rgba(59, 145, 141, 0.4);
    }
    body {
      width: 540px;
      height: 960px;
      background: linear-gradient(180deg, var(--voxGreen-950) 0%, var(--voxGreen-925) 50%, var(--voxGreen-950) 100%);
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'Inter', system-ui, sans-serif;
      overflow: hidden;
    }
    .container {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 40px 24px;
      position: relative;
    }
    .brand-header {
      position: absolute;
      top: 60px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(59, 145, 141, 0.15);
      border: 1px solid var(--voxGreen-800);
      border-radius: 20px;
      padding: 8px 16px;
    }
    .brand-dot {
      width: 8px;
      height: 8px;
      background: var(--voxGreen-500);
      border-radius: 50%;
      box-shadow: 0 0 10px var(--voxGreen-500);
    }
    .brand-text {
      color: var(--voxGreen-500);
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 2px;
      text-transform: uppercase;
    }
    .phase { display: none; text-align: center; width: 100%; }
    .phase.active { display: flex; flex-direction: column; align-items: center; }
    .label {
      color: var(--voxGreen-300);
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 20px;
    }
    .prompt-box {
      background: var(--voxGreen-850);
      border: 1px solid var(--voxGreen-800);
      border-radius: 12px;
      padding: 24px 32px;
      min-width: 280px;
    }
    .prompt-text {
      color: var(--voxGreen-100);
      font-size: 28px;
      font-weight: 500;
      font-style: italic;
    }
    .enhancing-hint {
      margin-top: 40px;
      color: var(--voxGreen-300);
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid var(--voxGreen-800);
      border-top: 2px solid var(--voxGreen-500);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    .phase2-spinner {
      width: 60px;
      height: 60px;
      border: 3px solid var(--voxGreen-800);
      border-top: 3px solid var(--voxGreen-500);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      box-shadow: 0 0 20px var(--accentGlow);
    }
    .phase2-text {
      color: var(--voxGreen-500);
      font-size: 18px;
      font-weight: 600;
      margin-top: 24px;
    }
    .enhanced-label {
      color: var(--voxGreen-500);
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 16px;
      font-weight: 600;
    }
    .enhanced-box {
      background: var(--voxGreen-850);
      border: 1px solid var(--voxGreen-800);
      border-radius: 16px;
      padding: 28px;
      box-shadow: 0 0 0 1px var(--voxGreen-800), 0 20px 40px rgba(0,0,0,0.3);
      position: relative;
      overflow: hidden;
    }
    .enhanced-box::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--voxGreen-500), transparent);
      opacity: 0.6;
    }
    .enhanced-text {
      color: var(--voxGreen-100);
      font-size: 17px;
      font-weight: 400;
      line-height: 1.7;
      min-height: 200px;
    }
    .cursor {
      color: var(--voxGreen-500);
      font-weight: 300;
      animation: blink 0.53s step-end infinite;
    }
    .done-badge {
      margin-top: 28px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(59, 145, 141, 0.2);
      color: var(--voxGreen-500);
      padding: 10px 20px;
      border-radius: 24px;
      font-size: 13px;
      font-weight: 600;
      border: 1px solid rgba(59, 145, 141, 0.4);
      box-shadow: 0 0 20px var(--accentGlow);
    }
    .footer {
      position: absolute;
      bottom: 50px;
      color: var(--voxGreen-300);
      font-size: 11px;
      letter-spacing: 3px;
      text-transform: uppercase;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="brand-header">
      <div class="brand-dot"></div>
      <span class="brand-text">VoxAI Prompt Enhancer</span>
    </div>

    <div id="phase1" class="phase active">
      <p class="label">Basic Prompt</p>
      <div class="prompt-box">
        <p class="prompt-text">"${simplePrompt.replace(/"/g, '&quot;')}"</p>
      </div>
      <div class="enhancing-hint">
        <div class="spinner"></div>
        Enhancing...
      </div>
    </div>

    <div id="phase2" class="phase">
      <div class="phase2-spinner"></div>
      <p class="phase2-text">Enhancing with AI...</p>
    </div>

    <div id="phase3" class="phase">
      <p class="enhanced-label">Enhanced Prompt</p>
      <div class="enhanced-box">
        <p class="enhanced-text" id="enhancedText"></p>
      </div>
      <div id="doneBadge" class="done-badge" style="opacity: 0;">
        <span>✨</span> Prompt Enhanced
      </div>
    </div>

    <p id="footer" class="footer" style="opacity: 0;">Powered by VoxAI</p>
  </div>

  <script>
    const enhancedPrompt = ${JSON.stringify(enhancedPrompt)};
    const typingSpeed = ${TYPING_SPEED_MS};

    function showPhase(id) {
      document.querySelectorAll('.phase').forEach(p => {
        p.classList.toggle('active', p.id === id);
      });
    }

    setTimeout(() => {
      showPhase('phase2');
    }, 2000);

    setTimeout(() => {
      showPhase('phase3');
      const el = document.getElementById('enhancedText');
      let i = 0;
      const interval = setInterval(() => {
        if (i < enhancedPrompt.length) {
          el.innerHTML = enhancedPrompt.slice(0, i + 1) + '<span class="cursor">|</span>';
          i++;
        } else {
          clearInterval(interval);
          el.innerHTML = enhancedPrompt + '<span class="cursor">|</span>';
          document.getElementById('doneBadge').style.opacity = '1';
          document.getElementById('doneBadge').style.transition = 'opacity 0.5s';
          document.getElementById('footer').style.opacity = '1';
          document.getElementById('footer').style.transition = 'opacity 0.5s';
        }
      }, typingSpeed);
    }, 2800);
  </script>
</body>
</html>
`;

  const tempPath = path.join(__dirname, 'record-prompt-temp.html');
  fs.writeFileSync(tempPath, htmlContent);

  await page.goto('file://' + tempPath);

  console.log(`⏱️  Recording (${(totalDuration / 1000).toFixed(1)}s)...`);
  await page.waitForTimeout(totalDuration);

  await context.close();
  await browser.close();

  const videoDir = path.join(__dirname, 'videos');
  const files = fs.existsSync(videoDir) ? fs.readdirSync(videoDir) : [];
  const videoFile = files.find((f) => f.endsWith('.webm'));

  if (videoFile) {
    const oldPath = path.join(videoDir, videoFile);
    const newPath = path.join(__dirname, 'prompt-enhance-transition.mp4');
    fs.renameSync(oldPath, newPath);
    fs.unlinkSync(tempPath);
    try {
      fs.rmdirSync(videoDir);
    } catch (_) {}

    console.log('✅ Video saved: prompt-enhance-transition.mp4');
  }
})();
