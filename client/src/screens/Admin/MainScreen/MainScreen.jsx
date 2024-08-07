import React from "react";
import styles from "./MainScreen.module.scss";
import RevenueChart from "../../Graphs/RevenueChart";
import LatestOrders from "../../../components/LatestOrders";

const MainScreen = () => {

  return (
    <div className={styles.dashboard}>
      <div className={styles.container}>
        <h1 className={styles.title}>Dashboard</h1>
        <div className={styles.statsGrid}>
          <StatsCard
            icon="bx-money-withdraw"
            title="Total Profit"
            value="$200"
            className={styles.salesCard}
          />
          <StatsCard
            icon="bx-cart"
            title="Total Orders"
            value="10"
            className={styles.ordersCard}
          />
          <StatsCard
            icon="bxs-shopping-bags"
            title="Total Products"
            value="8"
            className={styles.productsCard}
          />
          <div className={`${styles.salesStats} ${styles.statsCard}`}>
            <p className={styles.margin}>Revenue 2024 (in $'s)</p>
            <RevenueChart />
          </div>
          <div className={`${styles.conversionRate} ${styles.statsCard}`}>
            <p>Conversion Rate</p>
            <p>3.5%</p>
          </div>
          <div className={`${styles.latestOrders} ${styles.statsCard}`}>
            <h1 className={styles.margins}>Latest Orders</h1>
            <LatestOrders />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatsCard = ({ icon, title, value, className }) => (
  <div className={`${styles.statsCard} ${className}`}>
    <i className={`bx ${icon} ${styles.icon}`}></i>
    <div className={styles.content}>
      <p className={styles.cardTitle}>{title}</p>
      <p className={styles.cardValue}>{value}</p>
    </div>
  </div>
);

export default MainScreen;