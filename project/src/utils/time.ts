export const GET_TIME = () =>{
    let message = '';
    let hours = new Date().getHours();
    if(hours <= 9){
        message = '早上';
    }else if(hours >9 && hours<=14){
        message = '中午';
    }else if(hours >14 && hours<=18){
        message = '下午';
    }else{
        message = '晚上';
    }
    return message;
}