import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        secondary: '#595959',
        background: "var(--background)",
        foreground: "var(--foreground)",
        blue: '#007bff',
        green: '#27CDC0',
        // Optional: Define specific color stops if needed
        'dourado-start': '#FAE154',
        'dourado-end': '#E2B331',
        'azul-start': '#27CDC0',
        'azul-end': '#03C5F0',
      },
      backgroundImage: {
        'dourado': 'linear-gradient(to right, #FAE154, #E2B331)',
        'azulGradient': 'linear-gradient(to right, #27CDC0, #03C5F0)',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {
      opacity: ['group-hover', 'group-focus-within'],
    },
  },
  plugins: [],
} satisfies Config;
