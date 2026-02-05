
import { JapaneseYen } from "lucide-react";
import Image from "next/image";
import { TransferFormProvider } from "../transfer/form-provider";

export default function Hero() {
  return (
    <section className="mx-auto flex flex-col md:flex-row w-full max-w-11/12 gap-4 sm:gap-10 pb-16 pt-6 md:px-8 md:pt-20">
      <div className=" hidden w-full md:flex flex-col justify-between">
        <div className="space-y-8 w-full">
          <div className="items-center gap-3 border inline-flex px-4 py-2 rounded-full">
            <div className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold">
              <span>
                <JapaneseYen />
              </span>
              <span>1 USD = 165.00 ETB</span>
            </div>
            <div className="rounded-full bg-linear-to-r from-primary/80 to-primary px-3 py-2 text-sm font-semibold text-white">
              Gift: 50.00 ETB / 1 USD
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
              Send Money Home
              <br />
              Instantly
              <br />
              Without the Hassle
            </h1>
            <p className="max-w-lg text-base text-muted-foreground md:text-lg">
              Transfer money or choose meaningful gifts—all in one place,
              delivered with ease.
            </p>
          </div>

          <div>
            <div className="rounded-full border-2 inline-flex text-xl border-primary px-4 py-3 text-primary">
              Why Gift Ethiopia
            </div>
          </div>
        </div>
        <div className="pt-14 text-sm text-muted-foreground justify-self-end">
          <div className="inline-flex items-start gap-3">
            <div className="mt-1 h-10 w-1 rounded-full bg-emerald-600" />
            <div>
              <div className="font-medium text-foreground">
                Safe Payments,
                <br />
                Seamless Transfer.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center md:self-end-safe">
        <TransferFormProvider>
          <TransferMultiStepForm />
        </TransferFormProvider>
      </div>
      <div className="md:hidden w-full h-[140px] relative">
        <Image
          src="/banner-mobile.png"
          alt="Gift Ethiopia"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
}
