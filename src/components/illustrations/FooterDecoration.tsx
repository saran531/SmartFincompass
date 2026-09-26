import assetUrl from "../../Assets/images/footer-decoration.svg";

interface FooterDecorationProps {
  className?: string;
}

export default function FooterDecoration({ className }: FooterDecorationProps) {
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
