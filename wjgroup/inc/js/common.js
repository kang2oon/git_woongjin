function toggle_visibility(id) {
	var e = document.getElementById(id);
	if(e.style.display == 'block')
		e.style.display = 'none';
	else
		e.style.display = 'block';
}

function show(id) {
	if (document.getElementById(id).style.display == 'none') {
		document.getElementById(id).style.display = 'block';  
	 }  
}
function hide(id) {
	document.getElementById(id).style.display = 'none';  
}

function open_window(url,intWidth,intHeight) { 
      window.open(url, "_blank", "width="+intWidth+",height="+intHeight+",resizable=no,scrollbars=no, menubar=no, toolbar=no, status=no, location=no, directories=no") ; 
}