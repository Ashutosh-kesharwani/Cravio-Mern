import { burger, cake, noodles, pizza, sushi } from "../assets/assets.js";

export const heroFoods = [
  {
    id: 1,
    title: "Italian Pizza",
    subtitle:
      "Stone-baked pizza loaded with mozzarella, pepperoni, fresh basil & premium cheese.",
    image: pizza,
    rating: 4.9,
    delivery: "20 min",
    price: 299,
    discount: "30% OFF",
    category: "Pizza",
    accentColor: "#FF6B35",
  },

  {
    id: 2,
    title: "Classic Burger",
    subtitle:
      "Juicy grilled beef patty layered with cheddar cheese, lettuce, tomatoes & signature sauce.",
    image: burger,
    rating: 4.8,
    delivery: "18 min",
    price: 249,
    discount: "20% OFF",
    category: "Burger",
    accentColor: "#F59E0B",
  },

  {
    id: 3,
    title: "Strawberry Cheesecake",
    subtitle:
      "Creamy New York cheesecake topped with fresh strawberries and rich berry glaze.",
    image: cake,
    rating: 5.0,
    delivery: "15 min",
    price: 199,
    discount: "15% OFF",
    category: "Dessert",
    accentColor: "#EC4899",
  },

  {
    id: 4,
    title: "Creamy Garlic Noodles",
    subtitle:
      "Handcrafted noodles tossed with garlic butter, herbs, parmesan and fresh vegetables.",
    image: noodles,
    rating: 4.9,
    delivery: "22 min",
    price: 279,
    discount: "25% OFF",
    category: "Noodles",
    accentColor: "#F97316",
  },

  {
    id: 5,
    title: "Premium Sushi",
    subtitle:
      "Authentic Japanese sushi platter crafted with fresh salmon, tuna and premium ingredients.",
    image: sushi,
    rating: 4.9,
    delivery: "25 min",
    price: 399,
    discount: "10% OFF",
    category: "Sushi",
    accentColor: "#14B8A6",
  },
];
