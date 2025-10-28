import { getTrailerByIdAndType } from "../api/tvApi.js";

export async function getTrailerUrl(movieId, type) {
  const data = await getTrailerByIdAndType(movieId, type);
  const trailer = data.results.find(
    (vid) => vid.type === "Trailer" && vid.site === "YouTube"
  );
  return trailer ? trailer.key : null;
}
