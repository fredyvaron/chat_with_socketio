import axios from "axios";

export const local_url = import.meta.env.VITE_REACT_APP_URL_LOCAL;
export const getidconversation = async (payload) => {
  let { data } = await axios.post(`${local_url}/conversation/ids`, payload);
  if (data) {
    return data.data.id;
  }
};
export const putReadConversation = async (id) => {
  const json = await axios.put(`${local_url}/message/read/${id}`);

  return json;
};
