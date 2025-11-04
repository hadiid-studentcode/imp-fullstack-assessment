import Footer from "@/components/admin/footer";
import Navbar from "@/components/admin/navbar";
import Sidebar from "@/components/admin/sidebar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="main-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow p-6 bg-base-200">{children}</main>
        <Footer />
      </div>

      <Sidebar />
    </div>
  );
}
