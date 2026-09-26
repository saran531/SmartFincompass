import assetUrl from "../../Assets/images/contact-illustration.svg";

interface ContactIllustrationProps {
  className?: string;
}

export default function ContactIllustration({ className }: ContactIllustrationProps) {
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
