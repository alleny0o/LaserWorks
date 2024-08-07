import React, { useState } from 'react';
import styles from './AdminSidebar.module.scss';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = ({ onNavigate }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const isDropdownLinkActive = (paths) => paths.some(path => location.pathname === path);

  const toggleDropdown = (option) => {
    setOpenDropdown(openDropdown === option ? null : option);
  };

  return (
    <div className={styles.sidebar}>
      
      <h1 className={styles.title}>#S&R-DASHMIN</h1>
      <nav className={styles.navigation}>
        <Link
          className={`${styles.navLink} ${isActive("/admin") ? styles.active : ""}`}
          to="/admin"
          onClick={() => {onNavigate("/admin"); setOpenDropdown(null);}}
        >
          <div className={`${isActive("/admin") ? styles.border : ""}`}></div>
          <i className={`bx bx-cloud-upload ${styles.i}`}></i> Dashboard
        </Link>
        <div className={`${styles.dropdownWrapper} ${openDropdown === 'products' ? styles.open : ''} `}>
          <span 
            className={`${styles.navItem} ${isDropdownLinkActive(['/admin/all-products', '/admin/create-product']) ? styles.active : ''}`}
            onClick={() => toggleDropdown('products')}
          >
            <div className={`${isDropdownLinkActive(['/admin/all-products', '/admin/create-product']) ? styles.border : ''}`}></div>
            <i className={`bx bx-laptop ${styles.i}`}></i> Products
            <i className={`bx bx-chevron-${openDropdown === 'products' ? 'right' : 'down'} ${styles.arrow}`}></i>
          </span>
          <div className={styles.dropdownContent}>
            <Link 
              to="/admin/all-products" 
              className={isActive("/admin/all-products") ? styles.dropdownItemActive : styles.dropdownItem}
              onClick={() => {onNavigate("/admin/all-products");}}
            >
              All Products
            </Link>
            <Link 
              to="/admin/create-product" 
              className={isActive("/admin/create-product") ? styles.dropdownItemActive : styles.dropdownItem}
              onClick={() => {onNavigate("/admin/create-product"); setOpenDropdown(null);}}
            >
              Create Product
            </Link>
          </div>
        </div>
        <Link
          className={`${styles.navLink} ${isActive("/admin/categories") ? styles.active : ""}`}
          to="/admin/categories"
          onClick={() => {onNavigate("/admin/categories"); setOpenDropdown(null);}}
        >
          <div className={`${isActive("/admin/categories") ? styles.border : ""}`}></div>
          <i className={`bx bx-grid-alt ${styles.i}`}></i> Categories
        </Link>
      </nav>
    </div>
  );
};

export default AdminSidebar;