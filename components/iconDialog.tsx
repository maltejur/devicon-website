import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogContent,
  DialogTitle,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import icons from "public/devicon-git/devicon.json";
import { StringParam, useQueryParam } from "next-query-params";
import { useEffect, useMemo, useState } from "react";
import { HexColorPicker } from "react-colorful";
import IconPreview from "./iconPreview";
import Title from "./title";
import ButtonSelect from "./buttonSelect";
import IconSettings from "./iconSettings";
import Color from "color";

export default function IconDialog() {
  const [iconName, setIconName] = useQueryParam("icon", StringParam);
  const [iconVersion, setIconVersion] = useState<string>();
  const icon = useMemo(
    () => icons.find((icon) => icon.name === iconName),
    [iconName],
  );
  const [color, setColor] = useState<Color>();

  return (
    <Dialog
      open={!!iconName}
      onClose={() => setIconName(undefined)}
      maxWidth={"md"}
      fullWidth
    >
      {iconName && (
        <>
          <Title variant="h4" style={{ marginTop: 15 }}>
            {icon.name}
          </Title>
          <DialogContent>
            {icon && (
              <Colums>
                <IconPreview
                  iconName={icon.name}
                  iconVersion={iconVersion}
                  color={color}
                />
                <IconSettings
                  icon={icon}
                  iconVersion={iconVersion}
                  setIconVersion={setIconVersion}
                  color={color}
                  setColor={setColor}
                />
              </Colums>
            )}
          </DialogContent>
        </>
      )}
      <style jsx>{``}</style>
    </Dialog>
  );
}

const Colums = styled("div")({
  display: "grid",
  gridTemplateColumns: "220px calc(100% - 240px)",
});
