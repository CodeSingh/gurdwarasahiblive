jQuery(document).ready(function($) {
  var inc = 0;

  let liveStreams;
  fetch('https://api.jsonsilo.com/public/cc00cc1e-47e2-41bf-8add-31ddd053f5b9').then(
    function(u){ return u.json();}
  ).then(
    function(json){
      liveStreams = json;
      document.getElementById('channelname').innerText = liveStreams[inc].name;
      document.getElementById('gurdwaraliveplayer').src = "https://www.youtube.com/embed/" + liveStreams[inc].channelid + "?autoplay=1&muted=1";
    }
  )

  $('button#nextvid').click(function() {
    nextVid(true);
  });

  var elMessage = document.querySelector('button#message');

  elMessage.onclick = function() {
    document.querySelector('div#guestbook').classList.toggle('hide');
  }

  var elMessage = document.querySelector('button#about');

  elMessage.onclick = function() {
    document.querySelector('div#aboutus').classList.toggle('hide');
  }

  function nextVid(isBtnPress){
    $('.videooverlay').addClass('videonoise');
    if(isBtnPress){
      inc= ++inc % liveStreams.length
      document.getElementById('channelname').innerText = liveStreams[inc].name;
      document.getElementById('gurdwaraliveplayer').src = "https://www.youtube.com/embed/" + liveStreams[inc].videoid + "?autoplay=1&muted=1&enablejsapi=1&version=3&origin=codesingh.github.io";
      console.log("https://www.youtube.com/embed/" + liveStreams[inc].videoid + "?autoplay=1&muted=1&enablejsapi=1&version=3&origin=codesingh.github.io");
    }
    setTimeout(function(){$('.videooverlay').removeClass('videonoise');}, 1000);
  }

  $('#formguestbook').on('submit', function(event) {
    event.preventDefault(); // prevent reload

    var formData = new FormData(this);
    formData.append('service_id', 'service_qjuxdaz');
    formData.append('template_id', 'template_msmrei6');
    formData.append('user_id', 'QPSVbRhA6Aglw5zTK');

    $.ajax('https://api.emailjs.com/api/v1.0/email/send-form', {
      type: 'POST',
      data: formData,
      contentType: false, // auto-detection
      processData: false // no need to parse formData to string
    }).done(function() {
      $("#notificationguestbook").text('Your mail is sent!');
      $("#guestname").val('');
      $("#guestmessage").val('');
    }).fail(function(error) {
      $("#notificationguestbook").text('Oops... ' + JSON.stringify(error));
    });
  });

});