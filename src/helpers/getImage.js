export const getImage = (id) => {
    const path = `/src/assets/img/anime${id}.png`;
    const module = import.meta.globEager("/src/assets/img/*.png");
    return module[path].default;
};