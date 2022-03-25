import DeviconOriginalWordmarkIcon from "react-devicons/devicon/original-wordmark";

export default function Footer() {
  return (
    <div className="root">
      <DeviconOriginalWordmarkIcon size="100px" />
      <p className="center">
        Originally created by <a href="https://github.com/konpa">Konpa</a>{" "}
        (under{" "}
        <a href="https://github.com/devicons/devicon/blob/master/LICENSE">
          MIT License
        </a>
        ) and
        <br />
        supported by various{" "}
        <a href="https://github.com/devicons/devicon/graphs/contributors">
          contributors
        </a>
        .
        <br />
        Copyright © 2015 <a href="https://github.com/konpa">Konpa</a>
      </p>

      <p>
        Final font build with <a href="https://icomoon.io/">Icomoon</a>
      </p>

      <p className="center">
        If you have any legal concerns regarding copyrights or want to report an
        abuse, please reach out to us at{" "}
        <a href="mailto:info@devicon.dev">info@devicon.dev</a>. Any code/logo
        contributions should be made through our GitHub repository listed above.
      </p>

      <small>
        All product names, logos, and brandsare property of their respective
        owners. All company, product and service names used in this website are
        for identification purposes only. Usage of these names, logos, and
        brands does not imply endorsement of Devicon or its members. All
        icons/SVGs in this project are not monetized in anyway. It is up to the
        user to use the logo properly according to the company/group&apos;s
        brand policy. Usage of this site or any icons/SVGs from Devicon means
        acknowledgement of these conditions.
      </small>
      <style jsx>{`
        .root {
          max-width: 800px;
          margin: 50px auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .root :global(svg) {
          opacity: 30%;
        }

        .center {
          text-align: center;
          max-width: 600px;
        }

        small {
          display: block;
          text-align: justify;
        }
      `}</style>
    </div>
  );
}
