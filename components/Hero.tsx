"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowUpRight, ScanLine } from "lucide-react";
import AIResults from "./AIResults";

const exampleResult = {
  food_items: ["Grilled chicken", "Cooked rice", "Mixed vegetables"],
  calories_per_item: [248, 205, 65],
  total_calories: 518,
};

export function HeroSectionOne() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.from("[data-hero-content]", {
          y: 24,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          clearProps: "transform",
        });
      }, rootRef);

      return () => context.revert();
    });

    return () => media.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      aria-labelledby="hero-title"
      className="bg-white px-4 pb-12 pt-10 text-[#191919] sm:px-6 lg:px-8 lg:pt-16"
    >
      <div className="mx-auto max-w-7xl rounded-2xl bg-[#ededeb] p-3 sm:p-5 lg:p-8">
        <div className="grid overflow-hidden rounded-lg lg:grid-cols-2">
          <div className="relative flex flex-col bg-[#f7773c] p-6 sm:p-10 lg:p-12">
            <div
              data-hero-content
              className="flex items-center justify-between gap-4"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em]">
                AI calorie counter
              </p>

              <ScanLine aria-hidden="true" className="size-6" />
            </div>

            <div className="py-12 sm:py-16">
              <h1
                id="hero-title"
                data-hero-content
                className="
                  max-w-lg text-4xl font-semibold
                  leading-[1.05] tracking-[-0.055em]
                  sm:text-5xl xl:text-6xl
                "
              >
                Your meal.
                <br />
                A clearer
                <br />
                breakdown.
              </h1>

              <p
                data-hero-content
                className="mt-6 max-w-sm text-sm leading-7 text-black/75 sm:text-base"
              >
                Take a photo of your food. Get an estimated calorie total
                and see how each item contributes.
              </p>
            </div>

            <div data-hero-content className="mt-auto">
              <Link
                href="/features"
                className="
                  inline-flex min-h-12 w-full items-center
                  justify-between gap-6 rounded-md
                  bg-[#191919] px-6 py-4
                  text-sm font-medium text-white
                  transition-colors hover:bg-[#333333]
                  focus-visible:outline focus-visible:outline-2
                  focus-visible:outline-offset-4
                  focus-visible:outline-black sm:w-auto
                "
              >
                Analyse your meal
                <ArrowUpRight aria-hidden="true" className="size-5" />
              </Link>

              <p className="mt-4 text-xs leading-6 text-black/70">
                One photo. An estimated breakdown. A useful starting point.
              </p>
            </div>

            <span
              aria-hidden="true"
              className="
                absolute -right-3 top-1/2 z-10 hidden
                size-6 -translate-y-1/2 rotate-45
                bg-[#f7773c] lg:block
              "
            />
          </div>

          <div className="flex min-w-0 flex-col bg-white p-6 sm:p-10 lg:p-12">
            <div
              data-hero-content
              className="mb-8 flex items-center justify-between gap-4"
            >
              <p className="text-sm font-medium">A look at your results</p>

              <span className="rounded-full bg-[#f0f0ed] px-3 py-1.5 text-xs text-neutral-600">
                Example only
              </span>
            </div>

            <div data-hero-content className="my-auto">
              <AIResults result={exampleResult} />
            </div>

            <p
              data-hero-content
              className="mt-8 border-t border-neutral-200 pt-5 text-xs leading-6 text-neutral-500"
            >
              Example values shown for illustration. Your results depend on
              the meal photo you upload.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}