import Footer from "@/components/footer";
import Header from "@/components/header";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container mx-auto flex-grow px-2 pb-16 pt-48 md:px-5 md:pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
