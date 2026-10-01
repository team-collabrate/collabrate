import { content } from "@/lib/content";
import { Reveal } from "@/components/shared/reveal";

interface AboutIntro {
  type: string;
  headline?: string;
  body?: string;
}

const aboutIntro = (content.pages as { about?: { sections: AboutIntro[] } }).about?.sections.find(
  (s) => s.type === "aboutIntro"
);

// Tool logos (not client logos: we don't display client marks we can't back up).
const STRIP_LOGOS = [
  ["figma.svg", "Figma"],
  ["react.svg", "React"],
  ["node-js.svg", "Node.js"],
  ["flutter.svg", "Flutter"],
  ["shopify.svg", "Shopify"],
  ["wordpress.svg", "WordPress"],
  ["webflow.svg", "Webflow"],
  ["framer.svg", "Framer"],
  ["stripe.svg", "Stripe"],
  ["hubspot.svg", "HubSpot"],
  ["google-ads.svg", "Google Ads"],
  ["zapier.svg", "Zapier"],
  ["n8n.svg", "n8n"],
  ["openai.svg", "OpenAI"],
] as const;

export function Belief() {
  if (!aboutIntro?.body) return null;

  return (
    <section className="mx-auto w-full max-w-[1344px] px-4 section-pad">
      <Reveal className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
        <p className="display-2 text-balance !text-[clamp(1.5rem,1rem+1.6vw,2.25rem)] !leading-[1.3]">
          {aboutIntro.body}
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-14 flex justify-center">
        <div className="flex max-w-[1000px] flex-wrap items-center justify-center gap-x-10 gap-y-5 rounded-[16px] border border-black/10 bg-background px-8 py-5 shadow-soft">
          {STRIP_LOGOS.map(([file, label]) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={file}
              src={`/logos/${file}`}
              alt={label}
              title={label}
              // brightness-0 flattens every logo to one silhouette so they all read at the same intensity.
              className="h-7 w-auto max-w-[110px] object-contain opacity-45 brightness-0 transition duration-200 hover:opacity-100 hover:brightness-100"
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
