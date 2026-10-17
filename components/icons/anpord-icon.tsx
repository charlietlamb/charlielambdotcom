const MARK =
  "M16 3.5 27.26 10v13L16 29.5 4.74 23V10Z M9.8 16a6.2 6.2 0 1 0 12.4 0a6.2 6.2 0 1 0-12.4 0Z M4.74 14.4H10v3.2H4.74Z M22 14.4h5.26v3.2H22Z";

export function AnpordIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      fill="currentColor"
      fillRule="evenodd"
      {...props}
    >
      <path d={MARK} />
    </svg>
  );
}
