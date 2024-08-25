/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    container: {
      center:true,
      padding:"1rem"
    },
    extend: {
      colors:{
        abi:"#4d0de5",
        skyabi:"#7da1f7",
        zard:"#fae362",
        
      }
    },
  },
  plugins: [],
};
