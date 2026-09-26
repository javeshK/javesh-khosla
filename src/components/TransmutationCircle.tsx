type CircleProps = {
  className?: string;
  size?: number;
};

export function TransmutationCircle({ className, size = 64 }: CircleProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="0.7" />
      <circle cx="50" cy="50" r="22" stroke="currentColor" strokeWidth="0.7" />
      <polygon points="50,16 80,67 20,67" stroke="currentColor" strokeWidth="0.9" />
      <polygon points="50,84 80,33 20,33" stroke="currentColor" strokeWidth="0.9" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = ((i * 30 - 90) * Math.PI) / 180;
        const x1 = 50 + Math.cos(a) * 42;
        const y1 = 50 + Math.sin(a) * 42;
        const x2 = 50 + Math.cos(a) * 46;
        const y2 = 50 + Math.sin(a) * 46;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1" />;
      })}
    </svg>
  );
}
