import React from "react";

export type ContextTypes = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};
