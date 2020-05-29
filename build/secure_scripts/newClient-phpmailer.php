<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

date_default_timezone_set('Etc/UTC');

require '/home/users/web/b2074/pow.lsfrock/PHPMailer/src/Exception.php';
require '/home/users/web/b2074/pow.lsfrock/PHPMailer/src/PHPMailer.php';
require '/home/users/web/b2074/pow.lsfrock/PHPMailer/src/SMTP.php';
require '/home/users/web/b2074/pow.lsfrock/secure_scripts/alexsachel_credentials-phpmailer.php';

// validate its from the form
if ($_POST['info'] !== "") {
  header('Location: http://alexsachel.com/#form-newClient?contact-failure');
  die();
}

// get values from form
$fname = $_POST['fname'];
$lname = $_POST['lname'];
$email = $_POST['email'];
$main_phone = $_POST['main_phone'];
$street = $_POST['street'];
$city = $_POST['city'];
$state = $_POST['state'];
$zipcode = $_POST['zipcode'];
$birthdate = $_POST['birthdate'];
$occupation = $_POST['occupation'];
$problems = $_POST['problems'];
$style = $_POST['style'];
$favorites = $_POST['favorites'];
$referredby = $_POST['referredby'];
$comments = $_POST['comments'];
$secretinfo = $_POST['info'];
$welcome_msg = 'Thank you for your reaching out, I will get back to you as soon as possible!';

if (!preg_match("/\S+/",$fname))
{
  $message = "Looks like you forgot your name!";
  echo($message);
}
if (!preg_match("/\S+/",$lname))
{
  $message = "Looks like you forgot your name!";
  echo($message);
}
if (!preg_match("/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i",$email))
{
  $message = "Email Address is not in a valid format. Please try again.";
  echo($message);
}

if ($secretinfo == "")
{

  // HTML Body
  $emess = "<html><body style='color: #333333; font-size: 16px;'>\r\n";
  $emess.= "<table align='center' width='100%' style='max-width: 400px;'>\r\n";
  $emess.= "<tr>\r\n<td colspan='2' style='border-top: 1px solid #dddddd; border-bottom: 1px solid #dddddd;  vertical-align: middle; text-align: center; padding-top: 30px; padding-bottom: 25px;'>\r\n<img src='http://alexsachel.com/images/logo__email_contact_form.png' alt='Alex Sachel' width='300' border='0' style='height: auto; max-width: 300px;'>\r\n</td></tr>\r\n";
  $emess.= "<tr>\r\n<td colspan='2' style='padding-top: 30px; padding-bottom: 5px; font-size: 18px; color: #888888; text-align: center;'><strong><em>".$welcome_msg."</em><strong></td></tr>\r\n";
  $emess.= "<tr>\r\n<td style='padding-top: 30px; padding-bottom: 5px; max-width: 200px; color:#888888'>Name:</td>\r\n<td style='padding-top: 30px; padding-bottom: 5px;'>".$fname." ".$lname."</td></tr>\r\n";
  $emess.= "<tr>\r\n<td style='padding-top: 15px; padding-bottom: 5px; max-width: 200px; color:#888888'>Email:</td>\r\n<td style='padding-top: 15px; padding-bottom: 5px;'>".$email."</td></tr>\r\n";
  $emess.= "<tr>\r\n<td style='padding-top: 15px; padding-bottom: 5px; max-width: 200px; color:#888888'>Phone Number:</td>\r\n<td style='padding-top: 15px; padding-bottom: 5px;'>".$main_phone."</td></tr>\r\n";
  $emess.= "<tr>\r\n<td style='padding-top: 15px; padding-bottom: 5px; max-width: 200px; color:#888888'>Address:</td>\r\n<td style='padding-top: 15px; padding-bottom: 5px;'>".$street."</td></tr>\r\n";
  $emess.= "<tr>\r\n<td style='padding-top: 15px; padding-bottom: 5px; max-width: 200px; color:#888888'>City:</td>\r\n<td style='padding-top: 15px; padding-bottom: 5px;'>".$city."</td></tr>\r\n";
  $emess.= "<tr>\r\n<td style='padding-top: 15px; padding-bottom: 5px; max-width: 200px; color:#888888'>State:</td>\r\n<td style='padding-top: 15px; padding-bottom: 5px;'>".$state."</td></tr>\r\n";
  $emess.= "<tr>\r\n<td style='padding-top: 15px; padding-bottom: 5px; max-width: 200px; color:#888888'>Zipcode:</td>\r\n<td style='padding-top: 15px; padding-bottom: 5px;'>".$zipcode."</td></tr>\r\n";
  $emess.= "<tr>\r\n<td style='padding-top: 15px; padding-bottom: 5px; max-width: 200px; color:#888888'>Birth Date:</td>\r\n<td style='padding-top: 15px; padding-bottom: 5px;'>".$birthdate."</td></tr>\r\n";
  $emess.= "<tr>\r\n<td style='padding-top: 15px; padding-bottom: 5px; max-width: 200px; color:#888888'>Occupation:</td>\r\n<td style='padding-top: 15px; padding-bottom: 5px;'>".$occupation."</td></tr>\r\n";
  $emess.= "<tr>\r\n<td colspan='2' style='padding-top: 45px; padding-bottom: 5px; color:#888888'>What kind of problems are you looking for help with?:</td></tr>\r\n";
  $emess.= "<tr>\r\n<td colspan='2' style=' border-top: 1px solid #dddddd; border-bottom: 1px solid #dddddd;padding-top: 10px; padding-bottom: 60px;'>".$problems."</td></tr>\r\n";
  $emess.= "<tr>\r\n<td colspan='2' style='padding-top: 45px; padding-bottom: 5px; color:#888888'>Describe your style as best as you can:</td></tr>\r\n";
  $emess.= "<tr>\r\n<td colspan='2' style=' border-top: 1px solid #dddddd; border-bottom: 1px solid #dddddd;padding-top: 10px; padding-bottom: 60px;'>".$style."</td></tr>\r\n";
  $emess.= "<tr>\r\n<td colspan='2' style='padding-top: 45px; padding-bottom: 5px; color:#888888'>Tell us some of your favorite stores, labels and/or designers:</td></tr>\r\n";
  $emess.= "<tr>\r\n<td colspan='2' style=' border-top: 1px solid #dddddd; border-bottom: 1px solid #dddddd;padding-top: 10px; padding-bottom: 60px;'>".$favorites."</td></tr>\r\n";
  $emess.= "<tr>\r\n<td colspan='2' style='padding-top: 45px; padding-bottom: 5px; color:#888888'>How did you hear about ACS Style Consulting?:</td></tr>\r\n";
  $emess.= "<tr>\r\n<td colspan='2' style=' border-top: 1px solid #dddddd; border-bottom: 1px solid #dddddd;padding-top: 10px; padding-bottom: 60px;'>".$referredby."</td></tr>\r\n";
  $emess.= "<tr>\r\n<td colspan='2' style='padding-top: 45px; padding-bottom: 5px; color:#888888'>Anything else you'd like us to know:</td></tr>\r\n";
  $emess.= "<tr>\r\n<td colspan='2' style=' border-top: 1px solid #dddddd; border-bottom: 1px solid #dddddd;padding-top: 10px; padding-bottom: 60px;'>".$comments."</td></tr>\r\n";
  $emess.= "</table>\r\n";
  $emess.= "</body></html>\r\n";

  // AltBody for nonHTML email clients (as if!)
  $eAltMess = $welcome_msg."\r\n";
  $eAltMess.= "Name: ".$fname." ".$lname."\r\n";
  $eAltMess.= "Email: ".$email."\r\n";
  $eAltMess.= "Phone Number: ".$main_phone."\r\n";
  $eAltMess.= "Address: ".$street."\r\n";
  $eAltMess.= "State: ".$state."\r\n";
  $eAltMess.= "City: ".$city."\r\n";
  $eAltMess.= "Zip: ".$zipcode."\r\n";
  $eAltMess.= "Birth Date: ".$birthdate."\r\n";
  $eAltMess.= "Occupation: ".$occupation."\r\n";
  $eAltMess.= "Problem Areas:\r\n";
  $eAltMess.= $problems."\r\n";
  $eAltMess.= "Style:\r\n";
  $eAltMess.= $style."\r\n";
  $eAltMess.= "Favorites:\r\n";
  $eAltMess.= $favorites."\r\n";
  $eAltMess.= "Referred by:\r\n";
  $eAltMess.= $referredby."\r\n";
  $eAltMess.= "Message:\r\n";
  $eAltMess.= $comments."\r\n";

  $esubj = $name." - via New Client Form from AlexSachel.com";

  // uncomment below to use default PHP mail() function
  // $ehead = "MIME-Version: 1.0\r\n";
  // $ehead.= "Content-type: text/html; charset=UTF-8\r\n";
  // to header is set as first arg of mail()
  // $ehead.= "From: ".$name."<".$email.">\r\n";
  // $ehead.= "Reply-To: ".$email."\r\n";
  // $ehead.= "CC: ".$email."\r\n";
  // $ehead.= "BCC: ".$myBCCemail."\r\n";

  // mail("$myemail","$esubj","$emess","$ehead");



  $mail = new PHPMailer;
  $mail->isSMTP();
  $mail->SMTPDebug = 0;
  $mail->Host = 'smtp.gmail.com';
  $mail->Port = 587;
  $mail->SMTPSecure = 'tls';
  $mail->SMTPAuth = true;
  $mail->Username = $Username;
  $mail->Password = $Password;
  $mail->setFrom('contact@alexsachel.com', 'Contact Form');
  // $mail->addAddress('alex@alexsachel.com', 'Alex Sachel'); // where to
  $mail->addAddress('jeffreyscottfrench@gmail.com', ''); // where to
  $mail->addReplyTo("$email", "$name"); // form email field

  // uncomment to cc the person submitting the form
  // $mail->addCC("$email"); // form email field

  // $mail->addBCC('other@domain.com');
  $mail->isHTML(true);
  $mail->Subject  = "$esubj";
  $mail->Body     = "$emess";
  $mail->AltBody  = "$eAltMess";
  if(!$mail->send()) {
    error_log('Contact Form Error: ' . $mail->ErrorInfo, 0);
    error_log('Contact Form Error: ' . $mail->ErrorInfo, 1, 'jeffreyscottfrench@gmail.com');
    header("Location: http://alexsachel.com/preview/#form-newClient?contact-failure");
  } else {
    header("Location: http://alexsachel.com/preview/#form-newClient?contact-success");
  }
}
?>
