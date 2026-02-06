import Image from "next/image";

/**
 * Contains the logo and sidebar text
 */
export default function SidebarContent() {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center max-w-3/4 text-center space-y-6">
      <Logo />
      <Description />
    </div>
  );
}

function Logo() {
  return <Image src="/Logo.png" alt="Logo" width={312} height={310} quality={100} />;
}

function Description() {
  return (
    <p>
      Explore and purchase a variety of special gifts through STAR Gifts, with easy and secure
      payment options.
    </p>
  );
}
