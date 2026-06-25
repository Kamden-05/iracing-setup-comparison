import type { DiffResult } from "../types/diffResult";

export default function compareValues(a: string, b: string): DiffResult {
  if (a === b) {
    return {
      type: "same",
      value: a,
    };
  }

  const aNum = parseFloat(a);
  const bNum = parseFloat(b);

  const aIsNum = !Number.isNaN(aNum);
  const bIsNum = !Number.isNaN(bNum);

  if (aIsNum && bIsNum) {
    const diff = Number((bNum - aNum).toFixed(3));

    return {
      type: "numeric",
      value: diff,
      formatted: diff > 0 ? `+${diff}` : `${diff}`,
    };
  }

  return {
    type: "text-change",
    from: a,
    to: b,
  };
}
