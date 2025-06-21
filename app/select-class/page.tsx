"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, GraduationCap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function SelectClass() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-lime-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-4 sm:py-6">
        <div className="flex items-start sm:items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 text-green-600 hover:text-green-700">
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-sm sm:text-base">Back to Home</span>
          </Link>
          <h1 className="text-lg sm:text-xl font-bold text-green-800">Magna Medicos | MBE Standing App</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-green-800 mb-4">Select Your Class</h2>
            <p className="text-lg text-green-700">
              Choose your current class to get the appropriate calculator for your level
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Link href="/calculator?level=200" className="block">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="p-6 flex flex-col items-center justify-center space-y-4">
                  <GraduationCap className="h-12 w-12 text-blue-600" />
                  <h3 className="text-xl font-semibold text-blue-800">200 Level</h3>
                </CardContent>
              </Card>
            </Link>

            <Link href="/calculator?level=300" className="block">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="p-6 flex flex-col items-center justify-center space-y-4">
                  <GraduationCap className="h-12 w-12 text-green-600" />
                  <h3 className="text-xl font-semibold text-green-800">300 Level</h3>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )}
