interface RotateImageOptions {
  degrees: number;
  width: number;
  height: number;
  img: HTMLImageElement;
  ctx: CanvasRenderingContext2D;
  horizontallyFlipped: boolean;
  verticallyFlipped: boolean;
}

export const rotateImage = ({
  degrees,
  width,
  height,
  img,
  ctx,
  horizontallyFlipped,
  verticallyFlipped,
}: RotateImageOptions) => {
  const positionX = -width / 2;
  const positionY = -height / 2;
  const scaleX = horizontallyFlipped ? -1 : 1;
  const scaleY = verticallyFlipped ? -1 : 1;

  ctx.clearRect(0, 0, width, height);
  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.rotate((degrees * Math.PI) / 180.0);
  ctx.scale(scaleX, scaleY);
  ctx.translate(-positionX - width / 2, -positionY - height / 2);
  ctx.drawImage(img, positionX, positionY, width, height);
  ctx.restore();
};
