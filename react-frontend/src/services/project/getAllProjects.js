import { Axios } from "../helper/config";

export const getAllProjects = (user, token) => {
  return Axios.get(`api/users/${user}/projects`, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .catch((error) => {
      return error.response;
    })
    .then((response) => {
      return response;
    });
};

// .catch((error) => {
//       return error;
//     })
//     .then((response) => {
//       if(response.response.status){
//         return response.response
//       }
//       return response.data;
//     });
