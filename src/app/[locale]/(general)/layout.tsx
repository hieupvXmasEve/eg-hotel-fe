import Footer from "@/components/footer";
import Header from "@/features/auth/components/header";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container mx-auto flex-grow md:py-16">{children}</main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
