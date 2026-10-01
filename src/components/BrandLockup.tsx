import logoImg from "../Assets/images/logo.png";
import textImg from "../Assets/images/text.png";

export default function BrandLockup({
  orientation = "horizontal",
}: {
  orientation?: "horizontal" | "vertical";
}) {
  if (orientation === "vertical") {
    return (
      <span className="flex flex-col items-center gap-3.5">
        <img
          src={logoImg}
          alt="SmartFin Compass logo"
          className="h-14 w-14 object-contain sm:h-16 sm:w-16"
        />
        <img
          src={textImg}
          alt="SmartFin Compass"
          className="h-8 w-auto max-w-full object-contain sm:h-10"
        />
      </span>
    );
  }

  return (
    <span className="flex items-center gap-2.5 sm:gap-3">
      <img
        src={logoImg}
        alt="SmartFin Compass logo"
        className="h-12 w-12 shrink-0 object-contain transition-transform duration-300 group-hover:scale-105 sm:h-[60px] sm:w-[60px]"
      />
      <img
        src={textImg}
        alt="SmartFin Compass"
        className="h-auto w-[112px] shrink-0 object-contain sm:w-[140px]"
      />
    </span>
  );
}
