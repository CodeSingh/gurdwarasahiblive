jQuery(document).ready(function($) {

  var liveStreams = [{'channelid': 'UCMqlz5xjRN29s51_Jddjo1Q', 'name':'Ontario Khalsa Darbar Official'},
                    {'channelid': 'UCdeALIwTSRHl5WtQvmAlSmw', 'name':'SGSSSouthall'},
                    {'channelid': 'UCUvTNT7gI4YgtbPzzemvQmA', 'name':'Gurdwara Bebe Nanaki ji'},
                    {'channelid': 'UCsRllxbDm0oxskk8VI4CmBA', 'name':'Sri Guru Singh Sabha Malton Official'},
                    {'channelid': 'UCloMqFkKMqIp2Jhp1A4_C7w', 'name': 'Gurdwara Guru Nanak Dev Ji Bradford'},
                    {'channelid': 'UCA1Jqo-WXVuMgs4WcD5f5Yw', 'name': 'Gurdwara Bangla Sahib Ji'},
                    {'channelid': 'UCYn6UEtQ771a_OWSiNBoG8w', 'name': 'Shri Harmandir Sahib'},
                    {'channelid': 'UC5Ls0yJbNABQn8HeARivOSQ', 'name': 'Dashmesh Culture Centre Calgary'},
                    {'channelid': 'UCHahhxFo1hUyO39Yh5cixRQ', 'name': 'Sher E Punjab Gurbani'},
                    {'channelid': 'UCNYMuETXWtm6Nh1R4wGESIQ', 'name': 'Dukh Nivaran Sahib Surrey'},
                    {'channelid': 'UC3ZsJ-3_rjgsAZXbjTfXZnA', 'name': 'Sri Guru Gobind Singh Gurdwara Manchester'},
                    {'channelid': 'UCnIaOhevdG-l_XcVqDBlC5Q', 'name': 'Gurdwara Yuba City-Gurbani Live USA'},
                    {'channelid': 'UCfNPTSmJYHAtBnTUdGfPR7A', 'name': 'Gurdwara Sahib Glenwood, Sydney'},
                    {'channelid': 'UC17LEWEX-U0H5PdbPtmjFfA', 'name': 'Guru Nanak Sikh Gurdwara, Surrey'}
                  ]; 

  var inc = 0;

  document.getElementById('channelname').innerText = liveStreams[inc].name;
  document.getElementById('gurdwaraliveplayer').src = "https://www.youtube.com/embed/live_stream?channel=" + liveStreams[inc].channelid + "&autoplay=1&muted=1";

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

  function videoIdFromLiveIFrame(iframeId)
  {
    var iframe = document.getElementById(iframeId);
    var livevid = iframe.contentWindow.document.querySelector("link[href^='https://www.youtube.com/watch?v=']").href;

    regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
    videoId = livevid.match(regExp);
    
    if (videoId && videoId[1].length === 11) {
        console.log(videoId[1]);
    }
  }

  function nextVid(isBtnPress){
    $('.videooverlay').addClass('videonoise');
    if(isBtnPress){
      inc= ++inc % liveStreams.length
      document.getElementById('channelname').innerText = liveStreams[inc].name;
      document.getElementById('gurdwaraliveplayer').src = "https://www.youtube.com/embed/live_stream?channel=" + liveStreams[inc].channelid + "&autoplay=1&muted=1";
      console.log("https://www.youtube.com/embed/live_stream?channel=" + liveStreams[inc].channelid + "&autoplay=1&muted=1");
      console.log(videoIdFromLiveIFrame('gurdwaraliveplayer'));
    }
    setTimeout(function(){$('.videooverlay').removeClass('videonoise');}, 1000);
  }

  function findLiveStreamVideoId(channelId){
    $.ajax({
      url: 'https://www.youtube.com/channel/'+channelId,
      type: "GET",
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept-Language': 'en-US, en;q=0.5'
    }}).done(function(resp) {
        
        //one method to find live video
        let n = resp.search(/\{"videoId[\sA-Za-z0-9:"\{\}\]\[,\-_]+BADGE_STYLE_TYPE_LIVE_NOW/i);
  
        //If found
        if(n>=0){
          let videoId = resp.slice(n+1, resp.indexOf("}",n)-1).split("\":\"")[1]
          return videoId;
        }
  
        //If not found, then try another method to find live video
        n = resp.search(/https:\/\/i.ytimg.com\/vi\/[A-Za-z0-9\-_]+\/hqdefault_live.jpg/i);
        if (n >= 0){
          let videoId = resp.slice(n,resp.indexOf(".jpg",n)-1).split("/")[4]
          return videoId;
        }
  
        //No streams found
        return "No live streams found";
    }).fail(function() {
      return "CORS Request blocked";
    });
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