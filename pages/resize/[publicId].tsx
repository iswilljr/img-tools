import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { Input } from '@/components/Inputs/Input';
import { resizeImage } from '@/utils/resize-image';
import { resizeTool } from '@/utils/tools';
import { Editor } from '@/components/Tool/Editor';
import { useSubmit } from '@/hooks/use-submit';

const getAspectRatioValue = (n: number, first: number, base: number) => {
  return Math.round(n / (first / base));
};

export default function ResizeEditor({ url, width: initialWidth, height: initialHeight, publicId }: BaseProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [resizing, setResizing] = useState(false);
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  const [transparent, setTransparent] = useState(false);
  const [bgColor, setBgColor] = useState('#000000');

  const handleDimensionsChange = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>,
      first: number,
      base: number,
      setValue: (value: number) => void,
      setBase: (value: number) => void
    ) => {
      const value = event.target.valueAsNumber;
      if (Number.isNaN(value)) return;

      setValue(value);
      if (lockAspectRatio) setBase(getAspectRatioValue(value, first, base));
    },
    [lockAspectRatio]
  );

  const handleSubmit = useSubmit({
    publicId,
    editor: 'resize',
    defaultError: 'Error resizing image',
    loading: 'Resizing image',
    success: 'Image successfully resized',
    shouldCancel: () => resizing || setResizing(true),
    onSubmit: () =>
      resizeImage({ publicId, width, height, background: lockAspectRatio || transparent ? '#0000' : bgColor }),
    onFinish: () => setResizing(false),
  });

  return (
    <Editor
      tool={resizeTool}
      formButtonProps={{ label: 'Resize', disabled: resizing }}
      onReset={() => {
        setWidth(initialWidth);
        setHeight(initialHeight);
        setLockAspectRatio(true);
      }}
      onSubmit={handleSubmit}
      content={<Image priority width={initialWidth} height={initialHeight} ref={imgRef} alt="Resize me" src={url} />}
    >
      <h2 className="text-2xl font-semibold">Resize Settings</h2>
      <Input
        id="width"
        label="Width"
        type="number"
        min={1}
        value={width}
        onChange={e => handleDimensionsChange(e, initialWidth, initialHeight, setWidth, setHeight)}
        disabled={resizing}
      />
      <Input
        id="height"
        label="Height"
        type="number"
        min={1}
        value={height}
        onChange={e => handleDimensionsChange(e, initialHeight, initialWidth, setHeight, setWidth)}
        disabled={resizing}
      />
      <div className={clsx('mt-3 flex items-center gap-2', { 'text-white/50': resizing })}>
        <input
          className="appearance-none rounded-sm focus:border-none focus:outline-none focus:ring-0 disabled:bg-white/50 disabled:hover:bg-white/50"
          id="lock"
          type="checkbox"
          checked={lockAspectRatio}
          disabled={resizing}
          onChange={() => {
            setLockAspectRatio(lockAspectRatio => {
              if (!lockAspectRatio) {
                setWidth(initialWidth);
                setHeight(initialHeight);
              }
              return !lockAspectRatio;
            });
          }}
        />
        <label htmlFor="lock">Lock Aspect Ratio</label>
      </div>
      <div
        className={clsx('mt-4 flex transform flex-col gap-4 rounded-lg duration-300', {
          'pointer-events-none -translate-x-full opacity-0 ': lockAspectRatio,
          'translate-x-0': !lockAspectRatio,
          'text-white/50': resizing,
        })}
      >
        <div>Background Fill</div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <div className="flex w-full cursor-pointer items-center gap-4" onClick={() => setTransparent(false)}>
              <span
                className={clsx('h-5 w-5 rounded-full border border-gray-600', {
                  '!border-white bg-primary-6': !transparent,
                })}
              />
              Pick a color
            </div>
            {!transparent && (
              <label htmlFor="color" className="relative flex cursor-pointer items-center gap-3">
                <div className="ml-auto flex items-center gap-4">{bgColor}</div>
                <div className="relative h-6 w-6 rounded" style={{ backgroundColor: bgColor }} />
                <input
                  value={bgColor}
                  onChange={e => setBgColor(e.target.value)}
                  disabled={resizing}
                  className="absolute right-0 h-6 w-6 cursor-pointer opacity-0"
                  type="color"
                  id="color"
                />
              </label>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex w-full cursor-pointer items-center gap-4" onClick={() => setTransparent(true)}>
              <span
                className={clsx('h-5 w-5 rounded-full border border-gray-600', {
                  '!border-white bg-primary-6': transparent,
                })}
              />
              Transparent
            </div>
          </div>
        </div>
      </div>
    </Editor>
  );
}

export { defaultGetServerSideProps as getServerSideProps } from '@/utils/get-resource';
