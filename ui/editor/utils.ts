export function isYoutubeLink(link: string): boolean {
  const regex = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
  return regex.test(link);
}

export function extractYoutubeId(link: string): string {
  const regex = /(?:v=|\/)([0-9A-Za-z_-]{11}).*/;
  const match = link.match(regex);
  return match ? match[1] : '';
}
