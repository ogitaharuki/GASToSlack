const FIRST_ROW_NUMBER = 1;
const FIRST_COLUMN_NUMBER = 1;
const GET_ROW_NUMBER = 1;
const GET_COLUMN_NUMBER = 1;
const AJUST_COLUMN_NUMBER = 3;
const SEVEN_DAY_FORCAST_ROW_NUMBER = 7;
const SEVEN_DAY_CANCEL_NUMBER = 19;
const ONE_DAY_BOOKING_NUMBER = 16;
const SEVEN_DAY_BOOKING_NUMBER = 18;
const ARPU_NUMBER = 22;

// スプレッドシートを開く
const getSheet = () => {
  const spreadsheet = SpreadsheetApp.getActive();
  //シートを取得する
  const sheet = spreadsheet.getActiveSheet();
  return sheet
}

const sheet = getSheet();
//当日の日付を取得
const today = new Date();

//(1,1,1,lastColumn);を定数で書く
//1って何？

const getTodayValues = () => {
  const lastColumn = sheet.getLastColumn();
  const spreadsheetCell = sheet.getRange(FIRST_ROW_NUMBER, FIRST_COLUMN_NUMBER, GET_ROW_NUMBER, lastColumn);
  const values = spreadsheetCell.getValues();
  return values
}
// console.log(lastColumn);
//日付が入力されているセルのrangeを取得(行、列、行数、列数)
//Wed Feb 01 2023
// console.log(values[0][2].toDateString());
// //Fri Feb 10 2023
// console.log(today.toDateString());


//42-68までを１つの処理でまとめる(関数を用いて)

//checkEmptyは関数で今回はelement内の不要なものを削除する
const checkEmpty = (element) => {
  return element !== undefined && element !== 0 && element !== null && element !== "";
}

const values = getTodayValues();
//valueは二重配列だったから配列を作り直した
const newValues = values[0];
//[0][1]がスプレッドシート上で空白だったからcheckEmpty関数で空白を削除
const notEmptyNewValues = newValues.filter(checkEmpty);
// console.log(notEmptyNewValues);

//map関数を使ってtoDateString()Wed Jul 28 1993 14:39:07 GMT+0900 (日本標準時)をWed Jul 28 1993で返した
const formatedDateValues = notEmptyNewValues.map((newValue) => {
  // console.log(newValue);
  return newValue.toDateString()
}
)
// console.log(formatedDateValues);

const todayFormat = today.toDateString();

//処理には無関係。今日がちゃんと取れているか確認するだけ
// for (var i = 0; i < formatedDateValues.length; i++) {
//   if(todayFormat === formatedDateValues[i]) {
//     let dateSlackSend = formatedDateValues[i];
//     // console.log(dateSlackSend);
//   }
// }


// console.log(formatedDateValues.indexOf(todayFormat));
const todayColumn = formatedDateValues.indexOf(todayFormat) + AJUST_COLUMN_NUMBER;
// console.log(todayColumn); 
const lastRow = sheet.getLastRow();
// console.log(lastRow); //28

//スプレッドシートの本日日付の情報を抜き出す。この時点ではスプレッドシートの範囲を指定しただけ
//取得するにはgetValues()が必要
const todaySpreadsheetCell = sheet.getRange(FIRST_ROW_NUMBER, todayColumn, lastRow, GET_COLUMN_NUMBER);

//todaySpreadsheetCellで抜き出した情報をtodayValuesに格納
const todayValues = todaySpreadsheetCell.getValues();
// console.log(todayValues);

//オブジェクトの書き方102-116
// const users = [
//   {
//   firstName: 'John',
//   lastName: 'Doe',
//   age: 30
// },
//   {
//   firstName: 'Kevin',
//   lastName: 'Keita',
//   age: 28
// },
//   {
//   firstName: 'po',
//   lastName: 'po',
//   age: 24
// },
// ]

// console.log(users)
// console.log(users[0])
// console.log(users[1])
// console.log(users[2])
// console.log(users[2].firstName)



//スプレッドシートのサマリーforcastの7dayの値
//todayValuesが2重配列のため再定義
const sevenDayForcast = todayValues[SEVEN_DAY_FORCAST_ROW_NUMBER][0];

//プレッドシートのcancelの7dayの値
//todayValuesが2重配列のため再定義
const sevenDayCancel = todayValues[SEVEN_DAY_CANCEL_NUMBER][0];

const oneDayBooking = todayValues[ONE_DAY_BOOKING_NUMBER][0];
const sevenDayBooking = todayValues[SEVEN_DAY_BOOKING_NUMBER][0];
const arpuNumber = todayValues[ARPU_NUMBER][0];

// console.log(oneDayBooking);
// console.log(sevenDayBooking);
// console.log(arpuNumber);

//1.3
// console.log(sevenDayForcast);

// const formatedSevenDayForcast = sevenDayForcast * 100 + "%";

// //130%
// console.log(formatedSevenDayForcast);

//少数から%表記に変える関数
const formatedParcentvalues = (inputFlootValue) => {
  const result = inputFlootValue * 100 + "%";
  return result;
}

const formatedLocaleValues = (inputNumValue) => {
  const result = "¥" + inputNumValue.toLocaleString();
  return result;
}

const formatedBookingOneDay = formatedLocaleValues(oneDayBooking);
const formatedBookingSevenDay = formatedLocaleValues(sevenDayBooking);
const formatedArpuNumber = formatedLocaleValues(arpuNumber);

// console.log(formatedBookingOneDay);
// console.log(formatedBookingSevenDay);
// console.log(formatedArpuNumber);


//関数に入れるときの処理コード
const formatedSevenDayForcast = formatedParcentvalues(sevenDayForcast);
const formateSevenDayCancel = formatedParcentvalues(sevenDayCancel);

// //130%
// console.log(formatedSevenDayForcast);
// // //52%
// console.log(formateSevenDayCancel);


// const formatedcanmaValues = (inputcanmaValues) => {
//   const result = 
// }

//関数の基本形
// const addValues = (p,k) => {
//   const kevin = 28;
//   const result = k + p + kevin;
//   return result;
// }

// const ogi = addValues(10,15);
// console.log(ogi);

//必要な情報は取得完了したのでスラックに通知したら終わり

const sendMessage = () => {
  const postUrl = 'https://hooks.slack.com/services/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';
  const sendMessage = createMessagesArray();
  const  jsonData = {
    "text": sendMessage
  };


  const payload = JSON.stringify(jsonData);
  const options = {
    "method": "post",
    "contenType": "application/json",
    "payload": payload
  };
  UrlFetchApp.fetch(postUrl, options);

  
}

function getTodayDate() {
  //Dateオブジェクトからインスタンスを生成
  const today = new Date();

  //メソッドを使って、本日の日付を取得
  const year = today.getFullYear(); //年
  const month = today.getMonth()+1; //月
  const date = today.getDate(); //日
  const dayIndex = today.getDay(); //曜日
  const dayArray = ["日","月","火","水","木","金","土"]; //曜日の配列
  const result = month.toString() + "月" + date.toString() + "日" + "(" + dayArray[dayIndex] + ")";
    // console.log(month.toString());
    // console.log(date.toString());
    // console.log(result);
    // console.log(day.toString());
  return result
}

const createMessagesArray = () => {
  const todayDate = getTodayDate();
  // console.log(todayDate);
  let body = '*Forcast(7days)*\n' + todayDate + ' : ' + formatedSevenDayForcast + '\n' + '\n'
      body += '*Booking CPA(1days)*\n' + todayDate + ' : ' + formatedBookingOneDay + '\n' + '\n'
      body += '*Booking CPA(7days)*\n' + todayDate + ' : ' + formatedBookingSevenDay + '\n' + '\n'
      body += '*Cancel(7days)*\n' + todayDate + ' : ' + formateSevenDayCancel + '\n' + '\n'
      body += '*ARPU(7days)*\n' + todayDate + ' : ' + formatedArpuNumber + '\n';
 return body
}





