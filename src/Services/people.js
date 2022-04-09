import { axios } from "../Shared";

export const getPeopleDetail = async (id) => {
  const data = await axios
    .get(`/person/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return null;
    });
  return data;
};

export const getPeopleCredits = async (id) => {
  const data = await axios
    .get(`/person/${id}/combined_credits`)
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return null;
    });
  return data;
};

export const getPeopleExternal = async (id) => {
  const data = await axios
    .get(`/person/${id}/external_ids`)
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return null;
    });
  return data;
};
