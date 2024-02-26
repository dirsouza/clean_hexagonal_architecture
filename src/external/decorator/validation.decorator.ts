import { Request } from 'express';
import { BadRequestError, createParamDecorator } from 'routing-controllers';
import { AnyZodObject, ZodError } from 'zod';

type TypesRequest = 'body' | 'query' | 'params';

export function Validation<T extends AnyZodObject>(options: {
  schema: Record<string, T>;
  type: TypesRequest;
}) {
  return createParamDecorator({
    required: true,
    async value(action) {
      try {
        const { schema, type } = options;
        const data = (action.request as Request)[type];
        return await schema[type].parseAsync(data);
      } catch (error) {
        if (error instanceof ZodError) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          throw new BadRequestError(error.flatten().fieldErrors as any);
        }
        return new BadRequestError(JSON.stringify(error));
      }
    }
  });
}
