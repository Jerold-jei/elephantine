<?php include 'inc/meta.php' ?>

<!-- Banner Section start -->
<div class="banner--homepage" id="main-content">    
    <div class="banner--homepage__background">

        <div class="swiper banner--homepage__swiper main-banner-swiper"  data-duration=" ">
            <div class="swiper-wrapper">              

                <div class="swiper-slide">
                    <picture>
                        <source data-srcset="img/new/bliss-in-town-property-img-banner.jpg" srcset="img/new/bliss-in-town-property-img-banner.jpg">
                        <img data-src="img/new/bliss-in-town-property-img-banner.jpg" src="img/new/bliss-in-town-property-img-banner" alt="banner-img" 
                            class=" lazyloaded">
                    </picture>
                    <div class="overlay"></div>
                    <div class="row">
                        <div class="col-lg-12">
                       <div class="banner--homepage__content">
                        <h1
                            class="banner--homepage__content--title xl animation-trigger words chars splitting show animation-running spartanBold">
                            Ready-to-construct plots starting from INR 23 lakhs
                        </h1>                       
                        <a href="bliss-project.php" class="elephantine_banner_button">KNOW MORE</a>
                        </div>
                    </div>
                    </div>
                </div>

                <div class="swiper-slide">
                    <picture>
                        <source data-srcset="img/new/noombal-gardenia-property-img-banner.jpg" srcset="img/new/noombal-gardenia-property-img-banner.jpg">
                        <img data-src="img/new/noombal-gardenia-property-img-banner.jpg" src="img/new/noombal-gardenia-property-img-banner.jpg" alt="banner-img"
                            class=" lazyloaded">
                    </picture>
                    <div class="overlay"></div>
                    <div class="row">
                        <div class="col-lg-12">
                       <div class="banner--homepage__content">
                        <h1
                            class="banner--homepage__content--title xl animation-trigger words chars splitting show animation-running spartanBold">
                            Escape into a world of luxury with our secured community
                        </h1>                     
                        <a href="noombal-project.php" class="elephantine_banner_button">KNOW MORE</a>
                        </div>
                       </div>
                    </div>
                </div>     
                
                <div class="swiper-slide">                   
                    <video autoplay muted loop class="banner-video">
                        <source src="./img/video/Elephantine-Banner-Video2.mp4" type="video/mp4">
                    </video>
                    <div class="overlay"></div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="banner--homepage__content"> 
                            <h1
                                class="banner--homepage__content--title xl animation-trigger words chars splitting show animation-running spartanBold">
                                One-of-a-kind luxury villas with a scenic beach view
                            </h1>                          
                            <a href="pristine-project.php" class="elephantine_banner_button">KNOW MORE</a>
                            </div>
                        </div>
                    </div> 
                </div>
                
            </div>
        </div>
         
        
    </div>
    <!-- Add Pagination -->
            <div class="banner-controls">
                <div class="banner-swiper-pagination"></div>
          </div>
    <div class="banner-social-links-div">
            <a href="https://www.facebook.com/ElephantineEnterprises"><i class="fa fa-facebook"></i></a>                      
            <a href="https://www.instagram.com/elephantineenterprises/?next=%2F"><i class="fa fa-instagram"></i></a> 
            <a href="#"><i class="fa fa-envelope"></i></a>                       
    </div>
    
    <!-- <div class="sticky-btn">
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
     -->

    <!-- <div id="feedback-form" class="feedback-form">	
	    <a href="#" class="feedback-form-btn" id="OpenForm">Refer A Friend</a>  
    <div class="feedback_form_area">
        <div class="feedback_form_area_inner">
            <h3>Refer A Friend</h3>
            
            <form action="./refer_form.php" method="post" id="refer_form">
            
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
	
	</div> -->

    <?php include 'inc/refer_friend.php' ?>

    

</div>

<!-- Banner Section end -->

<!-- About Us Section start -->
<section class="elephantine-aboutus-sec" id="main-content">
            <div class="about-sec-elephant-img right-side-img" data-aos="fade-left">
                <picture>
                    <source data-srcset="img/new/Elephantine_Website_Assets-02.jpg" media="(max-width: 1024px)" srcset="img/new/Elephantine_Website_Assets-02.jpg">
                    <img data-src="img/new/Elephantine_Website_Assets-02.jpg" src="img/new/Elephantine_Website_Assets-02.jpg">
                </picture>
            </div>
    <div class="about-head parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
        <h1>About Us</h1>
    </div>
    <div class="container-fluid common-wrapper">

        <div class="row">
            <div class="col-md-6" image-parallax="slideup">
                <div class="about-left-content">
                    <div class="about-left-img">
                        <img src="img/new/Elephantine_Website_Assets-01.jpg" class="img-fluid parallax-move" />

                    </div>
                    <div class="about-content-div">
                        <p class="elephantine_paragraph parallax-move">With over a decade of experience, Elephantine takes elegant 
                        innovation in a new direction, where we aim to provide people with living spaces that transcend the boundaries
                        of luxury and opulence. With three projects in the pipeline and more on the way, we at Elephantine look towards 
                        raising the bar of the realty sector in Chennai.</p>

                        <a href="about-us.php" class="elephantine_button">KNOW MORE</a>
                    </div>
                </div>
            </div>
            <div class="col-md-6 about-right-content-col" image-parallax="slidedown">
                <div class="about-right-content">

                    <div class="about-right-content-div">
                        <p class="elephantine_paragraph parallax-move">True to its name, Elephantine hopes to stand steadfast in 
                        people’s minds as a precursor of majestic grandeur, bringing aesthetically pleasing and intricately 
                        sophisticated lifestyles to communities all around. </p>
                       
                        <div class="aboutusimg">                           
                                <img src="img/new/Elephantine_Website_Assets-12.jpg" class="img-fluid videoImage parallax-move">
                                
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Home Our Project Section start -->
<section class="home-our-project green-background">
    <div class="container-fluid common-wrapper">
            <div class="center_head-div parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                <h6>LIVE LIFE IN A UTOPIC PARADISE AT</h6>
                <h1>ELEPHANTINE</h1>
            </div>

            <div class="project-sec-leaf-img left-img" data-aos="fade-down">
                <picture>
                    <source data-srcset="img/leaf/deco-mob-1-md.png" media="(max-width: 1024px)" srcset="img/leaf/deco-mob-1-md.png">
                    <img data-src="img/leaf/deco-mob-1-md.png" src="img/leaf/deco-mob-1-md.png" class="parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                </picture>
            </div>
            <div class="project-sec-leaf-img right-img" data-aos="fade-down">
                <picture>
                    <source data-srcset="img/leaf/deco-7-lg.png" media="(max-width: 1024px)" srcset="img/leaf/deco-7-lg.png">
                    <img data-src="img/leaf/deco-7-lg.png" src="img/leaf/deco-7-lg.png" class="parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                </picture>
            </div>

            <div class="project-sec-leaf-img right-center-img" data-aos="fade-down">
                <picture>
                    <source data-srcset="img/leaf/deco-3-lg.png" media="(max-width: 1024px)" srcset="img/leaf/deco-3-lg.png">
                    <img data-src="img/leaf/deco-3-lg.png" src="img/leaf/deco-3-lg.png" class="parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                </picture>
            </div>

            <div class="project-sec-leaf-img right-end-img" data-aos="fade-down">
                <picture>
                    <source data-srcset="img/leaf/deco-mob-3-md.png" media="(max-width: 1024px)" srcset="img/leaf/deco-mob-3-md.png">
                    <img data-src="img/leaf/deco-mob-3-md.png" src="img/leaf/deco-mob-3-md.png" class="parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                </picture>
            </div>

            <div class="project-sec-leaf-img right-bottom-end-img" data-aos="fade-down">
                <picture>
                    <source data-srcset="img/leaf/deco-4-lg.png" media="(max-width: 1024px)" srcset="img/leaf/deco-4-lg.png">
                    <img data-src="img/leaf/deco-4-lg.png" src="img/leaf/deco-4-lg.png" class="parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                </picture>
            </div>

            <div class="project-sec-leaf-img left-bottom-end-img" data-aos="fade-down">
                <picture>
                    <source data-srcset="img/leaf/deco-mob-4-md.png" media="(max-width: 1024px)" srcset="img/leaf/deco-mob-4-md.png">
                    <img data-src="img/leaf/deco-mob-4-md.png" src="img/leaf/deco-mob-4-md.png" class="parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                </picture>
            </div>


        <div class="our-project-swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="swiper-img">
                                <a href="bliss-project.php">
                                     <img src="img/new/Elephantine_Website_Assets-03.jpg" class="img-fluid">
                                </a>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="project-swiper-content">
                                <h3 class="white spartanBold">OUR</h3>
                                <h1 class="gold spartanBold"> PROJECTS</h1>
                                <span>01</span>
                                <h3 class="white spartanBold">BLISS IN THE TOWN</h3>
                                <p class="white elephantine_paragraph">
                                Bliss in the Town is an illustrious attempt at creating a highly-functional community
                                </p>
                                <a href="bliss-project.php" class="elephantine_banner_button">KNOW MORE</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="swiper-img">
                                <a href="noombal-project.php">
                                <img src="img/new/Elephantine_Website_Assets-03.jpg" class="img-fluid">
                                </a>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="project-swiper-content">
                                <h3 class="white spartanBold">OUR</h3>
                                <h1 class="gold spartanBold"> PROJECTS</h1>
                                <span>02</span>
                                <h3 class="white spartanBold">NOOMBAL GARDENIA</h3>
                                <p class="white elephantine_paragraph">
                                Introducing a gated township community that combines the advantages of city life and the serenity of life amidst nature
                                </p>
                                <a href="noombal-project.php" class="elephantine_banner_button">KNOW MORE</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="swiper-img">
                                <a href="future-projects.php">
                                <img src="img/new/Elephantine_Website_Assets-03.jpg" class="img-fluid">
                                </a>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="project-swiper-content">
                                <h3 class="white spartanBold">OUR</h3>
                                <h1 class="gold spartanBold">PROJECTS</h1>
                                <span>03</span>
                                <h3 class="white spartanBold">PRISTINE BAY</h3>
                                <p class="white elephantine_paragraph">
                                Welcome to the perfect spot for homeowners looking to enjoy a vacation alongside the beach, with several fun activities to keep you engaged!
                                </p>
                                <a href="pristine-project.php" class="elephantine_banner_button">KNOW MORE</a>
                            </div>
                        </div>
                    </div>
                </div> 
                <div class="swiper-slide">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="swiper-img">
                                <a href="future-projects.php">
                                <img src="img/new/Elephantine_Website_Assets-03.jpg" class="img-fluid">
                                </a>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="project-swiper-content">
                                <h3 class="white spartanBold">OUR</h3>
                                <h1 class="gold spartanBold">PROJECTS</h1>
                                <span>04</span>
                                <h3 class="white spartanBold">FUTURE PROJECTS</h3>
                                <p class="white elephantine_paragraph">
                                Elephantine welcomes you to look forward to the new projects we have in the pipeline
                                </p>
                                <a href="future-projects.php" class="elephantine_banner_button">KNOW MORE</a>
                            </div>
                        </div>
                    </div>
                </div> 
                
            </div>
        </div>


        <div class="controls">
            <div class="project-swiper-pagination">
            </div>                    
        </div>
    </div>
</section>


<!-- Home Our Vision Section Style -->
<section class="home-our-vision">
    <div class="home-our-vision-div">

            <div class="home-our-vision-sec-leaf-img left-img" data-aos="fade-down">
                <picture>
                    <source data-srcset="img/leaf/deco-8-lg.png" media="(max-width: 1024px)" srcset="img/leaf/deco-8-lg.png">
                    <img data-src="img/leaf/deco-8-lg.png" src="img/leaf/deco-8-lg.png" class="parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                </picture>
            </div>
            <div class="home-our-vision-sec-leaf-img right-img" data-aos="fade-down">
                <picture>
                    <source data-srcset="img/leaf/deco-5-lg.png" media="(max-width: 1024px)" srcset="img/leaf/deco-5-lg.png">
                    <img data-src="img/leaf/deco-5-lg.png" src="img/leaf/deco-5-lg.png" class="parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                </picture>
            </div>

            <div class="home-our-vision-sec-leaf-img left-corner-img" data-aos="fade-down">
                <picture>
                    <source data-srcset="img/leaf/deco-mob-2-md.png" media="(max-width: 1024px)" srcset="img/leaf/deco-mob-2-md.png">
                    <img data-src="img/leaf/deco-mob-2-md.png" src="img/leaf/deco-mob-2-md.png" class="parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                </picture>
            </div>

            <div class="home-our-vision-sec-leaf-img bottom-center-img" data-aos="fade-down">
                <picture>
                    <source data-srcset="img/leaf/deco-2-lg.png" media="(max-width: 1024px)" srcset="img/leaf/deco-2-lg.png">
                    <img data-src="img/leaf/deco-2-lg.png" src="img/leaf/deco-2-lg.png" class="parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                </picture>
            </div>

            <div class="home-our-vision-sec-leaf-img right-corner-img" data-aos="fade-down">
                <picture>
                    <source data-srcset="img/leaf/deco-1-lg.png" media="(max-width: 1024px)" srcset="img/leaf/deco-1-lg.png">
                    <img data-src="img/leaf/deco-1-lg.png" src="img/leaf/deco-1-lg.png" class="parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                </picture>
            </div>



        <div class="home-our-vision-heading parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
            <h1 class="spartanBold">OUR VISION</h1>
            <h3 class="arandelle gold">Ventures</h3>

        </div>
            

        <div class="row">
            <div class="col-md-6">
                <div class="text-content">
                   <a href="holiday-homes.php"><h1 class="text-1" id="text-1">HOLIDAY HOMES</h1></a>
                    <a href="commercial-buildings.php"><h1 class="text-2">COMMERCIAL BUILDINGS</h1></a>
                    <a href="logistics-warehousing.php"><h1 class="text-3">LOGISTICS & WAREHOUSING</h1></a>
                    <a href="thematic-projects.php"><h1 class="text-4">THEMATIC PROJECTS</h1></a>
                    <a href="mlm.php"><h1 class="text-5">MULTI-LEVEL MARKETING </h1></a>
                    <a href="aggregation.php"><h1 class="text-6">AGGREGATION </h1></a>
                </div>
            </div>
            <div class="col-md-6">
                <div class="image-content">
                    <img src="./img/home/Assets-03.jpg"  id="image1">
                    <img src="./img/home/Assets-04.jpg"  id="image2">
                    <img src="./img/home/Assets-05.jpg"  id="image3">
                    <img src="./img/home/Assets-06.jpg"  id="image4">
                    <img src="./img/home/Assets-07.jpg"  id="image5">
                    <img src="./img/home/Assets-08.jpg"  id="image6">
                    
                </div>
            </div>
        </div>
    </div>
</section>






<section class="scroller style--1">
    <div class="items">
      <h2><span>"LIFESTYLE BEYOND LANDSCAPES </h2>
      <h2><span>LIVING BEYOND EXPECTATIONS"</h2>
    </div>
  
</section>

<section class="land-owner-sec">

            <div class="land-owner-sec-leaf-img right-img" data-aos="fade-down">
                <picture>
                    <source data-srcset="img/deco-1-md.png" media="(max-width: 1024px)" srcset="img/deco-1-md.png">
                    <img data-src="img/deco-1-md.png" src="img/deco-1-md.png" class="parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                </picture>
            </div>
            <div class="land-owner-sec-leaf-img bottom-img" data-aos="fade-down">
                <picture>
                    <source data-srcset="img/deco-2-md.png" media="(max-width: 1024px)" srcset="img/deco-2-md.png">
                    <img data-src="img/deco-2-md.png" src="img/deco-2-md.png" class="parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                </picture>
            </div>
            <div class="land-owner-sec-elephant-img right-bottom-img" data-aos="fade-down">
                <picture>
                    <source data-srcset="img/new/Elephantine_Website_Assets-05.jpg" media="(max-width: 1024px)" srcset="img/new/Elephantine_Website_Assets-05.jpg">
                    <img data-src="img/new/Elephantine_Website_Assets-05.jpg" src="img/new/Elephantine_Website_Assets-05.jpg" class="parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                </picture>
            </div>


    <div class="container-fluid common-wrapper">
        <div class="row"> 
            <div class="col-md-6" image-parallax="slideup">
                <div class="landowner-left-content"> 
                    <div class="landowner-head-div parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                        <h6>A LAND OWNER’S DREAM</h6> 
                        <h1>COME TRUE</h1>
                    </div> 
                    <div class="landowner-left-img">
                        <img src="img/new/Elephantine_Website_Assets-04.jpg" class="img-fluid parallax-move"  data-parallax-content='{"shift": 20, "duration": 1}'/>

                    </div>

                </div>
            </div>
            <div class="col-md-6 landowner-right-content-col" image-parallax="slideup">
                <div class="landowner-right-content parallax-move" data-parallax-content='{"shift": 20, "duration": 1}'>

                    <div class="landowner-right-content-div">

                        <div class="landowner-right-img">
                            <img src="img/land-owner.jpg" class="img-fluid parallax-move"  data-parallax-content='{"shift": 20, "duration": 1}'/>
                        </div>
                        <p class="elephantine_paragraph parallax-move">Transferring the deeds of your land becomes hassle-free at
                             Elephantine. Join our network of land owners and sell your plot for the best price!</p>
                        <a href="land-owners.php" class="elephantine_button">KNOW MORE</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Home Testimonials Section Start -->
<section class="home-testimonials">
            <div class="home-testimonials-leaf-img left-bottom-end-img aos-init aos-animate" data-aos="fade-down">
                <picture>
                    <source data-srcset="img/leaf/deco-mob-4-md.png" media="(max-width: 1024px)" srcset="img/leaf/deco-mob-4-md.png">
                    <img data-src="img/leaf/deco-mob-4-md.png" src="img/leaf/deco-mob-4-md.png" class="parallax-move animate" data-parallax-content="{&quot;shift&quot;: 40, &quot;duration&quot;: 3}" style="transform: translate(0px, 0px);">
                </picture>
            </div>
    <div class="container">   
        <!-- Slider main container -->
        <div class="home-testimonials-swiper">
            <!-- Additional required wrapper -->
            <div class="testimonials-heading">
                <h3 class="arandelle white">Testimonials</h3>
            </div>
                
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="swiper-content" >
                    
                    <p class="white elephantine_paragraph">I have visited this Bliss in the town site last week and the location, atmosphere, and surroundings are very good,
                    The rate is very reasonable to invest in, Vidya mandir school is nearby. I have selected 1200 sqft and paid in advance. The sales staffs are very knowledgeable and kind 
                    in showing the vacant plots. I have checked the legal and other documents with my lawyer and everything is clean. I am happy to be part of Elephantine builder.</p>
                <div class="swiper-subtitle">
                    <h4 class="white">Shayira Banu</h4>
                </div>
                </div>

                </div>
                <div class="swiper-slide">
                    
                   <div class="swiper-content" >

                   
                    <p class="white elephantine_paragraph">Very good community devloped with roads and parks. 
                    Secured place to build a family home! In a prime location.</p>

                <div class="swiper-subtitle">
                    <h4 class="white">Nij Rajan</h4>
                </div>

                </div>

                </div>
                <div class="swiper-slide">
                    
                <div class="swiper-content" >
                    <p class="white elephantine_paragraph">We would highly recommend pristine bay for its astounding environment
								and location. The amenities stands to be a perfect one for someone who loves privacy and
								entertainment. 
                    </p>

                <div class="swiper-subtitle">
                    <h4 class="white">Suresh Kumar</h4>
                </div>
                </div>

                </div>
                
                
            </div>

            <!-- Navigation buttons -->
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
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
                    <form action="./home_form.php" method="post" id="contact_form">
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
                url: './home_form.php',
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
// function openForm() {
//   document.getElementById("myForm").style.display = "block";
// }

// function closeForm() {
//   document.getElementById("myForm").style.display = "none";
// }
</script>

<script>
//  $(document).ready(function(){
//         $("#OpenForm").click(function(){
//             $(".feedback_form_area").animate({
//                 width: "toggle"
//             });
//         });
//     });
</script>

<?php include 'inc/footer.php' ?>