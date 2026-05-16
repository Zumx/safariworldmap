import "./globals.css";

export const metadata = {
  title: "Safari World Map — Every nature reserve on Earth",
  description:
    "An interactive world map of every nature reserve from OpenStreetMap. Discover protected wild places and safari country, anywhere on the planet.",
  openGraph: {
    title: "Safari World Map",
    description: "Every nature reserve on Earth, on one interactive map.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
