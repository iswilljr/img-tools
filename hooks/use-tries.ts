import { useEffect, useState } from 'react';

interface Tries<T> {
  tryFn: (tries: number) => Promise<T>;
  retry: (arg: T) => boolean;
  maxTries: number;
}

export function useTries<T>({ tryFn, retry, maxTries }: Tries<T>) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tries, setTries] = useState(1);

  useEffect(() => {
    if (tries >= maxTries) {
      setLoading(false);
      return;
    }

    let timeout: NodeJS.Timeout;

    tryFn(tries)
      .then(() => setTries(maxTries))
      .catch(res => {
        const shouldRetry = retry(res);
        if (!shouldRetry) {
          setError(true);
          return setTries(maxTries);
        }

        timeout = setTimeout(
          () =>
            setTries(tries => {
              const value = ++tries;
              if (value >= maxTries) setError(true);
              return value;
            }),
          3000
        );
      });

    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxTries, tries]);

  return { loading, error };
}
