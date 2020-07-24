<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require '../../PHPMailer/src/Exception.php';
require '../../PHPMailer/src/PHPMailer.php';
require '../../PHPMailer/src/SMTP.php';

if (isset($_POST['file_name']) == true)
{
    $file_name = $_POST['file_name']; // 
}

// Instantiation and passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    //Server settings
    //$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      // Enable verbose debug output
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host       = 'ssl://smtp.gmail.com';                    // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
		$mail->Username   = 'sender@mail.com';								      // SMTP username -- fill this in
    $mail->Password   = 'password';               			        // SMTP password -- fill this in
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
    $mail->Port       = 465;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

    //Recipients
    $mail->setFrom('sender@mail.com', 'Mailer'); 						// The sender you see in your inbox the same as your
    $mail->addAddress('you@mail.com','You');     						// Add a recipient
//    $mail->addReplyTo('info@example.com', 'Information');
    $mail->addCC('amyzou@berkeley.edu');
//    $mail->addBCC('bcc@example.com');

    // Attachments
    $mail->addAttachment($file_name);         // Add attachments
//    $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

    // Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = '';																	// email subject
    $mail->Body    = "";																  // email body text
    $mail->AltBody = "";																	// email body text if no formatting

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
?>
