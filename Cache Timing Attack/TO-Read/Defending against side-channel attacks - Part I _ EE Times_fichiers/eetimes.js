
function ToggleNavButtonMenu(inButtonName, inOnOrOff) {
	var menuName = inButtonName + '_popmenu';
	if (inOnOrOff == 'on') {
		PopMenu(menuName,(returnPosXofObj(GetObject(inButtonName)) - 1),(returnPosYofObj(GetObject(inButtonName)) + 22));
		lockPoppedMenu = true;
		lockedPoppedMenuObjName = inButtonName + '_popmenu';
		ToggleNavButton(inButtonName,'on');
	} else {
		lockPoppedMenu = false;
		lockedPoppedMenuObjName = '';
		PopMenuOff(menuName, -500, 38);
		ToggleNavButton(inButtonName,'off');
	}
}

function ToggleNavButton(inButtonName, inOnOrOff) {
	if (inOnOrOff == 'on') {
		$('#' + inButtonName).removeClass('navbuttonouteroff red');
		$('#' + inButtonName).addClass('navbuttonouteron black');
		if (inButtonName == 'nav_home') {
			$('#' + inButtonName).css('border-left','1px solid #bababa');
			$('#' + inButtonName).css('padding-left','4px');
		}
	} else {
		$('#' + inButtonName).removeClass('navbuttonouteron black');
		$('#' + inButtonName).addClass('navbuttonouteroff red');
		if (inButtonName == 'nav_home') {
			$('#' + inButtonName).css('border-left','');
			$('#' + inButtonName).css('padding-left','5px');
		}
	}
}

var designlinesSliderHandler = new LRSliderHandler();

designlinesSliderHandler.thisSliderElementName = 'designlinesSliderHandler';
designlinesSliderHandler.sliderElementCount = 2;
designlinesSliderHandler.sliderElementSize = 798;
designlinesSliderHandler.sliderObjectViewsize = 1;
designlinesSliderHandler.sliderRightLimit = designlinesSliderHandler.sliderElementSize * ((designlinesSliderHandler.sliderElementCount - designlinesSliderHandler.sliderObjectViewsize) * -1) + 1;
designlinesSliderHandler.currentSliderElement = 1;
designlinesSliderHandler.sliderObjectId = 'designlines_outside';
designlinesSliderHandler.sliderDoSlide = false;

var designlinesLeftArrowButtonMouseoutImgSrc = 'http://img.deusm.com/eetimes/eetimes_designlines_arrow_dark_left.gif';
var designlinesRightArrowButtonMouseoutImgSrc = 'http://img.deusm.com/eetimes/eetimes_designlines_arrow_light_right.gif';

designlinesSliderHandler.LRSliderNavGraphicsHandlerSlideLeft = function() {
	// change the input box value
	//GetObject('designlines_navform_selector').value = this.currentSliderElement;
	// now deal with the images
	
	var currentImage = GetObject('designlines_rightarrowbutton');
	// if we're at currentSliderElement < sliderElementCount make sure the right button is active
	if (this.currentSliderElement < this.sliderElementCount) { 
		currentImage.src = 'http://img.deusm.com/eetimes/eetimes_designlines_arrow_light_right.gif';
	} else {
		currentImage.src = 'http://img.deusm.com/eetimes/eetimes_designlines_arrow_dark_right.gif';
	}
	designlinesRightArrowButtonMouseoutImgSrc = currentImage.src;

	// if sliding left, change when currentSliderElement gets to 1
	currentImage = GetObject('designlines_leftarrowbutton');
	if (this.currentSliderElement == 1) { 
		currentImage.src = 'http://img.deusm.com/eetimes/eetimes_designlines_arrow_dark_left.gif';
	} else {
		currentImage.src = 'http://img.deusm.com/eetimes/eetimes_designlines_arrow_light_left.gif';
	}
	designlinesLeftArrowButtonMouseoutImgSrc = currentImage.src;
	
}

designlinesSliderHandler.LRSliderNavGraphicsHandlerSlideRight = function() {
	// change the input box value
	//GetObject('designlines_navform_selector').value = this.currentSliderElement;
	// now deal with the images
	
	var currentImage = GetObject('designlines_leftarrowbutton');
	// if we're at currentSliderElement > 1 make sure the left button is active
	if (this.currentSliderElement > 1) { 
		currentImage.src = 'http://img.deusm.com/eetimes/eetimes_designlines_arrow_light_left.gif';
	} else {
		currentImage.src = 'http://img.deusm.com/eetimes/eetimes_designlines_arrow_dark_left.gif';
	}
	designlinesLeftArrowButtonMouseoutImgSrc = currentImage.src;
	
	currentImage = GetObject('designlines_rightarrowbutton');
	// sliding right, change when currentSliderElement gets to this.sliderElementCount
	if (this.currentSliderElement == this.sliderElementCount) {
		currentImage.src = 'http://img.deusm.com/eetimes/eetimes_designlines_arrow_dark_right.gif';
	} else {
		currentImage.src = 'http://img.deusm.com/eetimes/eetimes_designlines_arrow_light_right.gif';
	}
	designlinesRightArrowButtonMouseoutImgSrc = currentImage.src;
}



var launchpadSliderHandler = new LRSliderHandler();

launchpadSliderHandler.thisSliderElementName = 'launchpadSliderHandler';
launchpadSliderHandler.sliderElementCount = 2;
launchpadSliderHandler.sliderElementSize = 829;
launchpadSliderHandler.sliderObjectViewsize = 1;
launchpadSliderHandler.sliderRightLimit = launchpadSliderHandler.sliderElementSize * ((launchpadSliderHandler.sliderElementCount - launchpadSliderHandler.sliderObjectViewsize) * -1) + 1;
launchpadSliderHandler.currentSliderElement = 1;
launchpadSliderHandler.sliderObjectId = 'launchpad_outside';
launchpadSliderHandler.sliderDoSlide = false;

var launchpadLeftArrowButtonMouseoutImgSrc = 'http://img.deusm.com/eetimes/launchpad_left_on.gif';
var launchpadRightArrowButtonMouseoutImgSrc = 'http://img.deusm.com/eetimes/launchpad_right_off.gif';

launchpadSliderHandler.LRSliderNavGraphicsHandlerSlideLeft = function() {
	// change the input box value
	//GetObject('launchpad_navform_selector').value = this.currentSliderElement;
	// now deal with the images
	
	var currentImage = GetObject('launchpad_rightarrowbutton');
	// if we're at currentSliderElement < sliderElementCount make sure the right button is active
	if (this.currentSliderElement < this.sliderElementCount) { 
		currentImage.src = 'http://img.deusm.com/eetimes/launchpad_right_on.gif';
	} else {
		currentImage.src = 'http://img.deusm.com/eetimes/launchpad_right_off.gif';
	}
	launchpadRightArrowButtonMouseoutImgSrc = currentImage.src;

	// if sliding left, change when currentSliderElement gets to 1
	currentImage = GetObject('launchpad_leftarrowbutton');
	if (this.currentSliderElement == 1) { 
		currentImage.src = 'http://img.deusm.com/eetimes/launchpad_left_off.gif';
	} else {
		currentImage.src = 'http://img.deusm.com/eetimes/launchpad_left_on.gif';
	}
	launchpadLeftArrowButtonMouseoutImgSrc = currentImage.src;
	
}

launchpadSliderHandler.LRSliderNavGraphicsHandlerSlideRight = function() {
	// change the input box value
	//GetObject('launchpad_navform_selector').value = this.currentSliderElement;
	// now deal with the images
	
	var currentImage = GetObject('launchpad_leftarrowbutton');
	// if we're at currentSliderElement > 1 make sure the left button is active
	if (this.currentSliderElement > 1) { 
		currentImage.src = 'http://img.deusm.com/eetimes/launchpad_left_on.gif';
	} else {
		currentImage.src = 'http://img.deusm.com/eetimes/launchpad_left_off.gif';
	}
	launchpadLeftArrowButtonMouseoutImgSrc = currentImage.src;
	
	currentImage = GetObject('launchpad_rightarrowbutton');
	// sliding right, change when currentSliderElement gets to this.sliderElementCount
	if (this.currentSliderElement == this.sliderElementCount) {
		currentImage.src = 'http://img.deusm.com/eetimes/launchpad_right_off.gif';
	} else {
		currentImage.src = 'http://img.deusm.com/eetimes/launchpad_right_oon.gif';
	}
	launchpadRightArrowButtonMouseoutImgSrc = currentImage.src;
}

var oneScrollHeight = 30;
var currentTickerItem = 0;
var numberOfTickerItems = 0;
var tickerIsPopulated = false;
var tickerTimeout;
var tickerStopped = false;

function InitializeNewsTicker() {
	if (tickerIsPopulated) {
		// attach rotate stop command to hover state and start command to hover out
		$('.newstickerwindow_item').hover(function() {
			if (tickerIsPopulated && !tickerStopped) {
				StopNewsTicker();
			}
		}, function() {
			if (tickerIsPopulated  && tickerStopped) {
				StartNewsTicker();
			}
		});
		StartNewsTicker();
	}
}

function RotateNewsTicker() {
	var newTopValue = 0;
	var newTopValueString = newTopValue.toString();
	newTopValueString = newTopValueString + 'px';
	var newCurrentTickerItem = 1;
	if (tickerIsPopulated && !tickerStopped) {
		// move down one unless we are already at the bottom, in which case scroll all the way back to the top
		if (currentTickerItem >= numberOfTickerItems) {
			// leave top value b/c we want to scroll back 
			// set newCurrentPosition
			newCurrentTickerItem = 0;
			currentTickerItem = newCurrentTickerItem; 
		} else {
			newCurrentTickerItem = currentTickerItem + 1;
			currentTickerItem = newCurrentTickerItem; 
			newTopValue = currentTickerItem * oneScrollHeight * -1;
			newTopValueString = newTopValue.toString();
			newTopValueString = newTopValueString + 'px';
		}
		// animate
		//$('#newstickerwindow_scrollcontainer').animate({ top: newTopValueString },'slow',function() { StartNewsTicker(); };);
		var tickerAnimateParams = {};
		tickerAnimateParams['top'] = newTopValueString;
		$('#newstickerwindow_scrollcontainer').animate(
			tickerAnimateParams, 
			'slow', 
			function() {
				StartNewsTicker();
			}
		);
	}
}

function StartNewsTicker() {
	if (tickerIsPopulated) {
		tickerStopped = false;
		clearTimeout(tickerTimeout);
		tickerTimeout = setTimeout('RotateNewsTicker();',10000);
	}
} 

function StopNewsTicker() {
	if (tickerIsPopulated) {
		clearTimeout(tickerTimeout);
		tickerStopped = true;
	}
}

var superNavEventsMenuOpen = false;
function ToggleSuperNavEventsMenu() {
	var menuName = 'supernav_events_popmenu';
	if (!superNavEventsMenuOpen) {
		PopMenu(menuName,(returnPosXofObj(GetObject('supernav_events_link')) - 1),(returnPosYofObj(GetObject('supernav_events_link')) + 15));
		superNavEventsMenuOpen = true;
	} else {
		superNavEventsMenuOpen = false;
		PopMenuOff(menuName, -500, 38);
	}
}

function cookiesEnabled()
{
	var cookieEnabled = (navigator.cookieEnabled) ? true : false;

	if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled)
	{ 
		document.cookie="testcookie";
		cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
	}
	return (cookieEnabled);
}
