"use client"

import * as React from "react"
import { Dot } from "lucide-react"
import { cn } from "@/lib/utils"

interface InputOTPProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  maxLength?: number
  containerClassName?: string
  value?: string
  onChange?: (value: string) => void
}

const OTPInputContext = React.createContext<{
  slots: { char: string; hasFakeCaret: boolean; isActive: boolean }[]
}>({
  slots: [],
})

const OTPInput = React.forwardRef<HTMLInputElement, InputOTPProps>(
  ({ className, containerClassName, maxLength = 6, value = "", onChange, ...props }, ref) => {
    const [otp, setOTP] = React.useState(value.split(""))
    const [activeIndex, setActiveIndex] = React.useState<number>(0)
    const [hasFakeCaret, setHasFakeCaret] = React.useState<boolean>(false)

    React.useEffect(() => {
      setOTP(value.split(""))
    }, [value])

    const slots = React.useMemo(() => {
      const arr = new Array(maxLength).fill("")
      return arr.map((_, index) => ({
        char: otp[index] || "",
        hasFakeCaret: hasFakeCaret && activeIndex === index,
        isActive: activeIndex === index,
      }))
    }, [activeIndex, hasFakeCaret, maxLength, otp])

    const contextValue = React.useMemo(() => ({ slots }), [slots])

    return (
      <OTPInputContext.Provider value={contextValue}>
        <div
          className={cn(
            "flex items-center gap-2 has-[:disabled]:opacity-50",
            containerClassName
          )}
        >
          <input
            ref={ref}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9]*"
            maxLength={maxLength}
            className="absolute w-0 h-0 opacity-0"
            value={otp.join("")}
            onChange={(e) => {
              const newValue = e.target.value.slice(0, maxLength)
              setOTP(newValue.split(""))
              onChange?.(newValue)
              if (newValue.length < maxLength) {
                setActiveIndex(newValue.length)
              }
            }}
            onFocus={() => {
              setHasFakeCaret(true)
              setActiveIndex(otp.length)
            }}
            onBlur={() => setHasFakeCaret(false)}
            {...props}
          />
        </div>
      </OTPInputContext.Provider>
    )
  }
)
OTPInput.displayName = "OTPInput"

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
))
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-2 ring-ring ring-offset-background",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Dot />
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator, OTPInputContext }
