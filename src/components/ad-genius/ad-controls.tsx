"use client";

import type { Dispatch, SetStateAction } from "react";
import { Download, Edit } from "lucide-react";
import type { GenerateAdCopyOutput } from "@/ai/flows/generate-ad-copy";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

type AdControlsProps = {
  adCopy: GenerateAdCopyOutput | null;
  setAdCopy: Dispatch<SetStateAction<GenerateAdCopyOutput | null>>;
  template: string;
  setTemplate: Dispatch<SetStateAction<string>>;
  aspectRatio: string;
  setAspectRatio: Dispatch<SetStateAction<string>>;
  handleDownload: () => void;
  isLoading: boolean;

  titleFontFamily: string;
  setTitleFontFamily: Dispatch<SetStateAction<string>>;
  titleFontSize: number;
  setTitleFontSize: Dispatch<SetStateAction<number>>;
  captionFontFamily: string;
  setCaptionFontFamily: Dispatch<SetStateAction<string>>;
  captionFontSize: number;
  setCaptionFontSize: Dispatch<SetStateAction<number>>;
  ctaFontFamily: string;
  setCtaFontFamily: Dispatch<SetStateAction<string>>;
  ctaFontSize: number;
  setCtaFontSize: Dispatch<SetStateAction<number>>;
};

export function AdControls({
  adCopy,
  setAdCopy,
  template,
  setTemplate,
  aspectRatio,
  setAspectRatio,
  handleDownload,
  isLoading,
  titleFontFamily,
  setTitleFontFamily,
  titleFontSize,
  setTitleFontSize,
  captionFontFamily,
  setCaptionFontFamily,
  captionFontSize,
  setCaptionFontSize,
  ctaFontFamily,
  setCtaFontFamily,
  ctaFontSize,
  setCtaFontSize,
}: AdControlsProps) {
  const handleAdCopyChange = (
    field: keyof GenerateAdCopyOutput,
    value: string | string[]
  ) => {
    if (adCopy) {
      setAdCopy({ ...adCopy, [field]: value });
    }
  };

  const templates = ["Minimal", "Festive", "Bold", "Luxury"];
  const aspectRatios = ["Square", "Story", "Poster"];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customize Your Ad</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="template">Template</Label>
          <Tabs
            id="template"
            value={template}
            onValueChange={setTemplate}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4">
              {templates.map((t) => (
                <TabsTrigger key={t} value={t} disabled={isLoading || !adCopy}>
                  {t}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="aspectRatio">Format</Label>
          <Tabs
            id="aspectRatio"
            value={aspectRatio}
            onValueChange={setAspectRatio}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              {aspectRatios.map((ar) => (
                <TabsTrigger key={ar} value={ar} disabled={isLoading || !adCopy}>
                  {ar}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="grid gap-4">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Edit className="h-4 w-4" />
            <span>Edit AI-Generated Copy</span>
          </div>

          {/* Font family and size controls */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="titleFontFamily">Title Font Family</Label>
              <select
                id="titleFontFamily"
                value={titleFontFamily}
                onChange={(e) => setTitleFontFamily(e.target.value)}
                className="rounded border border-gray-300 p-2"
              >
                <option value="Arial, sans-serif">Arial</option>
                <option value="'Times New Roman', serif">Times New Roman</option>
                <option value="'Courier New', monospace">Courier New</option>
                <option value="'Georgia', serif">Georgia</option>
                <option value="'Verdana', sans-serif">Verdana</option>
                <option value="'Roboto', sans-serif">Roboto</option>
                <option value="'Lato', sans-serif">Lato</option>
                <option value="'Montserrat', sans-serif">Montserrat</option>
                <option value="'Open Sans', sans-serif">Open Sans</option>
                <option value="'Poppins', sans-serif">Poppins</option>
                <option value="'Merriweather', serif">Merriweather</option>
                <option value="'Playfair Display', serif">Playfair Display</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="titleFontSize">Title Font Size</Label>
              <input
                id="titleFontSize"
                type="number"
                value={titleFontSize}
                onChange={(e) => setTitleFontSize(Number(e.target.value))}
                className="rounded border border-gray-300 p-2"
                min={10}
                max={100}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="captionFontFamily">Caption Font Family</Label>
              <select
                id="captionFontFamily"
                value={captionFontFamily}
                onChange={(e) => setCaptionFontFamily(e.target.value)}
                className="rounded border border-gray-300 p-2"
              >
                <option value="Arial, sans-serif">Arial</option>
                <option value="'Times New Roman', serif">Times New Roman</option>
                <option value="'Courier New', monospace">Courier New</option>
                <option value="'Georgia', serif">Georgia</option>
                <option value="'Verdana', sans-serif">Verdana</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="captionFontSize">Caption Font Size</Label>
              <input
                id="captionFontSize"
                type="number"
                value={captionFontSize}
                onChange={(e) => setCaptionFontSize(Number(e.target.value))}
                className="rounded border border-gray-300 p-2"
                min={10}
                max={100}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ctaFontFamily">Call to Action Font Family</Label>
              <select
                id="ctaFontFamily"
                value={ctaFontFamily}
                onChange={(e) => setCtaFontFamily(e.target.value)}
                className="rounded border border-gray-300 p-2"
              >
                <option value="Arial, sans-serif">Arial</option>
                <option value="'Times New Roman', serif">Times New Roman</option>
                <option value="'Courier New', monospace">Courier New</option>
                <option value="'Georgia', serif">Georgia</option>
                <option value="'Verdana', sans-serif">Verdana</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ctaFontSize">Call to Action Font Size</Label>
              <input
                id="ctaFontSize"
                type="number"
                value={ctaFontSize}
                onChange={(e) => setCtaFontSize(Number(e.target.value))}
                className="rounded border border-gray-300 p-2"
                min={10}
                max={100}
              />
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </div>
          ) : adCopy ? (
            <>
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={adCopy.title}
                  onChange={(e) => handleAdCopyChange("title", e.target.value)}
                  placeholder="A Catchy Title"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="caption">Caption</Label>
                <Textarea
                  id="caption"
                  value={adCopy.caption}
                  onChange={(e) => handleAdCopyChange("caption", e.target.value)}
                  placeholder="A descriptive caption for your ad."
                  rows={4}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="hashtags">Hashtags</Label>
                <Input
                  id="hashtags"
                  value={adCopy.hashtags.join(" ")}
                  onChange={(e) =>
                    handleAdCopyChange("hashtags", e.target.value.split(" "))
                  }
                  placeholder="#relevant #hashtags"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cta">Call to Action</Label>
                <Input
                  id="cta"
                  value={adCopy.callToAction || ""}
                  onChange={(e) =>
                    handleAdCopyChange("callToAction", e.target.value)
                  }
                  placeholder="e.g. Shop Now, Book Today!"
                />
              </div>
            </>
          ) : (
            <p className="text-sm text-center text-muted-foreground py-10">Upload an image to get started.</p>
          )}
        </div>

        <Button
          size="lg"
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
          onClick={handleDownload}
          disabled={!adCopy || isLoading}
        >
          <Download className="mr-2 h-5 w-5" />
          Download Ad
        </Button>
      </CardContent>
    </Card>
  );
}
