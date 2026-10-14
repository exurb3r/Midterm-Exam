# Career Nexus

> **Your professional community** — a professional social network, rebuilt from scratch as a **frontend-only UI concept**.

Career Nexus is a mobile-responsive professional network experience: a home feed with reactions and comments, a people network, a job board, messaging, notifications, member/company content, and account settings — all rendered with sample data and no backend. Every interactive surface works in the browser: likes, comments, reposts, saving posts and jobs, following, joining groups, attending events, subscribing to newsletters, and switching between light and dark themes.

**This is a design/engineering concept.** No real accounts exist and no data is collected or sent anywhere — everything lives in your browser's `localStorage`.

---

## ✨ Highlights

- **Interactive feed** — react, comment inline, repost, save posts, follow authors, and compose new posts (text or image) via the composer, the mobile Post tab, or the profile page.
- **Real navigation** — 16 routes wired together: navbar, mobile bottom bar, left-rail quick links, account menus, and footers all point at actual pages (no dead `#` links on the main flows).
- **Persistent state** — liked/saved posts, saved jobs, and applications survive reloads via persisted Zustand stores.
- **Light & dark mode** — a full second palette, toggled from the account menu or Settings → Display, and remembered.
- **Search** — the navbar search shows grouped People/Jobs suggestions as you type, with keyboard Escape support.
- **Responsive to the bone** — desktop gets the classic three-column feed (232 / 560 / 312 px); phones get a bottom navigation bar, a compact sticky profile header, and single-column layouts everywhere.
- **Feedback everywhere** — toasts for every action and friendly empty-state cards (`StateCard`) on every list.

## 🗺 Pages

| Route | Description |
| --- | --- |
| `/` | Landing page; redirects to `/feed` when a session is active |
| `/feed` | Home feed — composer, sort bar, post cards, left profile rail, news + "add to feed" rail |
| `/post/[id]` | Single post view with comments open; unknown IDs show a friendly not-found state |
| `/network` | People you may know, invitations, and connections |
| `/jobs` | Job picks with search, workplace-type filters, list + detail split view, Easy Apply |
| `/messaging` | Conversations inbox with a preview dock |
| `/notifications` | Notification feed grouped by recency |
| `/profile` | Your profile — cover, stats, about, activity, experience, education, skills, analytics teaser |
| `/analytics` | Post impressions, audience tabs, hover bar chart, top posts table |
| `/my-items` | Saved posts and saved jobs (removes sync back to `/jobs`) |
| `/settings` | Display (real dark-mode switch), security, notification, and visibility toggles |
| `/groups` | Group directory with category filters and join/leave |
| `/events` | Upcoming/past events with Online/In-person filters and attend toggles |
| `/newsletters` | Newsletter catalog with subscribe toggles |
| `/help` | Help Center — searchable FAQ accordion with category chips |
| `/sign-in` | Sign-in screen: zod validation, persisted zustand session, redirects to `/feed` when already signed in |
| `/sign-up` | Sign-up screen: name/email/password with zod validation, creates an account in the persisted auth store |

## 🧱 Tech stack

| Tool | Role |
| --- | --- |
| [Next.js](https://nextjs.org) `16.3.6` | App Router, Turbopack dev + build |
| [React](https://react.dev) `19` | UI runtime (with React Compiler enabled) |
| [MUI](https://mui.com) `9.4` + `@mui/material-nextjs` (v16-appRouter) | Component library, SSR-safe Emotion cache |
| [Zustand](https://zustand.docs.pmnd.rs) `5` | Client state, persisted to `localStorage` |
| [Tailwind CSS](https://tailwindcss.com) `4` | Minimal utility classes in the root layout |
| TypeScript `5` | Strict typing across the app |
| Geist (via `next/font`) | Typography |

## 🚀 Getting started

```bash
# 1. Install dependencies
npm install        # (pnpm / yarn / bun also work)

# 2. Start the dev server — http://localhost:3000
npm run dev

# 3. Production build & serve
npm run build
npm run start

# 4. Checks
npm run lint       # eslint
npx tsc --noEmit   # typecheck
```

Node.js 20+ is recommended. The app builds fully static except `/post/[id]`, which is rendered on demand.

## 📁 Project structure

```
src/
├── app/
│   ├── layout.tsx            # Root layout: fonts, AppRouterCacheProvider, Providers
│   ├── providers.tsx         # ThemeProvider + FeedbackProvider + store rehydration
│   ├── page.tsx              # "/" Landing page (redirects to /feed if signed in)
│   ├── (dashboard)/          # Pages sharing the navbar + bottom-nav shell
│   │   ├── feed/  network/  jobs/  messaging/  notifications/
│   │   ├── profile/  analytics/  my-items/  settings/
│   │   ├── groups/  events/  newsletters/  help/
│   │   └── post/[id]/
│   └── (auth)/               # Standalone auth layout: sign-in + sign-up
├── components/
│   ├── <Folder>/<File>.tsx   # PascalCase folder + file per component
│   ├── Navbar/               # Top nav, account menus, For Business menu, search
│   ├── BottomNav/            # Mobile navigation + Post dialog
│   ├── feed/                 # PostCard, PostComposer, ProfileCard, NewsCard, …
│   ├── Buttons/              # FIlledButton, OutLinedButton (pill buttons)
│   ├── feedback/             # FeedbackProvider (toasts), StateCard (empty states)
│   └── PageContainer/        # Responsive max-width page wrapper
├── config/
│   ├── config.ts             # APP_NAME, APP_TAGLINE
│   ├── theme/                # colors (light+dark) and typography scales
│   └── mock/                 # All sample data (*.mock.ts)
└── store/
    └── <domain>/store.useX.ts  # Zustand hooks, one file per domain
```

## 🧠 State management & persistence

State lives in small Zustand stores under `src/store/`, each persisted with `zustand/middleware`'s `persist` middleware and `skipHydration: true` — stores are rehydrated manually in [`providers.tsx`](src/app/providers.tsx) after mount, which keeps server-rendered markup deterministic and avoids hydration mismatches.

| Store | localStorage key | Contents |
| --- | --- | --- |
| [`store/feed/store.useFeed.ts`](src/store/feed/store.useFeed.ts) | `career-nexus-feed` | Posts, likes, comments, reposts, saves, follows, drafts |
| [`store/jobs/store.useJobs.ts`](src/store/jobs/store.useJobs.ts) | `career-nexus-jobs` | `savedJobIds`, `appliedJobIds` |

Saved posts and jobs are therefore shared across pages: saving a job on `/jobs` updates `/my-items`, and saving a post from the feed's ••• menu populates My Items. Group/event/newsletter toggles are currently page-local state.

All sample data lives in `src/config/mock/*.mock.ts` (`feed`, `network`, `jobs`, `messaging`, `notifications`, `profile`, `analytics`, `groups`, `events`, `newsletters`, `help`) — swap those files out and the entire app follows.

## 🎨 Design system

- **Palette** — a forest-green primary on a warm canvas (`#F4F2EE`), defined in [`config.theme.colors.tsx`](src/config/theme/config.theme.colors.tsx) with complete **light and dark** themes, skeleton keyframes, and surface/border tokens (`surfaceHover`, `surfaceMuted`, `surfaceSubtle`, `border`, `borderStrong`).
- **Typography** — custom variants (`display`, `h1`–`h3`, `body`, `bodySmall`, `label`, `caption`) in [`config.theme.typography.tsx`](src/config/theme/config.theme.typography.tsx); MUI defaults are disabled so pages stay consistent.
- **Shape** — white cards with hairline borders and 2–4 px radii; pill buttons (`borderRadius: 999`) with a press-scale micro-interaction.

## 📝 Conventions

- **Components:** `src/components/<Folder>/<File>.tsx`, one component per file, PascalCase.
- **Mock data:** `src/config/mock/<domain>.mock.ts` exporting an interface + const array.
- **Stores:** `src/store/<domain>/store.useX.ts` — create with `persist` + `skipHydration`, then rehydrate in `providers.tsx`.
- **Routes:** pages live in the `(dashboard)` route group (they import shared components with `../../../` paths) or `(auth)`; deeper routes like `post/[id]/` use one extra `../`.
- **Branding:** use `APP_NAME` / `APP_TAGLINE` from `src/config/config.ts` instead of hardcoding "Career Nexus".

### MUI v9 notes (worth remembering)

- System props are gone — `alignItems`, `justifyContent`, `fontWeight` etc. belong in `sx`.
- Replace legacy props with `slotProps` (e.g. `inputProps` → `slotProps={{ input: … }}`, Dialog `PaperProps` → `slotProps={{ paper: … }}`).
- `ListItemText` no longer takes `primaryTypographyProps` — pass a `Typography` as children.
- Some icons were renamed in v9 (`Work`, `ChatBubbleOutlineOutlined`, `FeedOutlined`).

## 🧭 Ideas for later

- Member profiles (`/people/[id]`) and company pages (`/company/[id]`) linked from post authors and job cards
- Full `/search` results page fed by the navbar search
- Persisting group/event/newsletter membership in a community store
- Messaging threads with replies, and a Premium landing page

---

*A UI concept — © 2026. Built for learning and demos; not affiliated with any existing professional network.*
