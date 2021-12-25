import styled from "@emotion/styled";

export default function IconPreview({
  iconName,
  iconVersion,
}: {
  iconName: string;
  iconVersion: string;
}) {
  return (
    <div>
      <IconFrame>
        <Checkerboard src="/checkerboard.png" alt="Checkerboard" />
        <Icon
          src={`/api/${iconName}/${iconVersion}`}
          alt={`${iconName}/${iconVersion} icon`}
        />
      </IconFrame>
    </div>
  );
}

const IconFrame = styled("div")({
  position: "relative",
  width: "200px",
  height: "200px",
  float: "left",
});

const Checkerboard = styled("img")({
  width: "100%",
  height: "100%",
  imageRendering: "pixelated",
});

const Icon = styled("img")({
  position: "absolute",
  top: "5%",
  left: "5%",
  right: "5%",
  bottom: "5%",
  width: "90%",
  height: "90%",
});
