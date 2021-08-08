
export default {
    name: 'commonUtils',

    objCopy(source){
        return JSON.parse(JSON.stringify(source)); 
    }
}
