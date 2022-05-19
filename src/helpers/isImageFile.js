
export const isImageFile = (file) => {
    if(file){
        const pattern = /image-*/;

        if(!file.type.match(pattern)){
            return false;
        }
        return true;
    }else{
        return false;
    }
}
