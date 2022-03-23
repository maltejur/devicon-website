import { Button, ButtonGroup } from "@mui/material";
import { ReactNode } from "react";

export default function ButtonSelect({
  options,
  value,
  onChange,
}: {
  options: Record<string, ReactNode>;
  value: string;
  onChange: (newValue: string) => void;
}) {
  return (
    <ButtonGroup>
      {Object.entries(options).map(([id, children]) => (
        <Button
          key={id}
          color="primary"
          variant={id === value ? "contained" : "outlined"}
          onClick={() => onChange(id)}
        >
          {children}
        </Button>
      ))}
    </ButtonGroup>
  );
}
