import axios from "axios";

export const local_url = import.meta.env.VITE_REACT_APP_URL_LOCAL;
export const getidconversation = async (payload) => {
  console.log(payload, "getidconversation payload peticion");
  let { data } = await axios.post(`${local_url}/conversation/ids`, payload);
  console.log(data.data, "data de getidconversation in service" ,data.data.id)
  if (data) {
    return data.data.id;
  }
};
export const putReadConversation = async (id) => {
  console.log(id, "id de read conversation")
  const json = await axios.put(`${local_url}/message/read/${id}`);

  return json;
};
