import Image from "next/image";
import { JapaneseYen } from "lucide-react";
import { TransferFormProvider } from "../form-context";

import React from "react";
import TransferWizard from "./transfer-wizard";

interface BadgeProps {
  rate: string;
  gift: string;
}

interface HeroTextProps {
  titleLines: string[];
  subtitle: string;
  feature: {
    label: string;
    description: string;
  };
}

interface ContainerProps {
  children: React.ReactNode;
}

interface TrustProps {
  description: string;
}

/*  Components */

/* Exchange Rate + Gift Badge */
const ExchangeBadge: React.FC<BadgeProps> = ({ rate, gift }) => (
  <div className="inline-flex items-center gap-3 border rounded-full px-4 py-2">
    <div className="flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-full">
      <JapaneseYen />
      <span>{rate}</span>
    </div>
    <div className="rounded-full px-3 py-2 text-sm font-semibold text-white bg-linear-to-r from-primary/80 to-primary">
      Gift: {gift}
    </div>
  </div>
);

/* Hero Text + Feature Badge */
const HeroText: React.FC<HeroTextProps> = ({ titleLines, subtitle, feature }) => (
  <div className="w-full space-y-8">
    <ExchangeBadge rate="1 USD = 165.00 ETB" gift="50.00 ETB / 1 USD" />

    <div className="space-y-4">
      <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
        {titleLines.map((line, i) => (
          <React.Fragment key={i}>
            {line}
            {i < titleLines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </h1>
      <p className="max-w-lg text-base text-muted-foreground md:text-lg">
        {subtitle}
      </p>
    </div>

    <div>
      <div className="inline-flex px-4 py-3 text-xl font-semibold border-2 rounded-full border-primary text-primary">
        {feature.label}
      </div>
    </div>
  </div>
);

/* Trust Indicator (vertical bar + description) */
const TrustBadge: React.FC<TrustProps> = ({ description }) => (
  <div className="pt-14 text-sm text-muted-foreground justify-self-end">
    <div className="inline-flex items-start gap-3">
      <span className="mt-1 w-1 h-10 rounded-full bg-emerald-600" />
      <div>
        <div className="font-medium text-foreground">{description}</div>
      </div>
    </div>
  </div>
);

/* Container for  Form  Wrapper*/
const FormWrapper: React.FC<ContainerProps> = ({ children }) => (
  <div className="flex w-full justify-center md:self-end-safe">{children}</div>
);

export { FormWrapper };


/* Mobile Banner Image */
const MobileBanner: React.FC = () => (
  <div className="w-full h-35 relative md:hidden">
    <Image
      src="/banner-mobile.png"
      alt="Gift Ethiopia Mobile Banner"
      fill
      className="object-cover"
    />
  </div>
);

/*  Hero Section*/
export default function Hero() {
  const heroData = {
    titleLines: ["Send Money Home", "Instantly", "Without the Hassle"],
    subtitle:
      "Transfer money or choose meaningful gifts—all in one place, delivered with ease.",
    feature: {
      label: "Why Gift Ethiopia",
      description: "Safe Payments,\nSeamless Transfer."
    }
  };

  return (
    <section className="mx-auto flex w-full max-w-11/12 flex-col gap-4 pb-16 pt-6 sm:gap-10 md:flex-row md:px-8 md:pt-20">
      {/* Desktop Hero + Trust */}
      <div className="hidden w-full flex-col justify-between md:flex">
        <HeroText {...heroData} />
        <TrustBadge description={heroData.feature.description} />
      </div>

      {/* Transfer Form */}
      <FormWrapper>
        <TransferFormProvider>
          <TransferWizard />
        </TransferFormProvider>
      </FormWrapper>

      {/* Mobile Banner */}
      <MobileBanner />
    </section>
  );
}
