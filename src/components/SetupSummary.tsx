type SetupSummaryProps = {
  setupName: string;
  trackName: string;
};

export default function SetupSummary({
  setupName,
  trackName,
}: SetupSummaryProps) {
  return (
    <div className="flex flex-col">
      <div className="text-heading font-semibold text-lg">{setupName}</div>

      <div className="text-muted text-sm">{trackName}</div>
    </div>
  );
}
