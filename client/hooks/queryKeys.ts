export const queryKeys = {
  kakis: {
    all: ['kakis'] as const,

    list: () => [...queryKeys.kakis.all, 'list'] as const,

    sightings: () => [...queryKeys.kakis.all, 'sightings'] as const,

    dash: () => [...queryKeys.kakis.sightings(), 'dash'] as const,

    detail: (id: number) => [...queryKeys.kakis.all, 'detail', id] as const,

    pairings: () => [...queryKeys.kakis.all, 'pairings'] as const,
  },

  sightings: {
    all: ['sightings'] as const,

    detail: (id: number | string) =>
      [...queryKeys.sightings.all, 'detail', id] as const,
  },

  pairings: {
    all: ['pairings'] as const,

    detail: (id: number | string) =>
      [...queryKeys.pairings.all, 'detail', id] as const,
  },
}
