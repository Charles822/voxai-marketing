const { chromium } = require('playwright');
const path = require('path');

(async () => {
  console.log('🎬 Starting video recording (3 seconds)...');
  
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 540, height: 960 },
    recordVideo: {
      dir: 'videos/',
      size: { width: 540, height: 960 },
    },
  });

  const page = await context.newPage();

  // HTML with 3-second animation
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
    .phase { 
      text-align: center; 
      width: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    
    /* Grid */
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      width: 100%;
      max-width: 320px;
      margin: 0 auto;
    }
    .grid-item {
      aspect-ratio: 1;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: var(--voxGreen-300);
    }
    
    /* Selected image */
    .selected-image {
      width: 200px;
      height: 200px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
    }
    
    /* Button */
    .generate-btn {
      background: linear-gradient(135deg, var(--voxGreen-500), var(--voxGreen-600));
      color: var(--voxGreen-50);
      padding: 14px 32px;
      border-radius: 24px;
      font-size: 16px;
      font-weight: 600;
      border: 1px solid var(--voxGreen-400);
      display: inline-block;
    }
    
    /* Dialog */
    .dialog {
      background: var(--voxGreen-850);
      border: 1px solid var(--voxGreen-800);
      border-radius: 16px;
      padding: 24px;
      width: 100%;
      max-width: 300px;
      margin: 0 auto;
    }
    .dialog-title {
      color: var(--voxGreen-100);
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 16px;
      text-align: center;
    }
    .model-option {
      padding: 10px 16px;
      border-radius: 12px;
      margin-bottom: 8px;
      font-size: 12px;
    }
    .model-selected {
      background: rgba(59, 145, 141, 0.2);
      border: 2px solid var(--voxGreen-500);
      color: var(--voxGreen-50);
    }
    .model-unselected {
      background: var(--voxGreen-900);
      border: 1px solid var(--voxGreen-800);
      color: var(--voxGreen-100);
      opacity: 0.5;
    }
    .generate-small {
      margin-top: 16px;
      background: var(--voxGreen-500);
      color: var(--voxGreen-50);
      padding: 10px;
      border-radius: 8px;
      text-align: center;
      font-size: 13px;
      font-weight: 600;
    }
    
    /* Loading */
    .spinner {
      width: 50px;
      height: 50px;
      border: 4px solid var(--voxGreen-800);
      border-top: 4px solid var(--voxGreen-500);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin: 0 auto 16px;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .status-text {
      position: absolute;
      bottom: 60px;
      left: 50%;
      transform: translateX(-50%);
      color: var(--voxGreen-300);
      font-size: 11px;
      letter-spacing: 2px;
    }
    
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
    
    <!-- Phase 1: Grid -->
    <div id="phase1" class="phase">
      <div class="grid">
        <div class="grid-item" style="background: linear-gradient(135deg, #3b5a7c40, #3b5a7c20); border: 2px solid var(--voxGreen-800);">Image 1</div>
        <div class="grid-item" style="background: linear-gradient(135deg, #5a3b7c40, #5a3b7c20); border: 2px solid var(--voxGreen-800);">Image 2</div>
        <div class="grid-item" style="background: linear-gradient(135deg, #7c5a3b40, #7c5a3b20); border: 2px solid var(--voxGreen-800);">Image 3</div>
        <div class="grid-item" style="background: linear-gradient(135deg, #3b918d40, #3b918d20); border: 2px solid #3b918d; box-shadow: 0 0 20px #3b918d60;">Image 4</div>
      </div>
      <p class="status-text">Select an image</p>
    </div>
    
    <!-- Phase 2: Selected -->
    <div id="phase2" class="phase">
      <div class="selected-image" style="background: linear-gradient(135deg, #3b918d40, #3b918d20); border: 3px solid #3b918d; box-shadow: 0 0 30px #3b918d60;">
        <span style="color: #f3faf8; font-size: 14px;">Selected</span>
      </div>
      <p class="status-text">Image selected</p>
    </div>
    
    <!-- Phase 3: Button -->
    <div id="phase3" class="phase">
      <div class="generate-btn">Generate 3D</div>
      <p class="status-text">Click Generate 3D</p>
    </div>
    
    <!-- Phase 4: Dialog -->
    <div id="phase4" class="phase">
      <div class="dialog">
        <p class="dialog-title">Select AI Model</p>
        <div class="model-option model-selected">
          <strong>VoxAI 3 (Beta)</strong><br/>
          <span style="font-size: 10px; color: #7fc9c2;">4k Texture, Highest Detail</span>
        </div>
        <div class="model-option model-unselected">VoxAI 1</div>
        <div class="generate-small">Generate</div>
      </div>
      <p class="status-text">Choose AI Model</p>
    </div>
    
    <!-- Phase 5: Loading -->
    <div id="phase5" class="phase">
      <div class="spinner"></div>
      <p style="color: #3b918d; font-size: 14px; font-weight: 600;">Generating 3D...</p>
      <p class="status-text">Processing...</p>
    </div>
  </div>

  <script>
    // 3-second timing
    setTimeout(() => {
      document.getElementById('phase1').style.display = 'none';
      document.getElementById('phase2').style.display = 'block';
    }, 400);
    
    setTimeout(() => {
      document.getElementById('phase2').style.display = 'none';
      document.getElementById('phase3').style.display = 'block';
    }, 800);
    
    setTimeout(() => {
      document.getElementById('phase3').style.display = 'none';
      document.getElementById('phase4').style.display = 'block';
    }, 1200);
    
    setTimeout(() => {
      document.getElementById('phase4').style.display = 'none';
      document.getElementById('phase5').style.display = 'block';
    }, 1600);
  </script>
</body>
</html>
  `;
  
  require('fs').writeFileSync('record-temp.html', htmlContent);
  
  await page.goto('file://' + path.join(__dirname, 'record-temp.html'));
  
  console.log('⏱️  Recording animation (3 seconds)...');
  await page.waitForTimeout(3000);
  
  await context.close();
  await browser.close();
  
  const fs = require('fs');
  const videoDir = 'videos/';
  const files = fs.readdirSync(videoDir);
  const videoFile = files.find(f => f.endsWith('.webm'));
  
  if (videoFile) {
    const oldPath = path.join(videoDir, videoFile);
    const newPath = path.join(__dirname, 'image-to-3d-transition.mp4');
    fs.renameSync(oldPath, newPath);
    fs.unlinkSync('record-temp.html');
    fs.rmdirSync(videoDir);
    
    console.log('✅ Video saved: image-to-3d-transition.mp4');
  }
})();
