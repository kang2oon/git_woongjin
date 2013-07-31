// GNB Menu
function fnTopMenu1_Type1() {
	this.menu = new Array();
	this.menuseq = 0;
	
	this.Start = function() {
		this.MenuBox = document.getElementById(this.DivName).getElementsByTagName("ul")[0].childNodes;
		
		// 메뉴의 갯수를 파악하는 부분
		this.MenuLength = this.MenuBox.length;
		
		// 메뉴의 1뎁스 링크부분에 마우스나 키보드의 반응을 넣는 부분
		for ( var i=0; i<this.MenuLength; i++ ) {
			if ( this.MenuBox.item(i).tagName != "LI" ) { continue; }
			this.MenuLink = this.MenuBox.item(i).getElementsByTagName("a")[0];
			this.MenuLink.i = i;
			this.MenuLink.fnName = this.fnName;
			this.MenuLink.onmouseover = this.MenuLink.onfocus = function()	{ eval(this.fnName +".fnMouseOver(" + this.i + ")") }

			this.MenuSubBox = this.MenuBox.item(i).getElementsByTagName("div")[0];
			this.MenuSubMenu = this.MenuSubBox.getElementsByTagName("ul")[0].getElementsByTagName("li");
			this.MenuSubMenuLength = this.MenuSubMenu.length;
			
			// 메뉴의 2뎁스 링크부분에 마우스나 키보드의 반응을 넣는 부분
			for ( var j=0; j<this.MenuSubMenuLength; j++ ) {
				this.MenuSubLink = this.MenuSubMenu.item(j).getElementsByTagName("a")[0];
				this.MenuSubLink.i = i;
				this.MenuSubLink.j = j;
				this.MenuSubLink.fnName = this.fnName;
				this.MenuSubLink.onmouseover = this.MenuSubLink.onfocus = function()		{ eval(this.fnName +".fnMouseSubOver(" + this.i + "," + this.j + ")") }
				this.MenuSubLink.onmouseout = this.MenuSubLink.onblur = function()		{ eval(this.fnName +".fnMouseSubOut(" + this.i + "," + this.j + ")") }
			}
			
			this.MenuSubBox.style.display = "none";
			
			this.menuseq++;
			this.menu[this.menuseq] = i
		}
		
		if ( this.DefaultMenu != 0 ) {
			this.fnMouseOver(this.menu[this.DefaultMenu]);
			if ( this.DefaultSubMenu != 0 ) {
				this.fnMouseSubOver(this.menu[this.DefaultMenu],this.DefaultSubMenu - 1);
			}
		}
	}
	
	// 메뉴의 1뎁스 링크부분에 마우스나 키보드의 반응에 의해 실행하는 부분
	this.fnMouseOver = function(val) {
		for ( var i=0; i<this.MenuLength; i++ ) {
			if ( this.MenuBox.item(i).tagName != "LI" ) { continue; }
			this.MenuImg = this.MenuBox.item(i).getElementsByTagName("a")[0].getElementsByTagName("img")[0];
			this.MenuSDiv = this.MenuBox.item(i).getElementsByTagName("div")[0];
			if ( i == val ) {
				this.MenuImg.src = this.MenuImg.src.replace("_n.gif","_o.gif");
				this.MenuSDiv.style.display = "block";
			} else {
				this.MenuImg.src = this.MenuImg.src.replace("_o.gif","_n.gif");
				this.MenuSDiv.style.display = "none";
			}
		}
	}
	
	// 메뉴의 2뎁스 링크부분에 마우스나 키보드의 반응에 의해 실행하는 부분
	this.fnMouseSubOver = function(mnum,snum) {
		this.SubMenuImg = this.MenuBox.item(mnum).getElementsByTagName("div")[0].getElementsByTagName("ul")[0].getElementsByTagName("li")[snum].getElementsByTagName("a")[0].getElementsByTagName("img")[0];
		this.SubMenuImg.src = this.SubMenuImg.src.replace("_n.gif","_o.gif");
	}
	this.fnMouseSubOut = function(mnum,snum) {
		this.SubMenuImg = this.MenuBox.item(mnum).getElementsByTagName("div")[0].getElementsByTagName("ul")[0].getElementsByTagName("li")[snum].getElementsByTagName("a")[0].getElementsByTagName("img")[0];
		this.SubMenuImg.src = this.SubMenuImg.src.replace("_o.gif","_n.gif");
	}
	
}

// Family Site
function fnLinkSite_Type1() {
	
	this.Start = function() {
		
		this.copyright = document.getElementById(this.DivName).getElementsByTagName("dl")[0];
		this.MainLink = this.copyright.getElementsByTagName("dt")[0].getElementsByTagName("a")[0];
		this.SubMenuBox = this.copyright.getElementsByTagName("dd")[0];
		
		this.MainLink.fnName = this.fnName;
		
		// 관련사이트 메뉴의 클릭에 반응 하는 부분
		this.MainLink.onclick = function()	{ eval( this.fnName +".fnMouseOver(0,this)") }
		// 관련사이트 메뉴의 MouseOut시 발생하는 부분
		this.MainLink.onmouseout = function()	{ eval( this.fnName +".fnMouseOut(0,this)") }
		;
		// 관련사이트 서브메뉴의 박스 부분에 마우스나 키보드의 반응을 넣는 부분
		this.SubMenuBox.style.display = "none";
		this.SubMenuBox.fnName = this.fnName;
		this.SubMenuBox.onmouseover = this.SubMenuBox.onfocus = function()	{ eval( this.fnName +".fnMouseOver(1,this)") }
		this.SubMenuBox.onmouseout = this.SubMenuBox.onblur = function()	{ eval( this.fnName +".fnMouseOut(1,this)") }
		this.SubMenuList = this.SubMenuBox.getElementsByTagName("ul")[0].getElementsByTagName("li");
		this.SubMenuListTotal = this.SubMenuList.length;
		
		// 관련사이트 서브메뉴의 링크 부분에 마우스나 키보드의 반응을 넣는 부분
		for ( var i=0; i<this.SubMenuListTotal; i++ ) {
			this.SubLink = this.SubMenuList.item(i).getElementsByTagName("a")[0];
			this.SubLink.i = i;
			this.SubLink.fnName = this.fnName;
			this.SubLink.onmouseover = this.SubLink.onfocus = function()		{ eval( this.fnName +".fnSubMouseOver("+this.i+")") }
			this.SubLink.onmouseout = this.SubLink.onblur = function()		{ eval( this.fnName +".fnSubMouseOut("+this.i+")") }
		}
	}
	
	// 관련사이트 메뉴의 마우스나 키보드의 반응에 의해 실행하는 부분
	this.fnMouseOver = function(num,val) {
		if ( num == 0 ) {
			this.MainMenuImg = val.getElementsByTagName("img")[0];
		} else if ( num == 1 ) {
			this.MainMenuImg = this.MainLink.getElementsByTagName("img")[0];
		}
		this.SubMenuBox.style.display = "block";
		this.MainMenuImg.src = this.MainMenuImg.src.replace("_off.gif","_on.gif");
	}
	
	this.fnMouseOut = function(num,val) {
		if ( num == 0 ) {
			this.MainMenuImg = val.getElementsByTagName("img")[0];
		} else if ( num == 1 ) {
			this.MainMenuImg = this.MainLink.getElementsByTagName("img")[0];
		}
		this.SubMenuBox.style.display = "none";
		this.MainMenuImg.src = this.MainMenuImg.src.replace("_on.gif","_off.gif");
	}
	
	// 관련사이트 서브메뉴의 링크 부분에 마우스나 키보드에 의해 실행하는 부분
	this.fnSubMouseOver = function(val) {
		for ( var i=0; i<this.SubMenuListTotal; i++ ) {
			this.MenuImg = this.SubMenuList.item(i).getElementsByTagName("a")[0].getElementsByTagName("img")[0];
			if ( i == val ) {
				this.MenuImg.src = this.MenuImg.src.replace("_off.gif","_on.gif");
			} else {
				this.MenuImg.src = this.MenuImg.src.replace("_on.gif","_off.gif");
			}
		}
	}
	
	// 관련사이트 서브메뉴에서 포커스를 벗어날 때
	this.fnSubMouseOut = function(val) {
		
		if(isShiftDown)
			return;

		if(val == this.SubMenuListTotal - 1){

			this.SubMenuBox.style.display = "none";
			this.MainMenuImg.src = this.MainMenuImg.src.replace("_on.gif","_off.gif");
		
			for ( var i=0; i<this.SubMenuListTotal; i++ ) {
				this.MenuImg = this.SubMenuList.item(i).getElementsByTagName("a")[0].getElementsByTagName("img")[0];
				if ( i == val ) {
					this.MenuImg.src = this.MenuImg.src.replace("_off.gif","_on.gif");
				} else {
					this.MenuImg.src = this.MenuImg.src.replace("_on.gif","_off.gif");
				}
			}
		}
	}
}