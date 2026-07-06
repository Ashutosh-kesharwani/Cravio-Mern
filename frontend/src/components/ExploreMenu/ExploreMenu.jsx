import { menu_list } from "../../assets/frontend_assets/assets";
import "./ExploreMenu.css";
const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our menu</h1>
      <p className="explore-menu-text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo sunt itaque
        aut odio nobis. Iste placeat quaerat temporibus inventore nesciunt.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item) => (
          <div
            key={item.menu_name}
            /* We have create func which states that on clicking menu category we check if curr category , we click if whi prev this to show all category i.e All save in category states , else change with curr category and we are getting these props from home page so value set , get saved there */
            onClick={() =>
              setCategory((prev) =>
                prev === item.menu_name ? "All" : item.menu_name
              )
            }
            className="explore-menu-list-item"
          >
            {/* Add Style on Images of menu 
            > If curr menu is active then add border else not
            */}
            <img
              className={category === item.menu_name ? "active" : ""}
              src={item.menu_image}
              alt={item.menu_name}
            />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
