"use client";

import { useEffect, useState } from "react";
import { FileUpload } from "./ui/FileUpload";
import { caloCalculateApi } from "@/app/api/CaloCalculationApi";
import AIResults from "./AIResults";

interface FileUploadSectionProps {
  value: File[];
  onChange(files: File[]): void;
}

interface CalorieResult {
  food_items: string[];
  calories_per_item: number[];
  total_calories: number;
}

type AnalysisState =
  | { status: "idle" }
  | { status: "loading"; file: File }
  | { status: "success"; file: File; result: CalorieResult }
  | { status: "error"; file: File; message: string };

function parseResult(raw: unknown): CalorieResult {
  let data: unknown = raw;

  if (typeof raw === "string") {
    const cleaned = raw
      .trim()
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/, "");

    try {
      data = JSON.parse(cleaned);
    } catch {
      throw new Error(
        "We couldn't read the analysis. Please try again.",
      );
    }
  }

  if (!data || typeof data !== "object") {
    throw new Error("The analysis returned an invalid result.");
  }

  const result = data as Record<string, unknown>;

  const validCalories = (value: unknown): value is number =>
    typeof value === "number" &&
    Number.isFinite(value) &&
    value >= 0;

  if (
    !Array.isArray(result.food_items) ||
    !result.food_items.every(
      (item: unknown) =>
        typeof item === "string" && item.trim().length > 0,
    ) ||
    !Array.isArray(result.calories_per_item) ||
    !result.calories_per_item.every(validCalories) ||
    result.food_items.length !== result.calories_per_item.length ||
    !validCalories(result.total_calories)
  ) {
    throw new Error(
      "The analysis was incomplete. Please try another photo.",
    );
  }

  if (result.food_items.length === 0) {
    throw new Error(
      "No food was identified. Try a clearer photo of your meal.",
    );
  }

  return {
    food_items: result.food_items as string[],
    calories_per_item: result.calories_per_item as number[],
    total_calories: result.total_calories,
  };
}

export function FileUploadSection({
  value,
  onChange,
}: FileUploadSectionProps) {
  const file = value[0];

  const [analysis, setAnalysis] = useState<AnalysisState>({
    status: "idle",
  });
  const [retryCount, setRetryCount] = useState(0);

  function handleFileUpload(files: File[]) {
    onChange(files.slice(0, 1));
  }

  useEffect(() => {
    if (!file) {
      setAnalysis({ status: "idle" });
      return;
    }

    if (file.type && !file.type.startsWith("image/")) {
      setAnalysis({
        status: "error",
        file,
        message: "Please upload an image of your meal.",
      });
      return;
    }

    let cancelled = false;

    async function analyseMeal(selectedFile: File) {
      setAnalysis({ status: "loading", file: selectedFile });

      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const raw: unknown = await caloCalculateApi(formData);
        const result = parseResult(raw);

        if (!cancelled) {
          setAnalysis({
            status: "success",
            file: selectedFile,
            result,
          });
        }
      } catch (error: unknown) {
        if (!cancelled) {
          setAnalysis({
            status: "error",
            file: selectedFile,
            message:
              error instanceof Error
                ? error.message
                : "Something went wrong. Please try again.",
          });
        }
      }
    }

    void analyseMeal(file);

    return () => {
      cancelled = true;
    };
  }, [file, retryCount]);

  // Hide any result belonging to a previous selection immediately.
  const current: AnalysisState = !file
    ? { status: "idle" }
    : analysis.status !== "idle" && analysis.file === file
      ? analysis
      : { status: "loading", file };

  return (
    <section
      aria-label="Meal photo analysis"
      className="mx-auto my-8 w-full max-w-7xl px-4 sm:my-12 sm:px-6 lg:px-8"
    >
      <div className="rounded-2xl bg-[#ededeb] p-3 sm:p-5 lg:p-8">
        <div className="grid overflow-hidden rounded-lg lg:grid-cols-2">
          {/* Upload panel */}
          <div className="relative flex min-w-0 flex-col bg-[#f7773c] p-6 text-[#191919] sm:p-10 lg:p-12">
            <p className="m-0 text-xs font-medium uppercase tracking-[0.18em]">
              01 / Upload your meal
            </p>

            <h2 className="mb-0 mt-8 text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl">
              A photo.
              <br />
              A clearer picture.
            </h2>

            <p className="mb-0 mt-4 max-w-sm text-sm leading-7 text-black/70">
              Upload a photo of your meal to get an estimated
              calorie breakdown for the foods identified.
            </p>

            <div className="mt-8 min-w-0 overflow-hidden rounded-xl border border-black/15 bg-white text-[#191919] [color-scheme:light]">
              <FileUpload onChange={handleFileUpload} />
            </div>

            {file && (
              <div className="mt-4 flex min-w-0 items-center gap-3 rounded-lg border border-black/10 bg-white/15 px-4 py-3">
                <span
                  aria-hidden="true"
                  className="size-2 shrink-0 rounded-full bg-[#191919]"
                />

                <p
                  title={file.name}
                  className="m-0 min-w-0 truncate text-xs font-medium"
                >
                  {file.name}
                </p>
              </div>
            )}

            <p className="mb-0 mt-auto pt-8 text-xs leading-6 text-black/65">
              For a clearer estimate, keep the whole meal in
              frame and use good lighting.
            </p>

            <span
              aria-hidden="true"
              className="absolute -right-2 top-1/2 z-10 hidden size-4 -translate-y-1/2 rotate-45 bg-[#f7773c] lg:block"
            />
          </div>

          {/* Results panel */}
          <div
            aria-busy={current.status === "loading"}
            className="flex min-w-0 flex-col bg-white p-6 text-[#191919] sm:p-10 lg:p-12"
          >
            <p className="m-0 text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
              02 / Your breakdown
            </p>

            <div className="mt-8 flex flex-1 flex-col">
              {current.status === "idle" && (
                <div className="flex flex-1 flex-col justify-center py-10 sm:py-14">
                  <div
                    aria-hidden="true"
                    className="mb-7 grid size-14 place-items-center rounded-xl bg-[#f7773c]/10 text-[#d85820]"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-7"
                    >
                      <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3" />
                      <path d="M7 12h10M12 7v10" />
                    </svg>
                  </div>

                  <h3 className="m-0 text-2xl font-semibold tracking-tight sm:text-3xl">
                    Your results start here.
                  </h3>

                  <p className="mb-0 mt-4 max-w-sm text-sm leading-7 text-neutral-500">
                    Choose a meal photo to see the identified
                    foods, estimated calories per item, and
                    your meal total.
                  </p>

                  <div className="mt-8 border-t border-neutral-200 pt-5">
                    <p className="m-0 text-xs leading-6 text-neutral-500">
                      Analysis starts automatically after you
                      upload a photo.
                    </p>
                  </div>
                </div>
              )}

              {current.status === "loading" && (
                <div
                  role="status"
                  className="flex flex-1 flex-col justify-center py-10 sm:py-14"
                >
                  <span
                    aria-hidden="true"
                    className="mb-7 size-10 rounded-full border-[3px] border-neutral-200 border-t-[#f7773c] motion-safe:animate-spin"
                  />

                  <h3 className="m-0 text-2xl font-semibold tracking-tight sm:text-3xl">
                    Taking a closer look.
                  </h3>

                  <p className="mb-0 mt-4 max-w-sm text-sm leading-7 text-neutral-500">
                    Identifying the foods in your photo and
                    estimating their calories.
                  </p>

                  <div
                    aria-hidden="true"
                    className="mt-8 space-y-4 motion-safe:animate-pulse"
                  >
                    <div className="h-3 w-3/4 rounded bg-neutral-100" />
                    <div className="h-3 w-full rounded bg-neutral-100" />
                    <div className="h-3 w-1/2 rounded bg-neutral-100" />
                  </div>
                </div>
              )}

              {current.status === "error" && (
                <div className="flex flex-1 flex-col justify-center py-10 sm:py-14">
                  <div
                    role="alert"
                    className="rounded-xl border border-orange-200 bg-orange-50 p-5"
                  >
                    <h3 className="m-0 text-lg font-semibold">
                      We couldn’t analyse this photo.
                    </h3>

                    <p className="mb-0 mt-3 break-words text-sm leading-6 text-neutral-600">
                      {current.message}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setRetryCount((count) => count + 1)}
                    className="mt-6 inline-flex min-h-12 items-center justify-center self-start rounded-md bg-[#191919] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#333333] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f7773c]"
                  >
                    Try again
                  </button>

                  <p className="mb-0 mt-4 text-xs leading-6 text-neutral-500">
                    You can also choose a different photo.
                  </p>
                </div>
              )}

              {current.status === "success" && (
                <>
                  <p role="status" className="sr-only">
                    Analysis complete. Your meal breakdown is ready.
                  </p>

                  <AIResults result={current.result} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}