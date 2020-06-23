import axios from "axios";

const baseUrl = "http://localhost:3500/api/deals";

const createDeal = async (newDeal) => {
  const response = await axios.post(baseUrl, newDeal);
  return response.data;
};

const getDeals = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};
export default { createDeal, getDeals };
