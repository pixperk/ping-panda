"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckIcon, ClipboardIcon, EyeIcon, EyeOffIcon } from "lucide-react"

export default function ApiKeySettings({ apiKey = "your-api-key-here" }: { apiKey?: string }) {
  const [copySuccess, setCopySuccess] = useState(false)
  const [showKey, setShowKey] = useState(false)

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey)
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 2000)
  }

  const toggleShowKey = () => {
    setShowKey(!showKey)
  }

  return (
    <Card className="max-w-xl w-full p-6">
      <div>
        <Label htmlFor="api-key">Your API Key</Label>
        <div className="mt-1 relative">
          <Input
            id="api-key"
            type={showKey ? "text" : "password"}
            value={apiKey}
            readOnly
            className="pr-20"
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <Button
              variant="ghost"
              onClick={toggleShowKey}
              className="p-1 w-10 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={showKey ? "Hide API key" : "Show API key"}
            >
              {showKey ? (
                <EyeOffIcon className="h-4 w-4 text-primary" />
              ) : (
                <EyeIcon className="h-4 w-4 text-primary" />
              )}
            </Button>
            <Button
              variant="ghost"
              onClick={copyApiKey}
              className="p-1 w-10 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Copy API key"
            >
              {copySuccess ? (
                <CheckIcon className="h-4 w-4 text-primary" />
              ) : (
                <ClipboardIcon className="h-4 w-4 text-primary" />
              )}
            </Button>
          </div>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Keep your key secret and do not share it with others.
        </p>
      </div>
    </Card>
  )
}