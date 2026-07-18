interface YearFilterProps {
  year?: string;
  onChange: (year?: string) => void;
}

export function YearFilter({ year, onChange }: YearFilterProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => String(currentYear - i));

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => onChange(undefined)}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
          !year
            ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
            : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
      >
        全期間
      </button>
      {years.map((y) => (
        <button
          key={y}
          onClick={() => onChange(y)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            year === y
              ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
              : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          {y}
        </button>
      ))}
    </div>
  );
}
