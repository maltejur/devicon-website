import { Card, IconButton, styled, Typography } from "@mui/material";
import icons from "public/devicon-git/devicon.json";
import { Icon } from "lib/types";
import { StringParam, useQueryParam } from "next-query-params";
import { ContentCopy } from "@mui/icons-material";

export default function IconGallery() {
  const [iconName, setIconName] = useQueryParam("icon", StringParam);
  const [searchQuery, setSearchQuery] = useQueryParam("q", StringParam);

  return (
    <div className="grid">
      {icons
        .filter(
          (icon: Icon) =>
            !searchQuery ||
            icon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            icon.tags.find((tag) =>
              tag.toLowerCase().includes(searchQuery.toLowerCase()),
            ),
        )
        .map((icon) => (
          <a
            className="iconBox"
            key={icon.name}
            href={`?icon=${icon.name}`}
            onClick={(event) => {
              event.preventDefault();
              setIconName(icon.name);
            }}
            draggable={false}
          >
            <Card>
              <img
                className="iconImage"
                src={`/api/${icon.name}/${icon.versions.svg[0]}.svg`}
                alt={`${icon.name} ${icon.versions.svg[0]} icon`}
              />
              <Typography
                className="iconName"
                color="GrayText"
                variant="caption"
              >
                {icon.name}
              </Typography>
            </Card>
          </a>
        ))}
      <style jsx>{`
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, 150px);
          width: 100%;
          gap: 30px;
          justify-content: center;
        }

        .iconBox {
          text-decoration: none;
        }

        .iconBox > :global(div) {
          padding: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          transition: background-color 0.2s ease, box-shadow 0.2s ease;
        }

        .iconBox > :global(div):hover {
          background-color: rgba(0, 0, 0, 0.04);
          box-shadow: 3px 5px 0 0 rgba(0, 0, 0, 0.08);
        }

        .iconImage {
          margin-bottom: 15px;
        }
      `}</style>
    </div>
  );
}
