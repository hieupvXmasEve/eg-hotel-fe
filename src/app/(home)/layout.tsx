import Footer from "@/components/Footer";
import Header from "@/components/Header";

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow pb-16 md:pb-0">{children}</main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
