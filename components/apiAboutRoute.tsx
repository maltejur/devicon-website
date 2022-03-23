import { ReactNode } from "react";

export default function ApiAboutRoute({
  name,
  url,
  urlparams,
  queryparams,
  example,
  children,
}: {
  name: string;
  url: string;
  urlparams?: { [key: string]: ReactNode };
  queryparams?: { [key: string]: ReactNode };
  example?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <fieldset id={name.toLowerCase().replace(/ /g, "-")}>
      <legend>
        <h3>{name}</h3>
      </legend>
      <pre>{url}</pre>
      {children}
      {urlparams && <ParamsTable params={urlparams} title="URL Parameters:" />}
      {queryparams && (
        <ParamsTable params={queryparams} title="Query Parameters:" />
      )}
      {example && (
        <>
          <h4>Example:</h4>
          {example}
        </>
      )}
    </fieldset>
  );
}

function ParamsTable({
  title,
  params,
}: {
  title: string;
  params: { [key: string]: ReactNode };
}) {
  return (
    <>
      <h4>{title}</h4>
      <table>
        {Object.entries(params).map(([key, value]) => (
          <tr key={key}>
            <td>
              <b>{key}</b>
            </td>
            <td>{value}</td>
          </tr>
        ))}
      </table>
    </>
  );
}
