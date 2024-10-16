import Image from "next/image";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between bg-[#7C3AED] p-4">
        <Button className="size-8 rounded-full p-0" variant="outline">
          <Cross1Icon className="h-4 w-4" />
        </Button>
        <div className="flex flex-grow justify-center">
          <Image
            src="/gotels-logo.svg"
            alt="Gotels logo"
            width={140}
            height={40}
          />
        </div>
        <div className="w-6"></div>
      </header>
      <main className="h-screen">{children}</main>
    </div>
  );
};

export default AuthLayout;
