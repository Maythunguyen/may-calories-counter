"use client";
import React, { useState, useEffect } from "react";
import { FileUpload } from "./ui/FileUpload";
import { caloCalculateApi } from "@/app/api/CaloCalculationApi";
import AIResults from "./AIResults";


interface FileUploadSectionProps {
  value: File[];   
  onChange(files: File[]): void; 

}
interface CalorieResult {
  food_items: string[];
  calories_per_item: number[];
  total_calories: number;
}

function sanitizeJsonFence(raw: string): string {
  return raw
    .trim()
    .replace(/^```(?:json)?\s*/i, "")   // opening fence  ```   or  ```json
    .replace(/\s*```$/, "");            // closing fence  ```
}

export function FileUploadSection({ value, onChange }: FileUploadSectionProps) {
  const [selectedFile, setSelectedFile] = useState<File[]>(value);
  const [result, setResult] = useState<CalorieResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (files: File[]) => {
    setSelectedFile(files);
    onChange?.(files);
  }

  useEffect(() => {

    if(!selectedFile) return;
    
    const upload = async () => {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", selectedFile[0]);
      console.log(formData)

      try {
        const raw = await caloCalculateApi(formData);          // comes back as string
        const cleaned = typeof raw === "string" ? sanitizeJsonFence(raw) : raw;
        const data = typeof cleaned === "string" ? JSON.parse(cleaned) : cleaned;
        setResult(data);
        console.log(data)
      } catch (e: any) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    }

    upload();
    
  }, [selectedFile]);

  
  return (
    <div className="relative mx-auto my-10 flex max-w-7xl flex-col items-center justify-center">
      <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
        <FileUpload 
          onChange={handleFileUpload} 
        />
      </div>
      
      <div className="w-full max-w-md mx-auto min-h-96 mt-10">
        {isLoading && <p className="mt-4">Analysing…</p>}
          {error && <p className="mt-4 text-red-600">{error}</p>}
          <AIResults 
            result={result}
        />

      </div>
    </div>
  );
}
