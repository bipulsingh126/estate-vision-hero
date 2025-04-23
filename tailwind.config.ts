import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				// Light mode colors
				border: {
					DEFAULT: "hsl(var(--border))",
					dark: "hsl(var(--border-dark))"
				},
				input: {
					DEFAULT: "hsl(var(--input))",
					dark: "hsl(var(--input-dark))"
				},
				ring: {
					DEFAULT: "hsl(var(--ring))",
					dark: "hsl(var(--ring-dark))"
				},
				background: {
					DEFAULT: "hsl(var(--background))",
					dark: "hsl(var(--background-dark))"
				},
				foreground: {
					DEFAULT: "hsl(var(--foreground))",
					dark: "hsl(var(--foreground-dark))"
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
					dark: "hsl(var(--primary-dark))",
					"dark-foreground": "hsl(var(--primary-dark-foreground))"
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
					dark: "hsl(var(--secondary-dark))",
					"dark-foreground": "hsl(var(--secondary-dark-foreground))"
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
					dark: "hsl(var(--destructive-dark))",
					"dark-foreground": "hsl(var(--destructive-dark-foreground))"
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
					dark: "hsl(var(--muted-dark))",
					"dark-foreground": "hsl(var(--muted-dark-foreground))"
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
					dark: "hsl(var(--accent-dark))",
					"dark-foreground": "hsl(var(--accent-dark-foreground))"
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
					dark: "hsl(var(--popover-dark))",
					"dark-foreground": "hsl(var(--popover-dark-foreground))"
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
					dark: "hsl(var(--card-dark))",
					"dark-foreground": "hsl(var(--card-dark-foreground))"
				},
				estate: {
					navy: '#1A1F2C',
					gold: '#D4AF37',
					silver: '#E0E0E0',
					lightBlue: '#F6F7F9',
					darkBlue: '#0F3460'
				}
			},
			fontFamily: {
				montserrat: ['Montserrat', 'sans-serif'],
				inter: ['Inter', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-soft': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'pulse-soft': 'pulse-soft 3s ease-in-out infinite'
			},
			boxShadow: {
				'property': '0 10px 30px -5px rgba(0, 0, 0, 0.1)',
				'property-hover': '0 20px 40px -5px rgba(0, 0, 0, 0.2)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
