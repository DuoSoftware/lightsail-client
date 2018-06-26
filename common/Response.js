module.exports.Error =(message, data) =>{
    console.log(message);
    let obj =  {
        status: false,
        message: message
    };

    if (data != undefined){
        obj.data = data;
    }else{
        obj.data = {};
    }
    return obj;
}

module.exports.Success =(message, data) =>{
    console.log(message);
    let obj =  {
        status: true,
        message: message
    };

    if (data != undefined){
        obj.data = data;
    }else{
        obj.data = {};
    }
    return obj;
}