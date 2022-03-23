import { NextApiRequest, NextApiResponse } from "next";
import icons from "public/devicon-git/devicon.json";

export default function IconIndex(req: NextApiRequest, res: NextApiResponse) {
  const icon = icons.find((icon) => icon.name === req.query.icon);
  if (!icon) {
    res.status(404).json({
      error: "icon-not-found",
      message: `Icon '${req.query.icon}' not found`,
    });
    return;
  }
  res.send({ icon });
}
