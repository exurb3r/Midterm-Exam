"use client";
import { createTheme } from "@mui/material/styles";
import { keyframes } from "@mui/system";

import { typography } from "./config.theme.typography";

// Gentle pulse for loading skeletons.
const skeletonKeyframe = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.45; }
  100% { opacity: 1; }
`;

const isProdBuild = true;

declare module "@mui/material/styles" {
  interface Palette {
    accent: string;
    accentSecondary: string;
    accentTertiary: string;
    surfaceHover: string;
    surfaceElevated: string;
    surfaceSubtle: string;
    surfaceMuted: string;
    border: string;
    borderStrong: string;
    overlay: string;
    green: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    gradient: {
      primary: string;
      subtle: string;
    };
  }
  interface PaletteOptions {
    accent?: string;
    accentSecondary?: string;
    accentTertiary?: string;
    surfaceHover?: string;
    surfaceElevated?: string;
    surfaceSubtle?: string;
    surfaceMuted?: string;
    border?: string;
    borderStrong?: string;
    overlay?: string;
    green?: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    gradient?: {
      primary: string;
      subtle: string;
    };
  }
}

const greenScaleLight = {
  50: "#F4F7EC",
  100: "#E8EED3", // == accentSecondary
  200: "#D5DFB8", // == accent
  300: "#B5C48A", // == accentTertiary
  400: "#8FA564", // == primary.light (moss)
  500: "#2F6B3A", // == primary.main (forest)
  600: "#1F4D2B", // == primary.dark
  700: "#1A3F25",
  800: "#14301C",
  900: "#0D2113",
};

const greenScaleDark = {
  50: "#0D2113",
  100: "#14301C",
  200: "#1A3F25",
  300: "#1F4D2B",
  400: "#2F6B3A",
  500: "#9DB77A", // == primary.main (dark mode)
  600: "#B5C48A",
  700: "#D5DFB8",
  800: "#E8EED3",
  900: "#F4F7EC",
};

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2F6B3A",
      dark: "#1F4D2B",
      light: "#8FA564",
      contrastText: "#FFFFFF",
    },
    accent: "#D5DFB8",
    accentSecondary: "#E8EED3",
    accentTertiary: "#B5C48A",
    green: greenScaleLight,
    background: {
      default: "#F4F2EE",
      paper: "#FFFFFF",
    },
    surfaceHover: "rgba(47, 107, 58, 0.08)",
    surfaceElevated: "#FFFFFF",
    surfaceSubtle: "#F7F8F4",
    surfaceMuted: "#E9EDE3",
    border: "#DDE5CB",
    borderStrong: "#C4D0A8",
    overlay: "rgba(18, 30, 16, 0.5)",
    divider: "#E2E9D2",
    text: {
      primary: "#1A2E1C",
      secondary: "#5E6F58",
      disabled: "#A8B3A0",
    },
    success: { main: "#4F9D4A" },
    warning: { main: "#D9961A" },
    error: { main: "#D14343" },
    info: { main: "#3B82F6" },
    gradient: {
      primary: "linear-gradient(135deg, #2F6B3A 0%, #8FA564 100%)",
      subtle: "linear-gradient(135deg, #E8EED3 0%, #F8FAF3 100%)",
    },
  },
  typography,
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: !isProdBuild,
        disableTouchRipple: !isProdBuild,
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 999,
          textTransform: "none",
          fontWeight: 600,
          transition: "background-color 150ms ease, color 150ms ease, box-shadow 150ms ease, border-color 150ms ease, transform 100ms ease",
          "&:active": { transform: "scale(0.97)" },
        },
        sizeSmall: { px: 1.5 },
        sizeMedium: { px: 2 },
        sizeLarge: { px: 3 },
      },
    },
    MuiIconButton: {
      defaultProps: {
        disableRipple: !isProdBuild,
        disableTouchRipple: !isProdBuild,
      },
    },
    MuiCheckbox: {
      defaultProps: {
        disableRipple: !isProdBuild,
        disableTouchRipple: !isProdBuild,
      },
    },
    MuiRadio: {
      defaultProps: {
        disableRipple: !isProdBuild,
        disableTouchRipple: !isProdBuild,
      },
    },
    MuiSwitch: {
      defaultProps: {
        disableRipple: !isProdBuild,
        disableTouchRipple: !isProdBuild,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: !isProdBuild,
        disableTouchRipple: !isProdBuild,
      },
    },
    MuiMenuItem: {
      defaultProps: {
        disableRipple: !isProdBuild,
        disableTouchRipple: !isProdBuild,
      },
    },
    MuiListItemButton: {
      defaultProps: {
        disableRipple: !isProdBuild,
        disableTouchRipple: !isProdBuild,
      },
    },
    MuiTab: {
      defaultProps: {
        disableRipple: !isProdBuild,
        disableTouchRipple: !isProdBuild,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          boxShadow: "none",
          border: "1px solid #DDE5CB",
        },
      },
    },
    MuiSkeleton: {
      defaultProps: { animation: false },
      styleOverrides: {
        root: {
          "::after": {
            animation: `${skeletonKeyframe} 1.6s ease-in-out infinite`,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiChip: {
      defaultProps: { size: "small" },
      styleOverrides: {
        root: {
          borderRadius: 4,
          fontWeight: 500,
          transition: "background-color 150ms ease, border-color 150ms ease, color 150ms ease",
        },
        colorPrimary: {
          backgroundColor: "#E8EED3",
          color: "#1F4D2B",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#C4D0A8",
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#1A2E1C",
          fontSize: "0.75rem",
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          fontWeight: 600,
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  ...theme,
  palette: {
    mode: "dark",
    primary: {
      main: "#9DB77A",
      dark: "#6F9150",
      light: "#BFD1A0",
      contrastText: "#0E1A0F",
    },
    accent: "#3F6B34",
    accentSecondary: "#1E2D1C",
    accentTertiary: "#2A3F26",
    green: greenScaleDark,
    background: {
      default: "#0C150C",
      paper: "#131E12",
    },
    surfaceHover: "#223220",
    surfaceElevated: "#1B2A19",
    surfaceSubtle: "#101A10",
    surfaceMuted: "#223220",
    border: "#2C4029",
    borderStrong: "#3A5336",
    overlay: "rgba(10, 18, 10, 0.7)",
    divider: "#3A5336",
    text: {
      primary: "#F2F7EA",
      secondary: "#BCC9B0",
      disabled: "#85927C",
    },
    success: { main: "#7FBF6A" },
    warning: { main: "#E8B04A" },
    error: { main: "#F87171" },
    info: { main: "#60A5FA" },
    gradient: {
      primary: "linear-gradient(135deg, #9DB77A 0%, #2F6B3A 100%)",
      subtle: "linear-gradient(135deg, #1B2A19 0%, #0C150C 100%)",
    },
  },
  components: {
    ...theme.components,
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          boxShadow: "none",
          border: "1px solid #2C4029",
          backgroundColor: "#1B2A19",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
        colorPrimary: {
          backgroundColor: "#223220",
          color: "#BFD1A0",
        },
      },
    },
  },
});