<?php include 'inc/meta.php' ?>

<!-- Banner Section strats -->
<div class="banner banner--aboutpage" id="about-content">    
    <div class="banner--with-image__content">
        <div class="about-container">            
            <div class="about-banner-heading parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                <h1 class="spartanBold" data-aos="fade-up">About Us</h1>
                <h3 class="arandelle gold" data-aos="fade-up">Design and Architecture</h3>
            </div>
            <div class="about-us-btn-group" data-aos="fade-up">
                <a href="about-us.php#who-we-are-sec" data-scroll="" class="banner--with-image__link"> Who we are </a>
                <a href="about-us.php#about-our-mission" data-scroll="" class="banner--with-image__link"> Our mission </a>
                <a href="about-us.php#our-vision-sec" data-scroll="" class="banner--with-image__link"> Our vision </a>              
                <a href="about-us.php#about-careers" data-scroll="" class="banner--with-image__link"> Careers </a>
            </div>

        </div>
                
       
                <div class="banner--with-image__image">
                    <div class="banner--with-image__image--wrapper">       
                            <img data-src="img/aboutus/about-us-banner-image.jpg" src="img/aboutus/about-us-banner-image.jpg" alt="banner-img"
                                        class=" lazyloaded" data-aos="fade-up">                        
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
</div>
<!-- Banner Section ends -->

<section class="about-banner-content">
    <div class="container-fluid common-wrapper">
        <div class="about-content-para" data-aos="fade-up">
             <p class="elephantine_paragraph">Connecting you to the living terrain 
                around you through architecturally innovative and aesthetically pleasing 
                spaces that enhance your quality of life. </h3>
        </div>
        
    </div>
</section>


<!-- Who we are section start -->
<section class="who-we-are-sec" id="who-we-are-sec">
    <div class="container-fluid common-wrapper">
        <div class="row">
            <div class="col-lg-6 col-md-6">
                <div class="who-we-are-sec-content" data-aos="fade-right">
                    <div class="who-we-are-sec-content-img">
                         <img src="img/aboutus/who-we-are-left.jpg" class="img-fluid parallax-move"  data-parallax-content='{"shift": 20, "duration": 1}'/>
                    </div>
                    <div class="who-we-are-sec-content-para">
                         <p class="elephantine_paragraph parallax-move" data-parallax-content='{"shift": 20, "duration": 1}'>Our team of professionals are well-versed in the latest technologies
                         and industry trends, ensuring that our projects are always up-to-date and cutting-edge. We use our combined experience and expertise to create designs that are both 
                         aesthetically pleasing and highly functional. We strive to provide solutions that are tailored to our clients’ individual needs and budgets, while also staying within 
                         industry regulations. At Elephantine, we believe that our projects should be more than just a building; they should be a reflection of our clients’ vision and an embodiment 
                         of the spirit of the community. We strive to create projects that are sustainable, energy-efficient and environmentally friendly. We are committed to creating projects that
                         add value to the community and ensure the longevity of our clients’ investments.</p>
                    </div>
                </div>
            </div>
            
            <div class="col-lg-6 col-md-6">
                <div class="who-we-are-sec-content2" data-aos="fade-left">
                    <h3 class="gold parallax-move" data-parallax-content='{"shift": 20, "duration": 1}'>WHO WE ARE</h3>
                    <p class="elephantine_paragraph parallax-move" data-parallax-content='{"shift": 20, "duration": 1}'>Founded in 2012, we are a team of innovative and creative 
                    professionals who are passionate about creating spaces that positively impact the lives of our clients and the communities in which they live. Transforming spaces
                    into hubs of paradise that evoke a sense of belonging is our forte. We are attuned to the nuances of the land that surrounds us and aspire to create living spaces
                    that cater to your every need and surpass your every expectation. At Elephantine, we foray into the world of commercial, retail and residential spaces, plot development,
                    hospitality and entertainment. Land is our bread & butter, and we aspire to enhance any space to suit our clients' needs.</p>
                    
                     <div class="who-we-are-sec-content-img2">
                     <img src="img/aboutus/who-we-are-right.jpg" class="img-fluid parallax-move"  data-parallax-content='{"shift": 20, "duration": 1}'/>
                </div>
                </div>
               
            </div>
        </div>

    
    
    </div>
    
    
</section>
<!-- Who we are section end -->



<!-- Our Mission Section Start -->
<section class="about-our-mission" id="about-our-mission">
            <div class="container-fluid common-wrapper">
                <div class="row">
                    <div class="col col-12 col-lg-6 d-flex flex-column flex-lg-column-reverse no-title no-top-title">
                        <div class="columns-text-image__img" data-aos="fade-right"> 
                            <!-- <i style="display: block; padding-bottom: 128.73326467559%;"></i>  -->
                                <picture> 
                                    <source data-srcset="img/aboutus/our-mission.jpg" media="(max-width: 1024px)" srcset="img/aboutus/our-mission.jpg"> 
                                    <img data-src="img/aboutus/our-mission.jpg" src="img/aboutus/our-mission.jpg" alt="Elora Hardy portrait photo." class="lazyloaded parallax-move" data-parallax-content='{"shift": 20, "duration": 1}'>
                                 </picture>
                                </div>    
                            </div>
                        
                            <div class="col col-12 col-lg-6 d-flex flex-column image-first no-title no-top-title">
                            <div class="columns-text-image__content" data-aos="fade-left">
                                    <h2 class="columns-text-image__content--title gold">Our Mission </h2>
                                    
                                    <div class="columns-text-image__content--description on-scroll scroll-init in-view">
                                        <p class="elephantine_paragraph parallax-move" data-parallax-content='{"shift": 20, "duration": 1}'>Our mission is to design aesthetically pleasing and comfortable spaces 
                                        that meet the desires and needs of our customers. We strive to use the property’s features to its fullest potential, ensuring that the spaces we create are both functional 
                                        and visually appealing. We prioritize customer satisfaction and will work with our customers to create a space that they are happy with. We are committed to helping our 
                                        customers make the most out of their space, providing them with a comfortable and enjoyable living experience.</p>
                                       
                                        </div>                                        
                                </div>
                            </div>
                        </div>
                    </div>


</section>
<!-- Our Mission Section End -->

<!-- Our Vision Section start -->
<section class="our-vision-sec" id="our-vision-sec">
            <div class="container-fluid common-wrapper">
                <div class="row">
                    <div class="col col-12 col-lg-6 d-flex flex-column flex-lg-column-reverse no-title no-top-title" image-parallax="slideup" style="transform: translate(0%, -1.4518%) translate3d(0px, 0px, 0px);">
                                <div class="columns-text-image__content" data-aos="fade-right">
                                    <h2 class="columns-text-image__content--title gold">Our Vision </h2>                                 
                                    
                                    <div class="columns-text-image__content--description on-scroll scroll-init in-view">
                                        <p class="elephantine_paragraph parallax-move" data-parallax-content='{"shift": 20, "duration": 1}'>We envision building world-class communities in local landscapes by creating aesthetically pleasing living 
                                        spaces that inspire people to live life to the fullest. We will strive to design and construct beautiful and functional living spaces, while also preserving and enhancing the natural 
                                        beauty of the local landscape. We will use the latest technology, materials and design principles to create communities that are attractive, efficient, and comfortable. We will focus on
                                        sustainability and creating a sense of community by integrating green spaces, recreational areas and other amenities into the plans. We will also strive to create an environment that encourages
                                        collaboration, learning and innovation in order to create a vibrant and inspiring atmosphere for our residents.
                                        </p>
                                        
                                       
                                        </div>                                        
                                </div> 
                    </div>
                        
                    <div class="col col-12 col-lg-6 d-flex flex-column image-first no-title no-top-title" image-parallax="slidedown" style="transform: translate(0%, 1.4518%) translate3d(0px, 0px, 0px);">
                                <div class="columns-text-image__img" data-aos="fade-left"> 
                                <!-- <i style="display: block; padding-bottom: 128.73326467559%;"></i>  -->
                                    <picture> 
                                        <source data-srcset="img/aboutus/our-vision.jpg" media="(max-width: 1024px)" srcset="img/aboutus/our-vision.jpg"> 
                                        <img data-src="img/aboutus/our-vision.jpg" src="img/aboutus/our-vision.jpg" alt="Elora Hardy portrait photo." class="lazyloaded parallax-move" data-parallax-content='{"shift": 20, "duration": 1}'>
                                    </picture>
                                    </div>
                    </div>
                </div>
            </div>


</section>

<!-- Our Vision Section end -->


<!-- Careers Section start -->
<section class="about-careers ivory-background" id="about-careers">
    <div class="container-fluid common-wrapper">
        <div class="row"> 
            <div class="col-md-4" >
                <div class="careers-role-left parallax-move" data-parallax-content='{"shift": 40, "duration": 3}' >
                    <h3 class="role-heading heading" data-aos="fade-right">Want to work with us?</h3>
                    <p class="elephantine_paragraph" data-aos="fade-right">At Elephantine, we encourage young talent to reach new heights of potential
                         and expert professionals to surpass their previous achievements. If you are interested in joining our 
                         dedicated team, apply now! </p>                    
                    
                     <a href="#" class="elephantine_button" data-aos="fade-right">APPLY NOW</a>
                </div>

                
            </div>
            <div class="col-md-8">
                <div class="careers-role-right parallax-move" data-parallax-content='{"shift": 40, "duration": 3}' >
                    <h3 class="role-heading heading" data-aos="fade-left">Position</h3>
                        <ul data-aos="fade-left">
                            <li>
                                <input type="checkbox" checked="">
                                <i></i>
                               
                                <h5>Branch Manager</h5>
                                <p class="elephantine_paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
                                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
                                    ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                     Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                
                                
                            </li>
                            <li>
                                <input type="checkbox" checked="">
                                <i></i>
                                <h5>Office Admin</h5>
                                <p class="elephantine_paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                     incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                                     ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                                    sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </li>        
                            <li>
                                <input type="checkbox" checked="">
                                <i></i>
                                <h5>System Admin</h5>
                                <p class="elephantine_paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                     incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                                     ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                                    sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </li>       
                            <li>
                                <input type="checkbox" checked="">
                                <i></i>
                                <h5>Accountant</h5>
                                <p class="elephantine_paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                     incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                                     ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                                    sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                
                            </li>                  
                        </ul>
                 
                    
                </div>
                
            </div>
        </div>
    </div>
</section>



<!-- Careers Section End -->

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