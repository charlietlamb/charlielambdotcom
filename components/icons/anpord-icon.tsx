const MARK = "M-9-44H9L19-34L9-28L13-23L8-18H-8L-13-23L-9-28L-19-34Z";
const ROTATIONS = [0, 60, 120, 180, 240, 300];

export function AnpordIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="-48 -48 96 96"
      aria-hidden="true"
      fill="currentColor"
      {...props}
    >
      {ROTATIONS.map((angle) => (
        <path key={angle} d={MARK} transform={`rotate(${angle})`} />
      ))}
    </svg>
  );
}
