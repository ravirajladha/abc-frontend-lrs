export function formatSentence(text, limit) {
  const words = text.split(' ');
  const truncated = words.slice(0, limit).join(' ');
  return words.length > limit ? `${truncated}...` : truncated;
}
