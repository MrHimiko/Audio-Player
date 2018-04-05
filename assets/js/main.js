   
//   ==== TABLE OF CONTENTS ====

// (SEARCH WITH EXCATLY NAMES FROM TABLE OF CONTENTS IF YOU ARE LOOKING FOR SOMETHING SPECIFIC)

// # hide pause button 
// # initliaze audio
// # play button maniuplation
// # next song button manipulation
// # previous song button manipulation
// # click on song title, initialize that song
// # reload song button manipulation
// # volume button , turn off/on slider
// # showduration(), function that plays with minutes, and slider of progress
// # progress bar click - sets position of song on clicked position 
// # volume slider setter


// # show/hide player
// # main sliders , on title click, show rest of body (example, in settings page, click on Audio, shows options)
//   !note: theres a class "open-on-start" that is given to title to open default slider on load of page
// # fadeout checkbox (if checked, enable duration input)
// # Menu - linking - show/hide stuff and more (muchmessy)
// # on hover of questionmark in settings, show popup

// # playing with play/pause buttons next to song name 
// # start with #ad0e53 color on first (active) song 
// # On any click! recheck status of playbutton that is next to song in list

// # function that remvoes song from list 
//   !note: not in use anymore, commented it out, just in case..
// # if theres no songs on list or song is not selected, show message

// # double checking status of  play button in main AudioPlayer
// # media query for duration and currenttime in player





   var audio;
    // # hide pause button  

    $("#audio-sidebar #pause").hide();

    $( document ).ready(function() {
        initAudio($(".playlist-song:visible").first()); 

    });


    // # initliaze audio


    // Initilize Audio FUnciton
    function initAudio(element) {

      var song = element.attr('song');

      var title = element.find(".span-song-name").text(); // get name of the song 
      
      //Create audio object 

      audio = new Audio('media/'+song);

      if(!audio.currentTime) {
        $("#audio-sidebar #duration").html("0.00");
      } else {
        var duration = audio.duration;
         $("#audio-sidebar #duration").html(duration);
      }

      //check what song is active

      $(".playlist-song").removeClass("active");
      element.addClass("active");
      $(".playlist-song").find("h3").css("color","white");
      element.find("h3").css("color","white");

      $("#audio-sidebar .song-name").text(title);

        audio.volume = $('#audio-sidebar input[type=range]').val() / 100;
        
      }
    

    // # play button maniuplation 

    $("#audio-sidebar .play").click(function(){

        if (audio.paused == false) {
            audio.pause();
       
        } else {
            audio.play();
         
        }
        showDuration ();      
     
    });


    // # next song button manipulation

    $("#audio-sidebar #next").click(function(){
        
        $("#audio-sidebar #circle-tracker").css("left", "0");
        $("#audio-sidebar .currenttime").html("0.00")

        if (audio.paused == true) {
            var wasPaused = true;
            
        } else {
            var wasPlaying = true;
          
        }

        audio.pause();
        var next = ($(".playlist-song.active").next());

        if(next.length == 0) {

        next = $(".playlist-song:visible").first();
       
        }

        initAudio(next);
        showDuration ();

        // check if audio was playing
        if(wasPaused){

          // it was paused, will do nothing here 

        } else {
            audio.play();
        }
    });


    // # previous song button manipulation 

    $("#audio-sidebar #prev").click(function(){

        $("#audio-sidebar #circle-tracker").css("left", "0");
        $("#audio-sidebar .currenttime").html("0.00")

        if (audio.paused == true) {
            var wasPaused = true;
            
        } else {
            var wasPlaying = true;
          
        }

        audio.pause();

        var prev = ($(".playlist-song.active").prev());

        if(prev.length == 0) {

        prev = $(".playlist-song:visible").last();
       
        }

        initAudio(prev);
        showDuration ();

        // check if audio was playing
        if(wasPaused){

          // it was paused, will do nothing here 

        } else {
            audio.play();
        }
      
    });

    
    // # click on song title, initialize that song


    $(".playlist-song").on("click", function(){

      song = $(this);

        $("#audio-sidebar #circle-tracker").css("left", "0");
        $("#audio-sidebar .currenttime").html("0.00")

        if (audio.paused == true) {
            var wasPaused = true;
            
        } else {
            var wasPlaying = true;
          
        }

        audio.pause();
       
        initAudio(song);
        showDuration ();

        // check if audio was playing
        if(wasPaused){

          // it was paused, will do nothing here 

        } else {
            audio.play();
        }

    });


    // # reload song button manipulation

    $("#audio-sidebar #r2").click(function(){
       if (audio.paused == true) {
            var wasPaused = true;
            
        } else {
            var wasPlaying = true;
          
        }

      audio.pause();
      audio.currentTime = 0;
      

        // check if audio was playing
        if(wasPaused){

          // it was paused, will do nothing here 

        } else {
            audio.play();
        }

    });


    // # volume button , turn off/on slider

    $("#audio-sidebar #r1").on("click", function(event){
       event.stopImmediatePropagation();
       $("#audio-sidebar .audio-volume").toggleClass("show-volume");
    })


    $("#audio-sidebar .audio-volume").on("click", function(event){
      event.stopImmediatePropagation();
    })

    

    // # showduration(), function that plays with minutes, and slider of progress

    function showDuration () {

      $(audio).bind('timeupdate', function(){

          var s = parseInt (audio.currentTime % 60);
          var m = parseInt ((audio.currentTime)/60) %60;

          if (s < 10 ) {
            s = '0' + s;
          }

          $("#audio-sidebar .currenttime").html(m + '.' + s);

          var seconds = Math.floor(audio.duration % 60) ;

          if (seconds < 10) {
            seconds = '0' + seconds
          }

          valueDuration = Math.floor(audio.duration / 60)+':'+ seconds ;

          $("#audio-sidebar #duration").text(valueDuration)

          var value = 0;
          if (audio.currentTime>0) {
            messure = $("#audio-sidebar #progress").width() / audio.duration ; 
            messure = messure * audio.currentTime;
            $("#audio-sidebar #circle-tracker").css("left", messure)
          }    
          else {
            $("#audio-sidebar #circle-tracker").css("left", "0");
            valueDuration = 0;
          }

          // At the end of the song, go to next and play

          if(audio.currentTime == audio.duration) {
              $("#audio-sidebar #next").click();
              audio.play();
          }

      });

    }


    // # progress bar click - sets position of song on clicked position


      $('#audio-sidebar #progressbar').click(function (e){
          var elm = $(this);
          var xPos = e.pageX - elm.offset().left;
          var yPos = e.pageY - elm.offset().top;

          var sidebarwidth = $("#audio-sidebar").width();
          progresswidth = $("#audio-sidebar #progress").width();

          xPos = xPos - ( (sidebarwidth - progresswidth) / 2) -3 ; //calculate empty space (margin), and -3 for better adjusment of circle

          $("#audio-sidebar #circle-tracker").css("left", xPos); // move circle on clicked position

          messure =  progresswidth / audio.duration; 

          // setup current time on clicked position

          audio.currentTime = xPos / messure; 

          messure = messure * audio.currentTime;

      });

      // # volume slider setter

      $('#audio-sidebar input[type=range]').on('change input', function() {
        
        var value = $(this).val();
        audio.volume = value * 0.01;
        
      })

      // # show/hide player 

      $(document).ready(function(){

          $(".slide-down-player").on("click", function(){
         
            $("#audio-player").toggle();
            $("#audio-sidebar .audio-sidebar-player-song").toggleClass("change-header-height")
            $("#audio-sidebar .audio-sidebar-home-list-2").toggleClass("change-min-height-ofplayer")
            $("#audio-sidebar .slide-down-player").toggleClass("rotate180");
            $("#audio-sidebar .slide-down-player").toggleClass("adjust-position-arrow");
            $("#audio-sidebar .minimized-pause-play").toggleClass("display-block");
            $("#audio-sidebar .show-more-button-player").toggleClass("display-none"); 
            $("#audio-sidebar .minimized-currenttime").toggleClass("display-block");


          })

      });      


      // # fadeout checkbox (if checked, enable duration input)

      $(document).on('change','input.duration-checkbox',function(){

        if ($('input.duration-checkbox').is(':checked')) {
              $('.duration-number').prop('disabled', false);
              $(".duration-label").css("color","white")
          
        } else {
            $('.duration-number').prop('disabled', true);
            $(".duration-label").css("color","#8a8c94")
        }
         
      });
     





    //open on start // home page
    $(".audio-sidebar-library").show();
    $(".audio-sidebar-player-song").show(); 
    $("#audio-sidebar .audio-sidebar-home-list").css("max-height","calc( 100vh - 226px");
    $("#audio-sidebar .audio-sidebar-home-list").css("min-height","calc( 100vh - 226px");
    $(".audio-siderbar-title").text("My Music");

    

    // # on hover of questionmark in settings, show popup

    $("#audio-sidebar .fa-question-circle").mouseenter(function() {
        $(this).find(".info-question-popup").show();
    });
     $("#audio-sidebar .fa-question-circle").mouseleave(function() {
        $(this).find(".info-question-popup").hide();
    });


    // # playing with play/pause buttons next to song name

    $('.play-indicator-song').on("click",function(event){

      var status = $(this).find(".play").hasClass("paused")

      event.stopPropagation();
      event.preventDefault();

      audio.pause();

      var clickedsong = $(this).closest(".playlist-song");

      initAudio(clickedsong); 

      if( status ){
          audio.pause();
          
        }

        else {
            audio.play();
            
        }

      showDuration ();


      $( ".play-indicator-song .play" ).each(function() {
        $(this).css("color","white");
        var thissong = $(this).closest(".playlist-song");

          if (thissong.hasClass("active")) {
              $(this).css("color","#ad0e53");
              if (audio.paused == false) {
                  $(this).html(" <i class='fa fa-pause'></i>"); // if paused false = show pause option
                  $(this).addClass("paused")

                  
              } else {
                   $(this).html("<i class='fa fa-play'></i> "); // if is it paused = show play option
                   $(this).removeClass("paused")

                  
              }

           }

           else {

               $(this).html("<i class='fa fa-play'></i>"); // show play option for not active songs
               $(this).removeClass("paused")
              
           }
        
      });

    
    });

    // # start with #ad0e53 color on first (active) song 

    $("li.play").first().css("color","#ad0e53")
   

    // # On any click! recheck status of playbutton that is next to song in list


    $(document).on('click','body *',function(){

      $( ".play-indicator-song .play" ).each(function() {
        $(this).css("color","white");
        var thissong = $(this).closest(".playlist-song");
      

          if (thissong.hasClass("active")) {
              $(this).css("color","#ad0e53")
              if (audio.paused == false) {
                 $(this).html(" <i class='fa fa-pause'></i>"); 
                  $(this).addClass("paused");
                                         
              } else {  
                  $(this).html(" <i class='fa fa-play'></i>"); 
                  $(this).removeClass("paused");  
                    
                              
              }

           }

           else {
              $(this).html(" <i class='fa fa-play'></i>"); 
               $(this).removeClass("paused")                       
           }
        
      });
        
    });


    // # function that remvoes song from list


    // $('#audio-sidebar .song-options-popup .remove').on("click",function(event){

    //    thissong = $(this).closest(".playlist-song");

    //    if(thissong.hasClass("active")){
    //     thissong.remove();     
    //     audio.pause();
    //     var first = ($(".playlist-song:visible").first()); // if deleting selected song, select first one on list
    //     initAudio(first); 

    //    }

    //    else {
    //     thissong.remove();
    //    }

    // });


    // # if theres no songs on list or song is not selected, show message
    window.setInterval(function(){

      if (!$(".playlist-song").hasClass("active")) {

          $(".song-name").text("Song Undefiend");
          $(".list-is-empty").show();

      }

      else {
        $(".list-is-empty").hide();
      }
   
    }, 300); // every 300ms check


    // # double checking status of  play button in main AudioPlayer 


    window.setInterval(function(){

      if (audio.paused == false) {
           $('#audio-sidebar button.play').addClass("paused"); // if song is playing, show pause button
           
          } else {
              $('#audio-sidebar button.play').removeClass("paused"); // if not, show play button
              
          }
    
      }, 300); // every 300ms check


    // # media query for duration and currenttime in player 

    window.setInterval(function(){


      var sidebarwidth = $("#audio-sidebar").width();
      progresswidth = $("#audio-sidebar #progress").width();

      var margin = ((sidebarwidth - progresswidth) / 2) ; //calculate empty space (margin)

      var ifPlayerVisible =  $("#audio-player").is(":visible");

      if (ifPlayerVisible){
         $("#audio-sidebar #duration").css("right", margin);
         $("#audio-sidebar .currenttime").css("left", margin);
      }

      else {
         $("#audio-sidebar .currenttime").css("left", 0); // if player is minimized, adjust props
      }
 
    }, 1); // every 300ms check



     



    // # trim , dont allow minutes and seconds over 60;


    $(".number1 input").on("change",function(){

      var min = $(".number1 .minutes").val();
      if (min > 60) {
        min=60;
      }
      else if (min < 0) {
        min=0
      }

      $(".number1 .minutes").val(min);

      var sec = $(".number1 .seconds").val();

      if (sec > 60) {
        sec=60;
      }
      else if (sec < 0) {
        sec=00;
      }

      $(".number1 .seconds").val(sec);

    })

     $(".number2 input").on("change",function(){

      var min = $(".number2 .minutes").val();
      if (min > 60) {
        min=60;
      }
      else if (min < 0) {
        min=0
      }

      $(".number2 .minutes").val(min);

      var sec = $(".number2 .seconds").val();

      if (sec > 60) {
        sec=60;
      }
      else if (sec < 0) {
        sec=00;
      }

      $(".number2 .seconds").val(sec);

    })



   
