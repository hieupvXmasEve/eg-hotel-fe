"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
interface User {
  avatarUrl: string;
  name: string;
}
export default function UserButton() {
  const [user, setUser] = useState<User | null>(null);
  const t = useTranslations("auth");
  useEffect(() => {
    // Giả sử bạn có một API để kiểm tra trạng thái đăng nhập
    const fetchUser = async () => {
      //   const response = await fetch("/api/check-auth"); // Thay đổi đường dẫn API theo yêu cầu của bạn
      //   if (response.ok) {
      //     const data = await response.json();
      //     setUser(data.user); // Giả sử API trả về thông tin người dùng
      //   }
      // Fake data with timeout
      // setUser({
      //   avatarUrl: "https://github.com/shadcn.png",
      //   name: "John Doe",
      // });
      setUser(null);
    };

    fetchUser();
  }, []);

  if (user) {
    return (
      <div className="flex items-center">
        <Avatar>
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback>{user.name?.[0]}</AvatarFallback>
        </Avatar>
      </div>
    );
  }

  return (
    <Link href="/sign-in">
      <Button
        variant="outline"
        size="default"
        className="capitalize text-primary hover:text-primary/80"
      >
        {t("user-btn")}
      </Button>
    </Link>
  );
}
