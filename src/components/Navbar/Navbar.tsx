"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Menu from "@mui/material/Menu";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import WorkIcon from "@mui/icons-material/Work";
import WorkOutlinedIcon from "@mui/icons-material/WorkOutlined";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import Logo from "../Logo/Logo";
import PersonAvatar from "../Avatar/PersonAvatar";
import { PEOPLE_YOU_MAY_KNOW, POSTS } from "../../config/mock/feed.mock";
import { JOBS } from "../../config/mock/jobs.mock";
import { useColorMode } from "../../app/providers";
import { useFeedback } from "../feedback/FeedbackProvider";
import { useAuthStore, useCurrentUser } from "../../store/auth/store.useAuth";

import ForBusinessMenu from "./ForBusinessMenu";
import PremiumModal from "./PremiumModal";
/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

interface NavItem {
  label: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  href: string;
  badge?: number;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Home",
    icon: <HomeOutlinedIcon />,
    activeIcon: <HomeIcon />,
    href: "/feed",
  },
  {
    label: "My Network",
    icon: <PeopleAltOutlinedIcon />,
    activeIcon: <PeopleAltIcon />,
    href: "/network",
  },
  {
    label: "Jobs",
    icon: <WorkOutlinedIcon />,
    activeIcon: <WorkIcon />,
    href: "/jobs",
  },
  {
    label: "Messaging",
    icon: <ChatBubbleOutlineOutlinedIcon />,
    activeIcon: <ChatBubbleIcon />,
    href: "/messaging",
    badge: 3,
  },
  {
    label: "Notifications",
    icon: <NotificationsNoneIcon />,
    activeIcon: <NotificationsIcon />,
    href: "/notifications",
    badge: 8,
  },
];

const MESSAGING_ITEM = NAV_ITEMS.find((item) => item.label === "Messaging")!;

const PREMIUM_NAV_LABEL = "Activate Premium for ₱0";
const PREMIUM_MENU_LABEL = "Try Premium for ₱0";

interface MenuLink {
  label: string;
  href: string;
}

const ACCOUNT_LINKS: MenuLink[] = [
  { label: "Settings & Privacy", href: "/settings" },
  { label: "Help", href: "/help" },
  { label: "Language", href: "#" },
];
const MANAGE_LINKS: MenuLink[] = [
  { label: "Posts & Activity", href: "/profile" },
  { label: "Job Posting Account", href: "/jobs" },
];

/** "#" marks a link with no route yet: render it as a button, never as an anchor. */
const isPlaceholder = (href: string) => href === "#";

/* ------------------------------------------------------------------ */
/* Search suggestions                                                  */
/* ------------------------------------------------------------------ */

interface SearchSuggestion {
  key: string;
  title: string;
  subtitle: string;
  initials?: string;
  href: string;
}

const SEARCH_PEOPLE: SearchSuggestion[] = [
  ...POSTS.map((p) => p.author),
  ...PEOPLE_YOU_MAY_KNOW,
]
  .filter((p, i, arr) => arr.findIndex((x) => x.name === p.name) === i)
  .map((p) => ({
    key: `person-${p.name}`,
    title: p.name,
    subtitle: p.headline,
    initials: p.initials,
    href: "/network",
  }));

const SEARCH_JOBS: SearchSuggestion[] = JOBS.map((job) => ({
  key: `job-${job.id}`,
  title: job.title,
  subtitle: `${job.company} · ${job.location}`,
  href: "/jobs",
}));

const matchesQuery = (q: string, ...fields: string[]) =>
  q === "" || fields.some((f) => f.toLowerCase().includes(q));

function SearchGroupHeading({ label }: { label: string }) {
  return (
    <Typography
      variant="caption"
      sx={{ display: "block", px: 2, py: 0.75, fontWeight: 600, color: "text.secondary" }}
    >
      {label}
    </Typography>
  );
}

function SearchRow({
  suggestion,
  onNavigate,
}: {
  suggestion: SearchSuggestion;
  onNavigate: () => void;
}) {
  return (
    <ButtonBase
      component={NextLink}
      href={suggestion.href}
      onClick={onNavigate}
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 1.25,
        px: 2,
        py: 1,
        textAlign: "left",
        "&:hover": { bgcolor: "surfaceHover" },
      }}
    >
      {suggestion.initials ? (
        <PersonAvatar
          name={suggestion.title}
          initials={suggestion.initials}
          sx={{
            width: 36,
            height: 36,
            fontSize: 13,
            bgcolor: "surfaceMuted",
            color: "primary.dark",
            fontWeight: 700,
          }}
        >
          {suggestion.initials}
        </PersonAvatar>
      ) : (
        <Avatar sx={{ width: 36, height: 36, bgcolor: "surfaceMuted", color: "primary.dark" }}>
          <WorkOutlinedIcon />
        </Avatar>
      )}
      <Box sx={{ minWidth: 0 }}>
        <Typography noWrap sx={{ fontSize: 14, fontWeight: 600 }}>
          {suggestion.title}
        </Typography>
        <Typography noWrap variant="caption" color="text.secondary" sx={{ display: "block" }}>
          {suggestion.subtitle}
        </Typography>
      </Box>
    </ButtonBase>
  );
}

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

// The "For Business" icon is a 3x3 grid of dots, not squares.
function DotsGridIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      {[5, 12, 19].flatMap((cx) =>
        [5, 12, 19].map((cy) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={2.1} />
        )),
      )}
    </SvgIcon>
  );
}

// Navbar font sizes in one place (rem, so they follow the root size).
// body/heading step down one notch on phones (xs), then match desktop from sm.
const FONT = {
  navLabel: "0.6875rem", // 11px: Home, Me, For Business labels
  body: { xs: "0.75rem", sm: "0.8125rem" }, //      12px / 13px: premium link, menu items
  heading: { xs: "0.8125rem", sm: "0.875rem" }, //  13px / 14px: menu name + section headings
};

// Shared look for every item in the nav row: icon over label, 2px underline
// when active, darker on hover, visible keyboard focus.
const navItemSx = (active: boolean) => ({
  alignSelf: "stretch",
  flexShrink: 0,
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "center",
  alignItems: "center",
  gap: 0.25,
  minWidth: { sm: 56, md: 80 },
  px: 1,
  textDecoration: "none",
  color: active ? "text.primary" : "text.secondary",
  borderBottom: 2,
  borderColor: active ? "text.primary" : "transparent",
  borderRadius: 0,
  transition: "color 0.15s ease",
  "&:hover": { color: "text.primary" },
  "&.Mui-focusVisible": { bgcolor: "surfaceHover" },
});

const navLabelSx = (active: boolean) => ({
  fontSize: FONT.navLabel,
  lineHeight: 1.2,
  fontWeight: active ? 600 : 400,
  display: { xs: "none", md: "block" },
});

const badgeSx = {
  "& .MuiBadge-badge": {
    // a notch smaller on phones, where the icon sits at the screen edge
    minWidth: { xs: 12, sm: 14 },
    height: { xs: 12, sm: 14 },
    px: { xs: "2px", sm: "3px" },
    fontSize: { xs: 9, sm: 10 },
    fontWeight: 500,
    lineHeight: 1,
    // tuck the badge in toward the icon instead of floating off its corner
    top: "3px",
    right: "3px",
  },
};

const menuItemSx = {
  fontSize: FONT.body,
  color: "text.secondary",
  minHeight: { xs: 44, sm: 36 },
};

const menuLinkSx = {
  ...menuItemSx,
  "&:hover": { textDecoration: "underline" },
};

const menuHeadingSx = {
  px: 2,
  pt: 1,
  pb: 0.5,
  fontSize: FONT.heading,
  fontWeight: 600,
  color: "text.primary",
};

function NavItemButton({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <ButtonBase
      component={NextLink}
      href={item.href}
      aria-current={active ? "page" : undefined}
      sx={navItemSx(active)}
    >
      <Badge badgeContent={item.badge} max={99} color="error" sx={badgeSx}>
        {active ? item.activeIcon : item.icon}
      </Badge>
      <Typography sx={navLabelSx(active)}>{item.label}</Typography>
    </ButtonBase>
  );
}

/* ------------------------------------------------------------------ */
/* Navbar                                                              */
/* ------------------------------------------------------------------ */

export default function Navbar() {
  const router = useRouter();
  const { showToast } = useFeedback();
  const signOut = useAuthStore((s) => s.signOut);
  const user = useCurrentUser();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { mode, toggleColorMode } = useColorMode();
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const menuOpen = Boolean(anchorEl);
  const [businessAnchor, setBusinessAnchor] = useState<HTMLElement | null>(null);
  const businessOpen = Boolean(businessAnchor);
  const [premiumOpen, setPremiumOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const q = searchQuery.trim().toLowerCase();
  const searchPeople = SEARCH_PEOPLE.filter((p) =>
    matchesQuery(q, p.title, p.subtitle)
  ).slice(0, 3);
  const searchJobs = SEARCH_JOBS.filter((j) =>
    matchesQuery(q, j.title, j.subtitle)
  ).slice(0, 3);
  const hasSuggestions = searchPeople.length > 0 || searchJobs.length > 0;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleBusinessOpen = (event: React.MouseEvent<HTMLElement>) => {
    setBusinessAnchor(event.currentTarget);
  };

  const handleBusinessClose = () => {
    setBusinessAnchor(null);
  };

  const isActive = (href: string) =>
    !isPlaceholder(href) &&
    (pathname === href || pathname?.startsWith(`${href}/`));

  const menuTriggerProps = {
    onClick: handleMenuOpen,
    "aria-label": "open account menu",
    "aria-controls": menuOpen ? "account-menu" : undefined,
    "aria-haspopup": "true" as const,
    "aria-expanded": menuOpen ? ("true" as const) : undefined,
  };

  const businessTriggerProps = {
    onClick: handleBusinessOpen,
    "aria-label": "For Business",
    "aria-controls": businessOpen ? "for-business-menu" : undefined,
    "aria-haspopup": "true" as const,
    "aria-expanded": businessOpen ? ("true" as const) : undefined,
  };

  /**
   * Shared by the desktop popover and the mobile drawer. Built per call so the
   * two trees never share element instances (and therefore never share state).
   */
  const renderAccountItems = () => {
    const linkItems = (links: MenuLink[]) =>
      links.map(({ label, href }) =>
        isPlaceholder(href) ? (
          <MenuItem key={label} onClick={handleMenuClose} sx={menuLinkSx}>
            {label}
          </MenuItem>
        ) : (
          <MenuItem
            key={label}
            component={NextLink}
            href={href}
            onClick={handleMenuClose}
            sx={menuLinkSx}
          >
            {label}
          </MenuItem>
        ),
      );

    return [
      <Box key="profile" sx={{ px: 2, pt: 2, pb: 1.5 }}>
        <Box sx={{ display: "flex", gap: 1.5, mb: 1.5 }}>
          <PersonAvatar
            name={user.name}
            initials={user.initials}
            src={user.avatarUrl}
            sx={{
              width: 56,
              height: 56,
              bgcolor: "primary.main",
              color: "primary.contrastText",
            }}
          >
            {user.initials}
          </PersonAvatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontWeight: 600, fontSize: FONT.heading }}>
              {user.name}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {user.headline}
            </Typography>
          </Box>
        </Box>
        <Button
          component={NextLink}
          href="/profile"
          variant="outlined"
          size="small"
          fullWidth
          sx={{ borderRadius: "999px", fontWeight: 600, fontSize: FONT.body }}
        >
          View Profile
        </Button>
      </Box>,

      <Divider key="d-profile" />,

      <Typography key="h-account" sx={{ ...menuHeadingSx, pt: 1.5 }}>
        Account
      </Typography>,

      <MenuItem
        key="premium"
        onClick={() => {
          handleMenuClose();
          setPremiumOpen(true);
        }}
        sx={{ ...menuLinkSx, color: "text.primary" }}
      >
        <Box
          component="span"
          sx={{
            width: 16,
            height: 16,
            mr: 1,
            flexShrink: 0,
            borderRadius: "3px",
            background: "linear-gradient(135deg, #F8C77E 0%, #D69A2D 100%)",
          }}
        />
        {PREMIUM_MENU_LABEL}
      </MenuItem>,

      ...linkItems(ACCOUNT_LINKS),

      <MenuItem
        key="dark-mode"
        onClick={(e) => {
          // keep the menu open so the change is visible right away
          e.stopPropagation();
          toggleColorMode();
        }}
        sx={{ ...menuItemSx, justifyContent: "space-between" }}
      >
        Dark mode
        <Switch
          size="small"
          checked={mode === "dark"}
          tabIndex={-1}
          slotProps={{ input: { "aria-label": "Dark mode" } }}
        />
      </MenuItem>,

      <Divider key="d-manage" sx={{ my: 0.5 }} />,

      <Typography key="h-manage" sx={menuHeadingSx}>
        Manage
      </Typography>,

      ...linkItems(MANAGE_LINKS),

      <Divider key="d-signout" sx={{ my: 0.5 }} />,

      <MenuItem
        key="sign-out"
        onClick={() => {
          signOut();
          handleMenuClose();
          showToast("You've been signed out. See you soon!", "info");
          router.push("/");
        }}
        sx={menuLinkSx}
      >
        Sign out
      </MenuItem>,
    ];
  };

  return (
    <Box
      component="header"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: (t) => t.zIndex.appBar,
        bgcolor: "background.paper",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Box
        sx={{
          maxWidth: 1128,
          mx: "auto",
          height: 52,
          px: { xs: 1.5, md: 2 },
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        {/* Mobile: avatar takes the logo's place and opens the account menu */}
        <IconButton
          {...menuTriggerProps}
          size="small"
          sx={{ display: { xs: "inline-flex", sm: "none" }, p: "4px", ml: "-4px" }}
        >
          <PersonAvatar
            name={user.name}
            initials={user.initials}
            src={user.avatarUrl}
            sx={{
              width: 32,
              height: 32,
              fontSize: 13,
              bgcolor: "primary.main",
              color: "primary.contrastText",
            }}
          >
            {user.initials}
          </PersonAvatar>
        </IconButton>

        <Box sx={{ display: { xs: "none", sm: "flex" }, flexShrink: 0 }}>
          <Logo showName={false} />
        </Box>

        {/* Search: bordered pill on desktop, muted fill on mobile */}
        <Box
          role="search"
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: 1,
            flex: { xs: 1, sm: "0 1 auto" },
            minWidth: 0,
            width: { sm: 160, md: 240, lg: 280 },
            height: { xs: 36, sm: 34 },
            px: 1.5,
            bgcolor: { xs: "surfaceMuted", sm: "background.paper" },
            border: 1,
            borderColor: { xs: "transparent", sm: "borderStrong" },
            borderRadius: { xs: "4px", sm: "999px" },
            transition: "width 0.2s ease, border-color 0.15s ease",
            "&:hover": { borderColor: { sm: "text.secondary" } },
            "&:focus-within": {
              width: { sm: 220, md: 300, lg: 320 },
              borderColor: "text.primary",
            },
          }}
        >
          <SearchIcon
            sx={{
              fontSize: 20,
              color: { xs: "text.secondary", sm: "text.primary" },
            }}
          />
          <InputBase
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setSearchFocused(false);
            }}
            sx={{
              fontSize: { xs: "0.875rem", sm: "0.8125rem" },
              flex: 1,
              minWidth: 0,
              "& input": { p: 0 },
            }}
            inputProps={{ "aria-label": "Search" }}
          />

          {/* Suggestions dropdown */}
          {searchFocused && (
            <Paper
              onMouseDown={(e) => e.preventDefault()}
              sx={{
                position: "absolute",
                top: "calc(100% + 6px)",
                left: 0,
                width: { xs: "100%", sm: 340 },
                bgcolor: "background.paper",
                border: 1,
                borderColor: (t) => t.palette.border,
                borderRadius: 2,
                py: 1,
                zIndex: (t) => t.zIndex.modal,
                boxShadow: "0 8px 24px rgba(0,0,0,0.14)",
              }}
            >
              {!hasSuggestions ? (
                <Typography variant="bodySmall" color="text.secondary" sx={{ px: 2, py: 1.5 }}>
                  No results for &ldquo;{searchQuery}&rdquo;
                </Typography>
              ) : (
                <>
                  {searchPeople.length > 0 && (
                    <>
                      <SearchGroupHeading label="People" />
                      {searchPeople.map((s) => (
                        <SearchRow
                          key={s.key}
                          suggestion={s}
                          onNavigate={() => setSearchFocused(false)}
                        />
                      ))}
                    </>
                  )}
                  {searchJobs.length > 0 && (
                    <>
                      <SearchGroupHeading label="Jobs" />
                      {searchJobs.map((s) => (
                        <SearchRow
                          key={s.key}
                          suggestion={s}
                          onNavigate={() => setSearchFocused(false)}
                        />
                      ))}
                    </>
                  )}
                </>
              )}
            </Paper>
          )}
        </Box>

        <Box sx={{ flex: 1, display: { xs: "none", sm: "block" } }} />

        {/* Desktop / tablet: primary navigation + Me */}
        <Box
          component="nav"
          aria-label="Primary"
          sx={{
            display: { xs: "none", sm: "flex" },
            alignItems: "stretch",
            alignSelf: "stretch",
            flexShrink: 0,
            mb: "-1px", // lets the active underline sit on the header border
          }}
        >
          {NAV_ITEMS.map((item) => (
            <NavItemButton
              key={item.label}
              item={item}
              active={isActive(item.href)}
            />
          ))}

          {/* "Me" is a trigger, not a route, so it never gets an active underline */}
          <ButtonBase
            {...menuTriggerProps}
            sx={{
              ...navItemSx(false),
              color: menuOpen ? "text.primary" : "text.secondary",
            }}
          >
            <PersonAvatar
              name={user.name}
              initials={user.initials}
              src={user.avatarUrl}
              sx={{
                width: 24,
                height: 24,
                fontSize: 11,
                bgcolor: "primary.main",
                color: "primary.contrastText",
              }}
            >
              {user.initials}
            </PersonAvatar>
            <Stack
              direction="row"
              sx={{
                display: { xs: "none", md: "flex" },
                mr: -0.5,
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: FONT.navLabel, lineHeight: 1.2 }}>
                Me
              </Typography>
              <ArrowDropDownIcon sx={{ fontSize: 18 }} />
            </Stack>
          </ButtonBase>
        </Box>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ display: { xs: "none", lg: "block" } }}
        />

        {/* For Business: opens its own menu (businessOpen drives the highlight) */}
        <ButtonBase
          {...businessTriggerProps}
          sx={{
            ...navItemSx(false),
            color: businessOpen ? "text.primary" : "text.secondary",
            display: { xs: "none", lg: "flex" },
            minWidth: 0,
            px: 1.25,
          }}
        >
          <DotsGridIcon />
          <Stack direction="row" sx={{ mr: -0.5, alignItems: "center" }}>
            <Typography sx={{ fontSize: FONT.navLabel, lineHeight: 1.2 }}>
              For Business
            </Typography>
            <ArrowDropDownIcon sx={{ fontSize: 18 }} />
          </Stack>
        </ButtonBase>

        {/* Premium: no route yet, so a button rather than a "#" anchor */}
        <ButtonBase
          onClick={() => setPremiumOpen(true)}
          sx={{
            display: { xs: "none", lg: "inline-flex" },
            flexShrink: 0,
            maxWidth: 104,
            px: 0.5,
            fontSize: FONT.body,
            lineHeight: 1.25,
            textAlign: "center",
            textDecoration: "underline",
            // The premium link; lightened for dark mode
            color: (t) => (t.palette.mode === "light" ? "#915907" : "#E8B04A"),
            "&:hover": { opacity: 0.8 },
          }}
        >
          {PREMIUM_NAV_LABEL}
        </ButtonBase>

        {/* Mobile: messaging lives in the top bar (the rest is in BottomNav) */}
        <IconButton
          component={NextLink}
          href={MESSAGING_ITEM.href}
          aria-label="Messaging"
          sx={{
            display: { xs: "inline-flex", sm: "none" },
            color: "text.secondary",
            p: 1,
            mr: -0.5,
          }}
        >
          <Badge
            badgeContent={MESSAGING_ITEM.badge}
            max={99}
            color="error"
            sx={badgeSx}
          >
            {MESSAGING_ITEM.icon}
          </Badge>
        </IconButton>

        {/* Account: popover on tablet/desktop, left drawer on phones */}
        <Menu
          id="account-menu"
          anchorEl={anchorEl}
          open={menuOpen && !isMobile}
          onClick={handleMenuClose}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          slotProps={{
            paper: { sx: { width: 264, mt: 0.5, borderRadius: "8px" } },
          }}
        >
          {renderAccountItems()}
        </Menu>

        <ForBusinessMenu anchorEl={businessAnchor} onClose={handleBusinessClose} />
        <PremiumModal open={premiumOpen} onClose={() => setPremiumOpen(false)} />

        <Drawer
          anchor="left"
          open={menuOpen && isMobile}
          onClose={handleMenuClose}
          slotProps={{
            paper: { sx: { width: 300, maxWidth: "85vw" } },
          }}
        >
          <MenuList disablePadding onClick={handleMenuClose} sx={{ pb: 2 }}>
            {renderAccountItems()}
          </MenuList>
        </Drawer>
      </Box>
    </Box>
  );
}