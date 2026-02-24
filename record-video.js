const { chromium } = require('playwright');
const path = require('path');

(async () => {
  console.log('🎬 Starting video recording...');
  
  // Launch browser with video recording
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 540, height: 960 }, // 9:16 ratio
    recordVideo: {
      dir: 'videos/',
      size: { width: 540, height: 960 },
    },
  });

  const page = await context.newPage();

  // Build and serve the app
  console.log('📦 Building app...');
  
  // Navigate to the app (assuming it's built)
  const filePath = path.join(__dirname, 'src', 'app', 'page.tsx');
  
  // Create a simple HTML file for testing
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 540px;
      height: 960px;
      background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%);
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
    }
    .phase {
      text-align: center;
    }
    .label {
      color: rgba(255, 255, 255, 0.6);
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 16px;
    }
    .simple-text {
      color: #ffffff;
      font-size: 32px;
      font-weight: 600;
    }
    .card {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 24px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      width: 100%;
    }
    .typing-text {
      color: #ffffff;
      font-size: 18px;
      line-height: 1.6;
      min-height: 200px;
    }
    .cursor {
      color: #60a5fa;
      animation: blink 1s infinite;
    }
    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }
    .badge {
      display: inline-block;
      background: rgba(96, 165, 250, 0.2);
      color: #60a5fa;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 500;
      margin-top: 24px;
    }
    .spinner {
      width: 40px;
      height: 40px;
      border: 3px solid rgba(255, 255, 255, 0.2);
      border-top: 3px solid #ffffff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 20px auto;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    #phase1 { display: block; }
    #phase2 { display: none; }
    #phase3 { display: none; }
  </style>
</head>
<body>
  <div class="container">
    <!-- Phase 1: Simple prompt -->
    <div id="phase1" class="phase">
      <p class="label">Basic Prompt</p>
      <h2 class="simple-text">"a plumber"</h2>
    </div>
    
    <!-- Phase 2: Enhancing -->
    <div id="phase2" class="phase">
      <div class="spinner"></div>
      <p style="color: #ffffff; font-size: 18px;">Enhancing prompt...</p>
    </div>
    
    <!-- Phase 3: Typing -->
    <div id="phase3" class="phase" style="width: 100%;">
      <p class="label">Enhanced Prompt</p>
      <div class="card">
        <p class="typing-text"><span id="typed-text"></span><span class="cursor">|</span></p>
      </div>
      <div id="badge" class="badge" style="opacity: 0; transition: opacity 0.5s;">✨ Prompt Enhanced</div>
    </div>
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
            // Show badge
            setTimeout(() => {
              document.getElementById('badge').style.opacity = '1';
            }, 300);
          }
        }, 25); // 25ms per character
        
      }, 800);
    }, 2000);
  </script>
</body>
</html>
  `;
  
  require('fs').writeFileSync('record-temp.html', htmlContent);
  
  // Navigate to the page
  await page.goto('file://' + path.join(__dirname, 'record-temp.html'));
  
  // Wait for animation to complete
  // 2s (phase 1) + 0.8s (phase 2) + (330 chars * 25ms = 8.25s) + 1s buffer = ~12s
  console.log('⏱️  Recording animation (12 seconds)...');
  await page.waitForTimeout(12000);
  
  // Close context to save video
  await context.close();
  await browser.close();
  
  // Find the video file
  const fs = require('fs');
  const videoDir = 'videos/';
  const files = fs.readdirSync(videoDir);
  const videoFile = files.find(f => f.endsWith('.webm'));
  
  if (videoFile) {
    const oldPath = path.join(videoDir, videoFile);
    const newPath = path.join(__dirname, 'prompt-enhancement.webm');
    fs.renameSync(oldPath, newPath);
    
    // Clean up temp files
    fs.unlinkSync('record-temp.html');
    fs.rmdirSync(videoDir);
    
    console.log('✅ Video saved: prompt-enhancement.webm');
    console.log('📁 Location: ' + newPath);
    console.log('');
    console.log('📝 To convert to MP4, run:');
    console.log('   ffmpeg -i prompt-enhancement.webm -c:v libx264 -c:a aac prompt-enhancement.mp4');
  }
})();
