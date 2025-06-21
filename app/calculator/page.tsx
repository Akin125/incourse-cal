"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ArrowLeft, Download, Trophy, Target, Shield, Lock, Eye } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

interface CourseScores {
  anatomy: number[]
  biochemistry: number[]
  physiology: number[]
  mbe200L: {
    anatomy: number
    biochemistry: number
    physiology: number
  }
}

interface UserInfo {
  name: string
  class: string
}

export default function Calculator() {
  const searchParams = useSearchParams()
  const level = searchParams.get("level") || "300"
  const is200Level = level === "200"

  const [scores, setScores] = useState<CourseScores>({
    anatomy: [0, 0, 0], // Always 3 incourses for anatomy
    biochemistry: [0, 0], // Always 2 incourses for biochemistry
    physiology: [0, 0], // Always 2 incourses for physiology
    mbe200L: {
      anatomy: 0,
      biochemistry: 0,
      physiology: 0,
    },
  })

  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    class: "",
  })

  const [showResults, setShowResults] = useState(false)
  const [showPrivacyDialog, setShowPrivacyDialog] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const errorContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (validationErrors.length > 0 && errorContainerRef.current) {
      errorContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [validationErrors])

  const updateScore = (course: keyof CourseScores, index: number | string, value: string) => {
    const numValue = Number.parseFloat(value) || 0

    if (course === "mbe200L") {
      setScores((prev) => ({
        ...prev,
        mbe200L: {
          ...prev.mbe200L,
          [index]: numValue,
        },
      }))
    } else {
      setScores((prev) => ({
        ...prev,
        [course]: prev[course].map((score, i) => (i === index ? numValue : score)),
      }))
    }

    // Clear validation errors when user starts typing
    if (validationErrors.length > 0) {
      setValidationErrors([])
    }
  }

  const updateUserInfo = (field: keyof UserInfo, value: string) => {
    setUserInfo((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const validateInputs = () => {
    const errors: string[] = []

    // Check if any anatomy scores are empty or 0
    if (scores.anatomy.some((score) => score === 0)) {
      errors.push(`Please enter all Anatomy incourse scores`)
    }

    // Check if any biochemistry scores are empty or 0
    if (scores.biochemistry.some((score) => score === 0)) {
      errors.push(`Please enter all Biochemistry incourse scores`)
    }

    // Check if any physiology scores are empty or 0
    if (scores.physiology.some((score) => score === 0)) {
      errors.push(`Please enter all Physiology incourse scores`)
    }

    // Only check 200L MBE scores for 300L students
    if (!is200Level && (scores.mbe200L.anatomy === 0 || scores.mbe200L.biochemistry === 0 || scores.mbe200L.physiology === 0)) {
      errors.push("Please enter all 200L MBE scores")
    }

    // Check if scores are within valid range (0-100)
    const allScores = [
      ...scores.anatomy,
      ...scores.biochemistry,
      ...scores.physiology,
      ...(is200Level ? [] : [scores.mbe200L.anatomy, scores.mbe200L.biochemistry, scores.mbe200L.physiology]),
    ]

    if (allScores.some((score) => score < 0 || score > 100)) {
      errors.push(`All scores must be between 0 and 100`)
    }

    return errors
  }

  const getGradeInfo = (score: number) => {
    if (score >= 28) return { grade: "Distinction", color: "text-yellow-600", bgColor: "bg-yellow-50", icon: Trophy }
    if (score >= 20) return { grade: "Pass", color: "text-green-600", bgColor: "bg-green-50", icon: Target }
    return { grade: "Below Pass", color: "text-gray-600", bgColor: "bg-gray-50", icon: Target }
  }

  const calculateRequiredMBE = (current300L: number, current200L: number) => {
    const results = []

    // Convert current 300L incourse to percentage (out of 20 -> percentage)
    // const incoursePercentage = (current300L / 20) * 100
    //
    // // Current total aggregate percentage
    // const currentAggregate = current300L + current200L
    // const aggregatePercentage = (currentAggregate / 40) * 100

    const totalIncource = current200L + current300L

    // For Pass: 50% - incourse percentage = what you need in 300L MBE
    const neededForPass = 50 - totalIncource
    if (neededForPass > 0) {
      results.push({
        grade: "Pass",
        needed:  neededForPass,
        achievable: neededForPass <= 60,
      })
    } else {
      results.push({
        grade: "Pass",
        needed: 0,
        achievable: true,
        message: "Already achieved",
      })
    }

    // For Distinction: 70% - current aggregate percentage = what you need overall
    const neededForDistinction = 70 - totalIncource
    if (neededForDistinction > 0) {
      results.push({
        grade: "Distinction",
        needed: neededForDistinction,
        achievable: neededForDistinction <= 60,
        isOverall: true, // This indicates it's overall improvement needed
      })
    } else {
      results.push({
        grade: "Distinction",
        needed: 0,
        achievable: true,
        message: "Already achieved",
      })
    }

    return results
  }

  const calculateAggregate = () => {
    // Calculate averages for each course
    const anatomyAvg = scores.anatomy.reduce((sum, score) => sum + score, 0) / scores.anatomy.length
    const biochemAvg = scores.biochemistry.reduce((sum, score) => sum + score, 0) / scores.biochemistry.length
    const physioAvg = scores.physiology.reduce((sum, score) => sum + score, 0) / scores.physiology.length

    if (is200Level) {
      // For 200L, convert scores to be out of 40 (from the average out of 100)
      const anatomyAggregate = (anatomyAvg / 100) * 40
      const biochemAggregate = (biochemAvg / 100) * 40
      const physioAggregate = (physioAvg / 100) * 40

      return {
        anatomy: {
          incourse300L: anatomyAggregate,
          mbe200L: 0,
          aggregate: anatomyAggregate,
          grade: getGradeInfo(anatomyAggregate),
          requiredMBE: calculateRequiredMBE(anatomyAggregate, 0),
        },
        biochemistry: {
          incourse300L: biochemAggregate,
          mbe200L: 0,
          aggregate: biochemAggregate,
          grade: getGradeInfo(biochemAggregate),
          requiredMBE: calculateRequiredMBE(biochemAggregate, 0),
        },
        physiology: {
          incourse300L: physioAggregate,
          mbe200L: 0,
          aggregate: physioAggregate,
          grade: getGradeInfo(physioAggregate),
          requiredMBE: calculateRequiredMBE(physioAggregate, 0),
        },
      }
    } else {
      // 300L calculation (existing logic)
      const anatomy300L = (anatomyAvg / 100) * 20
      const biochem300L = (biochemAvg / 100) * 20
      const physio300L = (physioAvg / 100) * 20

      const anatomy200L = (scores.mbe200L.anatomy / 100) * 20
      const biochem200L = (scores.mbe200L.biochemistry / 100) * 20
      const physio200L = (scores.mbe200L.physiology / 100) * 20

      const anatomyAggregate = anatomy300L + anatomy200L
      const biochemAggregate = biochem300L + biochem200L
      const physioAggregate = physio300L + physio200L

      return {
        anatomy: {
          incourse300L: anatomy300L,
          mbe200L: anatomy200L,
          aggregate: anatomyAggregate,
          grade: getGradeInfo(anatomyAggregate),
          requiredMBE: calculateRequiredMBE(anatomy300L, anatomy200L),
        },
        biochemistry: {
          incourse300L: biochem300L,
          mbe200L: biochem200L,
          aggregate: biochemAggregate,
          grade: getGradeInfo(biochemAggregate),
          requiredMBE: calculateRequiredMBE(biochem300L, biochem200L),
        },
        physiology: {
          incourse300L: physio300L,
          mbe200L: physio200L,
          aggregate: physioAggregate,
          grade: getGradeInfo(physioAggregate),
          requiredMBE: calculateRequiredMBE(physio300L, physio200L),
        },
      }
    }
  }

  const results = calculateAggregate()

  const handleCalculateClick = () => {
    const errors = validateInputs()
    if (errors.length > 0) {
      setValidationErrors(errors)
      return
    }
    setShowPrivacyDialog(true)
  }

  const handlePrivacyAccept = () => {
    setShowPrivacyDialog(false)
    setShowResults(true)
  }

  const downloadPDF = async () => {
    // Create a canvas to generate PDF content with higher resolution
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    if (!ctx) return

    // Set canvas size with higher DPI for better quality
    const scale = 2
    canvas.width = 794 * scale // A4 width in pixels at higher DPI
    canvas.height = 1123 * scale // A4 height in pixels at higher DPI
    ctx.scale(scale, scale)

    // White background
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, 794, 1123)

    // Header with gradient background
    const gradient = ctx.createLinearGradient(0, 0, 794, 80)
    gradient.addColorStop(0, is200Level ? "#2563eb" : "#16a34a")
    gradient.addColorStop(1, is200Level ? "#60a5fa" : "#22c55e")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 794, 80)

    // Header text
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 28px Arial, sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("MBE AGGREGATE SCORE REPORT", 397, 35)

    ctx.font = "16px Arial, sans-serif"
    ctx.fillText(`${is200Level ? "200 Level" : "300 Level"}  Medical Board Examination Score Analysis`, 397, 60)

    // Student Info Box
    ctx.fillStyle = "#f0fdf4"
    ctx.fillRect(40, 100, 714, 80)
    ctx.strokeStyle = "#16a34a"
    ctx.lineWidth = 2
    ctx.strokeRect(40, 100, 714, 80)

    ctx.fillStyle = "#000000"
    ctx.font = "bold 16px Arial, sans-serif"
    ctx.textAlign = "left"
    ctx.fillText("STUDENT INFORMATION", 60, 125)

    ctx.font = "14px Arial, sans-serif"
    ctx.fillText(`Name: ${userInfo.name || "Not Provided"}`, 60, 145)
    ctx.fillText(`Class: ${userInfo.class || "Not Provided"}`, 60, 165)
    ctx.fillText(`Report Date: ${new Date().toLocaleDateString()}`, 400, 145)
    ctx.fillText(`Generated: ${new Date().toLocaleTimeString()}`, 400, 165)

    let yPos = 220

    // Course sections with improved styling
    const courses = [
      { name: "ANATOMY", data: results.anatomy, color: "#7db2f7", bgColor: "#f0f4fa" },
      { name: "BIOCHEMISTRY", data: results.biochemistry, color: "#2563eb", bgColor: "#eff6ff" },
      { name: "PHYSIOLOGY", data: results.physiology, color: "#7c3aed", bgColor: "#f3e8ff" },
    ]

    courses.forEach((course, index) => {
      // Course background
      ctx.fillStyle = course.bgColor
      ctx.fillRect(40, yPos - 10, 714, 140)
      ctx.strokeStyle = course.color
      ctx.lineWidth = 2
      ctx.strokeRect(40, yPos - 10, 714, 140)

      // Course title with icon
      ctx.fillStyle = course.color
      ctx.font = "bold 20px Arial, sans-serif"
      ctx.fillText(`${course.name} AGGREGATE`, 60, yPos + 15)

      // Grade badge
      // const gradeText = course.data.grade.grade
      // ctx.font = "bold 12px Arial, sans-serif"
      // const gradeWidth = ctx.measureText(gradeText).width + 20
      //
      // if (gradeText === "Distinction") {
      //   ctx.fillStyle = "#fef3c7"
      //   ctx.fillRect(600, yPos - 5, gradeWidth, 25)
      //   ctx.fillStyle = "#92400e"
      // } else if (gradeText === "Pass") {
      //   ctx.fillStyle = "#dcfce7"
      //   ctx.fillRect(600, yPos - 5, gradeWidth, 25)
      //   ctx.fillStyle = "#166534"
      // } else {
      //   ctx.fillStyle = "#f3f4f6"
      //   ctx.fillRect(600, yPos - 5, gradeWidth, 25)
      //   ctx.fillStyle = "#6b7280"
      // }
      //
      // ctx.textAlign = "center"
      // ctx.fillText(gradeText, 600 + gradeWidth / 2, yPos + 12)
      // ctx.textAlign = "left"

      // Course details in two columns
      ctx.fillStyle = "#000000"
      ctx.font = "14px Arial, sans-serif"

      // Left column - scores
      ctx.fillText(`${is200Level? '200L': '300L'} Incourse Average: ${course.data.incourse300L.toFixed(1)}${is200Level? '/40': '/20'}`, 60, yPos + 45)
      if (!is200Level) {
        ctx.fillText(`200L MBE Score: ${course.data.mbe200L.toFixed(1)}/20`, 60, yPos + 65)
      }

      ctx.font = "bold 16px Arial, sans-serif"
      ctx.fillText(`Total Aggregate: ${course.data.aggregate.toFixed(1)}/40`, 60, yPos + 90)

      // Right column - requirements
      ctx.font = "bold 14px Arial, sans-serif"
      ctx.fillText(`Required ${is200Level? '200L': '300L'} MBE Scores:`, 400, yPos + 45)

      ctx.font = "12px Arial, sans-serif"
      course.data.requiredMBE.forEach((req, reqIndex) => {
        const reqText = req.message
          ? `For ${req.grade}: ${req.message}`
          : `For ${req.grade}: ${req.achievable ? (req.needed.toFixed(1)) : 'Distinction not achievable' }${req.achievable? '/60' : '' }`
        ctx.fillText(`• ${reqText}`, 420, yPos + 65 + reqIndex * 18)
      })

      yPos += 170
    })

    // Grading scale with improved styling
    ctx.fillStyle = "#f9fafb"
    ctx.fillRect(40, yPos, 714, 80)
    ctx.strokeStyle = "#d1d5db"
    ctx.lineWidth = 1
    ctx.strokeRect(40, yPos, 714, 80)

    ctx.fillStyle = "#374151"
    ctx.font = "bold 16px Arial, sans-serif"
    ctx.fillText("GRADING SCALE", 60, yPos + 25)

    ctx.font = "14px Arial, sans-serif"
    ctx.fillText("• Pass: 50-69%", 60, yPos + 50)
    ctx.fillText("• Distinction: 70-100%", 300, yPos + 50)

    // Footer
    ctx.fillStyle = "#6b7280"
    ctx.font = "12px Arial, sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("Generated by Magna Medicos | MBE Standing App", 397, 1100)
    ctx.fillText("This report is confidential and for the student's personal use only.", 397, 1115)

    // Convert canvas to blob and download as PNG
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        const levelText = is200Level ? "200L" : "300L"
        a.download = `${userInfo.name || "Student"}_${levelText}_MBE_Report.png`
        a.click()
        URL.revokeObjectURL(url)
      }
    }, "image/png")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-lime-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 text-green-600 hover:text-green-700">
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-sm sm:text-base">Back to Home</span>
          </Link>
          <h1 className="text-lg sm:text-xl font-bold text-green-800">Magna Medicos | MBE Standing App</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4 sm:py-8">
        <div className="max-w-4xl mx-auto">
          {!showResults ? (
            <div className="space-y-6 sm:space-y-8">
              {/* Validation Errors */}
              {validationErrors.length > 0 && (
                <div ref={errorContainerRef}>
                  <Card className="border-red-200 bg-red-50">
                    <CardContent className="p-4 sm:p-6">
                      <h3 className="font-semibold text-red-800 mb-2">Please fix the following errors:</h3>
                      <ul className="list-disc list-inside space-y-1 text-red-700 text-sm">
                        {validationErrors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* User Information */}
              <Card className="border-green-200 shadow-lg">
                <CardHeader className="bg-green-50">
                  <CardTitle className="text-green-800 text-lg sm:text-xl">Student Information</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="student-name" className="text-sm font-medium">
                        Full Name
                      </Label>
                      <Input
                        id="student-name"
                        type="text"
                        value={userInfo.name}
                        onChange={(e) => updateUserInfo("name", e.target.value)}
                        className="border-green-200 focus:border-green-500"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="student-class" className="text-sm font-medium">
                        Class
                      </Label>
                      <Input
                        id="student-class"
                        type="text"
                        value={userInfo.class}
                        onChange={(e) => updateUserInfo("class", e.target.value)}
                        className="border-green-200 focus:border-green-500"
                        placeholder="e.g. Magna Medicos"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Score Input Form */}
              <Card className="border-green-200 shadow-lg">
                <CardHeader className="bg-green-50">
                  <CardTitle className="text-green-800 text-lg sm:text-xl">Enter Your Scores</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <Tabs defaultValue="anatomy" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-6 h-auto">
                      <TabsTrigger value="anatomy" className="text-xs sm:text-sm py-2">
                        Anatomy
                      </TabsTrigger>
                      <TabsTrigger value="biochemistry" className="text-xs sm:text-sm py-2">
                        Biochemistry
                      </TabsTrigger>
                      <TabsTrigger value="physiology" className="text-xs sm:text-sm py-2">
                        Physiology
                      </TabsTrigger>
                      {!is200Level && (
                        <TabsTrigger value="mbe" className="text-xs sm:text-sm py-2">
                          200L MBE
                        </TabsTrigger>
                      )}
                    </TabsList>

                    <TabsContent value="anatomy" className="space-y-4">
                      <h3 className="font-semibold text-green-800 mb-4 text-base sm:text-lg">
                        Anatomy Incourse Scores
                      </h3>
                      {scores.anatomy.map((score, index) => (
                        <div key={index} className="space-y-2">
                          <Label htmlFor={`anatomy-${index}`} className="text-sm font-medium">
                            Incourse {index + 1} (out of 100)
                          </Label>
                          <Input
                            id={`anatomy-${index}`}
                            type="number"
                            min="0"
                            max="100"
                            value={score || ""}
                            onChange={(e) => updateScore("anatomy", index, e.target.value)}
                            className="border-green-200 focus:border-green-500"
                            placeholder="Enter score"
                          />
                        </div>
                      ))}
                    </TabsContent>

                    <TabsContent value="biochemistry" className="space-y-4">
                      <h3 className="font-semibold text-green-800 mb-4 text-base sm:text-lg">
                        Biochemistry Incourse Scores
                      </h3>
                      {scores.biochemistry.map((score, index) => (
                        <div key={index} className="space-y-2">
                          <Label htmlFor={`biochem-${index}`} className="text-sm font-medium">
                            Incourse {index + 1} (out of 100)
                          </Label>
                          <Input
                            id={`biochem-${index}`}
                            type="number"
                            min="0"
                            max="100"
                            value={score || ""}
                            onChange={(e) => updateScore("biochemistry", index, e.target.value)}
                            className="border-green-200 focus:border-green-500"
                            placeholder="Enter score"
                          />
                        </div>
                      ))}
                    </TabsContent>

                    <TabsContent value="physiology" className="space-y-4">
                      <h3 className="font-semibold text-green-800 mb-4 text-base sm:text-lg">
                        Physiology Incourse Scores
                      </h3>
                      {scores.physiology.map((score, index) => (
                        <div key={index} className="space-y-2">
                          <Label htmlFor={`physio-${index}`} className="text-sm font-medium">
                            Incourse {index + 1} (out of 100)
                          </Label>
                          <Input
                            id={`physio-${index}`}
                            type="number"
                            min="0"
                            max="100"
                            value={score || ""}
                            onChange={(e) => updateScore("physiology", index, e.target.value)}
                            className="border-green-200 focus:border-green-500"
                            placeholder="Enter score"
                          />
                        </div>
                      ))}
                    </TabsContent>

                    {!is200Level && (
                      <TabsContent value="mbe" className="space-y-4">
                        <h3 className="font-semibold text-green-800 mb-4 text-base sm:text-lg">200L MBE Scores</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="mbe-anatomy" className="text-sm font-medium">
                              200L Anatomy MBE (out of 100)
                            </Label>
                            <Input
                              id="mbe-anatomy"
                              type="number"
                              min="0"
                              max="100"
                              value={scores.mbe200L.anatomy || ""}
                              onChange={(e) => updateScore("mbe200L", "anatomy", e.target.value)}
                              className="border-green-200 focus:border-green-500"
                              placeholder="Enter your 200L Anatomy MBE score"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="mbe-biochem" className="text-sm font-medium">
                              200L Biochemistry MBE (out of 100)
                            </Label>
                            <Input
                              id="mbe-biochem"
                              type="number"
                              min="0"
                              max="100"
                              value={scores.mbe200L.biochemistry || ""}
                              onChange={(e) => updateScore("mbe200L", "biochemistry", e.target.value)}
                              className="border-green-200 focus:border-green-500"
                              placeholder="Enter your 200L Biochemistry MBE score"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="mbe-physio" className="text-sm font-medium">
                              200L Physiology MBE (out of 100)
                            </Label>
                            <Input
                              id="mbe-physio"
                              type="number"
                              min="0"
                              max="100"
                              value={scores.mbe200L.physiology || ""}
                              onChange={(e) => updateScore("mbe200L", "physiology", e.target.value)}
                              className="border-green-200 focus:border-green-500"
                              placeholder="Enter your 200L Physiology MBE score"
                            />
                          </div>
                        </div>
                      </TabsContent>
                    )}
                  </Tabs>
                </CardContent>
              </Card>

              {/* Calculate Button */}
              <div className="text-center">
                <Button
                  onClick={handleCalculateClick}
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                >
                  Calculate My Score
                </Button>
              </div>
            </div>
          ) : (
            /* Results Display */
            <div className="space-y-6 sm:space-y-8">
              {/* Student Info Header */}
              <Card className="border-green-200 shadow-lg">
                <CardContent className="p-4 sm:p-6">
                  <div className="text-center">
                    <h2 className="text-xl sm:text-2xl font-bold text-green-800 mb-2">
                      {userInfo.name || "Student"}'s MBE Report
                    </h2>
                    <div className="space-y-1">
                      <p className="text-green-600 text-sm sm:text-base">{userInfo.class || "Class Not Specified"}</p>
                      <p className="text-green-600 text-sm sm:text-base font-medium">{is200Level ? "200 Level" : "300 Level"} Student</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 shadow-xl">
                <CardHeader className="bg-green-50">
                  <CardTitle className="text-green-800 text-lg sm:text-xl">Your MBE Aggregate Scores</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-8">
                  <div className="space-y-6">
                    {/* Course Aggregates */}
                    <div className="grid gap-4 sm:gap-6">
                      {/* Anatomy */}
                      <div
                        className={`p-4 sm:p-6 rounded-lg border ${results.anatomy.grade.bgColor} border-opacity-50`}
                      >
                        <h4 className="text-base sm:text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
                          Anatomy Aggregate
                          <results.anatomy.grade.icon
                            className={`h-4 w-4 sm:h-5 sm:w-5 ${results.anatomy.grade.color}`}
                          />
                        </h4>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center text-sm sm:text-base">
                              <span className="text-green-700">{is200Level? '200L' : '300L' } Incourse Average</span>
                              <span className="font-medium">{results.anatomy.incourse300L.toFixed(1)}{is200Level? '/40':'/20'}</span>
                            </div>
                            {is200Level? <></>
                                :
                                <div className="flex justify-between items-center text-sm sm:text-base">
                                  <span className="text-green-700">200L MBE</span>
                                  <span className="font-medium">{results.anatomy.mbe200L.toFixed(1)}/20</span>
                                </div>
                            }

                            <hr className="border-green-300" />
                            <div className="flex justify-between items-center font-bold text-base sm:text-lg">
                              <span className="text-green-800">Total Aggregate</span>
                              <span className={results.anatomy.grade.color}>
                                {results.anatomy.aggregate.toFixed(1)}/40
                              </span>
                            </div>
                            {/*<div*/}
                            {/*  className={`text-center text-xs sm:text-sm font-medium ${results.anatomy.grade.color}`}*/}
                            {/*>*/}
                            {/*  Current Grade: {results.anatomy.grade.grade}*/}
                            {/*</div>*/}
                          </div>
                          <div className="space-y-2">
                            <h5 className="font-medium text-green-800 mb-2 text-sm sm:text-base">
                              Required {is200Level? '200L' : '300L'} MBE Scores:
                            </h5>
                            {results.anatomy.requiredMBE.map((req, index) => (
                              <div key={index} className="flex justify-between items-center text-xs sm:text-sm">
                                <span>For {req.grade}:</span>
                                <span className="font-medium">
                                   {req.achievable? (req.message || req.needed.toFixed(1)) : 'Distinction not achievable'}{req.achievable? '/60' : '' }
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Biochemistry */}
                      <div
                        className={`p-4 sm:p-6 rounded-lg border ${results.biochemistry.grade.bgColor} border-opacity-50`}
                      >
                        <h4 className="text-base sm:text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
                          Biochemistry Aggregate
                          <results.biochemistry.grade.icon
                            className={`h-4 w-4 sm:h-5 sm:w-5 ${results.biochemistry.grade.color}`}
                          />
                        </h4>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center text-sm sm:text-base">
                              <span className="text-blue-700">{is200Level? '200L': '300L'} Incourse Average</span>
                              <span className="font-medium">{results.biochemistry.incourse300L.toFixed(1)}{is200Level? '/40': '/20'}</span>
                            </div>
                            {is200Level? <></>:
                                <div className="flex justify-between items-center text-sm sm:text-base">
                                  <span className="text-blue-700">200L MBE</span>
                                  <span className="font-medium">{results.biochemistry.mbe200L.toFixed(1)}/20</span>
                                </div>
                            }

                            <hr className="border-blue-300" />
                            <div className="flex justify-between items-center font-bold text-base sm:text-lg">
                              <span className="text-blue-800">Total Aggregate</span>
                              <span className={results.biochemistry.grade.color}>
                                {results.biochemistry.aggregate.toFixed(1)}/40
                              </span>
                            </div>
                            {/*<div*/}
                            {/*  className={`text-center text-xs sm:text-sm font-medium ${results.biochemistry.grade.color}`}*/}
                            {/*>*/}
                            {/*  Current Grade: {results.biochemistry.grade.grade}*/}
                            {/*</div>*/}
                          </div>
                          <div className="space-y-2">
                            <h5 className="font-medium text-blue-800 mb-2 text-sm sm:text-base">
                              Required {is200Level? '200L': '300L'} MBE Scores:
                            </h5>
                            {results.biochemistry.requiredMBE.map((req, index) => (
                              <div key={index} className="flex justify-between items-center text-xs sm:text-sm">
                                <span>For {req.grade}:</span>
                                <span className="font-medium">
                                   {req.achievable? (req.message || req.needed.toFixed(1)) : 'Distinction not achievable'}{req.achievable? '/60' : '' }
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Physiology */}
                      <div
                        className={`p-4 sm:p-6 rounded-lg border ${results.physiology.grade.bgColor} border-opacity-50`}
                      >
                        <h4 className="text-base sm:text-lg font-semibold text-purple-800 mb-4 flex items-center gap-2">
                          Physiology Aggregate
                          <results.physiology.grade.icon
                            className={`h-4 w-4 sm:h-5 sm:w-5 ${results.physiology.grade.color}`}
                          />
                        </h4>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center text-sm sm:text-base">
                              <span className="text-purple-700">{is200Level? '200L': '300L'} Incourse Average</span>
                              <span className="font-medium">{results.physiology.incourse300L.toFixed(1)}{is200Level? '/40': '/20'}</span>
                            </div>
                            {is200Level? <></> :
                                <div className="flex justify-between items-center text-sm sm:text-base">
                                  <span className="text-purple-700">200L MBE</span>
                                  <span className="font-medium">{results.physiology.mbe200L.toFixed(1)}/20</span>
                                </div>
                            }
                            <hr className="border-purple-300" />
                            <div className="flex justify-between items-center font-bold text-base sm:text-lg">
                              <span className="text-purple-800">Total Aggregate</span>
                              <span className={results.physiology.grade.color}>
                                {results.physiology.aggregate.toFixed(1)}/40
                              </span>
                            </div>
                            {/*<div*/}
                            {/*  className={`text-center text-xs sm:text-sm font-medium ${results.physiology.grade.color}`}*/}
                            {/*>*/}
                            {/*  Current Grade: {results.physiology.grade.grade}*/}
                            {/*</div>*/}
                          </div>
                          <div className="space-y-2">
                            <h5 className="font-medium text-purple-800 mb-2 text-sm sm:text-base">
                              Required {is200Level? '200L': '300L'} MBE Scores:
                            </h5>
                            {results.physiology.requiredMBE.map((req, index) => (
                              <div key={index} className="flex justify-between items-center text-xs sm:text-sm">
                                <span>For {req.grade}:</span>
                                <span className="font-medium">
                                   {req.achievable? (req.message || req.needed.toFixed(1)) : 'Distinction not achievable'}{req.achievable? '/60' : '' }
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                      <Button
                        onClick={downloadPDF}
                        className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Report
                      </Button>
                      <Button
                        onClick={() => setShowResults(false)}
                        variant="outline"
                        className="bg-white text-green-600 border-green-600 hover:bg-green-50 w-full sm:w-auto"
                      >
                        Calculate Again
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      {/* Privacy Dialog */}
      <Dialog open={showPrivacyDialog} onOpenChange={setShowPrivacyDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-800">
              <Shield className="h-5 w-5" />
              Privacy & Data Security
            </DialogTitle>
            <DialogDescription className="text-left space-y-3 pt-2">
              <div className="flex items-start gap-2">
                <Lock className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">
                  <strong>Your data is completely private.</strong> All calculations are performed locally in your
                  browser.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Eye className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">
                  <strong>No data is stored or transmitted.</strong> Your scores and personal information are only
                  visible to you.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Shield className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">
                  <strong>No tracking or analytics.</strong> We don't collect, store, or share any of your information.
                </span>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setShowPrivacyDialog(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button
              onClick={handlePrivacyAccept}
              className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
            >
              I Understand, Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
