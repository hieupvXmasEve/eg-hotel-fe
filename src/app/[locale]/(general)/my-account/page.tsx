import UpdateAccount from "@/features/my-account/components/update-account";
import UpdatePassword from "@/features/my-account/components/update-password";
import { getAccountDetail } from "@/features/my-account/data/get-user-info";

export default async function AccountPage() {
  const { data } = await getAccountDetail();
  console.log("data", data);
  if (!data) return <div>Error</div>;
  return (
    <div className="">
      <UpdateAccount user={data} />
      <UpdatePassword />
    </div>
  );
}
