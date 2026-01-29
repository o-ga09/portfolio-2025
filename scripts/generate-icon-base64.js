const fs = require("fs");
const path = require("path");

// アイコン画像をBase64エンコード
const iconPath = path.join(__dirname, "..", "public", "icon.png");
const iconBuffer = fs.readFileSync(iconPath);
const iconBase64 = iconBuffer.toString("base64");

// TypeScriptファイルとして出力
const outputContent = `// このファイルは自動生成されます。直接編集しないでください。
// 生成元: scripts/generate-icon-base64.js

export const ICON_BASE64 = "data:image/png;base64,${iconBase64}";
`;

const outputPath = path.join(__dirname, "..", "lib", "icon-base64.ts");
fs.writeFileSync(outputPath, outputContent, "utf8");

console.log("✅ Generated icon base64 in", outputPath);
