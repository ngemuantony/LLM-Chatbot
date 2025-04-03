import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, '..', '..', '.dfx', 'local', 'canisters');
const targetDir = path.join(__dirname, '..', 'declarations');

async function copyDeclarations() {
  try {
    // Create the declarations directory if it doesn't exist
    await fs.mkdir(targetDir, { recursive: true });

    // Copy declarations for each canister
    for (const canister of ['backend', 'llm']) {
      const canisterDir = path.join(targetDir, canister);
      await fs.mkdir(canisterDir, { recursive: true });

      // Copy .did files
      const sourceDidFile = path.join(sourceDir, canister, `${canister}.did`);
      const targetDidFile = path.join(canisterDir, `${canister}.did`);
      try {
        await fs.copyFile(sourceDidFile, targetDidFile);
      } catch (error) {
        console.log(`No .did file found for ${canister}`);
      }

      // Copy .did.js files
      const sourceDidJsFile = path.join(sourceDir, canister, `${canister}.did.js`);
      const targetDidJsFile = path.join(canisterDir, `${canister}.did.js`);
      try {
        await fs.copyFile(sourceDidJsFile, targetDidJsFile);
      } catch (error) {
        console.log(`No .did.js file found for ${canister}`);
      }

      // Copy .most files if they exist
      const sourceMostFile = path.join(sourceDir, canister, `${canister}.most`);
      const targetMostFile = path.join(canisterDir, `${canister}.most`);
      try {
        await fs.copyFile(sourceMostFile, targetMostFile);
      } catch (error) {
        console.log(`No .most file found for ${canister}`);
      }
    }

    console.log('Declarations copied successfully!');
  } catch (error) {
    console.error('Error copying declarations:', error);
    process.exit(1);
  }
}

copyDeclarations();
