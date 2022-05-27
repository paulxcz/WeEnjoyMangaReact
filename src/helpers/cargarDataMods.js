import { getUsers } from "../requests/Gets/GetsRequests";

const cargarDataMods = (setStateData, filtro=0) => {
  getUsers().then((mods) => {
    if (filtro == 0) {
      setStateData(mods.data);
    } else {
      const filterData = mods.data.filter((mod) => mod.idUserState == filtro);
      setStateData(filterData);
    }
  });
};

export default cargarDataMods;
