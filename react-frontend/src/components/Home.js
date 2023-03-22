import Sidebar from "./common/Sidebar";
import { useContext } from "react";
import userContext from "../context/userContext";
const Home = () => {
  const selectProjectContext = useContext(userContext);

  return (
    <>
      <div class="col-9">
        <h1>HEllo world</h1>
        <h2>{selectProjectContext.selectedProject}</h2>
      </div>
    </>
  );
};

export default Home;
