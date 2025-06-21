import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calculator, GraduationCap, CheckCircle } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-lime-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 sm:gap-0">
          <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            {/*<GraduationCap className="h-7 w-7 sm:h-8 sm:w-8 text-green-600" />*/}
            <span className="text-lg sm:text-xl font-bold text-green-800 text-center sm:text-left">
              Magna Medicos | MBE Standing App
            </span>
          </div>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/calculation-logic"
              className="text-green-700 hover:text-green-800 font-medium text-base sm:text-lg"
            >
              Calculation Logic
            </Link>
            <Link
              href="/about"
              className="text-green-700 hover:text-green-800 font-medium text-base sm:text-lg"
            >
              About App
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-6">Know Your MBE Standing</h1>
            <p className="text-lg md:text-xl text-green-700 mb-8 max-w-2xl mx-auto leading-relaxed">
              Use this tool to compute your 300L incourse performance and 200L MBE contribution toward your First Medical Board Exam. It is designed for 200 level and 300 level medical and dental students of OAU COHS, Ile-Ife.
            </p>
          </div>

          {/* Hero Visual */}
          <div className="mb-12 relative">
            <div className="bg-gradient-to-br from-green-100 via-lime-50 to-white rounded-3xl shadow-2xl p-10 max-w-lg mx-auto border-2 border-green-200 animate-fade-in">
              <div className="flex flex-col items-center mb-6">
                <Calculator className="h-20 w-20 text-green-600 drop-shadow-lg animate-bounce-slow" />
                <h2 className="text-2xl font-extrabold text-green-800 mt-4 mb-2 tracking-tight">Your MBE Snapshot</h2>
                <p className="text-green-700 text-base max-w-xs mx-auto">See your scores at a glance and check your standing instantly!</p>
              </div>

            </div>
          </div>

          {/* CTA Button */}
          <Link href="/select-class">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
             Get Started
            </Button>
          </Link>

          {/* Features */}
          <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calculator className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-green-800 mb-2">Easy Calculation</h3>
              <p className="text-sm text-green-600">Simple interface to input your scores and get instant results</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-green-800 mb-2">Instant Results</h3>
              <p className="text-sm text-green-600">Know your standing immediately after calculation and ready for download</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-green-800 mb-2">MBE Ready</h3>
              <p className="text-sm text-green-600">Designed specifically for OAU COHS Medical and Dental student</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-green-600 text-sm">
        <p>© 2025 Magna Medicos | MBE Standing App. Built for medical and dental students.</p>
      </footer>
    </div>
  )
}
