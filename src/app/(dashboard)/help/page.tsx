"use client";

import { useMemo, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import InputBase from "@mui/material/InputBase";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";

import PageContainer from "../../../components/PageContainer/PageContainer";
import StateCard from "../../../components/feedback/StateCard";
import { FAQ_CATEGORIES, FAQS } from "../../../config/mock/help.mock";

export default function HelpPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQS.filter((faq) => {
      const matchesCategory = category === "All" || faq.category === category;
      const matchesQuery =
        q === "" ||
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <PageContainer maxWidth="md">
      <Box
        sx={{
          bgcolor: "background.paper",
          border: 1,
          borderColor: (theme) => theme.palette.border,
          borderRadius: 2,
          p: { xs: 2, md: 3 },
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
          <HelpOutlineOutlinedIcon sx={{ color: "primary.main", fontSize: 28 }} />
          <Box>
            <Typography variant="h2">Help Center</Typography>
            <Typography variant="bodySmall" color="text.secondary">
              Answers about your account, network, jobs, and privacy
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mt: 2,
            bgcolor: "surfaceHover",
            border: 1,
            borderColor: (theme) => theme.palette.border,
            borderRadius: 1.5,
            px: 1.25,
            py: 0.75,
          }}
        >
          <SearchIcon fontSize="small" sx={{ color: "text.secondary" }} />
          <InputBase
            placeholder="Search help articles"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{ fontSize: 14, flex: 1, "& input": { p: 0 } }}
            inputProps={{ "aria-label": "search help articles" }}
          />
        </Box>

        <Stack direction="row" spacing={1} sx={{ mt: 1.5, flexWrap: "wrap", gap: 0.5 }}>
          {FAQ_CATEGORIES.map((c) => (
            <Chip
              key={c.id}
              label={`${c.icon} ${c.label}`}
              size="small"
              onClick={() => setCategory(c.label)}
              color={category === c.label ? "primary" : "default"}
              variant={category === c.label ? "filled" : "outlined"}
              sx={{ cursor: "pointer" }}
            />
          ))}
        </Stack>
      </Box>

      {filtered.length === 0 ? (
        <StateCard
          icon={<SearchOffOutlinedIcon sx={{ fontSize: 48 }} />}
          title="No matching articles"
          description="Try different keywords, or browse all categories."
          actionLabel="Clear search"
          onAction={() => {
            setQuery("");
            setCategory("All");
          }}
        />
      ) : (
        <Stack spacing={1.5}>
          {filtered.map((faq) => (
            <Accordion
              key={faq.id}
              disableGutters
              elevation={0}
              sx={{
                bgcolor: "background.paper",
                border: 1,
                borderColor: (theme) => theme.palette.border,
                borderRadius: "6px !important",
                "&:before": { display: "none" },
                overflow: "hidden",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreOutlinedIcon />}
                sx={{ px: 2, "& .MuiAccordionSummary-content": { my: 1.25 } }}
              >
                <Typography sx={{ fontWeight: 600 }}>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 2, pt: 0, pb: 2 }}>
                <Typography variant="bodySmall" color="text.secondary" sx={{ whiteSpace: "pre-line" }}>
                  {faq.answer}
                </Typography>
                {faq.related && (
                  <Stack direction="row" spacing={0.75} sx={{ mt: 1.5, flexWrap: "wrap", gap: 0.75 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ alignSelf: "center" }}>
                      Related:
                    </Typography>
                    {faq.related.map((r) => (
                      <Chip
                        key={r}
                        label={r}
                        size="small"
                        variant="outlined"
                        sx={{ cursor: "pointer", "&:hover": { bgcolor: "surfaceHover" } }}
                      />
                    ))}
                  </Stack>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
      )}

      <Typography variant="caption" color="text.secondary" sx={{ display: "block", textAlign: "center", mt: 3 }}>
        Still need help? Contact support is not available in this concept build.
      </Typography>
    </PageContainer>
  );
}
