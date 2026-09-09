import Axios from "../config/axios";
import { ErrorHandler } from "../utils/ErrorHandler";

const get = async (endpoint: string, params?: object) => {
  const cleanParams = Object.fromEntries(Object.entries(params ?? {}).filter(
    ([, value]) => value !== undefined && value !== ""
  ));
  try {
    const result = await Axios.get(endpoint, { params: cleanParams });
    if (result.status === 200) return result.data;
    else throw result;
  } catch (error) {
    throw ErrorHandler(error);
  };
};

const post = async (endpoint: string, data: object) => {
  try {
    const result = await Axios.post(endpoint, data);
    if (result.status === 200 || result.status === 201) return result.data;
    else throw result;
  } catch (error) {
    throw ErrorHandler(error);
  };
};

const patch = async (endpoint: string, data: object) => {
  try {
    const result = await Axios.patch(endpoint, data);
    if (result.status === 200) return result.data;
    else throw result;
  } catch (error) {
    throw ErrorHandler(error);
  };
};

const deleted = async (endpoint: string) => {
  try {
    const result = await Axios.delete(endpoint);
    if (result.status === 200) return result.data;
    else throw result;
  } catch (error) {
    throw ErrorHandler(error);
  };
};

export { post, get, patch, deleted };