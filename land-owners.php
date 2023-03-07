<?php include 'inc/meta.php' ?>

<!-- Banner Section Start -->
<section class="banner land-owner-banner">
    <div class="overlay"></div>
   <div class="form-div">
        <div class="container-fluid form-div-container">
            <div class="row form-div-row">
                <div class="col-md-12">
                    <div class="form-div-content parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                        <h1 class="spartanBold" data-aos="fade-right">Your plots, your prices</h1>
                    </div>
                </div>               
            </div>
        </div>
    </div>
    
    
    <div class="sticky-btn">
             <a href="#" class="header_button" onclick="openForm()">Refer A Friend</a>         
    </div>
     <div class="form-popup" id="myForm">
            <form action="./refer_form.php" method="post" class="form-container" id="refer_form">
            <button type="button" class="cancel" onclick="closeForm()"><span aria-hidden="true">&times;</span></button>
                <h1>Refer A Friend</h1>

              
                <input type="text" placeholder="Name" name="name" id="name" onkeypress="return (event.charCode > 64 && 
	                            event.charCode < 91) || (event.charCode > 96 && event.charCode < 123)">      

                <input type="text" placeholder="Phone No" name="phone" id="phone" data-rule-required="true"
                                aria-required="true"
                                oninput="this.value = this.value.replace(/[^0-9.]/g, ''); this.value = this.value.replace(/(\..*)\./g, '$1');"
                                onKeyDown="if(this.value.length==10 && event.keyCode!=8) return false;">

                <input type="text" placeholder="Referal Name" name="ref_name" id="ref_name" onkeypress="return (event.charCode > 64 && 
	                            event.charCode < 91) || (event.charCode > 96 && event.charCode < 123)">

                <input type="text" placeholder="Referal Phone No" name="ref_phone" id="ref_phone" data-rule-required="true"
                                aria-required="true"
                                oninput="this.value = this.value.replace(/[^0-9.]/g, ''); this.value = this.value.replace(/(\..*)\./g, '$1');"
                                onKeyDown="if(this.value.length==10 && event.keyCode!=8) return false;">

                <input type="text" placeholder="Referal Email" name="ref_email" id="ref_email">

                <div class="g-recaptcha" data-sitekey="6LfGwoskAAAAADwwCHu3520JYbtpiQ77ZFmEBC24" data-callback="verifyCaptcha"></div>
                <input type="hidden" title="Please Select the Captcha" class="required" name="keycode" id="keycode">


                <button type="submit" class="elephantine_button">Submit</button>
                
            </form>
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
</section>

<!-- Banner Section End -->

<!-- Description Section Start -->
<section class="description-sec">
    <div class="container-fluid common-wrapper">
        <div class="row">
            <div class="col-lg-12">
                <div class="description-content" data-aos="fade-up">
                    <h2 class="parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>A joint venture
                        <span class="arandelle gold" > between you and us </span> 
                    </h2>
                    <p class="elephantine_paragraph parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>At Elephantine, we look forward 
                        to guiding landowners into making an investment opportunity of a lifetime! From procuring your land at 
                        incredible market rates to entering into a strategic partnership with us to increase the value of your 
                        land tenfold, we do it all! 
                    </p>
                </div>  
            </div>
        </div>

        
    </div>


</section>


<!-- Description Section End -->

<!-- Enquiry Form Section Start -->
<section class="contact-sec">
            <div class="contact-sec-leaf-img right-img" data-aos="fade-down">
                <picture>
                    <source data-srcset="img/leaf/deco-5-lg.png" media="(max-width: 1024px)" srcset="img/leaf/deco-5-lg.png">
                    <img data-src="img/leaf/deco-5-lg.png" src="img/leaf/deco-5-lg.png" class="parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                </picture>
            </div>

            <div class="contact-sec-leaf-img form-left-img" data-aos="fade-down">
                <picture>
                    <source data-srcset="img/new/Elephantine_Website_Assets-06.jpg" media="(max-width: 1024px)" srcset="img/new/Elephantine_Website_Assets-06.jpg">
                    <img data-src="img/new/Elephantine_Website_Assets-06.jpg" src="img/new/Elephantine_Website_Assets-06.jpg" class="parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                </picture>
            </div>

            <div class="contact-sec-leaf-img form-right-img" data-aos="fade-down">
                <picture>
                    <source data-srcset="img/new/Elephantine_Website_Assets-07.jpg" media="(max-width: 1024px)" srcset="img/new/Elephantine_Website_Assets-07.jpg">
                    <img data-src="img/new/Elephantine_Website_Assets-07.jpg" src="img/new/Elephantine_Website_Assets-07.jpg" class="parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                </picture>
            </div>
    <div class="container-fluid contact-head-container">
        <div class="row flex-center">
            <div class="col-md-8">
                <div class="contact-head-div parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                    <h1 class="spartanBold" data-aos="fade-up">LAND OWNERS</h1>
                    <h3 class="arandelle gold" data-aos="fade-up">Registration Form</h3>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid contact-form-container">
        <div class="row flex-center">
            <div class="col-md-8 contact-form-col">
                <div class="call-to-action__background">  
                    <img src="img/Elephantine_Website_Assets-09.svg" class="img-fluid" />
                </div>
                <div class="contact-form-div contact-form" data-aos="fade-up">
                    <p class="elephantine_paragraph">Register below with the following details, and we will get back to you shortly with incredible results.<p>
                    <form action="land_owner_form.php" id="land_owner_form" method="post">
                        <div class="row"> 
                            <div class="col-md-12">
                                <div class="form-group">
                                    <input type="text" class="form-control" name="name" placeholder="Name*" id="name">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <input type="text" class="form-control" name="email" placeholder="Email*"
                                        id="email">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <input type="text" class="form-control" name="phone" placeholder="Phone*"
                                        id="phone">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <input type="text" class="form-control" name="site_address" placeholder="Site Address*"
                                        id="site_address">
                                </div>
                            </div> 
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <input type="text" class="form-control" name="site_size" placeholder="Site Area in sq. ft*"
                                        id="site_size">
                                </div>
                            </div> 
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <input type="text" class="form-control" name="estimated_price" placeholder="Your Approximate Estimation for 1 sq. ft*"
                                        id="estimated_price">
                                </div>
                            </div> 
                        </div>                       
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group"> 
                                    <textarea class="form-control" rows="5" placeholder="Message*" id="message"
                                        name="message"></textarea>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group"> 
                                    <div class="g-recaptcha" data-sitekey="6LfGwoskAAAAADwwCHu3520JYbtpiQ77ZFmEBC24" data-callback="verifyCaptcha"></div>
                                    <input type="hidden" title="Please Select the Captcha" class="required" name="keycode" id="keycode">
                                </div>
                            </div>
                        </div>



                        <div class="row submit_btn">
                            <div class="col-md-12">
                                <button type="submit" class="elephantine_button">SUBMIT</button>
                                 
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</section>


<!-- Enquiry Form Section End -->

<script>
  jQuery(document).ready(function($) {
    $('#land_owner_form').validate({
        ignore: ":hidden:not(#keycode)",

        // Specify validation rules
      rules: {
        name: {
          required: true
        },
        email: {
          required: true,
          email: true
        },
       phone: {
          required: true,
          rangelength: [10, 12],
          number: true
        },
        site_address: {
          required: true,         
        },
        site_size:{
          required: true,     
        },
        estimated_price:{
            required: true,
        },

        message: {
          required: true,         
        },

        'keycode': {
            required: function() {
            if(grecaptcha.getResponse() == '') {
                return true;
            } else { return false; }
            }
            }
      },
      messages: {
        name: 'Please enter your Name',
        email: {
          required: 'Please enter your Email Address',
          email: 'Please enter a valid Email Address',
        },
        phone: {
          required: 'Please enter your Phone number',
          rangelength: 'Phone should be 10 digit number'
        },
        site_address: {
          required: 'Please enter your site address'          
        },
        site_size:{
            required: 'Please enter your site area in sq.ft'
        },
        estimated_price:{
            required: 'Please enter your estimated price per sq.ft'
        },
        message: {
          required: 'Please enter your Comments'         
        }
      },
      
      errorPlacement: function(error, element) {


        var placement = $(element).attr("name");
        // console.log(placement);
       
            error.insertAfter(element);
       
        },
        
      submitHandler: function (form) {
        form.submit();
        jQuery.ajax({
                url: 'land_owner_form.php',
                type:'POST',
                data:  {
                    name: $('#name').val(),
                    email: $('#email').val(),
                    phone: $('#phone').val(),
                    site_address: $('#site_address').val(),                  
                    site_size: $('#site_size').val(),
                    estimated_price: $('#estimated_price').val(),
                    message: $('#message').val(),
                    recaptcha:grecaptcha.getResponse(),
                                        
                },
                // dataType: 'json'

                success: function(data) {
                    $(form)[0].reset();
                    // $('#thankyouModal').modal('show');
                }
            });
            return false;

            
      }
    });
  });
</script>

<script>
  
  jQuery(document).ready(function($) {
    $('#refer_form').validate({
        ignore: ":hidden:not(#keycode)",

        // Specify validation rules
      rules: {
        name: {
          required: true
        },  

       phone: {
          required: true,
          rangelength: [10, 12],
          number: true
        },
        ref_name: {
          required: true,         
        },
        ref_phone: {
          required: true,
          rangelength: [10, 12],
          number: true
        },
        ref_email: {
          required: true,
          email: true
        },        

        'keycode': {
            required: function() {
            if(grecaptcha.getResponse() == '') {
                return true;
            } else { return false; }
            }
            }
      },
      messages: {
        name: 'Please enter your Name',
        phone: {
          required: 'Please enter your Phone number',
          rangelength: 'Phone should be 10 digit number'
        },
        ref_name: 'Please enter your Referal Name',
        ref_phone: {
          required: 'Please enter your Referal Phone number',
          rangelength: 'Phone should be 10 digit number'
        },
        ref_email: {
          required: 'Please enter your Referal Email Address',
          email: 'Please enter a valid Email Address',
        },      
            
      },
      
      errorPlacement: function(error, element) {


        var placement = $(element).attr("name");
        // console.log(placement);
       
            error.insertAfter(element);
       
        },
        
      submitHandler: function (form) {
        form.submit();
        jQuery.ajax({
                url: './refer_form.php',
                type:'POST',
                data:  {
                    name: $('#name').val(),                   
                    phone: $('#phone').val(),
                    ref_name: $('#ref_name').val(),
                    ref_phone: $('#ref_phone').val(),
                    ref_email: $('# ref_email').val(),                    
                    recaptcha:grecaptcha.getResponse(),
                                        
                },
                // dataType: 'json'

                success: function(data) {
                    $(form)[0].reset();
                    // $('#thankyouModal').modal('show');
                }
            });
            return false;

            
      }
    });
  });
</script>

<?php 
include 'inc/footer.php' 
?>