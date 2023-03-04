import { useEffect, useState } from 'react';

interface Tries {
  tryFn: (tries: number) => Promise<any>;
  maxTries: number;
  errorMessage: string;
}

export function useTries({ tryFn, maxTries, errorMessage }: Tries) {
  const [error, setError] = useState<string | null>(null);
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
      .catch(() => {
        timeout = setTimeout(
          () =>
            setTries(tries => {
              const value = ++tries;
              if (value >= maxTries) setError(errorMessage);
              return value;
            }),
          3000
        );
      });

    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxTries, errorMessage, tries]);

  return { loading, error };
}
