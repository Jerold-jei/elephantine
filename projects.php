<?php include 'inc/meta.php' ?>

<!-- Banner Section Start -->
<section class="banner projects-banner">
    <div class="overlay"></div>
    <div class="form-div">
        <div class="container-fluid form-div-container">
            <div class="row form-div-row">
                <div class="col-md-12">
                    <div class="form-div-content parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                        <h1 class="spartanBold" data-aos="fade-right">Take a look at our flourishing projects </h1>                     
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

<section class="future-project-details">
                <div class="container-fluid common-wrapper">
                    <div class="row">
                        <div class="col-md-6 d-flex flex-column flex-lg-column-reverse no-title no-top-title" image-parallax="slideup" style="transform: translate(0%, -1.4518%) translate3d(0px, 0px, 0px);">
                                    <div class="columns-text-image__img" data-aos="fade-right"> 
                                        <i style="display: block; padding-bottom: 128.73326467559%;"></i> 
                                            <picture> 
                                                <source data-srcset="./img/home/future-projects.jpg" media="(max-width: 1024px)" srcset="./img/home/future-projects.jpg"> 
                                                <img data-src="./img/home/future-projects.jpg" src="./img/home/future-projects.jpg" alt="Elora Hardy portrait photo." class="lazyloaded parallax-move" data-parallax-content='{"shift": 20, "duration": 1}'>
                                            </picture>
                                    </div>  
                                    
                                    
                                </div>
                            
                                <div class="col-md-6 d-flex flex-column image-first no-title no-top-title" image-parallax="slidedown" style="transform: translate(0%, 1.4518%) translate3d(0px, 0px, 0px);">
                                    
                                    <div class="columns-text-image__content" data-aos="fade-left">
                                        <h3>A Beachside Gated Community Of Endless Fun</h3>
                                        <h2 class="columns-text-image__content--title on-scroll h3 scroll-init in-view">Pristine Bay                                         
                                        </h2>
                                       
                                        
                                        <div class="columns-text-image__content--description on-scroll scroll-init in-view">                                         
                                            <p class="elephantine_paragraph">Welcome to a secured gated community that invites you for a well-deserved vacation! 
                                            Pristine Bay is the perfect spot for homeowners looking to enjoy a vacation alongside the beach, with several fun 
                                            beachside activities to keep you engaged!</p>
                                            <p class="elephantine_paragraph">This unique proposition offers the perfect spot for you to unwind from your busy life, 
                                            bordered by the deep blue sea that makes for a stunning location. Enjoy the comforts of a serene lifestyle at Pristine Bay!</p>
                                            <a href="pristine-project.php" type="button" class="elephantine_button">Learn More</a>
                                        </div>                                        
                                    </div>

                                </div>
                            </div>
                        </div>



</section>

<!-- Specification Section Start -->

<section class="project-specification-sec">
        <div class="container-fluid common-wrapper">
                    <div class="row">
                        <div class="col-md-6 d-flex flex-column flex-lg-column-reverse no-title no-top-title" data-aos="fade-right">
                                    
                                    <div class="columns-text-image__content parallax-move" data-parallax-content='{"shift": 40, "duration": 3}' >
                                        <h3 >Stay Informed About Our Latest Undertakings </h3>
                                        <h2 class="columns-text-image__content--title on-scroll h3 scroll-init in-view">Future Projects                                      <!-- <span class="arandelle gold"> consectetur </span>  -->
                                        </h2>                                       
                                        
                                        <div class="columns-text-image__content--description on-scroll scroll-init in-view">                                           
                                            <p class="elephantine_paragraph">We are constantly working to change the perspective of Chennai’s realty sector, starting with land acquisitions, plot divisions, property development, etc.</p>
                                            <p class="elephantine_paragraph">With an outlook towards creating communities that contribute to the improvement of society, Elephantine welcomes you to look forward to the new projects we have in the pipeline.</p>
                                         
                                                                                
                                            <a href="future-projects.php" type="button" class="elephantine_button">Learn More</a>
                                        </div>                                        
                                    </div>  
                                </div>
                            
                                <div class="col-md-6 d-flex flex-column image-first no-title no-top-title"  data-aos="fade-left">
                                    
                                    <div class="columns-text-image__img parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'> 
                                        <i style="display: block; padding-bottom: 128.73326467559%;"></i> 
                                            <picture> 
                                                <source data-srcset="./img/home/future-projects.jpg" media="(max-width: 1024px)" srcset="./img/home/future-projects.jpg"> 
                                                <img data-src="./img/home/future-projects.jpg" src="./img/home/future-projects.jpg" alt="Elora Hardy portrait photo." class="lazyloaded parallax-move" data-parallax-content='{"shift": 20, "duration": 1}'>
                                            </picture>
                                    </div>  

                                </div>
                            </div>
                        </div>
</section>
<!-- Specification Section End -->

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