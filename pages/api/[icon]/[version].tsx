import { NextApiRequest, NextApiResponse } from "next";
import icons from "devicon/devicon.json";
import fs from "fs";
import { ElementCompact, js2xml, xml2js } from "xml-js";
import sharp from "sharp";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const icon = icons.find((icon) => icon.name === req.query.icon);
  if (!icon) {
    res.status(404).json({
      error: "icon-not-found",
      message: `Icon '${req.query.icon}' not found`,
    });
    return;
  }
  if (!icon.versions.svg.find((version) => version === req.query.version)) {
    res.status(404).json({
      error: "version-not-found",
      message: `Version '${req.query.version}' of icon '${icon.name}' not found`,
    });
    return;
  }
  const { color, size, format = "svg" } = req.query;
  let file = await fs.promises.readFile(
    `./node_modules/devicon/icons/${icon.name}/${icon.name}-${req.query.version}.svg`
  );
  if (color || size) {
    const svg: ElementCompact = xml2js(file.toString(), {
      compact: true,
    });
    if (color) {
      walkSvg(svg, (element) => {
        if (element._attributes) {
          delete element._attributes.fill;
          delete element._attributes.stroke;
        }
      });
      svg.svg._attributes.fill = color;
    }
    if (size) {
      svg.svg._attributes.width = size;
      svg.svg._attributes.height = size;
    }
    file = Buffer.from(js2xml(svg, { compact: true }));
  }
  // Let vercel cache the icon for a week
  // https://vercel.com/docs/concepts/edge-network/headers#cache-control-header
  res.setHeader("Cache-Control", "s-maxage=604800");
  res.setHeader("Content-Type", "image/svg+xml");
  if (format !== "svg") {
    switch (format) {
      case "png":
        res.setHeader("Content-Type", "image/png");
        file = await sharp(file).png().toBuffer();
        break;

      default:
        res.status(400).json({ error: "Invalid format" });
        break;
    }
  }
  res.send(file);
}

function walkSvg(
  svg: ElementCompact,
  callback: (element: ElementCompact) => void
) {
  let queue = [svg];
  while (queue.length > 0) {
    const element = queue.shift()!;
    callback(element);
    queue = queue.concat(
      Object.entries(element)
        .filter(([key, _]) => !key.startsWith("_"))
        .flatMap(([_, element]) =>
          element.length !== undefined ? element : [element]
        )
    );
  }
}
