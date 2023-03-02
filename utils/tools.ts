import type { ToolProps } from '@/components/Tool';

export const tools = {
  compress: {
    title: 'Compress Images Online',
    description:
      'Change the file size of any image. With this image compressor, you can easily change the actual file size of your photos, pictures, and other image files!',
    shortDescription: 'Reduce the size of an image by adjusting its quality.',
    editor: 'compress',
    highlight: 'compress',
    guide: {
      title: 'How to Compress an Image?',
      step: 'Adjust the quality and select the exported format.',
    },
  },
  convert: {
    title: 'Convert Image To Image Online',
    description:
      'This image converter allows you to convert your pictures into other image formats. Convert JPG to PNG, JPG to SVG, PNG to WEBP and more.',
    shortDescription: 'Convert JPG to PNG, JPG to WEBP, PNG to GIF and more.',
    editor: 'convert',
    highlight: 'convert',
    guide: {
      title: 'How to Convert an Image?',
      step: 'Choose the image format you want to convert your picture to from the menu.',
    },
  },
  crop: {
    title: 'Online Image Cropping Tool',
    description:
      'Lead the eye to a certain part of your photo by using the image cropping tool. The easy to use editor allows you to crop image and photo files with a set ratio, custom sizes, and more.',
    shortDescription: 'Crop pictures online to get an exact cutout of the photo you want.',
    editor: 'crop',
    highlight: 'cropping',
    guide: {
      title: 'How To Crop an Image?',
      step: 'Draw a crop rectangle on the image.',
    },
  },
  resize: {
    title: 'Resize Image Files Online',
    description:
      'This image editing tool will help you to resize image files online. Resize an image using the width and/or height in pixels.',
    shortDescription: 'Change the size of an image online, from anywhere, and completely for free.',
    editor: 'resize',
    highlight: 'resize',
    guide: {
      title: 'How To Resize an Image?',
      step: 'Enter a new target size for your image.',
    },
  },
  rotate: {
    title: 'Mirror And Rotate Image Online',
    description:
      'Your image is upside down or inverted? This editing tool will allow you to rotate an image or mirror image files vertically and horizontally.',
    shortDescription: 'Rotate your image to the left or right, mirror it vertically or horizontally.',
    editor: 'rotate',
    highlight: 'rotate|mirror',
    guide: {
      title: 'How to Rotate an Image?',
      step: 'Click on the rotate buttons to rotate the image.',
    },
  },
} satisfies Record<string, ToolProps>;

export const {
  compress: compressTool,
  convert: convertTool,
  crop: cropTool,
  resize: resizeTool,
  rotate: rotateTool,
} = tools;
