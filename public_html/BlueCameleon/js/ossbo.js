var xhr = null;
var xmlreqs = new Array();
var iossPopupLock = 0;

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

function updateObject(id)
{
	// On ne fait quelque chose que si on a tout reçu et que le serveur est ok
	if(xhr.readyState == 4 && xhr.status == 200)
	{
		var leselect = xhr.responseText;
		var divId = document.getElementById(id);
		// On se sert de innerHTML pour rajouter les options a la liste
		divId.innerHTML = leselect;
		// alert(leselect); 
		var x = divId.getElementsByTagName("script");
		for(var i=0;i<x.length;i++)
		{
			eval(x[i].text);
		}
	}
}

function CXMLReq(freed)
{
	this.freed = freed;
	this.xmlhttp = false;
	if (window.XMLHttpRequest)
	{
		this.xmlhttp = new XMLHttpRequest();
	}
	else if (window.ActiveXObject)
	{
		// Internet Explorer 
		try 
		{
			this.xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e) 
		{
			this.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	else 
	{
		// XMLHttpRequest non supporté par le navigateur 
		alert("Votre navigateur ne supporte pas les objets XMLHTTPRequest..."); 
	}
}

function xmlreqGET(elId,url)
{
	var pos = -1;
	for (var i=0; i<xmlreqs.length; i++)
	{
		if (xmlreqs[i].freed == 1)
		{
			pos = i;
			break;
		}
	}
	if (pos == -1)
	{
		pos = xmlreqs.length;
		xmlreqs[pos] = new CXMLReq(1);
	}
	if (xmlreqs[pos].xmlhttp)
	{
		xmlreqs[pos].freed = 0;
		xmlreqs[pos].xmlhttp.open("GET",url,true);
		xmlreqs[pos].xmlhttp.onreadystatechange = function() { xmlhttpChange(elId,pos); }
		if (window.XMLHttpRequest)
		{
			xmlreqs[pos].xmlhttp.send(null);
		}
		else if (window.ActiveXObject)
		{
			xmlreqs[pos].xmlhttp.send();
		}
	}
}

function xmlreqPOST(elId,url,data)
{
	var pos = -1;
	for (var i=0; i<xmlreqs.length; i++)
	{
		if (xmlreqs[i].freed == 1)
		{
			pos = i;
			break;
		}
	}
	if (pos == -1)
	{
		pos = xmlreqs.length;
		xmlreqs[pos] = new CXMLReq(1);
	}
	if (xmlreqs[pos].xmlhttp)
	{
		xmlreqs[pos].freed = 0;
		xmlreqs[pos].xmlhttp.open("POST",url,false);
		xmlreqs[pos].xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xmlreqs[pos].xmlhttp.onreadystatechange = function() { xmlhttpChange(elId,pos); }
		xmlreqs[pos].xmlhttp.send(data);
		if (navigator.appName!="Microsoft Internet Explorer")
		{
			xmlhttpChange(elId,pos);
		}
	}
}

function xmlhttpChange(elId,pos)
{
	if (typeof(xmlreqs[pos]) != 'undefined' && xmlreqs[pos].freed == 0 && xmlreqs[pos].xmlhttp.readyState == 4)
	{
		if (xmlreqs[pos].xmlhttp.status == 200 || xmlreqs[pos].xmlhttp.status == 304)
		{
			var el = document.getElementById(elId);
			el.innerHTML = xmlreqs[pos].xmlhttp.responseText;
			var x = el.getElementsByTagName("script");
			for(var i=0;i<x.length;i++)
			{
				eval(x[i].text);
			}
		}
		else
		{
			handle_error(xmlreqs[pos].xmlhttp.status);
		}
		xmlreqs[pos].freed = 1;
	}
}

function handle_error(stat)
{
	console.log('bad status from ajax request '+stat);
}

function AjaxLoad(result_div,post_url,post_data,success_func,final_func)
{
	// load result into div
	$.ajax({
		type: "post",
		url: post_url,
		data: post_data,
		dataType: "html",
		cache: false,
		// async: false,
		// set timeout to 900 secs (=15min)
		timeout: 900000,
		error: function(xhr, textStatus, errorThrown )
		{
			alert("Error: " + xhr.status);
			alert("Error: " + textStatus);
		},
		success: function(data, textStatus, xhr)
		{
			// call eventual function
			if (success_func != null && data.toString().trim().length > 0)
				success_func($(data));
			if (result_div != null)
			{
				// show result in div
				$("#" + result_div).html($(data));
				// $("#" + result_div).show();
			}
			if (final_func != null)
				final_func();
		},
		complete: function()
		{
			if ($.isFunction(window.hide_loader))
				hide_loader();
		}
	});
	// show loader
	if ($.isFunction(window.show_loader))
		show_loader();
}

function trim(aString) {
	var regExpBeginning = /^\s+/;
	var regExpEnd       = /\s+$/;
	return aString.replace(regExpBeginning, "").replace(regExpEnd, "");
}

function SelectOption(list, val)
{
	var i;
	for (i = 0; i < list.length; i++)
		if (list.options[i].value == val)
			list.options[i].selected = true;
}

function SortSelectList(idList)
{
	var selIndex = $('#'+idList).get(0).selectedIndex;
	$('#'+idList).html($('#'+idList+' option').sort(function(x, y) {
		if ($(x).hasClass('OssOptionNoSort'))
			return -1;
		return $(x).text() < $(y).text() ? -1 : 1;
	}));
	$('#'+idList).get(0).selectedIndex = selIndex;
}

function SetDataDivHeight(id, offset)
{
	if(parent.document.getElementsByTagName("IFRAME")[0])
	{
		var divh = parseInt(parent.document.getElementsByTagName("IFRAME")[0].offsetHeight);
		if (divh>parseInt(offset)+100)
		{
			var target = document.getElementById(id);
			target.style.height = ( divh - parseInt(offset) ) + "px";
		}
	}
}

function ChecklIntInputValue(idInput, iMinValue, iMaxValue)
{
	var iValue = parseInt($('#'+idInput).val());
	if (iMinValue != null && iValue < iMinValue )
		$('#'+idInput).val(iMinValue);
	else if (iMaxValue != null && iValue > iMaxValue )
		$('#'+idInput).val(iMaxValue);
}

function OpenPopup(_IndexPopup,url,title)
{
	if (iossPopupLock>0)
		setTimeout("OpenPopup("+_IndexPopup+",'"+url+"','"+title+"')", 100);
	else
	{
		SetTitleHeader(_IndexPopup,title);
		ViewPopup(_IndexPopup,url,'');
	}
}

function PopupLock(_IndexPopup)
{
	iossPopupLock++;
}
	
function PopupUnlock(_IndexPopup)
{
	if (iossPopupLock>0)
		iossPopupLock--;
}
	
function SetElementFocus(id)
{
	var el=document.getElementById(id);
	if (el != null)
		el.focus();
}

function SetElementText(sId, sText)
{
	var el;
	if (document.getElementById && (el = document.getElementById(sId)))
	{
		while (el.hasChildNodes())
			el.removeChild(el.lastChild);
		el.appendChild(document.createTextNode(sText));
	}
}

function SelectElementText(id)
{
	var el=document.getElementById(id);
	if (el != null)
		el.select();
}

function RemoveElement(id)
{
	var t = document.getElementById(id);
	t.parentNode.removeChild(t);
}

function SetElementDate(id, year, month, day)
{
	if (year>0 && month>0 && day>0)
		var azDate=$.datepicker.formatDate('dd/mm/yy', new Date(year,month-1,day) );
	else
		var azDate='---';
	$('#'+id).text(azDate);
}

function SetFormDate(idDate, year, month, day, idFormYear, idFormMonth, idFormDay)
{
	SetElementDate(idDate,year,month,day);
	$('#'+idFormYear).val(year);
	$('#'+idFormMonth).val(month);
	$('#'+idFormDay).val(day);
}

function AddSelectOption(id, text, value, isSelected) 
{
	var selectObj = document.getElementById(id);
	if (selectObj != null && selectObj.options != null)
	{
		selectObj.options[selectObj.options.length] = new Option(text, value, false, isSelected);
	}
}

function CheckBoxListToggle(f, refbox, togglebox)
{
	var status=refbox.checked;
	var tblen=togglebox.length;
	var felemlen=f.elements.length;
	var e=0;
	for (var i=0; i<felemlen; i++)
	{
		e=f.elements[i];
		if (e.name.substring(0,tblen) == togglebox && e.type == 'checkbox' && e.checked != status)
		{
			// e.checked=status;
			// simulate a click
			e.click();
		}
	}
}

function GetInputCharacterCode(e)
{
	// e is event object passed from function invocation
	var characterCode;

	// if which property of event object is supported (NN4)
	if (e && e.which)
	{
		e = e;
		// character code is contained in NN4's which property
		characterCode = e.which;
	}
	else
	{							
		e = event;
		// character code is contained in IE's keyCode property
		characterCode = e.keyCode;
	}
	return characterCode;
}

function jqGetNextSibling(item, sel)
{
	var nextItem = item.next();
	// test if found
	while (nextItem.length > 0 && !nextItem.is(sel))
		nextItem = nextItem.next();
	if (nextItem.length > 0)
		return nextItem;
	else
		return null;
}

function jqGetPrevSibling(item, sel)
{
	var prevItem = item.prev();
	// test if found
	while (prevItem.length > 0 && !prevItem.is(sel))
		prevItem = prevItem.prev();
	if (prevItem.length > 0)
		return prevItem;
	else
		return null;
}

function SecureCheckboxOnSubmit(f)
{
	f.find('input[type="checkbox"]').each( function ()
	{
		var checkboxItem = $(this);

		if( checkboxItem.is(":checked") != true ) {
			// add a hidden element with value 0
			f.append('<input type="hidden" name="'+checkboxItem.attr('name')+'" value="0" />');
		}
	})
}
