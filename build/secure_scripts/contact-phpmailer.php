<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

date_default_timezone_set('Etc/UTC');

require '/home/users/web/b2074/pow.lsfrock/PHPMailer/src/Exception.php';
require '/home/users/web/b2074/pow.lsfrock/PHPMailer/src/PHPMailer.php';
require '/home/users/web/b2074/pow.lsfrock/PHPMailer/src/SMTP.php';
require '/home/users/web/b2074/pow.lsfrock/secure_scripts/alexsachel_credentials-phpmailer.php';


// get values from form
$name = $_POST['name'];
$email = $_POST['email'];
$main_phone = $_POST['main_phone'];
$comments = $_POST['comments'];
$secretinfo = $_POST['info'];
$welcome_msg = 'Thank you for your reaching out, I will get back to you as soon as possible!';

if (!preg_match("/\S+/",$name))
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
  $emess.= "<tr>\r\n<td style='padding-top: 30px; padding-bottom: 5px; max-width: 200px; color:#888888'>Name:</td>\r\n<td style='padding-top: 30px; padding-bottom: 5px;'>".$name."</td></tr>\r\n";
  $emess.= "<tr>\r\n<td style='padding-top: 15px; padding-bottom: 5px; max-width: 200px; color:#888888'>Email:</td>\r\n<td style='padding-top: 15px; padding-bottom: 5px;'>".$email."</td></tr>\r\n";
  $emess.= "<tr>\r\n<td style='padding-top: 15px; padding-bottom: 5px; max-width: 200px; color:#888888'>Phone Number:</td>\r\n<td style='padding-top: 15px; padding-bottom: 5px;'>".$main_phone."</td></tr>\r\n";
  $emess.= "<tr>\r\n<td colspan='2' style='padding-top: 45px; padding-bottom: 5px; color:#888888'>Message:</td></tr>\r\n";
  $emess.= "<tr>\r\n<td colspan='2' style=' border-top: 1px solid #dddddd; border-bottom: 1px solid #dddddd;padding-top: 10px; padding-bottom: 60px;'>".$comments."</td></tr>\r\n";
  $emess.= "</table>\r\n";
  $emess.= "</body></html>\r\n";

  // AltBody for nonHTML email clients (as if!)
  $eAltMess = $welcome_msg."\r\n";
  $eAltMess.= "Name: ".$name."\r\n";
  $eAltMess.= "Email: ".$email."\r\n";
  $eAltMess.= "Phone Number: ".$main_phone."\r\n";
  $eAltMess.= "Message:\r\n";
  $eAltMess.= $comments."\r\n";

  $esubj = $name." - via Contact Form from AlexSachel.com";

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
  $mail->addAddress('alex@alexsachel.com', 'Alex Sachel'); // where to
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
    header("Location: http://alexsachel.com/preview/#section-contact?contact-failure");
  } else {
    header("Location: http://alexsachel.com/preview/#section-contact?contact-success");
  }
}
?>
