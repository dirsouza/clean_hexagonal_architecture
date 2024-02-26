import { UserCreateSchema } from './user-create.schema';

export const LoginSchema = {
  body: UserCreateSchema.body.omit({ name: true })
};
