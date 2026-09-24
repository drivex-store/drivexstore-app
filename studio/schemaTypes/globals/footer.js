export default {
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    {
      name: "navigation",
      title: "Footer Navigation Reference",
      type: "reference",
      to: [{ type: "navigation" }],
      description: "Footer Navigation"
    },
    { 
      name: "leftText", 
      title: "Left Text", 
      type: "array", 
      of: [{ type: "block" }] 
    },
    { 
      name: "contactInformation", 
      title: "Contact Information", 
      type: "array", 
      of: [{ type: "block" }] 
    },
    { 
      name: "copyrightNotice", 
      title: "Copyright Notice", 
      type: "array", 
      of: [{ type: "block" }] 
    },
    { 
      name: "showWatermark", 
      title: "Show Watermark", 
      type: "boolean" 
    },
    // ASCII Settings - Left
    { name: "asciiImageLeft", title: "ASCII Image (Left)", type: "image" },
    { name: "asciiDepthMapLeft", title: "ASCII Depth Map (Left)", type: "image" },
    { name: "asciiMobileFallbackLeft", title: "ASCII Mobile Fallback (Left)", type: "image" },
    { name: "asciiColorLeft", title: "ASCII Color (Left)", type: "string" },
    { name: "asciiColorDarkLeft", title: "ASCII Color Dark (Left)", type: "string" },
    { name: "asciiCellSizeLeft", title: "ASCII Cell Size (Left)", type: "number" },
    { name: "asciiParallaxIntensityLeft", title: "ASCII Parallax Intensity (Left)", type: "number" },
    { name: "asciiRevealOriginXLeft", title: "ASCII Reveal Origin X (Left)", type: "number" },
    { name: "asciiRevealOriginYLeft", title: "ASCII Reveal Origin Y (Left)", type: "number" },
    { name: "asciiImage", title: "ASCII Image (Right)", type: "image" },
    { name: "asciiDepthMap", title: "ASCII Depth Map (Right)", type: "image" },
    { name: "asciiMobileFallback", title: "ASCII Mobile Fallback (Right)", type: "image" },
    { name: "asciiColor", title: "ASCII Color (Right)", type: "string" },
    { name: "asciiColorDark", title: "ASCII Color Dark (Right)", type: "string" },
    { name: "asciiCellSize", title: "ASCII Cell Size (Right)", type: "number" },
    { name: "asciiParallaxIntensity", title: "ASCII Parallax Intensity (Right)", type: "number" },
    { name: "asciiRevealOriginX", title: "ASCII Reveal Origin X (Right)", type: "number" },
    { name: "asciiRevealOriginY", title: "ASCII Reveal Origin Y (Right)", type: "number" },
  ]
};
