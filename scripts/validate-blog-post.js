const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

// OGP画像・OGPタイトルタグとして表示した際に崩れにくい目安の文字数
const TITLE_MAX_LENGTH = 60;
const DESCRIPTION_MAX_LENGTH = 120;

const FILENAME_PATTERN = /^(\d{4}-\d{2}-\d{2})-(.+)\.md$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function isValidDate(dateString) {
  if (!DATE_PATTERN.test(dateString)) return false;
  const date = new Date(dateString);
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(dateString);
}

// contents/*.md 1件を検証し、{ errors, warnings } を返す
function validatePost(filePath) {
  const errors = [];
  const warnings = [];
  const filename = path.basename(filePath);

  let parsed;
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    parsed = matter(raw);
  } catch (error) {
    errors.push(`フロントマターのパースに失敗しました: ${error.message}`);
    return { errors, warnings };
  }

  const { data } = parsed;

  if (!FILENAME_PATTERN.test(filename)) {
    warnings.push("ファイル名が `YYYY-MM-DD-slug.md` 形式ではありません（推奨形式です）");
  }

  const filenameDate = filename.match(FILENAME_PATTERN)?.[1];
  const frontmatterDate = data.date;

  if (frontmatterDate !== undefined && typeof frontmatterDate !== "string") {
    errors.push(
      `date はYAML文字列である必要があります（例: "2026-07-14"）: ${JSON.stringify(frontmatterDate)}`,
    );
  } else if (typeof frontmatterDate === "string" && !isValidDate(frontmatterDate)) {
    errors.push(`date の形式が不正です（YYYY-MM-DD で指定してください）: "${frontmatterDate}"`);
  }

  if (!filenameDate && (frontmatterDate === undefined || typeof frontmatterDate !== "string")) {
    warnings.push("日付がファイル名にもフロントマターにもありません（今日の日付が使われます）");
  }

  const tags = data.tags ?? data.topics;
  if (tags !== undefined) {
    if (!Array.isArray(tags) || !tags.every((tag) => typeof tag === "string")) {
      errors.push(`tags/topics は文字列配列である必要があります: ${JSON.stringify(tags)}`);
    }
  }

  if (data.title !== undefined) {
    if (typeof data.title !== "string") {
      errors.push(`title は文字列である必要があります: ${JSON.stringify(data.title)}`);
    } else if (data.title.length > TITLE_MAX_LENGTH) {
      warnings.push(
        `title が${data.title.length}文字あります（OGPで見切れる可能性があるため${TITLE_MAX_LENGTH}文字以内を推奨）`,
      );
    }
  }

  if (data.description !== undefined) {
    if (typeof data.description !== "string") {
      errors.push(`description は文字列である必要があります: ${JSON.stringify(data.description)}`);
    } else if (data.description.length > DESCRIPTION_MAX_LENGTH) {
      warnings.push(
        `description が${data.description.length}文字あります（OGPで見切れる可能性があるため${DESCRIPTION_MAX_LENGTH}文字以内を推奨）`,
      );
    }
  }

  if (data.published !== undefined && typeof data.published !== "boolean") {
    errors.push(`published は真偽値である必要があります: ${JSON.stringify(data.published)}`);
  }

  return { errors, warnings };
}

function resolveTargetFiles(args) {
  if (args.length > 0) {
    return args.filter((file) => file.endsWith(".md"));
  }

  const contentsDir = path.join(process.cwd(), "contents");
  if (!fs.existsSync(contentsDir)) return [];

  return fs
    .readdirSync(contentsDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => path.join(contentsDir, file));
}

function main() {
  const targetFiles = resolveTargetFiles(process.argv.slice(2));

  if (targetFiles.length === 0) {
    console.log("検証対象のMarkdownファイルがありません");
    return;
  }

  let hasError = false;

  for (const filePath of targetFiles) {
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  ${filePath} は存在しません（削除されたファイル）。スキップします`);
      continue;
    }

    const { errors, warnings } = validatePost(filePath);
    const relativePath = path.relative(process.cwd(), filePath);

    if (errors.length === 0 && warnings.length === 0) {
      console.log(`✅ ${relativePath}`);
      continue;
    }

    for (const error of errors) {
      console.log(`❌ ${relativePath}: ${error}`);
    }
    for (const warning of warnings) {
      console.log(`⚠️  ${relativePath}: ${warning}`);
    }

    if (errors.length > 0) hasError = true;
  }

  if (hasError) {
    console.log("\n❌ フロントマターの検証でエラーが見つかりました");
    process.exit(1);
  }

  console.log("\n✅ フロントマターの検証が完了しました");
}

main();
