import clsx from 'clsx';
import { NextSeo } from 'next-seo';
import { FormButtons, type FormButtonsProps } from './FormButtons';
import type { ToolProps } from './Tool';

interface EditorProps extends React.FormHTMLAttributes<HTMLFormElement> {
  formButtonProps: FormButtonsProps;
  content: React.ReactNode;
  tool: ToolProps;
}

export function Editor({ formButtonProps, className, content, children, tool, ...props }: EditorProps) {
  return (
    <div className="flex flex-col sm:h-[calc(100vh-64px)] sm:flex-row">
      <NextSeo title={tool.title} description={tool.description} />
      <section className="flex h-full w-full overflow-auto overflow-x-hidden border-b border-gray-700 sm:min-w-[20rem] sm:max-w-[20rem] sm:border-r sm:border-b-transparent">
        <form {...props} className={clsx('flex w-full flex-col justify-between px-6 pt-6 sm:h-full', className)}>
          <div>{children}</div>
          <FormButtons {...formButtonProps} />
        </form>
      </section>
      <section className="relative flex h-full w-full items-center justify-center p-6">{content}</section>
    </div>
  );
}
