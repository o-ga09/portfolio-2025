const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

// contentsディレクトリからマークダウンファイルを読み込んでJSONに変換
function generatePostsJson() {
  const contentsDir = path.join(process.cwd(), "contents");
  const outputDir = path.join(process.cwd(), "public");
  const outputFile = path.join(outputDir, "posts.json");

  // contentsディレクトリが存在しない場合は空配列を出力
  if (!fs.existsSync(contentsDir)) {
    console.log("⚠️  contents directory not found, creating empty posts.json");
    fs.writeFileSync(outputFile, JSON.stringify([], null, 2));
    return;
  }

  const files = fs.readdirSync(contentsDir);
  const markdownFiles = files.filter((file) => file.endsWith(".md"));

  const posts = markdownFiles.map((filename) => {
    const filePath = path.join(contentsDir, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    // ファイル名から日付を抽出（YYYY-MM-DD-slug.md形式の場合）
    const slug = filename.replace(/\.md$/, "");
    const dateMatch = slug.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/);
    const id = dateMatch ? dateMatch[2] : slug;
    const date = dateMatch ? dateMatch[1] : data.date || new Date().toISOString().split("T")[0];

    // imageTypeをランダムに割り当て
    const imageTypes = ["green", "orange", "black"];
    const imageType = imageTypes[Math.floor(Math.random() * imageTypes.length)];

    return {
      id,
      title: data.title || slug,
      description: data.description || content.substring(0, 100) + "...",
      date,
      content,
      imageType,
      tags: data.topics || data.tags || [],
      type: "blog",
    };
  });

  // 日付でソート（新しい順）
  const sortedPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // JSONファイルとして出力
  fs.writeFileSync(outputFile, JSON.stringify(sortedPosts, null, 2));
  console.log(`✅ Generated ${sortedPosts.length} posts in ${outputFile}`);
}

generatePostsJson();
