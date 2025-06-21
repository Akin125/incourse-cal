import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calculator, BookOpen, Trophy, Target, Award } from "lucide-react"
import Link from "next/link"

export default function CalculationLogicPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-lime-50">
      {/* Header with navigation */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-green-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-green-700 hover:text-green-800 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8 max-w-5xl">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800">MBE Score Calculation Guide</h1>
          <p className="text-lg text-green-600 max-w-2xl mx-auto">
            Understanding how your 300 level/First Medical Board Examination score is calculated
          </p>
        </div>

        <Card className="bg-white/80 backdrop-blur border-green-100">
          <CardHeader className="flex flex-row items-center gap-4 border-b border-green-50">
            <div className="h-10 w-10 rounded-full bg-green-100/50 flex items-center justify-center">
              <Calculator className="h-6 w-6 text-green-700" />
            </div>
            <CardTitle className="text-green-800 text-2xl">Score Overview</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-green-50/50 border border-green-100">
                <p className="text-2xl font-bold text-green-800">20%</p>
                <p className="text-sm font-medium text-green-600">200L MBE</p>
              </div>
              <div className="p-6 rounded-xl bg-green-50/50 border border-green-100">
                <p className="text-2xl font-bold text-green-800">20%</p>
                <p className="text-sm font-medium text-green-600">300L Incourse</p>
              </div>
              <div className="p-6 rounded-xl bg-green-50/50 border border-green-100">
                <p className="text-2xl font-bold text-green-800">60%</p>
                <p className="text-sm font-medium text-green-600">300L MBE Exam</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          {/* 200 Level Section */}
          <Card className="bg-white/80 backdrop-blur border-green-100">
            <CardHeader className="flex flex-row items-center gap-4 border-b border-green-50">
              <div className="h-10 w-10 rounded-full bg-green-100/50 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-green-700" />
              </div>
              <CardTitle className="text-green-800">200 Level (20 Points)</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-green-700 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    Anatomy
                  </h3>
                  <p className="text-green-600 pl-4">Average of 3 incourse assessments</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-green-700 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    Biochemistry
                  </h3>
                  <p className="text-green-600 pl-4">Average of 2 incourse assessments</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-green-700 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    Physiology
                  </h3>
                  <p className="text-green-600 pl-4">Average of 2 incourse assessments</p>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-green-50/50 border border-green-100">
               <p className="text-green-700">All your incourse assessments contribute 40 points, while your 200 level MBE contributes 60 points.</p>
               <p className="text-green-700">Your 200 level MBE is weighted as 20% of your 300L MBE score.</p>

              </div>
            </CardContent>
          </Card>

          {/* 300 Level Section */}
          <Card className="bg-white/80 backdrop-blur border-green-100">
            <CardHeader className="flex flex-row items-center gap-4 border-b border-green-50">
              <div className="h-10 w-10 rounded-full bg-green-100/50 flex items-center justify-center">
                <Award className="h-6 w-6 text-green-700" />
              </div>
              <CardTitle className="text-green-800">300 Level (80 Points)</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-green-50/50 border border-green-100">
                  <h3 className="font-semibold text-green-700 mb-2">Incourse (20 Points)</h3>
                  <p className="text-green-600">Current performance in ongoing assessments</p>
                </div>
                <div className="p-4 rounded-lg bg-green-50/50 border border-green-100">
                  <h3 className="font-semibold text-green-700 mb-2">MBE Exam (60 Points)</h3>
                  <p className="text-green-600">Final examination score</p>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-yellow-50/50 border border-yellow-100">
                <p className="text-yellow-700 font-medium">The app calculates your required MBE score based on your current standing.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/80 backdrop-blur border-green-100">
          <CardHeader className="flex flex-row items-center gap-4 border-b border-green-50">
            <div className="h-10 w-10 rounded-full bg-green-100/50 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-green-700" />
            </div>
            <CardTitle className="text-green-800">Final Grading</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-yellow-50 border border-yellow-100">
                <div className="flex items-center gap-3 mb-3">
                  <Trophy className="h-5 w-5 text-yellow-600" />
                  <h3 className="font-semibold text-yellow-800">Distinction</h3>
                </div>
                <p className="text-xl font-bold text-yellow-700">≥ 70 Points</p>
              </div>
              <div className="p-6 rounded-xl bg-green-50 border border-green-100">
                <div className="flex items-center gap-3 mb-3">
                  <Target className="h-5 w-5 text-green-600" />
                  <h3 className="font-semibold text-green-800">Pass</h3>
                </div>
                <p className="text-xl font-bold text-green-700">≥ 50 Points</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
