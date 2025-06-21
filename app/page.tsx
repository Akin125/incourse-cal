import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calculator, GraduationCap, CheckCircle } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-lime-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 sm:gap-0">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-7 w-7 sm:h-8 sm:w-8 text-green-600" />
            <span className="text-lg sm:text-xl font-bold text-green-800 text-center sm:text-left">
        Magna Medicos | MBE Standing App
      </span>
          </div>
          <Link
              href="/about"
              className="text-green-700 hover:text-green-800 font-medium text-base sm:text-lg"
          >
            About App
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-6">Know Your MBE Standing</h1>
            <p className="text-lg md:text-xl text-green-700 mb-8 max-w-2xl mx-auto leading-relaxed">
              Use this tool to compute your 300L incourse performance and 200L MBE contribution toward your First Medical Board Exam. It is designed only for 300 level medical and dental students of OAU COHS .
            </p>
          </div>

          {/* Hero Visual */}
          <div className="mb-12 relative">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto border border-green-100">
              <Calculator className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Anatomy</span>
                  <span className="text-sm font-medium text-green-600">18.5/20</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Biochemistry</span>
                  <span className="text-sm font-medium text-green-600">16.2/20</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Physiology</span>
                  <span className="text-sm font-medium text-green-600">17.8/20</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">200L MBE</span>
                  <span className="text-sm font-medium text-green-600">15.5/20</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-green-600">
                  <CheckCircle className="h-6 w-6" />
                  {/*<span className="text-sm font-medium">Eligible for MBE</span>*/}
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Link href="/calculator">
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
              <p className="text-sm text-green-600">Know your standing immediately after calculation</p>
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
