import {
  Button,
  FormControl,
  FormControlLabel,
  Input,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import Color from "color";

export default function ColorPicker({
  color,
  setColor,
}: {
  color: Color;
  setColor: Dispatch<SetStateAction<Color>>;
}) {
  const hexRef = useRef<HTMLInputElement>();
  const [hexEdited, setHexEdited] = useState(false);
  const [hexError, setHexError] = useState(false);

  useEffect(() => {
    if (hexRef.current) hexRef.current.value = color.hex();
    setHexEdited(false);
    setHexError(false);
  }, [color]);

  return (
    <div className="root">
      <HexColorPicker
        color={color?.hex()}
        onChange={(newColor) => setColor(new Color(newColor))}
      />
      <TextField
        label="HEX-Code"
        inputRef={hexRef}
        onChange={() => setHexEdited(true)}
        color={hexError ? "error" : "primary"}
        InputProps={
          hexEdited
            ? {
                endAdornment: (
                  <Button
                    variant="contained"
                    onClick={() => {
                      try {
                        setColor(new Color(hexRef.current.value));
                      } catch {
                        setHexError(true);
                      }
                    }}
                  >
                    Apply
                  </Button>
                ),
              }
            : {}
        }
      />
      <div className="row">
        <TextField
          label="Red"
          type="number"
          value={color?.red()}
          onChange={(event) =>
            setColor(
              Color.rgb(
                Number(event.target.value),
                color.green(),
                color.blue(),
              ),
            )
          }
        />
        <TextField
          label="Green"
          type="number"
          value={color?.green()}
          onChange={(event) =>
            setColor(
              Color.rgb(color.red(), Number(event.target.value), color.blue()),
            )
          }
        />
        <TextField
          label="Blue"
          type="number"
          value={color?.blue()}
          onChange={(event) =>
            setColor(
              Color.rgb(color.red(), color.green(), Number(event.target.value)),
            )
          }
        />
      </div>
      <style jsx>{`
        .root {
          display: grid;
          grid-template-columns: auto 200px;
          gap: 20px;
          margin-top: 10px;
        }

        .root :global(.react-colorful) {
          height: auto;
          width: 200px;
          grid-row-start: 1;
          grid-row-end: 3;
          grid-column: 2;
        }

        .row {
          display: flex;
          align-items: flex-start;
          gap: 20px;
        }
      `}</style>
    </div>
  );
}
