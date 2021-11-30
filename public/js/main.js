const socket = io()
const send = document.querySelector('.sendMessageArea');
const sendMessage = document.getElementById('sendMessage');
const showMessageArea = document.querySelector('.showMessageArea')

//Catch UserName
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let userName = urlParams.get('userName');

//SETTINGS
const username = document.getElementById('username');
const textColor = document.getElementById('textColor');
const darkMode = document.getElementById('darkMode')

username.addEventListener('click',()=>{
	var person = prompt("Yeni Kullanıcı Adı Giriniz", "Yeni Kullanıcı");
	userName = person;
})

textColor.addEventListener('click',()=>{
	var color = prompt("Yeşil, Mavi, Kırmızı","")
	if(color == "Yeşil" || color == "yeşil"){
		sendMessage.style.color="green";
	}
	else if(color == "Kırmızı" || color == "kırmızı" ){
		sendMessage.style.color ="red"
	}
	else if(color == "Mavi" || color == "mavi"){
		sendMessage.style.color ="blue"
	}
	
})

let toggle = false

darkMode.addEventListener('click',()=>{

	toggle =! toggle
	console.log(toggle)
	if(toggle == true){
		document.body.style.background="black";
		document.querySelector('.showMessageArea').style.backgroundColor="black";
	}else{
		document.body.style.background="";
		document.querySelector('.showMessageArea').style.backgroundColor="";
	}
	
})

//Starter Join Message
socket.on("welcome",(arg)=>{
	let div = document.createElement('div');
	div.innerHTML = `
	<p style="color:red">  ${ arg }&nbsp <span class="userName">${ userName }</span> </p>
	`
	div.classList ="msg";
	showMessageArea.appendChild(div);
})

//Catch broadcast message from server
socket.on("sender",(arg)=>{
	let div = document.createElement('div');
	div.innerHTML = `
	<p class="userName">${ arg.userName } :</p>
	<p class="userMessage">${ arg.message }</p>

	`
	div.classList ="msg";
	showMessageArea.appendChild(div);
})

//Catch Message from inputValue and Send Server
send.addEventListener('submit',(e)=>{
	e.preventDefault();

	const msg = {
		userName:userName,
		message:sendMessage.value
	}; 

	socket.emit('sender',msg)
	sendMessage.value ="";
	sendMessage.focus();
})


