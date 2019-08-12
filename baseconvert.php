<?php
$numero = $_GET['num'];
$base1 = $_GET['bas1'];
$base2 = $_GET['bas2'];
require __DIR__ . '/src/autoload.php';

$converter = new Riimu\Kit\BaseConversion\BaseConverter((int)$base1, (int)$base2);
$converter->setPrecision(10);
echo $converter->convert($numero) . PHP_EOL; // Outputs '0.101100101'