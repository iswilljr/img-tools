/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { toast } from 'react-hot-toast';

interface UseSubmitOptions {
  editor: string;
  defaultError: string;
  loading: string;
  success: string;
  publicId: string;
  shouldCancel: () => boolean | void;
  onFinish: () => void;
  onSubmit: () => Promise<BaseResponse>;
}

export function useSubmit(options: UseSubmitOptions) {
  const router = useRouter();
  const { editor, defaultError, loading, success, publicId, shouldCancel, onSubmit, onFinish } = options;

  const onSubmitHandler = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (shouldCancel()) return;

      toast
        .promise(onSubmit(), {
          error: err => err.data?.message ?? err.message ?? defaultError,
          loading,
          success,
        })
        .then(res => router.push(`/download/${res.publicId}?from=${publicId}&editor=${editor}`))
        .catch(() => {})
        .finally(onFinish);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onSubmit, shouldCancel]
  );

  return onSubmitHandler;
}
