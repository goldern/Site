	var lastMessage, resultIndex, isWaiting, distan, senha;
	var buffer = [];
	var lastCommands = new Array();

	function focar(){
		document.getElementById("prompt2").focus();
	}

	function htmlDecode(input){
	  var e = document.createElement('div');
	  e.innerHTML = input;
	  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
	}

	function Contem(valor,regra){
	//Regras:
	//0 = valor apenas no início do texto
	//1 = valor apenas no final do texto
	//2 = valor em qualquer lugar menos no início ou no fim
	//3 = valor em qualquer lugar do texto*
		content = document.getElementById("prompt2").value;
		var resultado = content.split(" ");
		for(index = 0;index < resultado.length; ++index){
			for(i = 0;i < valor.length; ++i){
				if(resultado[index] == valor[i]){
					if(regra == 0 && index == 0){
						return[resultado[index], index];//Contem()[0]=string;Contem()[1]=index
					}else
					if(regra == 1 && index == resultado.length-1){
						return[resultado[index], index];//Contem()[0]=string;Contem()[1]=index
					}else
					if(regra == 2 && index != 0 && index != resultado.length-1){
						return[resultado[index], index];//Contem()[0]=string;Contem()[1]=index
					}else
					if(regra == 3||regra == null){
						return[resultado[index], index];//Contem()[0]=string;Contem()[1]=index
					}
				}
			}
		}
	}

	function elemento(content, ltyn, elem, hasText, extra){
		var br = document.createElement("br");
		var element = document.createElement(elem);
		if(elem=="div"){element.className = "text";}
		if(elem=="a"){element.setAttribute("href", content);
		element.className = "text";
		element.style = "text-decoration: underline;"}
		if(hasText != null){content = hasText;}
		if(extra != null){element.className += " " + extra;}
		if(ltyn=="y"){element.appendChild(document.createTextNode(">"+content));}
		if(ltyn=="n"){element.appendChild(document.createTextNode(content)); element.appendChild(br);}
		document.getElementById('terminal').appendChild(element);
	}

	function openDialog() {
	  document.getElementById('file-input').click();
	}

	document.onkeydown = function (e) {
		if(e.key == "ArrowUp"){
			e.preventDefault();
		}
		e = e || window.event;
		content = document.getElementById("prompt2").value;
		if(e.key == "Enter" && content != ""){
			lastCommands.push(content); //Inserir comando na lista de comandos da sessão anterior
			escrever(content);
		}
		if(e.key == "ArrowUp" && lastMessage != ""){
			document.getElementById("prompt2").value = lastMessage;
			var input = $("#prompt2");
			var len = input.val().length;
			var status = setCaretPosition('prompt2', len);
		}
	}
	
	function setCaretPosition(elemId, caretPos) {
		var el = document.getElementById(elemId);

		el.value = el.value;
		// ^ this is used to not only get "focus", but
		// to make sure we don't have it everything -selected-
		// (it causes an issue in chrome, and having it doesn't hurt any other browser)

		if (el !== null) {

			if (el.createTextRange) {
				var range = el.createTextRange();
				range.move('character', caretPos);
				range.select();
				return true;
			}

			else {
				// (el.selectionStart === 0 added for Firefox bug)
				if (el.selectionStart || el.selectionStart === 0) {
					el.focus();
					el.setSelectionRange(caretPos, caretPos);
					return true;
				}

				else  { // fail city, fortunately this never happens (as far as I've tested) :)
					el.focus();
					return false;
				}
			}
		}
	}

	function escrever(content){
		lastMessage = content;
		elemento(content, "y", "div");//Faz o print do comando
		//Dicionário
		var links = Contem(["links", "Links", "LINKS"], 0);
		var help = Contem(["help", "Help", "HELP"], 0);
		var ping = Contem(["ping", "Ping", "PING"], 0);
		var limpar = Contem(["Limpar", "limpar", "LIMPAR","clean", "Clean", "CLEAN", "flush", "FLUSH"], 0);
		var distancia = Contem(["distancia", "distância", "Distancia", "Distância", "DISTÂNCIA", "DISTANCIA"], 1);
		var horarios = Contem(["Horários", "horários", "Horarios", "horarios", "Horario", "Horário", "horario", "horário", "HORÁRIOS", "HORARIOS", "HORÁRIO", "HORARIO"], 3);
		var ascii = Contem(["ascii", "ASCII", "Ascii"], 0);
		var animu = Contem(["anime", "Anime", "ANIME", "animu", "Animu", "ANIMU"], 0);
		var noticias = Contem(["Notícias", "notícias", "Noticias", "noticias", "NOTICIAS", "NOTÍCIAS"], 0);
		var importantes = Contem(["Importantes", "importantes", "importante", "Importante", "IMPORTANTE", "IMPORTANTES"], 0);
		var provas = Contem(["Provas", "provas", "PROVAS"], 0);
		var upload = Contem(["Upload", "upload", "UPLOAD"], 0);
		var envios = Contem(["Envios", "envios", "ENVIOS"], 0);
		var converter = Contem(["Converter", "converter", "CONVERTER"], 0);
		//Fim do dicionário
		if(isWaiting == null){
			if(noticias != undefined){
				elemento('(21/09/2017) -> Site criado', "n", "div");
				elemento('(22/09/2017) -> Atualizado comando "Ascii" ', "n", "div");
				elemento('(27/09/2017) -> Atualizado informações do comando "Links":', "n", "div");
				elemento('(27/09/2017) -> Adicionado "Halliday V.3 9ª Ed" ', "n", "div");
				elemento('(27/09/2017) -> Adicionado "Cálculo Vol.1 Anton Bivens Davis" ', "n", "div");
				elemento('(27/09/2017) -> Adicionado "Cálculo Vol.1 11ªEdição George B. Thomas" ', "n", "div");
				elemento('(27/09/2017) -> Atualizado informações do comando "Importantes":', "n", "div");
				elemento('(27/09/2017) -> Adicionado "(Leitura)Computadores Quânticos" no comando >Importantes', "n", "div");
				elemento('(27/09/2017) -> Adicionado "(Artigo Acadêmico)OCR para reconhecimento de caracteres" no comando >Importantes.', "n", "div");
				elemento('(27/09/2017) -> Atualizado informações do comando "Provas":', "n", "div");
				elemento('(27/09/2017) -> Adicionado data e assuntos da prova de Cálculo I', "n", "div");
				elemento('(27/09/2017) -> Adicionado data e assuntos da prova de Introdução à Ciência da Computação', "n", "div");
				elemento('(27/09/2017) -> Adicionado data e assuntos da prova de Metodologia da Pesquisa Científica', "n", "div");
				elemento('(09/10/2017) -> Adicionado data e assuntos da prova de Lógica Para Ciência da Computação', "n", "div");
				elemento('(09/10/2017) -> Adicionado prova antiga de Lógica Para Ciência da Computação no comando Importantes', "n", "div");
				elemento('(09/10/2017) -> Adicionado esboço da prova de Introdução à Ciência da Computação no comando Importantes', "n", "div");
				elemento('(12/10/2017) -> Adicionado comando "Upload"', "n", "div");
				elemento('(12/10/2017) -> Adicionado comando "Envios"', "n", "div");
				elemento('(25/10/2017) -> Aumentado a visibilidade do site para melhor visualização', "n", "div");
				elemento('(25/10/2017) -> Adicionado "(Vídeo)Divisão por Zero" no comando >Importantes', "n", "div");
				elemento('(31/10/2017) -> Adicionado data e assuntos da prova de Lógica', "n", "div");
				elemento('(31/10/2017) -> Adicionado data e assuntos da prova de Introdução à Ciência da Computação', "n", "div");
				elemento('(31/10/2017) -> Adicionado "Halliday V.1 8ª Ed" ', "n", "div");
				elemento('(01/11/2017) -> Melhorado a acessibilidade do site em serviços mobile');
				elemento('(01/11/2017) -> Adicionado todos os comandos em letras maiúsculas(ex: "LIMPAR")');
				elemento('(01/11/2017) -> Bug fixes');
				elemento('(12/11/2017) -> Hotfix: Repetir o último comando apertando tecla "Cima" agora funcional');
				elemento('(04/12/2017) -> Adicionado data e assuntos da prova de Introdução à Ciência da Computação', "n", "div");
				elemento('(12/12/2017) -> Data da apresentação de ICC alterada de 07/12/2017 -> 12/12/2017', "n", "div");
				elemento('(22/08/2018) -> Adicionado preview do nome do arquivo no comando upload', "n", "div");
			}else
			if(provas != undefined){
				//elemento("Introdução à Ciência da Computação(21/11/2017) =>", "n", "div");
				//elemento("-Apresentação do Trabalho", "n", "div");
				elemento("Nenhuma prova, por enquanto.", "n", "div");
			}else
			if(animu != undefined){
				elemento("WAIT FOR IT...", "y", "div");
				window.setTimeout(function(){ window.location = "https://loli.dance/src/assets/illya.webm";},3000);
			}else
			if(importantes != undefined){
				elemento("https://pt.khanacademy.org/math/algebra/introduction-to-algebra/division-by-zero/v/why-dividing-by-zero-is-undefined", "n", "a", "(Vídeo)Divisão por Zero");
				elemento("http://computer.howstuffworks.com/quantum-computer.htm", "n", "a", "(Leitura)Computadores Quânticos");
				elemento("http://www.emmersion.com.au/wp-content/uploads/2015/05/AUTOMATIC-NUMBER-PLATE-RECOGNITION-SYSTEM-FOR-VEHICLE1.pdf", "n", "a", "(Artigo Acadêmico)OCR para reconhecimento de caracteres");
				elemento("estudos/icc.html", "n", "a", "(Estudos)Assuntos da prova de Introdução à Ciência da Computação");
				elemento("estudos/logica.jpeg", "n", "a", "(Prova)Lógica");
			}else
			if(distancia != undefined){
				elemento("Digite os lugares que você quer saber a distância: (um por linha)", "n", "div");
				distan = "True";
				isWaiting = "True";
			}else 
			if(links != undefined){
				elemento("estudos/icc.html", "n", "a", "Resumo da Prova de ICC");
				elemento("fluxograma/index.html", "n", "a", "Fluxograma");
				//elemento("DailyCheck/index.html", "n", "a", "DailyCheck");
				elemento("http://www.prograd.uesc.br/PortalSagres/Acesso.aspx", "n", "a", "Sagres");
				elemento("https://pt.wiktionary.org/wiki/Ap%C3%AAndice:S%C3%ADmbolos_matem%C3%A1ticos", "n", "a", "Símbolos Matemáticos");
				elemento("https://pt.wikipedia.org/wiki/Alfabeto_grego", "n", "a", "Alfabeto Grego");
				elemento("http://nbcgib.uesc.br/colcic/images/Horario%20COLCIC%202017_2%20Versao%203", "n", "a", "Horários 2017.2");
				elemento(" Livros:", "y", "div");
				elemento("https://drive.google.com/uc?id=0B8chGM7JLsXhRS1lZHBreXlkZUU&export=download", "n", "a", "Halliday V.1 8ªEd");
				elemento("http://www.mediafire.com/file/5fu3ez226qotbts/BLABLA.rar", "n", "a", "Halliday V.3 8ªEd(senha: 102030)");
				elemento("https://mega.nz/#!Mw0XTZaR!fC06iE5Rk9-mtEKnM8djN3hB561W95cH3uMyHrU32SQ", "n", "a", "Halliday V.3 9ªEd");
				elemento("https://mega.nz/#!bYNUnAxR!P8MLC1AugtEbT7jcB7bDqsFg5cxEkF7IMjDHA1zZDdY", "n", "a", "Cálculo Vol.1 11ªEdição George B. Thomas");
				elemento("https://books.google.com.br/books?id=Ds2sCQAAQBAJ&lpg=PT167&dq=Interpreta%C3%A7%C3%A3o%20de%20E%20implica%20G&hl=pt-BR&pg=PA1#v=onepage&q&f=false", "n", "a", "Lógica para Ciência da Computação");
				elemento("https://pt.scribd.com/document/358946523/Calculo-Vol-1-Howard-Anton-Irl-Bivens-e-Stephen-Davis-pdf#", "n", "a", "Cálculo Vol.1 Anton Bivens Davis");
				elemento("http://clicmates.com.br/arquivosparadonwloads/C%C3%A1lculo%20com%20Geometria%20Anal%C3%ADtica%20-%20Vol%201%20-%20Louis%20Leithold.pdf", "n", "a", "Cálculo com Geometria Analítica Vol.1 Louis Leithold");
				
				
				//Adicionar mais elementos acima//
			}else
			if(help != undefined){
				elemento(">>>Alguns comandos úteis são:", "n", "div");
				elemento(">Links", "y", "div");
				elemento(">Horários", "y", "div");
				elemento(">Provas", "y", "div");
				elemento(">Notícias", "y", "div");
				elemento(">Importantes", "y", "div");
				elemento(">Ascii", "y", "div");
				elemento(">Upload", "y", "div");
				elemento(">Envios", "y", "div");
				elemento(">Limpar", "y", "div");
			}else
			if(horarios != undefined){
				elemento("Espere...", "n", "div");
				if(!window.mobilecheck()){
					$(document).ready(function() {
						$.ajax({
							url : "horarios.txt",
							dataType: "text",
							async: true,
							success : function (data) {
								for (var i = 0, len = data.length+1; i < len; i++) {
									if(data[i] == ';'){
										elemento((data.slice((i-99), i)), "n", "div");
									}
								}
							}
						});
					});
				}else{
					$(document).ready(function() {
						$.ajax({
							url : "horariosmobile.txt",
							dataType: "text",
							async: true,
							success : function (data) {
								for (var i = 0, len = data.length+1; i < len; i++) {
									if(data[i] == ';'){
										elemento((data.slice((i-64), i)), "n", "div");
									}
								}
							}
						});
					});
				}
			}else 
			if(limpar != undefined){
				document.getElementById("terminal").innerHTML = null;
				elemento("GoldernOS V0.1.155", "y", "div");
				elemento("Para mais informações e comandos digite 'Help'", "y", "div");
				elemento("Eu não sei NEM o que é isso.", "y", "div");
				lastCommands = new Array(); //Limpar lista de comandos da sessão anterior
				Cookies.remove('lastSession');
			}else 
			if(ascii != undefined){
				if(!window.mobilecheck()){
					elemento("Espere...", "n", "div");
					arte = String(Math.floor(( Math.random() * 8) + 1));
					$(document).ready(function() {
						$.ajax({
							url : "ascii/ascii"+arte+".txt",
							dataType: "text",
							async: true,
							success : function (data) {
								elemento(data, "n", "div");
							}
						});
					});
				}else{
					elemento("Comando indisponível para mobile.", "n", "div");
				}
			}else
			if(upload != undefined){
				setUpload("form");
			}else
			if(ping != undefined){
				$(document).ready(function() {
					$.ajax({
						url : "ping.php",
						dataType: "text",
						async: true,
						success : function (data) {								
							elemento(data, "n", "div");
						}
					});
				});
			}else
			if(envios != undefined){
				elemento("Espere...", "n", "div");
				var lastsize = 0;
				$(document).ready(function() {
					$.ajax({
						url : "files.php",
						dataType: "text",
						async: true,
						success : function (data) {
							for (var i = 0, len = data.length+1; i < len; i++) {
								if(data[i] == ';'){
									elemento("uploads/"+data.slice(lastsize, i), "n", "a", data.slice(lastsize, i) );
									lastsize = i+1;
								}
							}
							//elemento(data, "n", "div");
						}
					});
				});
			}else
			if(converter != undefined){
				//arr[1] = número
				//arr[4] = base1
				//arr[7] = base2
				var arr = content.split(" ");
				elemento("Espere...", "n", "div");
				$(document).ready(function() {
					$.ajax({
						url : "baseconvert.php?num="+arr[1]+"&bas1="+arr[4]+"&bas2="+arr[7],
						dataType: "text",
						async: true,
						success : function (data) {
							elemento("Resultado: "+data, "n", "div");
						}
					});
				});
				//alert(arr[1]+","+arr[4]+","+arr[7]);
			}
		}else{
			if(buffer[0] == null){
				if(distan == "True"){
					buffer[0] = content;
				}
			}else
			if(buffer[1] == null){
				if(distan == "True"){
					buffer[1] = content;
					elemento("Digite a senha:", "n", "div");
				}
			}else
			if(buffer[2] == null){
				if(distan == "True"){
					buffer[2] = content;
					loadXMLDoc(buffer[0], buffer[1], buffer[2]);
					//Zerar o buffer e voltar a aceitar os comandos:
					buffer[0] = null;
					buffer[1] = null;
					buffer[2] = null;
					//Zerar o isWaiting:
					isWaiting = null;
				}
			}
		}
		Cookies.set('lastSession', JSON.stringify(lastCommands), { expires: 1 });//Guarda as informações da última sessão no Cookie lastSession
		//Clean
		document.getElementById("prompt2").value = null;//Esvazia o campo
	}

	function setUpload(elem){
		var element = document.createElement(elem);
		element.style.margin = "0px";
		element.style.height = "20px";
		element.style.marginLeft = "1%";
		element.method = "POST";
		element.enctype = "multipart/form-data";
		element.id = "formulario";
		element.action = "recebe_upload.php";
		//Add label to 'file-upload'
		element.appendChild(document.createElement("label"));
		var last = element.lastChild;
		last.htmlFor = "file-upload";
		last.className = "custom-file-upload";
		//Add stylized upload
		last.appendChild(document.createElement("p"));
		var secondlast = last.lastChild;
		secondlast.style.border = "2px solid #0c0";
		secondlast.style.backgroundColor = "#050";
		secondlast.style.color = "#0c0";
		secondlast.style.paddingLeft = "5px";
		secondlast.style.paddingRight = "5px";
		secondlast.style.display = "inherit";
		secondlast.style.marginLeft = "1%";
		secondlast.name = "segundo";
		secondlast.appendChild(document.createTextNode("Upload"));
		//Make file name div
		element.appendChild(document.createElement("div"));
		var lastotext = element.lastChild;
		lastotext.style.display = "inline";
		lastotext.id = "txtL";
		lastotext.innerHTML = "Arquivo";
		lastotext.style.marginLeft = "5px";
		lastotext.style.marginRight = "5px";
		//Add label to 'submitar'
		element.appendChild(document.createElement("label"));
		var lasto = element.lastChild;
		lasto.htmlFor = "submitar";
		lasto.className = "custom-file-upload";
		//Add stylized send input
		lasto.appendChild(document.createElement("p"));
		var secondlasto = lasto.lastChild;
		secondlasto.style.border = "2px solid #0c0";
		secondlasto.style.backgroundColor = "#050";
		secondlasto.style.color = "#0c0";
		secondlasto.style.paddingLeft = "5px";
		secondlasto.style.paddingRight = "5px";
		secondlasto.style.display = "inherit";
		secondlasto.style.marginLeft = "1%";
		secondlasto.appendChild(document.createTextNode("Enviar"));
		//Add hidden upload input
		element.appendChild(document.createElement("input"));
		var last = element.lastChild;
		last.id = "file-upload";
		last.style.visibility = "hidden";
		last.type = "file";
		last.name = "arquivo"
		last.style.backgroundColor = "black";
		last.style.borderColor = "#050";
		last.style.color = "#050";
		last.style.marginLeft = "1%";
		last.style.width = 0;
		last.style.height = 0;
		last.appendChild(document.createTextNode("Upload"));
		document.getElementById('terminal').appendChild(element);
		//Add hidden send input
		element.appendChild(document.createElement("input"));
		var summit = element.lastChild;
		summit.id = "submitar";
		summit.type = "submit";
		summit.value = "Enviar"
		summit.style.visibility = "hidden";
		summit.style.width = 0;
		summit.style.height = 0;
		summit.appendChild(document.createTextNode("Enviar"));
		document.getElementById('terminal').appendChild(element);
		//document.getElementById('buttonid').addEventListener('click', openDialog);
		
		$("#file-upload").bind("change", function(){
			var f = document.getElementById('formulario');
			var nomeArquivo = f.arquivo.value.replace("C:\\fakepath\\", "");
			document.getElementById("txtL").innerHTML = nomeArquivo;
		});
	}

	//Ajax
	function loadXMLDoc(origem, destino, pass) {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				data = xhttp.responseText;
				elemento(data, "n", "div");
			}
		};
		if(origem != null){
		//elemento(pass+"&origem="+origem+"&destino="+destino, "n", "div");	
		xhttp.open("POST", "pass.php?pass="+pass+"&origem="+origem+"&destino="+destino, true);
		xhttp.send(pass);
		}
	}

	function getCookie(cname) {
		if(Cookies.get(cname) != null){
			//alert(Cookies.get(cname));
			lastCommandCookie = Cookies.get(cname);
			lastCommands = JSON.parse(lastCommandCookie);
			tamanho = lastCommands.length;
			indice = 0;
			//alert(lastCommands.length);
			if(lastCommands != null){	
				while(indice < tamanho){
					document.getElementById("prompt2").value = lastCommands[indice];
					escrever(lastCommands[indice]);
					indice += 1;
				}
			}
		}
	}
					
	window.mobilecheck = function() {
	  var check = false;
	  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
	  return check;
	};