import Footer from "@/components/footer";
import Header from "@/components/header";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow px-5 pb-16 pt-40 md:pb-0">{children}</main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
