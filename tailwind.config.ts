import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    plugin(({ addBase }) => {
      addBase({
        ':root': {
          '--background': '0 0% 100%',
          '--foreground': '222 47% 11%',
          '--card': '0 0% 100%',
          '--card-foreground': '222 47% 11%',
          '--popover': '0 0% 100%',
          '--popover-foreground': '222 47% 11%',
          '--primary': '190 100% 50%',
          '--primary-foreground': '255 255 255',
          '--secondary': '340 82% 52%',
          '--secondary-foreground': '255 255 255',
          '--muted': '210 40% 98%',
          '--muted-foreground': '215 20% 65%',
          '--accent': '45 100% 51%',
          '--accent-foreground': '255 255 255',
          '--destructive': '0 79% 63%',
          '--destructive-foreground': '255 255 255',
          '--border': '214 47% 23%',
          '--input': '214 47% 23%',
          '--ring': '190 100% 50%',
          '--radius': '8px',
        },
        '.dark': {
          '--background': '222 47% 11%',
          '--foreground': '210 40% 98%',
          '--card': '222 47% 11%',
          '--card-foreground': '210 40% 98%',
          '--popover': '222 47% 11%',
          '--popover-foreground': '210 40% 98%',
          '--primary': '42 100% 50%',
          '--primary-foreground': '0 0% 100%',
          '--secondary': '210 40% 98%',
          '--secondary-foreground': '222 47% 11%',
          '--muted': '222 47% 11%',
          '--muted-foreground': '210 40% 98%',
          '--accent': '45 100% 50%',
          '--accent-foreground': '0 0% 100%',
          '--destructive': '0 79% 63%',
          '--destructive-foreground': '0 0% 100%',
          '--border': '222 47% 11%',
          '--input': '222 47% 11%',
          '--ring': '42 100% 50%',
          '--radius': '8px',
        },
      });
    }),
  ],
};
export default config;
