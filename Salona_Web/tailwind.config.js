/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        scaleSpinOpacity: {
          from: {
            opacity: 0,
            transform: 'rotate(-270deg) scale(0.3)'
          },
          to: {
            opacity: 1,
            transform: 'rotate(0deg) scale(1)'
          }
        },
        customOpacity:{
          from:{
            opacity:0,
            transform:"translateX(100px)",
          },
          to:{
            transform:"translateX(0px)",
            opacity:1
          }
        },
        leftRightOpacity:{
          from:{
            opacity:0,
            transform:"translateX(100px)",
          },
          to:{
            transform:"translateX(0px)",
            opacity:1
          }
        },
        downTopOpacity:{
          from:{
            opacity:0,
            transform:"translateY(100px)",
          },
          to:{
            transform:"translateY(0px)",
            opacity:1
          }
        },
        loadingStrip:{
          from:{
            width:0
          },
          to:{
            width:"100%"
          }
        }
      },
      animation: {
        scaleSpinOpacity: 'scaleSpinOpacity 2.5s ease-in-out',
        leftRightOpacity: "leftRightOpacity 2.5s ease-out",
        downTopOpacity: "downTopOpacity 2.5s ease-out",
        customOpacity: "customOpacity 2.5s ease-out",
        loadingStrip:"loadingStrip 2.5s ease-in-out"
      },
      colors: {
        background: 'rgba(244,247,254,1)',
        card: 'white',
        accent: 'rgba(33, 161, 220,1)',
        heading: 'rgba(43,54,116,1)',
        subheading: 'rgba(163,174,208,1)',
        gold:'#d4af37'
      }
    }
  },
  plugins: [],
}

