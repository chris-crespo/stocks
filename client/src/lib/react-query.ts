import { DefaultOptions, QueryClient, UseMutationOptions, UseQueryOptions } from "react-query";
import { Result } from "ts-results";

const queryConfig: DefaultOptions = {
  queries: {
    keepPreviousData: true,
    staleTime: 5000,
    refetchOnWindowFocus: false,
    retry: false
  }
}

export const queryClient = new QueryClient({ defaultOptions: queryConfig })

export type QueryConfig<T> = Omit<
  UseQueryOptions<T>,
  'queryKey' | 'queryFn'
>

export type MutationConfig<T, E> = UseMutationOptions<Result<T, E>, unknown, unknown>
