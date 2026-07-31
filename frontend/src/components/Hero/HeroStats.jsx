import "./HeroStats.css";

const stats = [
  {
    value: "50K+",
    label: "Customers",
  },
  {
    value: "4.9",
    label: "Rating",
  },
  {
    value: "500+",
    label: "Restaurants",
  },
];
const HeroStats = () => {
  return (
    <div className="hero-stats">
      {stats.map((item) => (
        <div className="hero-stats__item" key={item.label}>
          <h3>{item.value}</h3>

          <p>{item.label}</p>
        </div>
      ))}
    </div>
  );
};

export default HeroStats;
