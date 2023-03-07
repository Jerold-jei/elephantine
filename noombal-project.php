<?php include 'inc/meta.php' ?>

<!-- Banner Section Start -->
<section class="banner noombal-project-banner projects">
    <div class="overlay"></div>
    <div class="form-div">
        <div class="container-fluid form-div-container">
            <div class="row form-div-row">
                <div class="col-md-6">
                    <div class="form-div-content parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                        <h1 class="spartanBold" data-aos="fade-right">Discover a gated community that combines city life and nature </h1>
                        <h6 data-aos="fade-right">BOOK YOUR VILLA PLOT TODAY!</h6>
                    </div>

                </div>
                <div class="col-md-5">
                    <div class="banner-form-div parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                        <div class="banner-contact-form-div">
                            <form action="noombal_form.php" method="post" id="bliss_banner_form">
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
                                    <div class="columns-text-image__img"> 
                                        <i style="display: block; padding-bottom: 128.73326467559%;"></i> 
                                            <picture> 
                                                <source data-srcset="img/noombal/1_image.jpg" media="(max-width: 1024px)" srcset="img/noombal/1_image.jpg"> 
                                                <img data-src="img/noombal/1_image.jpg" src="img/noombal/1_image.jpg" alt="Elora Hardy portrait photo." class="lazyloaded parallax-move" data-parallax-content='{"shift": 20, "duration": 1}'>
                                            </picture>
                                    </div>  
                                    
                                    
                                </div>
                            
                                <div class="col-md-6 d-flex flex-column image-first no-title no-top-title" image-parallax="slidedown" style="transform: translate(0%, 1.4518%) translate3d(0px, 0px, 0px);">
                                    
                                    <div class="columns-text-image__content">
                                        <h3>The Perfect Safe Haven For You And Your Family!</h3>
                                        <h2 class="columns-text-image__content--title on-scroll h3 scroll-init in-view">Our Project Details 
                                        </h2>
                                       
                                        
                                        <div class="columns-text-image__content--description on-scroll scroll-init in-view">
                                            <p class="elephantine_paragraph">Introducing Noombal Gardenia, a gated township community that combines the advantages 
                                                of city life and the serenity of life amidst nature. At Noombal Gardenia, we 
                                                understand the need for the safety and comfort of our residents. This is why our 
                                                gated community has been equipped with the latest amenities and safety features. 
                                                Whether you're looking to build a brand-new home, or just looking for a comfortable 
                                                place to relax, Noombal Gardenia is the perfect choice. Everything you need is just
                                                 around the corner. </p>
                                            
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
                        <div class="col-md-6 d-flex flex-column flex-lg-column-reverse no-title no-top-title" image-parallax="slideup" style="transform: translate(0%, -1.4518%) translate3d(0px, 0px, 0px);">
                                    
                                    <div class="columns-text-image__content parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                                        <h3>Book Your Premium Villa Plot Today, And Be Part Of The Noombal Gardenia Family!</h3>
                                        <h2 class="columns-text-image__content--title on-scroll h3 scroll-init in-view">Our Project Specifications </h2>
                                        <div class="columns-text-image__content--description on-scroll scroll-init in-view">
                                           
                                            <p class="elephantine_paragraph">Set in a 7.5-acre stretch of land between Iyyappanthangal and Vellapanchavadi, this gated community 
                                            offers you 169 ready-to-build plots and villas that provide you with the perfect combination of city life and the serenity of nature. </p>
                                            <p class="elephantine_paragraph">With over a decade of experience, our team of experts spot potential landscapes and work hard to turn them into opulent and serene gated communities - perfect for Chennai crowd. 
                                                Here, you will enjoy the peacefulness of nature, and the comfort of a safe and secure environment.</p>

                                            </div>                                        
                                    </div>  
                                </div>
                            
                                <div class="col-md-6 d-flex flex-column image-first no-title no-top-title" image-parallax="slidedown" style="transform: translate(0%, 1.4518%) translate3d(0px, 0px, 0px);">
                                    
                                    <div class="columns-text-image__img parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'> 
                                        <i style="display: block; padding-bottom: 128.73326467559%;"></i> 
                                            <picture> 
                                                <source data-srcset="img/noombal/2_image.jpg" media="(max-width: 1024px)" srcset="img/noombal/2_image.jpg"> 
                                                <img data-src="img/noombal/2_image.jpg" src="img/noombal/2_image.jpg" alt="Elora Hardy portrait photo." class="lazyloaded parallax-move" data-parallax-content='{"shift": 20, "duration": 1}'>
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
        <h2 class="parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>EVERTYHING <span class="arandelle gold">  in one place </span> </h2>

        <div class="grid">
            <div class="grid-section parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                <div class="in">
                    <img class="lazy loaded" src="img/noombal/icons-24.svg" data-src="img/projects/gym.svg" alt="ONSITE GYM" data-was-processed="true">
                    BLACKTOP ROADS LINED WITH AVENUES OF TREES 
                </div>
            </div>
            <div class="grid-section parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                <div class="in">
                    <img class="lazy loaded" src="img/noombal/icons-25.svg" data-src="img/projects/glasses.svg" alt="SWIMMING POOL" data-was-processed="true">
                    CHILDREN'S PLAY AREA 
                </div>
            </div>
            <div class="grid-section parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                <div class="in">
                <img class="lazy loaded" src="img/noombal/icons-26.svg" data-src="img/projects/Bloom-RoofTerrace-01.svg" alt="ROOF TERRACE" data-was-processed="true">
                    ARCH FACADE AND SECURITY GATE AT THE ENTRANCE
                </div>
            </div>
            <div class="grid-section parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                <div class="in">
                <img class="lazy loaded" src="img/noombal/icons-27.svg" data-src="img/projects/Bloom-SkyLounge-01.svg" alt="SKY LOUNGE BAR" data-was-processed="true">
                    ZERO-WATERLOGGING PROPERTY DESIGN 
                </div>
            </div>
            <div class="grid-section parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                <div class="in">
                    <img class="lazy loaded" src="img/noombal/icons-28.svg" data-src="img/projects/chess.svg" alt="GAMES ROOM" data-was-processed="true">
                    REFLEXOLOGY WALKWAY
                </div>
            </div>
            <div class="grid-section parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                <div class="in">
                    <img class="lazy loaded" src="img/noombal/icons-29.svg" data-src="img/projects/fork.svg" alt="PRIVATE DINING" data-was-processed="true">
                    OPEN AIR GYM 
                </div>
            </div>
            <div class="grid-section parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                <div class="in">
                    <img class="lazy loaded" src="img/noombal/icons-30.svg" data-src="img/projects/lamp.svg" alt="CO-WORKING SPACE" data-was-processed="true">
                    HIGHRISE COMPOUND WALLS
                </div>
            </div>
            <div class="grid-section parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                <div class="in">
                    <img class="lazy loaded" src="img/noombal/icons-31.svg" data-src="img/projects/book.svg" alt="LIBRARY" data-was-processed="true">
                    RAINWATER HARVESTING 
                </div>
            </div>
            <div class="grid-section parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                <div class="in">
                    <img class="lazy loaded" src="img/noombal/icons-32.svg" data-src="img/projects/chair.svg" alt="MEETING ROOMS" data-was-processed="true">
                    MULTIPLE PARKS 
                </div>
            </div>
            <div class="grid-section parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                <div class="in">
                    <img class="lazy loaded" src="img/noombal/icons-33.svg" data-src="img/projects/dog.svg" alt="PET SPA" data-was-processed="true">
                    BASKETBALL COURT 
                </div>
            </div>
            <div class="grid-section parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                <div class="in">
                    <img class="lazy loaded" src="img/noombal/icons-34.svg" data-src="img/projects/dog.svg" alt="PET SPA" data-was-processed="true">
                    SECURE GATED COMMUNITY 24X7 SURVEILLANCE
                </div>
            </div>
        </div>
    </div>


</section>

<!-- Amenities Section End -->


<!-- Site plan Section Starts -->
<section class="project-site-plan">
    <div class="container-fluid common-wrapper">
        <h2 class="parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'> Site Plan </h2>
        <p class="elephantine_paragraph parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>Expert planning and curation that allows the design to blend seamlessly with its 
            surroundings and create an aesthetically pleasing space</p>

            <div class="slider parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>        
                <div class="carousel flickity-enabled" tabindex="0">  
                    <div class="flickity-viewport" style="height: 541.8px; touch-action: pan-y;">
                        <div class="flickity-slider" style="left: 0px; transform: translateX(0%);">
                            <section class="is-selected" style="position: absolute; left: 0%;">
                                <figure style="opacity: 1; transform: translate(0px, 0px);">
                                    <img class="lazy loaded" src="img/noombal/siteplan.jpg" id="myImg" alt="BLOOM STUDIO UNIT-01" data-was-processed="true">
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
    <h2 class="parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'> Our Project Images </h2>
    <div class="project-image-wrapper">
        <div class="project-image-swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="project-image-swiper-img">
                                <img src="./img/noombal/image_1.jpg" class="img-fluid">
                            </div>
                        </div>                       
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="project-image-swiper-img">
                                <img src="./img/noombal/image_2.jpg" class="img-fluid">
                            </div>
                        </div>                        
                    </div>
                </div>
                 <div class="swiper-slide">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="project-image-swiper-img">
                                <img src="./img/noombal/image_3.jpg" class="img-fluid">
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
        <h2 class="parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>OUR HIGHLIGHTS </h2>

        <div class="grid">
            <div class="grid-section parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                <div class="in">
                    <img class="lazy loaded" src="img/noombal/icons-36.svg" data-src="img/projects/highlight1.svg" alt="ONSITE GYM" data-was-processed="true">
                    LOCATED JUST 500 METERS FROM POONAMALLE HIGH ROAD 
                </div>
            </div>
            <div class="grid-section parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                <div class="in">
                    <img class="lazy loaded" src="img/noombal/icons-37.svg" data-src="img/projects/highlight2.svg" alt="SWIMMING POOL" data-was-processed="true">
                        LUSH GREEN AMBIENCE WITH AN AVENUE OF TREES AND GARDENS
                </div>
            </div>
            <div class="grid-section parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                <div class="in">
                <img class="lazy loaded" src="img/noombal/icons-38.svg" data-src="img/projects/highlight3.svg" alt="ROOF TERRACE" data-was-processed="true">
                   20 MINS AWAY FROM ANNA NAGAR AND VR MALL
                </div>
            </div>
            <div class="grid-section parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                <div class="in">
                <img class="lazy loaded" src="img/noombal/icons-39.svg" data-src="img/projects/highlight4.svg" alt="SKY LOUNGE BAR" data-was-processed="true">
                    EXCELLENT GROUND WATER TABLE WITH ABUNDANT WATER AT JUST 35 FT
                </div>
            </div>
            <div class="grid-section parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                <div class="in">
                    <img class="lazy loaded" src="img/noombal/icons-40.svg" data-src="img/projects/highlight5.svg" alt="GAMES ROOM" data-was-processed="true">
                    SAFE, SERENE AND A POLLUTION-FREE LIFESTYLE 
                </div>
            </div>
            <!--<div class="grid-section parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>-->
            <!--    <div class="in">-->
            <!--        <img class="lazy loaded" src="img/noombal/icons-41.svg" data-src="img/projects/highlight6.svg" alt="PRIVATE DINING" data-was-processed="true">-->
            <!--        AT LEAST 25% LAND VALUE APPRECIATION IN THE NEXT 5 YEARS-->
            <!--    </div>-->
            <!--</div>-->
        </div>
    </div>


</section>


<!-- Highlights Section End -->

<!-- Download Brouchure Section Start -->

<section class="download-brouchure-sec green-background">
    <div class="container-fluid common-wrapper">
        <div class="row">
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
    <h2 class="parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>OUR LOCATION </h2>
    <!-- <div class="container-fluid common-wrapper"> -->
        <div class="row">
            <div class="col-lg-12">
                <div class="google-maps">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15546.754620137965!2d80.1326059!3d13.0554792!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526162bbdae707%3A0xd4efc4ed86cfa104!2sNoombal%20Gardenia%20by%20Elephantine!5e0!3m2!1sen!2sin!4v1677839442210!5m2!1sen!2sin" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
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
                url: './noombal_form.php',
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