import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          primary: "#000000",
          secondary: "#717171",
          tertiary: "#AFAFAF",
          disable: "#D8D8D8",
        },
        light: {
          primary: "#ffffff",
          secondary: "#F9F9F9",
          tertiary: "#F2F2F2",
          disable: "#D8D8D8",
        },
        background: {
          DEFAULT: "hsl(var(--background))",
          secondary: "#F9F9F9",
          tertiary: "#F2F2F2",
        },
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: {
          DEFAULT: "hsl(var(--border))",
          primary: "#E4E4E4",
          secondary: "#AFAFAF",
          tertiary: "#000000",
        },
        action: {
          primary: {
            base: "#000000",
            hover: "#717171",
            active: "#4B4B4B",
            disable: "#F9F9F9",
            selected: "#4B4B4B",
          },
          secondary: {
            base: "#ffffff",
            base2: "#F2F2F2",
            hover: "#E8E8E8",
            active: "#E4E4E4",
            disable: "#F9F9F9",
            selected: "#F2F2F2",
          },
          outline: {
            base: "#E4E4E4",
            base2: "#000000",
            hover: "#000000",
            active: "#717171",
            disable: "#F2F2F2",
            selected: "#AFAFAF",
          },
          destructive: {
            base: "#BF6F6F",
            hover: "#AF4B4B",
            active: "#8C3C3C",
            disable: "#AF4B4B",
            selected: "#EFDBDB",
          },
        },
        interaction: {
          primary: {
            base: "#000000",
            hover: "#717171",
            active: "#4B4B4B",
            disable: "#F9F9F9",
            selected: "#4B4B4B",
          },
          secondary: {
            base: "#FFFFFF",
            hover: "#F2F2F2",
            active: "#E4E4E4",
            disable: "#F9F9F9",
            selected: "#F2F2F2",
          },
          outline: {
            base: "#D8D8D8",
            hover: "#717171",
            active: "#000000",
            disable: "#E8E8E8",
            selected: "#AFAFAF",
          },
        },
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
