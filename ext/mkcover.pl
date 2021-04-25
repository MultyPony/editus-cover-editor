use PDF::API2::Lite;
use PDF::API2;
use GD::Barcode;
use Cwd 'abs_path';
use Cwd;
use File::Basename;
use DBI;
use POSIX;
use constant mm => 25.4 / 72;


# Аргументы на вход:
# 1 - main_path
# 2 - orderid
# 3 - bleed
# 4 - margin
# 5 - width
# 6 - spine

$main_path = $ARGV[0];
$orderid = $ARGV[1];
$cover_bleed = $ARGV[2];
$cover_margin = $ARGV[3];
$cover_width = $ARGV[4];
$cover_spine = $ARGV[5];

$cover_file = $orderid . '_cover.pdf';
$barcode_file = $orderid . '_barcode.pdf';
$cover_file_bc = $orderid . '_cover_bc.pdf'; 

# Сделать Штрих код (имя_файла_штрих_кода, номер_штрих_кода)
$bc = $main_path . '/' . $barcode_file;
`python ./ext/createbarcodepdf.py $bc $orderid`;

# Отступ Штрих код снизу
$bottom_offset = $cover_margin + $cover_bleed;
$bottom_offset = ceil($bottom_offset / mm);

$cf = $main_path . '/' . $cover_file;

# Отступ Штрих код слева
$back_width = ($cover_width/mm / 2) - (ceil($cover_spine / mm) / 2);
$left_offset = $back_width - (ceil(40 / mm) + ceil($cover_margin / mm) );


$pdf = PDF::API2->new();
$old = PDF::API2->open("$cf");
$old2 = PDF::API2->open("$bc");
$page = $pdf->importpage($old, 1);
$gfx = $page->gfx();
$xo2 = $pdf->importPageIntoForm($old2, 1);
$gfx->formimage($xo2, $left_offset, $bottom_offset, 0.9);
$pdf->saveas("$cf");