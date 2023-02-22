export const uploadFile = (file: File) => {
  return new Promise<Record<string, string>>((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const url = reader.result?.toString() ?? '';

      fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: url }),
      })
        .then(res => res.json())
        .then(resolve)
        .catch(reject);
    });

    reader.readAsDataURL(file);
  });
};
