import { Tool, type ToolProps } from '@/components/Tool/Tool';
import { tools } from '@/utils/tools';
import type { GetStaticPaths, GetStaticProps } from 'next';

export default function ToolHome(props: ToolProps) {
  return <Tool {...props} />;
}

export const getStaticProps: GetStaticProps<ToolProps> = context => {
  const { tool } = context.params ?? {};

  if (typeof tool !== 'string' || !Object.hasOwn(tools, tool)) {
    return {
      notFound: true,
    };
  }

  return {
    props: tools[tool as keyof typeof tools],
  };
};

export const getStaticPaths: GetStaticPaths = context => {
  return {
    fallback: false,
    paths: Object.keys(tools).map(tool => ({ params: { tool } })),
  };
};
