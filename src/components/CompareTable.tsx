import type { SetupCategory } from "../types/seutp";
import compareValues from "../utils/compareSetups";

type CompareTableProps = {
  aCat: SetupCategory;
  bCat: SetupCategory;
  showAll: boolean;
};

export default function CopmareTable({
  aCat,
  bCat,
  showAll,
}: CompareTableProps) {
  const items = aCat.items.map((aItem, i) => {
    const bItem = bCat.items[i];

    const aValue = aItem.values[0];
    const bValue = bItem.values[0];

    const diff = compareValues(aValue, bValue);

    return {
      aItem,
      bItem,
      aValue,
      bValue,
      diff,
    };
  });

  const visibleItems = items.filter(
    ({ diff }) => showAll || diff.type !== "same",
  );

  const changedCount = items.filter(({ diff }) => diff.type !== "same").length;

  return (
    <div className="surface border border-theme rounded-lg overflow-hidden shadow-sm">
      {/* Header */}
      <div className="surface-2 px-4 py-3 border-b border-theme flex items-center justify-between">
        <h2 className="text-heading text-lg font-semibold">{aCat.name}</h2>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-md
      ${
        changedCount === 0
          ? "text-muted bg-white/5"
          : "text-blue-300 bg-blue-500/10"
      }`}
        >
          {changedCount} change{changedCount === 1 ? "" : "s"}
        </span>
      </div>

      {/* Table */}
      {visibleItems.length > 0 && (
        <table className="w-full border-collapse">
          <thead className="surface-2">
            <tr className="text-left text-muted text-sm">
              <th className="p-3 font-medium text-left">Item</th>
              <th className="p-3 font-medium text-right">A</th>
              <th className="p-3 font-medium text-right">B</th>
              <th className="p-3 font-medium text-right">Diff</th>
            </tr>
          </thead>

          <tbody>
            {visibleItems.map(({ aItem, aValue, bValue, diff }, i) => (
              <tr
                key={i}
                className="border-t border-theme hover:bg-[rgba(255,255,255,0.03)] transition-colors"
              >
                <td className="p-3 text-heading text-left font-medium">
                  {aItem.name}
                </td>

                <td className="p-3 text-muted font-mono text-right">
                  {aValue}
                </td>

                <td className="p-3 text-muted font-mono text-right">
                  {bValue}
                </td>

                <td className="p-3 text-right font-mono">
                  {diff.type === "numeric" && (
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold
              ${
                diff.value === 0
                  ? "text-muted"
                  : diff.value > 0
                    ? "text-green-400 bg-green-500/10"
                    : "text-red-400 bg-red-500/10"
              }`}
                    >
                      {diff.value !== 0 ? diff.formatted : "—"}
                    </span>
                  )}

                  {diff.type === "text-change" && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold text-amber-300 bg-amber-500/10">
                      {diff.from} → {diff.to}
                    </span>
                  )}

                  {diff.type === "same" && (
                    <span className="text-muted text-xs">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
