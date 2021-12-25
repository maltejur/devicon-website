import { styled } from "@mui/material";
import icons from "public/devicon-git/devicon.json";
import { Icon } from "lib/types";
import { StringParam, useQueryParam } from "next-query-params";

export default function IconGallery() {
  const [iconName, setIconName] = useQueryParam("icon", StringParam);
  const [searchQuery, setSearchQuery] = useQueryParam("q", StringParam);

  return (
    <Grid>
      {icons
        .filter(
          (icon: Icon) =>
            !searchQuery ||
            icon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            icon.tags.find((tag) =>
              tag.toLowerCase().includes(searchQuery.toLowerCase())
            )
        )
        .map((icon) => (
          <IconBox
            href={`?icon=${icon.name}`}
            key={icon.name}
            onClick={(event) => {
              event.preventDefault();
              setIconName(icon.name);
            }}
          >
            <img
              src={`/api/${icon.name}/${icon.versions.svg[0]}.svg`}
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
  maxWidth: "150px",
});
