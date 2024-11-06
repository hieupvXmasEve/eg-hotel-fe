import FormAccountUpdateSkeleton from "@/features/my-account/components/form-account-update-skeleton";
import UpdateAccount from "@/features/my-account/components/update-account";
import UpdatePassword from "@/features/my-account/components/update-password";
import { Suspense } from "react";

export default async function AccountPage() {
  return (
    <div className="mb-20 md:mb-0">
      <Suspense fallback={<FormAccountUpdateSkeleton />}>
        <UpdateAccount />
      </Suspense>
      <UpdatePassword />
    </div>
  );
}
