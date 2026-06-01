const SEARCH_ICON_SIZE_PX = 20;

type Props = {
  className?: string;
};

export default function SearchMagnifierIcon({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={SEARCH_ICON_SIZE_PX}
      height={SEARCH_ICON_SIZE_PX}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}
