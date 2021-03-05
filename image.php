<?php

// ===== VAR 1 =====

// header('Content-type: image/jpeg');
// $image = new Imagick(realpath('shrek-rgb.jpg'));
// $image->transformimagecolorspace(Imagick::COLORSPACE_CMYK);

// ===== END VAR 1 =====  


// ===== VAR 2 =====

if(!empty($_POST['name'])){

    $data = $_POST['name'];
    $imageBlob = base64_decode($data);
    $imagick = new Imagick();
    $imagick->readImageBlob($imageBlob);
    
    $imagick->transformimagecolorspace(Imagick::COLORSPACE_CMYK);

    header("Content-Type: image/jpeg");
    $imagick->setImageFormat("jpeg");
    $imagick->setImageCompression(Imagick::COMPRESSION_JPEG);
    $imagick->setImageCompressionQuality(50);

    $imagick->setImageUnits(imagick::RESOLUTION_PIXELSPERINCH);
    $imagick->setImageResolution(300,300);

    // echo $imagick->getImageBlob();    
    echo base64_encode($imagick->getImageBlob());    
} else {
    echo "No Data Sent"; 
}
// exit();

// ===== END VAR 2 =====


?>