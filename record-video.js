const { chromium } = require('playwright');
const path = require('path');

(async () => {
  console.log('🎬 Starting video recording...');
  
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 540, height: 960 },
    recordVideo: {
      dir: 'videos/',
      size: { width: 540, height: 960 },
    },
  });

  const page = await context.newPage();

  // HTML with CORRECT voxGreen colors
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
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
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
    
    /* Brand Header */
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
    
    /* Phase styles */
    .phase { text-align: center; width: 100%; }
    
    .label {
      color: var(--voxGreen-300);
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 20px;
    }
    
    .input-box {
      background: var(--voxGreen-850);
      border: 1px solid var(--voxGreen-800);
      border-radius: 12px;
      padding: 24px 32px;
      min-width: 280px;
      display: inline-block;
    }
    
    .simple-text {
      color: var(--voxGreen-100);
      font-size: 28px;
      font-weight: 500;
      font-style: italic;
      margin: 0;
    }
    
    .card {
      background: var(--voxGreen-850);
      border: 1px solid var(--voxGreen-800);
      border-radius: 16px;
      padding: 28px;
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
      font-size: 17px;
      font-weight: 400;
      line-height: 1.7;
      margin: 0;
      min-height: 200px;
    }
    
    .cursor {
      color: var(--voxGreen-500);
      animation: blink 1s infinite;
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
      padding: 10px 20px;
      border-radius: 24px;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.5px;
      border: 1px solid rgba(59, 145, 141, 0.4);
      box-shadow: 0 0 20px rgba(59, 145, 141, 0.4);
      margin-top: 28px;
      opacity: 0;
      transition: opacity 0.5s;
    }
    
    .spinner {
      width: 60px;
      height: 60px;
      border: 3px solid var(--voxGreen-800);
      border-top: 3px solid var(--voxGreen-500);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      box-shadow: 0 0 20px rgba(59, 145, 141, 0.4);
      margin: 0 auto 24px;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .enhancing-text {
      color: var(--voxGreen-500);
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 1px;
    }
    
    .bottom-brand {
      position: absolute;
      bottom: 50px;
      color: var(--voxGreen-300);
      font-size: 11px;
      letter-spacing: 3px;
      text-transform: uppercase;
      opacity: 0;
      transition: opacity 0.5s;
    }
    
    .waiting {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-top: 40px;
      color: var(--voxGreen-300);
      font-size: 12px;
    }
    
    .waiting-spinner {
      width: 16px;
      height: 16px;
      border: 2px solid var(--voxGreen-800);
      border-top: 2px solid var(--voxGreen-500);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    #phase1 { display: block; }
    #phase2 { display: none; }
    #phase3 { display: none; }
  </style>
</head>
<body>
  <div class="container">
    <!-- Brand Header -->
    <div class="brand-header">
      <div class="brand-dot"></div>
      <span class="brand-text">VoxAI Prompt Enhancer</span>
    </div>
    
    <!-- Phase 1: Simple prompt -->
    <div id="phase1" class="phase">
      <p class="label">Basic Prompt</p>
      <div class="input-box">
        <h2 class="simple-text">"a plumber"</h2>
      </div>
      <div class="waiting">
        <div class="waiting-spinner"></div>
        Enhancing...
      </div>
    </div>
    
    <!-- Phase 2: Enhancing -->
    <div id="phase2" class="phase">
      <div class="spinner"></div>
      <p class="enhancing-text">Enhancing with AI...</p>
    </div>
    
    <!-- Phase 3: Typing -->
    <div id="phase3" class="phase">
      <p style="color: #3b918d; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 16px; font-weight: 600;">Enhanced Prompt</p>
      <div class="card">
        <p class="typing-text"><span id="typed-text"></span><span class="cursor">|</span></p>
      </div>
      <div id="badge" class="badge">
        <span style="font-size: 14px;">✨</span>
        Prompt Enhanced
      </div>
    </div>
    
    <!-- Bottom Brand -->
    <div id="bottom-brand" class="bottom-brand">Powered by VoxAI</div>
  </div>

  <script>
    const enhancedText = "Middle-aged male plumber wearing faded denim overalls, a sweat-stained red cotton shirt, and a heavy leather tool belt. He has calloused hands, smudged grease on his jaw, short grizzled hair under a canvas cap, and rugged tan leather work boots.";
    
    // Phase 1: Show for 2 seconds
    setTimeout(() => {
      document.getElementById('phase1').style.display = 'none';
      document.getElementById('phase2').style.display = 'block';
      
      // Phase 2: Enhancing for 0.8 seconds
      setTimeout(() => {
        document.getElementById('phase2').style.display = 'none';
        document.getElementById('phase3').style.display = 'block';
        
        // Phase 3: Type out text
        let index = 0;
        const typingElement = document.getElementById('typed-text');
        
        const typeInterval = setInterval(() => {
          if (index < enhancedText.length) {
            typingElement.textContent += enhancedText.charAt(index);
            index++;
          } else {
            clearInterval(typeInterval);
            // Show badge and bottom brand
            setTimeout(() => {
              document.getElementById('badge').style.opacity = '1';
              document.getElementById('bottom-brand').style.opacity = '1';
            }, 300);
          }
        }, 30);
        
      }, 800);
    }, 2000);
  </script>
</body>
</html>
  `;
  
  require('fs').writeFileSync('record-temp.html', htmlContent);
  
  await page.goto('file://' + path.join(__dirname, 'record-temp.html'));
  
  console.log('⏱️  Recording animation (12 seconds)...');
  await page.waitForTimeout(12000);
  
  await context.close();
  await browser.close();
  
  const fs = require('fs');
  const videoDir = 'videos/';
  const files = fs.readdirSync(videoDir);
  const videoFile = files.find(f => f.endsWith('.webm'));
  
  if (videoFile) {
    const oldPath = path.join(videoDir, videoFile);
    const newPath = path.join(__dirname, 'prompt-enhancement.webm');
    fs.renameSync(oldPath, newPath);
    fs.unlinkSync('record-temp.html');
    fs.rmdirSync(videoDir);
    
    console.log('✅ Video saved: prompt-enhancement.webm');
    console.log('📁 Location: ' + newPath);
  }
})();
