export interface Icon {
  name: string;
  tags: string[];
  versions: {
    svg: string[];
    font: string[];
  };
  color: string;
  aliases: {
    base: string;
    alias: string;
  }[];
}
