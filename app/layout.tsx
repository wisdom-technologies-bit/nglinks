import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "APC Campaign 2027",
  description: "APC campaign information and application portal.",
  robots: {
    index: false,
    follow: false,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#048226",
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-NG">
      <head>
        <meta name="monetag" content="8df66a08c270f5502b714c4f37cd2d6c" />
      </head>
      <body>{children}</body>
    </html>
  )
}
