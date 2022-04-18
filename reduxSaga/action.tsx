import axios from "axios";
import { fieldParams } from "../pages/types";

export const userSummary = () => {
  return axios.get("https://5d662ab7520e1b00141ede90.mockapi.io/userSummary");
};

export const postSummary = (data: fieldParams) => {
  return axios({
    method: "post",
    url: "https://5d662ab7520e1b00141ede90.mockapi.io/userSummary",
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      DOB: data.DOB,
      gender: data.gender,
      department: data.department,
      skills: data.skills,
    },
  });
};

export const putSummary = (data: fieldParams) => {
  return axios({
    method: "put",
    url: "https://5d662ab7520e1b00141ede90.mockapi.io/userSummary/" + data.id,
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      DOB: data.DOB,
      gender: data.gender,
      department: data.department,
      skills: data.skills,
    },
  });
};

export const deleteSummary = (data: { id: string}) => {
  return axios({
    method: "delete",
    url: "https://5d662ab7520e1b00141ede90.mockapi.io/userSummary/" + data.id,
  });
};
