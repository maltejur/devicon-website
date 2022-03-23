import ReactDOMServer from "react-dom/server";
import { NextApiRequest, NextApiResponse } from "next";
import ApiAbout from "components/apiAbout";

export default function ApiIndex(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Cache-Control", "s-maxage=604800");
  res.send(ReactDOMServer.renderToString(<ApiAbout />));
}
