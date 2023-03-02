import { IconDownload, IconLink, IconWand } from '@tabler/icons-react';
import axios from 'redaxios';
import { urlToImgTool } from '@/utils/tools';
import { Input } from '@/components/Input';
import { ToolInfo } from '@/components/ToolInfo';
import { Translate } from '@/components/Translate';
import { Button } from '@/components/Button';
import { useState } from 'react';
import { useSubmit } from '@/hooks/use-submit';

const guide = [
  {
    icon: IconLink,
    description: 'Enter web page URL to convert to Image',
  },
  {
    icon: IconWand,
    description: 'Press "Convert" and start the magic!',
  },
  {
    icon: IconDownload,
    description: 'Download the result in seconds!',
  },
];

export default function UrlToImage() {
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState('');

  const handleSubmit = useSubmit({
    publicId: '',
    editor: 'url-2-img',
    defaultError: 'Error uploading image',
    loading: 'Uploading image',
    success: 'Image successfully uploaded',
    shouldCancel: () => uploading || setUploading(true),
    onSubmit: async () => {
      if (!/^https?:\/\//.test(url)) throw Error('Enter the url to convert');

      return (await axios.post('/api/editor/url2img', { url })).data;
    },
    onFinish: () => setUploading(false),
  });

  return (
    <Translate className="relative mx-auto flex h-full min-h-[calc(100vh-64px)] w-full flex-col items-center justify-center overflow-x-hidden p-6 px-6 sm:max-w-4xl">
      <ToolInfo {...urlToImgTool} />
      <section className="w-full pb-6">
        <form onSubmit={handleSubmit}>
          <Input
            className="!rounded-full border border-gray-700 bg-secondary-8/80 !px-6 !py-4 !pr-10 hover:border-gray-600 focus:border-primary-6"
            id="url"
            label="Url"
            placeholder="https://img-tools.vercel.app"
            labelProps={{ hidden: true }}
            value={url}
            onChange={e => setUrl(e.target.value)}
            disabled={uploading}
          />
          <Button className="!mt-2 !rounded-full" disabled={uploading} loading={uploading}>
            Convert
          </Button>
        </form>
        <ul className="mt-10 flex flex-col items-center justify-center gap-10 sm:flex-row">
          {guide.map(step => (
            <li key={step.description} className="flex w-44 flex-col items-center justify-center">
              <span className="mr-2">
                <step.icon className="text-primary-6" size={50} />
              </span>
              <p className="mt-2">{step.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </Translate>
  );
}
