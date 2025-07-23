import { readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";

import plist from "plist";
const {
  parse, // XML string => JS object
  build, // JS object => XML string
} = plist;
// `plist` is CommonJS-based package, so I need to import it as a default and then destructure.

// const cwd = process.cwd();
// FYI when executed from package.json script it refers to root folder

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const INPUT_FILE = join(homedir(), "Music/Music/Media.localized/Library.xml");
// note that VS Code (when even `ls -la` folder of iTunes files requires access confirmation to files)
const xml = readFileSync(INPUT_FILE, "utf8");

const data = parse(xml);
const tracks = data.Tracks; // Also: .Playlists

const trackObjects = Object.values(tracks);
// console.log(trackObjects);
const trackObjectKeys = Object.keys(trackObjects[0]);
console.log("iTunes Library Track fields:\n" + trackObjectKeys.join(", "));

const formattedJSON = JSON.stringify(trackObjects, null, 4);
const OUTPUT_FILE = join(__dirname, "data", "tracks-2025.json");
writeFileSync(OUTPUT_FILE, formattedJSON);

console.log("\niTunes Library XML converted to JSON " + OUTPUT_FILE);
