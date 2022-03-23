import { NextApiRequest, NextApiResponse } from "next";
import icons from "public/devicon-git/devicon.json";

export default function ApiIndex(req: NextApiRequest, res: NextApiResponse) {
  res.send({ icons: icons.map((icon) => icon.name) });
}
