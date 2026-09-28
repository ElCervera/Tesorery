import { LoginForm } from "@/components/auth/login-form"
import { Logo } from "@/components/logo"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirigiendo al dashboard...</p>
      <script dangerouslySetInnerHTML={{ __html: `window.location.href = '/dashboard';` }} />
    </div>
  )
}
