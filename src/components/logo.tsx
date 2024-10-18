import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/images/logo.png"
      alt="Logo"
      className={cn("size-full", className)}
      width={100}
      height={200}
      priority
    />
  );
}
