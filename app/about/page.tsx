import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/contact/ContactForm";
import { LotusWatermark } from "@/components/ui/LotusWatermark";
import { Phone, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "About & Contact",
  description:
    "Ysidra is a Nigerian strategy, design and book company. Learn about our story, our impact partnership with AOAMF, and get in touch.",
};

export default function AboutPage() {
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2348183650000";

  return (
    <>
      {/* WHO WE ARE */}
      <Section className="relative overflow-hidden pb-10 pt-14 md:pt-20">
        <LotusWatermark className="-right-24 -top-10 h-80 w-80" />
        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h1 className="font-display text-4xl font-extrabold leading-tight text-indigo sm:text-5xl">
                Who we are
              </h1>
              <p className="mt-5 text-lg font-semibold text-ink">
                Ysidra is a Nigerian strategy, design and book company.
              </p>
              <p className="mt-4 leading-relaxed text-ink/70">
                We combine experienced thinking, fresh perspective and execution
                capability to create work that moves organisations forward.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-parchment">
              <Image
                src="/images/products/toni-heritage.svg"
                alt="Ysidra team and craftsmanship"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* OUR STORY */}
      <Section tone="parchment">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-extrabold text-indigo">
              Our story
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink/70">
              Ysidra started with books — objects designed to be useful,
              memorable and worth keeping. That same thinking now runs through
              everything we do: strategy, design and production.
            </p>
          </div>
        </Container>
      </Section>

      {/* IMPACT */}
      <Section id="impact">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <p className="text-sm font-semibold uppercase tracking-widest text-saffron">
                Our impact
              </p>
              <h2 className="mt-2 font-display text-2xl font-extrabold text-indigo sm:text-3xl">
                One notebook. One child.
              </h2>
              <p className="mt-4 leading-relaxed text-ink/70">
                5% of every Ysidra notebook sale supports access to education for
                children with special educational needs, through the Agatha
                Obiageli Aghedo Memorial Foundation (AOAMF).
              </p>
              <p className="mt-4 font-display text-lg font-bold text-indigo">
                A notebook is a small object. What happens inside it isn&apos;t.
              </p>
            </div>
            <div className="relative order-1 aspect-[4/3] overflow-hidden rounded-card bg-parchment lg:order-2">
              <Image
                src="/images/products/zaba-coptic.svg"
                alt="AOAMF partnership — inclusive education impact"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* CONTACT */}
      <Section tone="parchment" id="contact">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-extrabold text-indigo">
                Let&apos;s talk about your project.
              </h2>
              <div className="mt-8 space-y-5">
                <a
                  href={`https://wa.me/${whatsapp}`}
                  className="flex items-center gap-4 rounded-card border border-parchment-200 bg-white p-5 transition-shadow hover:shadow-soft"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-50 text-indigo">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink/50">
                      WhatsApp
                    </p>
                    <p className="font-display font-bold text-indigo">
                      +234 818 365 0000
                    </p>
                  </div>
                </a>
                <a
                  href="mailto:orders@ysidra.com"
                  className="flex items-center gap-4 rounded-card border border-parchment-200 bg-white p-5 transition-shadow hover:shadow-soft"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-50 text-indigo">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink/50">
                      Email
                    </p>
                    <p className="font-display font-bold text-indigo">
                      orders@ysidra.com
                    </p>
                  </div>
                </a>
              </div>
              <p className="mt-6 text-sm text-ink/50">
                No 9, Sanusi Street, Shomolu, Lagos.
              </p>
            </div>

            <div className="rounded-card border border-parchment-200 bg-white p-6 md:p-8">
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
