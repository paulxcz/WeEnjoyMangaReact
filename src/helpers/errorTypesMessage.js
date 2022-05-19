
export const errorTypesMessage = () => {
    const errorTypes = {
        required: "Es necesario completar este campo",
        oversize: "Ha superado el límite de caracteres disponible",
        requiredSelect: "Es necesario seleccionar una opción",
        dateOverToday: "Por favor seleccione una fecha menor a la actual",
        sinopsisInsuficientCharacters: "Por favor ingrese al menos 50 caracteres",
      };
    return errorTypes;
}
