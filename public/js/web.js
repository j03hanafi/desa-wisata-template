let baseUrl = '';
let currentUrl = '';
let web;
let bounds = new google.maps.LatLngBounds();

function setBaseUrl(url) {
    baseUrl = url;
}

// Initialize and add the map
function initMap(lat = -0.5242972, lng = 100.492333) {
    const center = new google.maps.LatLng(lat, lng);
    map = new google.maps.Map(document.getElementById("googlemaps"), {
        zoom: 18,
        center: center,
        mapTypeId: 'roadmap',
    });
}

// Update radiusValue on search by radius
function updateRadius(postfix) {
    document.getElementById('radiusValue' + postfix).innerHTML = (document.getElementById('inputRadius' + postfix).value * 100) + " m";
}

// display steps of direction to selected route
function showSteps() {
    $('#direction-row').show();
    $('#table-direction').empty();
    for (let i = 0; i < 2; i++) {
        let row =
            '<tr>' +
            '<td>400</td>' +
            '<td>Instruksi ditulis disini</td>' +
            '</tr>';
        $('#table-direction').append(row);
    }
}

// close nearby search section
function closeNearby() {
    $('#direction-row').hide();
    $('#check-nearby-col').hide();
    $('#result-nearby-col').hide();
    $('#list-rg-col').show();
    $('#list-ev-col').show();
}

// open nearby search section
function openNearby() {
    $('#list-rg-col').hide();
    $('#list-ev-col').hide();
    $('#list-rec-col').hide();
    $('#check-nearby-col').show();
}

// Search Result Object Around
function checkNearby() {
    $('#table-cp').empty();
    $('#table-wp').empty();
    $('#table-sp').empty();
    $('#table-cp').hide();
    $('#table-wp').hide();
    $('#table-sp').hide();

    const checkCP = document.getElementById('check-cp').checked;
    const checkWP = document.getElementById('check-wp').checked;
    const checkSP = document.getElementById('check-sp').checked;

    if (!checkCP && !checkWP && !checkSP) {
        document.getElementById('radiusValueNearby').innerHTML = "0 m";
        document.getElementById('inputRadiusNearby').value = 0;
        return Swal.fire('Please choose one object');
    }

    if (checkCP) {
        let table =
            '<thead><tr>' +
            '<th>Culinary Name</th>' +
            '<th>Action</th>' +
            '</tr></thead>' +
            '<tbody id="data-cp">' +
            '</tbody>';
        $('#table-cp').append(table);
        $('#table-cp').show();
    }
    if (checkWP) {
        let table =
            '<thead><tr>' +
            '<th>Worship Name</th>' +
            '<th>Action</th>' +
            '</tr></thead>' +
            '<tbody id="data-wp">' +
            '</tbody>';
        $('#table-wp').append(table);
        $('#table-wp').show();
    }
    if (checkSP) {
        let table =
            '<thead><tr>' +
            '<th>Souvenir Name</th>' +
            '<th>Action</th>' +
            '</tr></thead>' +
            '<tbody id="data-sp">' +
            '</tbody>';
        $('#table-sp').append(table);
        $('#table-sp').show();
    }
    $('#result-nearby-col').show();
}

// Set star by user input
function setStar(star) {
    switch (star) {
        case 'star-1' :
            $("#star-1").addClass('star-checked');
            $("#star-2,#star-3,#star-4,#star-5").removeClass('star-checked');
            document.getElementById('star-rating').value = '1';
            break;
        case 'star-2' :
            $("#star-1,#star-2").addClass('star-checked');
            $("#star-3,#star-4,#star-5").removeClass('star-checked');
            document.getElementById('star-rating').value = '2';
            break;
        case 'star-3' :
            $("#star-1,#star-2,#star-3").addClass('star-checked');
            $("#star-4,#star-5").removeClass('star-checked');
            document.getElementById('star-rating').value = '3';
            break;
        case 'star-4' :
            $("#star-1,#star-2,#star-3,#star-4").addClass('star-checked');
            $("#star-5").removeClass('star-checked');
            document.getElementById('star-rating').value = '4';
            break;
        case 'star-5' :
            $("#star-1,#star-2,#star-3,#star-4,#star-5").addClass('star-checked');
            document.getElementById('star-rating').value = '5';
            break;
    }
    console.log(document.getElementById('star-rating').value)
}

// Create legend
function getLegend() {
    const icons = {
        rg :{
            name: 'Rumah Gadang',
            icon: baseUrl + '/media/icon/marker_rg.png',
        },
        ev :{
            name: 'Event',
            icon: baseUrl + '/media/icon/marker_ev.png',
        },
        cp :{
            name: 'Culinary Place',
            icon: baseUrl + '/media/icon/marker_cp.png',
        },
        wp :{
            name: 'Worship Place',
            icon: baseUrl + '/media/icon/marker_wp.png',
        },
        sp :{
            name: 'Souvenir Place',
            icon: baseUrl + '/media/icon/marker_sp.png',
        },
    }

    const title = '<p class="fw-bold fs-6">Legend</p>';
    $('#legend').append(title);

    for (key in icons) {
        const type = icons[key];
        const name = type.name;
        const icon = type.icon;
        const div = '<div><img src="' + icon + '"> ' + name +'</div>';

        $('#legend').append(div);
    }
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);
}

// toggle legend element
function viewLegend() {
    if ($('#legend').is(':hidden')) {
        $('#legend').show();
    } else {
        $('#legend').hide();
    }
}

// Validate if star rating picked yet
function checkStar(event) {
    const star = document.getElementById('star-rating').value;
    if (star == '0') {
        event.preventDefault();
        Swal.fire('Please put rating star');
    }
}

// Update preview of uploaded photo profile
function showPreview(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            $('#avatar-preview').attr('src', e.target.result).width(300).height(300);
        };
        reader.readAsDataURL(input.files[0]);
    }
}