window.addEventListener( "load", function () {
  function sendData() {
    const XHR = new XMLHttpRequest();

    // Bind the FormData object and the form element
    const FD = new FormData( form );

    // Define what happens on successful data submission
    XHR.addEventListener( "load", function() {
      let res = JSON.parse(this.response);

      if (res.status) {
        // SUCCESS!
        formConfirm('alert__success', 'Thank you for reaching out! I will get back to you as soon as possible.');
      } else {
        // ERROR!
        formConfirm('alert__failure', 'Hmmm looks like something went wrong, try that again please!');
      }
    });

    // Define what happens in case of error
    XHR.addEventListener( "error", function( event ) {
      formConfirm('alert__failure', 'Hmmm looks like something went wrong, try that again please!');
    } );

    // Set up our request
    XHR.open( "POST", "/secure_scripts/newClient-phpmailerAJAX.php" );

    // The data sent is what the user provided in the form
    XHR.send( FD );
  }

  // Access the form element...
  const form = document.getElementById( "form-newClient" );

  // ...and take over its submit event.
  form.addEventListener( "submit", function ( event ) {
    event.preventDefault();

    sendData();
  } );
} );