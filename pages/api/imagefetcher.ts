import { NextApiRequest, NextApiResponse } from 'next';

const fn = async (req: NextApiRequest, res: NextApiResponse) => {
  const url = decodeURIComponent(req.query.url as string);
  const result = await fetch(url);
  const body = await result.body;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  body?.pipe(res);
};

export default fn;
