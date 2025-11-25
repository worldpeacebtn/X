export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        holoBlue: "#00ffff",
        holoPurple: "#c700ff",
        holoPink: "#ff007f",
      },
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
      },
          boxShadow: {
      neon: "0 0 15px #00ffff, 0 0 30px #00ffff, 0 0 50px #00ffff",
    },
  },
  plugins: [],
};
