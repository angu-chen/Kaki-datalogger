import {
  MutationFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { getAllKaki, getKakiDash } from '../apis/kaki'

export function useKakis() {
  const query = useQuery({ queryKey: ['kakis'], queryFn: getAllKaki })
  return {
    ...query,

    // Extra queries go here e.g. addKaki
  }
}

export function useKakiMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kakis'] })
    },
  })
  return mutation
}

export function useKakiDash() {
  const query = useQuery({ queryKey: ['kakiDash'], queryFn: getKakiDash })
  return {
    ...query,
  }
}
