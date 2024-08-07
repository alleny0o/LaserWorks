import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import styles from "./AdminLayout.module.scss";

const AdminLayout = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(window.innerWidth > 900);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 900);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const largeScreen = window.innerWidth > 900;
      setIsLargeScreen(largeScreen);
      setIsSidebarExpanded(largeScreen);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (!isLargeScreen) {
      setIsSidebarExpanded(false);
    }
  };

  return (
    <div className={`${styles.container} ${isSidebarExpanded ? styles.sidebarExpanded : ''}`}>
      <aside className={`${styles.sidebar} ${isSidebarExpanded ? styles.expanded : ''}`}>
        <AdminSidebar onNavigate={handleNavigation} />
      </aside>
      <main className={styles.content}>
        <div className={styles.main__container}>
          <div className={styles.main__flexbox}>
            <i
              className={`bx bx-menu-alt-left ${styles.i}`}
              onClick={toggleSidebar}
            ></i>
          </div>
          <Outlet className={styles.outlet} />
          <div className="footer"></div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;