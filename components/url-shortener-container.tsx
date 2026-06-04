"use client";
import { useState } from "react";
import ShortenForm from "./shorten-form";
import UrlList from "./url-list";

export default function UrlShortenerContainer() {

  const [refreshKey, setRefreshKey] = useState<number>(0);

  const triggerRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };


  return (
    <div>
      <ShortenForm onUrlShortened={triggerRefresh} />
      <UrlList key={refreshKey} />
    </div>
  );
}
