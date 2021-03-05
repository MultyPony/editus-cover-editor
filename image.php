<?php
	if(!empty($_POST['image'])){
			$data = $_POST['image'];
			$imageBlob = base64_decode($data);
			$imagick = new Imagick();
			$imagick->readImageBlob($imageBlob);
			$imagick->transformimagecolorspace(Imagick::COLORSPACE_CMYK);
			$imagick->setImageFormat("jpeg");
			$imagick->setImageCompression(Imagick::COMPRESSION_JPEG);
			$imagick->setImageCompressionQuality(50);
			$imagick->setImageUnits(imagick::RESOLUTION_PIXELSPERINCH);
			$imagick->setImageResolution(300,300);
	} else {
			echo "No Data Sent"; 
	}
?>

<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Превью обложки</title>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Lora&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/pdf-viewer.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.3.0/jspdf.umd.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  </head>
  <body>
    <div class="container">
      <h1>Превью обложки</h1>
        <div id="app">
        <div role="toolbar" id="toolbar">
            <div id="pager">
            <button data-pager="prev">prev</button>
            <button data-pager="next">next</button>
            </div>
            <div id="page-mode">
            <label>Page Mode <input type="number" value="1" min="1"/></label>
            </div>
        </div>
        <div id="viewport-container"><div role="main" id="viewport"></div></div>
      </div>
			<button>Продолжить</button>
    </div>
		<script src="https://unpkg.com/pdfjs-dist@2.0.489/build/pdf.min.js"></script>
    <script src="js/showpdf.js"></script>
    <script>
        const { jsPDF } = window.jspdf;
        let imgD = '<?php echo base64_encode($imagick->getImageBlob());?>';
        let doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
				const page = doc.getCurrentPageInfo();
				page.pageContext.trimBox = {
					bottomLeftX: 2,
					bottomLeftY: 2,
					topRightX:   8,
					topRightY:   8,
				};
				doc.addImage(imgD, "JPEG", 0, 0, 210, 297, 'NONE');
        initPDFViewer(doc.output());
    </script>
  </body>
</html>