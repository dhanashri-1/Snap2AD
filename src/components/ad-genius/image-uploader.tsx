"use client";

import { useCallback, useState, type ChangeEvent } from "react";
import Image from "next/image";
import { UploadCloud, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  imageDataUrl: string | null;
  isLoading: boolean;
}

export function ImageUploader({ onImageUpload, imageDataUrl, isLoading }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragging(false);
      const file = event.dataTransfer.files?.[0];
      if (file) {
        onImageUpload(file);
      }
    },
    [onImageUpload]
  );

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div
          className={cn(
            "relative flex aspect-video cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/50 transition-colors hover:border-primary/80 hover:bg-secondary",
            isDragging && "border-primary bg-primary/10"
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onClick={() => document.getElementById("file-upload")?.click()}
        >
          <input
            id="file-upload"
            type="file"
            className="sr-only"
            accept="image/*"
            onChange={handleFileChange}
          />
          {isLoading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-background/80 backdrop-blur-sm">
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-32" />
            </div>
          )}

          {imageDataUrl ? (
            <Image
              src={imageDataUrl}
              alt="Uploaded ad image"
              layout="fill"
              objectFit="contain"
              className="rounded-md"
              data-ai-hint="product image"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-center text-muted-foreground">
              <UploadCloud className="h-12 w-12 text-primary" />
              <p className="font-headline font-semibold">
                Click to upload or drag & drop
              </p>
              <p className="text-xs">PNG, JPG, or WEBP</p>
            </div>
          )}
        </div>
        <div className="mt-2 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4" />
          <span>Your images are processed securely and are not stored.</span>
        </div>
      </CardContent>
    </Card>
  );
}
