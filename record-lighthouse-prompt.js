const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  console.log('🎬 Recording Lighthouse Keeper Prompt Enhancement...');
  
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 540, height: 960 },
    recordVideo: {
      dir: 'videos/',
      size: { width: 540, height: 960 },
    },
  });

  const page = await context.newPage();

  const htmlContent = `<!DOCTYPE html>
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
      flexDirection: column;
      justifyContent: center;
      alignItems: center;
      padding: 40px 24px;
      position: relative;
    }
    .brand-header {
      position: absolute;
      top: 60px;
      display: inline-flex;
      alignItems: center;
      gap: 8px;
      background: rgba(59, 145, 141, 0.15);
      border: 1px solid var(--voxGreen-800);
      borderRadius: 20px;
      padding: 8px 16px;
    }
    .brand-dot { width: 8px; height: 8px; background: var(--voxGreen-500); borderRadius: 50%; boxShadow: 0 0 10px var(--voxGreen-500); }
    .brand-text { color: var(--voxGreen-500); fontSize: 12px; fontWeight: 600; letterSpacing: 2px; textTransform: uppercase; }
    .phase { textAlign: center; width: 100%; }
    .label { color: var(--voxGreen-300); fontSize: 14px; textTransform: uppercase; letterSpacing: 2px; marginBottom: 16px; }
    .input-box { background: var(--voxGreen-850); border: 1px solid var(--voxGreen-800); borderRadius: 12px; padding: 20px 28px; minWidth: 280px; display: inline-block; }
    .simple-text { color: var(--voxGreen-100); fontSize: 24px; fontWeight: 500; fontStyle: italic; margin: 0; }
    .card { background: var(--voxGreen-850); border: 1px solid var(--voxGreen-800); borderRadius: 16px; padding: 24px; boxShadow: 0 0 0 1px var(--voxGreen-800), 0 20px 40px rgba(0,0,0,0.3); position: relative; overflow: hidden; textAlign: left; }
    .card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, var(--voxGreen-500), transparent); opacity: 0.6; }
    .typing-text { color: var(--voxGreen-100); fontSize: 15px; fontWeight: 400; lineHeight: 1.6; margin: 0; minHeight: 220px; }
    .cursor { color: var(--voxGreen-500); animation: blink 0.7s infinite; }
    @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
    .badge { display: inline-flex; alignItems: center; gap: 6px; background: rgba(59, 145, 141, 0.2); color: var(--voxGreen-500); padding: 8px 16px; borderRadius: 24px; fontSize: 12px; fontWeight: 600; border: 1px solid rgba(59, 145, 141, 0.4); boxShadow: 0 0 20px rgba(59, 145, 141, 0.4); marginTop: 20px; opacity: 0; transition: opacity 0.3s; }
    .spinner { width: 50px; height: 50px; border: 3px solid var(--voxGreen-800); borderTop: 3px solid var(--voxGreen-500); borderRadius: 50%; animation: spin 0.6s linear infinite; boxShadow: 0 0 20px rgba(59, 145, 141, 0.4); margin: 0 auto 16px; }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    .waiting { display: flex; alignItems: center; justifyContent: center; gap: 6px; marginTop: 24px; color: var(--voxGreen-300); fontSize: 11px; }
    .waiting-spinner { width: 14px; height: 14px; border: 2px solid var(--voxGreen-800); borderTop: 2px solid var(--voxGreen-500); borderRadius: 50%; animation: spin 0.6s linear infinite; }
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
        <h2 class="simple-text">"The Last Lighthouse Keeper"</h2>
      </div>
      <div class="waiting">
        <div class="waiting-spinner"></div>
        Enhancing...
      </div>
    </div>
    
    <div id="phase2" class="phase">
      <div class="spinner"></div>
      <p style="color: var(--voxGreen-500); fontSize: 16px; fontWeight: 600;">Enhancing...</p>
    </div>
    
    <div id="phase3" class="phase">
      <p style="color: #3b918d; fontSize: 11px; textTransform: uppercase; letterSpacing: 2px; marginBottom: 12px; fontWeight: 600;">Enhanced Prompt</p>
      <div class="card">
        <p class="typing-text"><span id="typed-text"></span><span class="cursor">|</span></p>
      </div>
      <div id="badge" class="badge">
        <span style="fontSize: 12px;">✨</span>
        Prompt Enhanced
      </div>
    </div>
  </div>

  <script>
    const enhancedText = "Spectral aged male sailor, semi-transparent pale blue form, yellow heavy-duty oilskin coat, thick salt-encrusted beard tangled with glowing cyan algae, weathered skin, holding a corroded iron lantern emitting misty emerald luminescence.";
    
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
            }, 200);
          }
        }, 16);
        
      }, 400);
    }, 800);
  </script>
</body>
</html>`;
  
  fs.writeFileSync('record-temp.html', htmlContent);
  
  await page.goto('file://' + path.join(__dirname, 'record-temp.html'));
  
  console.log('⏱️  Recording (5 seconds)...');
  await page.waitForTimeout(5000);
  
  await context.close();
  await browser.close();
  
  const videoDir = 'videos/';
  const files = fs.readdirSync(videoDir);
  const videoFile = files.find(f => f.endsWith('.webm'));
  
  if (videoFile) {
    const oldPath = path.join(videoDir, videoFile);
    const newPath = path.join(__dirname, 'prompt-enhancement-lighthouse.mp4');
    fs.renameSync(oldPath, newPath);
    fs.unlinkSync('record-temp.html');
    fs.rmdirSync(videoDir);
    
    console.log('✅ Video saved: prompt-enhancement-lighthouse.mp4');
  }
})();
