import Header from "./components/header";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow pb-16 md:pb-0">{children}</main>
    </div>
  );
};

export default AuthLayout;
