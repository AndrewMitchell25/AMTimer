import AuthProvider from "../Contexts/AuthContext";
import "../styles/globals.css";
import Navbar from "./Navbar";
import NewNavbar from "./NewNavbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body className="bg-neutral-900 font-poppins overflow-auto">
        <AuthProvider>
          <NewNavbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
