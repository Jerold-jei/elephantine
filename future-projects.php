<?php include 'inc/meta.php' ?>

<!-- Banner Section Start -->
<section class="banner future-project-banner projects">
    <div class="overlay"></div>
    <div class="form-div">
        <div class="container-fluid form-div-container">
            <div class="row form-div-row">
                <div class="col-md-6"  data-aos="fade-right">
                    <div class="form-div-content parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                        <h1 class="spartanBold">Stay informed about our latest undertakings</h1>
                    </div>

                </div>
                <div class="col-md-5"  data-aos="fade-left">
                    <div class="banner-form-div parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                        <div class="banner-contact-form-div">

                        <form action="future_project_form.php" method="post" id="bliss_banner_form">
                                <div class="form-div">
                                    <input placeholder="Your Name" type="text" class="form-control" name="name" id="name" onkeypress="return (event.charCode > 64 && 
	                            event.charCode < 91) || (event.charCode > 96 && event.charCode < 123)">                                  
                                </div>
                                <div class="form-div">
                                    <input placeholder="Phone" type="text" class="form-control" name="phone" id="phone" data-rule-required="true"
                                    aria-required="true"
                                    oninput="this.value = this.value.replace(/[^0-9.]/g, ''); this.value = this.value.replace(/(\..*)\./g, '$1');"
                                    onKeyDown="if(this.value.length==10 && event.keyCode!=8) return false;">                                
                                </div>
                                <div class="form-div">
                                    <input placeholder="Email" type="text" class="form-control" name="email" id="email">                                   
                                </div>
                                <div class="form-div">
                                    <textarea class="form-control" rows="5" placeholder="Comment" id="comment"
                                        name="comment"></textarea>
                                </div> 
                                
                                <div class="form-check">
                                    <input type="checkbox" id="terms_checkbox" name="terms_checkbox" class="form-check-input" value="1">
                                    <label title="" for="terms_checkbox" class="form-check-label">I agree with the terms of communication</label>
                                    <span id="terms-conditions-error"></span>
                                </div>

                                <div class="form-div">
                                   <div class="g-recaptcha" data-sitekey="6LfGwoskAAAAADwwCHu3520JYbtpiQ77ZFmEBC24" data-callback="verifyCaptcha"></div>
                                    <input type="hidden" title="Please Select the Captcha" class="required" name="keycode" id="keycode">     
                                   <br> <span id="google-captcha-error"></span>
                                </div> 
                               

                                <div class="contact-submit-btn-div">
                                    <button type="submit" class="elephantine_button">Submit</button>
                                </div>
                            </form>

                        </div>
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

<!-- Project Details Section Starts -->
<section class="project-details">
                <div class="container-fluid common-wrapper">
                    <div class="row">
                        <div class="col-md-6 d-flex flex-column flex-lg-column-reverse no-title no-top-title" image-parallax="slideup" style="transform: translate(0%, -1.4518%) translate3d(0px, 0px, 0px);">
                                    <div class="columns-text-image__img"  data-aos="fade-right"> 
                                        <i style="display: block; padding-bottom: 128.73326467559%;"></i> 
                                            <picture> 
                                                <source data-srcset="img/future/future1.jpg" media="(max-width: 1024px)" srcset="img/future/future1.jpg"> 
                                                <img data-src="img/future/future1.jpg" src="img/future/future1.jpg" alt="Elora Hardy portrait photo." class="lazyloaded parallax-move" data-parallax-content='{"shift": 20, "duration": 1}'>
                                            </picture>
                                    </div>  
                                    
                                    
                                </div>
                            
                                <div class="col-md-6 d-flex flex-column image-first no-title no-top-title" image-parallax="slidedown" style="transform: translate(0%, 1.4518%) translate3d(0px, 0px, 0px);">
                                    
                                    <div class="columns-text-image__content"  data-aos="fade-left">
                                        <h2 class="columns-text-image__content--title on-scroll h3 scroll-init in-view">Expanding our network all through Chennai
                                        </h2>
                                      
                                        
                                        <div class="columns-text-image__content--description on-scroll scroll-init in-view">
                                            <p class="elephantine_paragraph">We are constantly working to change the perspective of Chennai’s realty sector, 
                                                starting with land acquisitions, plot divisions, property development, etc. </p>
                                                
                                            <p class="elephantine_paragraph">With an outlook towards creating communities that contribute to the improvement of society, 
                                                Elephantine welcomes you to look forward to the new projects we have in the pipeline.</p>
                                            </div>                                        
                                    </div>

                                </div>
                            </div>
                        </div>



</section>


<!-- Project Details Section End -->

<!-- Location Section Start -->
<section class="future-location-sec">
    <h2  data-aos="fade-up">OUR LOCATION </h2>
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

<script>
  jQuery(document).ready(function($) {
    $('#bliss_banner_form').validate({
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
       comment: {
          required: true,         
        },
        terms_checkbox:{
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
        comment: {
          required: 'Please enter your Comments'         
        },
        terms_checkbox:{
            required: 'Please Agree To Terms & Conditions'      
        }
      },
      
      errorPlacement: function(error, element) {


        var placement = $(element).attr("name");
        // console.log(placement);

            if(placement == "terms_checkbox"){
                $('#terms-conditions-error').html(error);     
                // error.insertAfter();
                
            }else if(placement == "keycode"){
                $('#google-captcha-error').html(error);     

            }

            else{
                error.insertAfter(element);
            }

       
           
       
        },
        
      submitHandler: function (form) {
        form.submit();
        jQuery.ajax({
                url: './future_project_form.php',
                type:'POST',
                data:  {
                    name: $('#name').val(),
                    phone: $('#phone').val(),    
                    email: $('#email').val(),                                                   
                    message: $('#comment').val(),
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