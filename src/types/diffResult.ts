export type DiffResult =
  | {
      type: "numeric";
      value: number;
      formatted: string;
    }
  | {
      type: "text-change";
      from: string;
      to: string;
    }
  | {
      type: "same";
      value: string;
    };
