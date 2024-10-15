import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function SignInPage() {
  return (
    <Card className="mx-auto mt-6 w-full max-w-[350px]">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          Đã đăng ký?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="space-y-4">
            <Input type="email" placeholder="Địa chỉ email" />
            <Input type="password" placeholder="Mật khẩu" />
            <Link
              href="/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Quên mật khẩu?
            </Link>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button className="w-full bg-primary">Đăng nhập</Button>
        <Button variant="outline" className="w-full">
          Đăng ký
        </Button>
      </CardFooter>
    </Card>
  );
}
