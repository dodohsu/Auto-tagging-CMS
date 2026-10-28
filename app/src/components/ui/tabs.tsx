import * as React from "react"
import { cn } from "cn"

type TabsContextValue = {
  value: string
  onValueChange: (value: string) => void
}
const TabsContext = React.createContext<TabsContextValue | null>(null)
function useTabs() {
  const context = React.useContext(TabsContext)
  if (!context) throw new Error("Tabs components must be used inside Tabs")
  return context
}
function Tabs({
  value,
  defaultValue,
  onValueChange,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}) {
  const [internal, setInternal] = React.useState(defaultValue ?? "")
  const current = value ?? internal
  const change = (next: string) => {
    if (value === undefined) setInternal(next)
    onValueChange?.(next)
  }
  return (
    <TabsContext.Provider value={{ value: current, onValueChange: change }}>
      <div
        data-slot="tabs"
        className={cn("flex flex-col gap-2", className)}
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  )
}
function TabsList({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="tablist"
      data-slot="tabs-list"
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
function TabsTrigger({
  value,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }) {
  const tabs = useTabs()
  const active = tabs.value === value
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      data-state={active ? "active" : "inactive"}
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex h-7 flex-1 items-center justify-center rounded-md px-3 text-sm font-medium whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        active
          ? "bg-background text-foreground shadow"
          : "hover:bg-background/50",
        className
      )}
      onClick={() => tabs.onValueChange(value)}
      {...props}
    />
  )
}
function TabsContent({
  value,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { value: string }) {
  const tabs = useTabs()
  if (tabs.value !== value) return null
  return (
    <div
      role="tabpanel"
      data-slot="tabs-content"
      className={cn("outline-none", className)}
      {...props}
    />
  )
}
export { Tabs, TabsList, TabsTrigger, TabsContent }
