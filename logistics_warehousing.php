<?php include 'inc/meta.php' ?>

<!-- Banner Section Start -->


<section class="banner holiday-homes-banner">   

     <div class="circle">
          <picture>
            <source media="(max-width:540px)" srcset="./img/logistics/banner2.jpg">
            <source media="(max-width:950px)" srcset="./img/logistics/banner3.jpg">
            <img src="./img/logistics/banner.jpg" alt="Placeholder Image" />
          </picture>
        
      </div>
      <div class="content">
        <h1 data-aos="fade-right">Logistics and Warehousing</h1>
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



<!-- Warehousing Section Start -->
<section class="warehousing-sec ivory-background">
            <div class="warehousing-sec-img1 left-img" data-aos="fade-down">
                <picture>
                    <source data-srcset="img/pngwing_1.png" media="(max-width: 1024px)" srcset="img/pngwing_1.png">
                    <img data-src="img/pngwing_1.png" src="img/pngwing_1.png">
                </picture>
            </div>
            <div class="warehousing-sec-img1 right-img" data-aos="fade-down">
                <picture>
                    <source data-srcset="img/pngwing_1_1.png" media="(max-width: 1024px)" srcset="img/pngwing_1_1.png">
                    <img data-src="img/pngwing_1_1.png" src="img/pngwing_1_1.png">
                </picture>
            </div>
    <div class="container-fluid common-wrapper">     
          <div class="row warehousing-row">              
                <div class="col-md-6">
                    <div class="warehousing-sec-content" data-aos="fade-up">
                        <!--<h2 class="spartanBold black"> Warehousing </h2>-->
                        <h4 class="spartanBold black"> Tailored to fit the needs of any business </h4>
                        <!--<h4 class="spartanBold black"> Lorem ipsum</h4>-->

                        <p class="elephantine_paragraph black" data-aos="fade-up"> With a wide range of facilities, services, and customizations available, 
                            Logistics & Warehousing buildings offer a comprehensive setup that can help companies streamline 
                            their operations and increase profitability. </p>
                    </div>
                </div>               
          </div>

          <div class="row">
            <div class="col-lg-12">
                <div class="warehousing-sec-row-image" data-aos="fade-up">
                        <picture>  
                            <source data-srcset="img/logistics/small-banner.jpg" media="(max-width: 1024px)" srcset="img/logistics/small-banner.jpg"> 
                            <img data-src="img/logistics/small-banner.jpg" src="img/logistics/small-banner.jpg">
                        </picture>
                </div>
            </div>
          </div>
          <div class="row rose-row">
                   <div class="warehousing-sec-img2" data-aos="fade-left">
                        <picture> 
                            <source data-srcset="img/pngwing_5_1.png" media="(max-width: 1024px)" srcset="img/pngwing_5_1.png"> 
                            <img data-src="img/pngwing_5_1.png" src="img/pngwing_5_1.png">
                        </picture> 
                    </div>
            <div class="col-md-2">
           
            </div>
            <div class="col-md-10">
                <div class="warehousing-sec-content2" data-aos="fade-right">
                    <!--<h2 class="spartanBold black"> Warehousing </h2>-->
                    <h4 class="spartanBold black"> Offering a unique set of features that can provide businesses with the
                    necessary space and amenities they need to maintain their operations. </h4>

                            <div class="warehousing-sec-content-row">
                                <div class="row justify-content-center">
                                    <div class="col-md-5">
                                    <p class="elephantine_paragraph">There are a number of other advantages that come with these buildings. 
                                    By investing in Logistics & Warehousing buildings, your business can be optimised with convenient access
                                    to major transportation networks, low maintenance costs, and a wide array of customizable features.</p>
                                  
                                    </div>
                                    <div class="col-md-5">

                                    <p class="elephantine_paragraph">For businesses looking to maximize their operations, Logistics & Warehousing buildings
                                         provide a versatile and cost-effective solution. With a variety of sizes and layouts
                                          available, businesses can find a facility that fits within their budget.Whether you are looking for a short-term or 
                                          long-term solution, Elephantine can help you find it. </p>
                                    </div>
                                </div>
                            </div>  
                    </div>
            </div>
          </div>
    </div>
</section>
<!-- Warehousing Section End -->

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
                    <form action="logistics_form.php" method="post" id="contact_form">
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
                url: 'logistics_form.php',
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