"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeIcon from "@mui/icons-material/Home";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

import { useCurrentUser } from "../../store/auth/store.useAuth";
import PersonAvatar from "../Avatar/PersonAvatar";
import PostDialog from "../feed/PostDialog";

function isActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  if (href === "/feed") return pathname === "/" || pathname.startsWith("/feed");
  return pathname.startsWith(href);
}

export default function BottomNav() {
  const user = useCurrentUser();
  const pathname = usePathname();
  const [composerOpen, setComposerOpen] = useState(false);

  return (
    <Box
      component="nav"
      aria-label="primary mobile navigation"
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: (theme) => theme.zIndex.appBar,
        display: { xs: "block", sm: "none" },
      }}
    >
      <Paper square elevation={0} sx={{ borderTop: 1, borderColor: "divider" }}>
        <BottomNavigation
          value={false}
          showLabels={false}
          sx={{ height: 56 }}
        >
          <BottomNavigationAction
            component={NextLink}
            href="/feed"
            label="Home"
            icon={isActive(pathname, "/feed") ? <HomeIcon /> : <HomeOutlinedIcon />}
            sx={{ color: isActive(pathname, "/feed") ? "text.primary" : "text.secondary" }}
          />
          <BottomNavigationAction
            component={NextLink}
            href="/network"
            label="My Network"
            icon={
              <Badge badgeContent={5} color="primary">
                {isActive(pathname, "/network") ? (
                  <PeopleAltIcon />
                ) : (
                  <PeopleAltOutlinedIcon />
                )}
              </Badge>
            }
            sx={{ color: isActive(pathname, "/network") ? "text.primary" : "text.secondary" }}
          />
          <BottomNavigationAction
            label="Post"
            onClick={() => setComposerOpen(true)}
            icon={<AddBoxOutlinedIcon />}
          />
          <BottomNavigationAction
            component={NextLink}
            href="/messaging"
            label="Messaging"
            icon={
              <Badge badgeContent={3} color="primary">
                {isActive(pathname, "/messaging") ? (
                  <ChatBubbleIcon />
                ) : (
                  <ChatBubbleOutlineOutlinedIcon />
                )}
              </Badge>
            }
            sx={{ color: isActive(pathname, "/messaging") ? "text.primary" : "text.secondary" }}
          />
          <BottomNavigationAction
            component={NextLink}
            href="/profile"
            label="Profile"
            icon={
              <PersonAvatar
                name={user.name}
                initials={user.initials}
                src={user.avatarUrl}
                sx={{
                  width: 26,
                  height: 26,
                  fontSize: 12,
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  border: isActive(pathname, "/profile") ? 2 : 0,
                  borderColor: "text.primary",
                }}
              >
                {user.initials}
              </PersonAvatar>
            }
          />
        </BottomNavigation>
      </Paper>

      {/* Shared post composer (adds to the feed store) */}
      <PostDialog open={composerOpen} onClose={() => setComposerOpen(false)} />
    </Box>
  );
}
