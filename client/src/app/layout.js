export const metadata = {
  title: "Hivart",
  description: "Created by Ivan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
