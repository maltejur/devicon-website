import { Search } from "@mui/icons-material";
import { Box, styled, TextField, Typography } from "@mui/material";
import IconGallery from "components/iconGallery";
import DeviconOriginalIcon from "react-devicons/devicon/original";
import deviconPackage from "devicon/package.json";
import { StringParam, useQueryParam } from "next-query-params";
import IconDialog from "components/iconDialog";
import Title from "components/title";

export default function Home() {
  const [iconName, setIconName] = useQueryParam("icon", StringParam);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Title variant="h2" sx={{ mt: 10, mb: 5 }}>
        <Logo />
        Devicon <Version>v{deviconPackage.version}</Version>
      </Title>
      <Box sx={{ display: "flex", alignItems: "flex-end", mb: 3 }}>
        <Search sx={{ mr: 1 }} />
        <TextField label="Search for icons" variant="standard" />
      </Box>
      <IconGallery setIconName={setIconName} />
      <IconDialog iconName={iconName} setIconName={setIconName} />
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
