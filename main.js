 const url2 = 'https://chat-app2-b59ab.firebaseio.com/todo.json?print=pretty'; 
//----api CRUD OPERATION--------------//
var getData = function(url){
    get('#incomplete-tasks').innerHTML = ""
    fetch(url)
    .then(function(data) {
     return data.json()
    
    })
    .then(function(data) {
       //to get keys of object
    var obkeys = Object.keys(data)
        for (const [key, value] of Object.entries(data)) {
            addLi('#incomplete-tasks' ,value.task , key )
          }
        })
    .catch(function(error) {
    alert('get'+error)
    });
}
var sendData = function(url){
    var task,
    task = getvalue('#new-task')
    if(!(task === "")){
    fetch(url,{
        method: 'POST',
        body:JSON.stringify({
            task : task,
        }),
        headers:{
            "Content-Type" : "application/json; charset=UTF-8"
        }
    })
    .then(function(data) {
     return data.json()
    
    })
    .then(function(data) {
       get('#new-task').value = ""
       getData(url2)
        })
    .catch(function(error) {
    alert(error)
    });
}else{
    alert('Add some query to save')
}
}
var delData = function(url){
fetch(url,{
    method: 'DELETE',
    body:JSON.stringify({

    }),
    headers:{
        "Content-Type" : "application/json; charset=UTF-8"
    }
})
.then(function(data) {
 return data.json()

})
.then(function(data) {

   getData(url2)
    })
.catch(function(error) {
alert("Error : "+error)
});
}
var updateData = function(url){

    var upd = prompt("Eneter new query here");

    if (upd != null) {
    fetch(url,{
        method: 'PATCH',
        body:JSON.stringify({
            task : upd
        }),
        headers:{
            "Content-Type" : "application/json; charset=UTF-8"
        }
    })
    .then(function(data) {
     return data.json()
    
    })
    .then(function(data) {
       getData(url2)
        })
    .catch(function(error) {
    alert("Error : "+error)
    });
}else{
    alert('no update')
}
}
//----api CRUD OPERATION--------------//
getData(url2)
function addLi(ul ,title , key){
	get(ul).innerHTML +=
    `
    <li>
    <label for="">${title}</label>
    <button class="edit" onclick="updateData('https://chat-app2-b59ab.firebaseio.com/todo/${key}.json?print=pretty')">Edit</button>
    <button class="delete" onclick="delData('https://chat-app2-b59ab.firebaseio.com/todo/${key}.json?print=pretty')">Delete</button>
</li>
    `

}