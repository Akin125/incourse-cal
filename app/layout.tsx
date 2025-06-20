import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Magna Medicos | MBE Standing App',
  description: 'A professional application for managing First medical board examination standings at OAU COHS, Ile-Ife, Nigeria',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
