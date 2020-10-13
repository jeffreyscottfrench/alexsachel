window.addEventListener( "load", function () {

  function sendData( ncForm ) {
    const XHR = new XMLHttpRequest();

    // Bind the FormData object and the form element
    const FD = new FormData( ncForm );

    // Define what happens on successful data submission
    XHR.addEventListener( "load", function( event ) {
      let res = JSON.parse( event.target.responseText );

      if (  res.success === true ) {
        // SUCCESS!
        formConfirm('alert__success', 'Thank you for reaching out! I will get back to you as soon as possible.');
      } else {
        // ERROR!
        formConfirm('alert__failure', `Hmmm looks like something went wrong trying to send your info, try that again please! <br><br> ${res.error}`);
      }
    });

    // Define what happens in case of error
    XHR.addEventListener( "error", function( event ) {
      let res = JSON.parse( event.target.responseText );

      formConfirm('alert__failure', `Hmmm looks like something went wrong on our end, try that again please! <br><br> ${res.error}`);
    } );

    // Set up our request
    XHR.open( "POST", "/secure_scripts/newClient-phpmailerAJAX.php" );

    // Send our FormData object; HTTP headers are set automatically
    XHR.send( FD );
    formConfirm('alert__progress', 'Sending your info...');
  }

  // Access the form element...
  const ncForm = document.getElementById( "form-newClient" );

  // ...and take over its submit event.
  ncForm.addEventListener( "submit", function ( event ) {
    event.preventDefault();
    sendData( ncForm );
  } );
} );