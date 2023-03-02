/* eslint-disable @typescript-eslint/no-non-null-assertion */

export interface GuideProps {
  editor: string;
  title: string;
  step: string;
  label?: string;
  buttonLabel?: string;
  withChooseImageStep?: boolean;
}

export function Guide({ editor, title, step, label, buttonLabel, withChooseImageStep = true }: GuideProps) {
  const chooseImageLabel = '"Choose Your Image"';
  const defaultButtonLabel = `${editor.at(0)!.toUpperCase()}${editor.slice(1)}`;

  return (
    <div className="mx-auto mt-10 w-fit max-w-md px-6 pb-10 sm:max-w-4xl">
      <h2 className="text-center text-3xl font-bold">{title}</h2>
      <ol className="mt-3 list-inside list-decimal space-y-2 text-left">
        {withChooseImageStep && (
          <li>
            Click on the <strong className="font-bold">{chooseImageLabel}</strong> button to load your image.
          </li>
        )}
        <li>{step}</li>
        <li>
          Click the <strong className="font-bold">{`"${buttonLabel ?? defaultButtonLabel}"`}</strong> button to{' '}
          {label ?? editor} your image.
        </li>
      </ol>
    </div>
  );
}
