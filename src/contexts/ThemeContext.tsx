import React, { createContext, useContext, useState } from "react";

export enum Bg {
  one = "#FFFFFF",
  two = "#F8F9FA",
  three= "#F5FAFF",
  four = "#FFFCE8",
  five = "#FDF8F6",
  six = "#121212",
  seven = "#161718",
  eight = "#13171C",
  nine = "#181605",
  ten = "#1B1615"
}

export enum Stroke {
  red = "red",
  black = "black",
  green = "green",
}

interface ThemeContextProps {
  bgColor: Bg;
  setBgColor: React.Dispatch<React.SetStateAction<Bg>>;
  strokeColor: Stroke;
  setStrokeColor: React.Dispatch<React.SetStateAction<Stroke>>;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bgColor, setBgColor] = useState<Bg>(Bg.ten);
  const [strokeColor, setStrokeColor] = useState<Stroke>(Stroke.red);

  return (
    <ThemeContext.Provider value={{ bgColor, setBgColor, strokeColor, setStrokeColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};