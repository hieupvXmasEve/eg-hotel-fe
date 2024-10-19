import { Locale } from "@/i18n/routing";

export default async function AboutPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const Content = (await import(`./${params.locale}.mdx`)).default;
  return <Content />;
}
