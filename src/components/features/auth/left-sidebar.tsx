  import Image from "next/image";

export default function LeftSidebar() {
  return (
    <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 relative rounded-2xl overflow-hidden">
      {/* Top gradient */}
      <div className="absolute top-0 left-0 right-0 h-1/8 bg-gradient-to-b from-primary/20 to-transparent"></div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1/8 bg-gradient-to-t from-primary/20 to-transparent"></div>

      {/* Content */}
      <div className="max-w-3/4 flex-col items-center justify-center flex relative z-10 ">
        <div className="text-center space-y-6">
          <Image
            src="/Logo.png"
            alt="Logo"
            width={312}
            height={310}
            quality={100}
          />
        </div>
        <div>
          <p className="text-center">
            Explore and purchase a variety of special gifts through STAR Gifts,
            with easy and secure payment options.
          </p>
        </div>
      </div>
    </div>
  );
}
