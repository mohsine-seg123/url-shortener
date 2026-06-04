'use client';
import Link  from "next/link";
import { Button } from "./ui/button";
import { Check, Copy, EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";

type Url={
  id:string;
  originalUrl:string;
  shortUrl:string;
  createdAt:Date;
  visits:number;
}


export default function UrlList() {

  const [urls,setUrls]=useState<Url[]>([]);
  const [copied,setCopied]=useState<boolean>(false);
  const [copyUrl,setCopyUrl]=useState<string>('');

  const shortenerUrl=(code:string)=> `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/${code}`;


  const fetchUrls=async ()=>{
    try{
      const response=await fetch('/api/urls');
      const data=await response.json();
      setUrls(data.urls)
    }catch(error){
       console.error('Error fetching URLs',error)
    }
  }

  const handleCopyUrl=(code:string)=>{
     const fullUrl=`${shortenerUrl(code)}`;
     navigator.clipboard.writeText(fullUrl).then(()=>{
      setCopied(true);
      setCopyUrl(code);
      setTimeout(()=>{
        setCopied(false);
        setCopyUrl('');
      },2000)
  })
  };


  useEffect(()=>{
    fetchUrls();
  },[])


  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Recent URLs</h2>
      <ul className="space-y-2">
        {urls.map((url) => (
          <li key={url.id} className="flex items-center gap-2 justify-between">
            <Link
              href={`/${url.shortUrl}`}
              className="text-blue-500"
              target="_blank"
            >
              {shortenerUrl(url.shortUrl)}
            </Link>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:bg-muted"
                onClick={() => handleCopyUrl(url.shortUrl)}
              >
                {copied && copyUrl === url.shortUrl ? (<Check className="w-4 h-4" />) : 
                (<Copy className="w-4 h-4" />)}
                <span className="sr-only">Copy URL</span>
              </Button>
              <span className="flex items-center gap-2">
                <EyeIcon className="h-4 w-4" />
                {url.visits} views
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
