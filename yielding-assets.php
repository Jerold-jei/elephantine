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
        <h1 data-aos="fade-right">Return Yielding Assets</h1>
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
                        <h4 class="spartanBold black"> Sed ut perspiciatis unde omnis iste natus  </h4>                     

                        <p class="elephantine_paragraph black" data-aos="fade-up"> Sed ut perspiciatis unde omnis iste natus 
                            error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
                             inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.  </p>
                        <p class="elephantine_paragraph black" data-aos="fade-up"> Sed ut perspiciatis unde omnis iste natus 
                            error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
                             inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.  </p>
                    </div>
                </div>               
          </div>    
    </div>
</section>
<!-- Warehousing Section End -->


<!-- Project Details Section Starts -->
<section class="project-details">
                <div class="container-fluid common-wrapper">
                    <div class="row">
                        <div class="col-md-6 d-flex flex-column flex-lg-column-reverse no-title no-top-title" image-parallax="slideup" style="transform: translate(0%, -1.4518%) translate3d(0px, 0px, 0px);">
                                    <div class="columns-text-image__img" data-aos="fade-right"> 
                                        <i style="display: block; padding-bottom: 128.73326467559%;"></i> 
                                            <picture> 
                                                <source data-srcset="img/projects/image_1.jpg" media="(max-width: 1024px)" srcset="img/projects/image_1.jpg"> 
                                                <img data-src="img/projects/image_1.jpg" src="img/projects/image_1.jpg" alt="Elora Hardy portrait photo." class="lazyloaded parallax-move" data-parallax-content='{"shift": 20, "duration": 1}'>
                                            </picture>
                                    </div>  
                                    
                                    
                                </div>
                            
                                <div class="col-md-6 d-flex flex-column image-first no-title no-top-title" image-parallax="slidedown" style="transform: translate(0%, 1.4518%) translate3d(0px, 0px, 0px);">
                                    
                                    <div class="columns-text-image__content" data-aos="fade-left">
                                        <h3> Ready-to-construct Plots Amid Nature </h3>
                                        <h2 class="columns-text-image__content--title on-scroll h3 scroll-init in-view">Bliss in the town                                       
                                        </h2>                                      
                                        
                                        <div class="columns-text-image__content--description on-scroll scroll-init in-view">                                            
                                            <p class="elephantine_paragraph">A respite from crowded city life! Close enough to be connected to the bustling hubs of Chennai but far enough to be 
                                                surrounded by nature’s fresh embrace, Bliss in the Town is an illustrious attempt at creating a highly-functional community.</p>

                                            <p class="elephantine_paragraph">Bliss in the Town is located in Ponmar (Polachery), a highly strategic location due to its position between Grand Southern Trunk Road
                                                 and Old Mahabalipuram Road, the major IT corridors of Chennai.</p>

                                            <a href="bliss-project.php" type="button" class="elephantine_button">Learn More</a>
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
                                    
                                    <div class="columns-text-image__content parallax-move" data-parallax-content='{"shift": 40, "duration": 3}' >
                                        <h3 >The Perfect Safe Haven For You And Your Family! </h3>
                                        <h2 class="columns-text-image__content--title on-scroll h3 scroll-init in-view">Noombal Gardenia                                        
                                        </h2>                                       
                                        
                                        <div class="columns-text-image__content--description on-scroll scroll-init in-view">                                            
                                            <p class="elephantine_paragraph">Introducing Noombal Gardenia, a gated township community that combines the advantages of city life and the 
                                                serenity of life amidst nature. At Noombal Gardenia, we understand the need for the safety and comfort of 
                                                our residents. This is why our gated community has been equipped with the latest amenities and safety features. 
                                                Whether you're looking to build a brand-new home, or just looking for a comfortable place to relax, Noombal Gardenia
                                                is the perfect choice. Everything you need is just around the corner. </p>
                                            
                                            <a href="noombal-project.php" type="button" class="elephantine_button">Learn More</a>
                                        </div>                                        
                                    </div>  
                                </div>
                            
                                <div class="col-md-6 d-flex flex-column image-first no-title no-top-title"  data-aos="fade-left">
                                    
                                    <div class="columns-text-image__img parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'> 
                                        <i style="display: block; padding-bottom: 128.73326467559%;"></i> 
                                            <picture> 
                                                <source data-srcset="img/projects/image_2.jpg" media="(max-width: 1024px)" srcset="img/projects/image_2.jpg"> 
                                                <img data-src="img/projects/image_2.jpg" src="img/projects/image_2.jpg" alt="Elora Hardy portrait photo." class="lazyloaded parallax-move" data-parallax-content='{"shift": 20, "duration": 1}'>
                                            </picture>
                                    </div>  

                                </div>
                            </div>
                        </div>
</section>
<!-- Specification Section End -->





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