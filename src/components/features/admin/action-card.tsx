import { ReactNode } from "react";

interface ActionCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  color: "green" | "lime" | "yellow" | "pink" | "cyan";
  href?: string;
  onClick?: () => void;
}

const colorClasses = {
  green: "bg-green-100 ",
  lime: "bg-lime-100 ",
  yellow: "bg-yellow-50 ",
  pink: "bg-pink-100 ",
  cyan: "bg-cyan-50 ",
};

export function ActionCard({
  title,
  description,
  icon,
  color,
  href,
  onClick,
}: ActionCardProps) {
  const Component = href ? "a" : "div";

  const handleClick = (e: React.MouseEvent) => {
    if (!href && onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <Component
      href={href}
      onClick={handleClick}
      className={`${colorClasses[color]} border-3 border-white rounded-[1.5rem] p-6 sm:p-8 md:p-10 transition-all cursor-pointer hover:shadow-xl hover:scale-[1.02] duration-200 min-h-[180px] sm:min-h-[200px] md:min-h-[220px] flex flex-col items-center justify-center`}
    >
      <div className="flex flex-col items-center text-center gap-2">
        {icon}
        <h3 className="font-bold text-lg sm:text-xl text-gray-900">{title}</h3>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </Component>
  );
}
