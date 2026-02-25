const { chromium } = require('playwright');
const path = require('path');

(async () => {
  console.log('🎬 Starting video recording (5 seconds)...');
  
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 540, height: 960 },
    recordVideo: {
      dir: 'videos/',
      size: { width: 540, height: 960 },
    },
  });

  const page = await context.newPage();

  // NEW PROMPTS - Spell Scroll
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
    }
    body {
      width: 540px;
      height: 960px;
      background: linear-gradient(180deg, var(--voxGreen-950) 0%, var(--voxGreen-925) 50%, var(--voxGreen-950) 100%);
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'Inter', sans-serif;
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
    
    .phase { text-align: center; width: 100%; }
    
    .label {
      color: var(--voxGreen-300);
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 16px;
    }
    
    .input-box {
      background: var(--voxGreen-850);
      border: 1px solid var(--voxGreen-800);
      border-radius: 12px;
      padding: 20px 28px;
      min-width: 280px;
      display: inline-block;
    }
    
    .simple-text {
      color: var(--voxGreen-100);
      font-size: 24px;
      font-weight: 500;
      font-style: italic;
      margin: 0;
    }
    
    .card {
      background: var(--voxGreen-850);
      border: 1px solid var(--voxGreen-800);
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 0 0 1px var(--voxGreen-800), 0 20px 40px rgba(0,0,0,0.3);
      position: relative;
      overflow: hidden;
      text-align: left;
    }
    
    .card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--voxGreen-500), transparent);
      opacity: 0.6;
    }
    
    .typing-text {
      color: var(--voxGreen-100);
      font-size: 15px;
      font-weight: 400;
      line-height: 1.6;
      margin: 0;
      min-height: 180px;
    }
    
    .cursor {
      color: var(--voxGreen-500);
      animation: blink 0.7s infinite;
    }
    
    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }
    
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(59, 145, 141, 0.2);
      color: var(--voxGreen-500);
      padding: 8px 16px;
      border-radius: 24px;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.5px;
      border: 1px solid rgba(59, 145, 141, 0.4);
      box-shadow: 0 0 20px rgba(59, 145, 141, 0.4);
      margin-top: 20px;
      opacity: 0;
      transition: opacity 0.3s;
    }
    
    .spinner {
      width: 50px;
      height: 50px;
      border: 3px solid var(--voxGreen-800);
      border-top: 3px solid var(--voxGreen-500);
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
      box-shadow: 0 0 20px rgba(59, 145, 141, 0.4);
      margin: 0 auto 16px;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .enhancing-text {
      color: var(--voxGreen-500);
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 1px;
    }
    
    .bottom-brand {
      position: absolute;
      bottom: 40px;
      color: var(--voxGreen-300);
      font-size: 11px;
      letter-spacing: 3px;
      text-transform: uppercase;
      opacity: 0;
      transition: opacity 0.3s;
    }
    
    .waiting {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      margin-top: 24px;
      color: var(--voxGreen-300);
      font-size: 11px;
    }
    
    .waiting-spinner {
      width: 14px;
      height: 14px;
      border: 2px solid var(--voxGreen-800);
      border-top: 2px solid var(--voxGreen-500);
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }
    
    #phase1 { display: block; }
    #phase2 { display: none; }
    #phase3 { display: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="brand-header">
      <div class="brand-dot"></div>
      <span class="brand-text">VoxAI Prompt Enhancer</span>
    </div>
    
    <div id="phase1" class="phase">
      <p class="label">Basic Prompt</p>
      <div class="input-box">
        <h2 class="simple-text">"Tattered Spell Scroll"</h2>
      </div>
      <div class="waiting">
        <div class="waiting-spinner"></div>
        Enhancing...
      </div>
    </div>
    
    <div id="phase2" class="phase">
      <div class="spinner"></div>
      <p class="enhancing-text">Enhancing...</p>
    </div>
    
    <div id="phase3" class="phase">
      <p style="color: #3b918d; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 12px; font-weight: 600;">Enhanced Prompt</p>
      <div class="card">
        <p class="typing-text"><span id="typed-text"></span><span class="cursor">|</span></p>
      </div>
      <div id="badge" class="badge">
        <span style="font-size: 12px;">✨</span>
        Prompt Enhanced
      </div>
    </div>
    
    <div id="bottom-brand" class="bottom-brand">Powered by VoxAI</div>
  </div>

  <script>
    const enhancedText = "Ancient, yellowed parchment scroll with frayed, burnt edges and deep creases. Glowing violet runic inscriptions etched in shimmering metallic ink. Held by cracked wooden rollers with tarnished bronze endcaps. Stained with faded ink spatters and dust, showing rough, weathered fiber texture.";
    
    setTimeout(() => {
      document.getElementById('phase1').style.display = 'none';
      document.getElementById('phase2').style.display = 'block';
      
      setTimeout(() => {
        document.getElementById('phase2').style.display = 'none';
        document.getElementById('phase3').style.display = 'block';
        
        let index = 0;
        const typingElement = document.getElementById('typed-text');
        
        const typeInterval = setInterval(() => {
          if (index < enhancedText.length) {
            typingElement.textContent += enhancedText.charAt(index);
            index++;
          } else {
            clearInterval(typeInterval);
            setTimeout(() => {
              document.getElementById('badge').style.opacity = '1';
              document.getElementById('bottom-brand').style.opacity = '1';
            }, 200);
          }
        }, 18);
        
      }, 400);
    }, 800);
  </script>
</body>
</html>
  `;
  
  require('fs').writeFileSync('record-temp.html', htmlContent);
  
  await page.goto('file://' + path.join(__dirname, 'record-temp.html'));
  
  console.log('⏱️  Recording animation (5 seconds)...');
  await page.waitForTimeout(5000);
  
  await context.close();
  await browser.close();
  
  const fs = require('fs');
  const videoDir = 'videos/';
  const files = fs.readdirSync(videoDir);
  const videoFile = files.find(f => f.endsWith('.webm'));
  
  if (videoFile) {
    const oldPath = path.join(videoDir, videoFile);
    const newPath = path.join(__dirname, 'prompt-enhancement-scroll.mp4');
    fs.renameSync(oldPath, newPath);
    fs.unlinkSync('record-temp.html');
    fs.rmdirSync(videoDir);
    
    console.log('✅ Video saved: prompt-enhancement-scroll.mp4');
  }
})();
