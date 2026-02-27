const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  console.log('🎬 Recording Image-to-3D with YOUR image...');
  
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 540, height: 960 },
    recordVideo: {
      dir: 'videos/',
      size: { width: 540, height: 960 },
    },
  });

  const page = await context.newPage();

  const imagePath = path.join(__dirname, 'user-image.jpg');
  const imagePathUrl = 'file://' + imagePath.replace(/\\/g, '/');
  
  const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    :root {
      --voxGreen-500: #3b918d;
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
      top: 50px;
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
    
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; width: 100%; max-width: 320px; margin: 0 auto; }
    .grid-item { aspect-ratio: 1; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 12px; color: var(--voxGreen-300); overflow: hidden; }
    .grid-item img { width: 100%; height: 100%; object-fit: cover; border-radius: 12px; }
    
    .selected-image { width: 240px; height: 240px; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto; overflow: hidden; }
    .selected-image img { width: 100%; height: 100%; object-fit: cover; border-radius: 16px; }
    
    .generate-btn { background: linear-gradient(135deg, var(--voxGreen-500), #2d7472); color: #f3faf8; padding: 16px 36px; border-radius: 24px; font-size: 18px; font-weight: 600; border: 1px solid #55aca7; display: inline-block; }
    
    .dialog { background: #1d4545; border: 1px solid #234c4c; border-radius: 16px; padding: 24px; width: 100%; max-width: 300px; margin: 0 auto; }
    .dialog-title { color: #f3faf8; font-size: 14px; font-weight: 600; margin-bottom: 16px; text-align: center; }
    .model-option { padding: 12px 16px; border-radius: 12px; margin-bottom: 8px; font-size: 13px; text-align: left; }
    .model-selected { background: rgba(59, 145, 141, 0.2); border: 2px solid #3b918d; color: #f3faf8; }
    .model-unselected { background: #214040; border: 1px solid #234c4c; color: #dedede; opacity: 0.5; }
    .generate-small { margin-top: 16px; background: #3b918d; color: #f3faf8; padding: 12px; border-radius: 8px; text-align: center; font-size: 14px; font-weight: 600; }
    
    .spinner { width: 60px; height: 60px; border: 4px solid #234c4c; border-top: 4px solid #3b918d; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px; }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    
    .status-text { position: absolute; bottom: 60px; left: 50%; transform: translateX(-50%); color: #7fc9c2; font-size: 12px; letter-spacing: 2px; }
    
    .glow-border { border: 3px solid #3b918d; box-shadow: 0 0 40px rgba(59, 145, 141, 0.5); }
    
    #phase1 { display: block; }
    #phase2 { display: none; }
    #phase3 { display: none; }
    #phase4 { display: none; }
    #phase5 { display: none; }
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
        <div class="grid-item" style="background: linear-gradient(135deg, #3b5a7c40, #3b5a7c20); border: 2px solid #234c4c;">Image 1</div>
        <div class="grid-item" style="background: linear-gradient(135deg, #5a3b7c40, #5a3b7c20); border: 2px solid #234c4c;">Image 2</div>
        <div class="grid-item" style="background: linear-gradient(135deg, #7c5a3b40, #7c5a3b20); border: 2px solid #234c4c;">Image 3</div>
        <div class="grid-item glow-border">
          <img src="${imagePathUrl}" alt="Your Image" />
        </div>
      </div>
      <p class="status-text">Choose your reference image</p>
    </div>
    
    <div id="phase2" class="phase">
      <div class="selected-image glow-border">
        <img src="${imagePathUrl}" alt="Selected" />
      </div>
      <p class="status-text">Image selected</p>
    </div>
    
    <div id="phase3" class="phase">
      <div class="generate-btn">Generate 3D</div>
      <p class="status-text">Click to start generation</p>
    </div>
    
    <div id="phase4" class="phase">
      <div class="dialog">
        <p class="dialog-title">Select AI Model</p>
        <div class="model-option model-selected">
          <strong style="font-size: 14px;">VoxAI 3 (Beta)</strong><br/>
          <span style="font-size: 11px; color: #7fc9c2;">4k Texture • Highest Detail</span>
        </div>
        <div class="model-option model-unselected">
          <strong style="font-size: 13px;">VoxAI 1</strong><br/>
          <span style="font-size: 10px; color: #7fc9c2;">Fast • Production Ready</span>
        </div>
        <div class="generate-small">Generate 3D Model</div>
      </div>
      <p class="status-text">VoxAI 3 selected</p>
    </div>
    
    <div id="phase5" class="phase">
      <div class="spinner"></div>
      <p style="color: #3b918d; font-size: 16px; font-weight: 600;">Generating 3D Model...</p>
      <p class="status-text">Processing with AI</p>
    </div>
  </div>

  <script>
    setTimeout(() => {
      document.getElementById('phase1').style.display = 'none';
      document.getElementById('phase2').style.display = 'block';
    }, 800);
    
    setTimeout(() => {
      document.getElementById('phase2').style.display = 'none';
      document.getElementById('phase3').style.display = 'block';
    }, 1600);
    
    setTimeout(() => {
      document.getElementById('phase3').style.display = 'none';
      document.getElementById('phase4').style.display = 'block';
    }, 2400);
    
    setTimeout(() => {
      document.getElementById('phase4').style.display = 'none';
      document.getElementById('phase5').style.display = 'block';
    }, 3600);
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
    const newPath = path.join(__dirname, 'image-to-3d-with-your-image.mp4');
    fs.renameSync(oldPath, newPath);
    fs.unlinkSync('record-temp.html');
    fs.rmdirSync(videoDir);
    
    console.log('✅ Video saved: image-to-3d-with-your-image.mp4');
  }
})();
