//node compressImagesImagemin.mjs

import fs from 'fs';
import path from 'path';
import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';
import imageminSvgo from 'imagemin-svgo';

const sourceFolder = 'resources/img';
const destinationFolder = 'dist/img';

if (!fs.existsSync(destinationFolder)) {
  fs.mkdirSync(destinationFolder);
}

const files = fs.readdirSync(sourceFolder);

(async () => {
  for (const file of files) {
    const sourcePath = path.join(sourceFolder, file);
    const destinationPath = path.join(destinationFolder, file);

    try {
      const data = await imagemin([sourcePath], {
        destination: destinationFolder,
        plugins: [
          imageminJpegtran(),
          imageminPngquant({
            quality: [0.6, 0.8],
          }),
          imageminSvgo(),
        ],
      });

      console.log(`Image ${file} compressed successfully and saved to ${destinationPath}`);
    } catch (error) {
      console.error(`Error compressing image ${file}:`, error);
    }
  }

  console.log('Image compression process completed.');
})();
