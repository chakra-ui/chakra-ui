export interface Options {
    src: string;
    onLoad?: (e: Event) => void;
    onError?: (e: string | Event) => void;
}
declare function useHasImageLoaded({ src, onLoad, onError }: Options): boolean;
export default useHasImageLoaded;
