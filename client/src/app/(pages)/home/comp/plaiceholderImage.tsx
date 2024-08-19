// server-side utility function
import { getPlaiceholder } from "plaiceholder";

export async function getBase64Placeholder(imageUrl: string) {
  const buffer = await fetch(imageUrl).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );
  const { base64 } = await getPlaiceholder(buffer);
  return base64;
}
