function formatDate(now) {
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}
//年月日
function formatYMD(now) {
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    return year + "-" + month + "-" + date;
}
//时分秒
function formatHMS(now) {
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    return hour + "-" + minute + "-" + second;
}
//当前时间
function getCurrentTime() {
  var keep = '';
  var date = new Date();
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  var f = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  var rand = Math.round(Math.random() * 899 + 100);
  keep = y + '' + m + '' + d + '' + h + '' + f + '' + s;
  return keep; //20160614134947
}
function convertScore2Array(score) {
    //[1,1,2,0,0] 1全星，2半星，0空星
    let arr = []
    for (let i = 1; i <= 5; i++) {
        if (score >= i) {
            arr.push(1)
        } else {
            if (score < i + 1 && score > i - 1) {
                arr.push(2)
            } else {
                arr.push(0)
            }
        }
    }
    return arr
}
//浮点型加法函数   
function accAdd(arg1, arg2) {
    var r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return ((arg1 * m + arg2 * m) / m).toFixed(2);
}
//浮点型乘法
function mul(a, b) {
    var c = 0,
        d = a.toString(),
        e = b.toString();
    try {
        c += d.split(".")[1].length;
    } catch (f) { }
    try {
        c += e.split(".")[1].length;
    } catch (f) { }
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}
//浮点型除法
function div(a, b) {
  var c, d, e = 0,
    f = 0;
  try {
    e = a.toString().split(".")[1].length;
  } catch (g) { }
  try {
    f = b.toString().split(".")[1].length;
  } catch (g) { }
  return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f - e));
}
//验证是否是手机号码
function vailPhone(number) {

    let flag = false;
    let myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if (number.length != 11) {
        flag = flag;
    } else if (!myreg.test(number)) {
        flag = flag;
    } else {
        flag = true;
    }
    return flag;
}
//数字落在数组的区间
function judgeWhichRegion(num, arr) {
    arr=JSON.parse(JSON.stringify(arr)).sort((a,b)=>{return a-b})
    // console.log(typeof arr,arr)
    let arrLength = arr.length
    for (let i in arr) {
        if (num >= arr[i] && num < arr[i - 0 + 1]) {
            return i
        } else if (num > arr[arrLength - 1]) {
            return arrLength - 1
        } else if (num < arr[0]) {
            return 0
        }
    }
}
// 去除字符串所有空格
function sTrim(text) {
  return text.replace(/\s/ig, '')
}
export default {
    formatDate,
    formatYMD,
    convertScore2Array,
    accAdd,
    mul,
    div,
    vailPhone,
    judgeWhichRegion,
    getCurrentTime,
    formatHMS,
    sTrim
}
