import "./FloatingCard.css";

const FloatingCard = ({ icon, title, value, className = "" }) => {
  return (
    <div className={`floating-card ${className}`}>
      <div className="floating-card__icon">{icon}</div>

      <div className="floating-card__content">
        <span className="floating-card__value">{value}</span>
        <span className="floating-card__title">{title}</span>
      </div>
    </div>
  );
};

export default FloatingCard;
