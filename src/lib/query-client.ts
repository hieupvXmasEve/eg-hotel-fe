"use client";
import { toast } from "@/hooks/use-toast";
import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";

import axios from "axios";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000, // 1 minute
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (axios.isAxiosError(error) && query.meta?.ERROR_SOURCE) {
        toast({
          title: `${query.meta.ERROR_SOURCE}: ${error.response?.data?.message}`,
          variant: "destructive",
        });
      }
    },
    onSuccess: (_data, query) => {
      if (query.meta?.SUCCESS_MESSAGE) {
        toast({
          title: query.meta.SUCCESS_MESSAGE as string,
        });
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      console.log("error", error);

      if (axios.isAxiosError(error) && mutation.meta?.ERROR_SOURCE) {
        toast({
          title: `${mutation.meta.ERROR_SOURCE}: ${error.response?.data?.message}`,
          variant: "destructive",
        });
      }
    },
    onSuccess: (_data, _variables, _context, mutation) => {
      if (mutation.meta?.SUCCESS_MESSAGE) {
        toast({
          title: mutation.meta.SUCCESS_MESSAGE as string,
        });
      }
    },
  }),
});
