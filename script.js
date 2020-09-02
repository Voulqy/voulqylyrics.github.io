console.clear();
var _data = JSON.parse(`{"lyrics":[
{"line":"[Instrumental]", "time":-1},

{"line":"[Verse 1]", "time":9800},
{"line":"watashi dake minaide", "time":9800},
{"line":"shigeki ga hoshii dake", "time":12300},
{"line":"kokoro nai hito no yume wa iya", "time":14200},
{"line":"(Chase me)", "time":18600},
{"line":"asobi hon’i Thriller", "time":19500},
{"line":"kyou wa nani shiyou?", "time":21850},
{"line":"komarase tari shite asobou", "time":23450},

{"line":"[Pre-Chorus]", "time":29250},
{"line":"yoru no naka hissori to", "time":29250},
{"line":"yume ni tobikomi", "time":31700},
{"line":"hajikete odorokasu", "time":34000},
{"line":"ima sugu ni Baby", "time":35900},
{"line":"sekai sugu ni sawagidashitara", "time":38900},
{"line":"tomerarenai tomerarenai", "time":43800},
{"line":"Bang", "time":46800},

{"line":"[Chorus]", "time":48000},
{"line":"Chase me", "time":48000},
{"line":"hora watashi wo tsukamaetemite yo (Dangerous)", "time":48800},
{"line":"me wo hanashitara owari", "time":53200},
{"line":"(doko demo yukeru wa)", "time":55350},
{"line":"Chase me", "time":57700},
{"line":"hora watashi wo sagashidashite ima", "time":58500},
{"line":"mata chigau yume sotto", "time":62450},
{"line":"suberikomu kara", "time":65500},
{"line":"(Chase me chase me)", "time":67430},

{"line":"[Verse 2]", "time":72400},
{"line":"shoudouteki na dake", "time":72400},
{"line":"nee sono nani ga dame?", "time":74600},
{"line":"akai ringo hito kuchi kajitte", "time":76600},
{"line":"Uh uh yoku iu “ii ko” tte?", "time":80700},
{"line":"ruuru wo mamore tte?", "time":84350},
{"line":"nanako no asobi anata dake", "time":86350},
{"line":"ageru wa sono kodou no ue I got you", "time":88500},

{"line":"[Pre-Chorus]", "time":91800},
{"line":"kioku yobimodoshi", "time":91700},
{"line":"yume ni nagetara", "time":94100},
{"line":"anata wo midashiteku", "time":96700},
{"line":"arashi mitai Baby", "time":98650},
{"line":"makura namida de someteyuku wa", "time":101000},
{"line":"tomerarenai tomerarenai", "time":106200},
{"line":"Bang", "time":109300},

{"line":"[Chorus]", "time":110450},
{"line":"Chase me", "time":110450},
{"line":"hora watashi wo tsukamaetemite yo (Dangerous)", "time":111300},
{"line":"me wo hanashitara owari", "time":115500},
{"line":"(doko demo yukeru wa)", "time":117700},
{"line":"Chase me", "time":120000},
{"line":"hora watashi wo sagashidashite ima", "time":120900},
{"line":"mata chigau yume sotto", "time":124700},
{"line":"suberikomu kara", "time":127900},

{"line":"[Bridge]", "time":130000},
{"line":"isoganaku cha achikochi ikitai no (Chase me)", "time":130000},
{"line":"omoiegaku sekai hirogeteyukou", "time":135000},
{"line":"ijiwaru da nante iwareta tte ii no", "time":139000},
{"line":"kore ga masani hontou no watashi", "time":144000},
{"line":"Oh oh oh oh oh", "time":147000},
{"line":"anata no sugata chikaku naru kedo", "time":149400},
{"line":"sou kantan ni wa ikanai wa", "time":154500},

{"line":"[Chorus]", "time":158700},
{"line":"Chase me", "time":158700},
{"line":"hora koko made oikaketekite yo (Dangerous)", "time":159400},
{"line":"nyuu torikku wo miseru no", "time":163500},
{"line":"(doko demo yukeru wa)", "time":165700},
{"line":"Chase me", "time":168100},
{"line":"hora watashi wo sagashidashite ima", "time":169000},
{"line":"mata chigau yume sotto", "time":172700},
{"line":"suberikomu kara", "time":176100},
{"line":"(Chase me chase me)", "time":177650},
{"line":"(Chase me chase me)", "time":182400},
{"line":"End", "time":186000
}]}`);
var currentLine = "";

function align() {
   var a = $(".highlighted").height();
   var c = $(".content").height();
   var d = $(".highlighted").offset().top - $(".highlighted").parent().offset().top;
   var e = d + (a/2) - (c/2);
   $(".content").animate(
       {scrollTop: e + "px"}, {easing: "swing", duration: 250}
   );
}

var lyricHeight = $(".lyrics").height();
$(window).on("resize", function() {
   if ($(".lyrics").height() != lyricHeight) { //Either width changes so that a line may take up or use less vertical space or the window height changes, 2 in 1
      lyricHeight = $(".lyrics").height();
      align();
   }
});

$(document).ready(function(){
   $("video").on('timeupdate', function(e){
      var time = this.currentTime*1000;
      var past = _data["lyrics"].filter(function (item) {
         return item.time < time;
      });
      if (_data["lyrics"][past.length] != currentLine) {
         currentLine = _data["lyrics"][past.length];
         $(".lyrics div").removeClass("highlighted");
         $(`.lyrics div:nth-child(${past.length})`).addClass("highlighted"); //Text might take up more lines, do before realigning
         align();
      }
   });
});

generate();

function generate() {
   var html = "";
   for(var i = 0; i < _data["lyrics"].length; i++) {
      html += "<div";
      if(i == 0) {
         html+=` class="highlighted"`;
         currentLine = 0;
      }
      if(_data["lyrics"][i]["note"]) {
         html += ` note="${_data["lyrics"][i]["note"]}"`;
      }
      html += ">";
      html += _data["lyrics"][i]["line"] == "" ? "\n" : _data["lyrics"][i]["line"];
      html += "</div>"
   }
   $(".lyrics").html(html);
   align();
}



// var _data = JSON.parse(`{"lyrics":[{"line":"","time":-1},
// {"line":"Hey, let's all go into the forest",
// "note":"Verse 1",
// "time":16000},
// {"line":"Nobody will notice for a while",
// "time":20000},
// {"line":"There we can visit all the creatures",
// "time":24000},
// {"line":"Maybe they can teach us facts of life",
// "time":27500},
// {"line":"",
// "time":32000},
// {"line":"Or we can travel to the ocean",
// "note":"Verse 2",
// "time":55500},
// {"line":"Don't forget your lotion",
// "time":59500},
// {"line":"It's quite hot",
// "time":61500},
// {"line":"I once met seven lovely crabs",
// "time":64000},
// {"line":"They said I should go back and join them for tea",
// "time":67500},
// {"line":"",
// "time":72000},
// {"line":"Oh wait, the forest got demolished",
// "note":"Verse 3",
// "time":95500},
// {"line":"When they built the airport years ago",
// "time":99000},
// {"line":"But we can still go see the ocean",
// "time":103500},
// {"line":"Cause they put it in a bowl at the mall",
// "time":107500},
// {"line":"",
// "time":112000}]}`);