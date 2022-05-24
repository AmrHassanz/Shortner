
// Navbar Scroll Change
$(window).scroll(function () {
    let windowScroll = $(window).scrollTop();
    if (windowScroll >= 100) {
        $('.navbar').removeClass('navbar-light bg-transparent');
        $('.navbar').addClass('navbar-dark bg-dark');
        $('.btn-up').fadeIn(1000);
        $('.lgoin').addClass('text-white');
        $('.lgoin').removeClass('text-dark');
    }
    else {
        $('.navbar').removeClass('navbar-dark bg-dark');
        $('.navbar').addClass('navbar-light bg-transparent');
        $('.btn-up').fadeOut(1000);
        $('.lgoin').addClass('text-white');
        $('.lgoin').addClass('text-dark');
        $('.lgoin').removeClass('text-white');
    };
})

// Navbar Active
$('.nav-item .link').click(function (e) {
    $('.link').removeClass('active');
    $(this).addClass('active');
})

let urls = [];

// Shortening
let shortnerBtn = document.getElementById('shortnerBtn');
let shortnerInput = document.getElementById('shortnerInput');
let alert = document.querySelector('.alert');
shortnerBtn.addEventListener('click', function () {
    if (validation()) {
        getShortLink(shortnerInput.value);
    }
})
// validation
function validation() {
    var regex = /(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    if (regex.test(shortnerInput.value) && shortnerInput.value != '') {
        alert.style.opacity = '0';
        alert.ineneHtml = '';
        return true
    }
    else {
        alert.style.opacity = '1';
        alert.innerHTML = 'Ex. www.google.com';
        return false;
    }
}

// get data
async function getShortLink(long) {
    let myResponse = await fetch(`https://api.shrtco.de/v2/shorten?url=${long}/very/long/link.html`);
    let data = await myResponse.json();
    let url = {
        original: long,
        short: data.result.short_link
    }
    urls.push(url);
    show();
};

// show
function show() {
    let cartona = '';
    for (let i = 0; i < urls.length; i++) {
        cartona += `        <div class="row gy-2 py-2 my-2 bg-white align-items-center">
        <div class="col-md-6">
          <div class="d-flex align-items-center">
            <p class="main mb-0">${urls[i].original}</p>
          </div>
        </div>
        <div class="col-md-6">
          <div>
            <div class="row gy-2">
              <div class="col-md-9 d-flex align-items-center justify-content-md-end justify-content-start">
                <div>
                  <a class="short mb-0" href="${urls[i].original}" target='_blank'>${urls[i].short}</a>
                </div>
              </div>
              <div class="col-md-3">
                <div>
                  <button onclick="copyUrl(${i})" class="start btn m-0 btn-primary w-100">Copy</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`
    }
    document.querySelector('.urls-list').innerHTML = cartona;
}

// Copy Button
function copyUrl(index) {
    let copyText = urls[index].original;
    navigator.clipboard.writeText(copyText);
}



