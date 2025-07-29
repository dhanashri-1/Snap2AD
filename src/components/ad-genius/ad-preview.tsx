"use client";

import type { RefObject } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { GenerateAdCopyOutput } from "@/ai/flows/generate-ad-copy";
import { Skeleton } from "@/components/ui/skeleton";

type AdPreviewProps = {
  previewRef: RefObject<HTMLDivElement>;
  imageDataUrl: string | null;
  adCopy: GenerateAdCopyOutput | null;
  template: string;
  aspectRatio: string;
  isLoading: boolean;

  titleFontFamily: string;
  titleFontSize: string;
  captionFontFamily: string;
  captionFontSize: string;
  ctaFontFamily: string;
  ctaFontSize: string;
};

export function AdPreview({
  previewRef,
  imageDataUrl,
  adCopy,
  template,
  aspectRatio,
  isLoading,
  titleFontFamily,
  titleFontSize,
  captionFontFamily,
  captionFontSize,
  ctaFontFamily,
  ctaFontSize,
}: AdPreviewProps) {
  const aspectRatioClasses: { [key: string]: string } = {
    Square: "aspect-square",
    Story: "aspect-[9/16]",
    Poster: "aspect-[4/5]",
  };

  const renderTemplate = () => {
    if (!imageDataUrl || !adCopy) {
      return (
        <div className="flex h-full w-full items-center justify-center bg-secondary">
          <p className="text-muted-foreground">Your ad will appear here</p>
        </div>
      );
    }

    switch (template) {
      case "Festive":
        return (
          <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-red-100 to-yellow-100 font-headline">
            <Image src={imageDataUrl} alt="Ad background" layout="fill" objectFit="cover" className="opacity-30" data-ai-hint="celebration background" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-red-800">
              <h2 className="mb-4 text-4xl font-bold drop-shadow-sm" style={{ fontFamily: titleFontFamily, fontSize: titleFontSize }}>{adCopy.title}</h2>
              <p className="mb-6 max-w-md text-lg" style={{ fontFamily: captionFontFamily, fontSize: captionFontSize }}>{adCopy.caption}</p>
              {adCopy.callToAction && <div className="mb-6 rounded-full bg-red-600 px-6 py-2 text-xl font-semibold text-white shadow-lg" style={{ fontFamily: ctaFontFamily, fontSize: ctaFontSize }}>{adCopy.callToAction}</div>}
              <p className="text-sm opacity-80">{adCopy.hashtags.join(" ")}</p>
            </div>
          </div>
        );
      case "Bold":
        return (
          <div className="relative h-full w-full bg-black font-headline">
            <div className="absolute inset-0 grid grid-cols-2">
                <div className="relative h-full">
                    <Image src={imageDataUrl} alt="Ad content" layout="fill" objectFit="cover" data-ai-hint="product detail" />
                </div>
                <div className="flex flex-col items-start justify-center p-8 text-white overflow-auto break-words max-w-full">
                    <h2 className="text-5xl font-extrabold uppercase tracking-tighter break-words" style={{ fontFamily: titleFontFamily, fontSize: titleFontSize }}>{adCopy.title}</h2>
                    <p className="mt-4 text-base font-light break-words" style={{ fontFamily: captionFontFamily, fontSize: captionFontSize }}>{adCopy.caption}</p>
                    {adCopy.callToAction && <div className="mt-6 border-2 border-white px-8 py-2 text-lg font-bold uppercase break-words" style={{ fontFamily: ctaFontFamily, fontSize: ctaFontSize }}>{adCopy.callToAction}</div>}
                </div>
            </div>
          </div>
        );
      case "Luxury":
        return (
          <div className="relative h-full w-full bg-[#1A1A1A] font-body">
              <Image src={imageDataUrl} alt="Luxury product" layout="fill" objectFit="cover" className="opacity-50" data-ai-hint="luxury texture"/>
              <div className="absolute inset-0 flex flex-col items-center justify-between p-10 text-center">
                <div></div>
                <div className="text-white">
                  <h2 className="font-headline text-5xl font-thin tracking-widest text-amber-300/90" style={{ fontFamily: titleFontFamily, fontSize: titleFontSize }}>{adCopy.title.toUpperCase()}</h2>
                  <p className="mt-4 max-w-lg text-lg text-gray-300" style={{ fontFamily: captionFontFamily, fontSize: captionFontSize }}>{adCopy.caption}</p>
                </div>
                {adCopy.callToAction && <div className="font-headline text-xl tracking-wider text-amber-300/90" style={{ fontFamily: ctaFontFamily, fontSize: ctaFontSize }}>{adCopy.callToAction}</div>}
              </div>
          </div>
        );
      case "Minimal":
      default:
        return (
          <div className="flex h-full w-full flex-col bg-white p-6">
            <div className="relative mb-4 flex-1">
              <Image src={imageDataUrl} alt="Ad content" layout="fill" objectFit="cover" className="rounded-md" data-ai-hint="minimalist product"/>
            </div>
            <div className="text-gray-800">
              <h2 className="font-headline text-2xl font-semibold" style={{ fontFamily: titleFontFamily, fontSize: titleFontSize }}>{adCopy.title}</h2>
              <p className="mt-2 text-sm text-gray-600 font-body" style={{ fontFamily: captionFontFamily, fontSize: captionFontSize }}>{adCopy.caption}</p>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-gray-500 font-body">{adCopy.hashtags.join(" ")}</p>
                {adCopy.callToAction && <div className="rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white" style={{ fontFamily: ctaFontFamily, fontSize: ctaFontSize }}>{adCopy.callToAction}</div>}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="sticky top-8">
      <div
        ref={previewRef}
        className={cn(
          "mx-auto w-full max-w-lg overflow-hidden rounded-xl bg-background shadow-2xl shadow-primary/20 transition-all duration-300",
          "data-[loading=false]:animate-in data-[loading=false]:zoom-in-95",
          aspectRatioClasses[aspectRatio]
        )}
        style={{ width: "100%", height: "auto", minHeight: "400px" }}
        data-loading={isLoading || !adCopy}
      >
        {isLoading ? (
           <Skeleton className="h-full w-full" />
        ) : (
            renderTemplate()
        )}
      </div>
       <p className="mt-4 text-center text-sm text-muted-foreground">
        Live preview of your advertisement
      </p>
    </div>
  );
}
