import assetUrl from "../../Assets/images/faq-illustration.svg";

interface FaqIllustrationProps {
  className?: string;
}

export default function FaqIllustration({ className }: FaqIllustrationProps) {
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
