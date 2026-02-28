const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  console.log('🎬 Recording Key Image-to-3D (improved 4-phase)...');
  
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 540, height: 960 },
    recordVideo: {
      dir: 'videos/',
      size: { width: 540, height: 960 },
    },
  });

  const page = await context.newPage();

  const imagePath = path.join(__dirname, 'user-image-key.jpg');
  const imageUrl = 'file://' + imagePath.replace(/\\/g, '/');
  
  const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    :root {
      --voxGreen-50: #f3faf8;
      --voxGreen-100: #d7f0ed;
      --voxGreen-300: #7fc9c2;
      --voxGreen-400: #5ab5af;
      --voxGreen-500: #3b918d;
      --voxGreen-600: #2d7472;
      --voxGreen-700: #285d5d;
      --voxGreen-800: #234c4c;
      --voxGreen-850: #1d4545;
      --voxGreen-925: #132A2A;
      --voxGreen-950: #0e2324;
    }
    body {
      width: 540px;
      height: 960px;
      background: linear-gradient(180deg, var(--voxGreen-950) 0%, var(--voxGreen-925) 100%);
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
      top: 40px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(59, 145, 141, 0.15);
      border: 1px solid var(--voxGreen-800);
      border-radius: 20px;
      padding: 8px 16px;
    }
    .brand-dot { width: 8px; height: 8px; background: var(--voxGreen-500); border-radius: 50%; box-shadow: 0 0 10px var(--voxGreen-500); }
    .brand-text { color: var(--voxGreen-500); font-size: 12px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; }
    .phase { text-align: center; width: 100%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }
    
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; width: 100%; max-width: 340px; margin: 0 auto; perspective: 600px; transform-style: preserve-3d; }
    .grid-item { aspect-ratio: 1; border-radius: 14px; overflow: hidden; border: 2px solid var(--voxGreen-800); transition: all 0.3s ease; }
    .grid-item img { width: 100%; height: 100%; object-fit: cover; }
    .grid-item.muted { opacity: 0.5; filter: brightness(0.7); }
    .grid-item.selected { border: 3px solid var(--voxGreen-500); box-shadow: 0 0 24px rgba(59, 145, 141, 0.5); animation: pulse-glow 1.2s ease-in-out infinite, selected-lift 0.4s ease-out forwards; }
    @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 24px rgba(59, 145, 141, 0.5); } 50% { box-shadow: 0 0 32px rgba(59, 145, 141, 0.7); } }
    @keyframes selected-lift { 0% { transform: translateZ(0) scale(1); } 100% { transform: translateZ(8px) scale(1.03); } }
    
    .selected-display { width: 280px; height: 280px; border-radius: 20px; overflow: hidden; border: 3px solid var(--voxGreen-500); box-shadow: 0 0 40px rgba(59, 145, 141, 0.4), inset 0 0 60px rgba(59, 145, 141, 0.1); }
    .selected-display img { width: 100%; height: 100%; object-fit: cover; }
    
    .generate-btn { background: linear-gradient(135deg, var(--voxGreen-500), var(--voxGreen-600)); color: var(--voxGreen-50); padding: 18px 40px; border-radius: 28px; font-size: 18px; font-weight: 600; border: 1px solid var(--voxGreen-400); box-shadow: 0 4px 20px rgba(59, 145, 141, 0.4); cursor: pointer; transition: all 0.15s ease; }
    .generate-btn.clicked { transform: scale(0.92); box-shadow: 0 2px 12px rgba(59, 145, 141, 0.4); }
    
    .spinner { width: 64px; height: 64px; border: 4px solid var(--voxGreen-800); border-top: 4px solid var(--voxGreen-500); border-radius: 50%; animation: spin 0.9s linear infinite; margin: 0 auto 24px; }
    .phase4-text { margin-top: 8px; }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    
    .status-bar { position: absolute; bottom: 120px; left: 0; right: 0; text-align: center; }
    .status-text { color: var(--voxGreen-300); font-size: 12px; letter-spacing: 2px; text-transform: uppercase; text-shadow: 0 1px 3px rgba(0,0,0,0.5); }
    
    #phase1 { display: block; }
    #phase2 { display: none; }
    #phase3 { display: none; }
    #phase4 { display: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="brand-header">
      <div class="brand-dot"></div>
      <span class="brand-text">VoxAI Image to 3D</span>
    </div>
    
    <div id="phase1" class="phase">
      <div class="grid">
        <div class="grid-item muted"><img src="${imageUrl}" alt="Ref 1" /></div>
        <div class="grid-item muted"><img src="${imageUrl}" alt="Ref 2" /></div>
        <div class="grid-item muted"><img src="${imageUrl}" alt="Ref 3" /></div>
        <div class="grid-item selected"><img src="${imageUrl}" alt="Selected" /></div>
      </div>
    </div>
    
    <div id="phase2" class="phase">
      <div class="selected-display"><img src="${imageUrl}" alt="Selected for 3D" /></div>
    </div>
    
    <div id="phase3" class="phase">
      <div id="generateBtn" class="generate-btn">Generate 3D</div>
    </div>
    
    <div id="phase4" class="phase">
      <div class="spinner"></div>
      <p class="phase4-text" style="color: var(--voxGreen-500); font-size: 16px; font-weight: 600;">Generating 3D Model...</p>
    </div>
    
    <div class="status-bar">
      <p id="statusText" class="status-text">Choose your reference image</p>
    </div>
  </div>

  <script>
    const statusEl = document.getElementById('statusText');
    function setStatus(text) { statusEl.textContent = text; }
    
    setTimeout(() => {
      document.getElementById('phase1').style.display = 'none';
      document.getElementById('phase2').style.display = 'block';
      setStatus('Image selected');
    }, 1000);
    
    setTimeout(() => {
      document.getElementById('phase2').style.display = 'none';
      document.getElementById('phase3').style.display = 'block';
      setStatus('Tap to transform');
    }, 2100);
    
    setTimeout(() => {
      const btn = document.getElementById('generateBtn');
      btn.classList.add('clicked');
    }, 2600);
    setTimeout(() => {
      const btn = document.getElementById('generateBtn');
      btn.classList.remove('clicked');
      document.getElementById('phase3').style.display = 'none';
      document.getElementById('phase4').style.display = 'block';
      setStatus('Processing with AI');
    }, 2850);
  </script>
</body>
</html>`;
  
  fs.writeFileSync('record-temp.html', htmlContent);
  
  await page.goto('file://' + path.join(__dirname, 'record-temp.html'));
  await page.waitForSelector('.grid-item img', { state: 'visible', timeout: 5000 });
  await page.waitForTimeout(200);
  
  console.log('⏱️  Recording (5 seconds)...');
  await page.waitForTimeout(5000);
  
  await context.close();
  await browser.close();
  
  const videoDir = path.join(__dirname, 'videos');
  const files = fs.existsSync(videoDir) ? fs.readdirSync(videoDir) : [];
  const videoFile = files.find(f => f.endsWith('.webm'));
  
  if (videoFile) {
    const oldPath = path.join(videoDir, videoFile);
    const newPath = path.join(__dirname, 'image-to-3d-key.mp4');
    fs.renameSync(oldPath, newPath);
    fs.unlinkSync(path.join(__dirname, 'record-temp.html'));
    if (fs.existsSync(videoDir)) fs.rmdirSync(videoDir);
    
    console.log('✅ Video saved: image-to-3d-key.mp4');
  }
})();
