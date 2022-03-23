import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import { firstLetterUpperCase, pascalCase } from "lib/cases";
import { Icon } from "lib/types";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import ButtonSelect from "./buttonSelect";
import ColorPicker from "./colorPicker";
import Color from "color";
import Question from "./question";

export default function IconSettings({
  icon,
  iconVersion,
  setIconVersion,
  color,
  setColor,
}: {
  icon: Icon;
  iconVersion: string;
  setIconVersion: Dispatch<SetStateAction<string>>;
  color: Color;
  setColor: Dispatch<SetStateAction<Color>>;
}) {
  const [usageType, setUsageType] = useState("svg");
  const availableVersions = useMemo(
    () => icon?.versions[usageType === "font" ? "font" : "svg"],
    [icon, usageType],
  );
  useEffect(
    () => setIconVersion(availableVersions ? availableVersions[0] : undefined),
    [availableVersions, setIconVersion],
  );
  useEffect(() => {
    if (!iconVersion?.startsWith("plain")) setColor(undefined);
  }, [iconVersion, setColor]);

  return (
    <div className="root">
      <div className="section">
        <Question>How do you want to use the icon</Question>
        <ButtonSelect
          options={{ svg: "SVG", font: "Font", rc: "React Component" }}
          value={usageType}
          onChange={(newValue) => setUsageType(newValue)}
        />
      </div>
      <div className="section">
        <Question>What version of the icon do you want to use</Question>
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
                ),
              }))
              .reduce((acc, cur) => ({
                ...acc,
                ...cur,
              }))}
            value={iconVersion}
            onChange={(newValue) => setIconVersion(newValue)}
          />
        </div>
      </div>
      {icon.versions.font.includes(iconVersion) && (
        <div className="section">
          <Question>What color should the icon be</Question>
          <RadioGroup
            row
            value={color ? "custom" : "original"}
            onChange={(event) =>
              setColor(
                event.target.value === "original"
                  ? undefined
                  : new Color(icon.color),
              )
            }
          >
            <FormControlLabel
              value="original"
              control={<Radio />}
              label="Original"
            />
            <FormControlLabel
              value="custom"
              control={<Radio />}
              label="Custom"
            />
          </RadioGroup>
          {color && <ColorPicker color={color} setColor={setColor} />}
        </div>
      )}
      <div className="section">
        <Question symbol="!">To use the icon</Question>
        {usageType === "svg" && (
          <>
            <pre>
              <div className="line">
                <span style={{ color: "darkred" }}>&lt;img</span>
                <span style={{ color: "red" }}> src</span>
                <span>=</span>
                <span style={{ color: "blue" }}>
                  &quot;{window.location.protocol}
                  {"//"}
                  {window.location.host}/api/
                  {icon.name}/{iconVersion}.svg
                  {color ? `?color=${encodeURIComponent(color?.hex())}` : ""}
                  &quot;
                </span>
                <span style={{ color: "darkred" }}>&gt;&lt;/img&gt;</span>
              </div>
            </pre>
            <small>
              Or just{" "}
              <a
                download
                href={`/api/${icon.name}/${iconVersion}.svg${
                  color ? `?color=${encodeURIComponent(color?.hex())}` : ""
                }`}
              >
                download the icon.
              </a>
            </small>
          </>
        )}

        {usageType === "font" && (
          <pre>
            <div className="line">
              <span style={{ color: "darkred" }}>&lt;i</span>
              <span style={{ color: "red" }}> class</span>
              <span>=</span>
              <span style={{ color: "blue" }}>
                &quot;devicon-{icon.name}-{iconVersion}&quot;
              </span>
              {color && (
                <>
                  <span style={{ color: "red" }}> style</span>
                  <span>=</span>
                  <span style={{ color: "blue" }}>
                    &quot;color: {color?.hex()}&quot;
                  </span>
                </>
              )}
              <span style={{ color: "darkred" }}>&gt;&lt;/i&gt;</span>
            </div>
            <div className="line">
              <span style={{ color: "green" }}>
                &lt;!-- Place this in your header --&gt;
              </span>
            </div>
            <div className="line">
              <span style={{ color: "darkred" }}>&lt;link</span>
              <span style={{ color: "red" }}> rel</span>
              <span>=</span>
              <span style={{ color: "blue" }}>&quot;stylesheet&quot;</span>
              <span style={{ color: "red" }}> href</span>
              <span>=</span>
              <span style={{ color: "blue" }}>
                &quot;https://cdn.jsdelivr.net/gh/devicons/devicon@v2.14.0/devicon.min.css&quot;
              </span>
              <span style={{ color: "darkred" }}>&gt;</span>
            </div>
          </pre>
        )}

        {usageType === "rc" && (
          <>
            <small>
              Install{" "}
              <a href="https://github.com/devicons/react-devicons">
                react-devicons
              </a>{" "}
              from npm and then:
            </small>
            <pre>
              <div className="line">
                <span style={{ color: "blue" }}>import </span>
                <span>{pascalCase(`${icon.name}-${iconVersion}`)}</span>
                <span style={{ color: "blue" }}> from </span>
                <span style={{ color: "darkred" }}>
                  &quot;react-devicons/{icon.name}/{iconVersion}&quot;
                </span>
                <span>;</span>
              </div>
              <div className="line">
                <br />
              </div>
              <div className="line">
                {color ? (
                  <>
                    <span style={{ color: "darkred" }}>
                      &lt;{pascalCase(`${icon.name}-${iconVersion}`)}
                    </span>
                    <span style={{ color: "red" }}> color</span>
                    <span>=</span>
                    <span style={{ color: "darkred" }}>
                      &quot;{color?.hex()}&quot; /&gt;
                    </span>
                  </>
                ) : (
                  <span style={{ color: "darkred" }}>
                    &lt;{pascalCase(`${icon.name}-${iconVersion}`)} /&gt;
                  </span>
                )}
              </div>
            </pre>
          </>
        )}
      </div>
      <style jsx>{`
        .root {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .section {
          margin-bottom: 20px;
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
          margin-left: 25px;
        }

        pre .line {
          counter-increment: line;
          width: 100%;
          white-space: pre-wrap;
          position: relative;
        }

        pre .line::before {
          content: counter(line);
          position: absolute;
          left: -25px;
          color: gray;
        }

        small {
          font-size: 14px;
          display: block;
          margin: 10px 0;
        }
      `}</style>
    </div>
  );
}
