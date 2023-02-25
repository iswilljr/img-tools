import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/Button';
import { uploadFile } from '@/utils/upload';
import { compressImage } from '@/utils/compress-image';
import { Input } from '@/components/Input';
import { SectionHome } from '@/components/SectionHome';

export default function RotateHome() {
  const router = useRouter();
  const [publicId, setPublicId] = useState<string>();
  const [quality, setQuality] = useState(80);
  const [compressing, setCompressing] = useState(false);

  const disabled = !publicId || compressing;

  return (
    <>
      <SectionHome
        title="Compress Images Online"
        description="Reduce the size of an image by adjusting its quality."
        highlight="compress"
        onFileAccepted={async file => {
          const { publicId } = await uploadFile(file);
          setPublicId(publicId);
        }}
      />
      <section className="mx-auto mb-10 w-full px-6 text-center sm:max-w-4xl">
        <form
          onSubmit={e => {
            e.preventDefault();
            if (disabled) return;

            setCompressing(true);
            compressImage({ publicId, quality })
              .then(json => router.push(`/download/${json.publicId}?from=${publicId}`))
              .catch(console.error)
              .finally(() => setCompressing(false));
          }}
        >
          <Input
            id="quality"
            type="range"
            min={0}
            max={100}
            value={quality}
            onChange={e => setQuality(e.target.valueAsNumber)}
            disabled={disabled}
            label={
              <div className="flex items-center justify-between">
                <p>Best Compression</p>
                <p>Best Quality</p>
              </div>
            }
          />
          <div className="flex items-center justify-between text-white/70">
            {[...Array(11)].map((_, i) => (
              <span key={i} className="even:hidden sm:even:inline-flex">
                {i * 10}%
              </span>
            ))}
          </div>
          <div>
            <Button
              className="flex items-center justify-center"
              type="submit"
              disabled={disabled}
              loading={compressing}
            >
              Compress
            </Button>
          </div>
        </form>
      </section>
    </>
  );
}
