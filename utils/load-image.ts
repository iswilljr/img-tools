export function loadImage(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.setAttribute('crossorigin', 'anonymous');
    image.setAttribute('src', url);
    image.onload = () => resolve(image);
    image.onerror = e => reject(e);
  });
}
