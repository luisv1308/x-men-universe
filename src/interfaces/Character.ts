interface Character {
  id: number;
  name: string;
  description: string;
  thumbnail: { path: string; extension: string };
}

export default Character;
