import Box from "@mui/material/Box";

import Navbar from "../../components/Navbar/Navbar";
import BottomNav from "../../components/BottomNav/BottomNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <Box
        component="main"
        sx={{
          pb: { xs: 8, sm: 0 },
          bgcolor: "background.default",
          minHeight: "100vh",
        }}
      >
        {children}
      </Box>
      <BottomNav />
    </>
  );
}
