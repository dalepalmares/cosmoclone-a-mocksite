const arrow = $(".down-arrow span")[0];

window.onload = function () {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);

  lax.setup(); // init

  const updateLax = () => {
    lax.update(window.scrollY);
    window.requestAnimationFrame(updateLax);
  };

  window.requestAnimationFrame(updateLax);
};

function slide() {
  anime({
    targets: arrow,
    keyframes: [{ translateY: 10 }, { translateY: 0 }],
    duration: 250,
    easing: "easeInOutSine",
    loop: false,
  });
}

//* Down Arrow Blur on Scroll
$("#down-arrow-section")
  .css("opacity", 1) // immediately hide element
  .waypoint(
    function (direction) {
      if (direction === "down") {
        $(this.element).animate({ opacity: 0 });
      } else {
        $(this.element).animate({ opacity: 1 });
      }
    },
    {
      offset: "20%",
    }
  );

//* Scroll to Services On Click
$(".down-arrow").click(function () {
  $([document.documentElement, document.body]).animate(
    {
      scrollTop: $("#services").offset().top,
    },
    1500
  );
});

//* Typewriting
var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};
