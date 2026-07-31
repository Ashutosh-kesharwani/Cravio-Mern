const OrderItems = ({ items }) => {
  return (
    <section className="admin-order-items">
      <div className="section-header">
        <h3>Order Items</h3>

        <span className="items-count">
          {items.length} {items.length === 1 ? "Item" : "Items"}
        </span>
      </div>

      <div className="admin-order-items-list">
        {items.map((item) => (
          <article key={item.food?._id} className="admin-order-item">
            <div className="item-image-wrapper">
              <img
                src={item.food?.image?.url}
                alt={item.food?.name}
                className="admin-order-item-image"
              />
            </div>

            <div className="admin-order-item-details">
              <h4>{item.food?.name}</h4>

              <div className="item-meta">
                <span className="item-price">${item.price.toFixed(2)}</span>

                <span className="price-divider">•</span>

                <span className="item-each">each</span>
              </div>
            </div>

            <div className="admin-order-item-summary">
              <span className="quantity-chip">× {item.quantity}</span>

              <strong>${(item.price * item.quantity).toFixed(2)}</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default OrderItems;
