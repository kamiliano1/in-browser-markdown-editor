import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    colors: {
      1000: "hsl(225, 9%, 9%)",
      900: "hsl(216, 8%, 12%)",
      800: "hsl(220, 7%, 18%)",
      700: "hsl(216, 9%, 23%)",
      600: "hsl(216, 8%, 38%)",
      500: "hsl(213, 4%, 51%)",
      400: "hsl(222, 9%, 78%)",
      300: "hsl(0, 0%, 89%)",
      200: "hsl(0, 0%, 96%)",
      100: "hsl(0, 0%, 100%)",
      orange: "hsl(13, 75%, 58%)",
      orangeHover: "hsl(21, 86%, 67%)",
    },
    fontSize: {
      headingM: [
        ".9375rem",
        {
          fontWeight: "400",
        },
      ],
      headingS: [
        ".8725rem",
        {
          fontWeight: "500",
          letterSpacing: "2px",
        },
      ],
      bodyM: [
        ".8125rem",
        {
          fontWeight: "300",
        },
      ],
      previewH1: [
        "2rem",
        {
          fontWeight: "700",
        },
      ],
      previewH2: [
        "1.75rem",
        {
          fontWeight: "300",
        },
      ],
      previewH3: [
        "1.5rem",
        {
          fontWeight: "700",
        },
      ],
      previewH4: [
        "1.25rem",
        {
          fontWeight: "700",
        },
      ],
      previewH5: [
        "1rem",
        {
          fontWeight: "700",
        },
      ],
      previewH6: [
        ".875rem",
        {
          fontWeight: "700",
        },
      ],
      previewParagraph: [
        ".875rem",
        {
          lineHeight: "171.429%",
          fontWeight: "400",
        },
      ],
      previewParagraphBold: [
        ".875rem",
        {
          lineHeight: "171.429%",
          fontWeight: "700",
        },
      ],
      markdown: [
        ".875rem",
        {
          lineHeight: "171.429%",
          fontWeight: "400",
        },
      ],
    },
    extend: {
      fontFamily: {
        roboto: ["var(--font-roboto)"],
        robotoSlab: ["var(--font-roboto-slab)"],
        robotoMono: ["var(--font-roboto-mono)"],
      },
      keyframes: {
        overlayShow: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        contentShow: {
          from: {
            opacity: "0",
            transform: "translate(-50%, -48%) scale(0.96)",
          },
          to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
        },
        sidebarOpen: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-250px)" },
        },
        sidebarClose: {
          from: { transform: "translateX(-250px)" },
          to: { transform: "translateX(0)" },
        },
      },
      animation: {
        overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        sidebarOpen: "sidebarOpen 700ms cubic-bezier(0.16, 1, 0.3, 1)",
        sidebarClose: "sidebarClose 700ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
