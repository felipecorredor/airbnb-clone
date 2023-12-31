import "./globals.css";

import type { Metadata } from "next";
import { getCurrentUser } from "./actions/getCurrentUser";
import { Nunito } from "next/font/google";

import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";

import RegisterModal from "./components/modals/RegisterModal/RegisterModal";
import LoginModal from "./components/modals/LoginModal/LoginModal";
import RentModal from "./components/modals/RentModal/RentModal";
import SearchModal from "./components/modals/SearchModal/SearchModal";

import ToasterProvider from "./providers/ToasterProvider";

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <RentModal />
          <LoginModal />
          <SearchModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
