export default function Footer() {
  return (
    <div className="root">
      <p className="center">
        Originally created by Konpa (under MIT License) and
        <br />
        supported by various contributors.
        <br />
        Copyright © 2015 Konpa
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
        }

        .center {
          text-align: center;
        }

        small {
          display: block;
        }
      `}</style>
    </div>
  );
}
