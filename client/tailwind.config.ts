import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: "class",
  theme: {
      screens: {
        xl: "1700px",        //PC
        lg: "1280px",        //Tablet
        'lg-md': '1000px', // breakpoint between lg and md
        md: "768px",         //TabletSm
        sm: "420px",         //Smartphones
        xs: "280px",         //SmartphonesSm
      },
    extend: {

      fontFamily: {
        Roboto: ["Roboto", "sans-serif"],
        Pacifico: ["Pacifico", "cursive"],
        Satisfy: ["Satisfy", "cursive"],
        Caveat: ["Caveat", "cursive"],
        Rubik: ["Rubik", "sans-serif"],
        Cairo: ['Cairo', 'sans-serif']
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
}
export default config