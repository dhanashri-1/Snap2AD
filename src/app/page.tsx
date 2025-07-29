"use client";

import { useCallback, useRef, useState } from "react";
import domtoimage from "dom-to-image-more";
import html2canvas from "html2canvas";
import { useToast } from "@/hooks/use-toast";
import type { AnalyzeImageOutput } from "@/ai/flows/analyze-image";
import type { GenerateAdCopyOutput } from "@/ai/flows/generate-ad-copy";
import { analyzeImage } from "@/ai/flows/analyze-image";
import { generateAdCopy } from "@/ai/flows/generate-ad-copy";

import { Header } from "@/components/ad-genius/header";
import { ImageUploader } from "@/components/ad-genius/image-uploader";
import { AdControls } from "@/components/ad-genius/ad-controls";
import { AdPreview } from "@/components/ad-genius/ad-preview";

export default function AdGeniusPage() {
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalyzeImageOutput | null>(null);
  const [adCopy, setAdCopy] = useState<GenerateAdCopyOutput | null>(null);
  const [template, setTemplate] = useState("Minimal");
  const [aspectRatio, setAspectRatio] = useState("Square");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const previewRef = useRef<HTMLDivElement>(null);

  // New state for font family and size for title, caption, and call to action
  const [titleFontFamily, setTitleFontFamily] = useState("Arial, sans-serif");
  const [titleFontSize, setTitleFontSize] = useState(40);
  const [captionFontFamily, setCaptionFontFamily] = useState("Arial, sans-serif");
  const [captionFontSize, setCaptionFontSize] = useState(16);
  const [ctaFontFamily, setCtaFontFamily] = useState("Arial, sans-serif");
  const [ctaFontSize, setCtaFontSize] = useState(18);

  const handleImageUpload = useCallback(
    async (file: File) => {
      setIsLoading(true);
      setAdCopy(null);
      setAnalysis(null);

      const reader = new FileReader();
      reader.onload = async (e) => {
        const dataUrl = e.target?.result as string;
        if (!dataUrl) {
          toast({
            title: "Error",
            description: "Could not read the image file.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        setImageDataUrl(dataUrl);

        try {
          toast({ title: "🧠 Analyzing image...", description: "Identifying objects and theme." });
          const analysisResult = await analyzeImage({ photoDataUri: dataUrl });
          setAnalysis(analysisResult);

          toast({ title: "✍️ Generating ad copy...", description: "Crafting the perfect words for your ad." });
          const adCopyResult = await generateAdCopy({
            photoDataUri: dataUrl,
            theme: analysisResult.theme,
            productName: analysisResult.objects[0] || "our product",
          });
          setAdCopy(adCopyResult);
          toast({ title: "✅ Success!", description: "Your ad is ready to customize." });
        } catch (err) {
          console.error(err);
          toast({
            title: "AI Generation Failed",
            description: "Something went wrong. Please try a different image or try again later.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      };
      reader.onerror = () => {
        toast({
          title: "Error",
          description: "Failed to read the file.",
          variant: "destructive",
        });
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    },
    [toast]
  );

  const handleDownload = useCallback(async () => {
    if (!previewRef.current) {
      toast({
        title: "Error",
        description: "Could not find the ad preview to download.",
        variant: "destructive",
      });
      return;
    }

    const previewElement = previewRef.current;

    // Save original styles to restore later
    const originalStyles = {
      position: previewElement.style.position,
      top: previewElement.style.top,
      left: previewElement.style.left,
      width: previewElement.style.width,
      height: previewElement.style.height,
      overflow: previewElement.style.overflow,
      zIndex: previewElement.style.zIndex,
    };

    // Set styles to make the element fully visible and sized
    previewElement.style.position = "absolute";
    previewElement.style.top = "0";
    previewElement.style.left = "0";
    previewElement.style.width = `${previewElement.scrollWidth}px`;
    previewElement.style.height = `${previewElement.scrollHeight}px`;
    previewElement.style.overflow = "visible";
    previewElement.style.zIndex = "9999";

    // Helper function to wait for all images in the element to load
    function waitForImagesToLoad(element: HTMLElement): Promise<void> {
      const images = Array.from(element.querySelectorAll("img"));
      const promises = images.map(
        (img) =>
          new Promise<void>((resolve) => {
            if (img.complete) {
              resolve();
            } else {
              img.onload = () => resolve();
              img.onerror = () => resolve();
            }
          })
      );
      return Promise.all(promises).then(() => undefined);
    }

    try {
      toast({ title: "🚀 Preparing your download..." });

      // Wait for images to load and add a delay for fonts
      await waitForImagesToLoad(previewElement);
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Add CSS for better font smoothing and overrides for clarity
      previewElement.style.setProperty("-webkit-font-smoothing", "antialiased");
      previewElement.style.setProperty("-moz-osx-font-smoothing", "grayscale");
      previewElement.style.setProperty("border", "none");
      previewElement.style.setProperty("outline", "none");
      previewElement.style.setProperty("box-shadow", "none");
      previewElement.style.setProperty("font-weight", "700");
      previewElement.style.setProperty("font-size", "inherit");
      previewElement.style.setProperty("line-height", "1.2");
      previewElement.style.setProperty("overflow", "hidden");
      previewElement.style.setProperty("scrollbar-width", "none");
      previewElement.style.setProperty("-ms-overflow-style", "none");

      // Use html2canvas to capture the element
      const canvas = await html2canvas(previewElement, {
        backgroundColor: "#fff",
        scale: 6,
        useCORS: true,
        scrollX: -window.scrollX,
        scrollY: -window.scrollY,
        windowWidth: document.documentElement.offsetWidth,
        windowHeight: document.documentElement.offsetHeight,
      });

      // Convert canvas to blob and trigger download
      canvas.toBlob((blob) => {
        if (!blob) {
          toast({
            title: "Download Failed",
            description: "Could not generate the image file for download. Please try again.",
            variant: "destructive",
          });
          return;
        }
        const link = document.createElement("a");
        link.download = `adgenius-${template.toLowerCase()}-${Date.now()}.png`;
        link.href = URL.createObjectURL(blob);
        link.click();
        URL.revokeObjectURL(link.href);
      }, "image/png");

    } catch (err) {
      console.error(err);
      toast({
        title: "Download Failed",
        description: "Something went wrong during image generation. Please try again.",
        variant: "destructive",
      });
    } finally {
      // Restore original styles
      previewElement.style.position = originalStyles.position;
      previewElement.style.top = originalStyles.top;
      previewElement.style.left = originalStyles.left;
      previewElement.style.width = originalStyles.width;
      previewElement.style.height = originalStyles.height;
      previewElement.style.overflow = originalStyles.overflow;
      previewElement.style.zIndex = originalStyles.zIndex;
    }
  }, [previewRef, template, toast]);

  return (
    <div className="flex min-h-screen flex-col bg-background font-body text-foreground">
      <Header />
      <main className="flex-1 px-4 py-8 md:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-8">
            <ImageUploader
              onImageUpload={handleImageUpload}
              imageDataUrl={imageDataUrl}
              isLoading={isLoading}
            />
            <AdControls
              adCopy={adCopy}
              setAdCopy={setAdCopy}
              template={template}
              setTemplate={setTemplate}
              aspectRatio={aspectRatio}
              setAspectRatio={setAspectRatio}
              handleDownload={handleDownload}
              isLoading={isLoading}
              titleFontFamily={titleFontFamily}
              setTitleFontFamily={setTitleFontFamily}
              titleFontSize={titleFontSize}
              setTitleFontSize={setTitleFontSize}
              captionFontFamily={captionFontFamily}
              setCaptionFontFamily={setCaptionFontFamily}
              captionFontSize={captionFontSize}
              setCaptionFontSize={setCaptionFontSize}
              ctaFontFamily={ctaFontFamily}
              setCtaFontFamily={setCtaFontFamily}
              ctaFontSize={ctaFontSize}
              setCtaFontSize={setCtaFontSize}
            />
          </div>
          <div className="row-start-1 lg:row-start-auto">
             <AdPreview
              previewRef={previewRef}
              imageDataUrl={imageDataUrl}
              adCopy={adCopy}
              template={template}
              aspectRatio={aspectRatio}
              isLoading={isLoading}
              titleFontFamily={titleFontFamily}
              titleFontSize={`${titleFontSize}px`}
              captionFontFamily={captionFontFamily}
              captionFontSize={`${captionFontSize}px`}
              ctaFontFamily={ctaFontFamily}
              ctaFontSize={`${ctaFontSize}px`}
            />
          </div>
        </div>
      </main>
      <footer className="py-4 text-center text-sm text-muted-foreground">
        <p>
          Powered by Generative AI. AdGenius &copy; 2024
        </p>
      </footer>
    </div>
  );
}
