import {
  MutationFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import {
  createSighting,
  getAllKaki,
  getKakiDash,
  getKakiDetail,
  getKakiPairings,
  getKakiSightings,
  getPairing,
  getSighting,
} from '../apis/kaki'

export function useKaki(id: number) {
  const query = useQuery({
    queryKey: ['kakis', 'sightings'],
    queryFn: () => getKakiDetail(id),
  })
  return {
    ...query,
    // Extra queries go here e.g. addKaki
  }
}

export function useGetAllKaki() {
  const query = useQuery({ queryKey: ['kakis'], queryFn: () => getAllKaki() })
  return { ...query }
}
export function useAddSightingMutation() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: createSighting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sightings'] })
    },
  })
  return mutation
}
export function useSightings(id: string) {
  const query = useQuery({
    queryKey: ['sightings'],
    queryFn: () => getKakiSightings(Number(id)),
  })
  return {
    ...query,
  }
}

export function useSightingbyId(id: string) {
  const query = useQuery({
    queryKey: [`sighting${id}`],
    queryFn: () => getSighting(id),
  })
  return {
    ...query,
  }
}
export function usePairingbyId(id: string) {
  const query = useQuery({
    queryKey: [`pairing${id}`],
    queryFn: () => getPairing(id),
  })
  return {
    ...query,
  }
}
export function usePairings(id: number) {
  const query = useQuery({
    queryKey: ['pairings'],
    queryFn: () => getKakiPairings(id),
  })
  return {
    ...query,
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
