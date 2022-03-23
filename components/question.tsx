import { QuestionMark } from "@mui/icons-material";
import { ReactNode } from "react";

export default function Question({
  children,
  symbol = "?",
}: {
  children: ReactNode;
  symbol?: string;
}) {
  return (
    <div className="root">
      <div className="badge">{symbol}</div>
      {children}
      <style jsx>{`
        .root {
          display: flex;
          align-items: center;
          margin-bottom: 5px;
        }

        .badge {
          width: 18px;
          height: 18px;
          background-color: #60be86;
          color: white;
          border-radius: 50%;
          text-align: center;
          font-size: 12px;
          margin-right: 5px;
          user-select: none;
        }
      `}</style>
    </div>
  );
}
