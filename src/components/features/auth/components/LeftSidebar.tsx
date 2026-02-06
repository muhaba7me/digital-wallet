import Image from "next/image";
import SidebarContent from "./SidebarContent";
import GradientOverlay from "./GradientOverlay";

export default function LeftSidebar() {
  return (
    <aside className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 relative rounded-2xl overflow-hidden">
      <GradientOverlay position="top" />
      <GradientOverlay position="bottom" />
      <SidebarContent />
    </aside>
  );
}