<?php

function getImageFile($file)
{
    $imagick = new Imagick($file);
    // $imagick = new Imagick(__DIR__ . "/" . $file);
    // $imagick->readImageBlob($imageBlob);
    // $imagick->transformimagecolorspace(Imagick::COLORSPACE_CMYK);
    $imagick->setImageFormat("jpeg");
    $imagick->setImageCompression(Imagick::COMPRESSION_JPEG);
    $imagick->setImageCompressionQuality(50);
    $imagick->setImageUnits(imagick::RESOLUTION_PIXELSPERINCH);
    $imagick->setImageResolution(300, 300);
    // $imagick->writeImage(__DIR__ . "/" . $file);
    return $imagick->getImageBlob();
}

function getImage($data)
{
    $imageBlob = base64_decode($data);
    $imagick = new Imagick();
    $imagick->readImageBlob($imageBlob);
    $imagick->transformimagecolorspace(Imagick::COLORSPACE_CMYK);
    $imagick->setImageFormat("jpeg");
    $imagick->setImageCompression(Imagick::COMPRESSION_JPEG);
    $imagick->setImageCompressionQuality(50);
    $imagick->setImageUnits(imagick::RESOLUTION_PIXELSPERINCH);
    $imagick->setImageResolution(300, 300);
    return $imagick->getImageBlob();
}

function saveImage($data, $file_path)
{
    $imageBlob = base64_decode($data);
    $imagick = new Imagick();
    $imagick->readImageBlob($imageBlob);
    // $imagick->transformimagecolorspace(Imagick::COLORSPACE_CMYK);
    $imagick->setImageFormat("jpeg");
    $imagick->setImageCompression(Imagick::COMPRESSION_JPEG);
    $imagick->setImageCompressionQuality(50);
    $imagick->setImageUnits(imagick::RESOLUTION_PIXELSPERINCH);
    $imagick->setImageResolution(300, 300);
    // $imagick->writeImage(__DIR__ . "/" . $file);
    $imagick->writeImage($file_path);
}

function base64_to_jpeg($base64_string, $output_file)
{
    $ifp = fopen($output_file, "wb");
    fwrite($ifp, base64_decode($base64_string));
    fclose($ifp);
    return ($output_file);
}

if (!empty($_POST['images'])) {
    $orderid = $_POST['orderid'];
    $bleed = $_POST['bleed'];
    $margin = $_POST['margin'];
    $spine = $_POST['spine'];
    $cover_width = $_POST['width'];
    $cover_height = $_POST['height'];

    $cover_pdf = $orderid . '_cover.pdf';
    $main_path = __DIR__ . "/output";


    $images = json_decode($_POST['images']);

    saveImage($images[0], "$main_path/img1.jpg");
    saveImage($images[1], "$main_path/img2.jpg");
    saveImage($images[2], "$main_path/img3.jpg");


    $res = null;
    exec("magick convert $main_path/img1.jpg $main_path/img2.jpg $main_path/img3.jpg +append $main_path/combined.jpg", $res);
    exec("perl ext/mkpdf.pl $main_path/combined.jpg $main_path/$cover_pdf $cover_width $cover_height", $res);
    exec("perl ext/mkcover.pl $main_path $orderid $bleed $margin $cover_width $spine", $res);
    exec('gswin32c.exe -o ' . $main_path . '/' . 'cmyk_' . $cover_pdf . ' -sDEVICE=pdfwrite -sProcessColorModel=DeviceCMYK -sColorConversionStrategy=CMYK -sColorConversionStrategyForImages=CMYK ' . $main_path . '/' . $cover_pdf, $res);
    rename($main_path . '/' . 'cmyk_' . $cover_pdf, $main_path . '/' . $cover_pdf);

    $file = "$main_path/$cover_pdf";

    // cleanup
    unlink("$main_path/img1.jpg");
    unlink("$main_path/img2.jpg");
    unlink("$main_path/img3.jpg");
    rename("$main_path/combined.jpg", "$main_path/$orderid"."_cover.jpg");

    echo base64_encode(file_get_contents($file));
} else {
    echo "No Data Sent";
}
