"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
interface User {
  avatarUrl: string;
  name: string;
}
export function UserButton() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Giả sử bạn có một API để kiểm tra trạng thái đăng nhập
    const fetchUser = async () => {
      //   const response = await fetch("/api/check-auth"); // Thay đổi đường dẫn API theo yêu cầu của bạn
      //   if (response.ok) {
      //     const data = await response.json();
      //     setUser(data.user); // Giả sử API trả về thông tin người dùng
      //   }
      // Fake data with timeout
      setUser({
        avatarUrl: "https://github.com/shadcn.png",
        name: "John Doe",
      });
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
      <Button variant="outline" size="lg" className="text-primary">
        Đăng nhập
      </Button>
    </Link>
  );
}
