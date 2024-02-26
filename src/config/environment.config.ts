import { z } from 'zod';

const environmentSchema = z.object({
  NODE_ENV: z.string(),
  API_PORT: z.string().transform(v => parseInt(v, 10)),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string()
});

export const envConfig = environmentSchema.parse(process.env);
