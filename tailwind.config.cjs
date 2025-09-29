module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        gradient: {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" }
        }
      },
      animation: {
        gradient: "gradient 12s ease infinite"
      }
    }
  },
  plugins: []
};
