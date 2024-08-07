import styles from "./LatestOrders.module.scss";

const LatestOrders = () => {
  const orders = [
    { id: "001", customer: "John Doe", date: "2024-07-01", amount: "$150.00", status: "Shipped" },
    { id: "002", customer: "Jane Smith", date: "2024-07-02", amount: "$200.00", status: "Processing" },
  ];

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Date Ordered</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td data-label="Order ID">{order.id}</td>
              <td data-label="Customer">{order.customer}</td>
              <td data-label="Date Ordered">{order.date}</td>
              <td data-label="Total Amount">{order.amount}</td>
              <td data-label="Status">{order.status}</td>
              <td data-label="Actions"><i className='bx bx-dots-horizontal'></i></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LatestOrders;
