const fs = require('fs');

try {
  fs.copyFileSync('C:/Users/srira/.gemini/antigravity/brain/7c1bc65a-9488-470e-a370-31a564311935/raycasting_cartoon_1774166535786.png', 'src/assets/raycasting_cartoon.png');
  fs.copyFileSync('C:/Users/srira/.gemini/antigravity/brain/7c1bc65a-9488-470e-a370-31a564311935/pi_cartoon_1774166552557.png', 'src/assets/pi_cartoon.png');
  fs.copyFileSync('C:/Users/srira/.gemini/antigravity/brain/7c1bc65a-9488-470e-a370-31a564311935/fourier_cartoon_1774166570419.png', 'src/assets/fourier_cartoon.png');
  console.log('Successfully injected cartoon assets!');
} catch (e) {
  console.error("Failed to copy:", e);
}
