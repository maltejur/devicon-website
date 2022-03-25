import ReactDOMServer from "react-dom/server";
import { NextApiRequest, NextApiResponse } from "next";
import ApiAbout from "components/apiAbout";

export default function ApiIndex(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Cache-Control", "s-maxage=604800");
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Devicon API Documentation</title>
</head>
<body>
  ${ReactDOMServer.renderToString(<ApiAbout />)}
</body>
</html>`);
}
