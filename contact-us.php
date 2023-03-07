<?php include 'inc/meta.php' ?>

<!-- Banner Section Start -->
<section class="banner contact-us-banner">
    <div class="overlay"></div>
    <div class="form-div">
        <div class="container-fluid form-div-container">
            <div class="row form-div-row">
                <div class="col-md-12">
                    <div class="form-div-content parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                        <h1 class="spartanBold" data-aos="fade-right">Get in touch with us for your realty needs </h1>                       
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



<!-- Contact Details Section Start -->
<section class="contact-us-sec">
            <div class="contact-sec-elephant-img right-bottom-img" data-aos="fade-down">
                <picture>
                    <source data-srcset="img/new/Elephantine_Website_Assets-05.jpg" media="(max-width: 1024px)" srcset="img/new/Elephantine_Website_Assets-05.jpg">
                    <img data-src="img/new/Elephantine_Website_Assets-05.jpg" src="img/new/Elephantine_Website_Assets-05.jpg" class="parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                </picture>
            </div>
    <div class="container-fluid common-wrapper">
        <div class="row">
            <div class="col-md-6"  data-aos="fade-right">
                    <div class="columns-text-image__img parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'> 
                        <i style="display: block; padding-bottom: 128.73326467559%;"></i> 
                            <picture> 
                                <source data-srcset="img/contact/contact.jpg" media="(max-width: 1024px)" srcset="img/contact/contact.jpg"> 
                                <img data-src="img/contact/contact.jpg" src="img/contact/contact.jpg" alt="Elora Hardy portrait photo." class="lazyloaded parallax-move" data-parallax-content='{"shift": 20, "duration": 1}'>
                            </picture>
                    </div>  

            </div>
            <div class="col-md-6" data-aos="fade-left">
                <div class="contact-details parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                    <h6 class="gold">Contact Details</h6>
                    <p class="elephantine_paragraph">5th floor, City Tower, No 7, 3rd Cross
                        St, Kasturba Nagar, Adyar, Chennai,
                        Tamil Nadu 600020.</p>
                    
                    <p class="elephantine_paragraph"><a href="#" class="">+91 9876543210</a></p>
                    <p class="elephantine_paragraph"><a href="#" class="">
                            info@elephantine.co
                        </a></p>

                </div>
                
            </div>
        </div>        
    </div>
</section>
<!-- Contact Details Section End -->

<!-- Location Section Start -->
<section class="location-sec">

    <h2 data-aos="fade-up">OUR LOCATION </h2>
    
    <!-- <div class="container-fluid common-wrapper"> -->
        <div class="row"  data-aos="fade-up">
            <div class="col-lg-12">
                <div class="google-maps">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15550.056462285429!2d80.2519977!3d13.0028992!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xe041d2052d2d3426!2sElephantine%20Enterprises%20Private%20Limited!5e0!3m2!1sen!2sin!4v1675664476575!5m2!1sen!2sin" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </div>
        
    <!-- </div> -->
</section>

<!-- Location Section End -->

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
                    <h1 class="spartanBold" data-aos="fade-up">EXPERIENCE OUR WORLD</h1>
                    <h3 class="arandelle gold" data-aos="fade-up">Connect</h3>
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
                    <p class="elephantine_paragraph">Would you like to start the conversation about involving
us in your next project? Feel free to contact us.<p>
                    <form action="contact_form.php" method="post" id="contact_form">
                        <div class="row"> 
                            <div class="col-md-12">
                                <div class="form-group">
                                    <input type="text" class="form-control" name="name" placeholder="Name*" id="name" onkeypress="return (event.charCode > 64 && 
	                            event.charCode < 91) || (event.charCode > 96 && event.charCode < 123)">
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
                                        id="phone" data-rule-required="true"
                                aria-required="true"
                                oninput="this.value = this.value.replace(/[^0-9.]/g, ''); this.value = this.value.replace(/(\..*)\./g, '$1');"
                                onKeyDown="if(this.value.length==10 && event.keyCode!=8) return false;">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <input type="text" class="form-control" name="subject" placeholder="Subject*"
                                        id="subject">
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
    $('#contact_form').validate({
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
        subject: {
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
        subject: {
          required: 'Please enter your interest'          
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
                url: 'contact_form.php',
                type:'POST',
                data:  {
                    name: $('#name').val(),
                    email: $('#email').val(),
                    phone: $('#phone').val(),
                    subject: $('#subject').val(),                  
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

