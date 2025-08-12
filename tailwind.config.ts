import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef3ff',
          100: '#fce7ff',
          200: '#fbcffe',
          300: '#f9a8fe',
          400: '#f671fc',
          500: '#ed3cf4',
          600: '#d818d6',
          700: '#b312ae',
          800: '#92108d',
          900: '#751272',
          950: '#4e024b',
        },
        accent: {
          50: '#eefbff',
          100: '#d8f5ff',
          200: '#b9efff',
          300: '#89e7ff',
          400: '#52d7ff',
          500: '#2abbff',
          600: '#1c9fff',
          700: '#147beb',
          800: '#1762be',
          900: '#195295',
          950: '#13335a',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #FF006E 0%, #8338EC 50%, #3A86FF 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)',
        'gradient-tertiary': 'linear-gradient(135deg, #08AEEA 0%, #2AF598 100%)',
        'gradient-vibrant': 'linear-gradient(135deg, #F72585 0%, #7209B7 50%, #560BAD 100%)',
        'gradient-electric': 'linear-gradient(135deg, #00F5FF 0%, #00BBFF 50%, #8B5CF6 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #FA8BFF 0%, #2BD2FF 50%, #2BFF88 100%)',
        'gradient-neon': 'linear-gradient(135deg, #FFAA00 0%, #FF00AA 50%, #00AAFF 100%)',
        'gradient-aurora': 'linear-gradient(135deg, #00FFFF 0%, #FF00FF 50%, #FFFF00 100%)',
        'gradient-royal': 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
        'gradient-cosmic': 'linear-gradient(135deg, #B794F4 0%, #F687B3 50%, #FBB6CE 100%)',
        'gradient-mesh': 'radial-gradient(at 40% 20%, hsla(280, 100%, 74%, 0.8) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189, 100%, 56%, 0.8) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(355, 100%, 93%, 0.8) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(340, 100%, 76%, 0.8) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(224, 100%, 88%, 0.8) 0px, transparent 50%), radial-gradient(at 80% 100%, hsla(242, 100%, 70%, 0.8) 0px, transparent 50%), radial-gradient(at 0% 0%, hsla(343, 100%, 76%, 0.8) 0px, transparent 50%)',
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'blob': 'blob 7s infinite',
        'rain': 'rain 1.5s linear infinite',
        'scroll-up': 'scroll-up 20s linear infinite',
        'scan': 'scan 8s linear infinite',
      },
      keyframes: {
        'gradient-y': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center center'
          }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
        rain: {
          '0%': {
            transform: 'translateY(-100vh)',
            opacity: '0',
          },
          '10%': {
            opacity: '1',
          },
          '90%': {
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(100vh)',
            opacity: '0',
          },
        },
        'scroll-up': {
          '0%': {
            transform: 'translateY(0)',
          },
          '100%': {
            transform: 'translateY(-50%)',
          },
        },
        scan: {
          '0%': {
            transform: 'translateY(0)',
          },
          '100%': {
            transform: 'translateY(100vh)',
          },
        }
      },
      boxShadow: {
        'glow': '0 0 20px rgba(14, 165, 233, 0.5)',
        'glow-lg': '0 0 40px rgba(14, 165, 233, 0.5)',
        'inner-glow': 'inset 0 0 20px rgba(14, 165, 233, 0.2)',
      }
    },
  },
  plugins: [],
}

export default config