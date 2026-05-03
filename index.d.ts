declare function emoticon(emotion: string, intensity?: number): string;
declare namespace emoticon {
  function random(): string;
  const emotions: string[];
}
export default emoticon;
export { random, emotions };
