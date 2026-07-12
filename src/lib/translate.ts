const DEEPL_API_URL =
  process.env.DEEPL_API_URL || "https://api-free.deepl.com/v2/translate";

export async function translateToEnglish(text: string): Promise<string> {
  const trimmed = text.trim();
  if (!trimmed) return "";

  const apiKey = process.env.DEEPL_API_KEY;
  if (!apiKey) {
    console.error("DEEPL_API_KEY is not set — skipping auto-translation.");
    return "";
  }

  try {
    const response = await fetch(DEEPL_API_URL, {
      method: "POST",
      headers: {
        Authorization: `DeepL-Auth-Key ${apiKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        text: trimmed,
        source_lang: "RU",
        target_lang: "EN",
      }),
    });

    if (!response.ok) {
      console.error(
        "DeepL translation failed:",
        response.status,
        await response.text()
      );
      return "";
    }

    const data = await response.json();
    return data.translations?.[0]?.text ?? "";
  } catch (err) {
    console.error("DeepL translation error:", err);
    return "";
  }
}
