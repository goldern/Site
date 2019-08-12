<?php
	$dir    = 'uploads';
	$files1 = scandir($dir);
	//print_r($files1);
	if(isset($files1[2])){
		foreach(array_slice($files1, 2) as $key=>$value){
			echo $value.";";
		}
	}
?>