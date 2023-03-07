
  


$(document).ready(function() {
  // AOS.init();

  AOS.init({
    duration: 1000,
    // once:true,
    disable: 'mobile'
  });
    
        var swiper = new Swiper(".main-banner-swiper", {              
            slidesPerView: 1,      
            autoplay: true, 
            loop:false,  
            // speed: 1000,
            pagination: {
              el: '.banner-swiper-pagination',
              clickable: true,
              hide:false,
            },

          
          });
          
        var swiper = new Swiper(".home-testimonials-swiper", {  
            slidesPerView: 1,     
            centeredSlides: true,
            autoplay: {
                delay: 6000,
                },
            loop:true,
            spaceBetween: 100,        
            
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev"
            },
          });

      
          var swiper = new Swiper(".our-project-swiper", {  
            slidesPerView: 1,     
            centeredSlides: true,
            autoplay: true,  
            // loop:true,
            spaceBetween: 200,    

            grabCursor: true,
            effect: "creative",
              
        
            // navigation: {
            //   nextEl: ".next",
            //   prevEl: ".prev"
            // },
            pagination: {
                el: '.project-swiper-pagination',
                clickable: true,
                hide:false,

                creativeEffect: {
                  prev: {
                    shadow: true,
                    translate: ["-20%", 0, -1],
                  },
                  next: {
                    translate: ["100%", 0, 0],
                  },
                },  

              },
          });

          
        var swiper = new Swiper(".teamsSwiper", {  
          slidesPerView: 4.75,     
          centeredSlides: true,
          autoplay: false,  
          loop:false,
          spaceBetween: 50,        
          // pagination: {
          //   el: ".swiper-pagination",
          //   clickable: true,
          // },
          navigation: {
            nextEl: ".our-team-prev",
            prevEl: ".our-team-next"
          },
        });

        var swiper = new Swiper(".project-image-swiper", {  
          slidesPerView: 1.8,     
          centeredSlides: true,
          autoplay: true,  
          loop:true,
          spaceBetween: 50,        
      
          navigation: {
            nextEl: ".project-image-next",
            prevEl: ".project-image-prev"
          },
          pagination: {
              el: '.project-image-bar',
              type: 'progressbar',
            },
        });

});
    
$('h1').hover(function(){

    var class_name = $(this).attr('class');
if ( class_name == 'text-1' ) {
    document.getElementById('image1').style.display='block';  
    document.getElementById('image6').style.display='none'; 
    document.getElementById('image5').style.display='none'; 
    document.getElementById('image4').style.display='none';  
    document.getElementById('image3').style.display='none'; 
    document.getElementById('image2').style.display='none'; 

} else if(class_name == 'text-2') {

  document.getElementById('image2').style.display='block';  
  document.getElementById('image1').style.display='none';  
  document.getElementById('image6').style.display='none'; 
    document.getElementById('image5').style.display='none'; 
    document.getElementById('image4').style.display='none';  
    document.getElementById('image3').style.display='none'; 
  

}else if(class_name == 'text-3'){
  document.getElementById('image3').style.display='block';  
  document.getElementById('image2').style.display='none'; 
  document.getElementById('image1').style.display='none';  
  document.getElementById('image5').style.display='none'; 
  document.getElementById('image6').style.display='none'; 
  document.getElementById('image4').style.display='none';
} 
else if(class_name == 'text-4'){
  document.getElementById('image4').style.display='block';  
  document.getElementById('image3').style.display='none'; 
  document.getElementById('image2').style.display='none'; 
  document.getElementById('image1').style.display='none'; 
  document.getElementById('image5').style.display='none'; 
  document.getElementById('image6').style.display='none'; 

} 
else if(class_name == 'text-5'){
  document.getElementById('image5').style.display='block'; 
  document.getElementById('image6').style.display='none'; 
  document.getElementById('image4').style.display='none';  
  document.getElementById('image3').style.display='none'; 
  document.getElementById('image2').style.display='none'; 
  document.getElementById('image1').style.display='none';  

} 
else if(class_name == 'text-6'){
  document.getElementById('image6').style.display='block'; 
  document.getElementById('image5').style.display='none'; 
  document.getElementById('image4').style.display='none';  
  document.getElementById('image3').style.display='none'; 
  document.getElementById('image2').style.display='none'; 
  document.getElementById('image1').style.display='none';  

} else{
    
  document.getElementById('image6').style.display='none'; 
  document.getElementById('image5').style.display='none'; 
  document.getElementById('image4').style.display='none';  
  document.getElementById('image3').style.display='none'; 
  document.getElementById('image2').style.display='none'; 
  document.getElementById('image1').style.display='block';  
  
//   document.getElementById('text-1').style.color = "#b38e3f"; 
}
 


});


// const box = document.getElementById('box');

const textDiv = document.getElementById('text-1');


textDiv.addEventListener('mouseover', function handleMouseOver() {
  textDiv.style.color = '#c4764e';
});


textDiv.addEventListener('mouseout', function handleMouseOut() {
  textDiv.style.color = 'transparent';
});


$(document).ready(function(){
  $('#back-to-top').click(function () {
          $("html, body").animate({
              scrollTop: 0
          }, 600);
          return false;
      });
          
});

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

$(document).ready(function(){
  $("#OpenForm").click(function(){
      $(".feedback_form_area").animate({
          width: "toggle"
      });
  });
});