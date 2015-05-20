	var siteLogo = 'http://img.deusm.com/eetimes/ee-times-logo.png';
	var privacyLogo = 'http://img.deusm.com/eetimes/ubm_tech_logo_footer_grey88x111.jpg';
	var privacyText = 'By registering, I agree to the <a href="http://legal.us.ubm.com/terms-of-service/" target="_blank">UBM Tech Terms and Conditions</a>';
	var loginRedirectURL = '';
	var loginNextAction = '';
	var reloadOnClose = false;
	var ngconfig = new UBM.Widget.Helper.Config(ngenv);
	var regHeaderContent = '<div style="text-align:center" ><img class="brand-logo-image" src="'+siteLogo+'"></div>';
	var regAction = '/ng_register.asp';

	// instantiate the Login Widget Helper
	var loginWidget = new UBM.Widget.Helper.Login({
		environment: ngenv,
		// login callback
		callback: function(data){
			if(data.success === true) {
			UBM.Widget.loadingStart("Processing, please wait...");
			$.post("/ng_loginsuccess.asp",
				 data,
				  function(data,status){
					UBM.Widget.loadingStop();
					if (data.remember_me) {
						$('<iframe />', {
							name: 'nggateway',
							id:   'nggateway',
							src: '/ng_gateway.asp',
							frameborder: '0',
							width: '0',
							height: '0'
						}).appendTo('body');	
					};
					setTimeout(function() {
					if(loginRedirectURL != ''){
						document.location.assign(loginRedirectURL);
					}else if(loginNextAction != ''){
						if (loginNextAction == 'profile'){
							updateWidget.openWithAjaxForm('/ngprofileform_xml.asp');
						}else if (loginNextAction == 'password'){
							loginNextAction = '';
							changePassword();
						}else if (loginNextAction == 'newsletter'){	
							loginNextAction = '';
							newsletterForm();
						}
					}else{
						document.location.reload(false);
					}
					loginWidget.close();
					}, 500);
				  })
				  .fail(function() {
				  	UBM.Widget.alert("There was a problem processing your login");
				  	UBM.Widget.loadingStop();
				  	loginWidget.close();
				  });
			}
		},
		footerContent: 'New here? <a href="#" onclick="loginWidget.close(); openForm(); return false;">Register for an account</a>',
		brandLogo : siteLogo,
		title : "<strong>Login</strong>", 
		width  :350,
		loginIframeWidth : 300, 
		maxHeight: 700 ,
		changePasswordIframeWidth: 300,
		passwordResetIframeWidth: 300,
		loginDescription : "The same username and password you use for InformationWeek or Network Computing will also work here.",
		//loginDescription : "",
		template : '<div id="modalHeader"><div>{logo}</div><div class="modal-description">{description}</div></div><div>{form}{extAuth}</div><div id="modal-footer">{footer}</div>',
		// password reset callback
		passwordResetTemplate: '<div id="modalHeader"><div class="modal-logo">{logo}</div><div class="modal-description"></div></div>{form}<div id="modal-footer"></div>',
		passwordResetRequestCallback: function(data){
			UBM.Widget.alert("An e-mail has been sent to the address you provided that will contain a link to reset your password.");
			loginWidget.close();
		},
		passwordResetCallback: function(data){
			loginWidget.close();
			trackPasswordResetOpen();
		},
		// password change callback
		passwordChangeCallback: function(data){
			loginWidget.close();
		}
	});

	var registrationWidget = new UBM.Widget.Helper.Registration({
		environment: ngenv,
		title  : "<strong>Registration</strong>", rememberMeCheckboxAfterField : 121, 
		ajax: true,
		submitFormId: true,
		submitFieldTypeTable: true,
		method: "post",
		action: regAction,
		successCallback: function(data){ 
			trackShortRegistrationConfirm();
			if (data.remember_me) {
				$('<iframe />', {
					name: 'nggateway',
					id:   'nggateway',
					src: '/ng_gateway.asp',
					frameborder: '0',
					width: '0',
					height: '0'
				}).appendTo('body');	
			}
			registrationWidget.close();
			openRegisterThanks();
		},
		errorCallback: function(data){
		},
		headerContent: regHeaderContent,
		privacyLogo: privacyLogo,
		privacyText: privacyText,
		maxHeight: 700,
		accountAlreadyExistsOnClick: "registrationWidget.close(); loginWidget.open(); trackLoginOpen(); return false;",
		serviceApiKey: ngserv,
		recaptchaToken: '6LdBa_gSAAAAADodxRztuD8SuxStSLl1XhE22M14'
	});

	var updateWidget = new UBM.Widget.Helper.UpdateProfile({
		environment: ngenv,
		ajax: true,
		submitFormId: true,
		submitFieldTypeTable: true,
		method: "post",
		action: "/ng_profile.asp",
		avatarPostUrl: "/thumbnail.aspx",
		successCallback: function(data){ 
			$('.profileUsername').html(data.username);
			updateWidget.close();
		},
		errorCallback: function(data){
		},
		avatarSuccessCallback:function(data){ 
			UBM.Widget.loadingStart();
			$.get("/ng_thumbnail.asp?filename="+data.filename,
				  function(thisdata){
					UBM.Widget.loadingStop();
					if (thisdata.success) {
						updateWidget.updateAvatarImage(thisdata.url);
					} else {
						alert("There was a problem processing your file. Please try again.");
					}
				  })
				  .fail(function() {
				  	UBM.Widget.loadingStop();
				  	alert("There was a problem processing your file. Please make sure your image is less than 5 Megabytes");
				  });

		},
		
		avatarErrorCallback: function(data){
			UBM.Widget.loadingStop();
			alert("There was a problem processing your file. Images must be less than 5 Megabytes");
		},
		headerContent: 'Update your profile by filling out the form below<br />Click here to <a href="#" onclick="UBM.Widget.loadingStart(); updateWidget.close(); newsletterForm(); return false;">update your Newsletter Preferences</a>',
		privacyLogo: privacyLogo,
		privacyText: privacyText,
		serviceApiKey: ngserv,
		updateForm: true,
		changePasswordAction: function() {
			updateWidget.close();
			changePassword();
		}
	});

	var optoutWidget = new UBM.Widget.Helper.Optout({
		environment: ngenv
		//message: 'To opt-out of any future online event offers, please click on the submit button below',
		//confirmMessage: 'Thank You. You will be removed from any future online event offers within 10 days.',
	});

	var newsletterWidget = new UBM.Widget.Form({
		environment: ngenv,
		ajax: true,
		submitFormId: true,
		submitFieldTypeTable: true,
		method: "post",
		action: "/ng_newsletterprefs.asp",
		windowTitle: "Newsletter Preferences",
		windowWidth: 600,
		ajaxCompleteCallback: function(d) {
			UBM.Widget.loadingStop();
			trackNewsletterPrefsConfirm();
			newsletterWidget.closeFormWindow();
		},
		ajaxErrorCallback: function(d){
			UBM.Widget.loadingStop();
		},
		successCallback: function(d) {
			UBM.Widget.loadingStart("Processing, please wait...");
			return true;
		},
		failureCallback: function(d){
		}
	});

	function openRegisterThanks() {
		UBM.Widget.Helper.Modal.open('<br /><div align="center"><h2><b>Thank you for registering</b></h2><br /><br /><a href="#" onclick="UBM.Widget.Helper.Modal.close(); location.reload(true);">Close this window</a></div>', 
			{
			title: "Registration",
			width: 400,
			height: 250, 
			onClose: function(){location.reload(true); } 
			}
		);
	}

	function openUserDescription() {
		UBM.Widget.Helper.Modal.open('<br /><div align="center"><h2><b>Please fill out your info</b></h2><br /><br /><form><textarea class="mceEditor">Fill this out</textarea></form><a href="#" onclick="UBM.Widget.Helper.Modal.close(); location.reload(true);">Close this window</a></div>', 
			{
			title: "Registration",
			width: 400,
			height: 250, 
			onClose: function(){location.reload(true); } 
			}
		);
	}

  	function login(nextURL) {
		//test for cookies
		ngCreateCookie("ngTestCookie", "yes", 1);
		$.get("/ng_checkcookieenable.asp",
			  function(thisdata){
				if (thisdata.success) {
					loginRedirectURL = nextURL;
					loginWidget._options.loginDescription='';
					loginWidget.open();
					trackLoginOpen();
				} else {
					UBM.Widget.alert("You must have cookies enabled to login.");
				}
		});		
	}
	
	function loginWithMessage(nextURL,headerMessage) {
		//test for cookies
		ngCreateCookie("ngTestCookie", "yes", 1);
		$.get("/ng_checkcookieenable.asp",
			  function(thisdata){
				if (thisdata.success) {
					loginRedirectURL = nextURL;
					loginWidget._options.loginDescription=headerMessage;
					loginWidget.open();
					trackLoginOpen();
				} else {
					UBM.Widget.alert("You must have cookies enabled to login.");
				}
		});		
	}

	function changePassword() {
		verifyToken(function(validToken){
			if(validToken == "True"){
				loginWidget.openChangePassword();
			}else{
				loginNextAction = 'password';
				loginWidget.open();
				trackLoginOpen();
			}
		});
	}

	function openForm() {
		//test for cookies
		ngCreateCookie("ngTestCookie", "yes", 1);
		$.get("/ng_checkcookieenable.asp",
			  function(thisdata){
				if (thisdata.success) {
					setNGReg();
					registrationWidget.openWithAjaxForm('/ngregform_xml.asp');
					trackShortRegistrationOpen();
				} else {
					UBM.Widget.alert("You must have cookies enabled to register.");
				}
		});		
	}

	function updateForm() {
		verifyToken(function(validToken){
				if(validToken == "True"){
					$.get("/ng_checkforthumbnail.asp",
						  function(thisdata){
							if (thisdata.success) {
								updateWidget.updateAvatarImage(thisdata.url);
							} else {
								//alert("There was a problem processing your file. Images must be less than 5 Megabytes");
							}
						  })
						  .fail(function() {
							//alert("There was a problem processing your file. Images must be less than 5 Megabytes");
						  });
					updateWidget.openWithAjaxForm('/ngprofileform_xml.asp');
					
				}else{
					// if the url contains update_profile just let the page refresh when we login so we can see their profile page, then page will pop up profiles page
					if(location.search.indexOf('update_profile=')<0) {
						loginNextAction = 'profile';
					}
					loginWidget.open();
					trackLoginOpen();
				}
		});
		
	}

	function newsletterForm() {
		verifyToken(function(validToken){
			if(validToken == "True"){
				var xmlFile = '/ngnewsletterform_xml.asp';
				$.get(xmlFile,function(xml){
					newsletterWidget.setFormHeader( 'Please choose the newsletters you would like to receive:' );
					newsletterWidget.openFormWindowWithXml(xml);
					trackNewsletterPrefsOpen();
					UBM.Widget.loadingStop();
				});
			}else{
				if(location.search.indexOf('update_newsletter=')<0) {
					loginNextAction = 'newsletter';
				}
				UBM.Widget.loadingStop();
				//loginWidget.open();
				loginWithMessage('','Please login or register to update your newsletter preferences.');
				trackLoginOpen();
			}
		});
	}

	function verifyToken(callback){
		$.get("/ng_verifytoken.asp", function(validToken) {
			callback(validToken);
		});
		
	}

	// jQuery extension to get query string parameters
	$.extend({
	  getUrlVars: function(){
		var vars = [], hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for(var i = 0; i < hashes.length; i++)
		{
		  hash = hashes[i].split('=');
		  vars.push(hash[0]);
		  vars[hash[0]] = hash[1];
		}
		return vars;
	  },
	  getUrlVar: function(name){
		return $.getUrlVars()[name];
	  }
	});
	
    $(document).ready(function() {
   		loginWidget.init();
    
		if(loginCheck == 2){
			$('#loginLinks').html(loginHTML);
		}else{
			verifyToken(function(validToken){
				if(validToken == "True"){
					$('#loginLinks').html(logoutHTML);
				}else{
					$('#loginLinks').html(loginHTML);
				}
			});
		}
		
		if((loginCheck == 2) || (loginCheck == 1)){
			if (location.search.indexOf('ngAction=register')>=0 && !(location.search.indexOf('token=')>=0)){
				openForm();
			}else if(location.search.indexOf('token=')>=0 && (location.search.indexOf('gateway_return=')>=0)) {
				ngCreateCookie("ngTestCookie", "yes", 1);
				$.get("/ng_checkcookieenable.asp",
					  function(thisdata){
						if (thisdata.success) {
							loginWidget.open();
							trackLoginOpen();
						} else {
							UBM.Widget.alert("You must have cookies enabled to register.");
						}
				});		
			}
		}
		//if we don't recognize them, and query string requests the register window open
		if ((loginCheck == 2) && location.search.indexOf('pAction=register')>=0){
			openForm();
		}		
    });

function ngCreateCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
}

function ngRreadCookie(name) {
    var nameEQ = escape(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return unescape(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function ngEraseCookie(name) {
    ngCreateCookie(name, "", -1);
}


function trackShortRegistrationOpen(){
	var s=s_gi('cmpglobalvista');
	s.products=omn_regtrackproduct;
	s.events='event43';
	s.tl(this,'o',omn_regtrackproduct);
}

function trackSocialMediaBasicRegistration(){
	var s=s_gi('cmpglobalvista');
	s.products=omn_regtrackproduct;
	s.events='event46';
	s.tl(this,'o',omn_regtrackproduct);
}

function trackLongRegistrationOpen(){
	var s=s_gi('cmpglobalvista');
	s.products=omn_regtrackproduct;
	s.events='event44';
	s.tl(this,'o',omn_regtrackproduct);
}

function trackLoginOpen(){
	var s=s_gi('cmpglobalvista');
	s.products=omn_regtrackproduct;
	s.events='event45';
	s.tl(this,'o',omn_regtrackproduct);
}

function trackLoginSuccess(){
	var s=s_gi('cmpglobalvista');
	s.products=omn_regtrackproduct;
	s.events='event2';
	s.tl(this,'o',omn_regtrackproduct);
}

function trackPasswordResetOpen(){
	var s=s_gi('cmpglobalvista');
	s.products=omn_regtrackproduct;
	s.events='event48';
	s.tl(this,'o',omn_regtrackproduct);
}

function trackNewsletterPrefsOpen(){
	var s=s_gi('cmpglobalvista');
	s.products=omn_nltrackproduct;
	s.events='event49';
	s.tl(this,'o',omn_nltrackproduct);
}

function trackNewsletterPrefsConfirm(){
	var s=s_gi('cmpglobalvista');
	s.products=omn_nltrackproduct;
	s.events='event50';
	s.tl(this,'o',omn_nltrackproduct);
}

function trackShortRegistrationConfirm(){
	var s=s_gi('cmpglobalvista');
	s.products=omn_regtrackproduct;
	s.events='event7';
	s.tl(this,'o',omn_regtrackproduct);
}

function trackRegistrationThankYou(){
	var s=s_gi('cmpglobalvista');
	s.products=omn_regtrackproduct;
	s.events='event7';
	s.tl(this,'o',omn_regtrackproduct);
}
