import { Home } from '@/components/Home';

export default function NotFound() {
  return (
    <Home
      title={
        <>
          Unfortunately, this page could <span className="text-primary-6">Not be Found</span>
        </>
      }
      description="Select from the image editing tools below the one you are looking for and start editing your images."
    />
  );
}
