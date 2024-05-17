import { AuthContextProvider } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";
import "./globals.css";

export const metadata = {
  title: "TaskChain",
  description: "Blockchain freelance manager",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body>
        <AuthContextProvider>
          <ChatContextProvider>{children}</ChatContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
