import { Box, styled } from "@mui/material";
import icons from "devicon/devicon.json";
import NextLink from "next/link";

export default function IconGallery({
  setIconName,
}: {
  setIconName: (iconName: string) => void;
}) {
  return (
    <Grid>
      {icons.map((icon) => (
        <IconBox
          href={`?icon=${icon.name}`}
          key={icon.name}
          onClick={(event) => {
            event.preventDefault();
            setIconName(icon.name);
          }}
        >
          <img
            src={`/api/${icon.name}/${icon.versions.svg[0]}`}
            alt={`${icon.name} ${icon.versions.svg[0]} icon`}
          />
          {icon.name}
        </IconBox>
      ))}
    </Grid>
  );
}

const Grid = styled("div")({
  display: "grid",
  width: "100%",
  maxWidth: "1000px",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gridGap: "1rem",
});

const IconBox = styled("a")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "20px",
});
