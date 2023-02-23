export async function downloadImage(imageSrc: string) {
  const image = await fetch(imageSrc);
  const imageBlog = await image.blob();
  const imageURL = URL.createObjectURL(imageBlog);

  const link = document.createElement('a');

  link.setAttribute('href', imageURL);
  link.setAttribute('download', '');
  link.setAttribute('hidden', '');

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
