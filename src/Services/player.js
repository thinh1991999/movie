import { axios } from "../Shared";

export const getTvSession = async (id, seasonNb) => {
  const data = await axios
    .get(`tv/${id}/season/${seasonNb}`)
    .then((res) => res.data)
    .catch((error) => {
      throw new Error(error);
    });
  return data;
};
