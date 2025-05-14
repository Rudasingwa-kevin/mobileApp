const fs = require('fs');
const path = require('path');
const https = require('https');
const { promisify } = require('util');

const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);

const fontUrls = {
  'Inter-Regular.ttf': 'https://github.com/rsms/inter/raw/master/docs/font-files/Inter-Regular.woff2',
  'Inter-Medium.ttf': 'https://github.com/rsms/inter/raw/master/docs/font-files/Inter-Medium.woff2',
  'Inter-SemiBold.ttf': 'https://github.com/rsms/inter/raw/master/docs/font-files/Inter-SemiBold.woff2',
  'Inter-Bold.ttf': 'https://github.com/rsms/inter/raw/master/docs/font-files/Inter-Bold.woff2',
  'Pacifico-Regular.ttf': 'https://github.com/google/fonts/raw/main/ofl/pacifico/Pacifico-Regular.ttf'
};

const fontsDir = path.join(__dirname, 'assets', 'fonts');

async function downloadFont(url, filename) {
  const filePath = path.join(fontsDir, filename);
  
  console.log(`Téléchargement de ${filename} depuis ${url}...`);
  
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Échec du téléchargement: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`${filename} téléchargé avec succès!`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}); // Supprimer le fichier en cas d'erreur
      reject(err);
    });
  });
}

async function main() {
  try {
    // S'assurer que le répertoire des polices existe
    try {
      await mkdir(fontsDir, { recursive: true });
      console.log(`Dossier créé: ${fontsDir}`);
    } catch (err) {
      if (err.code !== 'EEXIST') {
        throw err;
      }
      console.log(`Dossier ${fontsDir} existe déjà`);
    }
    
    // Télécharger toutes les polices
    const downloads = Object.entries(fontUrls).map(
      ([filename, url]) => downloadFont(url, filename)
    );
    
    await Promise.all(downloads);
    
    console.log('Toutes les polices ont été téléchargées avec succès!');
  } catch (err) {
    console.error('Une erreur est survenue:', err);
    process.exit(1);
  }
}

main(); 