import clsx from 'clsx';
import { IconLoader, IconUpload } from '@tabler/icons-react';
import { useDropzone, type Accept } from 'react-dropzone';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { Button } from '../Button';

export interface DropzoneProps {
  accept: Accept;
  onFileAccepted: (file: File) => Promise<void>;
}

const MAX_FILE_SIZE = 1000 ** 2;

export function Dropzone({ accept, onFileAccepted }: DropzoneProps) {
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    multiple: false,
    maxSize: MAX_FILE_SIZE,
    accept,
    onDropRejected: fileRejections =>
      setError(fileRejections[0].errors[0].message.replaceAll('/*', '').replace(`${MAX_FILE_SIZE} bytes`, '1 MB')),
    onDropAccepted: files => {
      setError('');
      setLoading(true);

      const getError = (err: any) => err.data.message ?? err.message ?? 'Error uploading image';

      toast
        .promise(onFileAccepted(files[0]), {
          error: getError,
          loading: 'Uploading image',
          success: 'Image successfully uploaded',
        })
        .then(() => setDisabled(true))
        .catch(err => setError(getError(err)))
        .finally(() => setLoading(false));
    },
  });

  return (
    <section className="mx-auto w-full px-6 text-center sm:max-w-4xl">
      <div className="relative rounded-lg bg-gradient-to-br from-primary-6 to-primary-8 bg-cover p-2">
        <div
          className={clsx('pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-lg', {
            'bg-white/40': loading,
            'bg-dark-8/40': disabled,
            'bg-green-600/40': !isDragReject && isDragActive,
            'bg-red-600/40': isDragReject,
          })}
        >
          {loading && <IconLoader className="animate-spin text-secondary-4" size={50} />}
        </div>
        <div className="rounded-lg border border-dashed border-white">
          <div {...getRootProps()} className="p-6 focus:outline-white">
            <input disabled={loading || disabled} {...getInputProps()} />
            <div className="mx-auto flex flex-col items-center justify-center space-y-2">
              <IconUpload size={120} />
              <p className="capitalize">Drop your image here</p>
            </div>
            <Button type="button" className="!w-fit capitalize" disabled={disabled}>
              Choose your image
            </Button>
          </div>
        </div>
      </div>
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </section>
  );
}
