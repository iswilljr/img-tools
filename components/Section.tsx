import { Shadow } from './Shadow';
import type { TablerIconsProps } from '@tabler/icons-react';
import Link from 'next/link';

export interface SectionProps {
  title: string;
  description: string;
  icon: (props: TablerIconsProps) => JSX.Element;
  tryItOut: string;
}

export function Section({ title, description, icon: Icon, tryItOut }: SectionProps) {
  return (
    <section className="relative w-full sm:last:col-span-2">
      <div className="flex h-full flex-col justify-between gap-4 odd:lg:flex-row-reverse even:lg:flex-row">
        <Link className="group relative w-full pb-6" href={tryItOut}>
          <h2 className="mt-5 flex items-center text-left text-3xl font-semibold leading-[1.15] text-primary-6 sm:text-5xl sm:leading-[1.15]">
            <span>
              <Icon className="mr-2 stroke-primary-6" size={48} />
            </span>
            {title}
          </h2>
          <div className="mt-6 text-left text-lg text-white/90">
            <p>{description}</p>
          </div>
          <span className="absolute -bottom-[1px] left-0 h-[4px] w-[0px] bg-white/90 duration-300 ease-out group-hover:w-full" />
        </Link>
      </div>
      <Shadow />
    </section>
  );
}
