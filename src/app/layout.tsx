import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CR General Contracting LLC | Fredericksburg, VA General Contractor",
  description:
    "Licensed and insured general contractor serving Fredericksburg, VA and surrounding areas. Kitchen remodels, bathroom renovations, home additions, commercial build-outs, and more. Get a free quote today.",
  keywords: [
    "general contractor Fredericksburg VA",
    "home renovation Fredericksburg",
    "kitchen remodel Stafford VA",
    "bathroom renovation Spotsylvania",
    "commercial construction Virginia",
    "CR General Contracting",
  ],
  openGraph: {
    title: "CR General Contracting LLC",
    description: "Quality construction in Fredericksburg, VA. Licensed & Insured.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
