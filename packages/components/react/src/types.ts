export type Assign<Target, Source> = Omit<Target, keyof Source> & Source
