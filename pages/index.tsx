import { Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import IconGallery from "components/iconGallery";
import DeviconOriginalIcon from "react-devicons/devicon/original";
import deviconPackage from "devicon/package.json";
import { StringParam, useQueryParam } from "next-query-params";
import IconDialog from "components/iconDialog";
import Title from "components/title";
import GithubIcon from "react-devicons/github/original";
import DiscordIcon from "components/discordIcon";
import Footer from "components/footer";

export default function Home() {
  const [searchQuery, setSearchQuery] = useQueryParam("q", StringParam);

  return (
    <div className="root">
      <div className="titleCard">
        <Card>
          <CardContent>
            <Title variant="h2">
              <DeviconOriginalIcon
                style={{
                  transform: "translateY(0.5rem)",
                  marginRight: "0.5rem",
                }}
              />
              Devicon <small>v{deviconPackage.version}</small>
            </Title>
            <Typography>
              Devicon is a set of icons representing programming languages,
              designing & development tools. You can use it as a font or
              directly copy/paste the svg code into your project.
            </Typography>
            <div className="buttons">
              <Button
                variant="contained"
                startIcon={<GithubIcon color="white" />}
                href="https://github.com/devicons/devicon"
              >
                GitHub
              </Button>
              <Button
                variant="contained"
                startIcon={<DiscordIcon color="white" />}
                href="https://discord.gg/hScy8KWACQ"
              >
                Discord
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
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
      <Footer />
      <style jsx>{`
        .root {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .titleCard {
          margin: 50px 0;
          max-width: 500px;
        }

        .titleCard :global(h2) {
          margin: 20px 0;
        }

        .buttons {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin-top: 20px;
        }

        small {
          font-size: 2rem;
        }
      `}</style>
    </div>
  );
}
