import assetUrl from "../../Assets/images/rocket.svg";

interface RocketProps {
  className?: string;
}

export default function RocketIllustration({ className }: RocketProps) {
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
