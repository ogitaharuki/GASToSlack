let insertHTML = "";
 const kyushuPrefecture = ["福岡県", "大分県", "宮崎県", "熊本県", "佐賀県", "長崎県", "鹿児島県"];
 
 kyushuPrefecture.forEach(function(prefecture){
   insertHTML += "<li>" + prefecture + "</li>";
   console.log(prefecture);
 });
 
 document.querySelector("#prefecture-list").innerHTML = insertHTML
