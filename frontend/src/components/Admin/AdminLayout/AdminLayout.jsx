import { Outlet } from "react-router-dom";

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

import "./AdminLayout.css";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <aside className="admin-layout__sidebar">
        <Sidebar />
      </aside>

      <section className="admin-layout__main">
        <Header />

        <main className="admin-layout__content">
          <Outlet />
        </main>
      </section>
    </div>
  );
};

export default AdminLayout;
