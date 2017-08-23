// Variabili globali

var db // variabile globale che rappresenta l' oggetto database che creo

// EVENTI JQUERY
$(document).ready(function () {
   
    // PAGE: HOME
    // Validate del form login Applicazione 
    $('#loginApp').validate({
        rules: {
            usernameLogin: {
                required: true
            },
            passwordLogin: {
                required: true
            },

        },
        messages: {
            usernameLogin: {
                required: "Username obbigatorio"
            },
            passwordLogin: {
                required: "Password Obbligatoria"
            },

        },
        
        submitHandler: function (form) {
             var usernameLogin = $("#usernameLogin").val();
             var passLogin = $("#passwordLogin").val();
            // alert(usernameLogin + " " + passLogin);
             loginUtente(usernameLogin, passLogin);
             return false;
        }
    });
    
   
    //PAGE DASHBOARD

    

    //PAGINA RICHIEDI INFORMAZIONI

    // Validate form richiedi informazioni

    $('#inviaInfoMv').validate({
        rules: {

            nomeMv: {
                required: true
            },
            cognomeMv: {
                required: true
            },
            emailMv: {
                required: true,
                email: true
            },
            richiestaMv: {
                required: true
            },
            privacyMv: {
                required: true
            }
        },
        messages: {
            nomeMv: {
                required: "Nome obbligatorio"
            },
            cognomeMv: {
                required: "Cognome obbligatorio"
            },
            emailMv: {
                required: "E-mail obbligatoria",
                email: "E-mail: inserire un indirizzo e-mail corretto"
            },
            richiestaMv: {
                required: "Richiesta obbligatoria"
            },
            privacyMv: {
                required: "Acconsenti il trattamento della privacy"
            }
        },
      
        submitHandler: function (form) {
            var pMv
            if ($('#privacyMv').is(":checked")) {
                pMv = 1
            } else {
                pMv = 0
            }
            var nMv = $("#nomeMv").val();
            var cMv = $("#cognomeMv").val();
            var eMv = $("#emailMv").val();
            var rMv = $("#richiestaMv").val();
            inviaInformazioneMv(pMv, nMv, cMv, eMv, rMv);
            return false;
        }
    });
    

    // PAGINA RECUPERA PASSWORD

    // Validate form recupera password

    $('#getPassword').validate({
        rules: {

            userEmail: {
                required: true,
                
            }
        },
        messages: {
            userEmail: {
                required: "Inserire E-mail o Username per recuperare la password"
            }
            
        },

        submitHandler: function (form) {
            var usernameEmail = $("#userEmail").val();
            recuperaPassword(usernameEmail);
            return false;
        }
    });

    $('#pubblicaSito').validate({
        rules: {

            titolo: {
                required: true,

            },
            data: {
                required: true,
            },
            descrizione: {
                required: true,
            }
        },
        messages: {
            titolo: {
                required: "Titolo obbligatorio"
            },
            data: {
                required: "Data obbligatoria"
            },
            descrizione: {
                required: "Descrizione obbligatoria"
            }

        },

        submitHandler: function (form) {
            if ($('#sito').is(":checked")) {
                var titolo = $("#titolo").val();
                var data = $("#data").val();
                var sottotitolo = $("#sottotitolo").val();
                var descrizione = $("#descrizione").val();
                if (localStorage.getItem("argomento") == "")
                {
                    var scegli_argomento = "<div class='modal-content'><h4>Condivisione Fallita </h4><p>Scegli argomento!! </p></div>";
                    scegli_argomento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                    $("#scegli_argomento").html("");
                    $("#scegli_argomento").append(scegli_argomento);
                    $("#apri_scegli_argomento").click();
                } else {
                    caricaSulSitoArgomento(titolo, data, sottotitolo, descrizione);
                }
               
            } else {
                var pubblica_sito_check = "<div class='modal-content'><h4>Condivisione Fallita </h4><p>Clicca su checkbox sito per pubblicare!! </p></div>";
                pubblica_sito_check += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#scegli_pubblica_sito").html("");
                $("#scegli_pubblica_sito").append(pubblica_sito_check);
                $("#apri_scegli_pubblica_sito").click();
            }
           
            return false;
        }
    });

    $('#pubblicaCategoriaGallery').validate({
        rules: {

            titolo_gallery: {
                required: true,

            }
            
        },
        messages: {
            titolo_gallery: {
                required: "Titolo obbligatorio"
            }

        },

        submitHandler: function (form) {
          
            var titolo_gallery = $("#titolo_gallery").val();
            caricaCategoriaGallerySito(titolo_gallery);
            return false;
        }
    });

    $('#modificaArgomento').validate({
        rules: {

            titolo_modifica: {
                required: true,

            },
            data_modifica: {
                required: true,
            },
            descrizione_modifica: {
                required: true,
            }
        },
        messages: {
            titolo_modifica: {
                required: "Titolo obbligatorio"
            },
            data_modifica: {
                required: "Data obbligatoria"
            },
            descrizione_modifica: {
                required: "Descrizione obbligatoria"
            }

        },

        submitHandler: function (form) {
            var titolo_modifica = $("#titolo_modifica").val();
            var data_modifica = $("#data_modifica").val();
            var sottotitolo_modifica = $("#sottotitolo_modifica").val();
            var descrizione_modifica = $("#descrizione_modifica").val();
            
            aggiornaArgomento(titolo_modifica, data_modifica, sottotitolo_modifica, descrizione_modifica);
            return false;
        }
    });



   
    
});

// EVENTI JQUERY MOBILE

$(document).on("pageshow", "#home", function () {
    // Creao il database e la tabella utente che servira poi per caricare i dati dell'utente loggato
    creazioneDatabase();
   /* if(localStorage.getItem("login")==true)
    {
        $.mobile.pageContainer.pagecontainer("change", "dashboard", {
            transition: 'flip',
            changeHash: false,
            reverse: true,
            showLoadMsg: true
        });
    }*/
});

$(document).on("pageshow", "#dashboard", function () {
    // Popolo la mia tabella utenti del DB chemi servirà poi in condividi per sapere le configurazioni utente
    // Procedura per inserire nome e cognome utente loggatto

    var nome_cognome_utente = localStorage.getItem("nome_utente") + " " + localStorage.getItem("cognome_utente");
    $(".appendi_html").html("");
    $(".appendi_html").append(nome_cognome_utente);
    var foto = "<img class='circle avatar' src='http://simplyappweb.mvclienti.com/Account/fotoOperatori/" + localStorage.getItem("foto_utente") + "' rel='external' alt=''>";
    $(".appendi_foto_utente_menu").html("");
    $(".appendi_foto_utente_menu").append(foto);
    $(".appendi_foto_utente_nome").html("");
    $(".appendi_foto_utente_nome").append(foto);
    caricoDatiTabellaUtente();
});

// Pulire pagina se è già stata utilizzata
$(document).on("pagebeforeshow", "#condividi", function () {
    // Ripulisco la pagina dalle parti dinamiche
    localStorage.setItem('argomento', '');
    $(".appendi_argomenti").html("");
    $(".appendi_check").html("");
    $(".appendi_social").html("");
    $(".appendi_img").html("");
    $("#titolo").val("");
    $("#data").val("");
    $("#sottotitolo").val("");
    $("#descrizione").val("");
    $("#uploadFoto").hide();
    //Cancello le foto rimaste nella tabella media del cellulare caricate in precedenza
    db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
    db.transaction(
        // Metodo di chiamata asincrona
        function (tx) {
            tx.executeSql("DELETE FROM media", []);
        },
        function () {
           // alert("Non è stato possibile cancellare la notizia. Riprova");

        },
        function () {
           // alert("Cancellazione effettua");
        }
    )
});

$(document).on("pageshow", "#condividi", function () {
    // Seleziono i dati della tabella utente per creare la mia pagina condividi
    var foto = "<img class='circle avatar' src='http://simplyappweb.mvclienti.com/Account/fotoOperatori/" + localStorage.getItem("foto_utente") + "' rel='external' alt=''>";
    $(".appendi_foto_utente_nome").html("");
    $(".appendi_foto_utente_nome").append(foto);
    caricoConfigurazioniSocial();   
});

// Pulire pagina se è già stata utilizzata
$(document).on("pagebeforeshow", "#gallery", function () {
    localStorage.setItem("categoria_gallery", "");
    $(".appendi_categorie").html("");
    $(".appendi_immagini_categoria").html("");
    $(".append_categoria_aggiunta").html("");
    $("#titolo_gallery").val("");
    $("#uploadFotoGallery").hide();
    //Cancello le foto rimaste nella tabella media del cellulare caricate in precedenza
    db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
    db.transaction(
        // Metodo di chiamata asincrona
        function (tx) {
            tx.executeSql("DELETE FROM gallery", []);
            tx.executeSql("DELETE FROM categorie_gallery", []);
        },
        function () {
            // alert("Non è stato possibile cancellare la notizia. Riprova");

        },
        function () {
            // alert("Cancellazione effettua");
        }
    )

});

$(document).on("pageshow", "#gallery", function () {
    // Seleziono i dati delle categorie della gallery
    var foto = "<img class='circle avatar' src='http://simplyappweb.mvclienti.com/Account/fotoOperatori/" + localStorage.getItem("foto_utente") + "' rel='external' alt=''>";
    $(".appendi_foto_utente_nome").html("");
    $(".appendi_foto_utente_nome").append(foto);
    $("#footer_gallery").addClass("footer_home");
    caricoCategorieGallery();
});

// Pulire pagina se è già stata utilizzata
$(document).on("pagebeforeshow", "#storico", function () {
    // Ripulisco la pagina dalle parti dinamiche
    $("#si_fixed_footer").show();
    $("#no_fixed_footer").hide();
    $("#stato_attivo_filtro").removeClass("active");
    $("#stato_non_attivo_filtro").removeClass("active");
    $("#ricerca").val("");
    $(".appendi_argomenti_storico").html("");
    $(".appendi_news").html("");
    
});

$(document).on("pageshow", "#storico", function () {
    // Seleziono i dati delle categorie della gallery
    var foto = "<img class='circle avatar' src='http://simplyappweb.mvclienti.com/Account/fotoOperatori/" + localStorage.getItem("foto_utente") + "' rel='external' alt=''>";
    $(".appendi_foto_utente_nome").html("");
    $(".appendi_foto_utente_nome").append(foto);
    selezioneArgomentiUtente();
});

$(document).on("pageshow", "#modifica", function () {
    var foto = "<img class='circle avatar' src='http://simplyappweb.mvclienti.com/Account/fotoOperatori/" + localStorage.getItem("foto_utente") + "' rel='external' alt=''>";
    $(".appendi_foto_utente_nome").html("");
    $(".appendi_foto_utente_nome").append(foto);
    var titolo = "<h1>Modifica " + localStorage.getItem("nome_argomento_modifica")+ "</h1>";
    $(".appendi_titolo_modifica").html("");
    $(".appendi_titolo_modifica").append(titolo);
    selezionoArgomentoModifica();
    
});

$(document).on("pagebeforeshow", "#modifica_gallery", function () {
    $(".appendi_storico_gallery").html("");
    $(".appendi_categorie_filtri").html("");
   
});

$(document).on("pageshow", "#modifica_gallery", function () {
    var foto = "<img class='circle avatar' src='http://simplyappweb.mvclienti.com/Account/fotoOperatori/" + localStorage.getItem("foto_utente") + "' rel='external' alt=''>";
    $(".appendi_foto_utente_nome").html("");
    $(".appendi_foto_utente_nome").append(foto);
    selezionoCategoriePerFiltri();
    selezionoStoricoGallery();
});

$(document).on("pagebeforeshow", "#modifica_foto_gallery", function () {
    // Ripulisco la pagina dalle parti dinamiche
   
    $(".appendi_categorie_modifica").html("");
    $(".appendi_immmagine_modifica").html("");

});

$(document).on("pageshow", "#modifica_foto_gallery", function () {
    $("#uploadFotoSingolaModificaGallery").hide();
    var foto = "<img class='circle avatar' src='http://simplyappweb.mvclienti.com/Account/fotoOperatori/" + localStorage.getItem("foto_utente") + "' rel='external' alt=''>";
    $(".appendi_foto_utente_nome").html("");
    $(".appendi_foto_utente_nome").append(foto);
    selezionoDatiSingolaFotoGallery();
});


// Pulire pagina se è già stata utilizzata
$(document).on("pagebeforeshow", "#modifica", function () {
    $(".appendi_img_modifica_nuove").html("");
    $(".appendi_img_modifica").html("");
    uploadFotoModificaFile.setAttribute('style', 'display:none;');
    //Cancello le foto rimaste nella tabella media del cellulare caricate in precedenza
    db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
    db.transaction(
        // Metodo di chiamata asincrona
        function (tx) {
            tx.executeSql("DELETE FROM media", []);
        },
        function () {
            // alert("Non è stato possibile cancellare la notizia. Riprova");

        },
        function () {
            // alert("Cancellazione effettua");
        }
    )
});

$(document).on("pagebeforeshow", "#stili", function () {
    $(".appendi_argomenti_stili").html("");
});

$(document).on("pageshow", "#stili", function () {
    selezioneArgomentiUtenteStili();
});

// FUNZIONI APPLICAZIONE

// [Login utente]
function loginUtente(usernameLogin, passLogin) {
    localStorage.setItem('username', usernameLogin);
    $.ajax({
        type: "POST",
        data: '{userLogin:"' + usernameLogin + '",passLogin:"' + passLogin + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/servizi_app.aspx/login',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
           
            if (data.d.nome == null) {
                var noBenvenuto = "<div class='modal-content'><h4>Login Fallito </h4><p>Controlla di aver inserito i dati corretti o di avere una connessione internet disponibile </p></div>";
                noBenvenuto += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_successoLogin").html("");
                $("#box_successoLogin").append(noBenvenuto);
                $("#apri_alert").click();
            } else {
                localStorage.setItem('nome_utente', data.d.nome);
                localStorage.setItem('cognome_utente', data.d.cognome);
                localStorage.setItem('username', data.d.username);
                localStorage.setItem('ID_utente', data.d.ID);
                localStorage.setItem('login', true);
                localStorage.setItem('foto_utente', data.d.foto);
                document.location.href = "index.html#dashboard";
            }
           
          
        },
        error: function (e) {
            var noBenvenuto = "<div class='modal-content'><h4>Login Fallito </h4><p>Connessione internet non attiva o non disponibile </p></div>";
            noBenvenuto += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#box_successoLogin").html("");
            $("#box_successoLogin").append(noBenvenuto);
            $("#btn_box_Login").click();
        }
    });

}

// [Invio informazioni Mvitalia]
function inviaInformazioneMv(pMv, nMv, cMv, eMv, rMv) {
    $.ajax({
        type: "POST",
        data: '{nome:"' + nMv + '",cognome:"' + cMv + '",email:"' + eMv + '",richiesta:"' + rMv + '",privacy:"' + pMv + '",notizia:""}',
        url: 'http://simplyappweb.mvclienti.com/webservices/servizi_app.aspx/inviaInfo',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;

            if (ritorno == "Si") {
                var siInformazioni = "<div class='modal-content'><h4>E-mail inviata </h4><p>E-mail richiesta informazioni inviata con successo!!<br>Verrà contattato il prima possibile dal nostro staff. </p></div>";
                siInformazioni += "<div class='modal-footer'> <a href='#home' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_infoMvitalia").html("");
                $("#box_infoMvitalia").append(siInformazioni);
                $("#apri_box_infoMvitalia").click();
            } else {
                var noInformazioni = "<div class='modal-content'><h4>E-mail non inviata </h4><p>E-mail non inviata con successo!!<br>Si prega di riprovare. </p></div>";
                noInformazioni += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_infoMvitalia").html("");
                $("#box_infoMvitalia").append(noInformazioni);
                $("#apri_box_infoMvitalia").click();
            }

        },
        error: function (e) {
            var noInternet = "<div class='modal-content'><h4>No Connessione </h4><p>Verifica lo stato della tua connessione internet.</p></div>";
            noInternet += "<div class='modal-footer'> <a href='#home' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#box_infoMvitalia").html("");
            $("#box_infoMvitalia").append(noInternet);
            $("#apri_box_infoMvitalia").click();
        }
    });
}


// [Upload della news o evento o promo]
function caricaSulSitoArgomento(titolo, data, sottotitolo, descrizione) {
    var tipo_argomento = localStorage.getItem('argomento');
    $.ajax({
        type: "POST",
        data: '{titolo:"' + titolo + '",data:"' + data + '",sottotitolo:"' + sottotitolo + '",descrizione:"' + descrizione + '", ID_utente:"' + localStorage.getItem("ID_utente") + '", user:"' + localStorage.getItem("username") + '", argomento:"'+localStorage.getItem('argomento')+'"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/carica_argomento_app.aspx/caricaArgomento',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;

            if (ritorno == "Si") {
                var siCaricamento = "<div class='modal-content'><h4>Argomento Caricato </h4><p>Argomento ("+tipo_argomento+") Caricato</p></div>";
                siCaricamento += "<div class='modal-footer'> <a href='#' onclick='apriStoricoGiusto()' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_caricamento").html("");
                $("#box_caricamento").append(siCaricamento);
                $("#apri_box_caricamento").click();
            } else {
                var noCaricamento = "<div class='modal-content'><h4>Argomento non caricato </h4><p>Argomento (" + tipo_argomento + ") non caricato.<br>Si prega di riprovare </p></div>";
                noCaricamento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_caricamento").html("");
                $("#box_caricamento").append(noCaricamento);
                $("#apri_box_caricamento").click();
            }

        },
        error: function (e) {
           
        }
    });
}

// Appena carico un argomento va nello storico giusto
function apriStoricoGiusto ()
{
    if (localStorage.getItem("argomento")=="News")
    {
       
        localStorage.setItem("condividi_storico", "News");
        $.mobile.pageContainer.pagecontainer("change", "#storico", {
            transition: 'flip',
        });
    }
    if (localStorage.getItem("argomento") == "Eventi") {

        localStorage.setItem("condividi_storico", "Eventi");
        $.mobile.pageContainer.pagecontainer("change", "#storico", {
            transition: 'flip',
        });
    }
    if (localStorage.getItem("argomento") == "Promo") {

        localStorage.setItem("condividi_storico", "Promo");
        $.mobile.pageContainer.pagecontainer("change", "#storico", {
            transition: 'flip',
        });
    }
}

// [Recupera Password]


function recuperaPassword(usernameEmail) {
    
    $.ajax({
        type: "POST",
        data: '{emailUser:"' + usernameEmail + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/servizi_app.aspx/recuperaPass',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;
           
            
            if (ritorno == "Si") {
                var siRecupero = "<div class='modal-content'><h4>Recupero Ok </h4><p>Controlla la tua E-mail per i tuoi dati di accesso!!</p></div>";
                siRecupero += "<div class='modal-footer'> <a href='#home' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_recupera_pass").html("");
                $("#box_recupera_pass").append(siRecupero);
                $("#apri_box_recuperaPassword").click();
            } else {
                var noRecupero = "<div class='modal-content'><h4>Recupero fallito </h4><p>E-mail o Username inseriti errati!!<br>Si prega di riprovare.</p></div>";
                noRecupero += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_recupera_pass").html("");
                $("#box_recupera_pass").append(noRecupero);
                $("#apri_box_recuperaPassword").click();
            }

        },
        error: function (e) {
            var noInternet = "<div class='modal-content'><h4>No Connessione </h4><p>Verifica lo stato della tua connessione internet.</p></div>";
            noInternet += "<div class='modal-footer'> <a href='#home' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#box_recupera_pass").html("");
            $("#box_recupera_pass").append(noInternet);
            $("#apri_box_recuperaPassword").click();
        }
    });
}

// INIZIO [Creo database]

function creazioneDatabase()
{
   
    db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
    db.transaction(creoDB, erroreCreoDB, successoDB);
}

function creoDB(tx)
{
    tx.executeSql("DROP TABLE IF EXISTS utenti");
    tx.executeSql("CREATE TABLE IF NOT EXISTS utenti (id INTEGER PRIMARY KEY AUTOINCREMENT,identificativo INTEGER, social INTEGER, sito INTEGER, news INTEGER, promo INTEGER, eventi INTEGER, gallery INTEGER)");
    tx.executeSql("DROP TABLE IF EXISTS configurazione_utente");
    tx.executeSql("CREATE TABLE IF NOT EXISTS configurazione_utente (id INTEGER PRIMARY KEY AUTOINCREMENT,piattaforma, apiKey, apiSecret, nome_pagina_social, nome_sito, nome_script, ID_utente INTEGER)");
    tx.executeSql("DROP TABLE IF EXISTS media");
    tx.executeSql("CREATE TABLE IF NOT EXISTS media (id INTEGER PRIMARY KEY AUTOINCREMENT,nome_file, ID_user, tipo)");
    tx.executeSql("DROP TABLE IF EXISTS categorie_gallery");
    tx.executeSql("CREATE TABLE IF NOT EXISTS categorie_gallery (id INTEGER PRIMARY KEY AUTOINCREMENT,identificativo INTEGER, nome, user)");
    tx.executeSql("DROP TABLE IF EXISTS gallery");
    tx.executeSql("CREATE TABLE IF NOT EXISTS gallery (id INTEGER PRIMARY KEY AUTOINCREMENT, immagine, ID_categoria, ID_utente)");
}

function erroreCreoDB (error)
{
    // Scommentare per vedere se il DB non viene creato e quale messaggio restituisce
   // alert("Errore database: " + error.message);
}

function successoDB()
{
    // Scommentare per vedere se il DB viene creato
   // alert("OK db creato");
}

// FINE [Creo database]

// INIZIO [Carico dati tabella utente]
function  caricoDatiTabellaUtente()
{
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/get_configurazione_utente.aspx?id_utente=" + localStorage.getItem("ID_utente") + "", function (dati) {
        var li_dati = "";
        $.each(dati, function (i, utente) {
            // Inserisco dati nel db sqllite dell' App
            localStorage.setItem('social', utente.checkSocial);
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {
                  
                    tx.executeSql("INSERT INTO utenti (identificativo,social,sito,news,promo,eventi,gallery) VALUES (?,?,?,?,?,?,?)", [utente.ID, utente.checkSocial, utente.checkSito, utente.checkNews, utente.checkPromo, utente.checkEventi, utente.checkGallery]);
                },
                function (e) {
                     // Scommenta per vedere eventuale errore
                    //alert("Errore" + e.message);
                },
                function () {
                     // Scommenta per vedere il corretto inserimento
                    //alert("Inserimento effettuato tabelle notizie");
                }
            )
        });
    });
}
// FINE [Carico dati tabella utente]

// INIZIO [Carico configurazioni social]
function caricoConfigurazioniSocial()
{
   
    var siSociale = localStorage.getItem("social");
    if(siSociale == 1)
    {
        // Carico nella tabella configurazioni
        $.getJSON("http://simplyappweb.mvclienti.com/webservices/get_configurazione_utente_social.aspx?id_utente=" + localStorage.getItem("ID_utente") + "", function (dati) {
            var li_dati = "";
            $.each(dati, function (i, utente) {
                // Inserisco dati nel db sqllite dell' App
             
                db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
                db.transaction(
                    // Metodo di chiamata asincrona
                    function (tx) {
                      
                        tx.executeSql("INSERT INTO configurazione_utente (piattaforma,apiKey,apiSecret,nome_pagina_social,nome_sito,nome_script,ID_utente) VALUES (?,?,?,?,?,?,?)", [utente.piattaforma, utente.apiKey, utente.apiSecret, utente.nome_pagina_social, utente.nome_sito, utente.nome_script, utente.ID_utente]);
                    },
                    function (e) {
                        // Scommenta per vedere eventuale errore
                        //alert("Errore" + e.message);
                    },
                    function () {
                        // Scommenta per vedere il corretto inserimento
                        //alert("Inserimento effettuato tabelle notizie");
                      
                    }
                )
            });
            selezioneDatiTabellaUtente();
        });
       
    }
}

// FINE [Carico configurazioni social]

// INIZIO [Carico categorie gallery]
function caricoCategorieGallery() {
    // Carico nella tabella categorie_gallery
   
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/categorie_gallery.aspx", function (dati) {
        var li_dati = "";
     
        $.each(dati, function (i, categoria) {
            // Inserisco dati nel db sqllite dell' App
         
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {

                    tx.executeSql("INSERT INTO categorie_gallery (identificativo,nome,user) VALUES (?,?,?)", [categoria.ID, categoria.nome, categoria.user]);
                },
                function (e) {
                    // Scommenta per vedere eventuale errore
                   // alert("Errore" + e.message);
                },
                function () {
                    // Scommenta per vedere il corretto inserimento
                    //alert("Inserimento effettuato tabelle categorie_gallery");

                }
            )
        });
        selezioneCategorieGallery();
    });
}
// FINE [Carico categorie gallery]

// INIZIO [Seleziono i dati della tabella utente]

function selezioneDatiTabellaUtente() {
   
   
    db.transaction(selezionoDati, erroreSelezioneDati, successoSelezioneDati);
}

function selezionoDati (tx)
{
    // Serve per contare se almeno c'è uno tra news/promo/eventi/gallery/ per poi append html
    var count = 0;
    var siSociale = localStorage.getItem("social");
    if (siSociale == 1)
    {
       
        tx.executeSql("SELECT u.identificativo, u.social, u.sito, u.news, u.eventi, u.promo, u.gallery, cu.piattaforma, cu.ID_utente FROM utenti as u, configurazione_utente as cu WHERE u.identificativo = cu.ID_utente AND u.Identificativo=" + localStorage.getItem('ID_utente') + "", [],
         function (tx, dati) {
             var len = dati.rows.length;
            
             var checkBox = "";
             var checkBoxSocial = "";
            
             var tab_argomenti = "<div  class='controls'><label>Argomento:</label>";
             if (len != 0) {
                 /* Qua compongo grafica tab news - eventi - promo - gallery */
                 if (dati.rows.item(0).news == 1) {
                     tab_argomenti += " <button onclick='clickNews()' class='filter' id='news' >News</button>"
                     count++;

                 }
                 if (dati.rows.item(0).eventi == 1) {
                     tab_argomenti += " <button onclick='clickEventi()' class='filter' id='eventi' >Eventi</button>"
                     count++;

                 }
                 if (dati.rows.item(0).promo == 1) {
                     tab_argomenti += " <button onclick='clickPromo()' class='filter' id='promo' >Promo</button>"
                     count++;

                 }
                 if (dati.rows.item(0).gallery == 1) {
                     tab_argomenti += " <button onclick='clickGallery()' class='filter' id='gallery' >Gallery</button>"
                     count++;

                 }
                 tab_argomenti += "</div>";

                 if (dati.rows.item(0).sito == 1) {
                     checkBox += "<input data-role='none' type='checkbox' onclick='clickCheckboxSito()' name='sito' id='sito'  value='html' />  <label for='sito'>Sito</label>"
                  
                   
                 }
                 if (dati.rows.item(0).social == 1) {
                     checkBox += "<input data-role='none' type='checkbox' onclick='clickCheckboxSocial()' name='social' id='social'  disabled='disabled'  value='html' />  <label for='social'>Social</label>"
                     // Faccio insert delle configurazioni
                    
                 }
                 for (var i = 0; i < len; i++)
                 {
                      checkBoxSocial += "<div><input style='float:left !important;' data-role='none' type='checkbox' name='" + dati.rows.item(i).piattaforma + "' id='" + dati.rows.item(i).piattaforma + "'  value='html' />  <label for='"+dati.rows.item(i).piattaforma+"'>" + dati.rows.item(i).piattaforma + "</label></div>"
                   
                 }

                 
             
             }
             if (count > 0)
             {
                 $(".appendi_argomenti").append(tab_argomenti);
             }
             $(".appendi_check").append(checkBox);
             $(".appendi_social").append(checkBoxSocial);
         },
         function () {
             alert("Errore" + e.message);
         })
    } else {
         tx.executeSql("SELECT * FROM utenti WHERE identificativo = " + localStorage.getItem('ID_utente') + "", [],
          function (tx, dati) {
              var len = dati.rows.length;
              var checkBox = "";
              if (len != 0) {
                 
                  if (dati.rows.item(0).sito == 1) {
                     checkBox += "<input data-role='none' type='checkbox' name='sito' id='sito' checked value='html' />  <label for='privacyMv'>Sito</label>"
                   
                    
                  }

                 
              
              }
              $(".appendi_check").append(checkBox);
          },
          function () {
              alert("Errore" + e.message);
          });
    }
    // Qua faccio due selezioni se è ceccato social o se non è ceccato social

 
}

function erroreSelezioneDati (e)
{
   // alert("Errore: " + e.message);
}

function successoSelezioneDati()
{
   // alert("Dati selezionati correttamente");
}

function selezioneCategorieGallery() {
   
    db.transaction(selezionoCategorie);
}

function selezionoCategorie(tx) {
    
    // Selezione le categorie aggiornate nella tabella categoria_gallery del telefono
    tx.executeSql("SELECT * FROM categorie_gallery", [],
        function (tx, dati) {
            var len = dati.rows.length;
           
            var tab_categorie = "<div  class='controls'><label>Categorie:</label>";
            if (len != 0) {
                /* Qua compongo grafica tab categorie */
                for (var i = 0; i < len; i++) {
                  //  alert("ciclo");
                    tab_categorie += " <button style='margin-bottom:10px; margin-top:15px' onclick='clickCategoria(\"" + dati.rows.item(i).identificativo + "\")' class='filter' id='" + dati.rows.item(i).identificativo + "' >" + dati.rows.item(i).nome + "</button>"

                }

                tab_categorie += "</div>";

            }
              $(".appendi_categorie").append(tab_categorie);  
        },
        function () {
            alert("Errore" + e.message);
        })
   
    // Qua faccio due selezioni se è ceccato social o se non è ceccato social


}

function clickNews ()
{
    localStorage.setItem('argomento', 'News');
    $("#news").addClass("active");
    $("#eventi").removeClass("active");
    $("#promo").removeClass("active");
}

function clickEventi() {
    localStorage.setItem('argomento', 'Eventi');
    $("#eventi").addClass("active");
    $("#news").removeClass("active");
    $("#promo").removeClass("active");
}
function clickPromo() {
    localStorage.setItem('argomento', 'Promo');
    $("#promo").addClass("active");
    $("#eventi").removeClass("active");
    $("#news").removeClass("active");
}
function clickGallery() {
    localStorage.setItem('argomento', 'Gallery');
    $("#gallery").addClass("active");
    $.mobile.pageContainer.pagecontainer("change", "#gallery", {
    
        transition: 'flip',
      
       
    });

}

function clickCategoria(categoria) {
    localStorage.setItem('categoria_gallery', categoria);
    $("#" + categoria + "").addClass("active");
   
}

function clickCheckboxSito()
{
    if ($('#sito').is(":checked")) {
        // Imposto local storage per pubblicazione nel sito
        localStorage.setItem("sito_check", 1);
    } else {
        localStorage.setItem("sito_check", 0);
    } 
}

function clickCheckboxSocial() {
    if ($('#social').is(":checked")) {
        // Visualizzo i checkbox dei vari social
       
        $("#blocco_social").css("display","block");
        

       
    } else {
        // Nascondo i checkbox dei vari social
        $("#blocco_social").css("display", "none");
    }
}

function caricaCategoriaGallerySito(titolo_gallery)
{
   
    $.ajax({
        type: "POST",
        data: '{nome:"' + titolo_gallery + '", user: "'+localStorage.getItem('username')+'"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/servizi_app.aspx/inseriscoCategoriaGallery',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;
            localStorage.setItem("categoria_gallery", ritorno);
           
            var categoria_aggiunta = "<div  class='controls'><label>Categorie Aggiunta:</label>";
            categoria_aggiunta += "<button style='margin-bottom:10px; margin-top:15px' class='filter active' id='" + ritorno + "' >" + titolo_gallery + "</button>"
            $(".append_categoria_aggiunta").append(categoria_aggiunta);
          


        },
        error: function (e) {
            var noBenvenuto = "<div class='modal-content'><h4>Login Fallito </h4><p>Connessione internet non attiva o non disponibile </p></div>";
            noBenvenuto += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#box_successoLogin").html("");
            $("#box_successoLogin").append(noBenvenuto);
            $("#btn_box_Login").click();
        }
    });
}

function apriAllertLogout()
{
    $("#apri_alert_logout").click();
}

function logoutApp() {
    localStorage.removeItem('nome_utente');
    localStorage.removeItem('cognome_utente');
    localStorage.removeItem('username');
    localStorage.removeItem('ID_utente');
    localStorage.removeItem('login');
    localStorage.removeItem('argomento_filtri');
    localStorage.removeItem('foto_utente');
    localStorage.removeItem('id_modifica_argomento');
    localStorage.removeItem('nome_argomento_modifica');
    localStorage.removeItem('social');
    $.mobile.pageContainer.pagecontainer("change", "#home", {
        transition: 'flip',
        
    });
   
}

function selezioneArgomentiUtente() {


    db.transaction(selezionoArgomenti);
}

function selezionoArgomenti(tx) {
    // Serve per contare se almeno c'è uno tra news/promo/eventi/gallery/ per poi append html
    var count = 0;
  

     tx.executeSql("SELECT * From utenti", [],
     function (tx, dati) {
         var len = dati.rows.length;
      
       

         var tab_argomenti = "<div  class='controls'><label>Argomento:</label>";
         if (len != 0) {
             /* Qua compongo grafica tab news - eventi - promo - gallery */
             if (dati.rows.item(0).news == 1) {
                 tab_argomenti += " <button onclick='clickNewsStorico()' class='filter' id='newsStorico' >News</button>"
                 count++;

             }
             if (dati.rows.item(0).eventi == 1) {
                 tab_argomenti += " <button onclick='clickEventiStorico()' class='filter' id='eventiStorico' >Eventi</button>"
                 count++;

             }
             if (dati.rows.item(0).promo == 1) {
                 tab_argomenti += " <button onclick='clickPromoStorico()' class='filter' id='promoStorico' >Promo</button>"
                 count++;

             }
             if (dati.rows.item(0).gallery == 1) {
                 tab_argomenti += " <button onclick='clickGalleryStorico()' class='filter' id='galleryStorico' >Gallery</button>"
                 count++;

             }
             tab_argomenti += "</div>";

         }
         $(".appendi_argomenti_storico").append(tab_argomenti);
         if (localStorage.getItem("condividi_storico") == null)
         {
             clickNewsStorico();
         }
         if (localStorage.getItem("condividi_storico") == "News") {
             localStorage.removeItem('condividi_storico');
             clickNewsStorico();
         }
         if (localStorage.getItem("condividi_storico") == "Eventi") {
             localStorage.removeItem('condividi_storico');
             clickEventiStorico();
         }
         if (localStorage.getItem("condividi_storico") == "Promo") {
             localStorage.removeItem('condividi_storico');
             clickPromoStorico();
         }


        
     },
     function () {
         alert("Errore" + e.message);
     });
}

function clickNewsStorico() {
    localStorage.setItem("argomento_filtri", "news");
    $("#promoStorico").removeClass("active");
    $("#eventiStorico").removeClass("active");
    $("#newsStorico").addClass("active");
    $(".appendi_news").html("");
   
    // Faccio la selezione dal server delle new di questo utente
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/storico_news.aspx?id_utente=" + localStorage.getItem("ID_utente") + "", function (dati) {
        var blocco_news = "";
        var lunghezza = dati.length;
        var News = "News";
       
        $.each(dati, function (i, news) {
         
          
            blocco_news+="<div class='blog-card animated fadein delay-1'><div class='blog-header'><div class='blog-author'><span class='titolo_storico'>"+news.titolo+"</span> <span class='small'>"+news.data+"</span></div></div>";
          
            blocco_news += "<div class='blog-image'>  <img src='http://simplyappweb.mvclienti.com/Account/Uploads/News/galleria_img/immagini/" + news.immagine + "' rel='external' alt=''/></div>";
           
            blocco_news += "<div class='blog-preview p-20'><p>" + news.descrizione_breve + "</p><div class='btn_storico'><a href='#' onclick='modifica(\"" + news.ID + "\",\"" + News + "\");' class='waves-effect waves-light btn accent-color'><span class='ion-edit'></span></a><a href='#' onclick='cancellaNews(\"" + news.ID + "\");' class='waves-effect waves-light btn accent-color'><span class='ion-close-circled'></span></a></div></div></div>";
        });
        if (lunghezza == 0) {
            blocco_news +="<div class='modal-content'><h4>No News </h4><p>Non vi sono news salvate!!</p></div>";
            blocco_news += "<div class='modal-footer'> <a href='#dashboard' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#no_news").html("");
            $("#no_news").append(blocco_news);
            $("#apri_no_news").click();
        }
       
        if (lunghezza != 0)
        {
            $(".appendi_news").append(blocco_news);
            $("#si_fixed_footer").hide();
            $("#no_fixed_footer").show();
        }
      
    });

}

function cancellaNews(ID_news)
{
    $.ajax({
        type: "POST",
        data: '{ID:"' + ID_news + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/servizi_app.aspx/cancellaNews',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;
            if (ritorno == "si") {
                var siCancellaNews = "<div class='modal-content'><h4>News eliminata </h4><p>News eliminta con successo!!</p></div>";
                siCancellaNews += "<div class='modal-footer'> <a href='#' onclick='clickNewsStorico()' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_cancellazione_news").html("");
                $("#box_cancellazione_news").append(siCancellaNews);
                $("#apri_box_cancellazione_news").click();
            } else {
                var noCancellaNews = "<div class='modal-content'><h4>News non eliminata </h4><p>News non eliminata!!<br>Si prega di riprovare. </p></div>";
                noCancellaNews += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_cancellazione_news").html("");
                $("#box_cancellazione_news").append(noCancellaNews);
                $("#apri_box_cancellazione_news").click();
            }

        },
        error: function (e) {
            var noInternet = "<div class='modal-content'><h4>No Connessione </h4><p>Verifica lo stato della tua connessione internet.</p></div>";
            noInternet += "<div class='modal-footer'> <a href='#home' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#box_infoMvitalia").html("");
            $("#box_infoMvitalia").append(noInternet);
            $("#apri_box_infoMvitalia").click();
        }
    });
}

function clickEventiStorico()
{
    localStorage.setItem("argomento_filtri", "eventi");
    $("#newsStorico").removeClass("active");
    $("#promoStorico").removeClass("active");
    $("#eventiStorico").addClass("active");
    $(".appendi_news").html("");
    // Faccio la selezione dal server delle new di questo utente
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/storico_eventi.aspx?id_utente=" + localStorage.getItem("ID_utente") + "", function (dati) {
        var blocco_eventi = "";
        var lunghezza = dati.length;
        var Eventi = "Eventi";

        $.each(dati, function (i, eventi) {

           
            blocco_eventi += "<div class='blog-card animated fadein delay-1'><div class='blog-header'><div class='blog-author'><span class='titolo_storico'>" + eventi.titolo + "</span> <span class='small'>" + eventi.data + "</span></div></div>";

            blocco_eventi += "<div class='blog-image'>  <img src='http://simplyappweb.mvclienti.com/Account/Uploads/Eventi/galleria_img/immagini/" + eventi.immagine + "' rel='external' alt=''/></div>";

            blocco_eventi += "<div class='blog-preview p-20'><p>" + eventi.descrizione_breve + "</p><div class='btn_storico'><a href='#' onclick='modifica(\"" + eventi.ID + "\",\"" + Eventi + "\");' class='waves-effect waves-light btn accent-color'><span class='ion-edit'></span></a><a href='#' onclick='cancellaEvento(\"" + eventi.ID + "\");' class='waves-effect waves-light btn accent-color'><span class='ion-close-circled'></span></a></div></div></div>";
        });
        if (lunghezza == 0) {
            blocco_eventi += "<div class='modal-content'><h4>No Eventi </h4><p>Non vi sono eventi salvati!!</p></div>";
            blocco_eventi += "<div class='modal-footer'> <a href='#dashboard' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#no_news").html("");
            $("#no_news").append(blocco_eventi);
            $("#apri_no_news").click();
        }

        if (lunghezza != 0) {
            $(".appendi_news").append(blocco_eventi);
            $("#si_fixed_footer").hide();
            $("#no_fixed_footer").show();
        }

    });
}

function cancellaEvento(ID_evento) {
  
    $.ajax({
        type: "POST",
        data: '{ID:"' + ID_evento + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/servizi_app.aspx/cancellaEvento',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;
            if (ritorno == "si") {
                var siCancellaEvento = "<div class='modal-content'><h4>Evento eliminato </h4><p>Evento eliminato con successo!!</p></div>";
                siCancellaEvento += "<div class='modal-footer'> <a href='#' onclick='clickEventiStorico()' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_cancellazione_news").html("");
                $("#box_cancellazione_news").append(siCancellaEvento);
                $("#apri_box_cancellazione_news").click();
               
            } else {
                var noCancellaEvento = "<div class='modal-content'><h4>Evento non eliminato </h4><p>Evento non eliminato!!<br>Si prega di riprovare. </p></div>";
                noCancellaEvento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_cancellazione_news").html("");
                $("#box_cancellazione_news").append(noCancellaEvento);
                $("#apri_box_cancellazione_news").click();
            }

        },
        error: function (e) {
            var noInternet = "<div class='modal-content'><h4>No Connessione </h4><p>Verifica lo stato della tua connessione internet.</p></div>";
            noInternet += "<div class='modal-footer'> <a href='#home' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#box_infoMvitalia").html("");
            $("#box_infoMvitalia").append(noInternet);
            $("#apri_box_infoMvitalia").click();
        }
    });
}

function clickPromoStorico() {
    localStorage.setItem("argomento_filtri", "promo");
    $("#newsStorico").removeClass("active");
    $("#promoStorico").addClass("active");
    $("#eventiStorico").removeClass("active");
    $(".appendi_news").html("");
    // Faccio la selezione dal server delle new di questo utente
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/storico_promo.aspx?id_utente=" + localStorage.getItem("ID_utente") + "", function (dati) {
        var blocco_promo = "";
        var lunghezza = dati.length;
        var Promo = "Promo";

        $.each(dati, function (i, promo) {


            blocco_promo += "<div class='blog-card animated fadein delay-1'><div class='blog-header'><div class='blog-author'><span class='titolo_storico'>" + promo.titolo + "</span> <span class='small'>" + promo.data + "</span></div></div>";

            blocco_promo += "<div class='blog-image'>  <img src='http://simplyappweb.mvclienti.com/Account/Uploads/Promo/galleria_img/immagini/" + promo.immagine + "' rel='external' alt=''/></div>";

            blocco_promo += "<div class='blog-preview p-20'><p>" + promo.descrizione_breve + "</p><div class='btn_storico'><a href='#' onclick='modifica(\"" + promo.ID + "\",\"" + Promo + "\");' class='waves-effect waves-light btn accent-color'><span class='ion-edit'></span></a><a href='#' onclick='cancellaPromo(\"" + promo.ID + "\");' class='waves-effect waves-light btn accent-color'><span class='ion-close-circled'></span></a></div></div></div>";
        });
        if (lunghezza == 0) {
            blocco_promo += "<div class='modal-content'><h4>No Promo </h4><p>Non vi sono promozioni salvate!!</p></div>";
            blocco_promo += "<div class='modal-footer'> <a href='#dashboard' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#no_news").html("");
            $("#no_news").append(blocco_promo);
            $("#apri_no_news").click();
        }

        if (lunghezza != 0) {
            $(".appendi_news").append(blocco_promo);
            $("#si_fixed_footer").hide();
            $("#no_fixed_footer").show();
        }

    });
}

function cancellaPromo(ID_promo) {
    
    // Cancello News

    $.ajax({
        type: "POST",
        data: '{ID:"' + ID_promo + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/servizi_app.aspx/cancellaPromo',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;
            if (ritorno == "si") {
                var siCancellaPromo = "<div class='modal-content'><h4>Promo eliminata </h4><p>Promozione eliminata con successo!!</p></div>";
                siCancellaPromo += "<div class='modal-footer'> <a href='#' onclick='clickPromoStorico()' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_cancellazione_news").html("");
                $("#box_cancellazione_news").append(siCancellaPromo);
                $("#apri_box_cancellazione_news").click();

            } else {
                var noCancellaPromo = "<div class='modal-content'><h4>Promo non eliminata </h4><p>Promozione non eliminata!!<br>Si prega di riprovare. </p></div>";
                noCancellaPromo += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_cancellazione_news").html("");
                $("#box_cancellazione_news").append(noCancellaPromo);
                $("#apri_box_cancellazione_news").click();
            }

        },
        error: function (e) {
            var noInternet = "<div class='modal-content'><h4>No Connessione </h4><p>Verifica lo stato della tua connessione internet.</p></div>";
            noInternet += "<div class='modal-footer'> <a href='#home' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#box_infoMvitalia").html("");
            $("#box_infoMvitalia").append(noInternet);
            $("#apri_box_infoMvitalia").click();
        }
    });
}

function modifica(ID,argomento)
{
    
    // Imposto il local storage per la modifica
    localStorage.setItem('id_modifica_argomento', ID);
    localStorage.setItem('nome_argomento_modifica', argomento);
    $.mobile.pageContainer.pagecontainer("change", "#modifica", {
        transition: 'flip',
        
    });

}

function selezionoArgomentoModifica() {
   
  
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/seleziono_argomento.aspx?id_argomento=" + localStorage.getItem("id_modifica_argomento") + "&argomento=" + localStorage.getItem("nome_argomento_modifica") + "", function (dati) {
       // var blocco_news = "";
        var lunghezza = dati.length;
        $.each(dati, function (i, argomento) {
            $("#titolo_lbl").addClass("active");
            $("#titolo_modifica").val(argomento.titolo);
            $("#data_lbl").addClass("active");
            $("#data_modifica").val(argomento.data);
            $("#sottotitolo_lbl").addClass("active");
            $("#sottotitolo_modifica").val(argomento.sottotitolo);
            $("#descrizione_lbl").addClass("active");
             $("#descrizione_modifica").val(argomento.descrizione);
        });
        selezionoMediaArgomento();
    });
    // Qua faccio funzione seleziono media dell' argomento
   
 
}

function selezionoMediaArgomento() {
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/seleziono_media_argomento.aspx?id_argomento=" + localStorage.getItem("id_modifica_argomento") + "&argomento=" + localStorage.getItem("nome_argomento_modifica") + "", function (dati) {
        // var blocco_news = "";
        var lunghezza = dati.length;
        var immagine = "";
        $.each(dati, function (i, media) {
           
            immagine = "<div class='grid-item gallery-item-card ' id='" + media.ID + "'> <img src='http://simplyappweb.mvclienti.com/Account/Uploads/" + localStorage.getItem('nome_argomento_modifica')+"/galleria_img/immagini/" + media.immagine + "' rel='external' alt='image'>";
            immagine += "<div onclick='cancellaFotoModifica(\"" + media.ID + "\");'  class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_modifica").append(immagine);
        });
      
    });
}

function cancellaFotoModifica(ID)
{
    
    $("#" + ID + "").hide();
    // La vado a cancellare sul server
    // Cancello News 
    $.ajax({
        type: "POST",
        data: '{ID:"' + ID + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/servizi_app.aspx/cancelloMediaArgomento',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;
            if (ritorno == "si") {
                var siCancellaMediaArgomento = "<div class='modal-content'><h4>Foto eliminata </h4><p>Foto eliminta con successo!!</p></div>";
                siCancellaMediaArgomento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_cancellazione_media_argomento").html("");
                $("#box_cancellazione_media_argomento").append(siCancellaMediaArgomento);
                $("#apri_box_cancellazione_media_argomento").click();
            } else {
                var noCancellaMediaArgomento = "<div class='modal-content'><h4>Foto non eliminata </h4><p>Foto non eliminata!!<br>Si prega di riprovare. </p></div>";
                noCancellaMediaArgomento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_cancellazione_media_argomento").html("");
                $("#box_cancellazione_media_argomento").append(noCancellaMediaArgomento);
                $("#apri_box_cancellazione_media_argomento").click();
            }

        },
        error: function (e) {
            var noInternet = "<div class='modal-content'><h4>No Connessione </h4><p>Verifica lo stato della tua connessione internet.</p></div>";
            noInternet += "<div class='modal-footer'> <a href='#home' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#box_infoMvitalia").html("");
            $("#box_infoMvitalia").append(noInternet);
            $("#apri_box_infoMvitalia").click();
        }
    });

}

function aggiornaArgomento(titolo_modifica, data_modifica, sottotitolo_modifica, descrizione_modifica)
{
   
    var tipo_argomento = localStorage.getItem('nome_argomento_modifica');
    $.ajax({
        type: "POST",
        data: '{titolo:"' + titolo_modifica + '",data:"' + data_modifica + '",sottotitolo:"' + sottotitolo_modifica + '",descrizione:"' + descrizione_modifica + '", ID_argomento:"' + localStorage.getItem("id_modifica_argomento") + '", ID_utente:"' + localStorage.getItem("ID_utente") + '", argomento:"' + localStorage.getItem('nome_argomento_modifica') + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/aggiorno_argomento_app.aspx/updateArgomento',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;
           
            if (ritorno == "Si") {
                var siCaricamento = "<div class='modal-content'><h4>Argomento Aggiornato </h4><p>Argomento (" + tipo_argomento + ") Aggiornato</p></div>";
                siCaricamento += "<div class='modal-footer'> <a href='#dashboard' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_aggiornamento").html("");
                $("#box_aggiornamento").append(siCaricamento);
                $("#apri_box_aggiornamento").click();
            } else {
                var noCaricamento = "<div class='modal-content'><h4>Argomento non caricato </h4><p>Argomento (" + tipo_argomento + ") non aggiornato.<br>Si prega di riprovare </p></div>";
                noCaricamento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_aggiornamento").html("");
                $("#box_aggiornamento").append(noCaricamento);
                $("#apri_box_aggiornamento").click();
            }

        },
        error: function (e) {

        }
    });
}
                         
// Storico gallery

function clickGalleryStorico() {
  
    $.mobile.pageContainer.pagecontainer("change", "#modifica_gallery", {
        transition: 'flip',
    });
}

function selezionoStoricoGallery()
{
    
    // Faccio la selezione dal server delle new di questo utente
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/storico_gallery.aspx?id_utente=" + localStorage.getItem("ID_utente") + "", function (dati) {
        var blocco_gallery = "";
        var lunghezza = dati.length;
        var Gallery = "Gallery";

        $.each(dati, function (i, gallery) {
           
            blocco_gallery += "<div class='grid-item gallery-item-card' id='foto_" + gallery.ID + "'><div class='box_height_img'> <img src='http://simplyappweb.mvclienti.com/Account/Uploads/Gallery/galleria_img/immagini/" + gallery.immagine + "' rel='external' alt='image'/></div>";
            blocco_gallery += "<div class='gallery-item-header'><div class='gallery-item-author'><span class='span_categoria'>" + gallery.categoria + "</span><div class='modifica_gallery'><a class='btn_gallery waves-effect waves-light btn accent-color' onclick='apriPaginaModificaSingolaFotoGallery(\"" + gallery.ID + "\",\"" + gallery.categoria + "\");' href='#'><span class='ion-edit'></span></a><a onclick='cancellaFotoGallery(\"" + gallery.ID + "\");' class='btn_gallery waves-effect waves-light btn accent-color' href='#'><span class='ion-close-circled'></span></a></div></div></div></div>";
          
        });
        if (lunghezza == 0) {
            blocco_gallery += "<div class='modal-content'><h4>No Eventi </h4><p>Non vi sono eventi salvati!!</p></div>";
            blocco_gallery += "<div class='modal-footer'> <a href='#dashboard' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#no_news").html("");
            $("#no_news").append(blocco_gallery);
            $("#apri_no_news").click();
        }

        if (lunghezza != 0) {
           
            $(".appendi_storico_gallery").append(blocco_gallery);
        }

    });
}

function cancellaFotoGallery(ID_gallery)
{
    $("#foto_" + ID_gallery + "").hide();
    $.ajax({
        type: "POST",
        data: '{ID:"' + ID_gallery + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/servizi_app.aspx/cancellaFotoGallery',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;
            if (ritorno == "si") {
                var siCancellaFoto = "<div class='modal-content'><h4>Foto eliminata </h4><p>Foto eliminata con successo!!</p></div>";
                siCancellaFoto += "<div class='modal-footer'> <a href='#' onclick='clickGalleryStorico()' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_cancellazione_foto_gallery").html("");
                $("#box_cancellazione_foto_gallery").append(siCancellaFoto);
                $("#apri_box_cancellazione_foto_gallery").click();

            } else {
                var noCancellaFoto = "<div class='modal-content'><h4>Foto non eliminata </h4><p>Foto non eliminata!!<br>Si prega di riprovare. </p></div>";
                noCancellaFoto += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_cancellazione_foto_gallery").html("");
                $("#box_cancellazione_foto_gallery").append(noCancellaFoto);
                $("#apri_box_cancellazione_foto_gallery").click();
            }

        },
        error: function (e) {
            var noInternet = "<div class='modal-content'><h4>No Connessione </h4><p>Verifica lo stato della tua connessione internet.</p></div>";
            noInternet += "<div class='modal-footer'> <a href='#home' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#box_infoMvitalia").html("");
            $("#box_infoMvitalia").append(noInternet);
            $("#apri_box_infoMvitalia").click();
        }
    });
}

function apriPaginaModificaSingolaFotoGallery(ID_gallery, nome_categoria)
{
    
    // LocalStorage per il salvataggio ID della gallery dove modificare la singola foto
    localStorage.setItem("ID_foto_singola_gallery", ID_gallery);
    localStorage.setItem("nome_categoria_singola_foto", nome_categoria);
    $.mobile.pageContainer.pagecontainer("change", "#modifica_foto_gallery", {
        transition: 'flip',
    });

}

function selezionoDatiSingolaFotoGallery()
{
    var nome_categoria = localStorage.getItem("nome_categoria_singola_foto");
    // Faccio la selezione dal server delle new di questo utente
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/categorie_gallery.aspx?id_utente=" + localStorage.getItem("ID_utente") + "", function (dati) {
        var id_selezionato = "";
        var tab_categorie = "<div  class='controls'><label>Categorie:</label>";
        $.each(dati, function (i, categorie) {
        
            // Inserisco dati nel db sqllite dell' App
            if (nome_categoria == categorie.nome)
            {
                tab_categorie += "<button style='margin-bottom:10px; margin-top:15px' onclick='clickCategoriaModifica(\"" + categorie.ID + "\")' class='filter active' id='tab" + categorie.ID + "' >" + categorie.nome + "</button>"
                id_selezionato = categorie.ID;
            } else {
                tab_categorie += "<button style='margin-bottom:10px; margin-top:15px' onclick='clickCategoriaModifica(\"" + categorie.ID + "\",\"" + id_selezionato + "\")' class='filter' id='" + categorie.ID + "' >" + categorie.nome + "</button>"
            }
           
            
            
        });
        tab_categorie += "</div>";      
        $(".appendi_categorie_modifica").append(tab_categorie);
        // Qua seleziono i dati della singola foto con una funzione
        selectDatiSingolaFoto();
    });
}

function clickCategoriaModifica(ID_categoria, ID_selezionato) {
    // LocalStorage per il salvataggio ID_categoria della singola foto
    localStorage.setItem('id_categoria_gallery_modifica_singola_foto', ID_categoria);
    
    $("#tab" + ID_selezionato + "").removeClass("active", "");
    $("#" + ID_categoria + "").addClass("active");
    if (localStorage.getItem("id_precedente") != null)
    {
        $("#" + localStorage.getItem("id_precedente") + "").removeClass("active");
    }
    localStorage.setItem("id_precedente", ID_categoria);

}

function selectDatiSingolaFoto ()
{
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/seleziono_dati_foto_gallery.aspx?id_gallery="+localStorage.getItem("ID_foto_singola_gallery")+"", function (dati) {
        var id_selezionato = "";
        var tab_stato = "<div  class='controls'><label>Categorie:</label>";
        var blocco_img = "";
        $.each(dati, function (i, foto) {
            blocco_img += "<div class='blog-card animated fadein delay-1'>";
            blocco_img += "<div class='blog-image'>  <img src='http://simplyappweb.mvclienti.com/Account/Uploads/Gallery/galleria_img/immagini/" + foto.immagine + "' rel='external' alt=''/></div></div>";
            if(foto.stato=="Attivo")
            {
                $("#stato_attivo").addClass("active");
            } else {
                $("#stato_non_attivo").addClass("active");
            }
            $("#titolo_foto_lbl").addClass("active");
            $("#titolo_modifica_foto").val(foto.titolo_img);
            localStorage.setItem("foto_da_cancellare_se_sostituita", foto.immagine);
        });
        $(".appendi_immmagine_modifica").append(blocco_img);
       
    });
}

function clickStatoAttivo()
{
    $("#stato_attivo").addClass("active");
    $("#stato_non_attivo").removeClass("active");
    // LocalStorage per il salvataggio dello stato della singola foto
    localStorage.setItem("stato_singola_foto", "Attivo");
   
}
                      
function clickStatoNoAttivo ()
{
    $("#stato_attivo").removeClass("active");
    $("#stato_non_attivo").addClass("active");
    localStorage.setItem("stato_singola_foto", "Non Attivo");
}

function salvaFotoSingolaGallery()
{
    var titolo_img = $("#titolo_modifica_foto").val();
    var stato = localStorage.getItem("stato_singola_foto");
    var ID_categoria = localStorage.getItem('id_categoria_gallery_modifica_singola_foto');
    $.ajax({
        type: "POST",
        data: '{titolo_img:"' + titolo_img + '",stato:"' + stato + '",ID_categoria:"' + ID_categoria + '", ID:"' + localStorage.getItem('ID_foto_singola_gallery') + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/servizi_app.aspx/updateSingolaFotoGallery',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
           var ritorno = data.d;
           if (ritorno == "si") {
                var siCaricamento = "<div class='modal-content'><h4>Foto Aggiornata </h4><p>Foto Gallery Aggiornata</p></div>";
                siCaricamento += "<div class='modal-footer'> <a href='#modifica_gallery' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_aggiornamento_foto_singola").html("");
                $("#box_aggiornamento_foto_singola").append(siCaricamento);
                $("#apri_box_aggiornamento_foto_singola").click();
            } else {
               var noCaricamento = "<div class='modal-content'><h4>Foto Non Aggiornata </h4><p>Foto Gallery Non Aggiornata.<br>Si prega di riprovare </p></div>";
                noCaricamento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_aggiornamento_foto_singola").html("");
                $("#box_aggiornamento_foto_singola").append(noCaricamento);
                $("#apri_box_aggiornamento_foto_singola").click();
            }

        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
    
}

// Filtri gallery

function selezionoCategoriePerFiltri() {
    // Faccio la selezione dal server delle new di questo utente
  
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/categorie_gallery.aspx?id_utente=" + localStorage.getItem("ID_utente") + "", function (dati) {
        var id_selezionato = "";
        var tab_categorie = "<div  class='controls'><label>Filtri:</label>";
        $.each(dati, function (i, categorie) {
            // Inserisco dati nel db sqllite dell' App
            tab_categorie += "<button style='margin-bottom:10px; margin-top:15px' onclick='clickFiltroPerCategoria(\"" + categorie.ID + "\")' class='filter' id='" + categorie.ID + "' >" + categorie.nome + "</button>"
        });
        tab_categorie += "</div>";
        $(".appendi_categorie_filtri").append(tab_categorie);
        // Qua seleziono i dati della singola foto con una funzione
        
    });
}

function clickFiltroPerCategoria(ID_categoria)
{
    
    $("#" + ID_categoria + "").addClass("active");
    if (localStorage.getItem("id_precedente") != null) {
        $("#" + localStorage.getItem("id_precedente") + "").removeClass("active");
    }
    localStorage.setItem("id_precedente", ID_categoria);
    $(".appendi_storico_gallery").html("");
    // Applico filtri
    // Faccio la selezione dal server delle new di questo utente
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/storico_gallery_filtri.aspx?id_utente=" + localStorage.getItem("ID_utente") + "&id_categoria="+ID_categoria+"", function (dati) {
        var blocco_gallery = "";
        var lunghezza = dati.length;
        var Gallery = "Gallery";
       
        $.each(dati, function (i, gallery) {

            blocco_gallery += "<div class='grid-item gallery-item-card' id='foto_" + gallery.ID + "'><div class='box_height_img'> <img src='http://simplyappweb.mvclienti.com/Account/Uploads/Gallery/galleria_img/immagini/" + gallery.immagine + "' rel='external' alt='image'/></div>";
            blocco_gallery += "<div class='gallery-item-header'><div class='gallery-item-author'><span>" + gallery.categoria + "</span><div class='modifica_gallery'><a class='btn_gallery waves-effect waves-light btn accent-color' onclick='apriPaginaModificaSingolaFotoGallery(\"" + gallery.ID + "\",\"" + gallery.categoria + "\");' href='#'><span class='ion-edit'></span></a><a onclick='cancellaFotoGallery(\"" + gallery.ID + "\");' class='btn_gallery waves-effect waves-light btn accent-color' href='#'><span class='ion-close-circled'></span></a></div></div></div></div>";
            categoria = gallery.categoria;
           
        });
    
        if (lunghezza == 0) {
            blocco_gallery += "<div class='modal-content'><h4>No Foto </h4><p>Non vi sono foto nella gallery per questa categoria!!</p></div>";
            blocco_gallery += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#no_gallery_cat").html("");
            $("#no_gallery_cat").append(blocco_gallery);
            $("#apri_no_gallery_cat").click();
        }
      
        if (lunghezza != 0) {

            $(".appendi_storico_gallery").append(blocco_gallery);
        }

    });
}


// Filtri Argomenti

function filtraArgomento(stato, tipo)
{
    
    if (stato == "si" && tipo == "Attivo")
    {
        $("#stato_attivo_filtro").addClass("active");
        $("#stato_non_attivo_filtro").removeClass("active");
    }
    if (stato == "si" && tipo == "Non Attivo") {
        $("#stato_attivo_filtro").removeClass("active");
        $("#stato_non_attivo_filtro").addClass("active");
    }

    var ricerca_valore = $("#ricerca").val();
    if (ricerca_valore != "")
    {
        ricerca = ricerca_valore;
    } else {
        ricerca = "";
    }
  
    var argomento = localStorage.getItem("argomento_filtri");
    var argomento_giusto = "";
    {
        if(argomento=="news")
        {
            argomento_giusto = "News";
        }
        if (argomento == "eventi") {
            argomento_giusto = "Eventi";
        }
        if (argomento == "promo") {
            argomento_giusto = "Promo";
        }
    }
    $(".appendi_news").html("");
    
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/storico_argomenti_filtri.aspx?id_utente=" + localStorage.getItem("ID_utente") + "&stato="+stato+"&ricerca="+ricerca+"&tipo_argomento="+argomento+"&tipo_stato="+tipo+"", function (dati) {
        var blocco_eventi = "";
        var lunghezza = dati.length;
      
      
        $.each(dati, function (i, argomenti_filtrati) {


            blocco_eventi += "<div class='blog-card animated fadein delay-1'><div class='blog-header'><div class='blog-author'><span class='titolo_storico'>" + argomenti_filtrati.titolo + "</span> <span class='small'>" + argomenti_filtrati.data + "</span></div></div>";

            blocco_eventi += "<div class='blog-image'>  <img src='http://simplyappweb.mvclienti.com/Account/Uploads/"+argomento+"/galleria_img/immagini/" + argomenti_filtrati.immagine + "' rel='external' alt=''/></div>";

            blocco_eventi += "<div class='blog-preview p-20'><p>" + argomenti_filtrati.descrizione_breve + "</p><div class='btn_storico'><a href='#' onclick='modifica(\"" + argomenti_filtrati.ID + "\",\"" + argomento_giusto + "\");' class='waves-effect waves-light btn primary-color'><span class='ion-edit'></span></a><a href='#' onclick='cancellaEvento(\"" + argomenti_filtrati.ID + "\");' class='waves-effect waves-light btn primary-color'><span class='ion-close-circled'></span></a></div></div></div>";
        });
        if (lunghezza == 0) {
            blocco_eventi += "<div class='modal-content'><h4>No " + localStorage.getItem("argomento_filtri") + " </h4><p>Nessun\a " + localStorage.getItem("argomento_filtri") + "  trovata dopo la ricerca!!</p></div>";
            blocco_eventi += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#no_news").html("");
            $("#no_news").append(blocco_eventi);
            $("#apri_no_news").click();
            $("#si_fixed_footer").show();
            $("#no_fixed_footer").hide();
        }

        if (lunghezza != 0) {
            $(".appendi_news").append(blocco_eventi);
            $("#si_fixed_footer").hide();
            $("#no_fixed_footer").show();
        }

    });
  
}

$("#flip-checkbox-1").bind("change", function (event, ui) {
    $("#filtri").toggle();
    var stato_flip = $("#flip-checkbox-1").prop("checked");
    
    if (stato_flip == false && localStorage.getItem("argomento_filtri") == "news") {
      
        clickNewsStorico();
    }
    if (stato_flip == false && localStorage.getItem("argomento_filtri") == "eventi") {
        clickEventiStorico();
    }
    if (stato_flip == false && localStorage.getItem("argomento_filtri") == "promo") {
        clickPromoStorico();
    }
});

$("#flip-aggiungi-categoria").bind("change", function (event, ui) {
    $("#addCategoria").toggle();
    var stato_flip = $("#flip-aggiungi-categoria").prop("checked");
    if (stato_flip == true)
    {
        $("#footer_gallery").removeClass("footer_home");
    }
    if (stato_flip == false) {
        $("#footer_gallery").addClass("footer_home");
      
    }
  
});

function selezioneArgomentiUtenteStili() {


    db.transaction(selezionoArgomentiStili);
}

function selezionoArgomentiStili(tx) {
    // Serve per contare se almeno c'è uno tra news/promo/eventi/gallery/ per poi append html
    var count = 0;


    tx.executeSql("SELECT * From utenti", [],
    function (tx, dati) {
        var len = dati.rows.length;



        var tab_argomenti = "<div  class='controls'><label>Argomento:</label>";
        if (len != 0) {
            /* Qua compongo grafica tab news - eventi - promo - gallery */
            if (dati.rows.item(0).news == 1) {
                tab_argomenti += " <button onclick='clickNewsStili()' class='filter' id='newsStili' >News</button>"
                count++;

            }
            if (dati.rows.item(0).eventi == 1) {
                tab_argomenti += " <button onclick='clickEventiStili()' class='filter' id='eventiStili' >Eventi</button>"
                count++;

            }
            if (dati.rows.item(0).promo == 1) {
                tab_argomenti += " <button onclick='clickPromoStili()' class='filter' id='promoStili' >Promo</button>"
                count++;

            }
            if (dati.rows.item(0).gallery == 1) {
                tab_argomenti += " <button onclick='clickGalleryStili()' class='filter' id='galleryStili' >Gallery</button>"
                count++;

            }
            tab_argomenti += "</div>";

        }
        $(".appendi_argomenti_stili").append(tab_argomenti);
        if (localStorage.getItem("condividi_storico") == null) {
            clickNewsStili();
        }
        if (localStorage.getItem("condividi_storico") == "News") {
            localStorage.removeItem('condividi_storico');
            clickNewsStili();
        }
        if (localStorage.getItem("condividi_storico") == "Eventi") {
            localStorage.removeItem('condividi_storico');
            clickEventiStili();
        }
        if (localStorage.getItem("condividi_storico") == "Promo") {
            localStorage.removeItem('condividi_storico');
            clickPromoStili();
        }
        if (localStorage.getItem("condividi_storico") == "Promo") {
            localStorage.removeItem('condividi_storico');
            clickGalleryStili();
        }




    },
    function () {
        alert("Errore" + e.message);
    });
}

function clickNewsStili() {
    $(".appendi_check_stili").html("");
    $(".contenitore_pulsanti_stili").html("");
    var stile_news = "";
    $("#promoStili").removeClass("active");
    $("#eventiStili").removeClass("active");
    $("#galleryStili").removeClass("active");
    $("#newsStili").addClass("active");
    // Faccio la selezione dal server degli stili di questo utente
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/get_stili_utente.aspx?id_utente=" + localStorage.getItem("ID_utente") + "", function (dati) {
        $.each(dati, function (i, stili) {
            stile_news = stili.stileNews;
           
            elencoStiliCheckBox(stile_news, "News")
        });
    });
  
}

function clickEventiStili() {
    $(".appendi_check_stili").html("");
    $(".contenitore_pulsanti_stili").html("");
    var stile_news = "";
    $("#promoStili").removeClass("active");
    $("#newsStili").removeClass("active");
    $("#galleryStili").removeClass("active");
    $("#eventiStili").addClass("active");
    // Faccio la selezione dal server degli stili di questo utente
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/get_stili_utente.aspx?id_utente=" + localStorage.getItem("ID_utente") + "", function (dati) {
        $.each(dati, function (i, stili) {
            stile_news = stili.stileEventi;

            elencoStiliCheckBox(stile_news, "Eventi")
        });
    });

}

function clickPromoStili() {
    $(".appendi_check_stili").html("");
    $(".contenitore_pulsanti_stili").html("");
    var stile_news = "";
    $("#eventiStili").removeClass("active");
    $("#newsStili").removeClass("active");
    $("#galleryStili").removeClass("active");
    $("#promoStili").addClass("active");
    // Faccio la selezione dal server degli stili di questo utente
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/get_stili_utente.aspx?id_utente=" + localStorage.getItem("ID_utente") + "", function (dati) {
        $.each(dati, function (i, stili) {
            stile_news = stili.stilePromo;

            elencoStiliCheckBox(stile_news, "Promo")
        });
    });

}

function clickGalleryStili() {
    $(".appendi_check_stili").html("");
    $(".contenitore_pulsanti_stili").html(""); 
    var stile_news = "";
    $("#eventiStili").removeClass("active");
    $("#newsStili").removeClass("active");
    $("#promoStili").removeClass("active");
    $("#galleryStili").addClass("active");
    // Faccio la selezione dal server degli stili di questo utente
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/get_stili_utente.aspx?id_utente=" + localStorage.getItem("ID_utente") + "", function (dati) {
        $.each(dati, function (i, stili) {
            stile_news = stili.stileGallery;

            elencoStiliCheckBox(stile_news, "Gallery")
        });
    });

}

function elencoStiliCheckBox (stile, argomento)
{
    var contesto = argomento;
 
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/getStili.aspx?argomento=" + argomento + "", function (dati) {
        var checkBoxStili = "<div class='selector'>";
        $.each(dati, function (i, argomento) {
            if (argomento.stile == stile)
            {
                checkBoxStili += "<div><input style='float:left !important;' data-role='none' checked type='radio' name='gruppo_stili' id='" + argomento.stile + "' onclick='clickCheckStile(\"" + argomento.stile + "\",\"" + contesto + "\")'  value='html' />  <label for='" + argomento.stile + "'>" + argomento.stile + "</label></div>"
            } else {
                checkBoxStili += "<div><input style='float:left !important;' data-role='none' type='radio' name='gruppo_stili' id='" + argomento.stile + "'  onclick='clickCheckStile(\"" + argomento.stile + "\",\"" + contesto + "\")' value='html' />  <label for='" + argomento.stile + "'>" + argomento.stile + "</label></div>"
            }
            
           
        });
        checkBoxStili += "</div>";
        $.ajax({
            type: "POST",
            data: '{stile:"' + stile + '", argomento:"' + argomento + '"}',
            url: 'http://simplyappweb.mvclienti.com/webservices/servizi_app.aspx/restituisciAnteprima',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function (data) {
                var ritorno = data.d;
                var btn_default = "";
                btn_default += "<div onclick='salvaStile()' class='btn btn_stili c-widget-figure accent-color'><span class='ion-edit'></span></div>";
                btn_default += "<a href='#' onclick='apriAnteprima(\"" + ritorno + "\")' class='btn btn_stili c-widget-figure accent-color'><span class='ion-camera'></span></a>"
               
                $(".contenitore_pulsanti_stili").append(btn_default);

            },
            error: function (e) {
              
            }
        });
        $(".appendi_check_stili").append(checkBoxStili);
    });
}
function clickCheckStile (stile, argomento)
{
    var contesto = argomento;
    // Qua gestisco la scelta dello stile
    $(".contenitore_pulsanti_stili").html("");
    $.ajax({
        type: "POST",
        data: '{stile:"' + stile + '", argomento:"' + argomento + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/servizi_app.aspx/restituisciAnteprima',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;
            var btn_default = "";
            btn_default += "<div onclick='salvaStile(\"" + stile + "\",\"" + contesto + "\")' class='btn btn_stili c-widget-figure accent-color'><span class='ion-edit'></span></div>";
            btn_default += "<a href='#' onclick='apriAnteprima(\"" + ritorno + "\")' class='btn btn_stili c-widget-figure accent-color'><span class='ion-camera'></span></a>"
            $(".contenitore_pulsanti_stili").append(btn_default);
           

        },
        error: function (e) {
          
        }
         
    });
}

function salvaStile(stile, contesto)
{
   
    $.ajax({
        type: "POST",
        data: '{ID:"' + localStorage.getItem('ID_utente') + '", stile:"' + stile + '", argomento:"' + contesto + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/servizi_app.aspx/updateStile',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;
            if (ritorno == "si") {
                var siCaricamento = "<div class='modal-content'><h4>Stile Aggiornato </h4><p>Stile "+contesto+" Aggiornato</p></div>";
                siCaricamento += "<div class='modal-footer'> <a href='#dashboard' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_aggiornamento_stile").html("");
                $("#box_aggiornamento_stile").append(siCaricamento);
                $("#apri_box_aggiornamento_stile").click();
            } else {
                var noCaricamento = "<div class='modal-content'><h4>Stile Non Aggiornato </h4><p>Stile "+contesto+" Non Aggiornato.<br>Si prega di riprovare </p></div>";
                noCaricamento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_aggiornamento_stile").html("");
                $("#box_aggiornamento_stile").append(noCaricamento);
                $("#apri_box_aggiornamento_stile").click();
            }

        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}

function apriAnteprima(pagina)
{
    window.open(''+pagina+'', '_system');
}

                   
