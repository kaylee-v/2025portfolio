jQuery(document).ready(function(){
  
  // Set the initial clip-path position for cursor to the center of the screen
  var centerX = $(window).width() / 2;
  var centerY = $(window).height() / 4;
  document.documentElement.style.setProperty('--cursorX', centerX + 'px');
  document.documentElement.style.setProperty('--cursorY', centerY + 'px');
  
  // Make the clip-path circle follow the cursor
  document.addEventListener('mousemove', function(e) {
    // Get the cursor's position on the page
    var x = e.pageX;
    var y = e.pageY;

    // Update the CSS custom properties with the new cursor position
    document.documentElement.style.setProperty('--cursorX', x + 'px');
    document.documentElement.style.setProperty('--cursorY', y + 'px');
  });
  
  // Add zoom effect when hovering over interactable elements
  $('.clip-hover').on('mouseenter', function() {
    $('.overlay.top').addClass('zoomed');
  }).on('mouseleave', function() {
    $('.overlay.top').removeClass('zoomed');
  });
  
  /*$(".clip-hover").hover(
    function() {
      $(".overlay.top").addClass("zoomed transition-clip");
      setTimeout(function() {
        $(".overlay.top").removeClass("transition-clip");
      }, 300);  // Match the transition duration here
    },
    function() {
      $(".overlay.top").removeClass("zoomed");
    }
  );*/
  
  
  // Text-shadow effect on .herop text
  $('.overlay').mousemove(function(e){
    var rXP = (e.pageX - this.offsetLeft-$(this).width()/2);
    var rYP = (e.pageY - this.offsetTop-$(this).height()/2);
    $('.hero').css('text-shadow', +rYP/90+'px '+rXP/70+'px rgba(227,6,19,1),  '+rXP/70*-1+'px '+rYP/90+'px rgba(0,219,227,1)');
   });
  
  // Function to toggle dark mode (and change about img src)
  function toggleMode() {
    $('.overlay').toggleClass('dark-mode');
    $('body').toggleClass('dark-mode');
    
    // Check the current source of the about image
    var currentSrc = $('#overlayAboutImg').attr('src');
    // Determine the new image source based on the current one
    var newSrc = (currentSrc === 'assets/Portrait_Duotone02.jpg') ? 'assets/Portrait_Duotone.jpg' : 'assets/Portrait_Duotone02.jpg';
    // Set the new image source
    $('#overlayAboutImg').attr('src', newSrc);
  }

  // Add click event listener to .herop element for dark mode toggle
  $('.herop').on('click', function() {
    toggleMode();
  });
  
  //Hover effect to reduce cursor clip-path when hovering over element that can be interacted with
  /*$('.herop').hover(
        function() {
            $('.overlay.top').css('clip-path', 'circle(20px at var(--cursorX) var(--cursorY))');
        }, function() {
            $('.overlay.top').css('clip-path', 'circle(80px at var(--cursorX) var(--cursorY))');
        }
    );*/
  
  //about section click event word scroll
  var words = ['web designer', 'graphic designer', 'front end web developer', 'brand designer', 'copywriter', 'visual designer', 'UI/UX designer']; // Your list of words
  var count = 0;

  $('#cycle-word').click(function(){
    count = (count + 1) % words.length; // Cycle through the words
    $(this).text(words[count]); // Change the word
    $('#bottom-span').text(words[count]); // Update the other span
    
    // Add the animation class and then remove it after the animation completes
    /*$('#cycle-word').addClass('flip-in-hor-bottom').delay(500).queue(function(next){
      $('#cycle-word').removeClass('flip-in-hor-bottom');
      next();
    });
    $('#bottom-span').addClass('flip-in-hor-bottom').delay(500).queue(function(next){
      $('#bottom-span').removeClass('flip-in-hor-bottom');
      next();
    });*/
  });

  
  // Fade in elements on scroll
  $(window).scroll(function() {
    $('.fade-in').each(function() {
      var elementTop = $(this).offset().top;
      var windowBottom = $(window).scrollTop() + $(window).height();

      // Check if element is within viewport
      if (elementTop < windowBottom - 100) { // 100px offset for early fade in
        $(this).animate({
          'opacity': '1',
          'marginTop': '0px'
        }, 1000);
      }
    });
    
    var scroll = $(window).scrollTop();
    if (scroll >= 1) {
      $('.down-arrow').addClass('fade-out');
    } else{
    }
  });
  

  // ~~~ Works img column scroller ~~~~
  //duplicate imgs in column to increase scroll length
  function setupInfiniteScroll(selector) {
    const container = jQuery(selector);
    const items = container.children();
    const itemHeight = items.first().outerHeight(true);
    const containerHeight = container.height();

    function cloneItems() {
      items.clone().appendTo(container);
    }

    function updateScrollPosition() {
      const scrollTop = container.scrollTop();
      if (scrollTop >= itemHeight) {
        container.scrollTop(scrollTop - itemHeight);
      }
    }

    cloneItems(); // Clone the items once initially
    container.on('scroll', updateScrollPosition);
  }

  // Apply infinite scroll setup to each column
  setupInfiniteScroll('#canooLeftImgs .column1');
  setupInfiniteScroll('#canooLeftImgs .column2');
  
  setupInfiniteScroll('#scrdLeftImgs .column3');
  setupInfiniteScroll('#scrdLeftImgs .column4');
  
  //calculate scroll speed based on height of column
  function updateScrollSpeed() {
    const viewportWidth = $(window).width();
    const column1 = $('#canooLeftImgs .column1');
    const column2 = $('#canooLeftImgs .column2');
    const column3 = $('#scrdLeftImgs .column3');
    const column4 = $('#scrdLeftImgs .column4');
    
    column1.each(function() {
      const column = $(this);
      const gap = $(window).width() * 0.02; // 2vw in pixels
      const totalHeight = column.find('img').toArray().reduce((acc, img, index, array) => {
          acc += $(img).outerHeight();
          if (index < array.length - 1) {
              acc += gap;
          }
          return acc;
      }, 0);

      // Calculate the percentage for translateY
      const translateYPercentage = -((totalHeight + gap) / column.height()) * 50;

      // Apply this dynamically in CSS or directly in jQuery
      const keyframes = `
      @keyframes scroll1 {
          0% { transform: translateY(0); }
          100% { transform: translateY(${translateYPercentage}%); }
      }`;

      $("<style>").prop("type", "text/css").html(keyframes).appendTo("head"); //add all imgs height to array, factoring in 2vw flexbox gap
      const animationDuration = (totalHeight / viewportWidth) * 8; // Adjust the multiplier to control speed
      
      column.css('animationDuration', `${animationDuration}s`);
    });
    
    column2.each(function() {
      const column = $(this);
      const gap = $(window).width() * 0.02; // 2vw in pixels
      const totalHeight = column.find('img').toArray().reduce((acc, img, index, array) => {
          acc += $(img).outerHeight();
          if (index < array.length - 1) {
              acc += gap;
          }
          return acc;
      }, 0);

      // Calculate the percentage for translateY
      const translateYPercentage = -((totalHeight + gap) / column.height()) * 50;

      // Apply this dynamically in CSS or directly in jQuery
      const keyframes = `
      @keyframes scroll2 {
          0% { transform: translateY(0); }
          100% { transform: translateY(${translateYPercentage}%); }
      }`;

      $("<style>").prop("type", "text/css").html(keyframes).appendTo("head"); //add all imgs height to array, factoring in 2vw flexbox gap
      const animationDuration = (totalHeight / viewportWidth) * 15; // Adjust the multiplier to control speed
      
      column.css('animationDuration', `${animationDuration}s`);
    });
    
    column3.each(function() {
      const column = $(this);
      const gap = $(window).width() * 0.02; // 2vw in pixels
      const totalHeight = column.find('img').toArray().reduce((acc, img, index, array) => {
          acc += $(img).outerHeight();
          if (index < array.length - 1) {
              acc += gap;
          }
          return acc;
      }, 0);

      // Calculate the percentage for translateY
      const translateYPercentage = -((totalHeight + gap) / column.height()) * 50;

      // Apply this dynamically in CSS or directly in jQuery
      const keyframes = `
      @keyframes scroll3 {
          0% { transform: translateY(0); }
          100% { transform: translateY(${translateYPercentage}%); }
      }`;

      $("<style>").prop("type", "text/css").html(keyframes).appendTo("head"); //add all imgs height to array, factoring in 2vw flexbox gap
      const animationDuration = (totalHeight / viewportWidth) * 8; // Adjust the multiplier to control speed
      
      column.css('animationDuration', `${animationDuration}s`);
    });
    
    column4.each(function() {
      const column = $(this);
      const gap = $(window).width() * 0.02; // 2vw in pixels
      const totalHeight = column.find('img').toArray().reduce((acc, img, index, array) => {
          acc += $(img).outerHeight();
          if (index < array.length - 1) {
              acc += gap;
          }
          return acc;
      }, 0);

      // Calculate the percentage for translateY
      const translateYPercentage = -((totalHeight + gap) / column.height()) * 50;

      // Apply this dynamically in CSS or directly in jQuery
      const keyframes = `
      @keyframes scroll4 {
          0% { transform: translateY(0); }
          100% { transform: translateY(${translateYPercentage}%); }
      }`;

      $("<style>").prop("type", "text/css").html(keyframes).appendTo("head"); //add all imgs height to array, factoring in 2vw flexbox gap
      const animationDuration = (totalHeight / viewportWidth) * 15; // Adjust the multiplier to control speed
      
      column.css('animationDuration', `${animationDuration}s`);
    });
  }
  
  

  $(window).on('resize scroll', function() {
    updateScrollSpeed();
  });

  // Initialize on document ready
  updateScrollSpeed();
  
  
  //Contact Form
  $("#submit").click(function() {
    var name = $("#name").val();
    var email = $("#email").val();
    var message = $("#message").val();
    var contact = $("#contact").val();
    
    $("#returnmessage").empty(); // To empty previous error/success message.
    
    // Checking for blank fields.
    if (name == '' || email == '' || contact == '') {
      alert("Whoops, ya missed one");
    } else {
      // Returns successful data submission message when the entered information is stored in database.
      $.post("contact_form.php", {
        name1: name,
        email1: email,
        message1: message,
        contact1: contact
      }, function(data) {
        $("#returnmessage").append(data); // Append returned message to message paragraph.
        
        if (data == "Thanks for reaching out") {
          $("#form")[0].reset(); // To reset form fields on success.
        }
      });
    }
  });
  
  
  
  /*//TESTTESTTEST phone gyroscope
  // Check if the browser supports DeviceOrientationEvent
  if (window.DeviceOrientationEvent) {
    // Add an event listener for device orientation
    window.addEventListener('deviceorientation', function(event) {
      // Get the absolute rotation rate in degrees
      var alpha = event.alpha;
      var beta = event.beta;
      var gamma = event.gamma;

      // Calculate movement for the shadow based on the orientation
      var rXP = gamma; // Left to right tilt
      var rYP = beta;  // Front to back tilt

      // Apply the effect only on viewports less than 768px wide
      if (window.matchMedia("(max-width: 768px)").matches) {
        $('.hero').css('text-shadow', +rYP/90+'px '+rXP/70+'px rgba(227,6,19,1), '+rXP/70*-1+'px '+rYP/90+'px rgba(0,219,227,1)');
      }
    });
  } else {
    console.log("Your browser doesn't support Device Orientation");
  }
  //END TEST*/

});
