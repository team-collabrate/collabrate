import { useId, type SVGProps } from "react";

// lucide-react 1.x dropped brand logos, so the two we use live here. They are drawn on the same
// 24px outline grid (2px round stroke, currentColor) as the lucide icons next to them.
type IconProps = SVGProps<SVGSVGElement>;

const base: IconProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export function Linkedin(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function Instagram(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

// The X logo is a filled shape, so it does not use the outline defaults above.
export function XLogo(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// Footer-only, brand-coloured versions, like the logos on each platform: LinkedIn is the blue tile with the white "in",
// Instagram is the outline glyph in its gradient. Both keep a 24px grid so they size like the lucide icons.
export function LinkedinBrand(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" aria-hidden {...props}>
      <rect x="2" y="2" width="20" height="20" rx="3.5" fill="#0A66C2" />
      <rect x="5.6" y="9.6" width="2.9" height="8.6" fill="#fff" />
      <circle cx="7.05" cy="6.9" r="1.7" fill="#fff" />
      <path
        fill="#fff"
        d="M10.5 9.6h2.8v1.2c.5-.8 1.5-1.4 2.9-1.4 2.7 0 3.3 1.7 3.3 4.1v4.7h-2.9v-4.2c0-1.1 0-2.3-1.4-2.3-1.5 0-1.8 1.1-1.8 2.3v4.2h-2.9z"
      />
    </svg>
  );
}

export function InstagramBrand(props: IconProps) {
  const id = useId();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={`url(#${id})`}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="3" y1="21" x2="21" y2="3">
          <stop offset="0" stopColor="#FEDA75" />
          <stop offset="0.25" stopColor="#FA7E1E" />
          <stop offset="0.5" stopColor="#D62976" />
          <stop offset="0.75" stopColor="#962FBF" />
          <stop offset="1" stopColor="#4F5BD5" />
        </linearGradient>
      </defs>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

// The X logo is a filled shape, so it does not use the outline defaults above.
export function XLogoBold(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth={0.8} strokeLinejoin="round" aria-hidden {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
