function callMenuFunction(adresse){
	var date = new Date();
	t1 = date.getTime()
	getXhr();
	trElementSelect = "";
	xhr.onreadystatechange = updateDivText;
	var url = adresse;
	var tempSend = null;
	xhr.open("GET",url,true);
	xhr.setRequestHeader( "If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT" );
	//xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	//xhr.setRequestHeader("Cache-Control", "no-cache");
	//xhr.setRequestHeader("Connection", "close");*/
	xhr.send(tempSend);

	getXhr2();
	xhr2.onreadystatechange = updateUsefullLinksText;
	var addressTemp = adresse.split("&");
	var address = addressTemp[0]+"&Sql=usefullLinks.phs&"+addressTemp[2]+"&"+addressTemp[3]+"&"+addressTemp[4];
	xhr2.open("GET",address,true);
	xhr2.send(null);
}

function callSearchFunction(adresse,i){
	var date = new Date();
	t1 = date.getTime()
	getXhr();
	
	xhr.onreadystatechange = updateDivText;
	var url = adresse;
	var tempSend = "";
	switch (i)
	{
		case 1 : //search account 
			url += "&number="+document.getElementById("number").value+"&label="+document.getElementById("label").value;
			break;
		case 2 : //search mouvement 
			url += "&number="+document.getElementById("number").value+"&dateBegin="+document.getElementById("dateBegin").value+"&dateEnd="+document.getElementById("dateEnd").value+"&typeDate="+document.getElementById("typeDate").value;
			break;
		case 3 : //search list mouvement 
			url += "&number1="+document.getElementById("number1").value+"&number2="+document.getElementById("number2").value;
			break;
		case 4 : //search list mouvement 
			url += "&azNumber="+document.getElementById("number").value;
			break;
		case 5 : //search list mouvement 
			url += "&azLabel="+document.getElementById("label").value;
			break;
		default : break;
	}
	
	xhr.open("POST",url,true);
	xhr.setRequestHeader( "If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT" );
	/*xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.setRequestHeader("Cache-Control", "no-cache");
	//xhr.setRequestHeader("Connection", "close");*/
	xhr.send(tempSend);
}

function clearDiv(){
	document.getElementById("site").innerHTML = "";
}

function getXhr(){
	if(window.XMLHttpRequest)
	{ // Firefox et autres
		xhr = new XMLHttpRequest(); 
	}
	else if(window.ActiveXObject)
	{ // Internet Explorer 
		try 
		{
			xhr = new ActiveXObject("Msxml2.XMLHTTP");
		}
			catch (e) 
		{
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	else 
	{ // XMLHttpRequest non supporté par le navigateur 
			alert("Votre navigateur ne supporte pas les objets XMLHTTPRequest..."); 
			xhr = false; 
	}
	//xhr.setRequestHeader("Cache-Control","no-cache");
}

function getXhr2(){
	if(window.XMLHttpRequest)
	{ // Firefox et autres
		xhr2 = new XMLHttpRequest(); 
	}
	else if(window.ActiveXObject)
	{ // Internet Explorer 
		try 
		{
			xhr2 = new ActiveXObject("Msxml2.XMLHTTP");
		}
			catch (e) 
		{
			xhr2 = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	else 
	{ // XMLHttpRequest non supporté par le navigateur 
			alert("Votre navigateur ne supporte pas les objets XMLHTTPRequest..."); 
			xhr2 = false; 
	}
	//xhr2.setRequestHeader("Cache-Control","no-cache");
}

function updateDivText(){
	if(xhr.readyState == 4 && xhr.status == 200)
	{
		var date = new Date();
		t2 = date.getTime()
		ladiv = xhr.responseText;
		var date = new Date();
		t3 = date.getTime()
		document.getElementById("site").innerHTML = ladiv;
		var listAmountBalise = document.getElementsByTagName("div");
		for(w=0;w<listAmountBalise.length;w++)
		{
			if(listAmountBalise[w].className == "amtb" && listAmountBalise[w].firstChild.nodeValue != "0.00")
			listAmountBalise[w].firstChild.nodeValue = amountChange(listAmountBalise[w].firstChild.nodeValue);
		}
		var date = new Date();
		t4 = date.getTime()
		//alert((t4-t1)+" "+(t4-t3)+" "+(t3-t2)+" "+(t2-t1));
	}
}

function updateUsefullLinksText(){
	//alert(xhr2.readyState+"    "+xhr2.status)
	if(xhr2.readyState == 4 && xhr2.status == 200)
	{
		ladiv = xhr2.responseText;
		document.getElementById("subMenu").innerHTML = ladiv;
	}
}


