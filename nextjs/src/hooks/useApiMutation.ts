"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


type MutationFunction<TResult, TVariables> = (
  variables: TVariables
) => Promise<TResult>;

interface UseApiMutationOptions<TResult> {
  onSuccess?: (data: TResult) => void;
  onError?: (error: Error) => void;
}

export const useApiMutation = <TResult, TVariables>(
  mutationFn: MutationFunction<TResult, TVariables>,
  options: UseApiMutationOptions<TResult> = {}
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const mutate = async (variables: TVariables) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await mutationFn(variables);

      options.onSuccess?.(result);

     
      router.refresh();

      return result;
    } catch (err) {
      const errorMessage = (err as Error).message;
      setError(errorMessage);

      options.onError?.(err as Error);

      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error, setError };
};
