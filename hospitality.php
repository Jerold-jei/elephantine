<?php include 'inc/meta.php' ?>

<!-- Banner Section Start -->
<section class="banner hospitality-banner">
    <div class="overlay"></div>
    <div class="form-div">
        <div class="container-fluid form-div-container">
            <div class="row form-div-row">
                <div class="col-md-12">
                    <div class="form-div-content parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                        <h1 class="spartanBold" data-aos="fade-right">Hospitality </h1>                     
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

<!-- Hospitality Section Start -->
<section class="hospitality-sec ivory-background">

            <div class="hospitality-sec-leaf-img right-img" data-aos="fade-down">
                <picture>
                    <source data-srcset="img/deco-1-md.png" media="(max-width: 1024px)" srcset="img/deco-1-md.png">
                    <img data-src="img/deco-1-md.png" src="img/deco-1-md.png" class="parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                </picture>
            </div>
            <div class="hospitality-sec-leaf-img bottom-img" data-aos="fade-down">
                <picture>
                    <source data-srcset="img/new/deco-1-lg.png" media="(max-width: 1024px)" srcset="img/new/deco-1-lg.png">
                    <img data-src="img/new/deco-1-lg.png" src="img/new/deco-1-lg.png" class="parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                </picture>
            </div>

        <div class="container-fluid common-wrapper">
            <div class="row">
                <div class="col col-12 col-lg-6 d-flex flex-column flex-lg-column-reverse no-title no-top-title" data-aos="fade-right">
                    <div class="hospitality-content">
                    <p class="elephantine_paragraph">At Elephantine, we raise the benchmark of hospitality in Chennai. Providing people with vacation 
                    spots that help them indulge in a bout of wellness away from the monotonous routine of regular life is our forte. </p>
                    <!--<p class="elephantine_paragraph">Lorem ipsum dolor sit amet. Qui amet recusandae aut vero consequatur -->
                    <!--    qui accusamus tempora nam harum sint. Non cumque libero ut repellat -->
                    <!--    omnis ut debitis assumenda hic nemo nesciunt </p>-->
                                        

                    </div>


                </div>
                <div class="col col-12 col-lg-6 d-flex flex-column flex-lg-column-reverse no-title no-top-title" data-aos="fade-left">
                    <div class="hospitality-img">
                        <img src="img/hospitality/image_1.jpg" class="img-fluid parallax-move">
                    </div>
                </div>


            </div>
        </div>

</section>

<!-- Hospitality Section End -->

<!-- Hospitality Image Section Start -->

<section class="hospitality-img-sec">
     <div class="overlay"></div>
    <div class="hospitality-img-sec-content">
        <h3 class="spartanBold white" data-aos="fade-right">Introducing Pristine Bay, an exquisite beachside community that focuses
        on letting people connect with nature and the beauty around it.  </h3>

    </div>

</section>
<!-- Hospitality Image Section End -->

<section class="hospitality-sec-two ivory-background">
            
            <div class="hospitality-sec-bird-img bottom-img" data-aos="fade-down">
                <picture>
                    <source data-srcset="img/new/deco-xl.png" media="(max-width: 1024px)" srcset="img/new/deco-xl.png">
                    <img data-src="img/new/deco-xl.png" src="img/new/deco-xl.png" class="parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                </picture>
            </div>

            <div class="hospitality-sec-bird-img right-top-img" data-aos="fade-down">
                <picture>
                    <source data-srcset="img/new/deco-xl.png" media="(max-width: 1024px)" srcset="img/new/deco-xl.png">
                    <img data-src="img/new/deco-xl.png" src="img/new/deco-xl.png" class="parallax-move" data-parallax-content='{"shift": 40, "duration": 3}'>
                </picture>
            </div>

        <div class="container-fluid common-wrapper">
            <div class="row">
                <div class="col col-12 col-lg-6 d-flex flex-column flex-lg-column-reverse no-title no-top-title">
                    <div class="hospitality-sec-two-img">
                        <img src="img/hospitality/image_2.jpg" class="img-fluid parallax-move">
                    </div>                  

                </div>
                <div class="col col-12 col-lg-6 d-flex flex-column flex-lg-column-reverse no-title no-top-title">
                    <div class="hospitality-sec-two-content">
                    <p class="elephantine_paragraph">Spreading over 42 acres, Pristine Bay is a utopia, teeming
                    with luxury villas, clubhouses, landscaped parks and adventure activities sure to keep you on your toes. </p>
                    
                    <p class="elephantine_paragraph">Situated along the coastline, Pristine Bay offers ready-to-rent holiday homes
                    for people looking to unwind away from the stress of city life and enjoy a stroll along the serene tranquillity of the beach. </p>
                                        
                    <a href="https://pristinebay.directbookingengine.com/" type="button" class="elephantine_button">Book Now</a>                    

                    </div>

                    
                </div>


            </div>
        </div>

</section>

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