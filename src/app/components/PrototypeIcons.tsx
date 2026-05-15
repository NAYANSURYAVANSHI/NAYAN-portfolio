import type { SVGProps } from "react";

export function CrosshairIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 8V3h5" />
      <path d="M16 3h5v5" />
      <path d="M21 16v5h-5" />
      <path d="M8 21H3v-5" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 5v3" />
      <path d="M12 16v3" />
      <path d="M5 12h3" />
      <path d="M16 12h3" />
    </svg>
  );
}

export function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  );
}

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...props}>
      <path d="M6 6 18 18" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...props}>
      <path d="M4 7h16" />
      <path d="M8 12h12" />
      <path d="M4 17h16" />
    </svg>
  );
}
