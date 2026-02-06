import { ReactNode } from "react";

export type ActionCardColor = "green" | "lime" | "yellow" | "pink" | "cyan";

interface ActionCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  color: ActionCardColor;
  href?: string;
  onClick?: () => void;
}

/**
 * Returns the background class for a card based on its color
 */
const getBgClass = (color: ActionCardColor) => {
  const map: Record<ActionCardColor, string> = {
    green: "bg-green-100",
    lime: "bg-lime-100",
    yellow: "bg-yellow-50",
    pink: "bg-pink-100",
    cyan: "bg-cyan-50",
  };
  return map[color];
};

/**
 * Inner content of the card (icon + title + description)
 */
const CardContent: React.FC<{
  icon: ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center gap-2">
    {icon}
    <h3 className="font-bold text-lg sm:text-xl text-gray-900">{title}</h3>
    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{description}</p>
  </div>
);

/**
 * Action card component
 */
export const ActionCard: React.FC<ActionCardProps> = ({
  title,
  description,
  icon,
  color,
  href,
  onClick,
}) => {
  const baseClasses =
    "border-3 border-white rounded-[1.5rem] p-6 sm:p-8 md:p-10 transition-all cursor-pointer hover:shadow-xl hover:scale-[1.02] duration-200 min-h-[180px] sm:min-h-[200px] md:min-h-[220px] flex flex-col items-center justify-center";

  const handleClick = (e: React.MouseEvent) => {
    if (!href && onClick) {
      e.preventDefault();
      onClick();
    }
  };

  if (href) {
    return (
      <a href={href} className={`${getBgClass(color)} ${baseClasses}`}>
        <CardContent icon={icon} title={title} description={description} />
      </a>
    );
  }

  return (
    <div onClick={handleClick} className={`${getBgClass(color)} ${baseClasses}`}>
      <CardContent icon={icon} title={title} description={description} />
    </div>
  );
};
