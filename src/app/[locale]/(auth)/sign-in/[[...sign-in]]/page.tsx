import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SignInForm } from "@/features/auth/components/SignInForm";
import { getTranslations } from "next-intl/server";

export default async function SignInPage() {
  const t = await getTranslations("sign-in");
  return (
    <Card className="mx-auto mt-6 w-full max-w-[350px]">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          {t("title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
    </Card>
  );
}
