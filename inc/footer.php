<?php 
    $activePage = basename($_SERVER['PHP_SELF'], ".php");
?>


<footer class="elephantine-footer">
    <div class="container-fluid footer-wrapper">
        <div class="row first-row">
            <div class="col-md-4">
                <div class="center-logo-div">
                    <a href="index.php">
                        <img src="./img/logo.svg" class="img-fluid">
                    </a>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid footer-wrapper second-footer-container">
        <div class="row footer-address-row">
            <div class="col-md-5">
                <div class="left-address-div">
                    <p>5th floor, City Tower, No 7, 3rd Cross
                        St, Kasturba Nagar, Adyar, Chennai,
                        Tamil Nadu 600020.</p>
                    <a href="https://www.google.com/maps/place/3rd+Cross+St,+Kasturba+Nagar,+Adyar,+Chennai,+Tamil+Nadu+600020/@13.0066672,80.2494265,18z/data=!3m1!4b1!4m10!1m2!2m1!1s3rd+Cross+St,+Kasturba+Nagar,+Adyar,+Chennai,+Tamil+Nadu+600020!3m6!1s0x3a52679462a28551:0x1c43305dc661c654!8m2!3d13.0066672!4d80.2516688!15sCj8zcmQgQ3Jvc3MgU3QsIEthc3R1cmJhIE5hZ2FyLCBBZHlhciwgQ2hlbm5haSwgVGFtaWwgTmFkdSA2MDAwMjCSAQVyb3V0ZeABAA!16s%2Fg%2F1tdm24q7"
                        target="_blank" class="find-our">FIND US</a>
                </div>
            </div>
            <div class="col-md-3">
                <div class="center-links-div">
                    <p><a href="#" class="">+91 9876543210</a></p>
                    <p><a href="#" class="">
                            info@elephantine.co
                        </a></p>
                    <div class="social-links-div">
                        <a href="https://www.facebook.com/ElephantineEnterprises"><i class="fa fa-facebook"></i></a>
                        <!--<a href="#"><i class="fa fa-twitter"></i></a>-->
                        <a href="https://www.instagram.com/elephantineenterprises/?next=%2F"><i class='fa fa-instagram'></i></a>
                        <!--<a href="#"><i class="fa fa-linkedin"></i></a>-->
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                 <a href="#" class="back-to-top" id="back-to-top"></a>
            </div>
        </div>
    </div>
    <div class="container-fluid footer-wrapper">
        <div class="row footer-links-row">
            <div class="col-md-12 footer-links-col">
                <ul class="footer-links-list">                    
                    <li><a href="about-us.php" class="nav-link">ABOUT US</a></li>
                    <li><a href="projects.php" class="nav-link">PROJECTS</a></li>
                    <li><a href="our_vision_venture.php" class="nav-link">OUR VISION VENTURES</a></li>
                    <li><a href="land-owners.php" class="nav-link">LAND OWNERS</a></li>
                    <li><a href="blog.php" class="nav-link">BLOGS</a></li>
                    <li><a href="contact-us.php" class="nav-link">CONTACT</a></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="container-fluid copy-right-container footer-wrapper">
        <div class="row copy-right-row">
            <div class="col-md-7 left-col">
                <p class="white">© Elephantine 2023 - All Rights Reserved.
                <p class="white"> Site by <a href="https://www.tablonoir.com/" class="links leftborder-links"
                        target="_blank"><b>Tablo Noir</b></a> </p>
                </p>
            </div>
            <div class="col-md-5 right-col">
                 <a href="disclaimer.php" class="links leftborder-links">
                    <p> Disclaimer </p>
                </a>
                <a href="privacy-policy.php" class="links leftborder-links">
                    <p> Privacy Policy</p>
                </a>
                <a href="terms-conditions.php" class="links leftborder-links">
                    <p> Terms of use </p>
                </a>

            </div>
        </div>
    </div>
</footer>



<!-- Bootstrap CDN -->
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>


<!-- Swiper JS -->
<script src="https://unpkg.com/swiper/swiper-bundle.js"></script>
<script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.js"></script>

<!-- Fancy Box JS -->
<script src="https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.js"></script>
<!-- custom js -->
    
<!-- Re Captcha -->
<script src='https://www.google.com/recaptcha/api.js'></script>

 <!--AOS LIBRARY-->
 <script src='https://unpkg.com/aos@2.3.0/dist/aos.js'></script>

<script type="text/javascript" src="./js/main.js"></script>

<script type="text/javascript" src="./js/script.js"></script>

<script type="text/javascript" src="./js/build-app.js"></script>


<script>
$(document).ready(function() {
var elephantine_header = $(".top-nav");
//    var fileName = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);

//    console.log(fileName);
    $(window).scroll(function() {  
      
        var scroll = $(window).scrollTop();
    
        if (scroll >= 500) {
          elephantine_header.removeClass('top-nav').addClass("darkHeader");
        } else {
          elephantine_header.removeClass("darkHeader").addClass('top-nav');   
        }
     

    });

  });


</script>


</body>

</html>