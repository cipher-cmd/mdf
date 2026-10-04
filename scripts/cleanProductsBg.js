const sharp = require('sharp');
const path = require('path');

async function cleanTextPlate() {
  const input = path.join(__dirname, '../public/BG/productsHeroBg.png');
  const output = path.join(__dirname, '../public/BG/productsHeroPlate.png');
  const meta = await sharp(input).metadata();
  
  // Left damask border is roughly x: 0 to 80px
  // Artwork (Dal Lake, gazebo, cricket bat, shoes, ball, cursive signature) is roughly x: 480 to 1024
  // Copy area is roughly x: 60 to 480, y: 55 to 390
  // Top mock navbar is y: 0 to 52
  // Bottom stat strip starts around y: 395
  const svgOverlay = Buffer.from(`
    <svg width="${meta.width}" height="${meta.height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Soft top fade for fixed Next.js Navbar -->
        <linearGradient id="topFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#FAF8F5" stop-opacity="1.0" />
          <stop offset="70%" stop-color="#FAF8F5" stop-opacity="0.95" />
          <stop offset="100%" stop-color="#FAF8F5" stop-opacity="0.0" />
        </linearGradient>

        <!-- Soft linear fade for text area from left damask edge to lake -->
        <linearGradient id="copyGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#FAF8F5" stop-opacity="0.0" />
          <stop offset="8%" stop-color="#FAF8F5" stop-opacity="0.0" />
          <stop offset="13%" stop-color="#FAF8F5" stop-opacity="0.99" />
          <stop offset="42%" stop-color="#FAF8F5" stop-opacity="0.98" />
          <stop offset="54%" stop-color="#FAF8F5" stop-opacity="0.0" />
        </linearGradient>

        <!-- Soft radial haze for copy area center -->
        <radialGradient id="textHaze" cx="24%" cy="46%" r="35%">
          <stop offset="0%" stop-color="#FAF8F5" stop-opacity="1.0" />
          <stop offset="65%" stop-color="#FAF8F5" stop-opacity="0.99" />
          <stop offset="88%" stop-color="#FAF8F5" stop-opacity="0.65" />
          <stop offset="100%" stop-color="#FAF8F5" stop-opacity="0.0" />
        </radialGradient>

        <!-- Soft bottom fade for floating stat bar -->
        <linearGradient id="bottomFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#FAF8F5" stop-opacity="0.0" />
          <stop offset="75%" stop-color="#FAF8F5" stop-opacity="0.0" />
          <stop offset="88%" stop-color="#FAF8F5" stop-opacity="0.9" />
          <stop offset="98%" stop-color="#FAF8F5" stop-opacity="1.0" />
        </linearGradient>
      </defs>

      <!-- Top navbar blend -->
      <rect x="0" y="0" width="${meta.width}" height="68" fill="url(#topFade)" />

      <!-- Text clear area (preserves left damask 0-80px and right art >480px) -->
      <rect x="0" y="45" width="${meta.width}" height="370" fill="url(#copyGrad)" />
      <rect x="0" y="0" width="${meta.width}" height="${meta.height}" fill="url(#textHaze)" />

      <!-- Bottom fade into stats bar container -->
      <rect x="0" y="360" width="${meta.width}" height="154" fill="url(#bottomFade)" />
    </svg>
  `);

  await sharp(input)
    .composite([{ input: svgOverlay, blend: 'over' }])
    .toFile(output);

  console.log('Successfully created ' + output);
}

cleanTextPlate().catch(err => {
  console.error(err);
  process.exit(1);
});

