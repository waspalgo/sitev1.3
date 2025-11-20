const fs = require('fs');
const path = require('path');

// Vérifier si sharp est disponible
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.error('❌ Sharp n\'est pas installé. Installation en cours...');
  console.error('Veuillez exécuter: npm install sharp');
  process.exit(1);
}

const sizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 48, name: 'favicon-48x48.png' },
  { size: 96, name: 'favicon-96x96.png' },
  { size: 144, name: 'favicon-144x144.png' },
  { size: 180, name: 'apple-touch-icon.png' },
];

const inputSvg = path.join(__dirname, '../app/icon.svg');
const outputDir = path.join(__dirname, '../public');

async function generateFavicons() {
  console.log('🎨 Génération des favicons à partir du SVG...\n');

  // Vérifier que le SVG existe
  if (!fs.existsSync(inputSvg)) {
    console.error(`❌ Fichier SVG introuvable: ${inputSvg}`);
    process.exit(1);
  }

  // Créer le dossier public s'il n'existe pas
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Générer chaque taille
  for (const { size, name } of sizes) {
    try {
      const outputPath = path.join(outputDir, name);
      await sharp(inputSvg)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 } // Fond transparent
        })
        .png()
        .toFile(outputPath);
      
      console.log(`✅ Généré: ${name} (${size}x${size})`);
    } catch (error) {
      console.error(`❌ Erreur lors de la génération de ${name}:`, error.message);
    }
  }

  // Générer favicon.ico (contient plusieurs tailles)
  try {
    const icoPath = path.join(outputDir, 'favicon.ico');
    // Sharp ne supporte pas directement ICO, on crée un PNG 32x32 comme fallback
    // Pour un vrai ICO, il faudrait utiliser un autre outil
    await sharp(inputSvg)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(icoPath.replace('.ico', '.png'));
    
    // Copier le 32x32 comme favicon.ico (les navigateurs modernes l'accepteront)
    fs.copyFileSync(
      path.join(outputDir, 'favicon-32x32.png'),
      icoPath
    );
    console.log(`✅ Généré: favicon.ico (basé sur 32x32)`);
  } catch (error) {
    console.error(`❌ Erreur lors de la génération de favicon.ico:`, error.message);
  }

  console.log('\n✨ Tous les favicons ont été générés avec succès!');
  console.log(`📁 Fichiers créés dans: ${outputDir}`);
}

generateFavicons().catch(console.error);


