import { useQuery } from '@tanstack/react-query'
import { getAllKaki } from '../apis/kaki'

export function useKakis() {
  const query = useQuery({ queryKey: ['kakis'], queryFn: getAllKaki })
  return {
    ...query,
  }
}
