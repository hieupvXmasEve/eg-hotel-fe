export const dynamic = "force-dynamic";

import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("not-found");

  return (
    <>
      <h1>{t("title")}</h1>
    </>
  );
}
