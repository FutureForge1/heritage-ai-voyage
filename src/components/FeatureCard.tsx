
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  to: string;
  color: string;
}

const FeatureCard = ({ title, description, icon, to, color }: FeatureCardProps) => {
  return (
    <Link to={to}>
      <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-heritage-gold/30">
        <div 
          className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4`}
          style={{ backgroundColor: color }}
        >
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-1 chinese-title">{title}</h3>
        <p className="text-sm text-heritage-text/70">{description}</p>
      </div>
    </Link>
  );
};

export default FeatureCard;
