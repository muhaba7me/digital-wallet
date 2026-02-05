import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/shared/button";


export default function Navbar() {
  return (
    <header className="w-full py-2 border">
      <div className="mx-auto flex w-full max-w-11/12 items-center justify-between py-2 px-4 rounded-full border">
        <Link href="/">
          <Image
            src="/image-1.png"
            alt="Gift Ethiopia"
            width={60}
            height={12}
          />
        </Link>

        <div className="flex items-center gap-2 md:gap-3">
          <div
            className="h-8 w-8 md:h-12 md:w-12 rounded-full sm:border-4 border-primary p-0 flex items-center justify-center hover:bg-primary/5 cursor-pointer transition-colors"
            aria-label="Help"
          >
            <Image
              src="/navigation/faq.png"
              alt="FAQ"
              width={20}
              height={20}
              className="md:w-6 md:h-6"
            />
          </div>
          <div
            className="h-8 w-8 md:h-12 md:w-12 rounded-full sm:border-4 flex items-center justify-center border-primary p-0 hover:bg-primary/5 cursor-pointer transition-colors"
            aria-label="Delivery"
          >
            <Image
              src="/navigation/delivery.png"
              alt="Delivery"
              width={20}
              height={20}
              className="md:w-6 md:h-6"
            />
          </div>
          <div
            className="flex sm:hidden h-8 w-8 md:h-12 md:w-12 rounded-full sm:border-4 items-center justify-center border-primary p-0 hover:bg-primary/5 cursor-pointer transition-colors"
            aria-label="Dollar"
          >
            <Image
              src="/navigation/dollar.png"
              alt="Dollar"
              width={20}
              height={20}
              className="md:w-6 md:h-6"
            />
          </div>
          <div
            className="flex sm:hidden h-8 w-8 md:h-12 md:w-12 rounded-full sm:border-4 items-center justify-center border-primary p-0 hover:bg-primary/5 cursor-pointer transition-colors"
            aria-label="Cart"
          >
            <Image
              src="/navigation/cart.png"
              alt="Cart"
              width={20}
              height={20}
              className="md:w-6 md:h-6"
            />
          </div>

          <Button className="hidden sm:flex h-12 md:h-14 rounded-full bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:from-primary hover:via-primary/80 hover:to-primary/70 px-4 md:px-6 items-center gap-2 shadow-lg">
            <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-card flex items-center justify-center shrink-0">
              <Image
                src="/navigation/cart.png"
                alt="Cart"
                width={20}
                height={20}
                className="md:w-6 md:h-6"
              />
            </div>
            <div className="hidden sm:flex flex-col items-start">
              <span className="text-sm md:text-base font-semibold text-primary-foreground leading-tight">
                View Cart
              </span>
              <span className="text-xs text-primary-foreground/80 leading-tight">
                Cart Detail
              </span>
            </div>
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground shrink-0" />
          </Button>
        </div>
      </div>
    </header>
  );
}
