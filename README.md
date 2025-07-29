# Snap2AD - AI-Powered Ad Creator

## Overview
Snap2AD is a powerful AI-driven ad creation tool that analyzes your images and generates compelling ad copy tailored to your product. Customize fonts, templates, and aspect ratios to create professional ads quickly. The app supports image upload, AI analysis, ad copy generation, editable ad content, and high-quality ad preview downloads. Perfect for marketers and small businesses looking to streamline ad creation.

## Features
- AI-powered image analysis to identify themes and objects.
- Automated ad copy generation based on image content.
- Multiple customizable templates and aspect ratios.
- Font family and size customization for titles, captions, and calls to action.
- Editable ad content allowing users to customize text directly.
- High-quality ad preview with download functionality.
- Responsive and user-friendly interface built with React and Next.js.
- Download ads as high-resolution images with accurate styling.

## Requirements
- Node.js (version 16 or higher recommended)
- npm or yarn package manager
- Modern web browser for running the app

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/dhanashri-1/Snap2AD.git
   ```
2. Navigate to the project directory:
   ```
   cd Snap2AD
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm run dev
   ```
5. Open your browser and go to:
   ```
   http://localhost:9002
   ```

## Usage
1. Upload an image using the image uploader.
2. The app will analyze the image and generate ad copy automatically.
3. Customize the ad by editing the text content, selecting templates, fonts, and aspect ratios.
4. Preview the ad in real-time.
5. Download the final ad image in high resolution.

## File Structure
- `src/app/page.tsx`: Main page component with ad creation logic.
- `src/components/ad-genius/`: UI components for ad controls, preview, header, and image uploader.
- `src/ai/flows/`: AI integration for image analysis and ad copy generation.
- `src/hooks/use-toast.ts`: Toast notification hook.
- `src/types/dom-to-image-more.d.ts`: Type declarations for image generation library.
- Configuration files: `package.json`, `tsconfig.json`, `next.config.ts`, etc.


---

Thank you for choosing Snap2AD!
