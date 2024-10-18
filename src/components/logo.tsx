import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/images/logo.png"
      alt="Logo"
      className="rounded-lg object-cover"
      fill
      sizes="100px"
    />
  );
}
