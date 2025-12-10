import { pdfToImg } from "/node_modules/pdftoimg-js/dist/browser.mjs";

const supportedFormats = [
  {
    name: "Portable Document Format",
    format: "pdf",
    extension: "pdf",
    mime: "application/pdf",
    from: true,
    to: false,
    internal: "pdf"
  },
  {
    name: "Portable Network Graphics",
    format: "png",
    extension: "png",
    mime: "image/png",
    from: false,
    to: true,
    internal: "png"
  },
  {
    name: "Joint Photographic Experts Group JFIF",
    format: "jpeg",
    extension: "jpg",
    mime: "image/jpeg",
    from: false,
    to: true,
    internal: "jpeg"
  }
];

async function init () {

}

function base64ToBytes (base64) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function doConvert (inputFile, inputFormat, outputFormat) {

  const blob = new Blob([inputFile.bytes], { type: inputFormat.mime });
  const url = URL.createObjectURL(blob);

  const image = await pdfToImg(url, {
    imgType: outputFormat.format,
    pages: "firstPage"
  });

  const base64 = image.slice(image.indexOf(";base64,") + 8);
  return base64ToBytes(base64);

}

export default {
  name: "pdftoimg-js",
  init,
  supportedFormats,
  doConvert
};
