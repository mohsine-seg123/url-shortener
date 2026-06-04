"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface ShortenFormProps {
  onUrlShortened?: () => void;
}

export default function ShortenForm({ onUrlShortened }: ShortenFormProps) {
  const [url, setUrl] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
        }),
      });
      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        console.error("Shorten failed", response.status, errorBody);
        return;
      }
      await response.json();
      setUrl("");
      if (onUrlShortened) onUrlShortened();
    } catch (error) {
      console.error("Error shortening URL", error);
    } finally {
    }
  };

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <Input
          className="h-12"
          placeholder="Enter Url"
          required
          type="text"
          inputMode="url"
          autoComplete="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button className="w-full p-2" type="submit">
          Shorten
        </Button>
      </div>
    </form>
  );
}
