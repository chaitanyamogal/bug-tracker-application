const getProjectDetails = () => {
  return fetch("http://localhost:8080/api/company/projects/1", {
    method: "GET"
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export default getProjectDetails;
