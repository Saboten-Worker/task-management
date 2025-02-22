import { ThemeProvider } from "next-themes"
import { Toaster } from "sonner"
import { ActiveTaskProvider } from "@/contexts/active-task-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      <Toaster />
      <ActiveTaskProvider>
        {children}
      </ActiveTaskProvider>
    </ThemeProvider>
  )
}
