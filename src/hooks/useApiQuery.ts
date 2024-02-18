import { useQuery } from '@tanstack/react-query';
import { ZodSchema, z } from 'zod';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.ipor.io',
});

export const useApiQuery = <TSchema extends ZodSchema>({
  chainId,
  path,
  schema,
}: {
  chainId: number;
  path: string;
  schema: TSchema;
}) => {
  const queryResult = useQuery<z.infer<typeof schema>>({
    queryKey: [path, chainId],
    queryFn: async () => {
      const { data } = await apiClient.get(path);

      return schema.parse(data);
    },
  });

  return queryResult;
};
