import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Calculator, Shield, Download } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
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
          <Link
            href="/"
            className="text-green-700 hover:text-green-800 font-medium text-base sm:text-lg"
          >
            Back to Calculator
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-10 space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-green-800 mb-8">About Magna Medicos</h1>

        <Card className="bg-white/80 backdrop-blur border-green-100">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <Calculator className="h-6 w-6 text-green-600" />
              What is Magna Medicos MBE Calculator?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-green-700">
              Magna Medicos MBE Calculator is a privacy-focused, user-friendly web application specifically designed for 200 level and 300 level medical
              and dental students at Obafemi Awolowo University, College of Health Sciences. It helps students calculate and understand
              their required and aggregate scores for the Medical Board Examination (MBE). All calculations are performed locally in your
              browser—ensuring your data remains completely private and secure.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-green-100">
          <CardHeader>
            <CardTitle className="text-green-800">Key Features</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-green-700 flex items-center gap-2">
                <Calculator className="h-5 w-5 text-green-600" />
                Easy Score Calculation
              </h3>
              <p className="text-green-600">
                Input your 300L incourse and 200L MBE scores through our intuitive interface for instant results.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-green-700 flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                Privacy-First Approach
              </h3>
              <p className="text-green-600">
                No tracking, analytics, or data transmission. All calculations happen entirely in your browser.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-green-700 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-green-600" />
                MBE-Specific Design
              </h3>
              <p className="text-green-600">
                Tailored specifically for OAU COHS First MBE requirements, following official grading rules.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-green-700 flex items-center gap-2">
                <Download className="h-5 w-5 text-green-600" />
                Downloadable Reports
              </h3>
              <p className="text-green-600">
                Generate and download detailed score reports as PNG images for your records.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-green-100">
          <CardHeader>
            <CardTitle className="text-green-800">Developer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-700 mb-4">
              For suggestions, or contributions:
            </p>
            <p className="text-green-700 mb-2">
              Odediran Philip Seyifunmi<br />
              Email: <a href="mailto:philipoluseyi@gmail.com" className="underline hover:text-green-800">philipoluseyi@gmail.com</a><br />
              WhatsApp: <a href="https://wa.me/2347016896419" className="underline hover:text-green-800" target="_blank" rel="noopener noreferrer">+2347016896419</a>
            </p>
            <a
              href="https://github.com/Akin125/incourse-cal"
              className="inline-flex items-center gap-2 text-green-700 hover:text-green-800 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              View Project on GitHub
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
