import { getAnimes } from "../requests/Posts/PostRequests";

const cargarDataAnimes = (idState, setStateData) => {
  if (idState == 1) {
    const body = { idState: 1 };
    getAnimes(body).then((animes) => {
        setStateData(animes.data);
    });
  } else if (idState == 2) {
    const body = { idState: 2 };
    getAnimes(body).then((animes) => {
        setStateData(animes.data);
    });
  }
};

export default cargarDataAnimes;
