import { TextField } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";

export default function ColorPicker({
  color,
  setColor
}: {
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="root">
      <HexColorPicker
        color={color}
        onChange={(newColor) => setColor(newColor)}
      />
      <style jsx>{`
        .root {
        }

        .root :global(.react-colorful) {
          height: 120px;
        }
      `}</style>
    </div>
  );
}
