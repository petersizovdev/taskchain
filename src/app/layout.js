import "./globals.scss";

export const metadata = {
  title: "TaskChain",
  description: "Blockchain freelance manager",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
