<?php include 'inc/meta.php' ?>

<!-- Banner Section Start -->
<section class="banner vision-venture-banner">
    <div class="overlay"></div>
    <div class="form-div">
        <div class="container-fluid form-div-container">
            <div class="row form-div-row">
                <div class="col-md-12">
                    <div class="form-div-content parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                        <h1 class="spartanBold" data-aos="fade-right">Dedicated to diversifying our portfolio with these ventures for the future</h1>
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
                                                <source data-srcset="./img/home/Assets-03.jpg" media="(max-width: 1024px)" srcset="./img/home/Assets-03.jpg"> 
                                                <img data-src="./img/home/Assets-03.jpg" src="./img/home/Assets-03.jpg" alt="Elora Hardy portrait photo." class="lazyloaded parallax-move" data-parallax-content='{"shift": 20, "duration": 1}'>
                                            </picture>
                                    </div>  
                                    
                                    
                                </div>
                            
                                <div class="col-md-6 d-flex flex-column image-first no-title no-top-title" image-parallax="slidedown" style="transform: translate(0%, 1.4518%) translate3d(0px, 0px, 0px);">
                                    
                                    <div class="columns-text-image__content">
                                        <h3>Holiday Homes </h3>
                                        <h2 class="columns-text-image__content--title on-scroll h3 scroll-init in-view">Find the Holiday Home  
                                           <span class="arandelle gold">of your dreams </span> 
                                        </h2>                                  
                                        
                                        <div class="columns-text-image__content--description on-scroll scroll-init in-view">                                           
                                            <p class="elephantine_paragraph">Holiday Homes are an investment opportunity that has seen a resurgence in the past 
                                                few years. They are one of the most popular types of vacation properties. Many 
                                                people don't think about buying a holiday home, but there are many benefits to 
                                                doing so. With the rise of Airbnb and other services, people are now able to rent
                                                 out homes during the summer months, which can offer an increased return on 
                                                 investment.</p>
                                            <a href="holiday-homes.php" type="button" class="elephantine_button">Learn More</a>
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
                                        <h3>Commercial Buildings</h3>
                                        <h2 class="columns-text-image__content--title on-scroll h3 scroll-init in-view">One of the most lucrative  
                                           <span class="arandelle gold"> investment opportunities </span> 
                                        </h2>                                      
                                        
                                        <div class="columns-text-image__content--description on-scroll scroll-init in-view">                                           
                                            <p class="elephantine_paragraph">Commercial buildings are one of the most profitable types of real estate investment opportunity out there. 
                                            Commercial buildings tend to appreciate at about 4% per year, which means that you can make money on your investment even if you own it for only five years.</p>
                                            <a href="commercial-buildings.php" type="button" class="elephantine_button">Learn More</a>
                                        </div>                                        
                                    </div>  
                                </div>
                            
                                <div class="col-md-6 d-flex flex-column image-first no-title no-top-title" image-parallax="slidedown" style="transform: translate(0%, 1.4518%) translate3d(0px, 0px, 0px);">
                                    
                                    <div class="columns-text-image__img parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'> 
                                        <i style="display: block; padding-bottom: 128.73326467559%;"></i> 
                                            <picture> 
                                                <source data-srcset="./img/home/Assets-04.jpg" media="(max-width: 1024px)" srcset="./img/home/Assets-04.jpg"> 
                                                <img data-src="./img/home/Assets-04.jpg" src="./img/home/Assets-04.jpg" alt="Elora Hardy portrait photo." class="lazyloaded parallax-move" data-parallax-content='{"shift": 20, "duration": 1}'>
                                            </picture>
                                    </div>  

                                </div>
                            </div>
                        </div>
</section>
<!-- Specification Section End -->


<section class="future-project-details">
                <div class="container-fluid common-wrapper">
                    <div class="row">
                        <div class="col-md-6 d-flex flex-column flex-lg-column-reverse no-title no-top-title" image-parallax="slideup" style="transform: translate(0%, -1.4518%) translate3d(0px, 0px, 0px);">
                                    <div class="columns-text-image__img"> 
                                        <i style="display: block; padding-bottom: 128.73326467559%;"></i> 
                                            <picture> 
                                                <source data-srcset="./img/home/Assets-05.jpg" media="(max-width: 1024px)" srcset="./img/home/Assets-05.jpg"> 
                                                <img data-src="./img/home/Assets-05.jpg" src="./img/home/Assets-05.jpg" alt="Elora Hardy portrait photo." class="lazyloaded parallax-move" data-parallax-content='{"shift": 20, "duration": 1}'>
                                            </picture>
                                    </div>  
                                    
                                    
                                </div>
                            
                                <div class="col-md-6 d-flex flex-column image-first no-title no-top-title" image-parallax="slidedown" style="transform: translate(0%, 1.4518%) translate3d(0px, 0px, 0px);">
                                    
                                    <div class="columns-text-image__content">
                                        <h3>Logistics & Warehousing</h3>
                                        <h2 class="columns-text-image__content--title on-scroll h3 scroll-init in-view">Tailored to fit the needs 
                                           <span class="arandelle gold">of any business </span> 
                                        </h2>                                  
                                        
                                        <div class="columns-text-image__content--description on-scroll scroll-init in-view">                                         
                                            <p class="elephantine_paragraph">With a wide range of facilities, services, and customizations available, Logistics & Warehousing buildings offer a comprehensive setup that can help companies streamline their operations and increase profitability. 
</p>
                                            <a href="logistics_warehousing.php" type="button" class="elephantine_button">Learn More</a>
                                        </div>                                        
                                    </div>

                                </div>
                            </div>
                        </div>



</section>

<section class="project-specification-sec">
        <div class="container-fluid common-wrapper">
                    <div class="row">
                        <div class="col-md-6 d-flex flex-column flex-lg-column-reverse no-title no-top-title" image-parallax="slideup" style="transform: translate(0%, -1.4518%) translate3d(0px, 0px, 0px);">
                                    
                                    <div class="columns-text-image__content parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                                        <h3>Thematic Projects</h3>
                                        <h2 class="columns-text-image__content--title on-scroll h3 scroll-init in-view">Crafting an immersive and   
                                           <span class="arandelle gold"> visually-pleasing experience </span> 
                                        </h2>                                       
                                        
                                        <div class="columns-text-image__content--description on-scroll scroll-init in-view">                                           
                                            <p class="elephantine_paragraph">Real estate brands are constantly striving to find the right balance between offering quality housing and crafting a vision that potential customers will find attractive. This is done through thematic projects, where developers develop housing projects that are designed around a certain theme.
</p>
                                            <a href="thematic-projects.php" type="button" class="elephantine_button">Learn More</a>
                                        </div>                                        
                                    </div>  
                                </div>
                            
                                <div class="col-md-6 d-flex flex-column image-first no-title no-top-title" image-parallax="slidedown" style="transform: translate(0%, 1.4518%) translate3d(0px, 0px, 0px);">
                                    
                                    <div class="columns-text-image__img parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'> 
                                        <i style="display: block; padding-bottom: 128.73326467559%;"></i> 
                                            <picture> 
                                                <source data-srcset="./img/home/Assets-06.jpg" media="(max-width: 1024px)" srcset="./img/home/Assets-06.jpg"> 
                                                <img data-src="./img/home/Assets-06.jpg" src="./img/home/Assets-06.jpg" alt="Elora Hardy portrait photo." class="lazyloaded parallax-move" data-parallax-content='{"shift": 20, "duration": 1}'>
                                            </picture>
                                    </div>  

                                </div>
                            </div>
                        </div>
</section>

<!--<section class="future-project-details">-->
<!--                <div class="container-fluid common-wrapper">-->
<!--                    <div class="row">-->
<!--                        <div class="col-md-6 d-flex flex-column flex-lg-column-reverse no-title no-top-title" image-parallax="slideup" style="transform: translate(0%, -1.4518%) translate3d(0px, 0px, 0px);">-->
<!--                                    <div class="columns-text-image__img"> -->
<!--                                        <i style="display: block; padding-bottom: 128.73326467559%;"></i> -->
<!--                                            <picture> -->
<!--                                                <source data-srcset="./img/home/Assets-07.jpg" media="(max-width: 1024px)" srcset="./img/home/Assets-07.jpg"> -->
<!--                                                <img data-src="./img/home/Assets-07.jpg" src="./img/home/Assets-07.jpg" alt="Elora Hardy portrait photo." class="lazyloaded parallax-move" data-parallax-content='{"shift": 20, "duration": 1}'>-->
<!--                                            </picture>-->
<!--                                    </div>  -->
                                    
                                    
<!--                                </div>-->
                            
<!--                                <div class="col-md-6 d-flex flex-column image-first no-title no-top-title" image-parallax="slidedown" style="transform: translate(0%, 1.4518%) translate3d(0px, 0px, 0px);">-->
                                    
<!--                                    <div class="columns-text-image__content">-->
<!--                                        <h3>Multi-Level Marketing </h3>-->
<!--                                        <h2 class="columns-text-image__content--title on-scroll h3 scroll-init in-view">The key to establishing -->

<!--                                           <span class="arandelle gold">a loyal customer base</span> -->
<!--                                        </h2>                                       -->
                                        
<!--                                        <div class="columns-text-image__content--description on-scroll scroll-init in-view">                                          -->
<!--                                            <p class="elephantine_paragraph">Multi-Level Marketing (MLM) is a marketing strategy that allows businesses to gain a large customer base and increase their revenue by leveraging the power of an existing network of people. This strategy has become popular in the real estate industry, as it has proven to be an effective and cost-efficient way of expanding a business's clientele.-->
<!--</p>-->
<!--                                            <a href="mlm.php" type="button" class="elephantine_button">Learn More</a>-->
<!--                                        </div>                                        -->
<!--                                    </div>-->

<!--                                </div>-->
<!--                            </div>-->
<!--                        </div>-->



<!--</section>-->

<section class="future-project-details">
                <div class="container-fluid common-wrapper">
                    <div class="row">
                        <div class="col-md-6 d-flex flex-column flex-lg-column-reverse no-title no-top-title" image-parallax="slideup" style="transform: translate(0%, -1.4518%) translate3d(0px, 0px, 0px);">
                                    <div class="columns-text-image__img"> 
                                       <i style="display: block; padding-bottom: 128.73326467559%;"></i> 
                                            <picture> 
                                                <source data-srcset="./img/home/Assets-08.jpg" media="(max-width: 1024px)" srcset="./img/home/Assets-08.jpg"> 
                                                <img data-src="./img/home/Assets-08.jpg" src="./img/home/Assets-08.jpg" alt="Elora Hardy portrait photo." class="lazyloaded parallax-move" data-parallax-content='{"shift": 20, "duration": 1}'>
                                            </picture>
                                    </div>  
                                    
                                    
                                </div>
                            
                                <div class="col-md-6 d-flex flex-column image-first no-title no-top-title" image-parallax="slidedown" style="transform: translate(0%, 1.4518%) translate3d(0px, 0px, 0px);">
                                    
                                    <div class="columns-text-image__content">
                                        <h3>Aggregation</h3>
                                        <h2 class="columns-text-image__content--title on-scroll h3 scroll-init in-view">Make informed decisions with 
 
                                           <span class="arandelle gold"> Real Estate Aggregation  </span> 
                                        </h2>                                       
                                        
                                        <div class="columns-text-image__content--description on-scroll scroll-init in-view">                                           
                                            <p class="elephantine_paragraph">Real estate aggregation offers a wide range of benefits for professionals looking to better understand the market. 
                                            It involves collecting and organising all relevant data, such as property type, location, size, features, and amenities, about a property or portfolio 
                                            of properties. 
</p>
                                            <a href="aggregation.php" type="button" class="elephantine_button">Learn More</a>
                                        </div>                                           
                                    </div>

                                </div>
                            </div>
                        </div>



</section>

<!--<section class="project-specification-sec">-->
<!--        <div class="container-fluid common-wrapper">-->
<!--                    <div class="row">-->
<!--                        <div class="col-md-6 d-flex flex-column flex-lg-column-reverse no-title no-top-title" image-parallax="slideup" style="transform: translate(0%, -1.4518%) translate3d(0px, 0px, 0px);">-->
                                    
<!--                                    <div class="columns-text-image__content parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>-->
<!--                                        <h3>Aggregation</h3>-->
<!--                                        <h2 class="columns-text-image__content--title on-scroll h3 scroll-init in-view">Make informed decisions with -->
 
<!--                                           <span class="arandelle gold"> Real Estate Aggregation  </span> -->
<!--                                        </h2>                                       -->
                                        
<!--                                        <div class="columns-text-image__content--description on-scroll scroll-init in-view">                                           -->
<!--                                            <p class="elephantine_paragraph">Real estate aggregation offers a wide range of benefits for professionals looking to better understand the market. -->
<!--                                            It involves collecting and organising all relevant data, such as property type, location, size, features, and amenities, about a property or portfolio -->
<!--                                            of properties. -->
<!--</p>-->
<!--                                            <a href="aggregation.php" type="button" class="elephantine_button">Learn More</a>-->
<!--                                        </div>                                        -->
<!--                                    </div>  -->
                                    
<!--                                </div>-->
                            
<!--                                <div class="col-md-6 d-flex flex-column image-first no-title no-top-title" image-parallax="slidedown" style="transform: translate(0%, 1.4518%) translate3d(0px, 0px, 0px);">-->
                                    
<!--                                    <div class="columns-text-image__img parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'> -->
<!--                                        <i style="display: block; padding-bottom: 128.73326467559%;"></i> -->
<!--                                            <picture> -->
<!--                                                <source data-srcset="./img/home/Assets-08.jpg" media="(max-width: 1024px)" srcset="./img/home/Assets-08.jpg"> -->
<!--                                                <img data-src="./img/home/Assets-08.jpg" src="./img/home/Assets-08.jpg" alt="Elora Hardy portrait photo." class="lazyloaded parallax-move" data-parallax-content='{"shift": 20, "duration": 1}'>-->
<!--                                            </picture>-->
<!--                                    </div>  -->

<!--                                </div>-->
<!--                            </div>-->
<!--                        </div>-->
<!--</section>-->



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
                    <form action="vision_venture_form.php" method="post" id="contact_form">
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
                url: 'vision_venture_form.php',
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
