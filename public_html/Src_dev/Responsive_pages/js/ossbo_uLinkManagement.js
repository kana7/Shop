function hideLink(url,image,i){
	
	var divLink = document.getElementById("usefullLinkDiv");
	var divSite = document.getElementById("site");
	getXhr();
	xhr.onreadystatechange = function(){};
	var urlRegister = document.getElementById('saveUsefullLink').value;
	var tempSend = null;
	
	if(divLink.style.display == "block")
	{
		closeMenuPopup();
		divLink.style.display = "none";
		image.src = url+"/images/show.gif";
		divSite.style.left="9px";
		divSite.style.width="98%";
		urlRegister += "&openULink=0";
	}
	else
	{
		if(parseInt(i)==1)
		{
			divLink.style.display = "block";
			image.src = url+"/images/hide.gif";
			divSite.style.left="15%";
			divSite.style.width="84%";
		}
		else if(parseInt(i)==0)
		{
			divLink.style.display = "block";
			image.src = url+"/images/hide.gif";
			divSite.style.left="9px";
			divSite.style.width="99%";
		}
		urlRegister += "&openULink=1";
	}
	xhr.open("GET",urlRegister+"&choice=9&unixTime="+(new Date()).getTime(),true);
		xhr.send(tempSend);
}
function expandMenu(divElement,iVide){
	if(menuModif == 0){
		var inputElement = divElement.parentNode.getElementsByTagName("input")[0];
		if(inputElement.value == 1)
		{
			var chaine=divElement.getElementsByTagName("IMG")[0].src;
			var reg=new RegExp("(downArrow)", "g");
			divElement.getElementsByTagName("IMG")[0].src = chaine.replace(reg,"rightArrow");
			inputElement.value = 0;
			inputElement.parentNode.style.display = "none";
		}
		else
		{
			
			var inputElementList =  divElement.parentNode.parentNode.getElementsByTagName("input");
			for(var i=0;i<inputElementList.length;i++)
			{
				if(inputElementList[i].value == 1)
				{
					
					var chaine=inputElementList[i].parentNode.parentNode.getElementsByTagName("IMG")[0].src;
					var reg=new RegExp("(downArrow)", "g");
					inputElementList[i].parentNode.parentNode.getElementsByTagName("IMG")[0].src = chaine.replace(reg,"rightArrow");
					inputElementList[i].value = 0;
					inputElementList[i].parentNode.style.display = "none";
					i = inputElementList.length;
				}
			}
			var chaine=divElement.getElementsByTagName("IMG")[0].src;
			var reg=new RegExp("(rightArrow)", "g");
			divElement.getElementsByTagName("IMG")[0].src = chaine.replace(reg,"downArrow");
			inputElement.value = 1;
			inputElement.parentNode.style.display = "block";
			
			if(inputElement.parentNode.getElementsByTagName("DIV").length==0 && iVide==2)
			{
				
				var divTemp = document.createElement("DIV");
				var divEnf = document.createElement("DIV");
				divEnf.id=0;
				divEnf.className = "linkMenu";
				if(nav=="Microsoft Internet Explorer")
				{
					divEnf.onmouseover= function(){onMouseOverDiv(this,3);} 
					divEnf.onmouseout=function(){onMouseOutDiv(this,3);};
				}
				else
				{
					divEnf.setAttribute("onmouseover","onMouseOverDiv(this,3);videDiv=1;");
					divEnf.setAttribute("onmouseout","onMouseOutDiv(this,3);videDiv=0");
				}
				divEnf.style.height="10px";
				var aElement = document.createElement("A")
				aElement.appendChild(document.createTextNode(""));
				aElement.className = "leftM"
				divEnf.appendChild(aElement);
				divTemp.appendChild(divEnf);
				inputElement.parentNode.appendChild(divTemp);
			}
		}
	}
}
var videDiv=0;
function clickLinkMenu(choice,divElement){
	var aElement = divElement.getElementsByTagName("a")[0];
	var url = divElement.getElementsByTagName("a")[0].id;
	if(parseInt(choice)==1)
	{
		if(parseInt(aElement.name) == 1)
			eval("site.location='"+url+"'")
	}
	else if(parseInt(choice)==2)
		 window.open(url);
	
}
/*************************/
		var linkSelected = null;
		var buttonType = 0;
		function selectLink(div,i){
			buttonType = parseInt(i);
			var regL= /lien.gif/gi;
			var regLC= /linkCheck.gif/gi;
			if(linkSelected != null)
			{
				var img = linkSelected.getElementsByTagName("IMG")[0];
				var chaine = img.src;
				img.src = chaine.replace(regLC,"lien.gif");
				linkSelected.getElementsByTagName("FONT")[0].className = "";
			}
			var img = div.getElementsByTagName("IMG")[0];
			var chaine = img.src;
			img.src = chaine.replace(regL,"linkCheck.gif");
			div.getElementsByTagName("FONT")[0].className = "lienSel";
			linkSelected = div;

		}
		function addProcButton(){
//marker
			if(linkSelected != null)
			{
				if(buttonType == 1)
					addProc(linkSelected,1);
				else
					modifyProc(linkSelected,1);
				linkSelected = null;
				buttonType = 0;
			}
			else
			{
				var choiceUrl = parseInt(document.getElementById("urlChoice").value)
				if(choiceUrl == 0)
				{
					addUrl();
				}
				else
				{
					updateUrl();
				}
					
				
			}
		}
		/***********************/
		var personnalClickBool = 0;
		function personnalOnClick(div)
		{
				if(personnalClickBool==0)
				{
//					var aElement = "http://"+div.getElementsByTagName("A")[0].href.split("//")[1].split("/")[0];
						var aElement = div.getElementsByTagName("A")[0].href.split("//")[0]+"//"+div.getElementsByTagName("A")[0].href.split("//")[1].split("/")[0];

						window.open(trim(aElement));
				}
				personnalClickBool = 0;
		}
		
		function modifyUrl(div,X,Y,choice,SQLWWWHOME,e){
				openPopup(div,X,Y,choice,SQLWWWHOME,e);
			}
			
		function updateUrl(){
			_urlUser = document.getElementById("urlUser").value;
			_labelUser = document.getElementById("labelUser").value;

			if(_labelUser!="" && _urlUser!="")
			{
				xhr = null;
				getXhr();
				xhr.onreadystatechange = function(){
													if(xhr.readyState == 4 && xhr.status == 200){
														divTampon.parentNode.innerHTML = xhr.responseText;
														closeFenetrePopup();
													}
												};
					var tempSend = "_urlUser="+escape(_urlUser)+"&_labelUser="+escape(_labelUser)+"&choiceUrl="+divTampon.id;
					var tempIdMenu = document.getElementById("idMenuChoice").value;
			
					if(tempIdMenu == "")
						tempIdMenu = 1;
					xhr.open("POST",document.getElementById("updatePosition").value+"&idMenu="+tempIdMenu+"&choice=12&unixTime="+(new Date()).getTime(),true);
					xhr.send(tempSend);
			}
		}
		
		function addUrl(){
			_urlUser = document.getElementById("urlUser").value;
			_labelUser = document.getElementById("labelUser").value;
			if(_labelUser!="" && _urlUser!="")
			{
				getXhr();
				xhr.onreadystatechange = function(){
													if(xhr.readyState == 4 && xhr.status == 200){
														var divRes;
														if(document.getElementById("idMenuChoice").value=="" || parseInt(document.getElementById("idMenuChoice").value)==1)
															divRes = document.getElementById("usefullLink");
														else
														{
															var trouve = false;
															listDiv = document.getElementById("usefullLink").getElementsByTagName("Div");
															var i = 0;
															while(!trouve && i<listDiv.length)
															{
																if(listDiv[i].className=="bodyMenu" && parseInt(listDiv[i].id)==parseInt(document.getElementById("idMenuChoice").value))
																{
																	divRes = listDiv[i];
																	trouve = true;
																}
																i++;
															}
														}
														divRes.innerHTML= divRes.innerHTML+xhr.responseText;
														closeFenetrePopup();
													}
												};
					var tempSend = "_urlUser="+escape(_urlUser)+"&_labelUser="+escape(_labelUser);
					var tempIdMenu = document.getElementById("idMenuChoice").value;
			//		alert(tempIdMenu)
					if(tempIdMenu == "")
						tempIdMenu = 1;
					//alert(document.getElementById("updatePosition").value+"&idMenu="+tempIdMenu+"&idProc="+div.id+"&choice=3&unixTime="+(new Date()).getTime());
					xhr.open("POST",document.getElementById("updatePosition").value+"&idMenu="+tempIdMenu+"&choice=10&unixTime="+(new Date()).getTime(),true);
					xhr.send(tempSend);
			}
}
		
		/***********************/
		
		
//MARKER				
		function expandSearch(div,img){
			var chaine = ""+img.src;
			var regP= /plus.gif/gi;
			var regM= /moins.gif/gi;
			
			var divBrother = div.nextSibling;
			var trouve = false;
			while(divBrother && !trouve)
			{
				if(divBrother.nodeName=="DIV" && divBrother.id=="child")
					trouve = true;
				else
					divBrother = divBrother.nextSibling;
			}
			if(chaine.search(regP)!=-1)
			{
				img.src = chaine.replace(regP,"moins.gif");
				divBrother.style.display = "block";
			}
			else if(chaine.search(regM)!=-1)
			{
				img.src = chaine.replace(regM,"plus.gif");
				divBrother.style.display = "none";
			}
		}

/**************************/
var move = 0;
var isMoussePressed = false;
var mousePressed = 0;
var menuModif = 0;
var divElement = null;
var repLevelElement = 0;
var divDest = null;
var repLevelDest = 0;
var oldClass=null;
var divLine = document.createElement("div");
divLine.id="line";
divLine.style.border="1px solid black";
divLine.height = "1px";	
function no(){if(move!=0 && menuModif==0)return false}

document.onmousedown=no;
if(typeof document.onselectstart!="undefined"){
	document.onselectstart=no
}

var divTampon = null;

function pausecomp(millis)
{
var date = new Date();
var curDate = null;

do { curDate = new Date(); }
while(curDate-date < millis);
} 

function moveDiv(div,repLevel){
	if(menuModif == 0){
		if(mousePressed == 0)
		{
			isMoussePressed = true;
			pausecomp(125);
			moussePressed = 1;
		}
		if(isMoussePressed)
		{
			div.parentNode.insertBefore(divLine,div)
			divElement=div;
			repLevelElement = repLevel;
			move=1;
		}
	}
}

function onMouseOverDiv(div,repLevel){
	if(div.id=="noMove")
	{
		divDest = null;
		if(document.getElementById("line")!=null)
			document.getElementById("line").parentNode.removeChild(document.getElementById("line"));
	}
	else
	{
		if(move==1)
		{
			if(repLevel==1)
				expandMenu(div,2);
			divDest  =div;
			repLevelDest = repLevel;
			if(document.getElementById("line")!=null)
				document.getElementById("line").parentNode.removeChild(document.getElementById("line"));
			div.parentNode.parentNode.insertBefore(divLine,div.parentNode)
		}
		else if(move==0)
		{
				if(repLevel==1)
				div.className='titleMenu2';
			else if(repLevel==2)
				div.className='linkOn';
			else if(repLevel==3)
				div.className='linkMenuOn';
			
		}
	}
}

function onMouseOutDiv(div,repLevel){
	if(move==1)
	{
		divDest =null;
		repLevelDest = 0;
	}
	else if(move==0)
	{
		if(repLevel==1)
			div.className='titleMenu';
		else if(repLevel==2)
			div.className='link';
		else if(repLevel==3)
			div.className='linkMenu';
		
	}
}

function incrementBrother(div){
	divParentBrother = div.parentNode;
	while(divParentBrother=divParentBrother.nextSibling)
	{
		if(divParentBrother.nodeName=="DIV")
			divParentBrother.getElementsByTagName("DIV")[0].id = parseInt(divParentBrother.getElementsByTagName("DIV")[0].id)+1;
	}
}

function decrementBrother(div){
	divParentBrother = div.parentNode;
	
	while(divParentBrother)
	{
		divParentBrother=divParentBrother.nextSibling;
		if(divParentBrother && divParentBrother.nodeName=="DIV")
		{
			divParentBrother.getElementsByTagName("DIV")[0].id = parseInt(divParentBrother.getElementsByTagName("DIV")[0].id)-1;
		}
	}
}

document.onmouseup = function () {
	if(traine)
		stop_traine();
	else if(expand)
		expand=false;
	else if(menuModif == 0)
	{
		if(document.getElementById("line")!=null)
			document.getElementById("line").parentNode.removeChild(document.getElementById("line"));
		if(divDest!=null && divDest.id!="noMove")
		{
			var destCoord =  "";
			if(divDest.parentNode.parentNode.id == 'usefullLink')
				destCoord = 1+","+divDest.id
			else	
				destCoord = divDest.parentNode.parentNode.id+","+divDest.id
			var elementCoord = ""
			if(divElement.parentNode.parentNode.id=='usefullLink')
				elementCoord = 1+","+divElement.id;
			else
				elementCoord = divElement.parentNode.parentNode.id +","+divElement.id;
			if(!(repLevelElement==1 && repLevelDest==3))
			{
				decrementBrother(divElement);
				divDest.parentNode.parentNode.insertBefore(divElement.parentNode,divDest.parentNode);
				divElement.id=divDest.id;
				incrementBrother(divElement);
				
				if(repLevelElement==2 && repLevelDest==3)
				{
					divElement.className='linkMenu';
					divElement.getElementsByTagName("A")[0].className="leftM";
					divElement.onmouseover =function (){onMouseOverDiv(this,3);};
					divElement.onmouseout  =function (){onMouseOutDiv(this,3);}; divElement.onmousedown =function (){ moveDiv(this,3);};
				}
				else if(repLevelElement==3 && repLevelDest==1)
				{
					divElement.className='link';
					divElement.getElementsByTagName("A")[0].className='';
					divElement.onmouseover =function (){onMouseOverDiv(this,2);};
					divElement.onmouseout  =function (){onMouseOutDiv(this,2);}; divElement.onmousedown =function (){ moveDiv(this,2);};
				}
				else if(repLevelElement==3 && repLevelDest==2)
				{
					
					divElement.className='link';
					divElement.getElementsByTagName("A")[0].className=null;
					divElement.onmouseover =function (){onMouseOverDiv(this,2);};
					divElement.onmouseout  =function (){onMouseOutDiv(this,2);}; divElement.onmousedown =function (){ moveDiv(this,2);};
				}
				getXhr();
				xhr.onreadystatechange = function(){
				if(xhr.readyState == 4 && xhr.status == 200){
						//alert(xhr.responseText);
					}
				};
				var tempSend = null;
				xhr.open("GET",document.getElementById("updatePosition").value+"&destCoord="+destCoord+"&elementCoord="+elementCoord+"&choice=1&unixTime="+(new Date()).getTime(),true);
				xhr.send(tempSend);
			}
			
			
		}
		divElement=null;
		if(videDiv==1)
		{
			divDest.parentNode.parentNode.removeChild(divDest.parentNode);
			videDiv=0
		}
		divDest=null;
	}
	divDest=null;
	if(document.getElementById("line")!=null)
			document.getElementById("line").parentNode.removeChild(document.getElementById("line"));
	mousePressed =0;
	isMoussePressed = false;
	move=0;
	};
/*********************************************/
/****************gestion menu & Popup*********/
/*********************************************/
function getCoordX(e){
	if(navigator.appName == 'Netscape')
	{
		if(e.pageX == 0)
			return e.clientX;
		else
			return e.pageX ;	
	}
	else
	return event.x ;
}

function getCoordY(e){
	if(navigator.appName == 'Netscape')
	{
		if(e.pageY == 0)
			return e.clientY;
		else
			return e.pageY ;	
	}
	else
	return event.y ;
}

function closeMenuPopup(){
	var menuPopup = document.getElementById("menuPopup");
	if(menuPopup)
	{
		createPopupFilter(-1);
		menuPopup.parentNode.removeChild(menuPopup);
	}
}

function closeFenetrePopup(){
	var fenetrePopup = document.getElementById("actionPopup");
	if(fenetrePopup)
	{
		fenetrePopup.parentNode.removeChild(fenetrePopup);
		unExpandDiv.parentNode.removeChild(unExpandDiv);
		unExpandDiv=null;
		divTampon = null;
		linkSelected = null;
		buttonType = 0;
	}
	
}

function createMenu(div){
	menuModif = 1;
	var inputElement = document.createElement("input");
	inputElement.type = "text";
	inputElement.id = "azLabelInput";
	inputElement.onblur = function (){
		if (_Lang==2)
			var _CfrmText="Souhaitez-vous annuler la création du menu ?";
		else if (_Lang==3)
			var _CfrmText="Wollen Sie die Menü-Erstellung abbrechen ?";
		else
			var _CfrmText="Do you want to cancel menu creation ?";
		if(confirm(_CfrmText))
		{
			menuModif = 0;
			inputElement.parentNode.removeChild(inputElement);
		}
		else
			inputElement.focus();
		}
	inputElement.onkeydown = function (ev) {
		if( window.event)
		{
			if(window.event.keyCode==13)
			{
				if(bool2)
				{
					bool2 = false;
					inputElement.onblur = function (){};
					if(inputElement.value!="")
						addMenu(inputElement.value);
					inputElement.parentNode.removeChild(inputElement);
					menuModif = 0;
				}
			}
		}
		else
		{
			document.captureEvents(Event.KEYDOWN);
			if(ev.which == 13)
			{
				if(bool2)
				{
					bool2 = false;
					inputElement.onblur = function (){};
					if(inputElement.value!="")
						addMenu(inputElement.value);
					inputElement.parentNode.removeChild(inputElement);
					menuModif = 0;
				}
			}
		}
	};
	div.appendChild(inputElement);
	inputElement.focus();
}

function modifyMenu(div){
	menuModif = 1;
	var divChild = div.firstChild;
	var titleMenuOld = "";
	var textElementOld = null;
	while(divChild){
		if(divChild.nodeValue!="")
		{
			textElementOld = divChild;
			titleMenuOld = divChild.nodeValue;
		}
		divChild = divChild.nextSibling;
	}
	//updateMenu(iOrder)
	
	var inputElement = document.createElement("input");
	inputElement.type = "text";
	inputElement.value = titleMenuOld;
	inputElement.onclick = function(){};
	inputElement.id = "azLabelInput";
	inputElement.onblur = function (){
			var textElement = document.createTextNode(titleMenuOld);
			div.removeChild(inputElement);
			div.appendChild(textElement);
			menuModif = 0;
		}
	inputElement.onkeydown = function (ev) {
		if( window.event)
		{
			if(window.event.keyCode==13)
			{
				if(bool2)
				{
					bool2 = false;
					inputElement.onblur = function (){};
					if(inputElement.value!="")
					{
						updateMenu(div.id,inputElement.value);
						titleMenuOld = inputElement.value
					}
					var textElement = document.createTextNode(titleMenuOld);
					div.removeChild(inputElement);
					div.appendChild(textElement);
					menuModif = 0;
				}
			}
		}
		else
		{
			document.captureEvents(Event.KEYDOWN);
			if(ev.which == 13)
			{
				if(bool2)
				{
					bool2 = false;
					inputElement.onblur = function (){};
					if(inputElement.value!="")
					{
						updateMenu(div.id,inputElement.value);
						titleMenuOld = inputElement.value
					}
					var textElement = document.createTextNode(titleMenuOld);
					div.removeChild(inputElement);
					div.appendChild(textElement);
					menuModif = 0;
				}
			}
		}
	};
	div.removeChild(textElementOld);
	div.appendChild(inputElement);
	inputElement.focus();
}

function deleteMenu(div){
	var deleteVar = false;
	var divChild = div.firstChild;
	var titleMenuOld = "";
	while(divChild){
		if(divChild.nodeValue!="")
			titleMenuOld = divChild.nodeValue;
		divChild = divChild.nextSibling;
	}
	var divBrother=div.nextSibling;
	while(divBrother && divBrother.nodeName!="DIV"){
		divBrother = divBrother.nextSibling;
	}
	if(divBrother.getElementsByTagName("DIV").length == 0)
		deleteVar = true;
	else if(divBrother.getElementsByTagName("DIV").length == 2)
	{
		if(divBrother.getElementsByTagName("DIV")[1].getElementsByTagName("A")[0].firstChild.nodeValue == "")
			deleteVar = true;	
	}
	
	if(deleteVar)
	{	
		if (_Lang==2)
			var _CfrmText="Souhaitez-vous supprimer le menu : "+titleMenuOld+" ?";
		else if (_Lang==3)
			var _CfrmText="Wollen Sie die Menü "+titleMenuOld+" löschen ?";
		else
			var _CfrmText="Do you want to delete menu : "+titleMenuOld+" ?";
		if(confirm(_CfrmText))
		{
			divTampon = div;
			delMenu(div.id);
		}
	}
	else
	{
		if (_Lang==2)
			var _AlertText="Impossible de supprimer un menu contenant des liens.";
		else if (_Lang==3)
			var _AlertText="Dieses Menü enthält bereits Links: kann nicht gelöscht werden.";
		else
			var _AlertText="This menu already contains links : can't be deleted.";
		alert(_AlertText);
	}
}

function deleteProc(div){
	var divChild = div.getElementsByTagName("a")[0].firstChild;
	var titleMenuOld = "";
	while(divChild){
		if(divChild.nodeValue!="")
			titleMenuOld = divChild.nodeValue;
		divChild = divChild.nextSibling;
	}
	if (_Lang==2)
		var _CfrmText="Souhaitez-vous supprimer le lien : "+titleMenuOld+" ?";
	else if (_Lang==3)
		var _CfrmText="Wollen Sie den Link "+titleMenuOld+" löschen ?";
	else
		var _CfrmText="Do you want to delete link : "+titleMenuOld+" ?";
	if(confirm(_CfrmText))
	{
		divTampon = div;
		delProc(div);
	}
}


var divFilter = null;
function createPopupFilter(i){
	if(i==0)
	{
		divFilter = document.createElement("DIV");
		divFilter.id = "filterPopupDiv";
		divFilter.style.left = document.getElementById("site").style.left;
		divFilter.style.width = document.getElementById("site").style.width;
		divFilter.onclick = function () {
			closeMenuPopup();
		};
		divFilter.innerHTML = "<table width=100%><tr><td>&nbsp;</td></tr></table>";
		divFilter.className = "filterDiv2";
	}
	else
	{
		if(divFilter)
			divFilter.parentNode.removeChild(divFilter);
		divFilter = null;
	}
}

function openMenu(div,e,SQLWWWHOME){
	/**/
	if(menuModif==0)
	{
		closeMenuPopup();
		if(!document.getElementById("filterPopupDiv"))
		{
			createPopupFilter(0);
			document.getElementById("usefullLinkDiv").parentNode.appendChild(divFilter);
		}
		
		var divElement = document.createElement("DIV");
		divElement.className = "menuDiv";
		divElement.id="menuPopup";
		divElement.style.left=getCoordX(e)+"px";
		divElement.style.top=getCoordY(e)+"px";
		divElement.style.background="white";
		divElement.style.position="absolute";
		var tableElement = document.createElement("TABLE");
		tableElement.className = "menuTable";
		var tbodyElement = document.createElement("TBODY");
		var trElement1 = document.createElement("TR");
		trElement1.className = "menuTrOut";
		trElement1.onmouseover = function () {trElement1.className = "menuTrOn";};
		trElement1.onmouseout = function () {trElement1.className = "menuTrOut";};
		
		trElement1.onclick = function(){
				//openPopup(div,divElement.style.left,divElement.style.top,1,SQLWWWHOME,e);
				createMenu(document.getElementById("usefullLinkDiv"));
				closeMenuPopup();
			};
	/*	trElement1.setAttribute("onclick","openPopup(document.getElementById("+div.id+"),'"+divElement.style.left+"','"+divElement.style.top+"',1,'"+SQLWWWHOME+"',event);");*/
		var tdElement = document.createElement("TD");
		if (_Lang==2)
			var textElement = document.createTextNode("Ajouter menu");
		else if (_Lang==3)
			var textElement = document.createTextNode("Menü hinzufügen");
		else
			var textElement = document.createTextNode("Add menu");
		tdElement.appendChild(textElement);
		var tdLeft = document.createElement("TD");
		tdLeft.className = "tdSpace";
		var tdRight = document.createElement("TD");
		tdRight.className = "tdSpace";
		trElement1.appendChild(tdLeft);
		trElement1.appendChild(tdElement);
		trElement1.appendChild(tdRight);
		tbodyElement.appendChild(trElement1);
			
		var trElement2 = document.createElement("TR");
		trElement2.className = "menuTrOut";
		trElement2.onmouseover = function () {trElement2.className = "menuTrOn";};
		trElement2.onmouseout = function () {trElement2.className = "menuTrOut";};
		trElement2.onclick = function(){
				//openPopup(div,"100px","100px",2,SQLWWWHOME,e);
				var _iIndexPopupLink = parseInt(document.getElementById("_iIndexPopupLink").value);
				if(div.parentNode.parentNode.id=="usefullLink")
					urlNext="&iOrder="+div.id+"&idMenu="+getBrotherId(div);
				else
					urlNext="&iOrder="+div.id+"&idMenu="+div.parentNode.parentNode.id;
					SetOptionButton(_iIndexPopupLink,_ButtonUrlAdd,'',ShowButton,EnabledButton);
					SetOptionButton(_iIndexPopupLink,_ButtonUrlModify,'',ShowButton,DisabledButton);
				ViewPopup(_iIndexPopupLink,document.getElementById("updateBody").value+"&choice=2&unixTime="+(new Date()).getTime()+urlNext,'');
				//createLink(div,divElement.style.left,divElement.style.top,2,SQLWWWHOME,e);
				closeMenuPopup();
			};
	
		var tdElement = document.createElement("TD");
		if (_Lang==2)
			var textElement = document.createTextNode("Ajouter lien");
		else if (_Lang==3)
			var textElement = document.createTextNode("Link hinzufügen");
		else
			var textElement = document.createTextNode("Add link");
		tdElement.appendChild(textElement);
		var tdLeft = document.createElement("TD");
		tdLeft.className = "tdSpace";
		var tdRight = document.createElement("TD");
		tdRight.className = "tdSpace";
		trElement2.appendChild(tdLeft);
		trElement2.appendChild(tdElement);
		trElement2.appendChild(tdRight);
		tbodyElement.appendChild(trElement2);
		
		
		/****/
		var trElement5 = document.createElement("TR");
		trElement5.className = "menuTrOut";
		trElement5.onmouseover = function () {trElement5.className = "menuTrOn";};
		trElement5.onmouseout = function () {trElement5.className = "menuTrOut";};
		trElement5.onclick = function(){
//MARKER
 //openPopup(div,"100px","100px",10,SQLWWWHOME,e);
			 var _iIndexPopupURL = parseInt(document.getElementById("_iIndexPopupURL").value);
			 if(div.parentNode.parentNode.id=="usefullLink")
					urlNext="&iOrder="+div.id+"&idMenu="+getBrotherId(div);
				else
					urlNext="&iOrder="+div.id+"&idMenu="+div.parentNode.parentNode.id;
					
					SetOptionButton(_iIndexPopupURL,_ButtonUrlAdd,'',ShowButton,EnabledButton);
					SetOptionButton(_iIndexPopupURL,_ButtonUrlModify,'',ShowButton,DisabledButton);
				ViewPopup(_iIndexPopupURL,document.getElementById("updateBody").value+"&choice=10&unixTime="+(new Date()).getTime()+urlNext,'');
				/*createLink(div,divElement.style.left,divElement.style.top,2,SQLWWWHOME,e);*/
				closeMenuPopup();
			};
	
		var tdElement = document.createElement("TD");
		if (_Lang==2)
			var textElement = document.createTextNode("Ajouter URL");
		else if (_Lang==3)
			var textElement = document.createTextNode("URL hinzufügen");
		else
			var textElement = document.createTextNode("Add URL");
		tdElement.appendChild(textElement);
		var tdLeft = document.createElement("TD");
		tdLeft.className = "tdSpace";
		var tdRight = document.createElement("TD");
		tdRight.className = "tdSpace";
		trElement5.appendChild(tdLeft);
		trElement5.appendChild(tdElement);
		trElement5.appendChild(tdRight);
		tbodyElement.appendChild(trElement5);
		
		
		
		/****/
		
		var trElement3 = document.createElement("TR");
		if(div.id != "usefullLink")
		{
			trElement3.className = "menuTrOut";
			trElement3.onmouseover = function () {trElement3.className = "menuTrOn";};
			trElement3.onmouseout = function () {trElement3.className = "menuTrOut";};
			trElement3.onclick = function(){
					closeMenuPopup();
					if(div.className=="titleMenu")
					{
						modifyMenu(div);
						
						//openPopup(div,divElement.style.left,divElement.style.top,3,SQLWWWHOME,e);
					}
					else
					{
						var aDivElement = div.getElementsByTagName("A")[0].id;
						if(aDivElement != "personnalLink")
						{//updateLink
							//modifyMenu(div);
							divTampon = div;
							//openPopup(div,"100px","100px",4,SQLWWWHOME,e);
							var _iIndexPopupLink = parseInt(document.getElementById("_iIndexPopupLink").value);
							if(div.parentNode.parentNode.id=="usefullLink")
								urlNext="&iOrder="+div.id+"&idMenu="+getBrotherId(div);
							else
								urlNext="&iOrder="+div.id+"&idMenu="+div.parentNode.parentNode.id;
							SetOptionButton(_iIndexPopupLink,_ButtonUrlAdd,'',ShowButton,DisabledButton);
							SetOptionButton(_iIndexPopupLink,_ButtonUrlModify,'',ShowButton,EnabledButton);
							ViewPopup(_iIndexPopupLink,document.getElementById("updateBody").value+"&choice=4&unixTime="+(new Date()).getTime()+urlNext,'');
						}
						else
						{//Update URL
//MARKER			
							divTampon = div;	
							var _iIndexPopupURL = parseInt(document.getElementById("_iIndexPopupURL").value);
							if(div.parentNode.parentNode.id=="usefullLink")
								urlNext="&iOrder="+div.id+"&idMenu="+getBrotherId(div);
							else
							urlNext="&iOrder="+div.id+"&idMenu="+div.parentNode.parentNode.id;
							
							var aElement = div.getElementsByTagName("A")[0];
							var listNode = aElement.firstChild;
							while(listNode.nodeValue == "")
								listNode = listNode.nextSibling;
							//tempSend = "urlUser="+escape(aElement.href.split("//")[1])+"&labelUser="+escape(trim(listNode.nodeValue));
							tempSend = "urlUser="+escape(aElement.href)+"&labelUser="+escape(trim(listNode.nodeValue));
							
							SetOptionButton(_iIndexPopupURL,_ButtonUrlAdd,'',ShowButton,DisabledButton);
							SetOptionButton(_iIndexPopupURL,_ButtonUrlModify,'',ShowButton,EnabledButton);
							ViewPopup(_iIndexPopupURL,document.getElementById("updateBody").value+"&choice=12&unixTime="+(new Date()).getTime()+urlNext,tempSend);
				
		//					modifyUrl(div,"100px","100px",12,SQLWWWHOME,e);
						}
							
							
					}				
					
				};
		}
		else
		{
			trElement3.className = "menuTrOutOff";
			trElement3.onmouseover = function () {trElement3.className = "menuTrOnOff";};
			trElement3.onmouseout = function () {trElement3.className = "menuTrOutOff";};
		}
		var tdElement = document.createElement("TD");
		if (_Lang==2)
			var textElement = document.createTextNode("Modifier");
		else if (_Lang==3)
			var textElement = document.createTextNode("Ändern");
		else
			var textElement = document.createTextNode("Modify");
		tdElement.appendChild(textElement);
		var tdLeft = document.createElement("TD");
		tdLeft.className = "tdSpace";
		var tdRight = document.createElement("TD");
		tdRight.className = "tdSpace";
		trElement3.appendChild(tdLeft);
		trElement3.appendChild(tdElement);
		trElement3.appendChild(tdRight);
		tbodyElement.appendChild(trElement3);
		
		var trElement4 = document.createElement("TR");
		if(div.id != "usefullLink")
		{
			trElement4.className = "menuTrOut";
			trElement4.onmouseover = function () {trElement4.className = "menuTrOn";};
			trElement4.onmouseout = function () {trElement4.className = "menuTrOut";};
			trElement4.onclick = function(){
					if(div.className=="titleMenu")
					{
						deleteMenu(div);
						//openPopup(div,divElement.style.left,divElement.style.top,5,SQLWWWHOME,e);
					}
					else
					{
						deleteProc(div);
						//openPopup(div,divElement.style.left,divElement.style.top,6,SQLWWWHOME,e);
					}
					closeMenuPopup();
				};
		}
		else
		{
			trElement4.className = "menuTrOutOff";
			trElement4.onmouseover = function () {trElement4.className = "menuTrOnOff";};
			trElement4.onmouseout = function () {trElement4.className = "menuTrOutOff";};
		}
		
		var tdElement = document.createElement("TD");
		if (_Lang==2)
			var textElement = document.createTextNode("Effacer");
		else if (_Lang==3)
			var textElement = document.createTextNode("Löschen");
		else
			var textElement = document.createTextNode("Delete");
		tdElement.appendChild(textElement);
		var tdLeft = document.createElement("TD");
		tdLeft.className = "tdSpace";
		var tdRight = document.createElement("TD");
		tdRight.className = "tdSpace";
		trElement4.appendChild(tdLeft);
		trElement4.appendChild(tdElement);
		trElement4.appendChild(tdRight);
		tbodyElement.appendChild(trElement4);
		
		
		tableElement.appendChild(tbodyElement);
		divElement.appendChild(tableElement);
		document.getElementsByTagName("body")[0].appendChild(divElement);
	}
}

/*******************************************/
var brotherDivTemp = null;
function findBrotherDiv(div,sens)
{
	if(sens == "RIGHT")
		brotherDivTemp = div.nextSibling;
	else if(sens == "LEFT")
		brotherDivTemp = div.previousSibling;
	while(brotherDivTemp && brotherDivTemp.nodeName!="DIV")
	{
		if(sens == "RIGHT")
			brotherDivTemp = brotherDivTemp.nextSibling;
		else if(sens == "LEFT")
			brotherDivTemp = brotherDivTemp.previousSibling;
	}
}


function suppEmptyMenu(div){
	findBrotherDiv(div,"RIGHT");
	var brotherDiv = brotherDivTemp;
	brotherDivTemp = null;

	if(div.id == "child" )
	{
		var listDiv = div.getElementsByTagName("DIV");
		if(listDiv.length != 0)
			suppEmptyMenu(listDiv[0]);
		else
		{
			findBrotherDiv(div,"LEFT")
			var brotherLeftDiv = brotherDivTemp;
			brotherDivTemp = null;
			brotherLeftDiv.parentNode.removeChild(brotherLeftDiv);
			div.parentNode.removeChild(div);
			
		}
	}
	if(brotherDiv)
		suppEmptyMenu(brotherDiv);
}
/*****************************************/
function openPopup(div,leftPos,topPos,choice,SQLWWWHOME,e){
//MARKER
	divTampon = div;
	var divElement = document.createElement("DIV");
	divElement.className = "popupContour";
	divElement.id="actionPopup";
	divElement.style.left=leftPos;
	divElement.style.top=topPos;
	divElement.style.width="300px";
	if(parseInt(choice)==10 || parseInt(choice)==12)
		divElement.style.height="220px";
	else
		divElement.style.height="400px";
	divElement.style.position="absolute";
	
	/***********************************************/
	/*Create title area for title and option button*/
	/*div1 = text area                             */
	/*div2 = button area                           */
	/*divTitle = position of title and button      */
	/*CSS = #SQLWWWHOME#/css/oga_popup.css       */
	/***********************************************/
	
	var tableEnglobant = document.createElement("table");
	tableEnglobant.className="popupContour";
	var tbodyEnglobant = document.createElement("tbody");
	var trEnglobant = document.createElement("tr");
	trEnglobant.className = "popupTitle";
	var tdEnglobant = document.createElement("td");
	
	
	var divTitle = document.createElement("DIV");
	if(nav == "Microsoft Internet Explorer")
		divTitle.onmousedown = function () {init_traine(e);};
	else
		divTitle.setAttribute("onmousedown","init_traine(event);");
	divTitle.className = "titleEnglobant";
	
	var div1 = document.createElement("DIV");
	div1.className = "titleText";alert(2);alert(_Lang)
	if (_Lang==2)
		var textElement = document.createTextNode("Gestion du menu utilisateur");
	else if (_Lang==3)
		var textElement = document.createTextNode("Benutzermenu-Verwaltung");
	else
		var textElement = document.createTextNode("User menu management");
	div1.appendChild(textElement);
	var div2 = document.createElement("DIV");
	div2.className = "titleButton";
	var imgElement = document.createElement("IMG");
	imgElement.src=SQLWWWHOME+"/images/close.gif";
	imgElement.onmouseover = function () {this.parentNode.parentNode.onmousedown='';};
	imgElement.onmouseout = function () {this.parentNode.parentNode.onmousedown=function(){init_traine(e)};};
	imgElement.onclick=function () {closeFenetrePopup();};
	
	div2.appendChild(imgElement);
	
	divTitle.appendChild(div1);
	divTitle.appendChild(div2);
	tdEnglobant.appendChild(divTitle);
	
	trEnglobant.appendChild(tdEnglobant);
	tbodyEnglobant.appendChild(trEnglobant);
	
	/*************************************************/
	/*Create body div for menu and application       */
	/*divBody = body area of the popup               */
	/*************************************************/
	var trEnglobant = document.createElement("tr");
	trEnglobant.className="popupContourBody";
	var tdEnglobant = document.createElement("td");
	var divBody = document.createElement("DIV");
	divBody.id = "bodyDivId";
	if(parseInt(choice)==10 ||parseInt(choice)==12)
		divElement.style.height="160px";
	else
		divBody.style.height="340px";
	divBody.style.width="290px";
	divBody.className = "bodyEnglobant";
	bodyPopup(divBody,choice,div);
	tdEnglobant.appendChild(divBody);
	trEnglobant.appendChild(tdEnglobant);
	tbodyEnglobant.appendChild(trEnglobant);
	
	
	
	/*************************************************/
	/*Create button div for button                   */
	/*divButton = button area of the popup           */
	/*************************************************/
	var trEnglobant = document.createElement("tr");
	trEnglobant.className="popupContourBody";
	var tdEnglobant = document.createElement("td");
	var divButton = document.createElement("DIV");
	divButton.id = "buttonDivId";
	divButton.className = "titleEnglobant";
	var buttonElement = document.createElement("INPUT");
	if(parseInt(choice)==4 || parseInt(choice)==12)
		{
		if (_Lang==2)
			buttonElement.value="Modifier";
		else if (_Lang==3)
			buttonElement.value="Ändern";
		else
			buttonElement.value="Modify";
		}
	else
		{
		if (_Lang==2)
			buttonElement.value="Ajouter";
		else if (_Lang==3)
			buttonElement.value="Hinzufügen";
		else
			buttonElement.value="Add";
		}	
	buttonElement.onclick = function () {addProcButton();};
	buttonElement.type = "button";
	//divButton.style.background = "";
	/*divBody.style.height="350px";
	divBody.style.width="290px";
	divBody.className = "bodyEnglobant";*/
	divButton.appendChild(buttonElement);
	tdEnglobant.appendChild(divButton);
	trEnglobant.appendChild(tdEnglobant);
	tbodyEnglobant.appendChild(trEnglobant)
	
	
	tableEnglobant.appendChild(tbodyEnglobant);
	divElement.appendChild(tableEnglobant);
	
	/*********************/
	
	
	
	

	if(nav=="Microsoft Internet Explorer")
	{
		expandDiv = document.createElement("DIV");
		expandDiv.style.position="absolute";
		expandDiv.style.width="20px";
		expandDiv.style.height="20px";
		//expandDiv.style.border="1px solid red";
		expandDiv.style.left=parseInt(divElement.style.width)-20+"px";//parseInt(leftPos)+
		expandDiv.style.top=parseInt(divElement.style.height)-20+"px";//parseInt(topPos)+
		expandDiv.onmousedown = function () { 
				expand=true;
				expandX=getCoordX(e);
				expandY=getCoordY(e);
			//	alert(expandDiv.style.width+" "+expandDiv.style.height)
		};
		expandDiv.onmouseover = function () {expandDiv.style.cursor='se-resize';}
		expandDiv.onmouseout = function (){if(!expand){expandDiv.style.cursor=''}};
		
		
		unExpandDiv = document.createElement("DIV");
		/*unExpandDiv.style.position="absolute";
		unExpandDiv.style.width="100px";
		unExpandDiv.style.height="100px";
		unExpandDiv.style.border="1px solid red";
		unExpandDiv.style.left=400;//parseInt(leftPos)+
		unExpandDiv.style.top=200;//parseInt(topPos)+*/
		//unExpandDiv.innerHTML = "<table width=100%><tr><td>&nbsp;</td></tr></table>";
		unExpandDiv.className = "filterDiv";
		unExpandDiv.onmouseup = function () { 
				document.onmouseup;
			//	alert(expandDiv.style.width+" "+expandDiv.style.height)
		};
		unExpandDiv.onmouseout = function () { 
				document.onmouseup;
			//	alert(expandDiv.style.width+" "+expandDiv.style.height)
		};
		
		
		
		
	}
	else
	{
		expandDiv = document.createElement("DIV");
		expandDiv.style.position="absolute";
		expandDiv.style.width="10px";
		expandDiv.style.height="10px";
		//expandDiv.style.border="1px solid red";
		expandDiv.style.left=parseInt(divElement.style.width)-10+"px";//parseInt(leftPos)+
		expandDiv.style.top=parseInt(divElement.style.height)-10+"px";
		expandDiv.setAttribute("onmousedown","expand=true;expandX=getCoordX(event);expandY=getCoordY(event);");
		expandDiv.setAttribute("onmouseover","this.style.cursor='se-resize';");
		expandDiv.setAttribute("onmouseout","if(!expand){this.style.cursor='';}");
		
		
		unExpandDiv = document.createElement("DIV");
		/*unExpandDiv.style.position="absolute";
		unExpandDiv.style.width="100px";
		unExpandDiv.style.height="100px";
		unExpandDiv.style.border="1px solid red";
		unExpandDiv.style.left=450;//parseInt(leftPos)+
		unExpandDiv.style.top=200;//parseInt(topPos)+*/
		//unExpandDiv.innerHTML = "<table width=100%><tr><td>&nbsp;</td></tr></table>";
		unExpandDiv.className = "filterDiv";
		unExpandDiv.setAttribute("onmouseup","document.onmouseup");
		unExpandDiv.setAttribute("onmouseout","document.onmouseup");
	}
	document.getElementById("usefullLinkDiv").parentNode.appendChild(unExpandDiv);
	divElement.appendChild(expandDiv);
	
	document.getElementsByTagName("body")[0].appendChild(divElement);

//	document.getElementsByTagName("body")[0].appendChild(expandDiv);
}
expandX = 0;
expandY = 0;
expand = false;
var expandDiv;
var unExpandDiv;
function menuCreate(div,choice,divElement){

	var divMenu = document.createElement("DIV");
	if(parseInt(choice)==1||parseInt(choice)==2)
		divMenu.className="menuMenuOn";
	else
		divMenu.className="menuMenu";
	if (_Lang==2)
		var textElement = document.createTextNode("Ajouter");
	else if (_Lang==3)
		var textElement = document.createTextNode("Hinzufügen");
	else
		var textElement = document.createTextNode("Add");	
	divMenu.appendChild(textElement);
	div.appendChild(divMenu);
	var divMenu = document.createElement("DIV");
	if(parseInt(choice)==1)
		divMenu.className="menuLinkOn";
	else
		divMenu.className="menuLink";
	if (_Lang==2)
		var textElement = document.createTextNode("Menu");
	else if (_Lang==3)
		var textElement = document.createTextNode("Menü");
	else
		var textElement = document.createTextNode("Menu");
	divMenu.style.left="3px";
	divMenu.appendChild(textElement);
	div.appendChild(divMenu);
	var divMenu = document.createElement("DIV");
	if(parseInt(choice)==2)
		divMenu.className="menuLinkOn";
	else
		divMenu.className="menuLink";
	if (_Lang==2)
		var textElement = document.createTextNode("Lien");
	else if (_Lang==3)
		var textElement = document.createTextNode("Link");
	else
		var textElement = document.createTextNode("Link");
	divMenu.style.left="3px";
	divMenu.appendChild(textElement);
	div.appendChild(divMenu);
	
	var divMenu = document.createElement("DIV");
	if(parseInt(choice)==3||parseInt(choice)==4)
		divMenu.className="menuMenuOn";
	else
		divMenu.className="menuMenu";
	if (_Lang==2)
		var textElement = document.createTextNode("Modifier");
	else if (_Lang==3)
		var textElement = document.createTextNode("Ändern");
	else
		var textElement = document.createTextNode("Modify");
	divMenu.appendChild(textElement);
	div.appendChild(divMenu);
	var divMenu = document.createElement("DIV");
	if(parseInt(choice)==3)
		divMenu.className="menuLinkOn";
	else
		divMenu.className="menuLink";
	if (_Lang==2)
		var textElement = document.createTextNode("Menu");
	else if (_Lang==3)
		var textElement = document.createTextNode("Menü");
	else
		var textElement = document.createTextNode("Menu");
	divMenu.style.left="3px";
	divMenu.appendChild(textElement);
	div.appendChild(divMenu);
	var divMenu = document.createElement("DIV");
	if(parseInt(choice)==4)
		divMenu.className="menuLinkOn";
	else
		divMenu.className="menuLink";
	if (_Lang==2)
		var textElement = document.createTextNode("Lien");
	else if (_Lang==3)
		var textElement = document.createTextNode("Link");
	else
		var textElement = document.createTextNode("Link");
	divMenu.style.left="3px";
	divMenu.appendChild(textElement);
	div.appendChild(divMenu);
	
	var divMenu = document.createElement("DIV");
	if(parseInt(choice)==5||parseInt(choice)==6)
		divMenu.className="menuMenuOn";
	else
		divMenu.className="menuMenu";
	if (_Lang==2)
		var textElement = document.createTextNode("Supprimer");
	else if (_Lang==3)
		var textElement = document.createTextNode("Löschen");
	else
		var textElement = document.createTextNode("Delete");
	divMenu.appendChild(textElement);
	div.appendChild(divMenu);
	var divMenu = document.createElement("DIV");
	if(parseInt(choice)==5)
		divMenu.className="menuLinkOn";
	else
		divMenu.className="menuLink";
	if (_Lang==2)
		var textElement = document.createTextNode("Menu");
	else if (_Lang==3)
		var textElement = document.createTextNode("Menü");
	else
		var textElement = document.createTextNode("Menu");
	divMenu.style.left="3px";
	divMenu.appendChild(textElement);
	div.appendChild(divMenu);
	var divMenu = document.createElement("DIV");
	if(parseInt(choice)==6)
		divMenu.className="menuLinkOn";
	else
		divMenu.className="menuLink";
	if (_Lang==2)
		var textElement = document.createTextNode("Lien");
	else if (_Lang==3)
		var textElement = document.createTextNode("Link");
	else
		var textElement = document.createTextNode("Link");
	divMenu.style.left="3px";
	divMenu.appendChild(textElement);
	
	div.appendChild(divMenu);
	
}

function getBrotherId(divClic){
	brotherElement = divClic;
	while (brotherElement=brotherElement.nextSibling)
	{
		if(brotherElement.nodeName=="DIV")
			return(brotherElement.id);
	}
	return 1;
}

function bodyPopup(divBody,choice,divClic){
//MARKER

	getXhr();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200)
		{	
			divBody.innerHTML = xhr.responseText;
			suppEmptyMenu(divBody.getElementsByTagName("DIV")[0]);
		}
		};
	var urlNext = ""
	if(parseInt(choice)%2==1)
		urlNext="&iOrder="+divClic.id+"&idMenu=1";
	else
	{

		if(divClic.parentNode.parentNode.id=="usefullLink")
			urlNext="&iOrder="+divClic.id+"&idMenu="+getBrotherId(divClic);
		else
			urlNext="&iOrder="+divClic.id+"&idMenu="+divClic.parentNode.parentNode.id;

	}
	
	var tempSend = "";
	if(choice == 12)
	{
		var aElement = divClic.getElementsByTagName("A")[0];
		var listNode = aElement.firstChild;
		while(listNode.nodeValue == "")
			listNode = listNode.nextSibling;
		//tempSend = "urlUser="+escape(aElement.href.split("//")[1])+"&labelUser="+escape(trim(listNode.nodeValue));
		tempSend = "urlUser="+escape(aElement.href)+"&labelUser="+escape(trim(listNode.nodeValue));
	}
	xhr.open("POST",document.getElementById("updateBody").value+"&choice="+choice+"&unixTime="+(new Date()).getTime()+urlNext,true);
	
	xhr.send(tempSend);
}

var regExpBeginning = /^\s+/;
var regExpEnd       = /\s+$/;
function trim(aString) {
    return aString.replace(regExpBeginning, "").replace(regExpEnd, "");
}

var bool = true;
var bool2 = true;
document.onkeydown = function (ev) {

	if( window.event)
	{
		if(window.event.keyCode==27)
		{
			if(bool)
			{
				bool = false;
				closeFenetrePopup()
				closeMenuPopup()
				closeAllChildren();
				clickMenu[0] = 0;
				menuElementSelect = "";
				createFilter(-1);
			}
		}
	}
	else
	{
		document.captureEvents(Event.KEYDOWN);
		if(ev.which == 27)
		{
			if(bool)
			{
				bool = false;
				closeFenetrePopup()
				closeMenuPopup()
				closeAllChildren();
				clickMenu[0] = 0;
				menuElementSelect = "";
				createFilter(-1);
			}
		}
	}
}

document.onkeyup = function (ev) {

	if( window.event)
	{
		if(window.event.keyCode==27)
		{
			bool = true;
		}
		else if(window.event.keyCode==13)
		{
			bool2 = true;
		}
	}
	else
	{
		document.captureEvents(Event.KEYUP);
		if(ev.which == 27)
		{
			bool = true;
		}
		else if(ev.which == 13)
		{
			bool2 = true;
		}
	}
}


/*********************************************/
/*******gestion action ajout,supp,modif*******/
/*********************************************/

function addMenu(titleMenu){
	getXhr();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			var divRes = document.getElementById("usefullLink");
			divRes.innerHTML= divRes.innerHTML+xhr.responseText;
			closeFenetrePopup();
		}
	};
	var tempSend = null;
	xhr.open("GET",document.getElementById("updatePosition").value+"&azLabel="+escape(titleMenu)+"&choice=2&unixTime="+(new Date()).getTime(),true);
	xhr.send(tempSend);
}

function modifyProc(div,i){
	
	getXhr();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			/*reloader la div :P*/
			divTampon.parentNode.innerHTML = xhr.responseText;
			closeFenetrePopup();
			//eval("location='/Scripts/sql.exe?SqlDB=«SqlDB»&Sql=oga:createUserMenu.phs&xid=«xid»'");
		}
	};
	var tempSend = null;
	var tempIdMenu = document.getElementById("idMenuChoice").value;
	if(tempIdMenu == "")
		tempIdMenu = 1;
	var tempSend = null;
	xhr.open("GET",document.getElementById("updatePosition").value+"&iOrder="+document.getElementById("iOrderChoice").value+"&idMenu="+tempIdMenu+"&idMenuChoice="+document.getElementById("idMenuChoice").value+"&idProc="+div.id+"&choice=5&unixTime="+(new Date()).getTime(),true);
	xhr.send(tempSend);
}

function addProc(div,i){
	div.parentNode.removeChild(div);
	getXhr();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			var divRes;
			
			if(document.getElementById("idMenuChoice").value=="" || parseInt(document.getElementById("idMenuChoice").value)==1)
				divRes = document.getElementById("usefullLink");
			else
			{
				var trouve = false;
				listDiv = document.getElementById("usefullLink").getElementsByTagName("Div");
				var i = 0;
				while(!trouve && i<listDiv.length)
				{
					//alert(listDiv[i].className+" "+listDiv[i].id)
					if(listDiv[i].className=="bodyMenu" && parseInt(listDiv[i].id)==parseInt(document.getElementById("idMenuChoice").value))
					{
						divRes = listDiv[i];
						trouve = true;
					}
					i++;
				}
			}
			divRes.innerHTML= divRes.innerHTML+xhr.responseText;
			//closeFenetrePopup();
		}
	};
	var tempSend = null;
	var tempIdMenu = document.getElementById("idMenuChoice").value;
	if(tempIdMenu == "")
		tempIdMenu = 1;
		//alert(document.getElementById("updatePosition").value+"&idMenu="+tempIdMenu+"&idProc="+div.id+"&choice=3&unixTime="+(new Date()).getTime());
	xhr.open("GET",document.getElementById("updatePosition").value+"&idMenu="+tempIdMenu+"&idProc="+div.id+"&choice=3&unixTime="+(new Date()).getTime(),true);
	xhr.send(tempSend);
}

function updateMenu(iOrder,titleMenu){
	getXhr();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
		//	divTampon.firstChild.nodeValue = document.getElementById("azLabelMenu").value;
		}
	};
	var tempSend = null;
	xhr.open("GET",document.getElementById("updatePosition").value+"&azLabel="+escape(titleMenu)+"&iOrder="+iOrder+"&choice=4&unixTime="+(new Date()).getTime(),true);
	xhr.send(tempSend);
}

function updateProc(iOrder,idMenu){
	getXhr();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			/*reloader la div :P*/
			eval("location='/Scripts/sql.exe?SqlDB=Â«SqlDBÂ»&Sql=oga:page1.phs&xid=Â«xidÂ»'");
		}
	};
	var tempSend = null;
	xhr.open("GET",document.getElementById("updatePosition").value+"&azLabel="+document.getElementById("azLabelChoice").value+"&iOrder="+iOrder+"&idMenu="+idMenu+"&idMenuChoice="+document.getElementById("idMenuChoice").value+"&idProc="+document.getElementById("idProcChoice").value+"&choice=5&unixTime="+(new Date()).getTime(),true);
	xhr.send(tempSend);
}

function changeLink(selectElement){
	var optionElement = selectElement.getElementsByTagName("OPTION");
	i=0;
	while(!optionElement[i].selected && i<optionElement.length)
	{
		i++;
	}
	var temp = optionElement[i].firstChild.nodeValue.split('/');
	document.getElementById("azLabelChoice").value = temp[1];
}

function delMenu(iOrder){
	getXhr();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			decrementBrother(divTampon);
			divTampon.parentNode.parentNode.removeChild(divTampon.parentNode);
			closeFenetrePopup();
		}
	};
	var tempSend = null;
	xhr.open("GET",document.getElementById("updatePosition").value+"&iOrder="+iOrder+"&choice=6&unixTime="+(new Date()).getTime(),true);
	xhr.send(tempSend);
}

function delProc(div){
	if(div.parentNode.parentNode.id=="usefullLink")
		urlNext="&iOrder="+div.id+"&idMenu="+getBrotherId(div);
	else
		urlNext="&iOrder="+div.id+"&idMenu="+div.parentNode.parentNode.id;
	getXhr();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			decrementBrother(divTampon);
			divTampon.parentNode.parentNode.removeChild(divTampon.parentNode);
			//closeFenetrePopup();
		}
	};
	var tempSend = null;
	xhr.open("GET",document.getElementById("updatePosition").value+urlNext+"&choice=7&unixTime="+(new Date()).getTime(),true);
	xhr.send(tempSend);
}

	function addUsefullLink()
	{
		if(window.frames['site'].document.getElementById('_UsefullLinkProc')!=null)
		{
			var _IdProc = window.frames['site'].document.getElementById('_UsefullLinkProc').value;
				getXhr();
				xhr.onreadystatechange = function(){
					if(xhr.readyState == 4 && xhr.status == 200){
						var divRes;
						if(parseInt(xhr.responseText)!=-1)
						{
							divRes = document.getElementById("usefullLink");
							divRes.innerHTML= divRes.innerHTML+xhr.responseText;
						}
						//closeFenetrePopup();
					}
				};
				var tempSend = null;
				xhr.open("GET",document.getElementById("updatePosition").value+"&idMenu=1&idProc="+_IdProc+"&choice=8&unixTime="+(new Date()).getTime(),true);
				xhr.send(tempSend);
		}
		else
		{
		if (_Lang==2)
			var _AlertTxt = "Pas de raccourci défini pour cette page.";
		else if (_Lang==3)
			var _AlertTxt = document.createTextNode("Keine definierte Verknüpfung für diese Seite.");
		else
			var _AlertTxt = document.createTextNode("No shortcut defined for this page.");
		alert(_AlertTxt);
		}
	}

/**********************************************/
/***Move popup window**************************/
/**********************************************/
var idLayer = null;
var layer = null;
var layerStyle = null;
var nav = navigator.appName;
var dom = (document.getElementById); 
var iex = (document.all);
var nn4 = (document.layers);
var largeur = 500;
var X,Y,moveX,moveY,offsetX,offsetY;
var traine = false;

function init_layer(e){
	move=2;
	idLayer = "actionPopup";
	if (dom && (document.getElementById(idLayer)))
	{
		layerStyle = document.getElementById(idLayer).style;
		if(iex)
		{
			X = "event.clientX";
			Y = "event.clientY" ;
			offsetX = "document.body.scrollLeft";
			offsetY = "document.body.scrollTop";
			
		}
		else
		{
			X = "e.clientX";
			Y = "e.clientY";
			offsetX = "pageXOffset";
			offsetY = "pageYOffset";
		}
		
	}		
	else if (iex && (idLayer))
	{
		layerStyle = idLayer.style;
		X="event.clientX";
		Y="event.clientY";
		offsetX="document.body.scrollLeft";
		offsetY="document.body.scrollTop";
	}
	else if (nn4 && (document.layers[idLayer]))
	{

		layerStyle = document.layers[idLayer];
		X="e.pageX";
		Y="e.pageY";
		offsetX="pageXOffset";
		offsetY="pageYOffset";
		document.captureEvents(Event.MOUSEDOWN|Event.MOUSEMOVE|Event.MOUSEUP);
	}
}

function init_traine(e){
	
	init_layer(e)
	if (layerStyle )
	{
		/*if(nav=="Microsoft Internet Explorer")
		{*/
			var Xin = eval(X);
			var Yin = eval(Y);
			var L = parseFloat(layerStyle.left);
			var T = parseFloat(layerStyle.top);
		/*}
		else
		{
			
			var Xin = eval(X);
			var Yin = eval(Y);
			var L = -parseFloat(layerStyle.left);
			var T = -10;
			
		}*/
		
		var offX = (nn4)? 0 : eval(offsetX);
		var offY = (nn4)? 0 : eval(offsetY);
		traine = true;
			
		moveX=Xin-L;
		moveY=Yin-T;
		//logMSG(Xin+" "+Yin+" "+L+" "+T+" "+offX+" "+offY+" "+moveX+" "+moveY)
	}
	else
		traine = false;
}

function stop_traine(){
	//alert(resize)
	if (traine)
	{
		moveX = null;
		moveY = null;
		traine = false;
		var idLayer = null;
		var layer = null;
		var layerStyle = null;
	}
}

function traine_layer(e){
	if (traine)
	{
		var Xin = eval(X);
		var Yin = eval(Y);
		tempY= Yin - moveY;
		if(tempY>0)
		{
			layerStyle.top = tempY;
		}
		tempX = Xin - moveX;
		if(tempX>0)
		{
			layerStyle.left = tempX;
		}
	}
	else if(expand)
	{
			
		
		if(nav=="Microsoft Internet Explorer")
		{
			expandX2=getCoordX(e);
			var widthDiv = document.getElementById('actionPopup').style.width;
			var tempWith = parseInt(widthDiv)+expandX2-expandX;
			if(tempWith>300)
			{
				document.getElementById('actionPopup').style.width = tempWith+"px";
				expandDiv.style.left=parseInt(document.getElementById('actionPopup').style.width)-20+"px";//parseInt(leftPos)+
				//unExpandDiv.style.left=parseInt(document.getElementById('actionPopup').style.width)-50+"px";
				document.getElementById('bodyDivId').style.width = parseInt(tempWith)-10+"px";
				var applet = document.getElementById("jTable");
				if(applet)
					applet.width = parseInt(tempWith)-11+"px"
				expandX = expandX2;
			}
				
			expandY2=getCoordY(e);
			var widthDiv = document.getElementById('actionPopup').style.height;
			var tempHeight = parseInt(widthDiv)+expandY2-expandY;
			if(tempHeight>200)
			{
				document.getElementById('actionPopup').style.height =tempHeight+"px";
				expandDiv.style.top=parseInt(document.getElementById('actionPopup').style.height)-20+"px";
				//unExpandDiv.style.top=parseInt(document.getElementById('actionPopup').style.height)-42+"px";
				document.getElementById('bodyDivId').style.height = parseInt(tempHeight)-60+"px";
				var applet = document.getElementById("jTable");
				if(applet)
					applet.height = parseInt(tempHeight)-61+"px";
				expandY = expandY2;
			}
			
		}
		else
		{
			expandX2=getCoordX(e);
			var widthDiv = document.getElementById('actionPopup').style.width;
			var tempWith = parseInt(widthDiv)+expandX2-expandX;
			if(tempWith>300)
			{
				document.getElementById('actionPopup').style.width = tempWith+"px";
				expandDiv.style.left=parseInt(document.getElementById('actionPopup').style.width)-10+"px";//parseInt(leftPos)+
				//unExpandDiv.style.left=parseInt(document.getElementById('actionPopup').style.width)-50+"px";//parseInt(leftPos)+
				document.getElementById('bodyDivId').style.width = parseInt(tempWith)-10+"px";
				expandX = expandX2;
				var applet = document.getElementById("jTable");
				if(applet)
					applet.width = parseInt(tempWith)-11+"px"
			}
			
			expandY2=getCoordY(e);
			var widthDiv = document.getElementById('actionPopup').style.height;
			var tempHeight = parseInt(widthDiv)+expandY2-expandY;
			if(tempHeight>200)
			{
				
				document.getElementById('actionPopup').style.height = tempHeight+"px";
				expandDiv.style.top=parseInt(document.getElementById('actionPopup').style.height)-10+"px";
				//unExpandDiv.style.top=parseInt(document.getElementById('actionPopup').style.height)-50+"px";
				document.getElementById('bodyDivId').style.height = parseInt(tempHeight)-60+"px";
				var applet = document.getElementById("jTable");
				if(applet)
					applet.height = parseInt(tempHeight)-61+"px";
				expandY = expandY2;
			}
			
		}
	}
}

document.onmousemove=traine_layer;


function openPopupTest(div,leftPos,topPos,choice,SQLWWWHOME,e){
	divTampon = div;
	var divElement = document.createElement("DIV");
	divElement.className = "popupContour";
	divElement.id="actionPopup";
	divElement.style.left=leftPos;
	divElement.style.top=topPos;
	divElement.style.width="500px";
	divElement.style.height="250px";
	divElement.style.position="absolute";
	
	/***********************************************/
	/*Create title area for title and option button*/
	/*div1 = text area                             */
	/*div2 = button area                           */
	/*divTitle = position of title and button      */
	/*CSS = #SQLWWWHOME#/css/oga_popup.css       */
	/***********************************************/
	
	var tableEnglobant = document.createElement("table");
	tableEnglobant.className="popupContour";
	var tbodyEnglobant = document.createElement("tbody");
	var trEnglobant = document.createElement("tr");
	trEnglobant.className = "popupTitle";
	var tdEnglobant = document.createElement("td");
	
	
	var divTitle = document.createElement("DIV");
	if(nav == "Microsoft Internet Explorer")
		divTitle.onmousedown = function () {init_traine(e);};
	else
		divTitle.setAttribute("onmousedown","init_traine(event);");
	divTitle.className = "titleEnglobant";
	
	var div1 = document.createElement("DIV");
	div1.className = "titleText";alert(1);alert(_Lang)
	if (_Lang==2)
		var textElement = document.createTextNode("Gestion du menu utilisateur");
	else if (_Lang==3)
		var textElement = document.createTextNode("Benutzermenü-Verwaltung");
	else
		var textElement = document.createTextNode("User menu management");
	div1.appendChild(textElement);
	
	var div2 = document.createElement("DIV");
	div2.className = "titleButton";
	var imgElement = document.createElement("IMG");
	imgElement.src=SQLWWWHOME+"/images/close.gif";
	imgElement.onmouseover = function () {this.parentNode.parentNode.onmousedown='';};
	imgElement.onmouseout = function () {this.parentNode.parentNode.onmousedown=function(){init_traine(e)};};
	imgElement.onclick=function () {closeFenetrePopup();};
	
	div2.appendChild(imgElement);
	
	divTitle.appendChild(div1);
	divTitle.appendChild(div2);
	tdEnglobant.appendChild(divTitle);
	
	trEnglobant.appendChild(tdEnglobant);
	tbodyEnglobant.appendChild(trEnglobant);
	
	/*************************************************/
	/*Create body div for menu and application       */
	/*divBody = body area of the popup               */
	/*************************************************/
	var trEnglobant = document.createElement("tr");
	trEnglobant.className="popupContourBody";
	var tdEnglobant = document.createElement("td");
	var divBody = document.createElement("DIV");
	divBody.id = "bodyDivId";
	divBody.style.height="218px";
	divBody.style.width="490px";
	divBody.className = "bodyEnglobant";
//	bodyPopup(divBody,choice,div);

	var applet = document.createElement("APPLET");
	applet.id = "jTable";
	applet.name="accountApplet";
	applet.archive="OGAAccount.jar";
	applet.codeBase=SQLWWWHOME+"/java";
	applet.code="OGAAccount";
	applet.width="489"
	applet.height="217";
	applet.setAttribute("mayscript","true");
	
	var param1 = document.createElement("PARAM");
	param1.name="jtableInit";
	param1.value="1";
	
	applet.appendChild(param1);
	
	var param2 = document.createElement("PARAM");
	param2.name="urlXinit";
	param2.value=document.getElementById("urlPage6").value;
	
	applet.appendChild(param2);
	
	divBody.appendChild(applet);
	//applet.style.display="block";
	tdEnglobant.appendChild(divBody);
	trEnglobant.appendChild(tdEnglobant);
	tbodyEnglobant.appendChild(trEnglobant)
	tableEnglobant.appendChild(tbodyEnglobant);
	divElement.appendChild(tableEnglobant);
	

	if(nav=="Microsoft Internet Explorer")
	{
		expandDiv = document.createElement("DIV");
		expandDiv.style.position="absolute";
		expandDiv.style.width="20px";
		expandDiv.style.height="20px";
		//expandDiv.style.border="1px solid red";
		expandDiv.style.left=476;//parseInt(leftPos)+
		expandDiv.style.top=226;//parseInt(topPos)+
		expandDiv.onmousedown = function () { 
				expand=true;
				expandX=getCoordX(e);
				expandY=getCoordY(e);
			//	alert(expandDiv.style.width+" "+expandDiv.style.height)
		};
		expandDiv.onmouseover = function () {expandDiv.style.cursor='se-resize';}
		expandDiv.onmouseout = function (){if(!expand){expandDiv.style.cursor=''}};
	}
	else
	{
		expandDiv = document.createElement("DIV");
		expandDiv.style.position="absolute";
		expandDiv.style.width="10px";
		expandDiv.style.height="10px";
		//expandDiv.style.border="1px solid red";
		expandDiv.style.left=492+"px";//parseInt(leftPos)+
		expandDiv.style.top=242+"px";//parseInt(topPos)+
		expandDiv.setAttribute("onmousedown","expand=true;expandX=getCoordX(event);expandY=getCoordY(event);");
		expandDiv.setAttribute("onmouseover","this.style.cursor='se-resize';");
		expandDiv.setAttribute("onmouseout","if(!expand){this.style.cursor='';}");
	}
	
	divElement.appendChild(expandDiv);
	
	document.getElementsByTagName("body")[0].appendChild(divElement);

//	document.getElementsByTagName("body")[0].appendChild(expandDiv);
}

function testmayscript(message){
	alert(message)
}

function testOpenMenu(div,e,url){
			//if(div.getElementsByTagName("DIV").length==0)
			 if(document.getElementById("menuPopup")==null)
				openMenu(div,e,url);
		}




