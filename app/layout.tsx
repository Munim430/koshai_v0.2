import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Header } from '@/components/navigation/Header'
import { BottomNav } from '@/components/navigation/BottomNav'
import { AuthProvider } from '@/components/auth/AuthContext'
import { PWAInstallPrompt } from '@/components/PWAInstallPrompt'
import { ErrorBoundary } from '@/components/ErrorBoundary'

const APP_NAME = 'KOSHAI'
const APP_DESCRIPTION = 'Bangladesh&apos;s largest platform for animal marketplace, butcher services, and Qurbani sharing.'

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_NAME,
  },
  icons: {
    icon: '/icon-192.png',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#DA291C',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-background">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={APP_NAME} />
      </head>
      <body className="bg-background text-foreground">
        <ErrorBoundary>
          <AuthProvider>
            <Header />
            <div className="flex flex-col min-h-screen pb-24">
              {children}
            </div>
            <BottomNav />
            <PWAInstallPrompt />
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
