import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Card art for the services bento. Every image is one of Collabrate's own
 * illustrations (public/services) and every mark is a tool logo from
 * public/logos. Nothing here comes from another site.
 */

interface Chip {
  logo: string;
  label: string;
  /** Tailwind position classes inside the visual box. */
  pos: string;
  rotate?: number;
  size?: "sm" | "lg";
}

interface VisualSpec {
  image: string;
  /** Extra classes for placing the illustration on narrow / wide cards. */
  narrowImg: string;
  wideImg: string;
  chips: { narrow: Chip[]; wide: Chip[] };
}

const chip = (logo: string, label: string, pos: string, rotate = 0, size: "sm" | "lg" = "sm"): Chip => ({
  logo,
  label,
  pos,
  rotate,
  size,
});

const SPECS: Record<string, VisualSpec> = {
  "Website Development": {
    image: "/services/web-development.jpg",
    narrowImg: "left-1/2 top-2 w-[340px] -translate-x-1/2",
    wideImg: "-right-2 top-3 w-[440px]",
    chips: {
      narrow: [],
      wide: [
        chip("react.svg", "React", "left-[5%] bottom-[7%]", -8, "lg"),
        chip("webflow.svg", "Webflow", "left-[17%] bottom-[10%]", 6, "lg"),
        chip("wordpress.svg", "WordPress", "left-[29%] bottom-[6%]", -4),
        chip("shopify.svg", "Shopify", "left-[38%] bottom-[11%]", 5),
      ],
    },
  },
  "Mobile Application Development": {
    image: "/services/mobile-app.jpg",
    narrowImg: "left-1/2 top-0 w-[360px] -translate-x-1/2",
    wideImg: "-right-2 top-3 w-[440px]",
    chips: {
      narrow: [
        chip("flutter.svg", "Flutter", "left-[6%] top-[32px]", -8),
        chip("swift.svg", "Swift", "right-[6%] top-[52px]", 8),
        chip("kotlin.svg", "Kotlin", "left-[10%] bottom-[16px]", 5),
      ],
      wide: [],
    },
  },
  SEO: {
    image: "/services/seo.jpg",
    narrowImg: "left-1/2 top-0 w-[350px] -translate-x-1/2",
    wideImg: "-right-2 top-3 w-[440px]",
    chips: {
      narrow: [
        chip("semrush.svg", "Semrush", "left-[5%] top-[28px]", -8),
        chip("ahrefs.svg", "Ahrefs", "right-[5%] top-[60px]", 7),
        chip("google-search-console.svg", "Google Search Console", "left-[9%] bottom-[14px]", 4),
      ],
      wide: [],
    },
  },
  "Performance Marketing (Paid Ads)": {
    image: "/services/paid-ads.jpg",
    narrowImg: "left-1/2 top-0 w-[350px] -translate-x-1/2",
    wideImg: "-right-2 top-3 w-[440px]",
    chips: {
      narrow: [],
      wide: [
        chip("google-ads.svg", "Google Ads", "left-[5%] bottom-[7%]", -8, "lg"),
        chip("meta-ads-manager.svg", "Meta Ads Manager", "left-[17%] bottom-[10%]", 6, "lg"),
        chip("linkedin-ads.svg", "LinkedIn Ads", "left-[29%] bottom-[6%]", -4),
        chip("google-analytics.svg", "Google Analytics", "left-[38%] bottom-[11%]", 5),
      ],
    },
  },
  "AI Chatbots": {
    image: "/services/ai-chatbots.jpg",
    narrowImg: "left-1/2 top-0 w-[350px] -translate-x-1/2",
    wideImg: "-right-2 top-3 w-[440px]",
    chips: {
      narrow: [
        chip("openai.svg", "OpenAI", "left-[5%] top-[30px]", -8),
        chip("botpress.svg", "Botpress", "right-[5%] top-[46px]", 8),
        chip("intercom.svg", "Intercom", "right-[9%] bottom-[14px]", -4),
      ],
      wide: [],
    },
  },
  "Workflow Automation": {
    image: "/services/marketing-automation.jpg",
    narrowImg: "left-1/2 top-0 w-[350px] -translate-x-1/2",
    wideImg: "-right-2 top-3 w-[440px]",
    chips: {
      narrow: [
        chip("zapier.svg", "Zapier", "left-[5%] top-[30px]", -8),
        chip("make.svg", "Make", "right-[5%] top-[44px]", 8),
        chip("n8n.svg", "n8n", "left-[9%] bottom-[14px]", 4),
      ],
      wide: [],
    },
  },
  "AI Voice Assistants": {
    image: "/services/ai-agents.jpg",
    narrowImg: "left-1/2 top-0 w-[350px] -translate-x-1/2",
    wideImg: "-right-2 top-3 w-[440px]",
    chips: {
      narrow: [
        chip("elevenlabs.svg", "ElevenLabs", "left-[5%] top-[30px]", -8),
        chip("twilio.svg", "Twilio", "right-[5%] top-[46px]", 8),
        chip("openai.svg", "OpenAI", "right-[10%] bottom-[14px]", -4),
      ],
      wide: [],
    },
  },
};

export function ServiceVisual({ name, wide, chipsOnly }: { name: string; wide?: boolean; chipsOnly?: boolean }) {
  const spec = SPECS[name];
  if (!spec) return null;
  const chips = wide ? spec.chips.wide : spec.chips.narrow;

  return (
    <div className="absolute inset-0" aria-hidden>
      {!chipsOnly && (
        <>
      {/* Soft glow behind the illustration */}
      <div
        className={cn(
          "absolute rounded-full bg-sky-300/20 blur-3xl",
          wide ? "right-6 top-8 size-[380px]" : "left-1/2 top-4 size-[260px] -translate-x-1/2"
        )}
      />
      {/* The illustrations have a white backdrop: multiply drops it on tinted cards. */}
      <Image
        src={spec.image}
        alt=""
        width={1254}
        height={1254}
        sizes="(min-width: 1024px) 440px, 360px"
        className={cn(
          "absolute h-auto max-w-none mix-blend-multiply dark:rounded-[28px] dark:mix-blend-normal dark:opacity-95",
          wide ? spec.wideImg : spec.narrowImg
        )}
      />
        </>
      )}
      {chips.map((c) => (
        <div
          key={c.label}
          title={c.label}
          className={cn(
            "absolute flex items-center justify-center rounded-2xl border border-black/[0.06] bg-white shadow-[0_10px_24px_-8px_rgba(26,20,51,0.3)] dark:border-white/10",
            c.size === "lg" ? "size-16 rounded-[20px]" : "size-12",
            c.pos
          )}
          style={{ transform: `rotate(${c.rotate ?? 0}deg)` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async"
            src={`/logos/${c.logo}`}
            alt={c.label}
            className={cn("object-contain", c.size === "lg" ? "size-9" : "size-6")}
          />
        </div>
      ))}
    </div>
  );
}
