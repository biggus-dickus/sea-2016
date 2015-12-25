// Google map object instance
function initMap() {
  var contentStringKiev = '<h3 class="map__header">Киев, DEC place</h3>' +
                      '<p class="map__text">б-р Леси Украинки, 23б</p>' +
                      '<p class="map__text">29 января: 14:30–20:00</p>' +
                      '<p class="map__text">30 января: 11:00–16:00</p>';
  var contentStringOdessa = '<h3 class="map__header">Одесса, гостиница «Бристоль»</h3>' +
                            '<p class="map__text">ул. Пушкинская, 15</p>' +
                            '<p class="map__text">31 января: 12:00–17:00</p>';
  var myMarkerKiev = {lat: 50.424002, lng: 30.543470};
  var myMarkerOdessa = {lat: 46.481195, lng: 30.742999};

  var mapKiev = new google.maps.Map(document.getElementById('map-kiev'), {
    center: myMarkerKiev,
    zoom: 17,
    scrollwheel: false
  });

  var mapOdessa = new google.maps.Map(document.getElementById('map-odessa'), {
    center: myMarkerOdessa,
    zoom: 17,
    scrollwheel: false
  });

  var infoWindowKiev = new google.maps.InfoWindow({
    content: contentStringKiev
  });

  var infoWindowOdessa = new google.maps.InfoWindow({
    content: contentStringOdessa
  });

  var markerKiev = new google.maps.Marker({
    position: myMarkerKiev,
    map: mapKiev
  });
  markerKiev.addListener('click', function() {
    infoWindowKiev.open(mapKiev, markerKiev);
  });

  var markerOdessa = new google.maps.Marker({
    position: myMarkerOdessa,
    map: mapOdessa
  });
  markerOdessa.addListener('click', function() {
    infoWindowOdessa.open(mapOdessa, markerOdessa);
  });
}

// Smooth transition to anchor
$('a[data-anchor="smooth-scroll"]').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
      || location.hostname == this.hostname) {

      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
         if (target.length) {
         $('html,body').animate({
           scrollTop: target.offset().top
        }, 500);
        return false;
      }
    }
  });

// Hiding and showing maps on click
(function() {
  var mapKiev = document.getElementById('map-kiev');
  var mapOdessa = document.getElementById('map-odessa');
  var switcherKiev = document.getElementById('kiev-map');
  var switcherOdessa = document.getElementById('odessa-map');

  window.onload = function() {
    mapOdessa.classList.add('hidden');
  }

  function hideMap() {
    mapKiev.classList.toggle('hidden');
    mapOdessa.classList.toggle('hidden');
  }

  switcherKiev.onclick = hideMap;
  switcherOdessa.onclick = hideMap;
})();

// Form scripts
(function() {
  var regForm = document.querySelector('.sea-form');
  var regSuccess = document.querySelector('.reg-success');
  var submitButton = document.getElementById('submitButton');
  var phone = regForm['parentPhone'];
  var wheres = regForm['wheres'];
  var customFieldContainer = document.getElementById('customFieldContainer');

  // Enabling the validator
  $(regForm).validator();

  // Setting the phone mask
  $('#parentPhone').mask('00 0000000');

  phone.onfocus = function() {
    this.classList.add('form-control--phone-mask');
  }

  // Show custom input field
  wheres.addEventListener('change', function() {
    if (wheres.options['myVariant'].selected) {
      customFieldContainer.classList.remove('hidden');
    } else {
      customFieldContainer.classList.add('hidden');
    }
  });

  // Sending via xhr
  if (!('FormData' in window)) {
    return;
  }

  $(regForm).validator().on('submit', function(e) {
     if (e.isDefaultPrevented()) {
      regForm.classList.toggle('form-invalid');
    } else {
      e.preventDefault();
      var data = new FormData(regForm);
      var xhr = new XMLHttpRequest();

      xhr.open('POST', 'http://dec-edu.com/sea-2016/index.php');
      xhr.addEventListener('readystatechange', function() {
        if (xhr.readyState === 4) {
          regForm.classList.add('hidden');
          regSuccess.classList.remove('hidden');
        }
      });
      xhr.send(data);
    }
  });
})();
