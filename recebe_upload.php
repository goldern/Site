<style>
body{
	background-color: black;
	color: #0c0;
	position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
	right: 0;
}
</style>
<script>
window.setTimeout(function(){

        // Move to a new location or you can do something else
        window.location.href = "http://www.goldern.com.br";

    }, 5000);
</script>
<?php
	//header("refresh:2;url=http://www.goldern.com.br");
	// Pasta onde o arquivo vai ser salvo
	$_UP['pasta'] = 'uploads/';
	// Tamanho máximo do arquivo (em Bytes)
	$_UP['tamanho'] = 1024 * 1024 * 120; // 120	Mb
	// Array com as extensões permitidas
	$_UP['extensoes'] = array('jpg', 'png', 'pdf', 'pptx', 'pptm', 'ppt', 'xps', 'potx', 'potm', 'pot', 'thmx', 'ppsx', 'ppsm', 'pps', 'ppam', 'ppa', 'xml', 'mp4', 'wmv', 'gif', 'tif', 'bmp', 'wmf', 'emf', 'rtf', 'pptx', 'pptx', 'odp', 'docx', 'txt', 'zip', 'rar');
	// Array com os tipos de erros de upload do PHP
	$_UP['erros'][0] = 'Não houve erro';
	$_UP['erros'][1] = 'O arquivo no upload é maior do que o limite do PHP';
	$_UP['erros'][2] = 'O arquivo ultrapassa o limite de tamanho especifiado no HTML';
	$_UP['erros'][3] = 'O upload do arquivo foi feito parcialmente';
	$_UP['erros'][4] = 'Não foi feito o upload do arquivo';
	// Verifica se houve algum erro com o upload. Se sim, exibe a mensagem do erro
	if ($_FILES['arquivo']['error'] != 0) {
	  die("Não foi possível fazer o upload, erro:" . $_UP['erros'][$_FILES['arquivo']['error']]);
	  exit; // Para a execução do script
	}
	// Faz a verificação da extensão do arquivo
	$arquiv = explode('.', $_FILES['arquivo']['name']);
	$extensao = strtolower(end($arquiv));
	if (array_search($extensao, $_UP['extensoes']) === false) {
	  echo "Por favor, envie arquivos com as seguintes extensões: jpg, png, pdf, pptx, pptm, ppt, xps, potx, potm, pot, thmx, ppsx, ppsm, pps, ppam, ppa, xml, mp4, wmv, gif, tif, bmp, wmf, emf, rtf, pptx, pptx, odp, docx, txt, zip, rar";
	  exit;
	}
	// Faz a verificação do tamanho do arquivo
	if ($_UP['tamanho'] < $_FILES['arquivo']['size']) {
	  echo "O arquivo enviado é muito grande, envie arquivos de até 2Mb.";
	  exit;
	}
	// O arquivo passou em todas as verificações, hora de tentar movê-lo para a pasta
	// Primeiro verifica se deve trocar o nome do arquivo

	// Mantém o nome original do arquivo
	$nome_final = $_FILES['arquivo']['name'];

	  
	// Depois verifica se é possível mover o arquivo para a pasta escolhida
	if (move_uploaded_file($_FILES['arquivo']['tmp_name'], $_UP['pasta'] . $nome_final)) {
	  // Upload efetuado com sucesso, exibe uma mensagem e um link para o arquivo
	  echo "Upload efetuado com sucesso!<br>";
	  echo '<a href="' . $_UP['pasta'] . $nome_final . '">Clique aqui para acessar o arquivo</a>';
	  echo '<a href=">';
	} else {
	  // Não foi possível fazer o upload, provavelmente a pasta está incorreta
	  echo "Não foi possível enviar o arquivo, tente novamente";
	}
?>