<?php

include_once 'model/config.php';

//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'vendor/autoload.php';

if (!empty($_POST)) {


    $recaptcha = $_POST['g-recaptcha-response'];

    // Put secret key here, which we get
    // from google console
    $secret_key = '6LfGwoskAAAAANdGMXQ3R9FjWTuJYEqZmyqGLkIM';

    // Hitting request to the URL, Google will
    // respond with success or error scenario
    $url = 'https://www.google.com/recaptcha/api/siteverify?secret='
          . $secret_key . '&response=' . $recaptcha;

    // Making request to verify captcha
    $response = file_get_contents($url);

    // Response return by google is in
    // JSON format, so we have to parse
    // that json
    $response = json_decode($response);

    // Checking, if response is true or not
    if ($response->success == true) {

    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $email = $_POST['email']; 
    $comment = $_POST['comment'];

    //Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->SMTPDebug = 0;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'jeroldwork@gmail.com';                     //SMTP username
    $mail->Password   = 'htsdqlzfooejxjin';                               //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom('jeroldwork@gmail.com', 'Server');
    $mail->addAddress('jeroldwork@gmail.com', 'Admin');     //Add a recipient

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Pristine Project Form';

   
    

    $message  = "<html><style> @font-face{ font-family: Roboto-Regular; src: url(https://abiteoffrance.com/elephantine2/css/fonts/fonts/Roboto-Regular.ttf');} </style><body>";  
    $message .= "<table align='center' width='100%' cellpadding='0' cellspacing='0' style='max-width:650px; background-color:#fff; border: 1px groove;'>";
    $message .= "<thead>
      <tr height='100'>  
      <th colspan='4' style='background-color:#4b4c4d; color:#fff; font-size:25px; border: 5px groove;'>
      <img src='https://abiteoffrance.com/elephantine2/img/elephantine-logo.png' alt='logo' title='logo' style='height:auto; width:50%; max-width:50%;' />      
      </th> 
      </tr>
                </thead>";
    $message .= "<tbody>

          <th colspan='4' style='background-color:#4b4c4d; font-family: Roboto-Regular; color:#fff; font-size:20px; border: 5px groove;'>      
            Pristine Project Form  
          </th>      
      
          <tr align='left' height='50'>
          <th style='font-size:15px; border: 1px groove; padding-left: 15px; font-family: Roboto-Regular;'>Name</th>
          <td style='font-size:15px; border: 1px groove; padding-left: 15px; font-family: Roboto-Regular;'>".$name."</td>         
          </tr>

          <tr align='left' height='50'>
          <th style='font-size:15px; border: 1px groove; padding-left: 15px; font-family: Roboto-Regular;'>Contact Number</th>
          <td style='font-size:15px; border: 1px groove; padding-left: 15px; font-family: Roboto-Regular;'>".$phone."</td>         
          </tr>

          <tr align='left' height='50'>
          <th style='font-size:15px; border: 1px groove; padding-left: 15px; font-family: Roboto-Regular;'>Mail ID</th>
          <td style='font-size:15px; border: 1px groove; padding-left: 15px; font-family: Roboto-Regular;'>".$email."</td>         
          </tr>

          <tr align='left' height='50'>
          <th style='font-size:15px; border: 1px groove; padding-left: 15px; font-family: Roboto-Regular;'>Message</th>
          <td style='font-size:15px; border: 1px groove; padding-left: 15px; font-family: Roboto-Regular;'>".$comment."</td>         
          </tr>
          </tbody>";
    $message .= "</table>";
    $message .= "</body></html>";   
    $mail->Body = $message;
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';


    $sql = "INSERT INTO  `pristine_form`(`name`, `phone`, `email`, `message`) VALUES ('$name','$phone','$email','$comment')";

    if ((mysqli_query($conn, $sql))&&($mail->send())) {
        echo "<script> 
        alert('Form is submitted successfully');
        window.location.href = 'pristine-project.php';
        </script>";
    } else {

        echo "<script> 
        alert('Form is not submitted Please check again');
        window.location.href = 'pristine-project.php';
        </script>";
    }
} catch (Exception $e) {
    echo "<script> 
        alert('Message could not be sent. Mailer Error: {$mail->ErrorInfo}');
        window.location.href = 'pristine-project.php';
        </script>";
}
} else {
    echo "<script> 
         alert('Error in Google reCAPTACHA');
         window.location.href = 'pristine-project.php';
         </script>";
 }

} else {
    echo 'Post is an empty';
}




