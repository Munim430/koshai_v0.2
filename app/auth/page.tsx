import { AuthProvider } from '@/components/auth/AuthContext'
import { SignIn } from '@/components/auth/SignIn'

export default function AuthPage() {
  return (
    <AuthProvider>
      <main className="min-h-screen pt-20 pb-24 px-4 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">KOSHAI</h1>
            <p className="text-foreground/70">Sign in to your account</p>
          </div>
          <SignIn />
        </div>
      </main>
    </AuthProvider>
  )
}
