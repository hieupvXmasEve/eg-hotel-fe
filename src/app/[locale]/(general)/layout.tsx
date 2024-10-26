import Footer from "@/components/footer";
import Header from "@/features/auth/components/header";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container mx-auto flex flex-grow flex-col pt-5 md:pb-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
