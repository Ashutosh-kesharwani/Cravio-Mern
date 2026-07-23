import { menu_list } from "../../assets/assets.js";
import "./ExploreMenu.css";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <section className="explore-menu section app" id="explore-menu">
      <div className="explore-menu__header">
        <span className="section-badge">Explore</span>

        <h2 className="section-title">Explore Our Menu</h2>

        <p className="section-description">
          Discover freshly prepared dishes crafted with premium ingredients.
          From authentic pizzas to delicious desserts, there's something for
          everyone.
        </p>
      </div>

      <div className="explore-menu__categories">
        {menu_list.map((item) => (
          <button
            key={item.menu_name}
            className={`explore-menu__item ${
              category === item.menu_name ? "explore-menu__item--active" : ""
            }`}
            onClick={() =>
              setCategory((prev) =>
                prev === item.menu_name ? "All" : item.menu_name
              )
            }
          >
            <div className="explore-menu__image-wrapper">
              <img
                src={item.menu_image}
                alt={item.menu_name}
                className="explore-menu__image"
              />
            </div>

            <span>{item.menu_name}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default ExploreMenu;
