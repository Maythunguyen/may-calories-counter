"use client";

export interface CalorieResult {
  food_items: string[];
  calories_per_item: number[];
  total_calories: number;
}

interface AIResultsProps {
  result: CalorieResult | null;
}

function formatCalories(value: number) {
  return Number.isFinite(value)
    ? Math.round(value).toLocaleString()
    : "—";
}

export default function AIResults({ result }: AIResultsProps) {
  if (!result) return null;

  return (
    <section
      aria-label="Meal analysis results"
      className="w-full min-w-0 bg-white text-[#191919]"
    >
      <header>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
          Your result
        </p>

        <div className="mt-4 flex flex-wrap items-baseline gap-3">
          <h2 className="text-5xl font-semibold leading-none tracking-[-0.055em] sm:text-6xl">
            {formatCalories(result.total_calories)}
          </h2>

          <span className="text-xl font-medium">kcal</span>
        </div>

        <p className="mt-3 text-sm text-neutral-500">
          Estimated calories in this meal
        </p>
      </header>

      <div className="mt-9">
        <div className="flex items-center justify-between gap-4 border-b-[3px] border-[#191919] pb-3">
          <h3 className="text-sm font-semibold">Food breakdown</h3>
          <span className="text-xs text-neutral-500">Estimated kcal</span>
        </div>

        <ul className="m-0 list-none divide-y divide-neutral-200 p-0">
          {result.food_items.map((food, index) => (
            <li
              key={`${food}-${index}`}
              className="flex items-start justify-between gap-6 py-4"
            >
              <span className="min-w-0 break-words text-sm leading-6">
                {food}
              </span>

              <span className="shrink-0 text-sm font-medium leading-6 tabular-nums">
                {formatCalories(result.calories_per_item[index])}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-2 flex items-center justify-between gap-4 rounded-md bg-[#f3f3f0] px-4 py-4">
          <span className="text-sm font-semibold">Meal total</span>

          <span className="text-sm font-semibold tabular-nums">
            {formatCalories(result.total_calories)} kcal
          </span>
        </div>
      </div>

      <p className="mt-5 text-xs leading-6 text-neutral-500">
        Photo estimates are approximate. Portion sizes, cooking oils, and
        hidden ingredients can affect the result.
      </p>
    </section>
  );
}