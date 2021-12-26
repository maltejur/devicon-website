import { NextApiRequest, NextApiResponse } from "next";
import icons from "public/devicon-git/devicon.json";
import fs from "fs";
import { ElementCompact, js2xml, xml2js } from "xml-js";
import sharp from "sharp";
import path from "path";
import { customizeSvg } from "lib/svg";

export default async function Icon(req: NextApiRequest, res: NextApiResponse) {
  const icon = icons.find((icon) => icon.name === req.query.icon);
  if (!icon) {
    res.status(404).json({
      error: "icon-not-found",
      message: `Icon '${req.query.icon}' not found`,
    });
    return;
  }
  const splitVersion = req.query.version.toString().split(".");
  const format = splitVersion.length === 1 ? "svg" : splitVersion.pop();
  const version = splitVersion.join(".");
  if (!icon.versions.svg.find((el) => el === version)) {
    res.status(404).json({
      error: "version-not-found",
      message: `Version '${req.query.version}' of icon '${icon.name}' not found`,
    });
    return;
  }
  const { color, size } = req.query;
  let file = await fs.promises.readFile(
    path.resolve(
      `./public/devicon-git/icons/${icon.name}/${icon.name}-${version}.svg`
    )
  );
  if (color || size) {
    file = Buffer.from(
      customizeSvg(file, { color: color?.toString(), size: size?.toString() })
    );
  }
  // Let vercel cache the icon for a week
  // https://vercel.com/docs/concepts/edge-network/headers#cache-control-header
  res.setHeader("Cache-Control", "s-maxage=604800");
  switch (format) {
    case "svg":
      res.setHeader("Content-Type", "image/svg+xml");
      res.send(file);
      break;

    case "png":
      res.setHeader("Content-Type", "image/png");
      res.send(await sharp(file).png().toBuffer());
      break;

    default:
      res.status(400).json({
        error: "invalid-format",
        message: `Invalid file format '${format}'`,
      });
      break;
  }
}
