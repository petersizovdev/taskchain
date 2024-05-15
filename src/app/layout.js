import { AuthContextProvider } from "./context/AuthContext";
import "./globals.css";

export const metadata = {
  title: "TaskChain",
  description: "Blockchain freelance manager",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>{children} </AuthContextProvider>
      </body>
    </html>
  );
}
