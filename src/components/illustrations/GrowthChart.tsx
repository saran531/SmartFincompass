import assetUrl from "../../Assets/images/growth-chart.svg";

interface GrowthChartProps {
  className?: string;
}

export default function GrowthChart({ className }: GrowthChartProps) {
  return (
    <img
      src={assetUrl}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={`pointer-events-none select-none ${className ?? ""}`}
    />
  );
}
