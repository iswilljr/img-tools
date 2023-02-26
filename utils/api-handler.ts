import type { NextApiHandler } from 'next';
import { getZodError } from './get-zod-error';

export function apiHandler(handler: NextApiHandler): NextApiHandler {
  return async (req, res) => {
    if (req.method?.toLowerCase() !== 'post') {
      return res.status(405).end();
    }

    try {
      await handler(req, res);
    } catch (error: any) {
      const message = Array.isArray(error.errors)
        ? getZodError(error.errors[0])
        : error.message ?? 'Something went wrong';

      res.status(400).json({ message });
    }
  };
}
