const NAV_LOGO_SIZE_PX = 32;

type Props = {
  className?: string;
};

export default function GalleryLogoIcon({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={NAV_LOGO_SIZE_PX}
      height={NAV_LOGO_SIZE_PX}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {/* Photo frame */}
      <rect x="3" y="3" width="18" height="18" rx="2" />
      {/* Sun */}
      <circle cx="8.5" cy="8.5" r="1.75" fill="currentColor" stroke="none" />
      {/* Hills */}
      <path d="M3 17l5.5-5.5L14 17" />
      <path d="M14 17l3-3 4 3" />
    </svg>
  );
}
