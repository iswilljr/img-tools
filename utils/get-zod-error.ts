import type { ZodIssue } from 'zod';

export const getZodError = (error: ZodIssue) => {
  const { code, message, path: paths } = error;

  const path = paths.reduce<string>((acc, path, i) => {
    const next = typeof paths[i + 1] === 'string' ? '.' : '';
    const value = typeof path === 'string' ? path : `[${path}]`;

    return `${acc}${value}${next}`;
  }, '');

  if (message === 'Required') {
    return `${path} is required`;
  }

  if (code === 'invalid_type') {
    return `Expected ${path} to be ${error.expected}, received ${error.received}`;
  }
  if (code === 'invalid_string' && error.validation === 'url') {
    return `Expected ${path} to be an url`;
  }

  if (code === 'too_small' || code === 'too_big') {
    return message.replace('Number', path);
  }

  if (code === 'invalid_enum_value') {
    return `Expected path to be one of ${error.options.map(option => `'${option}'`).join(' | ')}, received '${
      error.received
    }'`;
  }

  return message;
};
