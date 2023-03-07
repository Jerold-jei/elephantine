<?php include 'inc/meta.php' ?>

<!-- Banner Section Start -->
<section class="banner pristine-project-banner projects">
    <div class="overlay"></div>
    <div class="form-div">
        <div class="container-fluid form-div-container">
            <div class="row form-div-row">
                <div class="col-md-6" data-aos="fade-right">
                    <div class="form-div-content parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                        <h1 class="spartanBold"> Indulge in a wellness retreat by the beach!</h1>
                        <h6>42 Acres of DTCP-approved  </h6>
                        <h6>Bespoke Beachside Paradise </h6>
                    </div>

                </div>
                <div class="col-md-5" data-aos="fade-left">
                    <div class="banner-form-div parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                        <div class="banner-contact-form-div">
                            <form action="pristine_form.php" method="post" id="bliss_banner_form">
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
                                    <div class="columns-text-image__img" data-aos="fade-right"> 
                                        <i style="display: block; padding-bottom: 128.73326467559%;"></i> 
                                            <picture> 
                                                <source data-srcset="img/pristine/our-project-details.jpg" media="(max-width: 1024px)" srcset="img/pristine/our-project-details.jpg"> 
                                                <img data-src="img/pristine/our-project-details.jpg" src="img/pristine/our-project-details.jpg" alt="Elora Hardy portrait photo." class="lazyloaded parallax-move" data-parallax-content='{"shift": 20, "duration": 1}'>
                                            </picture>
                                    </div>  
                                    
                                    
                                </div>
                            
                                <div class="col-md-6 d-flex flex-column image-first no-title no-top-title" image-parallax="slidedown" style="transform: translate(0%, 1.4518%) translate3d(0px, 0px, 0px);">
                                    
                                    <div class="columns-text-image__content" data-aos="fade-left">
                                        <h3>Luxurious Villas That Inspire A Life of Wellness</h3>
                                        <h2 class="columns-text-image__content--title on-scroll h3 scroll-init in-view">Our Project Details </h2>
                                       
                                        
                                        <div class="columns-text-image__content--description on-scroll scroll-init in-view">
                                            <p class="elephantine_paragraph">Welcome to a secured gated community that invites you for a well-deserved 
                                            vacation! Pristine Bay is the perfect spot for homeowners looking to enjoy a vacation alongside the beach,
                                            with several fun beachside activities to keep you engaged!</p>
                                            <p class="elephantine_paragraph">This unique proposition offers the perfect spot for you to 
                                                unwind from your busy life, bordered by the deep blue sea that 
                                                makes for a stunning location. Enjoy the comforts of a serene lifestyle at Pristine Bay!
</p>
                                            </div>                                        
                                    </div>

                                </div>
                            </div>
                        </div>



</section>


<!-- Project Details Section End -->

<!-- Specification Section Start -->

<section class="project-specification-sec">
        <div class="container-fluid common-wrapper">
                    <div class="row">
                        <div class="col-md-6 d-flex flex-column flex-lg-column-reverse no-title no-top-title" data-aos="fade-right">
                                    
                                    <div class="columns-text-image__content parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                                        <h3>Calm Serenity With A Splash Of Fun!</h3>
                                        <h2 class="columns-text-image__content--title on-scroll h3 scroll-init in-view">Our Specifications</h2>
                                      
                                        <div class="columns-text-image__content--description on-scroll scroll-init in-view">
                                            <p class="elephantine_paragraph">Sprawling over 42 acres, Pristine Bay is a masterfully
                                                planned terrain of luxury villas, clubhouses, landscaped parks, sports clubs, Mongolian Yurts, 
                                                and adventure sports such as paragliding, jetskiing, kayaking, etc.
</p>
                                            <p class="elephantine_paragraph">This beachside utopia is an ideal vacation spot for all looking 
                                                to escape into a world of fun, entertainment and peace. Pristine Bay’s elusive retreat is an 
                                                enjoyable affair for all - from adults wanting some tranquillity away from the city to kids 
                                                looking to enjoy themselves on the beach.</p>

                                            </div>                                        
                                    </div>  
                                </div>
                            
                                <div class="col-md-6 d-flex flex-column image-first no-title no-top-title" data-aos="fade-left">
                                    
                                    <div class="columns-text-image__img parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'> 
                                        <i style="display: block; padding-bottom: 128.73326467559%;"></i> 
                                            <picture> 
                                                <source data-srcset="img/pristine/our-specifications.jpg" media="(max-width: 1024px)" srcset="img/pristine/our-specifications.jpg"> 
                                                <img data-src="img/pristine/our-specifications.jpg" src="img/pristine/our-specifications.jpg" alt="Elora Hardy portrait photo." class="lazyloaded parallax-move" data-parallax-content='{"shift": 20, "duration": 1}'>
                                            </picture>
                                    </div>  

                                </div>
                            </div>
                        </div>






</section>



<!-- Specification Section End -->

<!-- Amenities Section Start -->

<section class="project-amenities ivory-background">
    <div class="container-fluid common-wrapper">
        <h2 data-aos="fade-up">EVERTYHING <span class="arandelle gold">  in one place </span> </h2>

        <div class="grid" data-aos="fade-up">
            <div class="grid-section parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                <div class="in">
                    <img class="lazy loaded" src="img/pristine/clubhouse.svg" data-src="img/pristine/clubhouse.svg" alt="ONSITE GYM" data-was-processed="true">
                    CLUBHOUSES
                </div>
            </div>
            <div class="grid-section parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                <div class="in">
                    <img class="lazy loaded" src="img/pristine/landscaped-lawns.svg" data-src="img/pristine/landscaped-lawns.svg" alt="SWIMMING POOL" data-was-processed="true">
                    LANDSCAPED LAWNS
                </div>
            </div>
            <div class="grid-section parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                <div class="in">
                <img class="lazy loaded" src="img/pristine/adventure-sports.svg" data-src="img/pristine/adventure-sports.svg" alt="ROOF TERRACE" data-was-processed="true">
                    ADVENTURE SPORTS
                </div>
            </div>
            <div class="grid-section parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                <div class="in">
                <img class="lazy loaded" src="img/pristine/sports-clubs.svg" data-src="img/pristine/sports-clubs.svg" alt="SKY LOUNGE BAR" data-was-processed="true">
                    SPORTS CLUBS
                </div>
            </div>
            <div class="grid-section parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                <div class="in">
                    <img class="lazy loaded" src="img/pristine/private-beach.svg" data-src="img/pristine/private-beach.svg" alt="GAMES ROOM" data-was-processed="true">
                    PRIVATE BEACH
                </div>
            </div>
        </div>
    </div>


</section>

<!-- Amenities Section End -->


<!-- Site plan Section Starts -->
<section class="project-site-plan">
    <div class="container-fluid common-wrapper">
        <h2 class="parallax-move" data-parallax-content='{"shift": 40, "duration": 3}' data-aos="fade-up"> Site Plan </h2>
        <p class="elephantine_paragraph parallax-move" data-parallax-content='{"shift": 40, "duration": 3}' data-aos="fade-up">Impeccably planned to help you reap the advantageous benefits 
            of this stunning location and its surrounding amenities.</p>

            <div class="slider parallax-move" data-parallax-content='{"shift": 40, "duration": 3}' >        
                <div class="carousel flickity-enabled" tabindex="0">  
                    <div class="flickity-viewport" style="height: 541.8px; touch-action: pan-y;">
                        <div class="flickity-slider" style="left: 0px; transform: translateX(0%);">
                            <section class="is-selected" style="position: absolute; left: 0%;">
                                <figure style="opacity: 1; transform: translate(0px, 0px);">
                                    <img class="lazy loaded" src="img/pristine/siteplan.jpg" id="myImg" alt="BLOOM STUDIO UNIT-01" data-was-processed="true" data-aos="fade-up">
                                </figure>
                                
                                <div id="myModalimg" class="img-modal">
                                    <span class="img-close">&times;</span>
                                    <img class="img-modal-content" id="img01">
                                </div>
                                
                            </section>
                        </div>
                    </div>
                </div>            
            </div>


    </div>
</section>




<!-- Site plan Section End -->

<!-- Project Images section Start -->

<section class="project-image-sec">
    <h2 data-aos="fade-up"> Our Project Images </h2>
    <div class="project-image-wrapper">
        <div class="project-image-swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="project-image-swiper-img">
                                <img src="./img/pristine/our-project-image1.jpg" class="img-fluid">
                            </div>
                        </div>                       
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="project-image-swiper-img">
                                <img src="./img/pristine/our-project-images2.jpg" class="img-fluid">
                            </div>
                        </div>                        
                    </div>
                </div>
            </div>
        </div>


        <div class="project-image-controls">
                    <span class="project-image-prev">                     
                        <svg width="10px" height="14px" viewBox="0 0 10 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <title>Path 5</title>
                            <g id="Final-developed" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="Apartment-1-Copy" transform="translate(-210.000000, -6588.000000)" stroke="#fff" stroke-width="2">
                                    <g id="Group-9-Copy-4" transform="translate(190.000000, 6571.000000)">
                                        <polyline id="Path-5" points="28.453125 17.6933594 21.6464844 24 28.453125 30.3066406"></polyline>
                                    </g>
                                </g>
                            </g>
                        </svg>                  
                  </span>
                    <span class="project-image-next">
                      
                        <svg width="9px" height="14px" viewBox="0 0 9 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <title>Path 5 Copy</title>
                            <g id="Final-developed" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="Apartment-1-Copy" transform="translate(-260.000000, -6588.000000)" stroke="#fff" stroke-width="2">
                                    <g id="Group-9-Copy-4" transform="translate(190.000000, 6571.000000)">
                                        <polyline id="Path-5-Copy" transform="translate(74.049805, 24.000000) rotate(-180.000000) translate(-74.049805, -24.000000) " points="77.453125 17.6933594 70.6464844 24 77.453125 30.3066406"></polyline>
                                    </g>
                                </g>
                            </g>
                        </svg>       
                </span>
                <div class="project-image-bar">
                        <span class="project-image-progress"></span>
                </div>
        </div>
    </div>
</section>
<!-- Project Images section End -->

<!-- Highlights Section Start -->
<section class="project-highlights ivory-background">
    <div class="container-fluid common-wrapper">
        <h2 data-aos="fade-up">OUR HIGHLIGHTS </h2>

        <div class="grid" data-aos="fade-up">
            <div class="grid-section parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                <div class="in">
                    <img class="lazy loaded" src="img/pristine/mongolian-yurts.svg" data-src="img/pristine/mongolian-yurts.svg" alt="ONSITE GYM" data-was-processed="true">
                    MONGOLIAN YURTS
                </div>
            </div>
            <div class="grid-section parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                <div class="in">
                    <img class="lazy loaded" src="img/pristine/interiors-ikea.svg" data-src="img/pristine/interiors-ikea.svg" alt="SWIMMING POOL" data-was-processed="true">
                    INTERIORS BY IKEA
                </div>
            </div>
            <div class="grid-section parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                <div class="in">
                <img class="lazy loaded" src="img/pristine/roi.svg" data-src="img/pristine/roi.svg" alt="ROOF TERRACE" data-was-processed="true">
                    ASSURED ROI
                </div>
            </div>
            <div class="grid-section parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                <div class="in">
                <img class="lazy loaded" src="img/pristine/property-management.svg" data-src="img/pristine/property-management.svg" alt="SKY LOUNGE BAR" data-was-processed="true">
                    PROPERTY MANAGEMENT
                </div>
            </div>
            <div class="grid-section parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                <div class="in">
                    <img class="lazy loaded" src="img/pristine/house-keeping.svg" data-src="img/pristine/house-keeping.svg" alt="GAMES ROOM" data-was-processed="true">
                    HOUSEKEEPING
                </div>
            </div>
        </div>
    </div>


</section>


<!-- Highlights Section End -->

<!-- Download Brouchure Section Start -->

<section class="download-brouchure-sec green-background">
    <div class="container-fluid common-wrapper">
        <div class="row" data-aos="fade-up">
            <div class="col-lg-12">
                <h2 class="columns-text-image__content parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>READY TO DOWNLOAD
                    <span class="arandelle gold"> Brouchure </span> 
                </h2>
                <div class="brouchure-button-div parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                    <a type="button" href="#" class="elephantine_button white">Download</a>
                </div> 
            </div>
        </div>
    </div>
</section>
<!-- Download Brouchure Section End -->

<!-- Location Section Start -->
<section class="location-sec">

    <h2 data-aos="fade-up">OUR LOCATION </h2>
    
    <!-- <div class="container-fluid common-wrapper"> -->
        <div class="row" data-aos="fade-up">
            <div class="col-lg-12">
                <div class="google-maps">
                    <!--<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15550.056462285429!2d80.2519977!3d13.0028992!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xe041d2052d2d3426!2sElephantine%20Enterprises%20Private%20Limited!5e0!3m2!1sen!2sin!4v1675664476575!5m2!1sen!2sin" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>-->
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13012.652686186288!2d80.1021426031278!3d12.401745411235893!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5309c4ffffffff%3A0x72fd0abda7a8a73f!2sPristine%20Bay%20by%20Elephantine!5e0!3m2!1sen!2sin!4v1677839681914!5m2!1sen!2sin" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
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
                url: './pristine_form.php',
                type:'POST',
                data:  {
                    name: $('#name').val(),
                    phone: $('#phone').val(),    
                    email: $('#email').val(),                                                   
                    comment: $('#comment').val(),
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
var modal = document.getElementById("myModalimg");
var img = document.getElementById("myImg");
var modalImg = document.getElementById("img01");

img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;
}
var span = document.getElementsByClassName("img-close")[0];

span.onclick = function() { 
  modal.style.display = "none";
}
</script>


<?php 
include 'inc/footer.php' 
?>