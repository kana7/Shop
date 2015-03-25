	var popupMode = 1; // 1 - PC; 2 - Mobile; 3 - Tablette
	var actifPopup = new Array();
	var iIndexActifPopup = -1;
	var iNumberPopup = -1;
	var bodyElement = null;
	var _azTitleDefault = "Please choose a title for popup.";
	
	var popupArea = new Array();
	var popupFrame = new Array();
	var popupAreaHeader = new Array();
	var popupAreaFooter = new Array();
	var popupAreaBody = new Array();
	var popupAreaBodyIFrame = new Array();
	//Header/footer variable definition
	var popupAreaHeaderHeight = 25;
	var popupAreaFooterHeight = 25;
	var popupAreaBodyHeight = new Array();
	
	
	//Popup variable definition
	var popupWidth = new Array();
	var popupHeight = new Array();
	var popupWidthMin = new Array();
	var popupWidthDefault = 400;
	var popupHeightMin = new Array();
	var popupHeightDefault = 400;
	var popupTitleWidth = 50;
	var popupX = new Array();
	var popupY = new Array();
	var popupXDefault = 100;
	var popupYDefault = 100;
	
	var moveX=0;
	var moveY=0;
	var move=false;
	
	var expand = false;
	var expandDiv = null;
	var expandX = 0;
	var expandY = 0;
	
	var iFrameMargin = 5;
	
	var block = false;
	var extendBlock = false;
	
	var HideButton = 0;
	var ShowButton = 1;
	var DisabledButton = 0;
	var EnabledButton = 1;
	
	var sqlWWWHome =""
	
	var srcImgDefault = new Array();
	srcImgDefault[1] = "/images/vide.gif";
	srcImgDefault[2] = "/images/popup/big.gif";
	srcImgDefault[3] = "/images/popup/close.gif";
	srcImgDefault[4] = "/images/popup/little.gif";
	srcImgDefault[5] = "/images/popup/expand.gif";
	
	function SetPopupMode( _Value)
	{
		popupMode = _Value;
	}
	
	function GetPopupMode()
	{
		return parseInt(popupMode);
	}
	
	function AddSpecialQuitButtonFooter(_iIndexPopup,_azButtonName,_azButtonFunction)
	{
		AddButtonFooter(_iIndexPopup,_azButtonName,_azButtonFunction);
		var ImgElement = document.getElementById("closePopup_"+_iIndexPopup);
		ImgElement.onclick =  function (){
				var iFrame =  popupAreaBodyIFrame[_iIndexPopup].contentWindow || popupAreaBodyIFrame[_iIndexPopup];
				eval("iFrame."+_azButtonFunction);//testAppelFunction();
			 };
	}
	
	function AddButtonFooter(_iIndexPopup,_azButtonName,_azButtonFunction){
		var buttonElement = document.createElement("INPUT");
		buttonElement.type = "button";
		buttonElement.className = "button";
		buttonElement.id = _azButtonName+"_"+_iIndexPopup;
		buttonElement.name = _azButtonName+"_"+_iIndexPopup;
		buttonElement.value = _azButtonName;
		buttonElement.onclick = function (){
				var iFrame =  popupAreaBodyIFrame[_iIndexPopup].contentWindow || popupAreaBodyIFrame[_iIndexPopup];
				eval("iFrame."+_azButtonFunction);//testAppelFunction();
			 };
		popupAreaFooter[_iIndexPopup].getElementsByTagName("DIV")[0].appendChild(buttonElement);
	}
	
	var popupNav = navigator.appName;
	
	function addBodyIFrame(_iIndexPopup,_azBalise,_azHTML){
		var iFrame =  popupAreaBodyIFrame[parseInt(_iIndexPopup)].contentDocument || popupAreaBodyIFrame[parseInt(_iIndexPopup)];
	//	alert(iFrame)
		if(_azBalise == "JAVASCRIPT")
		{
			if(popupNav=="Microsoft Internet Explorer")
				document.frames["iFrame_"+parseInt(_iIndexPopup)].document.head = _azHTML;
			else
			{
				
				var _azHead = iFrame.getElementsByTagName("HEAD")[0];
				var _eltScript = document.createElement("SCRIPT");
				_eltScript.src = _azHTML;
				_eltScript.type = "text/javascript";
				_azHead.appendChild(_eltScript);
				
			}
		}
		else if(_azBalise == "BODY")
		{
			if(popupNav=="Microsoft Internet Explorer")
				document.frames["iFrame_"+parseInt(_iIndexPopup)].document.body.innerHTML = _azHTML;
			else
				iFrame.getElementsByTagName(_azBalise)[0].innerHTML = _azHTML;
		}
		else if(_azBalise == "CSS")
		{
			if(popupNav!="Microsoft Internet Explorer")
			{
				var _azHead = iFrame.getElementsByTagName("HEAD")[0];
				var _eltScript = document.createElement("LINK");
				_eltScript.type='text/css';
				_eltScript.rel = 'stylesheet';
				_eltScript.href = _azHTML;
				_azHead.appendChild(_eltScript);
				
			}
			else
			{
				var printWindow = document.frames["iFrame_"+parseInt(_iIndexPopup)];
				var linkTag=printWindow.document.createElement('link');
				linkTag.type='text/css';
				linkTag.rel = 'stylesheet';
				linkTag.href = _azHTML;
				printWindow.document.documentElement.firstChild.appendChild(linkTag);
			}
		}
		else if(_azBalise == "HEAD")
		{
			if(popupNav!="Microsoft Internet Explorer")
			{
				var _azHead = iFrame.getElementsByTagName("HEAD")[0];
				var _eltScript = document.createElement("SCRIPT");
				_eltScript.src = _azHTML;
				_eltScript.type = "text/javascript";
				_azHead.appendChild(_eltScript);
				
			}
			else
			{
				var printWindow = document.frames["iFrame_"+parseInt(_iIndexPopup)];
				//var css=document.getElementsByTagName('link')[0];
				var linkTag=printWindow.document.createElement('link');
				linkTag.type='text/css';
				linkTag.rel = 'stylesheet';
				linkTag.href = sqlWWWHome+"/css/popup/popupMain.css";
				printWindow.document.documentElement.firstChild.appendChild(linkTag);
				//var js=document.getElementsByTagName('script')[i];
		/*		var jsTag=printWindow.document.createElement('script');
				jsTag.type = 'text/javascript';
				jsTag.src = 'http://10.1.1.13/LOLShop/js/tree/treeView.js';
				printWindow.document.documentElement.firstChild.appendChild(jsTag);*/
				
				
			/*	printWindow.document.documentElement.lastChild.innerHTML+=html.outerHTML;*/
			}
		}
	}
	
	
	/*var print=function(){		
	var printWindow=window.open('printBase.html');
	
	var css=document.getElementsByTagName('link')[0].cloneNode(true);
	var html=document.getElementsByTagName('div')[0].cloneNode(true);
	
	printWindow.addNode=function(){
		var linkTag=printWindow.document.createElement('link');
		linkTag.setAttribute('type', 'text/css');
		linkTag.setAttribute('rel', 'stylesheet');
		linkTag.setAttribute('href', css.getAttribute('href'));
		
		printWindow.document.documentElement.firstChild.appendChild(linkTag);
		printWindow.document.documentElement.lastChild.innerHTML+=html.outerHTML;
	}
	
	printWindow.attachEvent('onload', printWindow.addNode);
}*/
	

	
	function AddQuitUnreloadButtonFooter(_iIndexPopup,_azButtonName){
		var buttonElement = document.createElement("INPUT");
		buttonElement.type = "button";
		buttonElement.className = "button";
		buttonElement.id = _azButtonName+"_"+_iIndexPopup;
		buttonElement.name = _azButtonName+"_"+_iIndexPopup;
		buttonElement.value = _azButtonName;
		buttonElement.onclick = function (){
				HiddePopup(0);
			 };
		popupAreaFooter[_iIndexPopup].getElementsByTagName("DIV")[0].appendChild(buttonElement);
	}
	function AddQuitButtonFooterElementFocus(_iIndexPopup,_azButtonName,azElement){
		var buttonElement = document.createElement("INPUT");
		buttonElement.type = "button";
		buttonElement.className = "button";
		buttonElement.id = _azButtonName+"_"+_iIndexPopup;
		buttonElement.name = _azButtonName+"_"+_iIndexPopup;
		buttonElement.value = _azButtonName;
		buttonElement.onclick = function (){
				var eltFocus = document.getElementById(azElement);
				if(eltFocus != null)
					eltFocus.focus();
				HiddePopup(1);
				
			 };
		popupAreaFooter[_iIndexPopup].getElementsByTagName("DIV")[0].appendChild(buttonElement);
	}
	function AddQuitButtonFooter(_iIndexPopup,_azButtonName){
		var buttonElement = document.createElement("INPUT");
		buttonElement.type = "button";
		buttonElement.className = "button";
		buttonElement.id = _azButtonName+"_"+_iIndexPopup;
		buttonElement.name = _azButtonName+"_"+_iIndexPopup;
		buttonElement.value = _azButtonName;
		buttonElement.onclick = function (){
				HiddePopup(1);
			 };
		popupAreaFooter[_iIndexPopup].getElementsByTagName("DIV")[0].appendChild(buttonElement);
	}
	
	function AddButtonHeader(){
		popupButtonTmp = document.createElement("DIV");
		popupButtonTmp.onmouseover = function (){block = true;};
		popupButtonTmp.onmouseout = function (){block = false;};
		popupButtonTmp.id = "popupButton_"+iNumberPopup;
		if(isIE())
			popupButtonTmp.style.styleFloat = "right";
		else
			popupButtonTmp.style.cssFloat = "right";
		popupButtonTmp.style.height = "100%";
		popupButtonTmp.style.border = "0px solid black";
		popupButtonTmp.style.left ="0px";
		popupButtonTmp.style.top = "0px";
		//popupButtonTmp.style.background = "";
		
		var tableElement = document.createElement("TABLE");
		tableElement.className = "TableButtonHeader";
		//tableElement.width = popupTitleWidth+"px";
		var tbodyElement = document.createElement("TBODY");
		var trElement = document.createElement("TR");
		//trElement.width = popupAreaHeaderHeight+"px";
		var tdElement = document.createElement("TD");
		
		imgElement =  document.createElement("IMG");
		imgElement.id =  "optionPopup_"+iNumberPopup;
		imgElement.src = sqlWWWHome+srcImgDefault[1];
		imgElement.onclick = function () {ImageOnClick(1)};
		tdElement.appendChild(imgElement);
		trElement.appendChild(tdElement);

		if(GetPopupMode()==1)
		{
			var tdElement = document.createElement("TD");
			imgElement =  document.createElement("IMG");
			imgElement.id =  "extendPopup_"+iNumberPopup;
			imgElement.src = sqlWWWHome+srcImgDefault[2];
			imgElement.onclick = function () {ImageOnClick(2)};
			tdElement.appendChild(imgElement);
			trElement.appendChild(tdElement);
		}
		
		var tdElement = document.createElement("TD");
		imgElement =  document.createElement("IMG");
		imgElement.id =  "closePopup_"+iNumberPopup;
		imgElement.src = sqlWWWHome+srcImgDefault[3];
		imgElement.onclick = function () {ImageOnClick(3)};
		tdElement.appendChild(imgElement);
		trElement.appendChild(tdElement);
		
		
		tbodyElement.appendChild(trElement);
		tableElement.appendChild(tbodyElement);
		popupButtonTmp.appendChild(tableElement);
		popupAreaHeader[iNumberPopup].appendChild(popupButtonTmp);
		if(!document.getElementById("popupTitle_"+iNumberPopup))
			PopupErrorList(7);
	}
	
	function AddExpandButton(){
			popupExpandDiv = document.createElement("DIV");
			popupExpandDiv.style.position = "absolute";
			popupExpandDiv.style.right = "0px";
			popupExpandDiv.style.bottom = "0px";
			popupExpandTmp = document.createElement("IMG");
			popupExpandTmp.id = "popupExpandButton_"+iNumberPopup;
			popupExpandTmp.onmousedown = function (){return false;};
			popupExpandTmp.style.cursor=''
			popupExpandTmp.src = sqlWWWHome+srcImgDefault[5];
			
			
			popupExpandTmp.onmouseover = function () {this.style.cursor='se-resize';}
			popupExpandTmp.onmouseout = function (){if(!expand){this.style.cursor=''}};

			popupExpandDiv.onmousedown = function (event){
																		if(!expand && !extendBlock)
																		{
																			document.onselectstart = new function(){return false}
																			expand=true;
																			expandX=GetCoordX(event);
																			expandY=GetCoordY(event);
																			var expandDiv = document.createElement("DIV");
																			expandDiv.style.position = "absolute";
																			expandDiv.id = "expandDiv";
																			expandDiv.style.width = "100%";
																			expandDiv.style.height = "100%";
																			expandDiv.style.left = "0px";
																			expandDiv.style.top = "0px";
																			//expandDiv.style.background = "";
																			expandDiv.onmouseup = function (){
																															if(expand)
																																expand = false;
																															bodyElement.removeChild(document.getElementById("expandDiv"));
																															this.style.cursor='';
																														}
																			expandDiv.onmousemove = function (event){CalculPopupSize(event)}
																			bodyElement.appendChild(expandDiv);
																		}
																	};
			popupExpandDiv.appendChild(popupExpandTmp);
			popupAreaFooter[iNumberPopup].appendChild(popupExpandDiv);
	}
	
	function AddPopup(){
		iNumberPopup++;	
	}
	
	function AddTitle(_azTitle){
		if(_azTitle == "" || _azTitle == null )
			_azTitle = _azTitleDefault;
		popupTitleTmp = document.createElement("DIV");
		popupTitleTmp.className = "TitleDiv";
			popupTitleTmp.id = "popupTitle_"+iNumberPopup;
			if(isIE())
				popupTitleTmp.style.styleFloat = "left";
			else
				popupTitleTmp.style.cssFloat = "left";
			popupTitleTmp.style.height = "100%";
			popupTitleTmp.style.border = "0px solid black";
			popupTitleTmp.style.left ="0px";
			popupTitleTmp.style.top = "0px";
			//popupTitleTmp.style.background = "";
			
		popupTitleTable  = document.createElement("TABLE");
		//popupTitleTable.className = "TableTitleHeader";
		//popupTitleTable.height = popupTitleWidth+"px";
		popupTitleTBody  = document.createElement("TBODY");
		popupTitleTR  = document.createElement("TR");
		//	popupTitleTR.height = popupTitleWidth+"px";
		popupTitleTD  = document.createElement("TD");
			popupTitleTD.style.height = popupAreaHeaderHeight+"px";
			popupTitleTD.className = "TdTitleHeader";
			popupTitleTD.id = "TdTitleHeader_"+iNumberPopup;
		popupTitleText  = document.createTextNode(_azTitle);	
		
		
		popupTitleTD.appendChild(popupTitleText);
		popupTitleTR.appendChild(popupTitleTD);
		popupTitleTBody.appendChild(popupTitleTR);
		popupTitleTable.appendChild(popupTitleTBody);
		popupTitleTmp.appendChild(popupTitleTable);
		
		
		//	popupTitleTmp.innerHTML = _azTitle;
		popupAreaHeader[iNumberPopup].appendChild(popupTitleTmp);
		if(!document.getElementById("popupTitle_"+iNumberPopup))
			PopupErrorList(7);
	}
	
	function CalculPopupPosition(ev){
		if(move)
		{
			var moveXtmp=GetCoordX(ev);
			var moveYtmp=GetCoordY(ev);
			var moveExpand =	popupFrame[actifPopup[iIndexActifPopup]];
			var diffX = moveXtmp - moveX;
			var diffY = moveYtmp - moveY;
			var popupLeftTmp = parseInt(moveExpand.style.left)+diffX;
			var popupTopTmp = parseInt(moveExpand.style.top)+diffY;

			if(popupLeftTmp>=0)
				moveExpand.style.left = popupLeftTmp+"px";
	
			if(popupTopTmp>=0)
				moveExpand.style.top = popupTopTmp+"px";
			
			moveX = moveXtmp;
			moveY = moveYtmp;
		}
	}

	function CalculPopupSize(ev){
		if(expand)
		{
			var expandXtmp=GetCoordX(ev);
			var expandYtmp=GetCoordY(ev);
			var popupExpand =	popupFrame[actifPopup[iIndexActifPopup]];
			var diffX = expandXtmp - expandX;
			var diffY = expandYtmp - expandY;
			var popupWidthTmp = parseInt(popupExpand.style.width)+diffX;
			var popupHeightTmp = parseInt(popupExpand.style.height)+diffY;
			
			if(popupWidthTmp<=popupWidthMin[actifPopup[iIndexActifPopup]] && popupHeightTmp<=popupHeightMin[actifPopup[iIndexActifPopup]])
			{
				//expand = false;
				if(parseInt(popupExpand.style.width)!=parseInt(popupWidthMin[actifPopup[iIndexActifPopup]]))
					popupExpand.style.width = popupWidthMin[actifPopup[iIndexActifPopup]]+"px";
				if(parseInt(popupExpand.style.height)!=parseInt(popupHeightMin[actifPopup[iIndexActifPopup]]))
					popupExpand.style.height = popupHeightMin[actifPopup[iIndexActifPopup]]+"px";
			}
			
			if(expand)
			{
				if(popupWidthTmp<=popupWidthMin[actifPopup[iIndexActifPopup]])
					popupExpand.style.width = popupWidthMin[actifPopup[iIndexActifPopup]]+"px";
				else
					popupExpand.style.width = popupWidthTmp+"px";
				if(popupHeightTmp<=popupHeightMin[actifPopup[iIndexActifPopup]])
					popupExpand.style.height = popupHeightMin[actifPopup[iIndexActifPopup]]+"px";
				else
					popupExpand.style.height = popupHeightTmp+"px";
				
				expandX = expandXtmp;
				expandY = expandYtmp;
			}
			
			popupWidth[actifPopup[iIndexActifPopup]] = parseInt(popupExpand.style.width);
			popupHeight[actifPopup[iIndexActifPopup]] = parseInt(popupExpand.style.height);
			popupAreaBodyHeight[actifPopup[iIndexActifPopup]] = parseInt(popupHeight[actifPopup[iIndexActifPopup]])-parseInt(popupAreaHeaderHeight)-parseInt(popupAreaFooterHeight);
			popupAreaBody[actifPopup[iIndexActifPopup]].style.height = popupAreaBodyHeight[actifPopup[iIndexActifPopup]]+"px";
			popupAreaBodyIFrame[actifPopup[iIndexActifPopup]].style.width = parseInt(popupWidth[actifPopup[iIndexActifPopup]])-2*iFrameMargin+"px";
			popupAreaBodyIFrame[actifPopup[iIndexActifPopup]].style.height = parseInt(popupAreaBodyHeight[actifPopup[iIndexActifPopup]])-2*iFrameMargin+"px";
			
		}
	}
	
	function ChangePopupPosition(_iIndexPopup,_XPos,_YPos,e){

		/*if(e == null)
		{
			popupX[_iIndexPopup] = parseInt(_XPos);
			popupY[_iIndexPopup] = parseInt(_YPos);
		}
		else
		{
			if(parseInt(GetCoordX(e))+parseInt(_XPos) > 0)
				popupX[_iIndexPopup] = parseInt(GetCoordX(e))+parseInt(_XPos);
			else
				popupX[_iIndexPopup] = 0;
			if(parseInt(GetCoordY(e))+parseInt(_YPos) > 0)
				popupY[_iIndexPopup] = parseInt(GetCoordY(e))+parseInt(_YPos);
			else
				popupY[_iIndexPopup] = 0;
		}*/
		/*popupFrame[iNumberPopup].style.left = popupX[_iIndexPopup]+"px";
		popupFrame[iNumberPopup].style.top = popupY[_iIndexPopup]+"px";*/
	/*	popupFrame[_iIndexPopup].style.left = popupX[_iIndexPopup]+"px";
		popupFrame[_iIndexPopup].style.top = popupY[_iIndexPopup]+"px";
	*/	
		
	}
		
	function CreateAreaBody(urlPopup){

		popupAreaBodyTmp = document.createElement("DIV");
			popupAreaBodyTmp.id = "popupAreaBody_"+iNumberPopup;
			popupAreaBodyTmp.style.width = popupWidth[iNumberPopup]+"px";
			popupAreaBodyHeight[iNumberPopup] = parseInt(popupHeight[iNumberPopup])-parseInt(popupAreaHeaderHeight)-parseInt(popupAreaFooterHeight);
			popupAreaBodyTmp.style.height = popupAreaBodyHeight[iNumberPopup]+"px";
			popupAreaBodyTmp.style.border = "0px solid black";
			popupAreaBodyTmp.style.left = "0px";
			popupAreaBodyTmp.style.top = "0px";
			//popupAreaBodyTmp.style.background = "";
		popupAreaBody[iNumberPopup] = popupAreaBodyTmp;
		
		popupAreaBodyIFrameTmp = document.createElement("IFRAME");
			popupAreaBodyIFrameTmp.style.margin = iFrameMargin+"px";
			popupAreaBodyIFrameTmp.className="IframeBody";
			popupAreaBodyIFrameTmp.style.width = parseInt(popupWidth[iNumberPopup])-2*iFrameMargin+"px";
			popupAreaBodyIFrameTmp.style.height = parseInt(popupAreaBodyHeight[iNumberPopup])-2*iFrameMargin+"px";
			popupAreaBodyIFrameTmp.name = "IFRAME_"+iNumberPopup;
			
			popupAreaBodyIFrameTmp.src = urlPopup;
			if(popupNav == "Microsoft Internet Explorer")
			{
					popupAreaBodyIFrameTmp.id = "iFrame_"+iNumberPopup;
					popupAreaBodyIFrameTmp.name = "iFrame_"+iNumberPopup;
			}
			popupAreaBodyIFrameTmp.frameBorder="NO"; 
			popupAreaBodyIFrameTmp.scrolling="auto"; 
		popupAreaBodyIFrame[iNumberPopup] = popupAreaBodyIFrameTmp;
		popupAreaBody[iNumberPopup].appendChild(popupAreaBodyIFrame[iNumberPopup]);
		
		popupFrame[iNumberPopup].appendChild(popupAreaBody[iNumberPopup]);
		if(!document.getElementById("popupAreaBody_"+iNumberPopup))
			PopupErrorList(6);
	}
	
	function CreateAreaFooter(){
		popupAreaFooterTmp = document.createElement("DIV");
			popupAreaFooterTmp.id = "popupAreaFooter_"+iNumberPopup;
			popupAreaFooterTmp.style.width = "100%";
			popupAreaFooterTmp.style.height = popupAreaFooterHeight+"px";
			popupAreaFooterTmp.style.border = "0px solid black";
			popupAreaFooterTmp.style.left = "0px";
			popupAreaFooterTmp.style.top = "0px";
			//popupAreaFooterTmp.style.background = "";
			popupAreaFooter[iNumberPopup] = popupAreaFooterTmp;
		popupFrame[iNumberPopup].appendChild(popupAreaFooter[iNumberPopup]);
		if(!document.getElementById("popupAreaFooter_"+iNumberPopup))
			PopupErrorList(5);
		
		var divElement = document.createElement("DIV");
		//divElement.style.background = "";
		if(isIE())
			divElement.style.styleFloat = "left";
		else
			divElement.style.cssFloat = "left";
		popupAreaFooter[iNumberPopup].appendChild(divElement);
	}
	
	function CreateAreaHeader(){
		popupAreaHeaderTmp = document.createElement("DIV");
			popupAreaHeaderTmp.id = "popupAreaHeader_"+iNumberPopup;
			if(isIE())
				popupAreaHeaderTmp.style.width = "102%";
			else
				popupAreaHeaderTmp.style.width = "100%";
			popupAreaHeaderTmp.style.height = popupAreaHeaderHeight+"px";
			popupAreaHeaderTmp.className = "HeaderDiv";
		//	popupAreaHeaderTmp.style.border = "0px solid black";
			popupAreaHeaderTmp.style.left = "0px";
			popupAreaHeaderTmp.style.top = "0px";
			//popupAreaHeaderTmp.style.background = "";
			popupAreaHeader[iNumberPopup] = popupAreaHeaderTmp;
		
		if(GetPopupMode() == 1)
		{
			popupAreaHeaderTmp.onmousedown = function (event){
																		if(!move && !block && !extendBlock)
																		{
																			
																			move=true;
																			moveX=GetCoordX(event);
																			moveY=GetCoordY(event);
																			var moveDiv = document.createElement("DIV");
																			moveDiv.style.position = "absolute";
																			moveDiv.id = "moveDiv";
																			moveDiv.style.width = "100%";
																			moveDiv.style.height = "100%";
																			moveDiv.style.left = "0px";
																			moveDiv.style.top = "0px";
																			//moveDiv.style.background = "RED";
																			moveDiv.onmouseup = function (){
																															if(move)
																																move = false;
																															bodyElement.removeChild(document.getElementById("moveDiv"));
																															this.style.cursor='';
																														}
																			moveDiv.onmousemove = function (event){CalculPopupPosition(event)}
																			bodyElement.appendChild(moveDiv);
																		}
																	};	
		}
		popupFrame[iNumberPopup].appendChild(popupAreaHeader[iNumberPopup]);
		if(!document.getElementById("popupAreaHeader_"+iNumberPopup))
			PopupErrorList(4);
	}
	
	function CreatePopupArea(){
//
		popupAreaTmp = document.createElement("DIV");
			popupAreaTmp.style.display = "none";
			popupAreaTmp.id = "popupArea_"+[iNumberPopup];
			popupAreaTmp.style.position = "absolute";
			popupAreaTmp.style.width = "100%";
			popupAreaTmp.style.height = "100%";
			popupAreaTmp.style.border = "0px solid black";
			popupAreaTmp.style.left = "0px";
			popupAreaTmp.style.top = "0px";
			//popupAreaTmp.style.background = "";
		popupArea[iNumberPopup] = popupAreaTmp;
		bodyElement.appendChild(popupAreaTmp);
	//	if(!document.getElementById("popupArea_"+[iNumberPopup]))
	//		PopupErrorList(2);
	}
	
	function CreatePopupFrame(_iWidth,_iHeight){
		SetPopupWidth(_iWidth);
		SetPopupHeight(_iHeight);
		SetPopupPositionX(popupXDefault);
		SetPopupPositionY(popupYDefault);
	
		popupFrameTmp = document.createElement("DIV");
			popupFrameTmp.id = "popupFrame_"+iNumberPopup;
			popupFrameTmp.className = "FrameDiv";
			popupFrameTmp.style.position = "absolute";
			popupFrameTmp.style.width = popupWidth[iNumberPopup]+"px";
			popupFrameTmp.style.height = popupHeight[iNumberPopup]+"px";
			popupFrameTmp.style.left = popupX[iNumberPopup]+"px";
			popupFrameTmp.style.top = popupY[iNumberPopup]+"px";
			//popupFrameTmp.style.background = "#CCCCCC";
		popupFrame[iNumberPopup] = popupFrameTmp;
		popupArea[iNumberPopup].appendChild(popupFrame[iNumberPopup]);
		if(!document.getElementById("popupFrame_"+iNumberPopup))
			PopupErrorList(3);
	}
	
	function ExtendPopup(){
		if(GetPopupMode==1)
		{
			var imgElement = document.getElementById("extendPopup_"+actifPopup[iIndexActifPopup]);
			var frameElement = popupFrame[actifPopup[iIndexActifPopup]];
			var areaBodyElement = popupAreaBody[actifPopup[iIndexActifPopup]];
			
			if(imgElement.src.search(sqlWWWHome+srcImgDefault[2])>=0)
			{

				tmpHeight = parseInt(getHeight())-22; 
				tmpWidth = parseInt(getWidth())-25;
				
				imgElement.src = sqlWWWHome+srcImgDefault[4];
				frameElement.style.width=tmpWidth+"px";
				frameElement.style.height=tmpHeight+"px";
			
				areaBodyElement.style.height = parseInt(tmpHeight)-parseInt(popupAreaHeaderHeight)-parseInt(popupAreaFooterHeight)+"px";
				popupAreaBodyIFrame[actifPopup[iIndexActifPopup]].style.width = parseInt(tmpWidth)-2*iFrameMargin+"px";
				popupAreaBodyIFrame[actifPopup[iIndexActifPopup]].style.height = parseInt(areaBodyElement.style.height)-2*iFrameMargin+"px";
				frameElement.style.left="0px";
				frameElement.style.top="0px";
				extendBlock = true;
				
			}
			else if(imgElement.src.search(sqlWWWHome+srcImgDefault[4])>=0)
			{
				imgElement.src = sqlWWWHome+srcImgDefault[2];
				
				areaBodyElement.style.height = popupAreaBodyHeight[actifPopup[iIndexActifPopup]]+"px";
				frameElement.style.width=parseInt(popupWidth[actifPopup[iIndexActifPopup]])+"px";
				frameElement.style.height=parseInt(popupHeight[actifPopup[iIndexActifPopup]])+"px";
				
				popupAreaBodyIFrame[actifPopup[iIndexActifPopup]].style.width = parseInt(frameElement.style.width)-2*iFrameMargin+"px";
				popupAreaBodyIFrame[actifPopup[iIndexActifPopup]].style.height = parseInt(areaBodyElement.style.height)-2*iFrameMargin+"px";
				replacePopupScroll(actifPopup[iIndexActifPopup]);
					
				extendBlock = false;
			}		
		}
	}

	function GetBody(){
		if(document.getElementsByTagName("BODY")[0])
			bodyElement = document.getElementsByTagName("BODY")[0];	
		if( bodyElement == null)
			PopupErrorList(1);
	}
	
	function GetCoordX(e){
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

	function GetCoordY(e){
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
	
	function getIndexActifPopup(){
		return iIndexActifPopup;
	}
	
	function getSQLWWWHOME(){
		return sqlWWWHome;
	}
	
	function HiddePopup(iClear)
	{
			if(popupArea[actifPopup[iIndexActifPopup]].style.display == "block")
			{
				if(GetPopupMode() == 1)
				{
					var imgElement = document.getElementById("extendPopup_"+actifPopup[iIndexActifPopup]);
					if(imgElement.src.search(sqlWWWHome+srcImgDefault[4])>=0)
							ExtendPopup();
				}
				
				if(parseInt(iClear) == 1)
					popupAreaBodyIFrame[actifPopup[iIndexActifPopup]].src = "about:blank";
				popupArea[actifPopup[iIndexActifPopup]].style.display = "none";
				actifPopup[iIndexActifPopup] = -1;
				iIndexActifPopup--;
			}
	}
	
	function HidePopup()
	{
			HiddePopup(1);
	}
	
	function ImageOnClick(iChoice){
		switch(parseInt(iChoice))
		{
			case 1 : break;
			case 2 : ExtendPopup();break;
			case 3 : HiddePopup();break;
			}	
	}
	
	function isIE(){
		if (navigator.appName=="Microsoft Internet Explorer")
			return true;
		else
			return false;
	}
	
	function PopupCreate(_WidthPopup,_iHeight,_azTitle,_azUrlPopup){
		var tmpHeight = 0;
		var tmpWidth = 0;
		GetBody();
		AddPopup();
		CreatePopupArea();
		if( GetPopupMode() == 1)
		{
			tmpHeight = _iHeight;
			tmpWidth = _WidthPopup;
		}
		else
		{
			tmpHeight = parseInt(getHeight())-22; 
			tmpWidth = parseInt(getWidth())-25;
		}
		CreatePopupFrame(tmpWidth,tmpHeight);
		CreateAreaHeader();
		AddTitle(_azTitle);
		AddButtonHeader();
		CreateAreaBody(_azUrlPopup);
		CreateAreaFooter();
		if(GetPopupMode() == 1)
			AddExpandButton();
		return iNumberPopup;

	}
	
	function PopupErrorList(iNumber){
			var errorText = "";
			switch(parseInt(iNumber))
			{
				case 1 :
					errorText = "bodyElement is null.\nCheck function GetBody()";
					break;
				case 2 :
					errorText = "popupArea unexists.\nCheck function CreatePopupArea()";
					break;
				case 3 :
					errorText = "popupFrame unexists.\nCheck function CreatePopupFrame()";
					break;
				case 4 :
					errorText = "popupAreaHeader unexists.\nCheck function CreateAreaHeader()";
					break;
				case 5 :
					errorText = "popupAreaFooter unexists.\nCheck function CreateAreaFooter()";
					break;
				case 6 :
					errorText = "popupAreaBody unexists.\nCheck function CreateAreaBody()";
					break;
				case 7 :
					errorText = "popupTitle unexists.\nCheck function AddTitle()";
					break;
			}
			alert("Error "+iNumber+"\n"+errorText);
			exit();
	}
	function SetOptionButton2(_iIndexPopup,_azButtonName,_azButtonNewName,_azButtonFunction,_isVisible,_isDisabled)
	{
		SetOptionButton(_iIndexPopup,_azButtonName,_azButtonFunction,_isVisible,_isDisabled);
		if(_azButtonNewName != "")
		{
			var buttonElement = document.getElementById(_azButtonName+"_"+_iIndexPopup);
			buttonElement.id = _azButtonNewName+"_"+_iIndexPopup;
			buttonElement.value = _azButtonNewName;
			
		}
	}
	
	function SetOptionButton(_iIndexPopup,_azButtonName,_azButtonFunction,_isVisible,_isDisabled){
		
		var buttonElement = document.getElementById(_azButtonName+"_"+_iIndexPopup);
		if(_azButtonFunction!="")
			buttonElement.onclick = function (){
					var iFrame =  popupAreaBodyIFrame[_iIndexPopup].contentWindow || popupAreaBodyIFrame[_iIndexPopup];
					eval("iFrame."+_azButtonFunction);
				 };
		if(_isVisible==HideButton)
		{
			buttonElement.style.display="none";
			buttonElement.disabled=true;
		}
		else
		{
			buttonElement.style.display="";
			if(_isDisabled==DisabledButton)
				buttonElement.disabled=true;
			else
				buttonElement.disabled=false;
		}
	}
	
	function SetPopupHeight(_Height){
		if(_Height == null || parseInt(_Height) == -1)
			popupHeightTmp = popupHeightDefault;
		else
			popupHeightTmp = _Height;
		popupHeight[iNumberPopup] = popupHeightTmp;	
		popupHeightMin[iNumberPopup] = popupHeightTmp;
	}
	
	function SetPopupWidth(_Width){
		if(_Width == null || parseInt(_Width) == -1)
			popupWidthTmp = popupWidthDefault;
		else
			popupWidthTmp = _Width;
		popupWidth[iNumberPopup] = popupWidthTmp;
		popupWidthMin[iNumberPopup] = popupWidthTmp;
	}
	
	function SetPopupPositionX(_XPos){
		popupX[iNumberPopup] = _XPos;
	}
	function SetPopupPositionY(_YPos){
		popupY[iNumberPopup] = _YPos;
	}
	
	function setSQLWWWHOME(_SQLWWWHOME){
		sqlWWWHome = _SQLWWWHOME;
	}
	
	function SetTitleHeader(_iIndexPopup,_azTitle){
		var _TdTitle = document.getElementById("TdTitleHeader_"+_iIndexPopup);
		_TdTitle.firstChild.nodeValue = _azTitle;
	}
	
	
	function replacePopupScroll(_iIndice)
	{
		if(parent.parent.parent.document)
			var scrollY = parent.document.documentElement.scrollTop;
		else
			var scrollY = document.documentElement.scrollTop;
		
		popupArea[_iIndice].style.left = "0px";
		popupArea[_iIndice].style.top = parseInt(scrollY)+"px";

		var widthIFrame = getWidth();
		var heightIFrame = getHeight();	

		popupFrame[_iIndice].style.left = parseInt((parseInt(widthIFrame)-parseInt(popupFrame[_iIndice].style.width))/2)+"px";
			
		if(parseInt(popupFrame[_iIndice].style.height)>heightIFrame )
		{
			popupFrame[_iIndice].style.top = "2px";
		}
		else
		{
			popupFrame[_iIndice].style.top = parseInt((parseInt(heightIFrame )-parseInt(popupFrame[_iIndice].style.height))/2)+"px";
		}
	}
	
	function ViewPopup(_iIndice,_iFrameUrl,_iFrameVar){
		if(popupArea[_iIndice].style.display == "none")
			{
				/**/
				replacePopupScroll(_iIndice);	
				iIndexActifPopup++;
				actifPopup[iIndexActifPopup] = _iIndice;
				if(_iFrameUrl != "")
				{
						if(_iFrameVar != "")
						popupAreaBodyIFrame[_iIndice].src = _iFrameUrl+"&"+_iFrameVar;
					else
						popupAreaBodyIFrame[_iIndice].src = _iFrameUrl;
				}
				
				
				
				popupArea[_iIndice].style.display = "block";
				

				
			}
	}

	function execPopupFunction(_azIndexPopup,_azFunction)
	{
			var res = null;
			_iIndexPopup = parseInt(_azIndexPopup);
			var iFrame =  popupAreaBodyIFrame[_iIndexPopup].contentWindow || popupAreaBodyIFrame[_iIndexPopup];
				//eval("iFrame."+_azFunction);
			res = eval("res = iFrame."+_azFunction);	
			if(res != null)
				return res;
	}
	
	
	

	document.onscroll = function (event){
		if(iIndexActifPopup>-1)
		{
			var _iIndexPopup = actifPopup[iIndexActifPopup];
			if(popupArea[_iIndexPopup].style.display == "block")
			{
				var scrollY = document.documentElement.scrollTop;
					popupArea[_iIndexPopup].style.left = "0px";
					popupArea[_iIndexPopup].style.top = parseInt(scrollY)+"px";
			}
		}
		
	}
	
	
	
//var isIE= navigator.appName == "Microsoft Internet Explorer"; /* IE */
//var isNS= navigator.appName == "Netscape"; /* Netscape, Mozilla Firefox */

function getWidth(){
	var obj = null;
	if(parent.parent.document.getElementById("site"))
		obj = parent.parent.document.getElementById("site");
	else if(parent.document.getElementById("site"))
		obj = parent.document.getElementById("site");
	else
		obj =document.documentElement;
	if ( isIE )
    return obj.scrollWidth;
 else
 	return obj.offsetWidth;
 }
 
function getHeight(){
	var obj = null;
	if(parent.parent.document.getElementById("site"))
		obj = parent.parent.document.getElementById("site");
	else if(parent.document.getElementById("site"))
		obj = parent.document.getElementById("site");
	else
		obj =document.documentElement;
	if ( isIE )
    return obj.scrollHeight;
 else
 	return obj.offsetHeight
 }
 
 //parent.document.getElementById("site")

