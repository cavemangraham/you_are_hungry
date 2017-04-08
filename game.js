
var ViewModel=function(selector){
    this.dom=document.querySelector(selector);//here DOM element
    this.value=null;
};

ViewModel.prototype.set=function(value){
    if (value===this.value)
    return;//the same value

    this.value=value;//new value

    this.dom.innerText=this.value;
};

ViewModel.prototype.get=function(){
   return this.value;
};

//usage
var tickView = new ViewModel("#tick_display");
var meatView = new ViewModel("#meat-counter");

var ticks = 1;
var huntTimer = 0;
var meat = 0;
var hibernateFlag = false;
var huntCount = 0;

meatView.set(meat);

//change in interval:
setInterval(function(){ tickView.set( ticks++ ); },1000);

setInterval(function(){
  huntTimer++
  if( tickView.get() == 3 ) {
    $( "#text_display" ).prepend(
      $( "<p>...</p>" ).hide().fadeIn(1000)
    );
  };
  if( tickView.get() == 6 ) {
    $( "#text_display" ).prepend(
      $("<p>you slither out from the warmth</p>" ).hide().fadeIn(1000)
    );
  };
  if( tickView.get() == 9 ) {
    $( "#text_display" ).prepend(
      $("<p>the cold air stings</p>" ).hide().fadeIn(1000)
    );
  };
  if( tickView.get() == 12 ) {
    $( "#text_display" ).prepend(
      $("<p>you are hungry</p>" ).hide().fadeIn(1000)
    );
    $( "#meat-resource" ).show().hide().fadeIn(1000)
  };
  if( tickView.get() == 15 ) {
    $( "#hunt-action-btn" ).show().hide().fadeIn(1500);
    $( "#hunt-action-progress" ).show().hide().fadeIn(1500);
  };
  if( meatView.get() == 50 && hibernateFlag == false ) {
    hibernateFlag = true;
    setTimeout(function(){
      $( "#text_display" ).prepend(
        $("<p>you are feeling sleepy</p>" ).hide().fadeIn(1000)
      );
    }, 2000);
    setTimeout(function(){
      $( "#hibernate-action-btn" ).css("visibility", "visible").hide().fadeIn(1500);
    }, 3000);
  };

  if ($("#hunt-action-btn").css('display') == 'none'){
    huntTimer = 10;
  };

  if ($("#hunt-action-btn").css('display') == 'inline-block'){
    if (huntTimer*10 > 100) {
      huntTimer = 10;
    }
    $('#hunt-action-progress-bar').attr('aria-valuenow', huntTimer*10).css('width', huntTimer*10 + '%');
  };

},1000);

$( "#hunt-action-btn" ).click(function() {
  if ( $( "#hunt-action-progress-bar" ).attr('aria-valuenow') == 100 ) {
    huntTimer = -1;
    huntCount++

    if (huntCount == 1) {
      setTimeout(function(){
        $( "#text_display" ).prepend(
            $("<p>you like the taste of blood</p>" ).hide().fadeIn(1000)
        );
      }, 5000);
    };

    if (huntCount == 3) {
      setTimeout(function(){
        $( "#text_display" ).prepend(
            $("<p>killing is fun</p>" ).hide().fadeIn(1000)
        );
      }, 5000);
    };

    $( "#hunt-action-progress-bar" ).attr('aria-valuenow', 0).css('width', 0 + '%');
    $( "#text_display" ).prepend(
      $("<p>+10 meat</p>" ).hide().fadeIn(1000)
    );

    if (meatView.get() >= 50) {
      meat = 50
    } else {
      meat = meat + 10
    }
    meatView.set( meat );
  };
});

$( "#hibernate-action-btn" ).click(function() {
  if (meatView.get() >= 50) {
      meat = 0
  } else {
    $( "#text_display" ).prepend(
      $("<p>you don't have enough meat</p>" ).hide().fadeIn(1000)
    );
  }
  meatView.set(meat)
});




