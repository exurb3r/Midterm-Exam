"use client";

import NextLink from "next/link";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Divider from "@mui/material/Divider";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ExploreIcon from "@mui/icons-material/Explore";
import GroupsIcon from "@mui/icons-material/Groups";
import InsightsIcon from "@mui/icons-material/Insights";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";

interface AppLink {
  label: string;
  icon: React.ReactNode;
  href: string;
}

interface AppSection {
  heading?: string;
  items: AppLink[];
}

interface BusinessLink {
  title: string;
  subtitle: string;
  href: string;
}

const MY_APPS: AppSection[] = [
  {
    items: [
      { label: "Sell", icon: <ExploreIcon />, href: "#" },
      { label: "Groups", icon: <GroupsIcon />, href: "/groups" },
    ],
  },
  {
    heading: "Talent",
    items: [
      { label: "Hire with AI", icon: <AutoAwesomeIcon />, href: "#" },
      { label: "Talent Insights", icon: <InsightsIcon />, href: "#" },
    ],
  },
  {
    heading: "Sales",
    items: [
      { label: "Services Marketplace", icon: <StorefrontOutlinedIcon />, href: "#" },
    ],
  },
];

const EXPLORE_LINKS: BusinessLink[] = [
  { title: "Hire on Career Nexus", subtitle: "Find, attract, and recruit talent", href: "#" },
  { title: "Sell with Career Nexus", subtitle: "Unlock sales opportunities", href: "#" },
  { title: "Post a job for free", subtitle: "Get qualified applicants quickly", href: "#" },
  {
    title: "Advertise on Career Nexus",
    subtitle: "Acquire customers and grow your business",
    href: "#",
  },
  {
    title: "Get started with Premium",
    subtitle: "Expand and leverage your network",
    href: "#",
  },
  {
    title: "Learn with Career Nexus",
    subtitle: "Courses to develop your employees",
    href: "#",
  },
  {
    title: "Admin Center",
    subtitle: "Manage billing and account details",
    href: "#",
  },
];

/** "#" marks a link with no route yet: render it as a button, never as an anchor. */
const isPlaceholder = (href: string) => href === "#";

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */

// All type comes from the theme variants (h3 16px, label 14px, bodySmall 13px).
// Nothing here hardcodes a size, so the menu follows the theme automatically.

const columnSx = { px: 2.5, pt: 2.5, pb: 3 };

// Hover fill sits inside the column padding, not edge to edge.
const rowSx = {
  width: "100%",
  mx: -1,
  px: 1,
  py: 1,
  justifyContent: "flex-start",
  textAlign: "left" as const,
  textDecoration: "none",
  color: "text.primary",
  borderRadius: 1,
  transition: "background-color 150ms ease",
  "&:hover": { bgcolor: "surfaceHover" },
  "&.Mui-focusVisible": { bgcolor: "surfaceHover" },
};

const stackedRowSx = {
  flexDirection: "column" as const,
  alignItems: "flex-start",
  gap: 0,
 py: 1,
};

const appIconSx = {
  display: "flex",
  alignItems: "center",
  flexShrink: 0,
  color: "primary.main",
  "& svg": { fontSize: 24 },
};

/* ------------------------------------------------------------------ */
/* Menu                                                                */
/* ------------------------------------------------------------------ */

interface ForBusinessMenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

export default function ForBusinessMenu({ anchorEl, onClose }: ForBusinessMenuProps) {
  const renderRow = (
    key: string,
    content: React.ReactNode,
    href: string,
    stacked = false,
  ) => {
    const sx = stacked ? { ...rowSx, ...stackedRowSx } : { ...rowSx, gap: 1.5 };

    return isPlaceholder(href) ? (
      <ButtonBase key={key} onClick={onClose} sx={sx}>
        {content}
      </ButtonBase>
    ) : (
      <ButtonBase
        key={key}
        component={NextLink}
        href={href}
        onClick={onClose}
        sx={sx}
      >
        {content}
      </ButtonBase>
    );
  };

  return (
    <Popover
      id="for-business-menu"
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      slotProps={{
        paper: {
          sx: {
            mt: 0.5,
            width: 680,
            maxWidth: "calc(100vw - 32px)",
            maxHeight: "calc(100vh - 80px)",
            borderRadius: "8px",
            overflowY: "auto",
          },
        },
      }}
    >
      <Box
        sx={{
          display: "grid",
          // two columns on desktop, stacked on phones
          gridTemplateColumns: {
            xs: "minmax(0, 1fr)",
            sm: "minmax(0, 1fr) 1px minmax(0, 1fr)",
          },
        }}
      >
        {/* My Apps */}
        <Box component="nav" aria-label="My apps" sx={columnSx}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            My Apps
          </Typography>

          {MY_APPS.map((section, i) => (
            <Box key={section.heading ?? i} sx={{ mt: i === 0 ? 0 : 1.5 }}>
              {section.heading && (
                <Typography
                  variant="label"
                  color="text.secondary"
                  sx={{ display: "block", mb: 0.5 }}
                >
                  {section.heading}
                </Typography>
              )}
              {section.items.map((item) =>
                renderRow(
                  item.label,
                  <>
                    <Box sx={appIconSx}>{item.icon}</Box>
                    <Typography variant="label" sx={{ fontWeight: 600 }}>
                      {item.label}
                    </Typography>
                  </>,
                  item.href,
                ),
              )}
            </Box>
          ))}
        </Box>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ display: { xs: "none", sm: "block" } }}
        />

        {/* Explore more for business */}
        <Box component="nav" aria-label="Explore more for business" sx={columnSx}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Explore more for business
          </Typography>

          {EXPLORE_LINKS.map((link) =>
            renderRow(
              link.title,
              <>
                <Typography variant="label" sx={{ fontWeight: 600 }}>
                  {link.title}
                </Typography>
                <Typography variant="bodySmall" color="text.secondary">
                  {link.subtitle}
                </Typography>
              </>,
              link.href,
              true,
            ),
          )}

          {renderRow(
            "create-page",
            <>
              <Typography variant="label" sx={{ fontWeight: 600 }}>
                Create a Company Page
              </Typography>
              <AddIcon sx={{ fontSize: 16, ml: 0.5 }} />
            </>,
            "#",
          )}
        </Box>
      </Box>
    </Popover>
  );
}