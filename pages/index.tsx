import { Home } from '@/components/Layout/Home';

export default function HomePage() {
  return (
    <Home
      title={
        <>
          Free Online <span className="text-primary-6">Image Converter</span>
        </>
      }
      description="Edit and convert image files online from your browser. You can select your image editing tool below."
    />
  );
}
