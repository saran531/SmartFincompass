import assetUrl from "../../Assets/images/leaf-decoration.svg";

interface LeafSprigProps {
  className?: string;
}

export default function LeafSprig({ className }: LeafSprigProps) {
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
