import { getUserInfo } from "../data/get-user-info";
import FormAccountUpdate from "./form-account-update";

export default async function UpdateAccount() {
  const { data, success } = await getUserInfo();
  if (!success) return <div>Error</div>;
  return <FormAccountUpdate user={data} />;
}
