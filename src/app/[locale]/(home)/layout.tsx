import Footer from "@/components/footer";
import Header from "@/components/header";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="z-10 flex-grow pb-16 md:pb-0">{children}</main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
