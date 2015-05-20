$(document).ready(function () {
//datasheets search -> clear text box
$('.datasheets_search').click(function () {
    $(this).removeClass('searchStyle');
    this.value = "";
});							
//datasheets search -> select category
$('ul#datasheets_list li').click(function () {
    var ds_cat = "ul#datasheets_list li#" + $(this).attr("id");
    $('ul#datasheets_list li').each(function () {
        $(this).removeClass('selected');
    });    
    $(ds_cat).addClass('selected');
});
//validate input and format datasheets search
function validateDatasheets(searchtext) {    
    if (searchtext.length < 3 || searchtext == "powered by DataSheets.com" || searchtext.indexOf("<") != -1 || searchtext.indexOf(">") != -1) {    
        return false;
    }    
    searchtext = searchtext.replace(/\./gi, "-dot-");
    searchtext = searchtext.replace(/\//gi, "-slash-");    
    return searchtext;
}
//datasheets search parts IE <enter> button hack
$('#PartsSearchShort_Submit').parent("form").keydown(function (e) {
    if (e.keyCode == 13) {
	    PartsSearchShort_SubmitEval(e);
    }
});
//datasheets search parts only -> submit
$('#PartsSearchShort_Submit').click(function (e) {
    PartsSearchShort_SubmitEval(e);
});
function PartsSearchShort_SubmitEval(e) {  
var searchtext = $("#PartsSearchShort_Text").val();
    searchtext = validateDatasheets(searchtext);
		if (searchtext == false ) {  e.preventDefault(); }
   if (searchtext == false) {
        e.preventDefault();
        window.open("http://www.datasheets.com/search/index.jsp");    
    }
    if (searchtext != false) {
        e.preventDefault();
        searchtext = searchtext.replace(/\s/g, "");
        window.open("http://www.datasheets.com/search/partnumber/" + searchtext);
    }
}
//datasheets search  IE <enter> button hack
$('#PartsSearchLong_Submit').parent("form").keydown(function (e) {
    if (e.keyCode == 13) {
	PartsSearchLong_SubmitEval(e);											 
    }
});
//datasheets search -> submit
$('#PartsSearchLong_Submit').click(function (e) {	
	PartsSearchLong_SubmitEval(e);											 
});
function PartsSearchLong_SubmitEval(e) {   
    var searchtext = $("#PartsSearchLong_Text").val();
    searchtext = validateDatasheets(searchtext);
	if (searchtext == false) {
        e.preventDefault();
        window.open("http://www.datasheets.com/search/index.jsp");            
    }
    if (searchtext != false) {
		e.preventDefault();
        $('ul#datasheets_list li').each(function () {
            if ($(this).hasClass('selected') == true) {
				var category = $(this).attr("value");                
                NavLocation(category);
            }		
        });
    }
    function NavLocation(category) {
        switch (category) {
             case 0:
                searchtext = searchtext.replace(/\s/g, "");
                window.open("http://www.datasheets.com/search/partnumber/" + searchtext);
                break;
             case 1:
                searchtext = searchtext.replace(/\s/g, "+");
                window.open("http://www.datasheets.com/search/description/" + searchtext);
                break;
             case 2:
                searchtext = searchtext.replace(/\s/g, "");
                window.open("http://www.datasheets.com/search/inventory/" + searchtext);
                break;
             case 3:
                searchtext = searchtext.replace(/\s/g, "+");
                window.open("http://www.datasheets.com/search/productlinelist/" + searchtext);
                break;
             case 4:
                searchtext = searchtext.replace(/\s/g, "+");
                window.open("http://www.datasheets.com/search/supplier/" + searchtext);
                break;
            default:
                break;
        }
    }
}


 });
