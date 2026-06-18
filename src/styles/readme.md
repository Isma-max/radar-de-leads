# Wemul · Design System

> **Wemul** es un **centro de creación para redes sociales y medios sociales** — menos agencia tradicional, más laboratorio de contenidos. Promesa central: *ayudar a marcas a crecer usando creatividad estratégica, innovación y experiencia digital.*

This repository is a brand-faithful, reusable design system for Wemul: tokens, foundations, reusable React components, and a website UI kit. It supports the corporate site, service landings, commercial decks, case studies, client proposals, LinkedIn posts, one-pagers and campaign micro-sites.

---

## Source materials

| Source | What it gave us |
|---|---|
| `uploads/wemul.png` → `assets/wemul-icon.png` | Pixel-art **huemul** (Chilean deer) isotype, coral red. **Low-res (274×287).** |
| `uploads/LOGO-Wemul-03-2.png` → `assets/wemul-logo-lockup.png` | Icon + **WEMUL** wordmark lockup. **Low-res (121×101).** |
| Brief: *"Somos Wemul 2026"* commercial deck | Palette, type, graphic traits, real copy, metrics, client roster, services, own networks. |

> ⚠️ **Caveat — logo resolution.** Both supplied logos are tiny PNGs. They are fine as on-screen seals at small sizes but will pixelate when scaled up. **Please send vector (SVG / AI / PDF) versions** of the icon and lockup so we can produce crisp large-format and print usage. The pixel-grid *look* is intentional and on-brand; the low *resolution* is not.

---

## 1 · Brand foundations

**Personality.** Creative · Digital · Strategic · Agile · Fluent in internet culture · Close but professional · Big-brand capable. A creation lab, not a legacy agency.

**Design principles**
1. **Big, direct, editorial.** Oversized Gabarito headlines with hard editorial cuts — `CREAMOS / AMPLIFICAMOS / ADMINISTRAMOS`.
2. **Flat color blocks + lots of air.** Large planes of coral, blue or navy against generous white. No timid tints.
3. **High contrast, high energy.** Coral red against electric blue against deep navy. Confident, commercial, never muddy.
4. **Modular & pixel-native.** The huemul is a pixel grid; that block logic shows up in graphics, badges and dividers.
5. **Data with attitude.** Metrics are headlines too — set big, in Gabarito.
6. **Simple but memorable components.** One idea per block; clarity over cleverness.

**Tono visual** — seguro, comercial, vivo. Energía de cultura digital chilena con experiencia probada en grandes marcas.

**Wemul debe sentirse:** energético, claro, confiable, performante, creativo-estratégico, con mucho aire y alto contraste.

**Wemul debe evitar:** look de template genérico · exceso de degradados · estética SaaS fría · stock evidente · demasiado corporativo · demasiado infantil · efectos innecesarios.

---

## 2 · Content fundamentals (voice & copy)

- **Language:** primary copy is **Spanish (Chile)**. Headlines are short, declarative, present-tense, first-person plural: *"Creamos contenidos para medios sociales."*
- **Person:** **"nosotros" for what Wemul does** (Creamos, Amplificamos, Administramos), **"te / tu marca" when addressing the client** ("Te ayudamos a crecer"). Confident, never boastful.
- **Casing:** big headlines often **UPPERCASE** for impact (`NUESTRA EXPERIENCIA`, `NUESTRO PORTAFOLIO`). Body in sentence case. Eyebrows/kickers UPPERCASE with wide tracking.
- **Rhythm:** triads and slashes — *"Creamos, amplificamos y administramos"*. Verbs lead.
- **Numbers:** big and plain — `+12M seguidores`, `+1000M vistas orgánicas`, `+95% reacciones positivas`. The `+` prefix signals "more than".
- **No emoji** in formal brand copy. No Lorem ipsum, no placeholder domains. Always use real Wemul content.
- **Anchor phrases** (use verbatim where relevant):
  - "Creamos contenidos para medios sociales"
  - "Te ayudamos a crecer utilizando creatividad estratégica"
  - "Combinamos innovación, estrategia y experiencia digital para transformar ideas en resultados"
  - "Creamos, amplificamos y administramos contenidos, ideas y plataformas"
  - "Somos un aliado estratégico capaz de aportar creatividad, innovación y experiencia"

---

## 3 · Visual foundations

**Color.** Six cores: coral `#FF403E` (energía creativa / primary), digital blue `#0081FE` (performance), navy `#012039` (strategy / depth), sky `#82C4FF` (support), white (air, premium standard), tech black `#0D0D0D`. Full 50–900 scales in `tokens/colors.css`.
- **When to use which:** Coral = the brand seal, CTAs, energy moments, one hero block. Blue = links, interactive accents, performance/data context, pills. Navy = serious/strategic sections, footers, text on light. White = the default canvas — keep it dominant. Use **one** dominant color block per section; never stack coral+blue+navy at equal weight on one screen.

**Typography.** `Gabarito` (geometric, rounded, expressive) for display & headlines; `Roboto` for bajadas, body and data; `Roboto Mono` for raw data/code. Display sizes are huge (up to 104px) with negative tracking and tight leading. See `tokens/typography.css`.

**Spacing & layout.** 8pt grid; section rhythm ~120px. 12-col desktop grid, 1240px max container. Controlled-asymmetric layouts: a big color block paired with off-axis white cards. Generous gutters.

**Backgrounds.** Solid flat color (coral / blue / navy) or clean white — **no busy textures, no photographic backgrounds behind text.** Approved gradients exist (`--grad-*`) but are reserved for large hero blocks only, never small UI. The pixel/block motif may appear as a quiet graphic accent (corner pixels, dividers), not as a loud pattern.

**Corner radii.** Friendly but not bubbly: cards `22px` (`--radius-lg`), buttons/pills fully rounded (`999px`), small chips `8–14px`. Consistent rounding is part of the rounded-geometric personality.

**Cards.** White surface, `22px` radius, soft **navy-tinted** shadow (`--shadow-md`, never pure black), hairline `--border-subtle` optional. Portfolio cards can be full-bleed image with rounded corners and a small coral/blue tag.

**Shadows.** Always cool, navy-tinted, low-opacity. Elevation rises on hover. Colored glows (`--shadow-coral`, `--shadow-blue`) only for primary CTAs.

**Borders.** Hairline `1px` neutral by default; `2px` coral or navy for emphasis. Pills often borderless filled.

**Hover.** Cards lift (`translateY(-4px)` + stronger shadow); buttons darken one step (coral→`--coral-600`, blue→`--blue-600`); links gain underline. **Press:** subtle scale-down (`0.97`) + darker step.

**Motion.** Simple, elegant, useful — content feels *alive* like social feeds without distraction. `--ease-out` for reveals, `--ease-snap` for playful overshoot on small elements. Blocks fade-and-rise in on scroll; metric numbers count up; cards lift on hover; section transitions cross-fade. Respect `prefers-reduced-motion`. No infinite decorative loops behind content.

**Imagery vibe.** Real campaign work, bold and saturated, social-native crops (vertical/9:16, square). Warm and energetic, never desaturated corporate stock. Logos of big clients shown as a clean monochrome grid.

---

## 4 · Iconography & graphic language

- **Icon style:** simple, **solid/duotone, digital**, rounded corners to match Gabarito. We use **Lucide** (`https://unpkg.com/lucide@latest`) as the working icon set via CDN — clean geometric line icons; switch to filled where emphasis is needed. **Substitution flag:** Wemul had no own icon font in the supplied assets, so Lucide is our chosen stand-in — swap for a bespoke set later if desired.
- **Pixel/block motif:** the huemul isotype is a pixel grid. Reuse that DNA for badges, list bullets (small squares), dividers, and "loading/processing" accents — modular blocks, not literal deer everywhere.
- **Seals / stamps:** `case`, `viral`, `performance`, `social-first` rendered as small rounded pill-badges (see Tag/Badge components).
- **Highlights:** coral underline swashes, blue pills around key concepts, arrow chips for CTAs.
- **Metrics:** big Gabarito number + small Roboto label + optional `+` prefix and trend arrow.
- **Emoji:** not used in brand UI. Unicode arrows (→) are acceptable inside chips/links.
- **No hand-drawn SVG illustration.** Keep graphics geometric and modular.

---

## 5 · Repository index / manifest

```
styles.css                  → global entry (consumers link this)
tokens/
  fonts.css                 → Gabarito + Roboto + Roboto Mono (Google Fonts)
  colors.css                → cores, 50–900 scales, semantic + state tokens, gradients
  typography.css            → families, weights, scale (desktop+mobile), ready classes
  spacing.css               → spacing, radius, shadow, layout, z-index, motion, breakpoints
assets/
  wemul-icon.png            → pixel huemul isotype (low-res)
  wemul-logo-lockup.png     → icon + WEMUL wordmark (low-res)
guidelines/                 → foundation specimen cards (Design System tab)
components/
  buttons/                  → Button, IconButton
  pills/                    → Pill, Badge, Tag
  cards/                    → Card, ServiceCard, CaseCard, MetricBlock
  forms/                    → Input, Textarea, Select, Checkbox
  feedback/                 → Accordion, Tabs
ui_kits/website/            → Wemul corporate site recreation (Home + sections)
SKILL.md                    → portable Agent-Skill wrapper
```

**Components:** Button · IconButton · Pill · Badge · Tag · Card · ServiceCard · CaseCard · MetricBlock · Input · Textarea · Select · Checkbox · Accordion · Tabs.

**UI kits:** `ui_kits/website` — single-page corporate site (Header, Hero, Manifesto, Services, Metrics, Experience/clients, Portfolio, Own Networks, CTA, Footer).

See `check_design_system` for the runtime namespace used to mount components from the bundle.
