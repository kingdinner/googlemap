
var map;
// array for marker
var markerListArray = [];
// option of map
var water = "#696969";
var coordinates = [38.492612, 137.269379];
var maxZoom = 6
var defaultZoom = 5
var minZoom = 5

var defaultLocations = []
var jsonDetails = []
// creating marker with function adding css
const createHTMLMapMarker = ({
  OverlayView = google.maps.OverlayView,
  ...args
}) => {
  class HTMLMapMarker extends OverlayView {
    constructor() {
      super();
      this.latlng = args.latlng;
      this.html = args.html;
      this.group = args.group;
      this.id = args.id;
      this.setMap(args.map);
    }
    createDiv() {
      this.div = document.createElement("div");
      this.div.style.position = "absolute";
      if (this.html) {
        this.div.innerHTML = this.html;
      }
      google.maps.event.addDomListener(this.div, "click", event => {
        google.maps.event.trigger(this, "click");
      });
      google.maps.event.addDomListener(this.div, "mouseover", event => {
        google.maps.event.trigger(this, "mouseover");
      });
      google.maps.event.addDomListener(this.div, "mouseout", event => {
        google.maps.event.trigger(this, "mouseout");
      });
    }
    appendDivToOverlay() {
      const panes = this.getPanes();
      panes.overlayImage.appendChild(this.div);
    }
    positionDiv() {
      const point = this.getProjection().fromLatLngToDivPixel(this.latlng);
      let offset = 25;
      if (point) {
        this.div.style.left = `${point.x - offset}px`;
        this.div.style.top = `${point.y - offset}px`;
      }
    }
    draw() {
      if (!this.div) {
        this.createDiv();
        this.appendDivToOverlay();
      }
      this.positionDiv();
    }
    remove() {
      if (this.div) {
        this.div.parentNode.removeChild(this.div);
        this.div = null;
      }
    }

    getPosition() {
      return this.latlng;
    }
    getDraggable() {
      return false;
    }
  }
  return new HTMLMapMarker();
};
/*
 *
 * Map start here 
*/

function initMap() {

  
  let mockLocation = new google.maps.LatLng(coordinates[0], coordinates[1]);
  map = new google.maps.Map(document.getElementById('map'), {
    center: mockLocation,
    maxZoom: maxZoom, 
    minZoom: minZoom,
    zoom: parseInt(defaultZoom),   
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
    styles: 
    [
        {
          elementType: 'labels', stylers: [{visibility: 'off'}]
        },
        {
          featureType: 'poi',
          elementType: 'geometry',
          stylers: [{visibility: 'off'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{visibility: 'off'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{visibility: 'off'}]
        },
        {
          featureType: 'administrative',
          elementType: 'geometry',
          stylers: [{color: '#A9A9A9'}]
        },
        {
          featureType: 'landscape',
          elementType: 'geometry',
          stylers: [{color: '#A9A9A9'}]
        },
        {
          featureType: 'water',
          stylers: [{color: water}]
        },
        {
          featureType: "administrative",
          elementType: "geometry",
          stylers: [{ visibility: "off" }]
        }
    ]
    
  });
  // map change web to mobile
  // mobile setup
  var isMobile = false;
  // if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
  //     || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
  //     isMobile = true;
  // }
  fetch("public/resources/json/json_list.json")
  .then(response => response.json())
  .then(
    json => defaultLocations.push(json)
  );
  setTimeout(function () {
    loadData(isMobile); 
  },500);
}
  function loadData(isMobile) {
    var locationMarker =  defaultLocations[0]
    // var jsonDetail = jsonDetails[0]
      locationMarker.forEach(element => { 
      (function() {
        var bounds = new google.maps.LatLngBounds();
        let toolTipLocation = new google.maps.LatLng(parseFloat(element.latitude), parseFloat(element.longitude));
        bounds.extend(toolTipLocation);
        marker = createHTMLMapMarker({
          latlng: toolTipLocation,
          map: map,
          html: '<div><div id="marker'+element.idkey+'" class="marker"></div>'+
                '<div id="bubble'+element.idkey+'" class="speechBubbleNone speech-bubble">' +
                '<span class="closeBubble">X</span>' +
                '<div class="titleName">'+element.areaname+'</div>'+
                '<div class="description">タイトルタイトルタイズタイトルタイトル</div>' +
                '<button id="'+element.idkey+'" class="balloonButton" name="open-modal-btn">More information</button></div>',
          optimized:false,
          draggable: false,
          scrollWheelZoom:'center',
          id:element.idkey,
          group:element.group
        
      });    
      markerListArray.push(this.marker);

      // map change web to mobile
      // mobile setup
      if( isMobile == true ) {
        $('#map').css("max-height", '90%')
      }
        })();
      })
    function showModal(jsonDetails) {
        var jsonDetail = [];
        var displayDatas = ""
      fetch("public/resources/json/json_details/"+jsonDetails+".json")
      .then(response => response.json())
      .then(
        json => 
        json.forEach(element => {
          var links = element.link[0]
          displayDatas += '<div id="modalMap" class="modal">'
          displayDatas += '<div class="modal-content">'
          displayDatas += '<span class="close">X</span>'
          displayDatas += '<div class="modal-body">'
          displayDatas += '<div class="title">'
          displayDatas += '<div class="leftSide">'
          displayDatas += '<div class="filters">'
          displayDatas += '<p class="titleModal">'+element.areaname+'</p>'
          displayDatas += '<p class="microTitle">'+element.businessname+'</p>'
          displayDatas += '</div>'
          displayDatas += '</div>'
          displayDatas += '<div class="rightSide">'
          displayDatas += '<p class="mainTitle">'+element.titlename+'</p>'
          displayDatas += '</div></div>'
          displayDatas += '<div class="parentContent">'
          displayDatas += '<div class="childContent">'+element.decription+'</div>'
          displayDatas += '<div class="imageContent">'
          displayDatas += '<div id="carousel" class="carousel">'
          displayDatas += '<div class="slides">'
         for (let i = 0; i < element.image.length; i++) {
            displayDatas += '<div class="slide"><img class="imageSize" src="'+ element.image[i]+'"></div>' 
         }
          displayDatas += '</div>'
          displayDatas += '</div>'
          displayDatas += '<div class="indicators" id="indicators">'
          for (let i = 0; i < element.image.length; i++) {
            displayDatas += '<input class="indicator" name="indicator" data-slide="'+i+'" type="radio" />'
          }
          displayDatas += '</div>'
          displayDatas += '</div></div></div>'
          displayDatas += '<div class="modal-footer">'
          displayDatas += ' <a class="links" href="'+links.href+'" target="'+links.target+'" class="">'+links.text+'</p>'
          displayDatas += '</div></div></div>'

            
          $("#valueThis").html(displayDatas);
          var modal = document.getElementById('modalMap');
          modal.style.display = 'block'; 

          // setTimeout(function(){
            var modal = document.getElementById('modalMap');
            var close = modal.getElementsByClassName('close')[0];
            close.onclick = function() {
              modal.style.display = 'none';
            };
                  
          var carousel = document.getElementById('carousel');
          var indicators = document.getElementById('indicators');
          var slides = carousel.querySelectorAll('.slide');
          var indicator = indicators.querySelectorAll('.indicator');
          
          // defaul image and indicator 
          indicator[0].setAttribute('data-state', 'active');
          slides[0].setAttribute('data-state', 'active');
          indicator[0].checked = true
          
          for (let i = 0; i < indicator.length; i++) {
            indicator[i].addEventListener("click", setSlide(i));
          }

        
          function setSlide(slide) {
            return function() {
                // Reset all slides
                for (var i = 0; i < indicator.length; i++) {
                  indicator[i].setAttribute('data-state', '');
                    slides[i].setAttribute('data-state', '');
                }
        
                // Set defined slide as active
                indicator[slide].setAttribute('data-state', 'active');
                slides[slide].setAttribute('data-state', 'active');
            };
          }
        })
    );
  }

  markerListArray.forEach(markerList => {
    
    markerList.addListener("mouseover", () => { 
      for (let i = 0; i <= this.markerListArray.length; i++) {
        if (markerList.id === i) {
          $("#bubble"+i).removeClass("speechBubbleNone");
        } else {
          $('#bubble'+i).addClass('speechBubbleNone')
        }
      }
    })
    markerList.addListener("mouseout", () => { 
      for (let i = 0; i < this.markerListArray.length; i++) {
          $('#bubble'+i).addClass('speechBubbleNone')
      }
    })

    setTimeout(function(){
      if( isMobile == true ) {
      $("#marker"+markerList.id).click(function() {
        for (let i = 0; i < markerListArray.length; i++) {
          map.setCenter(markerList.getPosition());
            if (markerList.id === i) {
              $("#bubble"+i).removeClass("speechBubbleNone");
            } else {
              $('#bubble'+i).addClass('speechBubbleNone')
            }
          }
        })
      };
    }, 500);

    setTimeout(function() {
        $("#"+markerList.id).on('click',function() {
          $("#bubble"+markerList.id).addClass("speechBubbleNone");
          showModal(this.id)
        })
    }, 500);

  });


  setTimeout(function(){
    $(".closeBubble").on('click',function(){
      $(".speech-bubble").addClass("speechBubbleNone");
    })
  }, 500); 
  
  function hide() {
    for (let i = 0; i < markerListArray.length; i++) {
      markerListArray[i].setMap(null);
    }
  }
  
  function showMarker(marker) {
    marker.forEach(element => {
      element.setMap(map);
      setTimeout(function(){
        // var modal = document.getElementById('modalMap'+ markerList.id);
          $("#"+element.id).on('click',function() {
            // var modal = document.getElementById('modalMap'+ markerList.id);
            // modal.style.display = 'block';  
            $("#bubble"+element.id).addClass("speechBubbleNone");
            showModal(this.id)
          })
      }, 500);
    });
  }

  $("#allGroup").click(function() {
    hide()
    showMarker(markerListArray)
  });
  $("#groupA").click(function() {
    var groupA = []
    groupA.push(markerListArray.filter(p => p.group == "groupA"))
    hide()
    showMarker(groupA[0])
  });
  $("#groupB").click(function() {
    var groupB = []
    groupB.push(markerListArray.filter(p => p.group == "groupB"))
    hide()
    showMarker(groupB[0])
  });
  $("#groupC").click(function() {
    var groupC = []
    groupC.push(markerListArray.filter(p => p.group == "groupC"))
    hide()
    showMarker(groupC[0])
  });
  $("#groupD").click(function() {
    var groupD = []
    groupD.push(markerListArray.filter(p => p.group == "groupD"))
    hide()
    showMarker(groupD[0])
  });
};