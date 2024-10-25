import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/images/logo.png"
      alt="Logo"
      className={cn("h-full w-auto", className)}
      width={196}
      height={56}
      priority
    />
  );
}
