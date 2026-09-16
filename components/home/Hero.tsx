import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CapabilitiesStrip } from "./CapabilitiesStrip";
import { HeroComposition } from "./HeroComposition";

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-parchment">
      <Container className="py-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <HeroComposition />

          <div className="flex flex-col justify-center">
            <div className="flex items-start justify-between gap-6">
              <Image
                src="/images/logo-horizontal.png"
                alt="Ysidra — Strategy, Design, Books"
                width={220}
                height={56}
                className="h-11 w-auto sm:h-14"
              />
              <div className="hidden shrink-0 border-l-2 border-saffron pl-3 sm:block">
                <p className="font-display text-sm font-extrabold uppercase leading-tight tracking-wide text-indigo">
                  Ideas
                  <br />
                  Made
                  <br />
                  Real
                </p>
              </div>
            </div>

            <h1 className="mt-8 font-display text-3xl font-extrabold leading-[1.12] text-indigo sm:text-4xl lg:text-[2.75rem]">
              From strategy through design to books you keep —{" "}
              <span className="text-saffron">we make ideas real.</span>
            </h1>

            <div className="mt-8 border-t border-indigo/10 pt-8">
              <CapabilitiesStrip />
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button href="/books">View our work</Button>
              <Button href="/about#contact" variant="outline">
                Start a project
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-indigo/10 pt-5 text-xs font-semibold uppercase tracking-widest text-indigo/70">
              <p>Strategy &middot; Design &middot; Books</p>
              <p>Lagos &middot; Nigeria</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
