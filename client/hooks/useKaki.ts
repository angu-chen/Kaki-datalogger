import {
  MutationFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import {
  createPairing,
  createSighting,
  delSighting,
  getAllKaki,
  getKakiDash,
  getKakiDetail,
  getKakiPairings,
  getKakiSightings,
  getPairing,
  getSighting,
  updatePairing,
  updateSighting,
} from '../apis/kaki'
import { queryKeys } from './queryKeys'

export function useKaki(id: number) {
  const query = useQuery({
    queryKey: queryKeys.kakis.dash(),
    queryFn: () => getKakiDetail(id),
  })
  return {
    ...query,
    // Extra queries go here e.g. addKaki
  }
}

export function useGetAllKaki() {
  const query = useQuery({
    queryKey: queryKeys.kakis.all,
    queryFn: () => getAllKaki(),
  })
  return { ...query }
}
export function useAddSightingMutation() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: createSighting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.kakis.sightings() })
      queryClient.invalidateQueries({ queryKey: queryKeys.sightings.all })
    },
  })
  return mutation
}

export function useAddPairingMutation() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: createPairing,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.kakis.pairings() })
      queryClient.invalidateQueries({ queryKey: queryKeys.pairings.all })
    },
  })
  return mutation
}

export function useDelSightingMutation() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: delSighting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.kakis.sightings() })
      queryClient.invalidateQueries({ queryKey: queryKeys.sightings.all })
    },
  })
  return mutation
}

export function useUpdateSightingMutation() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: updateSighting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.kakis.sightings() })
      queryClient.invalidateQueries({ queryKey: queryKeys.sightings.all })
    },
  })
  return mutation
}

export function useUpdatePairingMutation() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: updatePairing,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.kakis.pairings() })
      queryClient.invalidateQueries({ queryKey: queryKeys.pairings.all })
    },
  })
  return mutation
}

export function useSightings(id: string) {
  const query = useQuery({
    queryKey: queryKeys.sightings.all,
    queryFn: () => getKakiSightings(Number(id)),
  })
  return {
    ...query,
  }
}

export function useSightingbyId(id: string) {
  const query = useQuery({
    queryKey: queryKeys.sightings.detail(id),
    queryFn: () => getSighting(id),
  })
  return {
    ...query,
  }
}
export function usePairingbyId(id: string) {
  const query = useQuery({
    queryKey: queryKeys.pairings.detail(id),
    queryFn: () => getPairing(id),
  })
  return {
    ...query,
  }
}
export function usePairings(id: number) {
  const query = useQuery({
    queryKey: queryKeys.pairings.all,
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
  const query = useQuery({
    queryKey: queryKeys.kakis.dash(),
    queryFn: getKakiDash,
  })
  return {
    ...query,
  }
}
