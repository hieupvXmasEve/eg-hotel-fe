import UpdateAccount from "@/features/my-account/components/update-account";
import UpdatePassword from "@/features/my-account/components/update-password";
import { getUserInfoServer } from "@/features/my-account/data/get-user-info";

export default async function AccountPage() {
  const { data, success } = await getUserInfoServer();
  if (!success) return <div>Error</div>;
  return (
    <div className="">
      <UpdateAccount user={data} />
      <UpdatePassword />
    </div>
  );
}
