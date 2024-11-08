import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("not-found");
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <h2 className="text-xl font-semibold">{t("title")}</h2>
    </main>
  );
}
