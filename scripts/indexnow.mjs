// Submit site URLs to IndexNow so Bing (and Yandex/Naver) index changes immediately.
// Usage: node scripts/indexnow.mjs
// Keep the key in sync with INDEXNOW_KEY in app/lib/site.ts and public/<key>.txt

const KEY = "199dd3f83302a7cff31fd91c9a4b3aa5";
const HOST = "jsonguy.airankone.com";

const paths = [
  "/",
  "/json-repair",
  "/about",
  "/publish",
  "/blog",
  "/blog/json-formatter-comparison",
  "/blog/handling-non-standard-json",
  "/blog/json-repair",
  "/blog/json-share-api",
  "/blog/publish-html",
  "/blog/douyin-viral-content-mcp",
  "/blog/best-json-formatter",
  "/blog/json-vs-yaml-vs-toml",
];

async function submit(urlList) {
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList,
    }),
  });
  console.log(`IndexNow responded with status ${res.status}`);
  if (!res.ok) {
    console.error(await res.text());
    process.exitCode = 1;
  }
}

const urls = paths.map((p) => `https://${HOST}${p}`);
await submit(urls);
