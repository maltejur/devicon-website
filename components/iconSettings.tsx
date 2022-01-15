import { Tooltip, Typography } from "@mui/material";
import { firstLetterUpperCase, pascalCase } from "lib/cases";
import { Icon } from "lib/types";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import ButtonSelect from "./buttonSelect";
import ColorPicker from "./colorPicker";

export default function IconSettings({
  icon,
  iconVersion,
  setIconVersion,
  color,
  setColor
}: {
  icon: Icon;
  iconVersion: string;
  setIconVersion: Dispatch<SetStateAction<string>>;
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
}) {
  const [usageType, setUsageType] = useState("svg");
  const availableVersions = useMemo(
    () => icon?.versions[usageType === "font" ? "font" : "svg"],
    [icon, usageType]
  );
  useEffect(
    () => setIconVersion(availableVersions ? availableVersions[0] : undefined),
    [availableVersions, setIconVersion]
  );
  useEffect(() => {
    if (!iconVersion?.startsWith("plain")) setColor(undefined);
  }, [iconVersion, setColor]);

  return (
    <div className="root">
      <div className="subheading">How do you want to use the icon?</div>
      <ButtonSelect
        options={{ svg: "SVG", font: "Font", rc: "React Component" }}
        value={usageType}
        onChange={(newValue) => setUsageType(newValue)}
      />
      <div className="subheading">
        What version of the icon do you want to use?
      </div>
      <div className="versionSelect">
        <ButtonSelect
          options={availableVersions
            .map((version) => ({
              [version]: (
                <Tooltip title={version}>
                  <img
                    src={`/api/${icon.name}/${version}.svg`}
                    alt={`${icon.name}/${version} icon`}
                  />
                </Tooltip>
              )
            }))
            .reduce((acc, cur) => ({
              ...acc,
              ...cur
            }))}
          value={iconVersion}
          onChange={(newValue) => setIconVersion(newValue)}
        />
      </div>
      {icon.versions.font.includes(iconVersion) && (
        <>
          <div className="subheading">What color should the icon be?</div>
          <ColorPicker color={color} setColor={setColor} />
        </>
      )}
      <div className="subheading">To use the icon:</div>
      <pre>
        {usageType === "svg" &&
          `<img src="${window.location.protocol}//${window.location.host}/api/${
            icon.name
          }/${iconVersion}.svg${
            color ? `?color=${encodeURIComponent(color)}` : ""
          }" />`}
        {usageType === "font" &&
          `<i class="devicon-${icon.name}-${iconVersion}"${
            color ? ` style="color:${color}"` : ""
          }></i>
<!-- Place this in your header -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.14.0/devicon.min.css">`}
        {usageType === "rc" &&
          `import ${pascalCase(
            `${icon.name}-${iconVersion}`
          )} from "react-devicons/${icon.name}/${iconVersion}";

<${pascalCase(`${icon.name}-${iconVersion}`)}${
            color ? ` color="${color}"` : ""
          } />`}
      </pre>
      <style jsx>{`
        .root {
          display: flex;
          flex-direction: column;
          width: 100%;
          margin-top: -15px;
        }

        .subheading {
          margin-top: 15px;
        }

        .versionSelect :global(.MuiButton-root) {
          padding: 0;
        }

        .versionSelect :global(img) {
          padding: 10px 15px;
          width: calc(48px + 15px);
          height: calc(48px + 10px);
        }

        pre {
          background-color: rgba(0, 0, 0, 0.05);
          padding: 10px;
          border-radius: 5px;
          margin: 0;
          font-size: 13px;
          width: 100%;
          overflow: auto;
        }
      `}</style>
    </div>
  );
}
