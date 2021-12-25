import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  styled,
  TextField,
} from "@mui/material";
import icons from "devicon/devicon.json";
import { StringParam, useQueryParam } from "next-query-params";
import { useMemo, useState } from "react";
import { HexColorPicker } from "react-colorful";
import IconPreview from "./iconPreview";
import Title from "./title";

export default function IconDialog() {
  const [iconName, setIconName] = useQueryParam("icon", StringParam);
  const [color, setColor] = useState<string>();

  const icon = useMemo(
    () => icons.find((icon) => icon.name === iconName),
    [iconName]
  );

  return (
    <Dialog
      open={!!iconName}
      onClose={() => setIconName(undefined)}
      maxWidth={"md"}
      fullWidth
    >
      {iconName && (
        <>
          <DialogTitle>
            <Title variant="h4">{icon.name}</Title>
          </DialogTitle>
          <DialogContent>
            <Colums>
              <IconPreview
                iconName={icon.name}
                iconVersion={icon.versions.svg[0]}
              />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: "flex" }}>
                  <TextField
                    label="Color"
                    value={color || ""}
                    onChange={(event) => setColor(event.target.value)}
                  />
                  <Button onClick={() => setColor(undefined)}>Reset</Button>
                </Box>
                <HexColorPicker color={color} onChange={setColor} />
                {icon.versions.svg.map((version) => {
                  const url = `${window.location.protocol}//${
                    window.location.host
                  }/api/${iconName}/${version}${
                    color ? `?color=${encodeURIComponent(color)}` : ""
                  }.svg`;
                  return (
                    <a href={url} key={version}>
                      {url}
                    </a>
                  );
                })}
              </Box>
            </Colums>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
}

const Colums = styled("div")({
  display: "grid",
  gridTemplateColumns: "220px auto",
});
