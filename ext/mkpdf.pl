use PDF::API2::Lite;
use PDF::API2;
use GD::Barcode;
use Cwd 'abs_path';
use Cwd;
use File::Basename;
use DBI;
use constant mm => 25.4 / 72;

$jpgfname = $ARGV[0];
$pdffname = $ARGV[1];
$width = $ARGV[2];
$height = $ARGV[3];


$pdf = PDF::API2::Lite->new;
$page = $pdf->page($width/mm, $height/mm);
$img = $pdf->image_jpeg("$jpgfname");
$pdf->image($img, 0, 0, $width/mm, $height/mm);
$pdf->saveas("$pdffname");