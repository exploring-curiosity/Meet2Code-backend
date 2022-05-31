const datas = {};
const setData=(room,data)=>{
    datas[room]=data;
}
const getData = (room)=>{
    if(datas[room]===undefined)
    {
        setData(room,"");
    }
    return datas[room];
}
module.exports= {getData,setData};