<?php include 'inc/meta.php' ?>

<!-- Banner Section Start -->
<section class="banner holiday-homes-banner">   
     <div class="circle">
         <picture>
            <source media="(max-width:540px)" srcset="./img/commercial/banner2.jpg">
            <source media="(max-width:950px)" srcset="./img/commercial/banner3.jpg">
            <img src="./img/commercial/banner.jpg" alt="Placeholder Image" />
         </picture>
      </div>
      <div class="content">
        <h1 data-aos="fade-right">Commercial Buildings</h1>
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

<section class="logistics-sec ivory-background">
    <div class="container-fluid common-wrapper">     

        <div class="row">
            <div class="col-md-8">
                <div class="logistics-sec-content" data-aos="fade-right">                
                    <p class="black elephantine_paragraph">
                        Commercial buildings are one of the most profitable types of real estate investment opportunities out there.  
                        Commercial buildings tend to appreciate at about 4% per year, which means that you can make money on your
                        investment even if you own it for only five years.


                    </p>
                </div>
               

            </div>
            <div class="col-md-4">
                <div class="logistics-sec-img" data-aos="fade-left">
                    <picture> 
                        <source data-srcset="img/pngwing_8_1.png" media="(max-width: 1024px)" srcset="img/pngwing_8_1.png"> 
                        <img data-src="img/pngwing_8_1.png" src="img/pngwing_8_1.png">
                    </picture>
                </div>
                    

            </div>
        </div>

    </div>

</section>

<section class="commercial-buildings-sec">
            <!--<div class="commercial-buildings-sec-leaf-img left-center-img aos-init aos-animate" data-aos="fade-down">    -->
            <!--    <picture>-->
            <!--        <source data-srcset="img/leaf/deco-mob-4-md.png" media="(max-width: 1024px)" srcset="img/leaf/deco-mob-4-md.png">-->
            <!--        <img data-src="img/leaf/deco-mob-4-md.png" src="img/leaf/deco-mob-4-md.png" class="parallax-move animate" data-parallax-content="{&quot;shift&quot;: 40, &quot;duration&quot;: 3}" style="transform: translate(0px, 28.4914px);">-->
            <!--    </picture>-->
            <!--</div>-->
            <div class="commercial-buildings-sec-leaf-img left-up-img aos-init aos-animate" data-aos="fade-down">    
                <picture>
                    <source data-srcset="img/deco-1-md.png" media="(max-width: 1024px)" srcset="img/deco-1-md.png">
                    <img data-src="img/deco-1-md.png" src="img/deco-1-md.png" class="parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                </picture>
            </div>
            <div class="commercial-buildings-sec-leaf-img right-down-img aos-init aos-animate" data-aos="fade-down">    
                <picture>
                    <source data-srcset="img/deco-2-md.png" media="(max-width: 1024px)" srcset="img/deco-2-md.png">
                    <img data-src="img/deco-2-md.png" src="img/deco-2-md.png" class="parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                </picture>
            </div>
    <div class="container-fluid common-wrapper">
        <div class="row">
            <div class="col-lg-12">
                <div class="commercial-buildings-content">
                    <h3 class="spartanBold" data-aos="fade-right">Commercial buildings are one of the most lucrative investment 
                        opportunities for investors.</h3>
                    
                    
                    <div class="commercial-buildings-content-img">
                        <picture class="commercial-buildings-content-image"> 
                            <source data-srcset="img/commercial/bottom-image.jpg" media="(max-width: 1024px)" srcset="img/commercial/bottom-image.jpg"> 
                            <img data-src="img/commercial/bottom-image.jpg" src="img/commercial/bottom-image.jpg" alt="Elora Hardy portrait photo." class="lazyloaded parallax-move" data-parallax-content='{"shift": 20, "duration": 1}'>
                        </picture>
                    </div>
                    <p class="commercial-buildings-content-text elephantine_paragraph" data-aos="fade-right"> They are typically used for office space, retail shops, malls,
                         apartment complexes, hotels, motels or other commercial purposes. These properties can be purchased and 
                         operated as a business venture or leased out to tenants. These buildings are typically well-maintained,
                          attractive, and in good locations.
 </p>

                    
                </div>

                <div class="commercial-buildings-content-bottom" data-aos="fade-up">
                        <p class="white elephantine_paragraph">If you're looking to invest in commercial real estate, look at properties that are in 
                            high demand. If you have the cash flow to invest in commercial properties, you can make a huge return
                             on your investment as long as you buy and sell at the right time.</p>
                        
                        <p class="white elephantine_paragraph">A commercial building can also be purchased as an investment property with the intent
                             of renting it out later. Make sure the rental rate is fair and that there is strong demand for the 
                             type of space you're looking to acquire.</p>

                    </div>

            

            </div>
            
        </div>


    </div>
</section>

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
                    <form action="commercial_form.php" method="post" id="contact_form">
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
                url: 'commercial_form.php',
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


<script>
     const circle = document.querySelector(".circle");
     const banner_text = document.querySelector(".banner-text");

        window.addEventListener("scroll", () => {
        if (window.scrollY > 0) {
            circle.classList.add("show");

        } else {
            circle.classList.remove("show");
        }
        });


</script>


<?php 
include 'inc/footer.php' 
?>