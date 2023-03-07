<div id="feedback-form" class="feedback-form">	
	    <a href="#" class="feedback-form-btn" id="OpenForm">Refer A Friend</a>  
    <div class="feedback_form_area">
        <div class="feedback_form_area_inner">
            <h3>Refer A Friend</h3>
            
            <form action="../refer_form.php" method="post" id="refer_form">
            
            <div class="form-group">           
            <input type="text" class="custom-inp"  placeholder="Name" name="name" id="name" onkeypress="return (event.charCode > 64 && 
	                            event.charCode < 91) || (event.charCode > 96 && event.charCode < 123)">  
            </div>
            
            <div class="form-group">        
            <input type="text"  placeholder="Phone No" name="phone" id="phone" data-rule-required="true"
                                aria-required="true"
                                oninput="this.value = this.value.replace(/[^0-9.]/g, ''); this.value = this.value.replace(/(\..*)\./g, '$1');"
                                onKeyDown="if(this.value.length==10 && event.keyCode!=8) return false;" class="custom-inp" />
            </div>
            
            <div class="form-group">           
            <input type="text" placeholder="Referal Name" name="ref_name" id="ref_name" onkeypress="return (event.charCode > 64 && 
	                            event.charCode < 91) || (event.charCode > 96 && event.charCode < 123)" class="custom-inp" />
            </div>
            
            <div class="form-group">          
            <input type="text" placeholder="Referal Phone No" name="ref_phone" id="ref_phone" data-rule-required="true"
                                aria-required="true"
                                oninput="this.value = this.value.replace(/[^0-9.]/g, ''); this.value = this.value.replace(/(\..*)\./g, '$1');"
                                onKeyDown="if(this.value.length==10 && event.keyCode!=8) return false;" class="custom-inp">        
            </div>
            <div class="form-group">
                <input type="text" placeholder="Referal Email" name="ref_email" id="ref_email" class="custom-inp">
            </div>
            <div class="form-group">
                <div class="g-recaptcha" data-sitekey="6LfGwoskAAAAADwwCHu3520JYbtpiQ77ZFmEBC24" data-callback="verifyCaptcha"></div>
                <input type="hidden" title="Please Select the Captcha" class="required" name="keycode" id="keycode">
            </div>
            <div class="form-group">
            <button type="submit" id="" class="header_button">Submit</button>
            </div>
            
            </form>
        
        </div>
        </div>
	
	</div>


    <button class="banner--homepage__button banner--homepage__button--desktop load">
        <div class="banner--homepage__button--link">  <a href="https://api.whatsapp.com/send?phone=919592151515"><i class="fa fa-whatsapp"></i></a>
            <span class="icon-arrow-bottom icon-right"></span>
        </div>
    </button>
    <button class="banner--homepage__button banner--homepage__button--mobile load">
        <div class="banner--homepage__button--link">  <a href="https://api.whatsapp.com/send?phone=919592151515"><i class="fa fa-whatsapp"></i></a>      
        <span class="icon-arrow-bottom icon-right"></span>
        </div>
    </button>
