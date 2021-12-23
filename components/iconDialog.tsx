import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import icons from "devicon/devicon.json";
import { useMemo } from "react";
import IconPreview from "./iconPreview";
import Title from "./title";

export default function IconDialog({
  iconName,
  setIconName,
}: {
  iconName: string;
  setIconName: (iconName: string) => void;
}) {
  const icon = useMemo(
    () => icons.find((icon) => icon.name === iconName),
    [iconName]
  );

  return (
    <Dialog open={!!iconName} onClose={() => setIconName(undefined)} fullWidth>
      {iconName && (
        <>
          <DialogTitle>
            <Title variant="h4">{icon.name}</Title>
          </DialogTitle>
          <DialogContent>
            <IconPreview
              iconName={icon.name}
              iconVersion={icon.versions.svg[0]}
            />
          </DialogContent>
        </>
      )}
    </Dialog>
  );
}
