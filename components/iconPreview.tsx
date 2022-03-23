import Color from "color";
import { customizeSvg } from "lib/svg";
import { useMemo } from "react";
import { useAsyncMemo } from "use-async-memo";

export default function IconPreview({
  iconName,
  iconVersion,
  color,
}: {
  iconName: string;
  iconVersion: string;
  color: Color;
}) {
  const originalIcon = useAsyncMemo(
    () =>
      fetch(
        `/devicon-git/icons/${iconName}/${iconName}-${iconVersion}.svg`,
      ).then((res) => res.text()),
    [iconName, iconVersion],
  );

  const coloredIcon = useMemo(
    () =>
      originalIcon &&
      (color
        ? customizeSvg(originalIcon, { color: color?.hex() })
        : originalIcon),
    [originalIcon, color],
  );

  return (
    <div>
      <div className="iconFrame">
        <img
          className="checkerboard"
          src="/checkerboard.png"
          alt="Checkerboard"
        />
        {coloredIcon ? (
          <div
            className="icon"
            dangerouslySetInnerHTML={{ __html: coloredIcon }}
          />
        ) : (
          // Use already fetched image icon while loading
          <img
            className="icon"
            src={`/api/${iconName}/${iconVersion}.svg`}
            alt={`${iconName}/${iconVersion} icon`}
          />
        )}
      </div>
      <style jsx>{`
        .iconFrame {
          position: relative;
          width: 200px;
          height: 200px;
          float: left;
        }

        .checkerboard {
          width: 100%;
          height: 100%;
          image-rendering: pixelated;
        }

        .icon {
          position: absolute;
          top: 5%;
          left: 5%;
          right: 5%;
          bottom: 5%;
          width: 90%;
          height: 90%;
        }

        .icon :global(svg) {
          width: 100%;
          height: 100%;
          transition: background 0.1s linear;
        }
      `}</style>
    </div>
  );
}
