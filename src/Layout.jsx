import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { LanguageProvider } from "@/components/ui/LanguageContext"
import { createPageUrl } from "@/utils"

export default function Layout({ children, currentPageName }) {
  const navigate = useNavigate()

  // Pages that don't require auth check
  const publicPages = ["Onboarding", "Auth"]

  const hasOnboarded = localStorage.getItem("easefarmer_onboarded")
  const isLoggedIn = localStorage.getItem("easefarmer_logged_in")

  const isPublicPage = publicPages.includes(currentPageName)

  const shouldRedirectToOnboarding =
    !isPublicPage && !hasOnboarded && currentPageName !== "Onboarding"

  const shouldRedirectToAuth =
    !isPublicPage && hasOnboarded && !isLoggedIn && currentPageName !== "Auth"

  // 🔹 Side effects ONLY (navigation)
  useEffect(() => {
    if (shouldRedirectToOnboarding) {
      navigate(createPageUrl("Onboarding"), { replace: true })
    } else if (shouldRedirectToAuth) {
      navigate(createPageUrl("Auth"), { replace: true })
    }
  }, [shouldRedirectToOnboarding, shouldRedirectToAuth, navigate])

  // 🔹 While redirecting, show loader
  if (shouldRedirectToOnboarding || shouldRedirectToAuth) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-stone-50">
        {children}
      </div>
    </LanguageProvider>
  )
}
