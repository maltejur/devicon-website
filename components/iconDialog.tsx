import { Dialog, DialogContent, IconButton } from "@mui/material";
import icons from "public/devicon-git/devicon.json";
import { StringParam, useQueryParam } from "next-query-params";
import { useMemo, useState } from "react";
import IconPreview from "./iconPreview";
import Title from "./title";
import IconSettings from "./iconSettings";
import Color from "color";
import { Close } from "@mui/icons-material";

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
          <div className="closeButton">
            <IconButton color="primary" onClick={() => setIconName(undefined)}>
              <Close />
            </IconButton>
          </div>
          <DialogContent>
            {icon && (
              <div className="columns">
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
              </div>
            )}
          </DialogContent>
        </>
      )}
      <style jsx>{`
        .columns {
          display: grid;
          grid-template-columns: 220px auto;
        }

        @media (max-width: 700px) {
          .columns {
            grid-template-columns: 100%;
            justify-items: center;
            gap: 30px;
          }
        }

        .closeButton {
          position: absolute;
          top: 15px;
          right: 15px;
        }
      `}</style>
    </Dialog>
  );
}
