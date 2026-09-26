import assetUrl from "../../Assets/images/rupee-coin.svg";

interface RupeeCoinsProps {
  className?: string;
}

export default function RupeeCoins({ className }: RupeeCoinsProps) {
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
