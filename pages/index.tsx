import { Search } from "@mui/icons-material";
import { Box, styled, TextField, Typography } from "@mui/material";
import IconGallery from "components/iconGallery";
import DeviconOriginalIcon from "react-devicons/devicon/original";
import deviconPackage from "devicon/package.json";
import { StringParam, useQueryParam } from "next-query-params";
import IconDialog from "components/iconDialog";
import Title from "components/title";

export default function Home() {
  const [searchQuery, setSearchQuery] = useQueryParam("q", StringParam);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Title variant="h2" sx={{ mt: 10, mb: 4 }}>
        <Logo />
        Devicon <Version>v{deviconPackage.version}</Version>
      </Title>
      <Typography sx={{ maxWidth: 400, mb: 4 }}>
        Devicon is a set of icons representing programming languages, designing
        & development tools. You can use it as a font or directly copy/paste the
        svg code into your project.
      </Typography>
      <Box sx={{ display: "flex", alignItems: "flex-end", mb: 3 }}>
        <Search sx={{ mr: 1 }} />
        <TextField
          label="Search for icons"
          variant="standard"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </Box>
      <IconGallery />
      <IconDialog />
    </Box>
  );
}

const Logo = styled(DeviconOriginalIcon)({
  transform: "translateY(0.5rem)",
  marginRight: "0.5rem",
});

const Version = styled("small")({
  fontSize: "2rem",
});
