import { useEffect } from "react";

import useCart from "../../hooks/cart/useCart";

import { CartItem, CartSummary, EmptyCart } from "../../components/Cart";

import "./Cart.css";

const Cart = () => {
  const { cart, loading, fetchCart } = useCart();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  if (loading.fetchCart) {
    return (
      <section className="cart page">
        <div className="cart__container app">
          <div className="cart__loading">Loading your cart...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="cart page">
      <div className="cart__container app">
        {/* ================= Header ================= */}

        <header className="cart__header">
          <div className="cart__header-content">
            <h1 className="cart__title">My Cart</h1>

            <p className="cart__subtitle">
              Review your selected dishes, update quantities and proceed to
              checkout whenever you're ready.
            </p>
          </div>

          {!loading.fetchCart && (
            <div className="cart__count">
              {cart.items.length} {cart.items.length === 1 ? "Item" : "Items"}
            </div>
          )}
        </header>

        {/* ================= Content ================= */}

        <main
          className={`cart__content ${
            cart.items.length === 0 ? "cart__content--empty" : ""
          }`}
        >
          {loading.fetchCart ? (
            <div className="cart__loading">Loading your cart...</div>
          ) : cart.items.length === 0 ? (
            <EmptyCart />
          ) : (
            <>
              <div className="cart__items">
                {cart.items.map((item) => (
                  <CartItem key={item.food._id} item={item} />
                ))}
              </div>

              <aside className="cart__summary">
                <CartSummary />
              </aside>
            </>
          )}
        </main>
      </div>
    </section>
  );
};

export default Cart;
