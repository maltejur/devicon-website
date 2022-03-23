/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-css-tags */
import ApiAboutRoute from "components/apiAboutRoute";
import DeviconOriginalIcon from "react-devicons/devicon/original";

export default function ApiAbout() {
  return (
    <div className="root">
      <h1 className="title">
        <DeviconOriginalIcon />
        Devicon API Documentation
      </h1>
      <ApiAboutRoute
        name="Icon"
        url="/api/<ICON_NAME>/<ICON_VARIANT>.<FILETYPE>"
        urlparams={{
          ICON_NAME: "The name of the icon. (For example: 'devicon')",
          ICON_VARIANT: "The variant of the icon. (For example: 'original')",
          FILETYPE: (
            <>
              The image format that the icon should be converted to.
              <br />
              Possible values: <code>svg</code> or <code>png</code>. If you
              don&apos;t know which one to use, use <code>svg</code>.
            </>
          ),
        }}
        queryparams={{
          color: (
            <>
              Specifies a custom color for the icon. (optional)
              <br />
              Every valid CSS color code is valid here.
            </>
          ),
          size: "Specifies a custom size for the icon. (optional)",
        }}
        example={
          <>
            <p>
              <code>
                <a href="/api/devicon/plain.png?color=red&size=36px">
                  /api/devicon/plain.png?color=red&size=36px
                </a>
              </code>
            </p>
            <p>
              <img
                src="/api/devicon/plain.png?color=red&size=36px"
                alt="The resulting image"
              />
            </p>
          </>
        }
      >
        The main API route, it will serve you the icon you specify via a cached
        CDN. You can browse all the icons <a href="/">on the website</a> or{" "}
        <a href="#icon-list">list them programmatically</a>.
      </ApiAboutRoute>
      <ApiAboutRoute
        name="Icon Information"
        url="/api/<ICON_NAME>/index.json"
        urlparams={{
          ICON_NAME: "The name of the icon. (For example: 'devicon')",
        }}
      >
        Returns additional information about the icon (like available versions)
        in the following JSON format:
        <pre>
          {`{
  "icon": {
    "name": string,
    "tags": string[],
    "versions": {
      "svg": string[],
      "font": string[]
    },
    "color": string,
    "aliases": {
      "base": string,
      "alias": string
    }[]
  }
}`}
        </pre>
      </ApiAboutRoute>
      <ApiAboutRoute name="Icon List" url="/api/index.json">
        Returns a list of all available icons in the following format:
        <pre>
          {`{
  "icons": string[]
}`}
        </pre>
      </ApiAboutRoute>
      <ApiAboutRoute
        name="Information about all Icons"
        url="/devicon-git/devicon.json"
      >
        This is the unmodified <code>devicon.json</code>, containing a list all
        icons and all information about them in the following JSON format:
        <pre>
          {`{
  "name": string,
  "tags": string[],
  "versions": {
    "svg": string[],
    "font": string[]
  },
  "color": string,
  "aliases": {
    "base": string,
    "alias": string
  }[]
}[]`}
        </pre>
      </ApiAboutRoute>
      <link rel="stylesheet" href="/apiabout.css" />
    </div>
  );
}
