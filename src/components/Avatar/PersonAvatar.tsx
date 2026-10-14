"use client";

import Avatar, { type AvatarProps } from "@mui/material/Avatar";

import { personImage } from "../../config/mock/avatarImages";

/**
 * Renders a photo when one exists (explicit `src` wins, then the mock-person
 * registry), falling back to `initials` otherwise.
 */
export default function PersonAvatar({
  name,
  initials,
  src,
  sx,
  children,
  ...rest
}: AvatarProps & { name: string; initials: string; src?: string }) {
  const image = src ? { src, alt: name } : personImage(name);

  if (!image) {
    return (
      <Avatar sx={sx} {...rest}>
        {children ?? initials}
      </Avatar>
    );
  }

  return (
    <Avatar
      sx={{ ...sx, "& img": { width: "100%", height: "100%", objectFit: "cover" } }}
      {...rest}
    >
      <img src={image.src} alt={image.alt} loading="lazy" />
    </Avatar>
  );
}
