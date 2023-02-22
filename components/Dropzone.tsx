import clsx from 'clsx';
import { IconLoader, IconUpload } from '@tabler/icons-react';
import { useDropzone, type Accept } from 'react-dropzone';
import { useState } from 'react';

interface DropzoneProps {
  accept: Accept;
  onFileAccepted: (file: File) => Promise<void>;
}

export function Dropzone({ accept, onFileAccepted }: DropzoneProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    multiple: false,
    accept,
    onDropRejected: fileRejections => setError(fileRejections[0].errors[0].message.replaceAll('/*', '')),
    onDropAccepted: files => {
      setError('');
      setLoading(true);
      onFileAccepted(files[0])
        .catch(() => setError('Somethin went wrong'))
        .finally(() => setLoading(false));
    },
  });

  return (
    <section className="mx-auto mb-10 w-full px-6 text-center sm:max-w-4xl">
      <div className="relative rounded-lg bg-gradient-to-r from-primary-8 to-secondary-8 bg-cover p-2">
        <div
          className={clsx('pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-lg', {
            'bg-white/60': loading,
            'bg-green-600/40': !isDragReject && isDragActive,
            'bg-red-600/40': isDragReject,
          })}
        >
          {loading && <IconLoader className="animate-spin text-secondary-4" size={50} />}
        </div>
        <div className="rounded-lg border border-dashed border-white">
          <div {...getRootProps()} className="p-6 focus:outline-white">
            <input {...getInputProps()} />
            <div className="mx-auto flex flex-col items-center justify-center space-y-2">
              <IconUpload size={120} />
              <p className="capitalize">Drop your file here</p>
            </div>
            <button
              type="button"
              className=" mt-3 flex-1 rounded-md bg-primary-6 px-6 py-2 capitalize hover:bg-primary-5"
            >
              Choose your file
            </button>
          </div>
        </div>
      </div>
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </section>
  );
}
