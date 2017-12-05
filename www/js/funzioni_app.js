// Variabili globali

var db // variabile globale che rappresenta l' oggetto database che creo

// EVENTI JQUERY
$(document).ready(function () {
   
    
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
            posizione: {
                required: true,

            },
            titolo: {
                required: true,

            },
            data: {
                required: true,
            }
           
        },
        messages: {
            posizione: {
                required: "Posizione obbligatorio"
            },
            titolo: {
                required: "Titolo obbligatorio"
            },
            data: {
                required: "Data obbligatoria"
            }
           

        },

        submitHandler: function (form) {
            if ($('#sito').is(":checked")) {
                var posizione = $("#posizione").val();
                var titolo = $("#titolo").val();
                var titolo_en = $("#titolo_en").val();
                var titolo_fr = $("#titolo_fr").val();
                var data = $("#data").val();
                var data_en = $("#data_en").val();
                var data_fr = $("#data_fr").val();
                var sottotitolo = $("#sottotitolo").val();
                var sottotitolo_en = $("#sottotitolo_en").val();
                var sottotitolo_fr = $("#sottotitolo_fr").val();
                tinyMCE.triggerSave();
                var descrizione = $("#descrizione").val();
                var descrizione_en = $("#descrizione_en").val();
                var descrizione_fr = $("#descrizione_fr").val();
                var descrizione_breve = $("#descrizione_breve").val();
                var descrizione_breve_en = $("#descrizione_breve_en").val();
                var descrizione_breve_fr = $("#descrizione_breve_fr").val();
                if (localStorage.getItem("argomento") == "")
                {
                    var scegli_argomento = "<div class='modal-content'><h4>Condivisione Fallita </h4><p>Scegli argomento!! </p></div>";
                    scegli_argomento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                    $("#scegli_argomento").html("");
                    $("#scegli_argomento").append(scegli_argomento);
                    $("#apri_scegli_argomento").click();
                } else {
                    
                    caricaSulSitoArgomento(posizione, titolo, titolo_en, titolo_fr, data, data_en, data_fr, sottotitolo, sottotitolo_en, sottotitolo_fr, descrizione_breve, descrizione_breve_en, descrizione_breve_fr, descrizione, descrizione_en, descrizione_fr);
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

    $('#pubblicaCategoriaProdotto').validate({
        rules: {
           
            nome_categoria_prodotto: {
                required: true,

            }


        },
        messages: {
           
            nome_categoria_prodotto: {
                required: "Nome obbligatorio"
            }

        },

        submitHandler: function (form) {
          
            var nome_categoria_prodotto = $("#nome_categoria_prodotto").val();
            var posizione_categoria_prodotto = $("#posizione_cat_prodotto").val();
            caricaCategoriaProdottoSito(nome_categoria_prodotto, posizione_categoria_prodotto);
            return false;
        }
    });

    $('#pubblicaCategoriaRealizzazione').validate({
        rules: {

            nome_categoria_realizzazione: {
                required: true,

            }


        },
        messages: {

            nome_categoria_realizzazione: {
                required: "Nome obbligatorio"
            }

        },

        submitHandler: function (form) {

            var nome_categoria_realizzazione = $("#nome_categoria_realizzazione").val();
            var posizione_categoria_realizzazione = $("#posizione_cat_realizzazione").val();
            caricaCategoriaRealizzazioneSito(nome_categoria_realizzazione, posizione_categoria_realizzazione);
            return false;
        }
    });

    $('#pubblicaCategoriaServiziCat').validate({
        rules: {

            nome_categoria_servizi_cat: {
                required: true,

            }


        },
        messages: {

            nome_categoria_servizi_cat: {
                required: "Nome obbligatorio"
            }

        },

        submitHandler: function (form) {

            var nome_categoria_servizi_cat = $("#nome_categoria_servizi_cat").val();
            var posizione_categoria_servizi_cat = $("#posizione_cat_servizi_cat").val();
            caricaCategoriaServiziCatSito(nome_categoria_servizi_cat, posizione_categoria_servizi_cat);
            return false;
        }
    });

    $('#pubblicaProdotto').validate({
        rules: {

            posizone_prodotto: {
                required: true,

            },
            nome_prodotto: {
                required: true,
            }
           
        },
        messages: {
            posizone_prodotto: {
                required: "Posizione obbligatorio"
            },
            nome_prodotto: {
                required: "Nome obbligatoria"
            }
            

        },

        submitHandler: function (form) {
            if ($('#sito').is(":checked")) {
                
                var posizione = $("#posizione_prodotto").val();
                var nome = $("#nome_prodotto").val();
                var nome_en = $("#nome_en_prodotto").val();
                var nome_fr = $("#nome_fr_prodotto").val();
                var prezzo = $("#prezzo_prodotto").val();
                var prezzo_scontato = $("#prezzo_scontato_prodotto").val();
                tinyMCE.triggerSave();
                var descrizione = $("#descrizione_prodotto").val();
                var descrizione_en = $("#descrizione_en_prodotto").val();
                var descrizione_fr = $("#descrizione_fr_prodotto").val();
                var descrizione_breve = $("#descrizione_breve_prodotto").val();
                var descrizione_breve_en = $("#descrizione_breve_en_prodotto").val();
                var descrizione_breve_fr = $("#descrizione_breve_fr_prodotto").val();
                if (localStorage.getItem("categoria_prodotto") == "") {
                    var scegli_categoria = "<div class='modal-content'><h4>Condivisione Fallita </h4><p>Scegli categoria Prodotto!! </p></div>";
                    scegli_categoria += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                    $("#scegli_categoria_prodotto").html("");
                    $("#scegli_categoria_prodotto").append(scegli_categoria);
                    $("#apri_scegli_categoria_prodotto").click();
                } else {

                    caricaSulSitoProdotto(posizione, nome, nome_en, nome_fr, prezzo, prezzo_scontato, descrizione_breve, descrizione_breve_en, descrizione_breve_fr, descrizione, descrizione_en, descrizione_fr);
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

    $('#pubblicaRealizzazione').validate({
        rules: {

            posizone_realizzazione: {
                required: true,

            },
            nome_realizzazione: {
                required: true,
            }
        },
        messages: {
            posizone_realizzazione: {
                required: "Posizione obbligatorio"
            },
            nome_realizzazione: {
                required: "Nome obbligatoria"
            }

        },

        submitHandler: function (form) {
            if ($('#sito').is(":checked")) {

                var posizione = $("#posizione_realizzazione").val();
                var nome = $("#nome_realizzazione").val();
                var nome_en = $("#nome_en_realizzazione").val();
                var nome_fr = $("#nome_fr_realizzazione").val();
                tinyMCE.triggerSave();
                var descrizione = $("#descrizione_realizzazione").val();
                var descrizione_en = $("#descrizione_en_realizzazione").val();
                var descrizione_fr = $("#descrizione_fr_realizzazione").val();
                var descrizione_breve = $("#descrizione_breve_realizzazione").val();
                var descrizione_breve_en = $("#descrizione_breve_en_realizzazione").val();
                var descrizione_breve_fr = $("#descrizione_breve_fr_realizzazione").val();
                if (localStorage.getItem("categoria_realizzazione") == "") {
                    var scegli_categoria = "<div class='modal-content'><h4>Condivisione Fallita </h4><p>Scegli categoria Realizzazione!! </p></div>";
                    scegli_categoria += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                    $("#scegli_categoria_realizzazione").html("");
                    $("#scegli_categoria_realizzazione").append(scegli_categoria);
                    $("#apri_scegli_categoria_realizzazione").click();
                } else {
                   
                    caricaSulSitoRealizzazione(posizione, nome, nome_en, nome_fr, descrizione_breve, descrizione_breve_en, descrizione_breve_fr, descrizione, descrizione_en, descrizione_fr);
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

    $('#pubblicaServiziCat').validate({
        rules: {

            posizone_servizi_cat: {
                required: true,

            },
            nome_servizi_cat: {
                required: true,
            }
        },
        messages: {
            posizone_servizi_cat: {
                required: "Posizione obbligatorio"
            },
            nome_servizi_cat: {
                required: "Nome obbligatoria"
            }

        },

        submitHandler: function (form) {
            if ($('#sito').is(":checked")) {

                var posizione = $("#posizione_servizi_cat").val();
                var nome = $("#nome_servizi_cat").val();
                var nome_en = $("#nome_en_servizi_cat").val();
                var nome_fr = $("#nome_fr_servizi_cat").val();
                tinyMCE.triggerSave();
                var descrizione = $("#descrizione_servizi_cat").val();
                var descrizione_en = $("#descrizione_en_servizi_cat").val();
                var descrizione_fr = $("#descrizione_fr_servizi_cat").val();
                var descrizione_breve = $("#descrizione_breve_servizi_cat").val();
                var descrizione_breve_en = $("#descrizione_breve_en_servizi_cat").val();
                var descrizione_breve_fr = $("#descrizione_breve_fr_servizi_cat").val();
                if (localStorage.getItem("categoria_servizi_cat") == "") {
                    var scegli_categoria = "<div class='modal-content'><h4>Condivisione Fallita </h4><p>Scegli categoria Servizio!! </p></div>";
                    scegli_categoria += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                    $("#scegli_categoria_servizi_cat").html("");
                    $("#scegli_categoria_servizi_cat").append(scegli_categoria);
                    $("#apri_scegli_categoria_servizi_cat").click();
                } else {

                    caricaSulSitoServiziCat(posizione, nome, nome_en, nome_fr, descrizione_breve, descrizione_breve_en, descrizione_breve_fr, descrizione, descrizione_en, descrizione_fr);
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

    $('#modificaArgomento').validate({
        rules: {

            titolo_modifica: {
                required: true,

            },
            data_modifica: {
                required: true,
            }
        },
        messages: {
            titolo_modifica: {
                required: "Titolo obbligatorio"
            },
            data_modifica: {
                required: "Data obbligatoria"
            }

        },

        submitHandler: function (form) {
            var titolo = $("#titolo_modifica").val();
            var titolo_en = $("#titolo_en_modifica").val();
            var titolo_fr = $("#titolo_en_modifica").val();
            var data = $("#data_modifica").val();
            var data_en = $("#data_en_modifica").val();
            var data_fr = $("#data_fr_modifica").val();
            var sottotitolo = $("#sottotitolo_modifica").val();
            var sottotitolo_en = $("#sottotitolo_en_modifica").val();
            var sottotitolo_fr = $("#sottotitolo_fr_modifica").val();
            tinyMCE.triggerSave();
            var descrizione = $("#descrizione_modifica").val();
            var descrizione_en = $("#descrizione_en_modifica").val();
            var descrizione_fr = $("#descrizione_fr_modifica").val();
            var descrizione_breve = $("#descrizione_breve_modifica").val();
            var descrizione_breve_en = $("#descrizione_breve_en_modifica").val();
            var descrizione_breve_fr = $("#descrizione_breve_fr_modifica").val();
            aggiornaArgomento(titolo, titolo_en, titolo_fr, data, data_en, data_fr, sottotitolo, sottotitolo_en, sottotitolo_fr, descrizione_breve, descrizione_breve_en, descrizione_breve_fr, descrizione, descrizione_en, descrizione_fr);
            // Quando torno vai alla funzione aggiorna argomento e modifica con descrizione breve e poi webservice collegato
            return false;
        }
    });

    $('#pubblicaProdottoModifica').validate({
        rules: {

            posizione_prodotto_modifica: {
                required: true,

            },
            nome_prodotto_modifica: {
                required: true,
            }
        },
        messages: {
            posizione_prodotto_modifica: {
                required: "Posizione obbligatorio"
            },
            nome_prodotto_modifica: {
                required: "Nome obbligatorio"
            }

        },

        submitHandler: function (form) {
            var posizione = $("#posizione_prodotto_modifica").val();
            var nome = $("#nome_prodotto_modifica").val();
            var nome_en = $("#nome_en_prodotto_modifica").val();
            var nome_fr = $("#nome_fr_prodotto_modifica").val();
            var prezzo = $("#prezzo_prodotto_modifica").val();
            var prezzo_scontato = $("#prezzo_scontato_prodotto_modifica").val();
            tinyMCE.triggerSave();
            var descrizione = $("#descrizione_prodotto_modifica").val();
            var descrizione_en = $("#descrizione_en_prodotto_modifica").val();
            var descrizione_fr = $("#descrizione_fr_prodotto_modifica").val();
            var descrizione_breve = $("#descrizione_breve_prodotto_modifica").val();
            var descrizione_breve_en = $("#descrizione_breve_en_prodotto_modifica").val();
            var descrizione_breve_fr = $("#descrizione_breve_fr_prodotto_modifica").val();
           
            aggiornaProdotto(posizione, nome, nome_en, nome_fr, prezzo, prezzo_scontato, descrizione_breve, descrizione_breve_en, descrizione_breve_fr, descrizione, descrizione_en, descrizione_fr);
            // Quando torno vai alla funzione aggiorna argomento e modifica con descrizione breve e poi webservice collegato
            return false;
        }
    });

    $('#pubblicaRealizzazioneModifica').validate({
        rules: {

            posizione_realizzazione_modifica: {
                required: true,

            },
            nome_realizzazione_modifica: {
                required: true,
            }
        },
        messages: {
            posizione_realizzazione_modifica: {
                required: "Posizione obbligatorio"
            },
            nome_realizzazione_modifica: {
                required: "Nome obbligatorio"
            }

        },

        submitHandler: function (form) {
            var posizione = $("#posizione_realizzazione_modifica").val();
            var nome = $("#nome_realizzazione_modifica").val();
            var nome_en = $("#nome_en_realizzazione_modifica").val();
            var nome_fr = $("#nome_fr_realizzazione_modifica").val();
            tinyMCE.triggerSave();
            var descrizione = $("#descrizione_realizzazione_modifica").val();
            var descrizione_en = $("#descrizione_en_realizzazione_modifica").val();
            var descrizione_fr = $("#descrizione_fr_realizzazione_modifica").val();
            var descrizione_breve = $("#descrizione_breve_realizzazione_modifica").val();
            var descrizione_breve_en = $("#descrizione_breve_en_realizzazione_modifica").val();
            var descrizione_breve_fr = $("#descrizione_breve_fr_realizzazione_modifica").val();
            aggiornaRealizzazione(posizione, nome, nome_en, nome_fr, descrizione_breve, descrizione_breve_en, descrizione_breve_fr, descrizione, descrizione_en, descrizione_fr);
            // Quando torno vai alla funzione aggiorna argomento e modifica con descrizione breve e poi webservice collegato
            return false;
        }
    });
   
    $('#pubblicaServizio').validate({
        rules: {

            posizione_servizio: {
                required: true,

            },
            titolo_servizio: {
                required: true,
            }
        },
        messages: {
            posizione_servizio: {
                required: "Posizione obbligatorio"
            },
            titolo_servizio: {
                required: "Titolo obbligatorio"
            }

        },

        submitHandler: function (form) {
            if ($('#sito').is(":checked")) {

                var posizione = $("#posizione_servizio").val();
                var titolo = $("#titolo_servizio").val();
                var titolo_en = $("#titolo_en_servizio").val();
                var titolo_fr = $("#titolo_fr_servizio").val();
                tinyMCE.triggerSave();
                var descrizione = $("#descrizione_servizio").val();
                var descrizione_en = $("#descrizione_en_servizio").val();
                var descrizione_fr = $("#descrizione_fr_servizio").val();
                var descrizione_breve = $("#descrizione_breve_servizio").val();
                var descrizione_breve_en = $("#descrizione_breve_en_servizio").val();
                var descrizione_breve_fr = $("#descrizione_breve_fr_servizio").val();
                caricaSulSitoServizio(posizione, titolo, titolo_en, titolo_fr, descrizione_breve, descrizione_breve_en, descrizione_breve_fr, descrizione, descrizione_en, descrizione_fr);
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

    $('#pubblicaServizioModifica').validate({
        rules: {

            posizione_servizio_modifica: {
                required: true,

            },
            titolo_servizio_modifica: {
                required: true,
            }
        },
        messages: {
            posizione_servizio_modifica: {
                required: "Posizione obbligatorio"
            },
            titolo_servizio_modifica: {
                required: "Nome obbligatorio"
            }

        },

        submitHandler: function (form) {
            var posizione = $("#posizione_servizio_modifica").val();
            var titolo = $("#titolo_servizio_modifica").val();
            var titolo_en = $("#titolo_en_servizio_modifica").val();
            var titolo_fr = $("#titolo_fr_servizio_modifica").val();
            tinyMCE.triggerSave();
            var descrizione = $("#descrizione_servizio_modifica").val();
            var descrizione_en = $("#descrizione_en_servizio_modifica").val();
            var descrizione_fr = $("#descrizione_fr_servizio_modifica").val();
            var descrizione_breve = $("#descrizione_breve_servizio_modifica").val();
            var descrizione_breve_en = $("#descrizione_breve_en_servizio_modifica").val();
            var descrizione_breve_fr = $("#descrizione_breve_fr_servizio_modifica").val();

            aggiornaServizio(posizione, titolo, titolo_en, titolo_fr, descrizione_breve, descrizione_breve_en, descrizione_breve_fr, descrizione, descrizione_en, descrizione_fr);
            // Quando torno vai alla funzione aggiorna argomento e modifica con descrizione breve e poi webservice collegato
            return false;
        }
    });

    $('#pubblicaServizioCatModifica').validate({
        rules: {

            posizione_servizio_cat_modifica: {
                required: true,

            },
            nome_servizio_cat_modifica: {
                required: true,
            }
        },
        messages: {
            posizione_servizio_cat_modifica: {
                required: "Posizione obbligatorio"
            },
            nome_servizio_cat_modifica: {
                required: "Nome obbligatorio"
            }

        },

        submitHandler: function (form) {
            var posizione = $("#posizione_servizio_cat_modifica").val();
            var nome = $("#nome_servizio_cat_modifica").val();
            var nome_en = $("#nome_en_servizio_cat_modifica").val();
            var nome_fr = $("#nome_fr_servizio_cat_modifica").val();
            tinyMCE.triggerSave();
            var descrizione = $("#descrizione_servizio_cat_modifica").val();
            var descrizione_en = $("#descrizione_en_servizio_cat_modifica").val();
            var descrizione_fr = $("#descrizione_fr_servizio_cat_modifica").val();
            var descrizione_breve = $("#descrizione_breve_servizio_cat_modifica").val();
            var descrizione_breve_en = $("#descrizione_breve_en_servizio_cat_modifica").val();
            var descrizione_breve_fr = $("#descrizione_breve_fr_servizio_cat_modifica").val();

            aggiornaServizioCat(posizione, nome, nome_en, nome_fr, descrizione_breve, descrizione_breve_en, descrizione_breve_fr, descrizione, descrizione_en, descrizione_fr);
            // Quando torno vai alla funzione aggiorna argomento e modifica con descrizione breve e poi webservice collegato
            return false;
        }
    });

    $('#pubblicaCertificazione').validate({
        rules: {

            posizione_certificazione: {
                required: true,

            },
            titolo_certificazione: {
                required: true,
            }
        },
        messages: {
            posizione_certificazione: {
                required: "Posizione obbligatorio"
            },
            titolo_certificazione: {
                required: "Titolo obbligatorio"
            }

        },

        submitHandler: function (form) {
            if ($('#sito').is(":checked")) {

                var posizione = $("#posizione_certificazione").val();
                var titolo = $("#titolo_certificazione").val();
                var titolo_en = $("#titolo_en_certificazione").val();
                var titolo_fr = $("#titolo_fr_certificazione").val();
                tinyMCE.triggerSave();
                var descrizione = $("#descrizione_certificazione").val();
                var descrizione_en = $("#descrizione_en_certificazione").val();
                var descrizione_fr = $("#descrizione_fr_certificazione").val();
                var descrizione_breve = $("#descrizione_breve_certificazione").val();
                var descrizione_breve_en = $("#descrizione_breve_en_certificazione").val();
                var descrizione_breve_fr = $("#descrizione_breve_fr_certificazione").val();
                caricaSulSitoCertificazione(posizione, titolo, titolo_en, titolo_fr, descrizione_breve, descrizione_breve_en, descrizione_breve_fr, descrizione, descrizione_en, descrizione_fr);
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

    $('#pubblicaCertificazioneModifica').validate({
        rules: {

            posizione_certificazione_modifica: {
                required: true,

            },
            titolo_certificazione_modifica: {
                required: true,
            }
        },
        messages: {
            posizione_certificazione_modifica: {
                required: "Posizione obbligatorio"
            },
            titolo_certificazione_modifica: {
                required: "Nome obbligatorio"
            }

        },

        submitHandler: function (form) {
            var posizione = $("#posizione_certificazione_modifica").val();
            var titolo = $("#titolo_certificazione_modifica").val();
            var titolo_en = $("#titolo_en_certificazione_modifica").val();
            var titolo_fr = $("#titolo_fr_certificazione_modifica").val();
            tinyMCE.triggerSave();
            var descrizione = $("#descrizione_certificazione_modifica").val();
            var descrizione_en = $("#descrizione_en_certificazione_modifica").val();
            var descrizione_fr = $("#descrizione_fr_certificazione_modifica").val();
            var descrizione_breve = $("#descrizione_breve_certificazione_modifica").val();
            var descrizione_breve_en = $("#descrizione_breve_en_certificazione_modifica").val();
            var descrizione_breve_fr = $("#descrizione_breve_fr_certificazione_modifica").val();
            aggiornaCertificazione(posizione, titolo, titolo_en, titolo_fr, descrizione_breve, descrizione_breve_en, descrizione_breve_fr, descrizione, descrizione_en, descrizione_fr);
            // Quando torno vai alla funzione aggiorna argomento e modifica con descrizione breve e poi webservice collegato
            return false;
        }
    });

    $('#pubblicaCategoria').validate({
        rules: {

            posizione_categoria: {
                required: true,

            },
            nome_categoria: {
                required: true,
            }
        },
        messages: {
            posizione_categoria: {
                required: "Posizione obbligatorio"
            },
            nome_categoria: {
                required: "Nome obbligatorio"
            }

        },

        submitHandler: function (form) {
            if ($('#sito').is(":checked")) {

                var posizione = $("#posizione_categoria").val();
                var nome = $("#nome_categoria").val();
                var nome_en = $("#nome_categoria_en").val();
                var nome_fr = $("#nome_categoria_fr").val();
                tinyMCE.triggerSave();
                var descrizione_breve = $("#descrizione_breve_categoria").val();
                var descrizione_breve_en = $("#descrizione_breve_en_categoria").val();
                var descrizione_breve_fr = $("#descrizione_breve_fr_categoria").val();
                caricaSulSitoCategoria(posizione, nome, nome_en, nome_fr, descrizione_breve, descrizione_breve_en, descrizione_breve_fr);
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

    $('#pubblicaAppartamento').validate({
        rules: {

            posizione_appartamento: {
                required: true,

            },
            nome_appartamento: {
                required: true,
            },
            prezzo_appartamento: {
                required: true,
            },
            n_locali_appartamento: {
                required: true,
            },
            n_bagni_appartamento: {
                required: true,
            },
            n_posti_letto_appartamento: {
                required: true,
            },
            metri_quadri_appartamento: {
                required: true,
            }
        },
        messages: {
            posizione_appartamento: {
                required: "Posizione obbligatorio"
            },
            nome_appartamento: {
                required: "Nome obbligatorio"
            },
            prezzo_appartamento: {
                required: "Prezzo obbligatorio"
            },
            n_locali_appartamento: {
                required: "N Locali obbligatorio"
            },
            n_bagni_appartamento: {
                required: "N Bagni obbligatorio"
            },
            n_posti_letto_appartamento: {
                required: "N Posti Letto obbligatorio"
            },
            metri_quadri_appartamento: {
                required: "Metri Quadri obbligatori"
            },

        },

        submitHandler: function (form) {
            if ($('#sito').is(":checked")) {

                var posizione = $("#posizione_appartamento").val();
                var nome = $("#nome_appartamento").val();
                var prezzo = $("#prezzo_appartamento").val();
                var prezzo_scontato = $("#prezzo_scontato_appartamento").val();
                var prezzo_aggiuntivo_infante = $("#prezzo_aggiuntivo_infante_appartamento").val();
                var n_locali = $("#n_locali_appartamento").val();
                var n_bagni = $("#n_bagni_appartamento").val();
                var n_posti_letto = $("#n_posti_letto_appartamento").val();
                var metri_quadri = $("#metri_quadri_appartamento").val();
                tinyMCE.triggerSave();
                var comfort = $("#comfort_appartamento").val();
                var comfort_en = $("#comfort_en_appartamento").val();
                var comfort_fr = $("#comfort_fr_appartamento").val();
                var descrizione = $("#descrizione_appartamento").val();
                var descrizione_en = $("#descrizione_en_appartamento").val();
                var descrizione_fr = $("#descrizione_fr_appartamento").val();
                var servizi_aggiuntivi = $("#servizi_aggiuntivi_appartamento").val();
                var servizi_aggiuntivi_en = $("#servizi_aggiuntivi_en_appartamento").val();
                var servizi_aggiuntivi_fr = $("#servizi_aggiuntivi_fr_appartamento").val();
              
                caricaSulSitoAppartamento(posizione, nome, prezzo, prezzo_scontato, prezzo_aggiuntivo_infante, n_locali, n_bagni, n_posti_letto, metri_quadri, comfort, comfort_en, comfort_fr, descrizione, descrizione_en, descrizione_fr, servizi_aggiuntivi, servizi_aggiuntivi_en, servizi_aggiuntivi_fr);
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

    $('#modificaAppartamentoUno').validate({
       
        rules: {
           
            posizione_appartamento_modifica: {
                required: true,

            },
            nome_appartamento_modifica: {
                required: true,
            },
            prezzo_appartamento_modifica: {
                required: true,
            },
            n_locali_appartamento_modifica: {
                required: true,
            },
            n_bagni_appartamento_modifica: {
                required: true,
            },
            n_posti_letto_appartamento_modifica: {
                required: true,
            },
            metri_quadri_appartamento_modifica: {
                required: true,
            }
        },
        messages: {
            posizione_appartamento_modifica: {
                required: "Posizione obbligatorio"
            },
            nome_appartamento_modifica: {
                required: "Nome obbligatorio"
            },
            prezzo_appartamento_modifica: {
                required: "Prezzo obbligatorio"
            },
            n_locali_appartamento_modifica: {
                required: "N Locali obbligatorio"
            },
            n_bagni_appartamento_modifica: {
                required: "N Bagni obbligatorio"
            },
            n_posti_letto_appartamento_modifica: {
                required: "N Posti Letto obbligatorio"
            },
            metri_quadri_appartamento_modifica: {
                required: "Metri Quadri obbligatori"
            },

        },

        submitHandler: function (form) {
          
              
                var posizione = $("#posizione_appartamento_modifica").val();
                var nome = $("#nome_appartamento_modifica").val();
                var prezzo = $("#prezzo_appartamento_modifica").val();
                var prezzo_scontato = $("#prezzo_scontato_appartamento_modifica").val();
                var prezzo_aggiuntivo_infante = $("#prezzo_aggiuntivo_infante_appartamento_modifica").val();
                var n_locali = $("#n_locali_appartamento_modifica").val();
                var n_bagni = $("#n_bagni_appartamento_modifica").val();
                var n_posti_letto = $("#n_posti_letto_appartamento_modifica").val();
                var metri_quadri = $("#metri_quadri_appartamento_modifica").val();
                tinyMCE.triggerSave();
                var comfort = $("#comfort_appartamento_modifica").val();
                var comfort_en = $("#comfort_en_appartamento_modifica").val();
                var comfort_fr = $("#comfort_fr_appartamento_modifica").val();
                var descrizione = $("#descrizione_appartamento_modifica").val();
                var descrizione_en = $("#descrizione_en_appartamento_modifica").val();
                var descrizione_fr = $("#descrizione_fr_appartamento_modifica").val();
                var servizi_aggiuntivi = $("#servizi_aggiuntivi_appartamento_modifica").val();
                var servizi_aggiuntivi_en = $("#servizi_aggiuntivi_en_appartamento_modifica").val();
                var servizi_aggiuntivi_fr = $("#servizi_aggiuntivi_fr_appartamento_modifica").val();
                
                aggiornaAppartamento(posizione, nome, prezzo, prezzo_scontato, prezzo_aggiuntivo_infante, n_locali, n_bagni, n_posti_letto, metri_quadri, comfort, comfort_en, comfort_fr, descrizione, descrizione_en, descrizione_fr, servizi_aggiuntivi, servizi_aggiuntivi_en, servizi_aggiuntivi_fr);
            

            return false;
        }
    });

    $('#pubblicaApprofondimenti').validate({
        rules: {

            posizione_approfondimenti: {
                required: true,

            },
            titolo_approfondimenti: {
                required: true,
            },
            data_approfondimenti: {
                required: true,
            }
        },
        messages: {
            posizione_approfondimenti: {
                required: "Posizione obbligatorio"
            },
            titolo_approfondimenti: {
                required: "Titolo obbligatoria"
            },
            data_approfondimenti: {
                required: "Data obbligatoria"
            },

        },

        submitHandler: function (form) {
            if ($('#sito').is(":checked")) {

                var posizione = $("#posizione_approfondimenti").val();
                var titolo = $("#titolo_approfondimenti").val();
                var titolo_en = $("#titolo_en_approfondimenti").val();
                var titolo_fr = $("#titolo_fr_approfondimenti").val();
                var link = $("#link_approfondimenti").val();
                var video = $("#video_approfondimenti").val();
                var data = $("#data_approfondimenti").val();
                tinyMCE.triggerSave();
                var descrizione = $("#descrizione_approfondimenti").val();
                var descrizione_en = $("#descrizione_en_approfondimenti").val();
                var descrizione_fr = $("#descrizione_fr_approfondimenti").val();
                var descrizione_breve = $("#descrizione_breve_approfondimenti").val();
                var descrizione_breve_en = $("#descrizione_breve_en_approfondimenti").val();
                var descrizione_breve_fr = $("#descrizione_breve_fr_approfondimenti").val();
                if (localStorage.getItem("categoria_approfondimenti") == "") {
                    var scegli_categoria = "<div class='modal-content'><h4>Condivisione Fallita </h4><p>Scegli categoria Servizio!! </p></div>";
                    scegli_categoria += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                    $("#scegli_categoria_approfondimenti").html("");
                    $("#scegli_categoria_approfondimenti").append(scegli_categoria);
                    $("#apri_scegli_categoria_approfondimenti").click();
                } else {

                    caricaSulSitoApprofondimenti(posizione, titolo, titolo_en, titolo_fr, link, video, data, descrizione_breve, descrizione_breve_en, descrizione_breve_fr, descrizione, descrizione_en, descrizione_fr);
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

    $('#pubblicaApprofondimentoModifica').validate({
        rules: {

            posizione_approfondimento_modifica: {
                required: true,

            },
            titolo_approfondimento_modifica: {
                required: true,
            },
            data_approfondimento_modifica: {
                required: true,
            }
        },
        messages: {
            posizione_approfondimento_modifica: {
                required: "Posizione obbligatorio"
            },
            titolo_approfondimento_modifica: {
                required: "Titolo obbligatoria"
            },
            data_approfondimento_modificai: {
                required: "Data obbligatoria"
            },

        },

        submitHandler: function (form) {
                var posizione = $("#posizione_approfondimento_modifica").val();
                var titolo = $("#titolo_approfondimento_modifica").val();
                var titolo_en = $("#titolo_en_approfondimento_modifica").val();
                var titolo_fr = $("#titolo_fr_approfondimento_modifica").val();
                var link = $("#link_approfondimento_modifica").val();
                var video = $("#video_approfondimento_modifica").val();
                var data = $("#data_approfondimento_modifica").val();
                tinyMCE.triggerSave();
                var descrizione = $("#descrizione_approfondimento_modifica").val();
                var descrizione_en = $("#descrizione_en_approfondimento_modifica").val();
                var descrizione_fr = $("#descrizione_fr_approfondimento_modifica").val();
                var descrizione_breve = $("#descrizione_breve_approfondimento_modifica").val();
                var descrizione_breve_en = $("#descrizione_breve_en_approfondimento_modifica").val();
                var descrizione_breve_fr = $("#descrizione_breve_fr_approfondimento_modifica").val();
                aggiornaApprofondimento(posizione, titolo, titolo_en, titolo_fr, link, video, data, descrizione_breve, descrizione_breve_en, descrizione_breve_fr, descrizione, descrizione_en, descrizione_fr);
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
    $(".appendi_lingue").html("");
    $("#posizione").val("");
    $("#titolo").val("");
    $("#titolo_en").val("");
    $("#titolo_fr").val("");
    $("#data").val("");
    $("#data_en").val("");
    $("#data_fr").val("");
    $("#sottotitolo").val("");
    $("#sottotitolo_en").val("");
    $("#sottotitolo_fr").val("");
    tinyMCE.get('descrizione').setContent("");
    tinyMCE.get('descrizione_en').setContent("");
    tinyMCE.get('descrizione_fr').setContent("");
    tinyMCE.get('descrizione_breve').setContent("");
    tinyMCE.get('descrizione_breve_en').setContent("");
    tinyMCE.get('descrizione_breve_fr').setContent("");
    $("#uploadFoto").hide();
    // Da togliere quando ci sarà la parte social e si può scegliere se checcare il sito o i social
    localStorage.setItem("sito_check", 1);
  
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
    selezionoLingue();
});

$(document).on("pageshow", "#condividi", function () {
    // Seleziono i dati della tabella utente per creare la mia pagina condividi
    var foto = "<img class='circle avatar' src='http://simplyappweb.mvclienti.com/Account/fotoOperatori/" + localStorage.getItem("foto_utente") + "' rel='external' alt=''>";
    $(".appendi_foto_utente_nome").html("");
    $(".appendi_foto_utente_nome").append(foto);
    caricoConfigurazioniSocial();   
});

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
    $(".appendi_lingue").html("");
    $(".appendi_titolo_modifica").append(titolo);
    selezionoArgomentoModifica();
    selezionoLingue();
    
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
    $(".appendi_immmagine_modifica_singola").html("");

});

$(document).on("pageshow", "#modifica_foto_gallery", function () {
    $("#uploadFotoSingolaModificaGallery").hide();
    var foto = "<img class='circle avatar' src='http://simplyappweb.mvclienti.com/Account/fotoOperatori/" + localStorage.getItem("foto_utente") + "' rel='external' alt=''>";
    $(".appendi_foto_utente_nome").html("");
    $(".appendi_foto_utente_nome").append(foto);
    selezionoDatiSingolaFotoGallery();
});

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
function caricaSulSitoArgomento(posizione, titolo, titolo_en, titolo_fr, data, data_en, data_fr, sottotitolo, sottotitolo_en, sottotitolo_fr, descrizione_breve, descrizione_breve_en, descrizione_breve_fr, descrizione, descrizione_en, descrizione_fr) {
    var tipo_argomento = localStorage.getItem('argomento');
    $.ajax({
        type: "POST",
        data: '{posizione:"' + posizione + '", titolo:"' + titolo + '", titolo_en:"' + titolo_en + '", titolo_fr:"' + titolo_fr + '",data:"' + data + '", data_en:"' + data_en + '",data_fr:"' + data_fr + '",sottotitolo:"' + sottotitolo + '",sottotitolo_en:"' + sottotitolo_en + '",sottotitolo_fr:"' + sottotitolo_fr + '",descrizione_breve:"' + descrizione_breve + '", descrizione_breve_en:"' + descrizione_breve_en + '",descrizione_breve_fr:"' + descrizione_breve_fr + '",descrizione:"' + descrizione + '",descrizione_en:"' + descrizione_en + '",descrizione_fr:"' + descrizione_fr + '",ID_utente:"' + localStorage.getItem("ID_utente") + '", user:"' + localStorage.getItem("username") + '", argomento:"' + localStorage.getItem('argomento') + '"}',
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
        error: function (xhr, textStatus, error) {
            alert(xhr.statusText);
            alert(textStatus);
            alert(error);
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
    tx.executeSql("CREATE TABLE IF NOT EXISTS utenti (id INTEGER PRIMARY KEY AUTOINCREMENT,identificativo INTEGER, social INTEGER, sito INTEGER, news INTEGER, promo INTEGER, eventi INTEGER, gallery INTEGER, prodotti INTEGER, servizi INTEGER, realizzazioni INTEGER, serviziCat INTEGER, certificazioni INTEGER, appartamenti INTEGER, prenotazioni INTEGER, approfondimenti INTEGER)");
    tx.executeSql("DROP TABLE IF EXISTS configurazione_utente");
    tx.executeSql("CREATE TABLE IF NOT EXISTS configurazione_utente (id INTEGER PRIMARY KEY AUTOINCREMENT,piattaforma, apiKey, apiSecret, nome_pagina_social, nome_sito, nome_script, ID_utente INTEGER)");
    tx.executeSql("DROP TABLE IF EXISTS media");
    tx.executeSql("CREATE TABLE IF NOT EXISTS media (id INTEGER PRIMARY KEY AUTOINCREMENT,nome_file, ID_user, tipo)");
    tx.executeSql("DROP TABLE IF EXISTS categorie_gallery");
    tx.executeSql("CREATE TABLE IF NOT EXISTS categorie_gallery (id INTEGER PRIMARY KEY AUTOINCREMENT,identificativo INTEGER, nome, user)");
    tx.executeSql("DROP TABLE IF EXISTS categorie_prodotti");
    tx.executeSql("CREATE TABLE IF NOT EXISTS categorie_prodotti (id INTEGER PRIMARY KEY AUTOINCREMENT,identificativo INTEGER, nome_categoria, user)");
    tx.executeSql("DROP TABLE IF EXISTS categorie_realizzazioni");
    tx.executeSql("CREATE TABLE IF NOT EXISTS categorie_realizzazioni (id INTEGER PRIMARY KEY AUTOINCREMENT,identificativo INTEGER, nome_categoria, user)");
    tx.executeSql("DROP TABLE IF EXISTS categorie_servizi");
    tx.executeSql("CREATE TABLE IF NOT EXISTS categorie_servizi (id INTEGER PRIMARY KEY AUTOINCREMENT,identificativo INTEGER, nome_categoria, user)");
    tx.executeSql("DROP TABLE IF EXISTS categorie_approfondimenti");
    tx.executeSql("CREATE TABLE IF NOT EXISTS categorie_approfondimenti (id INTEGER PRIMARY KEY AUTOINCREMENT,identificativo INTEGER, nome_categoria, user)");
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
            localStorage.setItem('social', utente.checkConfigurazione);
            localStorage.setItem('social_due', utente.checkSocial);
           
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {
                   
                    tx.executeSql("INSERT INTO utenti (identificativo,social,sito,news,promo,eventi,gallery,prodotti,servizi,realizzazioni,serviziCat,certificazioni,appartamenti,prenotazioni,approfondimenti) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [utente.ID, utente.checkSocial, utente.checkSito, utente.checkNews, utente.checkPromo, utente.checkEventi, utente.checkGallery, utente.checkProdotti, utente.checkServizi, utente.checkRealizzazioni, utente.checkServiziCat, utente.checkCertificazioni, utente.checkAppartamenti, utente.checkPrenotazioni, utente.checkApprofondimenti]);
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
   
    var siSociale = localStorage.getItem("social_due");
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
       
    } else {
        selezioneDatiTabellaUtente();
    }
}

// FINE [Carico configurazioni social]

// INIZIO [Carico categorie gallery]
function caricoCategorieGallery() {
    // Carico nella tabella categorie_gallery
   
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/categorie_gallery.aspx?id_utente=" + localStorage.getItem("ID_utente") + "", function (dati) {
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

function selezionoDati(tx) {

    // Serve per contare se almeno c'è uno tra news/promo/eventi/gallery/ per poi append html
    var count = 0;
    var siSociale = localStorage.getItem("social_due");

    if (siSociale == 1) {
        alert("ok");
        tx.executeSql("SELECT u.identificativo, u.social, u.sito, u.news, u.eventi, u.promo, u.gallery, u.prodotti, u.servizi, u.realizzazioni, u.serviziCat, u.certificazioni, u.appartamenti, u.prenotazioni, cu.piattaforma, cu.ID_utente FROM utenti as u, configurazione_utente as cu WHERE u.identificativo = cu.ID_utente AND u.Identificativo=" + localStorage.getItem('ID_utente') + "", [],
         function (tx, dati) {
             var len = dati.rows.length;

             var checkBox = "";
             var checkBoxSocial = "";

             var tab_argomenti = "<div  class='controls'><label class='lbl_tasti'>Argomento:</label><br>";
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

                 if (dati.rows.item(0).prodotti == 1) {
                     tab_argomenti += " <button onclick='clickProdotti()' class='filter' id='prodotti' >Prodotti</button>"
                     count++;

                 }
                 if (dati.rows.item(0).servizi == 1) {
                     tab_argomenti += " <button onclick='clickServizi()' class='filter' id='servizi' >Servizi</button>"
                     count++;

                 }
                 if (dati.rows.item(0).realizzazioni == 1) {
                     tab_argomenti += " <button onclick='clickRealizzazioni()' class='filter' id='realizzazioni' >Realizzazioni</button>"
                     count++;

                 }
                 if (dati.rows.item(0).serviziCat == 1) {
                     tab_argomenti += " <button onclick='clickServiziCat()' class='filter' id='realizzazioni' >Servizi</button>"
                     count++;

                 }
                 if (dati.rows.item(0).certificazioni == 1) {
                     tab_argomenti += " <button onclick='clickCertificazioni()' class='filter' id='realizzazioni' >Certificazioni</button>"
                     count++;

                 }
                 if (dati.rows.item(0).appartamenti == 1) {
                     tab_argomenti += " <button onclick='clickAppartamenti()' class='filter' id='realizzazioni' >Appartamenti</button>"
                     count++;

                 }
                 if (dati.rows.item(0).prenotazioni == 1) {
                     tab_argomenti += " <button onclick='clickPrenotazioni()' class='filter' id='realizzazioni' >Prenotazioni</button>"
                     count++;

                 }
                 if (dati.rows.item(0).approfondimenti == 1) {
                     tab_argomenti += " <button onclick='clickApprofondimenti()' class='filter' id='realizzazioni' >Approfondimenti</button>"
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
                 for (var i = 0; i < len; i++) {
                     checkBoxSocial += "<div><input style='float:left !important;' data-role='none' type='checkbox' name='" + dati.rows.item(i).piattaforma + "' id='" + dati.rows.item(i).piattaforma + "'  value='html' />  <label for='" + dati.rows.item(i).piattaforma + "'>" + dati.rows.item(i).piattaforma + "</label></div>"

                 }



             }
             if (count > 0) {
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
             var tab_argomenti = "<div  class='controls'><label class='lbl_tasti'>Argomento:</label><br>";
             if (len != 0) {

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
                 if (dati.rows.item(0).prodotti == 1) {
                     tab_argomenti += " <button onclick='clickProdotti()' class='filter' id='prodotti' >Prodotti</button>"
                     count++;

                 }
                 if (dati.rows.item(0).servizi == 1) {
                     tab_argomenti += " <button onclick='clickServizi()' class='filter' id='servizi' >Servizi</button>"
                     count++;

                 }
                 if (dati.rows.item(0).realizzazioni == 1) {
                     tab_argomenti += " <button onclick='clickRealizzazioni()' class='filter' id='realizzazioni' >Realizzazioni</button>"
                     count++;

                 }

                 if (dati.rows.item(0).sito == 1) {
                     checkBox += "<input data-role='none' type='checkbox' name='sito' id='sito' checked value='html' />  <label for='privacyMv'>Sito</label>"


                 }
                 if (dati.rows.item(0).serviziCat == 1) {
                     tab_argomenti += " <button onclick='clickServiziCat()' class='filter' id='servizi_cat' >Servizi</button>"
                     count++;

                 }
                 if (dati.rows.item(0).certificazioni == 1) {
                     tab_argomenti += " <button onclick='clickCertificazioni()' class='filter' id='certificazioni' >Certificazioni</button>"
                     count++;

                 }
                 if (dati.rows.item(0).appartamenti == 1) {
                     tab_argomenti += " <button onclick='clickAppartamenti()' class='filter' id='appartamenti' >Appartamenti</button>"
                     count++;

                 }
                 if (dati.rows.item(0).prenotazioni == 1) {
                     tab_argomenti += " <button onclick='clickPrenotazioni()' class='filter' id='prenotazioni' >Prenotazioni</button>"
                     count++;

                 }
                 if (dati.rows.item(0).approfondimenti == 1) {
                     tab_argomenti += " <button onclick='clickApprofondimenti()' class='filter' id='approfondimenti' >Approfondimenti</button>"
                     count++;

                 }
                 if (count > 0) {
                     $(".appendi_argomenti").append(tab_argomenti);
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
           
            var tab_categorie = "<div  class='controls'><label class='lbl_tasti'>Categorie:</label><br>";
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

function clickProdotti() {
    localStorage.setItem('argomento', 'Prodotti');
    $("#prodotti").addClass("active");
    $.mobile.pageContainer.pagecontainer("change", "#prodotti", {
        transition: 'flip',
    });

}

function clickRealizzazioni() {
    localStorage.setItem('argomento', 'Realizzazioni');
  
    $.mobile.pageContainer.pagecontainer("change", "#realizzazioni", {
        transition: 'flip',
    });

}

function clickServiziCat() {
    localStorage.setItem('argomento', 'ServiziCat');
  
    $.mobile.pageContainer.pagecontainer("change", "#serviziCat", {
        transition: 'flip',
    });

}

function clickServizi() {
    localStorage.setItem('argomento', 'Servizi');
    $("#prodotti").addClass("active");
    $.mobile.pageContainer.pagecontainer("change", "#servizi", {
        transition: 'flip',
    });

}

function clickPrenotazioni() {
   
    $.mobile.pageContainer.pagecontainer("change", "#prenotazioni", {
        transition: 'flip',
    });

}

function clickApprofondimenti() {

    $.mobile.pageContainer.pagecontainer("change", "#approfondimenti", {
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
        alert(localStorage.getItem("sito_check"));
       
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

function selezionoLingue() {
    // Faccio la selezione dal server delle new di questo utente

    $.getJSON("http://simplyappweb.mvclienti.com/webservices/get_lingue.aspx?id_utente=" + localStorage.getItem("ID_utente") + "", function (dati) {
        var id_selezionato = "";
        var tab_categorie = "<div  class='controls'><label class='lbl_tasti'>Lingue:</label><br>";
        $.each(dati, function (i, categorie) {
            // Inserisco dati nel db sqllite dell' App
            tab_categorie += "<button style='margin-bottom:10px; margin-top:15px;' onclick='italianoVisibile()' class='filter active linguaItaliano' >IT</button>"
            if (categorie.checkLinguaInglese == 1)
            {
                tab_categorie += "<button style='margin-bottom:10px; margin-top:15px; margin-left:10px;' onclick='ingleseVisibile()' class='filter linguaInglese'  >EN</button>"
            }
            if (categorie.checkLinguaFrancese == 1) {
                tab_categorie += "<button style='margin-bottom:10px; margin-top:15px; margin-left:10px;' onclick='franceseVisibile()' class='filter linguaFrancese'  >FR</button>"
            }
         
        });
        tab_categorie += "</div>";
        $(".appendi_lingue").append(tab_categorie);
        // Qua seleziono i dati della singola foto con una funzione

    });
}

function franceseVisibile() {
   
    $(".francese").removeClass("display_none");
    $(".inglese").removeClass("display_none");
    $(".italiano").removeClass("display_none");
    $(".inglese").addClass("display_none");
    $(".italiano").addClass("display_none");
    $(".linguaItaliano").removeClass("active");
    $(".linguaInglese").removeClass("active");
    $(".linguaFrancese").addClass("active");
}

function ingleseVisibile() {
    $(".francese").removeClass("display_none");
    $(".inglese").removeClass("display_none");
    $(".italiano").removeClass("display_none");
    $(".francese").addClass("display_none");
    $(".italiano").addClass("display_none");
    $(".linguaItaliano").removeClass("active");
    $(".linguaInglese").addClass("active");
    $(".linguaFrancese").removeClass("active");
}

function italianoVisibile() {
    $(".francese").removeClass("display_none");
    $(".inglese").removeClass("display_none");
    $(".italiano").removeClass("display_none");
    $(".francese").addClass("display_none");
    $(".inglese").addClass("display_none");
    $(".linguaItaliano").addClass("active");
    $(".linguaInglese").removeClass("active");
    $(".linguaFrancese").removeClass("active");
}

function caricaCategoriaGallerySito(titolo_gallery)
{
   
    $.ajax({
        type: "POST",
        data: '{nome:"' + titolo_gallery + '", user: "' + localStorage.getItem('username') + '", ID_utente: "' + localStorage.getItem('ID_utente') + '"}',
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

function chiudiMenu ()
{
    
    $('#slide-out').css('right', '-250px');
    $('body').css('overflow', '');
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
      
       

         var tab_argomenti = "<div  class='controls'><label class='lbl_tasti'>Argomento:</label><br>";
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
             if (dati.rows.item(0).prodotti == 1) {
                 tab_argomenti += " <button onclick='clickProdottiStorico()' class='filter' id='prodottiStorico' >Prodotti</button>"
                 count++;

             }
             if (dati.rows.item(0).servizi == 1) {
                 tab_argomenti += " <button onclick='clickServiziStorico()' class='filter' id='serviziStorico' >Servizi</button>"
                 count++;

             }
             if (dati.rows.item(0).realizzazioni == 1) {
                 tab_argomenti += " <button onclick='clickRealizzazioniStorico()' class='filter' id='realizzazioniStorico' >Realizzazioni</button>"
                 count++;

             }
             if (dati.rows.item(0).serviziCat == 1) {
                 tab_argomenti += " <button onclick='clickServiziCatStorico()' class='filter' id='serviziCatStorico' >Servizi</button>"
                 count++;

             }
             if (dati.rows.item(0).certificazioni == 1) {
                 tab_argomenti += " <button onclick='clickCertificazioniStorico()' class='filter' id='certificazioniStorico' >Certificazioni</button>"
                 count++;

             }
             if (dati.rows.item(0).appartamenti == 1) {
                 tab_argomenti += " <button onclick='clickAppartamentiStorico()' class='filter' id='appartamentiStorico' >Appartamenti</button>"
                 count++;

             }
             if (dati.rows.item(0).prenotazioni == 1) {
                 tab_argomenti += " <button onclick='clickPrenotazioniStorico()' class='filter' id='prenotazioniStorico' >Prenotazioni</button>"
                 count++;

             }
             if (dati.rows.item(0).approfondimenti == 1) {
                 tab_argomenti += " <button onclick='clickApprofondimentiStorico()' class='filter' id='approfondimentiStorico' >Approfondimenti</button>"
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
            blocco_news += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
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
        data: '{ID:"' + ID_news + '", ID_utente:"' + localStorage.getItem("ID_utente") + '"}',
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
            blocco_eventi += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
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
        data: '{ID:"' + ID_evento + '", ID_utente:"' + localStorage.getItem("ID_utente") + '"}',
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
            blocco_promo += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
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
        data: '{ID:"' + ID_promo + '", ID_utente:"' + localStorage.getItem("ID_utente") + '"}',
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
   
   
    var id_argomento = localStorage.getItem("id_modifica_argomento");
    var argomento = localStorage.getItem("nome_argomento_modifica");
    var ID = localStorage.getItem("ID_utente");
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/seleziono_argomento.aspx?id_argomento=" + id_argomento + "&argomento=" + argomento + "&ID_utente=" + ID + "", function (dati) {
       // var blocco_news = "";
        var lunghezza = dati.length;
        $.each(dati, function (i, argomento) {
            tinyMCE.triggerSave();
            $("#posizione_lbl").addClass("active");
            $("#posizione_modifica").val(argomento.posizione);
            $("#titolo_lbl").addClass("active");
            $("#titolo_modifica").val(argomento.titolo);
            $("#titolo_en_lbl").addClass("active");
            $("#titolo_en_modifica").val(argomento.titolo_en);
            $("#titolo_fr_lbl").addClass("active");
            $("#titolo_fr_modifica").val(argomento.titolo_fr);
            $("#data_lbl").addClass("active");
            $("#data_modifica").val(argomento.data);
            $("#data_en_lbl").addClass("active");
            $("#data_en_modifica").val(argomento.data_en);
            $("#data_fr_lbl").addClass("active");
            $("#data_fr_modifica").val(argomento.data_fr);
            $("#sottotitolo_lbl").addClass("active");
            $("#sottotitolo_modifica").val(argomento.sottotitolo);
            $("#sottotitolo_en_lbl").addClass("active");
            $("#sottotitolo_en_modifica").val(argomento.sottotitolo_en);
            $("#sottotitolo_fr_lbl").addClass("active");
            $("#sottotitolo_fr_modifica").val(argomento.sottotitolo_fr);
            tinyMCE.get('descrizione_breve_modifica').setContent(argomento.descrizione_breve);
            tinyMCE.get('descrizione_breve_en_modifica').setContent(argomento.descrizione_breve_en);
            tinyMCE.get('descrizione_breve_fr_modifica').setContent(argomento.descrizione_breve_fr);
            tinyMCE.get('descrizione_modifica').setContent(argomento.descrizione);
            tinyMCE.get('descrizione_en_modifica').setContent(argomento.descrizione_en);
            tinyMCE.get('descrizione_fr_modifica').setContent(argomento.descrizione_fr);
        });
        selezionoMediaArgomento();
    });
    // Qua faccio funzione seleziono media dell' argomento
   
 
}

function selezionoMediaArgomento() {
  
    var id_argomento = localStorage.getItem("id_modifica_argomento");
    var argomento = localStorage.getItem("nome_argomento_modifica");
    var ID = localStorage.getItem("ID_utente");
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/seleziono_media_argomento.aspx?id_argomento=" + id_argomento + "&argomento=" + argomento + "&ID_utente=" + ID + "", function (dati) {
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
        data: '{ID:"' + ID + '",ID_utente: "' + localStorage.getItem('ID_utente') + '",argomento: "' + localStorage.getItem('nome_argomento_modifica') + '"}',
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

function aggiornaArgomento(titolo, titolo_en, titolo_fr, data, data_en, data_fr, sottotitolo, sottotitolo_en, sottotitolo_fr, descrizione_breve, descrizione_breve_en, descrizione_breve_fr, descrizione, descrizione_en, descrizione_fr)
{
  
    var tipo_argomento = localStorage.getItem('nome_argomento_modifica');
    $.ajax({
        type: "POST",
        data: '{titolo:"' + titolo + '",titolo_en:"' + titolo_en + '",titolo_fr:"' + titolo_fr + '",data:"' + data + '",data_en:"' + data_en + '",data_fr:"' + data_fr + '",sottotitolo:"' + sottotitolo + '",sottotitolo_en:"' + sottotitolo_en + '",sottotitolo_fr:"' + sottotitolo_fr + '",descrizione_breve:"' + descrizione_breve + '",descrizione_breve_en:"' + descrizione_breve_en + '",descrizione_breve_fr:"' + descrizione_breve_fr + '",descrizione:"' + descrizione + '",descrizione_en:"' + descrizione_en + '",descrizione_fr:"' + descrizione_fr + '", ID_argomento:"' + localStorage.getItem("id_modifica_argomento") + '", ID_utente:"' + localStorage.getItem("ID_utente") + '", argomento:"' + localStorage.getItem('nome_argomento_modifica') + '"}',
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

function clickProdottiStorico() {
    
    $.mobile.pageContainer.pagecontainer("change", "#storicoProdotti", {
        transition: 'flip',
    });
}

function clickRealizzazioniStorico() {

    $.mobile.pageContainer.pagecontainer("change", "#storicoRealizzazioni", {
        transition: 'flip',
    });
}

function clickPrenotazioniStorico() {

    $.mobile.pageContainer.pagecontainer("change", "#prenotazioni", {
        transition: 'flip',
    });
}

function clickApprofondimentiStorico() {

    $.mobile.pageContainer.pagecontainer("change", "#storicoApprofondimenti", {
        transition: 'flip',
    });
}

function clickServiziStorico() {

    $.mobile.pageContainer.pagecontainer("change", "#storicoServizi", {
        transition: 'flip',
    });
}

function clickServiziCatStorico() {

    $.mobile.pageContainer.pagecontainer("change", "#storicoServiziCat", {
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
            blocco_gallery += "<div class='modal-content'><h4>No Foto </h4><p>Non vi sono foto nella Gallery!!</p></div>";
            blocco_gallery += "<div class='modal-footer'> <a href='#dashboard' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#no_foto_gallery").html("");
            $("#no_foto_gallery").append(blocco_gallery);
            $("#apri_no_foto_gallery").click();
            $("#no_fixed_footer_modifica_gallery").hide();
            $("#si_fixed_footer_modifica_gallery").show();

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
        data: '{ID:"' + ID_gallery + '", ID_utente:"' + localStorage.getItem("ID_utente") + '"}',
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
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/categorie_gallery.aspx?id_utente=" + localStorage.getItem("ID_utente") + "&ID_foto="+ localStorage.getItem("ID_foto_singola_gallery")+"", function (dati) {
        var id_selezionato = "";
        var tab_categorie = "<div  class='controls'><label class='lbl_tasti'>Categorie:</label><br>";
        var foto = "";
        var count = 0
        var blocco_foto = "";
        $.each(dati, function (i, categorie) {
           
            // Inserisco dati nel db sqllite dell' App
            if (nome_categoria == categorie.nome)
            {
               
                tab_categorie += "<button style='margin-bottom:10px; margin-top:15px' onclick='clickCategoriaModifica(\"" + categorie.ID + "\")' class='filter active' id='tab" + categorie.ID + "' >" + categorie.nome + "</button>"
                localStorage.setItem('id_selezionato', categorie.ID);
              
            } else {
              
                tab_categorie += "<button style='margin-bottom:10px; margin-top:15px' onclick='clickCategoriaModifica(\"" + categorie.ID + "\")' class='filter' id='tab" + categorie.ID + "' >" + categorie.nome + "</button>"
            }
            if (count == 0)
            {
               
                count++;
                blocco_foto += "<div  class='grid-item gallery-item-card'><div class='box_height_img'> <img src='http://simplyappweb.mvclienti.com/Account/Uploads/Gallery/galleria_img/immagini/" + categorie.immagine + "' rel='external' alt='image'/></div></div>";
            }
           
        });
        tab_categorie += "</div>";
        
       
        
        $(".appendi_immmagine_modifica_singola").append(blocco_foto);
        $(".appendi_categorie_modifica").append(tab_categorie);
        // Qua seleziono i dati della singola foto con una funzione
        selectDatiSingolaFoto();
    });
}

function clickCategoriaModifica(ID_categoria) {
    // LocalStorage per il salvataggio ID_categoria della singola foto
    localStorage.setItem('id_categoria_gallery_modifica_singola_foto', ID_categoria);
    id_selezionato = localStorage.getItem('id_selezionato');
    $("#tab" + id_selezionato + "").removeClass("active", "");
    $("#tab" + ID_categoria + "").addClass("active");
    localStorage.setItem('id_selezionato', ID_categoria);
   

}

function selectDatiSingolaFoto ()
{
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/seleziono_dati_foto_gallery.aspx?id_gallery=" + localStorage.getItem("ID_foto_singola_gallery") + "&ID_utente=" + localStorage.getItem("ID_utente") + "", function (dati) {
        var id_selezionato = "";
        var tab_stato = "<div  class='controls'><label class='lbl_tasti'>Categorie:</label><br>";
        var blocco_img = "";
        $.each(dati, function (i, foto) {
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
      
    });
}

function clickStatoAttivoMod()
{
   
    $("#stato_attivo").addClass("active");
    $("#stato_non_attivo").removeClass("active");
    // LocalStorage per il salvataggio dello stato della singola foto
    localStorage.setItem("stato_singola_foto", "Attivo");
   
}
                      
function clickStatoNoAttivoMod()
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
        data: '{titolo_img:"' + titolo_img + '",stato:"' + stato + '",ID_categoria:"' + ID_categoria + '", ID:"' + localStorage.getItem('ID_foto_singola_gallery') + '", ID_utente:"' + localStorage.getItem('ID_utente') + '"}',
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
        var tab_categorie = "<div  class='controls'><label class='lbl_tasti'>Filtri:</label><br>";
        $.each(dati, function (i, categorie) {
            // Inserisco dati nel db sqllite dell' App
            tab_categorie += "<button style='margin-bottom:10px; margin-top:15px' onclick='clickFiltroPerCategoria(\"" + categorie.ID + "\")' class='filter' id='cat" + categorie.ID + "' >" + categorie.nome + "</button>"
        });
        tab_categorie += "</div>";
        $(".appendi_categorie_filtri").append(tab_categorie);
        // Qua seleziono i dati della singola foto con una funzione
        
    });
}

function clickFiltroPerCategoria(ID_categoria)
{
    
    $("#cat" + ID_categoria + "").addClass("active");
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

            blocco_eventi += "<div class='blog-preview p-20'><p>" + argomenti_filtrati.descrizione_breve + "</p><div class='btn_storico'><a href='#' onclick='modifica(\"" + argomenti_filtrati.ID + "\",\"" + argomento_giusto + "\");' class='waves-effect waves-light btn primary-color'><span class='ion-edit'></span></a><a href='#' onclick='cancella"+argomento_giusto+"(\"" + argomenti_filtrati.ID + "\");' class='waves-effect waves-light btn primary-color'><span class='ion-close-circled'></span></a></div></div></div>";
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


// INIZIO PRODOTTI

$(document).on("pagebeforeshow", "#prodotti", function () {
    localStorage.setItem("categoria_prodotto", "");
    $(".appendi_categorie_prodotti").html("");
    $(".appendi_immagini_categoria").html("");
    $(".append_categoria_aggiunta_prodotto").html("");
    $(".appendi_lingue").html("");
    $("#titolo_gallery").val("");
    $("#uploadFotoProdotto").hide();
    var stato_flip = $("#flip-aggiungi-categoria-prodotti").prop("checked");
    if (stato_flip == true) {
        $("#flip-aggiungi-categoria-prodotti").prop("checked", false);
        $(".ui-flipswitch").removeClass("ui-flipswitch-active");
    }
    //Cancello le foto rimaste nella tabella media del cellulare caricate in precedenza
    db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
    db.transaction(
        // Metodo di chiamata asincrona
        function (tx) {
            tx.executeSql("DELETE FROM categorie_prodotti", []);
        },
        function () {
            // alert("Non è stato possibile cancellare la notizia. Riprova");

        },
        function () {
            // alert("Cancellazione effettua");
        }
    )
    selezionoLingue();
});

$(document).on("pageshow", "#prodotti", function () {
    // Seleziono i dati delle categorie della gallery
    var foto = "<img class='circle avatar' src='http://simplyappweb.mvclienti.com/Account/fotoOperatori/" + localStorage.getItem("foto_utente") + "' rel='external' alt=''>";
    $(".appendi_foto_utente_nome").html("");
    $(".appendi_foto_utente_nome").append(foto);
    $("#footer_gallery").addClass("footer_home");
    caricoCategorieProdotti();
});

$(document).on("pagebeforeshow", "#storicoProdotti", function () {
    // Ripulisco la pagina dalle parti dinamiche
    $("#si_fixed_footer_prodotti").show();
    $("#no_fixed_footer_prodotti").hide();
    $("#stato_attivo_filtro").removeClass("active");
    $("#stato_non_attivo_filtro").removeClass("active");
    $("#ricerca").val("");
    $(".appendi_categorie_prodotti_filtri").html("");
    $(".appendi_prodotti").html("");
    localStorage.setItem("id_precedente", "");
    localStorage.setItem("argomento_filtri", "prodotti");
    selezionoCategoriePerFiltriProdotti();

});

$(document).on("pageshow", "#storicoProdotti", function () {
    // Seleziono i dati delle categorie della gallery
    var foto = "<img class='circle avatar' src='http://simplyappweb.mvclienti.com/Account/fotoOperatori/" + localStorage.getItem("foto_utente") + "' rel='external' alt=''>";
    $(".appendi_foto_utente_nome").html("");
    $(".appendi_foto_utente_nome").append(foto);
    recuperaProdotti();
});

$(document).on("pagebeforeshow", "#modifica_prodotto", function () {
    var foto = "<img class='circle avatar' src='http://simplyappweb.mvclienti.com/Account/fotoOperatori/" + localStorage.getItem("foto_utente") + "' rel='external' alt=''>";
    $(".appendi_foto_utente_nome").html("");
    $(".appendi_foto_utente_nome").append(foto);
    var titolo = "<h1>Modifica " + localStorage.getItem("nome_argomento_modifica") + "</h1>";
    $(".appendi_categorie_prodotti_modifica").html("");
    $(".appendi_img_modifica_prodotto").html("");
    $(".appendi_lingue").html("");
    selezionoLingue();
    selezionoCategorieSingoloProdotto();
    selezionoProdottoModifica();

});

function caricoCategorieProdotti() {
    // Carico nella tabella categorie_gallery
   
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/categorie_prodotti.aspx?id_utente=" + localStorage.getItem("ID_utente") + "", function (dati) {
        var li_dati = "";

        $.each(dati, function (i, categoria) {
            // Inserisco dati nel db sqllite dell' App

            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {

                    tx.executeSql("INSERT INTO categorie_prodotti (identificativo,nome_categoria,user) VALUES (?,?,?)", [categoria.ID, categoria.nome_categoria, categoria.user]);
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
        selezioneCategorieProdotti();
    });
}

function selezioneCategorieProdotti() {

    db.transaction(selezionoCatProdotti);
}

function selezionoCatProdotti(tx) {

    // Selezione le categorie aggiornate nella tabella categoria_gallery del telefono
    tx.executeSql("SELECT * FROM categorie_prodotti", [],
        function (tx, dati) {
            var len = dati.rows.length;
          
            var tab_categorie = "<div  class='controls'><label class='lbl_tasti'>Categorie:</label><br>";
            if (len != 0) {
                /* Qua compongo grafica tab categorie */
                for (var i = 0; i < len; i++) {
                    //  alert("ciclo");
                    tab_categorie += " <button style='margin-bottom:10px; margin-top:15px' onclick='clickCategoriaProdotto(\"" + dati.rows.item(i).identificativo + "\")' class='filter' id='" + dati.rows.item(i).identificativo + "' >" + dati.rows.item(i).nome_categoria + "</button>"

                }

                tab_categorie += "</div>";

            }
            $(".appendi_categorie_prodotti").append(tab_categorie);
        },
        function () {
            alert("Errore" + e.message);
        })

    // Qua faccio due selezioni se è ceccato social o se non è ceccato social


}

function clickCategoriaProdotto(categoria) {
   
    localStorage.setItem('categoria_prodotto', categoria);
    $("#" + categoria + "").addClass("active");
   
}

$("#flip-aggiungi-categoria-prodotti").bind("change", function (event, ui) {
    localStorage.setItem('argomento', 'prodotti');
    $.mobile.pageContainer.pagecontainer("change", "#categorie", {
        transition: 'flip',
    });

});

function caricaCategoriaProdottoSito(nome_categoria_prodotto, posizione_cat_prodotto) {
    
    $.ajax({
        type: "POST",
        data: '{nome:"' + nome_categoria_prodotto + '", posizione: "' + posizione_cat_prodotto + '", user: "' + localStorage.getItem('username') + '", ID_utente: "' + localStorage.getItem('ID_utente') + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/servizi_app.aspx/inseriscoCategoriaProdotti',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;
           
            localStorage.setItem("categoria_prodotti", ritorno);
            var categoria_aggiunta = "<div  class='controls'><label>Categorie Aggiunta:</label>";
            categoria_aggiunta += "<button style='margin-bottom:10px; margin-top:15px' class='filter active' id='" + ritorno + "' >" + nome_categoria_prodotto + "</button>"
            $(".append_categoria_aggiunta_prodotto").append(categoria_aggiunta);
            localStorage.setItem("categoria_prodotto", ritorno);
            $("#addCategoriaProdotti").toggle();
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

function caricaSulSitoProdotto(posizione, nome, nome_en, nome_fr, prezzo, prezzo_scontato, descrizione_breve, descrizione_breve_en, descrizione_breve_fr, descrizione, descrizione_en, descrizione_fr) {
   
   
    $.ajax({
        type: "POST",
        data: '{posizione:"' + posizione + '",nome:"' + nome + '", nome_en:"' + nome_en + '", nome_fr:"' + nome_fr + '", prezzo:"' + prezzo + '", prezzo_scontato:"' + prezzo_scontato + '", ID_categoria:"' + localStorage.getItem('categoria_prodotto') + '", descrizione_breve:"' + descrizione_breve + '", descrizione_breve_en:"' + descrizione_breve_en + '", descrizione_breve_fr:"' + descrizione_breve_fr + '", descrizione:"' + descrizione + '", descrizione_en:"' + descrizione_en + '", descrizione_fr:"' + descrizione_fr + '",ID_utente:"' + localStorage.getItem("ID_utente") + '", user:"' + localStorage.getItem("username") + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/carica_argomento_app.aspx/caricaProdotto',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;

            if (ritorno == "Si") {
                var siCaricamento = "<div class='modal-content'><h4>Prodotto Caricato </h4><p>Prodotto Caricato con successo</p></div>";
                siCaricamento += "<div class='modal-footer'> <a href='#storicoProdotti'  class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_caricamento_prodotto").html("");
                $("#box_caricamento_prodotto").append(siCaricamento);
                $("#apri_box_caricamento_prodotto").click();
            } else {
                var noCaricamento = "<div class='modal-content'><h4>Argomento non caricato </h4><p>Prodotto non caricato.<br>Si prega di riprovare </p></div>";
                noCaricamento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_caricamento_prodotto").html("");
                $("#box_caricamento_prodotto").append(noCaricamento);
                $("#apri_box_caricamento_prodotto").click();
            }

        },
        error: function (e) {

        }
    });
}

function recuperaProdotti ()
{
    $(".appendi_prodotti").html("");
    // Faccio la selezione dal server delle new di questo utente
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/storico_prodotti.aspx?id_utente=" + localStorage.getItem("ID_utente") + "", function (dati) {
        var blocco_prodotti = "";
        var lunghezza = dati.length;
        var Prodotti = "Prodotti";

        $.each(dati, function (i, prodotti) {

           
            blocco_prodotti += "<div class='blog-card animated fadein delay-1'><div class='blog-header'><div class='blog-author'><span class='titolo_storico'>" + prodotti.nome + "</span> <span class='small'>" + prodotti.nome_categoria + "</span></div></div>";

            blocco_prodotti += "<div class='blog-image'>  <img src='http://simplyappweb.mvclienti.com/Account/Uploads/Prodotti/galleria_img/immagini/" + prodotti.immagine + "' rel='external' alt=''/></div>";

            blocco_prodotti += "<div class='blog-preview p-20'><p>" + prodotti.descrizione_breve + "</p><div class='btn_storico'><a href='#' onclick='modificaProdotto(\"" + prodotti.ID + "\",\"" + prodotti.nome_categoria + "\");' class='waves-effect waves-light btn accent-color'><span class='ion-edit'></span></a><a href='#' onclick='cancellaProdotto(\"" + prodotti.ID + "\");' class='waves-effect waves-light btn accent-color'><span class='ion-close-circled'></span></a></div></div></div>";
        });
        if (lunghezza == 0) {
            blocco_prodotti += "<div class='modal-content'><h4>No Prodotti </h4><p>Non vi sono prodotti salvate!!</p></div>";
            blocco_prodotti += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#no_prodotti").html("");
            $("#no_prodotti").append(blocco_prodotti);
            $("#apri_no_prodotti").click();
        }

        if (lunghezza != 0) {
           
            $(".appendi_prodotti").append(blocco_prodotti);
            $("#si_fixed_footer_prodotti").hide();
            $("#no_fixed_footer_prodotti").show();
        }

    });
}

function cancellaProdotto(ID_prodotto) {
    $.ajax({
        type: "POST",
        data: '{ID:"' + ID_prodotto + '", ID_utente:"' + localStorage.getItem("ID_utente") + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/servizi_app.aspx/cancellaProdotto',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;
          
            if (ritorno == "si") {
                var siCancellaNews = "<div class='modal-content'><h4>Prodotto eliminato </h4><p>Prodotto eliminto con successo!!</p></div>";
                siCancellaNews += "<div class='modal-footer'> <a href='#' onclick='recuperaProdotti()' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_cancellazione_prodotto").html("");
                $("#box_cancellazione_prodotto").append(siCancellaNews);
                $("#apri_box_cancellazione_prodotto").click();
            } else {
                var noCancellaNews = "<div class='modal-content'><h4>Prodotto non eliminata </h4><p>Prodotto non eliminato!!<br>Si prega di riprovare. </p></div>";
                noCancellaNews += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_cancellazione_prodotto").html("");
                $("#box_cancellazione_prodotto").append(noCancellaNews);
                $("#apri_box_cancellazione_prodotto").click();
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
                           
$("#flip-storico-prodotti").bind("change", function (event, ui) {
    $("#filtri_prodotti").toggle();
    var stato_flip = $("#flip-storico-prodotti").prop("checked");
    if (stato_flip == true) {
      
    }
    if (stato_flip == false) {
       

    }

});

function selezionoCategoriePerFiltriProdotti() {
    // Faccio la selezione dal server delle new di questo utente

    $.getJSON("http://simplyappweb.mvclienti.com/webservices/categorie_prodotti.aspx?id_utente=" + localStorage.getItem("ID_utente") + "", function (dati) {
        var id_selezionato = "";
        var tab_categorie = "<div  class='controls'><label class='lbl_tasti'>Filtri per Categoria:</label><br>";
        $.each(dati, function (i, categorie) {
            // Inserisco dati nel db sqllite dell' App
            tab_categorie += "<button style='margin-bottom:10px; margin-top:15px' onclick='clickFiltroPerCategoriaProdotto(\"" + categorie.ID + "\")' class='filter' id='cat" + categorie.ID + "' >" + categorie.nome_categoria + "</button>"
        });
        tab_categorie += "</div>";
        $(".appendi_categorie_prodotti_filtri").append(tab_categorie);
        // Qua seleziono i dati della singola foto con una funzione

    });
}

function clickFiltroPerCategoriaProdotto(ID_categoria) {

    
    $("#cat" + ID_categoria + "").addClass("active");
    if (localStorage.getItem("id_precedente") != "") {
        $("#cat" + localStorage.getItem("id_precedente") + "").removeClass("active");
    }
    localStorage.setItem("id_precedente", ID_categoria);
    $(".appendi_prodotti").html("");
    // Applico filtri
    // Faccio la selezione dal server delle new di questo utente
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/storico_prodotti_filtri_categorie.aspx?id_utente=" + localStorage.getItem("ID_utente") + "&id_categoria=" + ID_categoria + "", function (dati) {
        var blocco_prodotti = "";
        var lunghezza = dati.length;
        var Prodotti = "Prodotti";
      
        $.each(dati, function (i, prodotti) {

            blocco_prodotti += "<div class='blog-card animated fadein delay-1'><div class='blog-header'><div class='blog-author'><span class='titolo_storico'>" + prodotti.nome + "</span> <span class='small'>" + prodotti.nome_categoria + "</span></div></div>";

            blocco_prodotti += "<div class='blog-image'>  <img src='http://simplyappweb.mvclienti.com/Account/Uploads/Prodotti/galleria_img/immagini/" + prodotti.immagine + "' rel='external' alt=''/></div>";

            blocco_prodotti += "<div class='blog-preview p-20'><p>" + prodotti.descrizione_breve + "</p><div class='btn_storico'><a href='#' onclick='modificaProdotto(\"" + prodotti.ID + "\",\"" + prodotti.nome_categoria + "\");' class='waves-effect waves-light btn accent-color'><span class='ion-edit'></span></a><a href='#' onclick='cancellaProdotto(\"" + prodotti.ID + "\");' class='waves-effect waves-light btn accent-color'><span class='ion-close-circled'></span></a></div></div></div>";
        

        });

        if (lunghezza == 0) {
            blocco_prodotti += "<div class='modal-content'><h4>No Prodotti </h4><p>Non vi sono prodotti per questa categoria!!</p></div>";
            blocco_prodotti += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#no_prodotti_cat").html("");
            $("#no_prodotti_cat").append(blocco_prodotti);
            $("#apri_no_prodotti_cat").click();
            $("#si_fixed_footer_prodotti").show();
            $("#no_fixed_footer_prodotti").hide();
        }

        if (lunghezza != 0) {

            $(".appendi_prodotti").append(blocco_prodotti);
            $("#si_fixed_footer_prodotti").hide();
            $("#no_fixed_footer_prodotti").show();
        }

        

    });
}

function filtraArgomentoProdotto(stato, tipo) {

  
    if (stato == "si" && tipo == "Attivo") {
        $("#stato_attivo_filtro_prodotti").addClass("active");
        $("#stato_non_attivo_filtro_prodotti").removeClass("active");
    }
    if (stato == "si" && tipo == "Non Attivo") {
        $("#stato_attivo_filtro_prodotti").removeClass("active");
        $("#stato_non_attivo_filtro_prodotti").addClass("active");
    }

    var argomento_giusto = "prodotti"
    var ricerca_valore = $("#ricerca_prodotto").val();
    if (ricerca_valore != "") {
        ricerca = ricerca_valore;
    } else {
        ricerca = "";
    }

    var argomento = localStorage.getItem("argomento_filtri");
  
    $(".appendi_prodotti").html("");
  
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/storico_prodotti_filtri.aspx?id_utente=" + localStorage.getItem("ID_utente") + "&stato=" + stato + "&ricerca=" + ricerca + "&tipo_argomento=" + argomento + "&tipo_stato=" + tipo + "", function (dati) {
        var blocco_prodotti = "";
        var lunghezza = dati.length;

     
        $.each(dati, function (i, argomenti_filtrati) {


            blocco_prodotti += "<div class='blog-card animated fadein delay-1'><div class='blog-header'><div class='blog-author'><span class='titolo_storico'>" + argomenti_filtrati.nome + "</span> <span class='small'>" + argomenti_filtrati.nome_categoria + "</span></div></div>";

            blocco_prodotti += "<div class='blog-image'>  <img src='http://simplyappweb.mvclienti.com/Account/Uploads/Prodotti/galleria_img/immagini/" + argomenti_filtrati.immagine + "' rel='external' alt=''/></div>";

            blocco_prodotti += "<div class='blog-preview p-20'><p>" + argomenti_filtrati.descrizione_breve + "</p><div class='btn_storico'><a href='#' onclick='modificaProdotto(\"" + argomenti_filtrati.ID + "\",\"" + argomenti_filtrati.nome_categoria + "\");' class='waves-effect waves-light btn primary-color'><span class='ion-edit'></span></a><a href='#' onclick='cancellaProdotto(\"" + argomenti_filtrati.ID + "\");' class='waves-effect waves-light btn primary-color'><span class='ion-close-circled'></span></a></div></div></div>";
        });
        if (lunghezza == 0) {
            blocco_prodotti += "<div class='modal-content'><h4>No " + localStorage.getItem("argomento_filtri") + " </h4><p>Nessun\a " + localStorage.getItem("argomento_filtri") + "  trovata dopo la ricerca!!</p></div>";
            blocco_prodotti += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#no_prodotti_cat").html("");
            $("#no_prodotti_cat").append(blocco_prodotti);
            $("#apri_no_prodotti_cat").click();
            $("#si_fixed_footer_prodotti").show();
            $("#no_fixed_footer_prodotti").hide();
        }

        if (lunghezza != 0) {
            $(".appendi_prodotti").append(blocco_prodotti);
            $("#si_fixed_footer_prodotti").hide();
            $("#no_fixed_footer_prodotti").show();
        }

    });

}

function modificaProdotto(ID, nome_categoria) {

    // Imposto il local storage per la modifica
    localStorage.setItem("nome_categoria_singolo_prodotto", nome_categoria);
    localStorage.setItem('id_modifica_argomento', ID);
   
    $.mobile.pageContainer.pagecontainer("change", "#modifica_prodotto", {
        transition: 'flip',

    });

}

function selezionoCategorieSingoloProdotto() {
    var nome_categoria = localStorage.getItem("nome_categoria_singolo_prodotto")
   
    // Faccio la selezione dal server delle new di questo utente
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/categorie_prodotti.aspx?id_utente=" + localStorage.getItem("ID_utente") + "", function (dati) {
        var id_selezionato = "";
        var tab_categorie = "<div  class='controls'><label class='lbl_tasti'>Categorie:</label><br>";
      
        var count = 0
      
        $.each(dati, function (i, categorie) {
           
            // Inserisco dati nel db sqllite dell' App
            if (nome_categoria == categorie.nome_categoria) {
               
                tab_categorie += "<button style='margin-bottom:10px; margin-top:15px' onclick='clickCategoriaModificaProdotto(\"" + categorie.ID + "\")' class='active filter' id='catProd" + categorie.ID + "' >" + categorie.nome_categoria + "</button>"
                localStorage.setItem('id_categoria_selezionato', categorie.ID); 
                localStorage.setItem('id_categoria_prodotto_modifica_singolo', categorie.ID);
            } else {

                tab_categorie += "<button style='margin-bottom:10px; margin-top:15px' onclick='clickCategoriaModificaProdotto(\"" + categorie.ID + "\")' class='filter' id='catProd" + categorie.ID + "' >" + categorie.nome_categoria + "</button>"
            }
           

        });
        tab_categorie += "</div>";



      
        $(".appendi_categorie_prodotti_modifica").append(tab_categorie);
        // Qua seleziono i dati della singola foto con una funzione
       
    });
}

function clickCategoriaModificaProdotto(ID_categoria) {
    
    localStorage.setItem('id_categoria_prodotto_modifica_singolo', ID_categoria);
    id_selezionato = localStorage.getItem('id_categoria_selezionato');
    document.getElementById("catProd" + id_selezionato).classList.remove("active");
    document.getElementById("catProd" + ID_categoria).classList.add("active");
}

function selezionoProdottoModifica() {

    var ID = localStorage.getItem("ID_utente");
    var id_prodotto = localStorage.getItem('id_modifica_argomento');
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/seleziono_prodotto.aspx?id_prodotto=" + id_prodotto + "&ID_utente=" + ID + "", function (dati) {
        // var blocco_news = "";
        // Continuo da qui
        var lunghezza = dati.length;
      
        $.each(dati, function (i, argomento) {
            tinyMCE.triggerSave();
            $("#lbl_prodotto_posizione").addClass("active");
            $("#posizione_prodotto_modifica").val(argomento.posizione);
            $("#lbl_prodotto_nome").addClass("active");
            $("#nome_prodotto_modifica").val(argomento.nome);
            $("#lbl_prodotto_nome_en").addClass("active");
            $("#nome_en_prodotto_modifica").val(argomento.nome_en);
            $("#lbl_prodotto_nome_fr").addClass("active");
            $("#nome_fr_prodotto_modifica").val(argomento.nome_fr);
            $("#lbl_prodotto_prezzo").addClass("active");
            $("#prezzo_prodotto_modifica").val(argomento.prezzo);
            $("#lbl_prodotto_prezzo_scontato").addClass("active");
            $("#prezzo_scontato_prodotto_modifica").val(argomento.prezzo_scontato);
          
            tinyMCE.get('descrizione_breve_prodotto_modifica').setContent(argomento.descrizione_breve);
            tinyMCE.get('descrizione_breve_en_prodotto_modifica').setContent(argomento.descrizione_breve_en);
            tinyMCE.get('descrizione_breve_fr_prodotto_modifica').setContent(argomento.descrizione_breve_fr);
            tinyMCE.get('descrizione_prodotto_modifica').setContent(argomento.descrizione);
            tinyMCE.get('descrizione_en_prodotto_modifica').setContent(argomento.descrizione_en);
            tinyMCE.get('descrizione_fr_prodotto_modifica').setContent(argomento.descrizione_fr);


           
        });
       
    });
    // Qua faccio funzione seleziono media dell' argomento
    selezionoMediaProdotto();

}
function selezionoMediaProdotto() {

    var id_argomento = localStorage.getItem('id_modifica_argomento')
    var argomento = "Prodotti";
    var ID = localStorage.getItem("ID_utente");
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/seleziono_media_argomento.aspx?id_argomento=" + id_argomento + "&argomento=" + argomento + "&ID_utente=" + ID + "", function (dati) {
        // var blocco_news = "";
        var lunghezza = dati.length;
        var immagine = "";
        $.each(dati, function (i, media) {

            immagine = "<div class='grid-item gallery-item-card ' id='" + media.ID + "'> <img src='http://simplyappweb.mvclienti.com/Account/Uploads/Prodotti/galleria_img/immagini/" + media.immagine + "' rel='external' alt='image'>";
            immagine += "<div onclick='cancellaFotoModificaProdotto(\"" + media.ID + "\");'  class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_modifica_prodotto").append(immagine);
        });

    });
}

function cancellaFotoModificaProdotto(ID) {

    $("#" + ID + "").hide();
    var argomento = "Prodotti";
    // La vado a cancellare sul server
    // Cancello News 
    $.ajax({
        type: "POST",
        data: '{ID:"' + ID + '",ID_utente: "' + localStorage.getItem('ID_utente') + '",argomento: "' + argomento + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/servizi_app.aspx/cancelloMediaArgomento',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;

            if (ritorno == "si") {
                var siCancellaMediaArgomento = "<div class='modal-content'><h4>Foto eliminata </h4><p>Foto eliminta con successo!!</p></div>";
                siCancellaMediaArgomento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_cancellazione_media_prodotto").html("");
                $("#box_cancellazione_media_prodotto").append(siCancellaMediaArgomento);
                $("#apri_box_cancellazione_media_prodotto").click();
            } else {
                var noCancellaMediaArgomento = "<div class='modal-content'><h4>Foto non eliminata </h4><p>Foto non eliminata!!<br>Si prega di riprovare. </p></div>";
                noCancellaMediaArgomento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_cancellazione_media_prodotto").html("");
                $("#box_cancellazione_media_prodotto").append(noCancellaMediaArgomento);
                $("#apri_box_cancellazione_media_prodotto").click();
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

function aggiornaProdotto(posizione, nome, nome_en, nome_fr, prezzo, prezzo_scontato, descrizione_breve, descrizione_breve_en, descrizione_breve_fr, descrizione, descrizione_en, descrizione_fr) {
   
   
    var ID_categoria = localStorage.getItem('id_categoria_prodotto_modifica_singolo');
    $.ajax({
        type: "POST",
        data: '{posizione:"' + posizione + '",nome:"' + nome + '", nome_en:"' + nome_en + '", nome_fr:"' + nome_fr + '", prezzo:"' + prezzo + '", prezzo_scontato:"' + prezzo_scontato + '", id_categoria:"' + ID_categoria + '",descrizione_breve:"' + descrizione_breve + '", descrizione_breve_en:"' + descrizione_breve_en + '", descrizione_breve_fr:"' + descrizione_breve_fr + '",descrizione:"' + descrizione + '", descrizione_en:"' + descrizione_en + '", descrizione_fr:"' + descrizione_fr + '", ID_utente:"' + localStorage.getItem("ID_utente") + '", ID_prodotto: "' + localStorage.getItem('id_modifica_argomento') + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/aggiorno_prodotto.aspx/updateProdotto',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;
           
            if (ritorno == "Si") {
                var siCaricamento = "<div class='modal-content'><h4>Prodotto Aggiornato </h4><p>Prodotto aggiornato correttamente</p></div>";
                siCaricamento += "<div class='modal-footer'> <a href='#dashboard' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_aggiornamento_prodotto").html("");
                $("#box_aggiornamento_prodotto").append(siCaricamento);
                $("#apri_box_aggiornamento_prodotto").click();
            } else {
                var noCaricamento = "<div class='modal-content'><h4>Prodotto non aggiornato </h4><p>Prodotto non aggiornato.<br>Si prega di riprovare </p></div>";
                noCaricamento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_aggiornamento_prodotto").html("");
                $("#box_aggiornamento_prodotto").append(noCaricamento);
                $("#apri_box_aggiornamento_prodotto").click();
            }

        },
        error: function (e) {

        }
    });
}

// FINE PRODOTTI

// INIZIO REALIZZAZIONI

$(document).on("pagebeforeshow", "#realizzazioni", function () {
    localStorage.setItem("categoria_realizzazione", "");
    $(".appendi_categorie_realizzazioni").html("");
    $(".appendi_immagini_categoria").html("");
    $(".append_categoria_aggiunta_realizzazione").html("");
    $("#titolo_gallery").val("");
    $("#uploadFotoRealizzazione").hide();
    var stato_flip = $("#flip-aggiungi-categoria-realizzazioni").prop("checked");
    if (stato_flip == true) {
        $("#flip-aggiungi-categoria-realizzazioni").prop("checked", false);
        $(".ui-flipswitch").removeClass("ui-flipswitch-active");
    }
    //Cancello le foto rimaste nella tabella media del cellulare caricate in precedenza
    db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
    db.transaction(
        // Metodo di chiamata asincrona
        function (tx) {
            tx.executeSql("DELETE FROM categorie_realizzazioni", []);
        },
        function () {
            // alert("Non è stato possibile cancellare la notizia. Riprova");

        },
        function () {
            // alert("Cancellazione effettua");
        }
    )

});

$(document).on("pageshow", "#realizzazioni", function () {
    // Seleziono i dati delle categorie della gallery
    var foto = "<img class='circle avatar' src='http://simplyappweb.mvclienti.com/Account/fotoOperatori/" + localStorage.getItem("foto_utente") + "' rel='external' alt=''>";
    $(".appendi_foto_utente_nome").html("");
    $(".appendi_foto_utente_nome").append(foto);
    $("#footer_gallery").addClass("footer_home");
    caricoCategorieRealizzazioni();
    selezionoLingue();
});

$(document).on("pagebeforeshow", "#storicoRealizzazioni", function () {
    // Ripulisco la pagina dalle parti dinamiche
    $("#si_fixed_footer_realizzazioni").show();
    $("#no_fixed_footer_realizzazioni").hide();
    $("#stato_attivo_filtro").removeClass("active");
    $("#stato_non_attivo_filtro").removeClass("active");
    $("#ricerca").val("");
    $(".appendi_categorie_realizzazioni_filtri").html("");
    $(".appendi_realizzazioni").html("");
    localStorage.setItem("id_precedente", "");
    localStorage.setItem("argomento_filtri", "realizzazioni");
    selezionoCategoriePerFiltriRealizzazioni();

});

$(document).on("pageshow", "#storicoRealizzazioni", function () {
    // Seleziono i dati delle categorie della gallery
    var foto = "<img class='circle avatar' src='http://simplyappweb.mvclienti.com/Account/fotoOperatori/" + localStorage.getItem("foto_utente") + "' rel='external' alt=''>";
    $(".appendi_foto_utente_nome").html("");
    $(".appendi_foto_utente_nome").append(foto);
    recuperaRealizzazioni();
});

$(document).on("pagebeforeshow", "#modifica_realizzazione", function () {
    var foto = "<img class='circle avatar' src='http://simplyappweb.mvclienti.com/Account/fotoOperatori/" + localStorage.getItem("foto_utente") + "' rel='external' alt=''>";
    $(".appendi_foto_utente_nome").html("");
    $(".appendi_foto_utente_nome").append(foto);
    var titolo = "<h1>Modifica " + localStorage.getItem("nome_argomento_modifica") + "</h1>";
    $(".appendi_categorie_realizzazioni_modifica").html("");
    $(".appendi_img_modifica_realizzazione").html("");
    $(".appendi_lingue").html("");
    selezionoLingue();
    selezionoCategorieSingolaRealizzazione();
    selezionoRealizzazioneModifica();

});

function caricoCategorieRealizzazioni() {
    // Carico nella tabella categorie_gallery

    $.getJSON("http://simplyappweb.mvclienti.com/webservices/categorie_realizzazioni.aspx?id_utente=" + localStorage.getItem("ID_utente") + "", function (dati) {
        var li_dati = "";

        $.each(dati, function (i, categoria) {
            // Inserisco dati nel db sqllite dell' App

            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {

                    tx.executeSql("INSERT INTO categorie_realizzazioni (identificativo,nome_categoria,user) VALUES (?,?,?)", [categoria.ID, categoria.nome_categoria, categoria.user]);
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
        selezioneCategorieRealizzazioni();
    });
}

function selezioneCategorieRealizzazioni() {

    db.transaction(selezionoCatRealizzazioni);
}

function selezionoCatRealizzazioni(tx) {

    // Selezione le categorie aggiornate nella tabella categoria_gallery del telefono
    tx.executeSql("SELECT * FROM categorie_realizzazioni", [],
        function (tx, dati) {
            var len = dati.rows.length;

            var tab_categorie = "<div  class='controls'><label class='lbl_tasti'>Categorie:</label><br>";
            if (len != 0) {
                /* Qua compongo grafica tab categorie */
                for (var i = 0; i < len; i++) {
                    //  alert("ciclo");
                    tab_categorie += " <button style='margin-bottom:10px; margin-top:15px' onclick='clickCategoriaRealizzazioni(\"" + dati.rows.item(i).identificativo + "\")' class='filter' id='catRel" + dati.rows.item(i).identificativo + "' >" + dati.rows.item(i).nome_categoria + "</button>"

                }

                tab_categorie += "</div>";

            }
            $(".appendi_categorie_realizzazioni").append(tab_categorie);
        },
        function () {
            alert("Errore" + e.message);
        })

    // Qua faccio due selezioni se è ceccato social o se non è ceccato social


}

function clickCategoriaRealizzazioni(categoria) {

  
    localStorage.setItem('categoria_realizzazione', categoria);
    $("#catRel" + categoria + "").addClass("active");

}

$("#flip-aggiungi-categoria-realizzazioni").bind("change", function (event, ui) {
    localStorage.setItem('argomento', 'realizzazioni');
    $.mobile.pageContainer.pagecontainer("change", "#categorie", {
        transition: 'flip',
    });
});

function caricaCategoriaRealizzazioneSito(nome_categoria_realizzazione, posizione_categoria_realizzazione) {

    $.ajax({
        type: "POST",
        data: '{nome:"' + nome_categoria_realizzazione + '", posizione: "' + posizione_categoria_realizzazione + '", user: "' + localStorage.getItem('username') + '", ID_utente: "' + localStorage.getItem('ID_utente') + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/servizi_app.aspx/inseriscoCategoriaRealizzazioni',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;
            localStorage.setItem("categoria_realizzazioni", ritorno);
            var categoria_aggiunta = "<div  class='controls'><label>Categorie Aggiunta:</label>";
            categoria_aggiunta += "<button style='margin-bottom:10px; margin-top:15px' class='filter active' id='" + ritorno + "' >" + nome_categoria_realizzazione + "</button>"
            $(".append_categoria_aggiunta_realizzazione").append(categoria_aggiunta);
            localStorage.setItem("categoria_realizzazione", ritorno);
          


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

function caricaSulSitoRealizzazione(posizione, nome, nome_en, nome_fr, descrizione_breve, descrizione_breve_en, descrizione_breve_fr, descrizione, descrizione_en, descrizione_fr) {

   
    $.ajax({
        type: "POST",
        data: '{posizione:"' + posizione + '",nome:"' + nome + '", nome_en:"' + nome_en + '", nome_fr:"' + nome_fr + '", ID_categoria:"' + localStorage.getItem('categoria_realizzazione') + '", descrizione_breve:"' + descrizione_breve + '", descrizione_breve_en:"' + descrizione_breve_en + '", descrizione_breve_fr:"' + descrizione_breve_fr + '", descrizione:"' + descrizione + '", descrizione_en:"' + descrizione_en + '", descrizione_fr:"' + descrizione_fr + '",ID_utente:"' + localStorage.getItem("ID_utente") + '", user:"' + localStorage.getItem("username") + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/carica_argomento_app.aspx/caricaRealizzazione',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;
          
            if (ritorno == "Si") {
                var siCaricamento = "<div class='modal-content'><h4>Realizzazione Caricata </h4><p>Realizzazione Caricata con successo</p></div>";
                siCaricamento += "<div class='modal-footer'> <a href='#storicoRealizzazioni'  class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_caricamento_realizzazione").html("");
                $("#box_caricamento_realizzazione").append(siCaricamento);
                $("#apri_box_caricamento_realizzazione").click();
            } else {
                var noCaricamento = "<div class='modal-content'><h4>Argomento non caricato </h4><p>Realizzazione non caricata.<br>Si prega di riprovare </p></div>";
                noCaricamento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_caricamento_realizzazione").html("");
                $("#box_caricamento_realizzazione").append(noCaricamento);
                $("#apri_box_caricamento_realizzazione").click();
            }

        },
        error: function (e) {

        }
    });
}

function recuperaRealizzazioni() {
    $(".appendi_realizzazioni").html("");
    // Faccio la selezione dal server delle new di questo utente
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/storico_realizzazioni.aspx?id_utente=" + localStorage.getItem("ID_utente") + "", function (dati) {
        var blocco_realizzazioni = "";
        var lunghezza = dati.length;
        var Realizzazioni = "Realizzazioni";

        $.each(dati, function (i, realizzazioni) {


            blocco_realizzazioni += "<div class='blog-card animated fadein delay-1'><div class='blog-header'><div class='blog-author'><span class='titolo_storico'>" + realizzazioni.nome + "</span> <span class='small'>" + realizzazioni.nome_categoria + "</span></div></div>";

            blocco_realizzazioni += "<div class='blog-image'>  <img src='http://simplyappweb.mvclienti.com/Account/Uploads/Realizzazioni/galleria_img/immagini/" + realizzazioni.immagine + "' rel='external' alt=''/></div>";

            blocco_realizzazioni += "<div class='blog-preview p-20'><p>" + realizzazioni.descrizione_breve + "</p><div class='btn_storico'><a href='#' onclick='modificaRealizzazione(\"" + realizzazioni.ID + "\",\"" + realizzazioni.nome_categoria + "\");' class='waves-effect waves-light btn accent-color'><span class='ion-edit'></span></a><a href='#' onclick='cancellaRealizzazione(\"" + realizzazioni.ID + "\");' class='waves-effect waves-light btn accent-color'><span class='ion-close-circled'></span></a></div></div></div>";
        });
        if (lunghezza == 0) {
            blocco_realizzazioni += "<div class='modal-content'><h4>No Realizzazioni </h4><p>Non vi sono realizzazioni salvate!!</p></div>";
            blocco_realizzazioni += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#no_realizzazioni").html("");
            $("#no_realizzazioni").append(blocco_realizzazioni);
            $("#apri_no_realizzazioni").click();
        }

        if (lunghezza != 0) {

            $(".appendi_realizzazioni").append(blocco_realizzazioni);
            $("#si_fixed_footer_realizzazioni").hide();
            $("#no_fixed_footer_realizzazioni").show();
        }

    });
}

function cancellaRealizzazione(ID_realizzazione) {
    $.ajax({
        type: "POST",
        data: '{ID:"' + ID_realizzazione + '", ID_utente:"' + localStorage.getItem("ID_utente") + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/servizi_app.aspx/cancellaRealizzazione',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;
         
            if (ritorno == "si") {
                var siCancellaNews = "<div class='modal-content'><h4>Realizzazione eliminata </h4><p>Realizzazione eliminata con successo!!</p></div>";
                siCancellaNews += "<div class='modal-footer'> <a href='#' onclick='recuperaRealizzazioni()' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_cancellazione_realizzazione").html("");
                $("#box_cancellazione_realizzazione").append(siCancellaNews);
                $("#apri_box_cancellazione_realizzazione").click();
            } else {
                var noCancellaNews = "<div class='modal-content'><h4>Realizzazione non eliminata </h4><p>Realizzazione non eliminata!!<br>Si prega di riprovare. </p></div>";
                noCancellaNews += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_cancellazione_realizzazione").html("");
                $("#box_cancellazione_realizzazione").append(noCancellaNews);
                $("#apri_box_cancellazione_realizzazione").click();
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

$("#flip-storico-realizzazioni").bind("change", function (event, ui) {
    $("#filtri_realizzazioni").toggle();
    var stato_flip = $("#flip-storico-realizzazioni").prop("checked");
    if (stato_flip == true) {

    }
    if (stato_flip == false) {


    }

});

function selezionoCategoriePerFiltriRealizzazioni() {
    // Faccio la selezione dal server delle new di questo utente

    $.getJSON("http://simplyappweb.mvclienti.com/webservices/categorie_realizzazioni.aspx?id_utente=" + localStorage.getItem("ID_utente") + "", function (dati) {
        var id_selezionato = "";
        var tab_categorie = "<div  class='controls'><label class='lbl_tasti'>Filtri per Categoria:</label><br>";
        $.each(dati, function (i, categorie) {
            // Inserisco dati nel db sqllite dell' App
            tab_categorie += "<button style='margin-bottom:10px; margin-top:15px' onclick='clickFiltroPerCategoriaRealizzazione(\"" + categorie.ID + "\")' class='filter' id='cat" + categorie.ID + "' >" + categorie.nome_categoria + "</button>"
        });
        tab_categorie += "</div>";
        $(".appendi_categorie_realizzazioni_filtri").append(tab_categorie);
        // Qua seleziono i dati della singola foto con una funzione

    });
}

function clickFiltroPerCategoriaRealizzazione(ID_categoria) {

    
    $("#cat" + ID_categoria + "").addClass("active");
    if (localStorage.getItem("id_precedente") != "") {
        $("#cat" + localStorage.getItem("id_precedente") + "").removeClass("active");
    }
    localStorage.setItem("id_precedente", ID_categoria);
    $(".appendi_realizzazioni").html("");
    // Applico filtri
    // Faccio la selezione dal server delle new di questo utente
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/storico_realizzazioni_filtri_categorie.aspx?id_utente=" + localStorage.getItem("ID_utente") + "&id_categoria=" + ID_categoria + "", function (dati) {
        var blocco_realizzazioni = "";
        var lunghezza = dati.length;
        var Prodotti = "Realizzazioni";
      
        $.each(dati, function (i, realizzazioni) {

            blocco_realizzazioni += "<div class='blog-card animated fadein delay-1'><div class='blog-header'><div class='blog-author'><span class='titolo_storico'>" + realizzazioni.nome + "</span> <span class='small'>" + realizzazioni.nome_categoria + "</span></div></div>";

            blocco_realizzazioni += "<div class='blog-image'>  <img src='http://simplyappweb.mvclienti.com/Account/Uploads/Realizzazioni/galleria_img/immagini/" + realizzazioni.immagine + "' rel='external' alt=''/></div>";

            blocco_realizzazioni += "<div class='blog-preview p-20'><p>" + realizzazioni.descrizione_breve + "</p><div class='btn_storico'><a href='#' onclick='modificaRealizzazione(\"" + realizzazioni.ID + "\",\"" + realizzazioni.nome_categoria + "\");' class='waves-effect waves-light btn accent-color'><span class='ion-edit'></span></a><a href='#' onclick='cancellaRealizzazione(\"" + realizzazioni.ID + "\");' class='waves-effect waves-light btn accent-color'><span class='ion-close-circled'></span></a></div></div></div>";
        

        });

        if (lunghezza == 0) {
            blocco_realizzazioni += "<div class='modal-content'><h4>No Realizzazioni </h4><p>Non vi sono realizzazioni per questa categoria!!</p></div>";
            blocco_realizzazioni += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#no_realizzazioni_cat").html("");
            $("#no_realizzazioni_cat").append(blocco_realizzazioni);
            $("#apri_no_realizzazioni_cat").click();
            $("#si_fixed_footer_realizzazioni").show();
            $("#no_fixed_footer_realizzazioni").hide();
        }

        if (lunghezza != 0) {

            $(".appendi_realizzazioni").append(blocco_realizzazioni);
            $("#si_fixed_footer_realizzazioni").hide();
            $("#no_fixed_footer_realizzazioni").show();
        }

        

    });
}

function filtraArgomentoRealizzazione(stato, tipo) {


    if (stato == "si" && tipo == "Attivo") {
        $("#stato_attivo_filtro_realizzazioni").addClass("active");
        $("#stato_non_attivo_filtro_realizzazioni").removeClass("active");
    }
    if (stato == "si" && tipo == "Non Attivo") {
        $("#stato_attivo_filtro_realizzazioni").removeClass("active");
        $("#stato_non_attivo_filtro_realizzazioni").addClass("active");
    }

    var argomento_giusto = "realizzazioni"
    var ricerca_valore = $("#ricerca_realizzazione").val();
    if (ricerca_valore != "") {
        ricerca = ricerca_valore;
    } else {
        ricerca = "";
    }

    var argomento = localStorage.getItem("argomento_filtri");

    $(".appendi_realizzazioni").html("");

    $.getJSON("http://simplyappweb.mvclienti.com/webservices/storico_realizzazioni_filtri.aspx?id_utente=" + localStorage.getItem("ID_utente") + "&stato=" + stato + "&ricerca=" + ricerca + "&tipo_argomento=" + argomento + "&tipo_stato=" + tipo + "", function (dati) {
        var blocco_realizzazioni = "";
        var lunghezza = dati.length;


        $.each(dati, function (i, argomenti_filtrati) {


            blocco_realizzazioni += "<div class='blog-card animated fadein delay-1'><div class='blog-header'><div class='blog-author'><span class='titolo_storico'>" + argomenti_filtrati.nome + "</span> <span class='small'>" + argomenti_filtrati.nome_categoria + "</span></div></div>";

            blocco_realizzazioni += "<div class='blog-image'>  <img src='http://simplyappweb.mvclienti.com/Account/Uploads/Realizzazioni/galleria_img/immagini/" + argomenti_filtrati.immagine + "' rel='external' alt=''/></div>";

            blocco_realizzazioni += "<div class='blog-preview p-20'><p>" + argomenti_filtrati.descrizione_breve + "</p><div class='btn_storico'><a href='#' onclick='modificaRealizzazione(\"" + argomenti_filtrati.ID + "\",\"" + argomenti_filtrati.nome_categoria + "\");' class='waves-effect waves-light btn primary-color'><span class='ion-edit'></span></a><a href='#' onclick='cancellaRealizzazione(\"" + argomenti_filtrati.ID + "\");' class='waves-effect waves-light btn primary-color'><span class='ion-close-circled'></span></a></div></div></div>";
        });
        if (lunghezza == 0) {
            blocco_realizzazioni += "<div class='modal-content'><h4>No " + localStorage.getItem("argomento_filtri") + " </h4><p>Nessun\a " + localStorage.getItem("argomento_filtri") + "  trovata dopo la ricerca!!</p></div>";
            blocco_realizzazioni += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#no_realizzazioni_cat").html("");
            $("#no_realizzazioni_cat").append(blocco_realizzazioni);
            $("#apri_no_realizzazioni_cat").click();
            $("#si_fixed_footer_realizzazioni").show();
            $("#no_fixed_footer_realizzazioni").hide();
        }

        if (lunghezza != 0) {
            $(".appendi_realizzazioni").append(blocco_realizzazioni);
            $("#si_fixed_footer_realizzazioni").hide();
            $("#no_fixed_footer_realizzazioni").show();
        }

    });

}

function modificaRealizzazione(ID, nome_categoria) {

    // Imposto il local storage per la modifica
    localStorage.setItem("nome_categoria_singola_realizzazione", nome_categoria);
    localStorage.setItem('id_modifica_argomento', ID);

    $.mobile.pageContainer.pagecontainer("change", "#modifica_realizzazione", {
        transition: 'flip',

    });

}

function selezionoCategorieSingolaRealizzazione() {
    var nome_categoria = localStorage.getItem("nome_categoria_singola_realizzazione")

    // Faccio la selezione dal server delle new di questo utente
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/categorie_realizzazioni.aspx?id_utente=" + localStorage.getItem("ID_utente") + "", function (dati) {
        var id_selezionato = "";
        var tab_categorie = "<div  class='controls'><label class='lbl_tasti'>Categorie:</label><br>";

        var count = 0

        $.each(dati, function (i, categorie) {

            // Inserisco dati nel db sqllite dell' App
            if (nome_categoria == categorie.nome_categoria) {

                tab_categorie += "<button style='margin-bottom:10px; margin-top:15px' onclick='clickCategoriaModificaRealizzazione(\"" + categorie.ID + "\")' class='active filter' id='catRel" + categorie.ID + "' >" + categorie.nome_categoria + "</button>"
                localStorage.setItem('id_categoria_selezionato', categorie.ID);
                localStorage.setItem('id_categoria_realizzazione_modifica_singolo', categorie.ID);

            } else {

                tab_categorie += "<button style='margin-bottom:10px; margin-top:15px' onclick='clickCategoriaModificaRealizzazione(\"" + categorie.ID + "\")' class='filter' id='catRel" + categorie.ID + "' >" + categorie.nome_categoria + "</button>"
            }


        });
        tab_categorie += "</div>";




        $(".appendi_categorie_realizzazioni_modifica").append(tab_categorie);
        // Qua seleziono i dati della singola foto con una funzione

    });
}

function clickCategoriaModificaRealizzazione(ID_categoria) {

    localStorage.setItem('id_categoria_realizzazione_modifica_singolo', ID_categoria);
    id_selezionato = localStorage.getItem('id_categoria_selezionato');
    document.getElementById("catRel" + id_selezionato).classList.remove("active");
    document.getElementById("catRel" + ID_categoria).classList.add("active");
}

function selezionoRealizzazioneModifica() {

    var ID = localStorage.getItem("ID_utente");
    var id_prodotto = localStorage.getItem('id_modifica_argomento');
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/seleziono_realizzazione.aspx?id_prodotto=" + id_prodotto + "&ID_utente=" + ID + "", function (dati) {
        // var blocco_news = "";
        // Continuo da qui
        var lunghezza = dati.length;

        $.each(dati, function (i, argomento) {
            tinyMCE.triggerSave();
            $("#lbl_realizzazione_posizione").addClass("active");
            $("#posizione_realizzazione_modifica").val(argomento.posizione);
            $("#lbl_realizzazione_nome").addClass("active");
            $("#nome_realizzazione_modifica").val(argomento.nome);
            $("#lbl_realizzazione_nome_en").addClass("active");
            $("#nome_en_realizzazione_modifica").val(argomento.nome_en);
            $("#lbl_realizzazione_nome_fr").addClass("active");
            $("#nome_fr_realizzazione_modifica").val(argomento.nome_fr);    
            tinyMCE.get('descrizione_breve_realizzazione_modifica').setContent(argomento.descrizione_breve);
            tinyMCE.get('descrizione_breve_en_realizzazione_modifica').setContent(argomento.descrizione_breve_en);
            tinyMCE.get('descrizione_breve_fr_realizzazione_modifica').setContent(argomento.descrizione_breve_fr);
            tinyMCE.get('descrizione_realizzazione_modifica').setContent(argomento.descrizione);
            tinyMCE.get('descrizione_en_realizzazione_modifica').setContent(argomento.descrizione_en);
            tinyMCE.get('descrizione_fr_realizzazione_modifica').setContent(argomento.descrizione_fr);

        });

    });
    // Qua faccio funzione seleziono media dell' argomento
    selezionoMediaRealizzazione();

}

function selezionoMediaRealizzazione() {

    var id_argomento = localStorage.getItem('id_modifica_argomento')
    var argomento = "Realizzazioni";
    var ID = localStorage.getItem("ID_utente");
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/seleziono_media_argomento.aspx?id_argomento=" + id_argomento + "&argomento=" + argomento + "&ID_utente=" + ID + "", function (dati) {
        // var blocco_news = "";
        var lunghezza = dati.length;
        var immagine = "";
        $.each(dati, function (i, media) {

            immagine = "<div class='grid-item gallery-item-card ' id='" + media.ID + "'> <img src='http://simplyappweb.mvclienti.com/Account/Uploads/Realizzazioni/galleria_img/immagini/" + media.immagine + "' rel='external' alt='image'>";
            immagine += "<div onclick='cancellaFotoModificaRealizzazione(\"" + media.ID + "\");'  class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_modifica_realizzazione").append(immagine);
        });

    });
}

function cancellaFotoModificaRealizzazione(ID) {

    $("#" + ID + "").hide();
    var argomento = "Prodotti";
    // La vado a cancellare sul server
    // Cancello News 
    $.ajax({
        type: "POST",
        data: '{ID:"' + ID + '",ID_utente: "' + localStorage.getItem('ID_utente') + '",argomento: "' + argomento + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/servizi_app.aspx/cancelloMediaArgomento',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;

            if (ritorno == "si") {
                var siCancellaMediaArgomento = "<div class='modal-content'><h4>Foto eliminata </h4><p>Foto eliminta con successo!!</p></div>";
                siCancellaMediaArgomento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_cancellazione_media_realizzazione").html("");
                $("#box_cancellazione_media_realizzazione").append(siCancellaMediaArgomento);
                $("#apri_box_cancellazione_media_realizzazione").click();
            } else {
                var noCancellaMediaArgomento = "<div class='modal-content'><h4>Foto non eliminata </h4><p>Foto non eliminata!!<br>Si prega di riprovare. </p></div>";
                noCancellaMediaArgomento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_cancellazione_media_realizzazione").html("");
                $("#box_cancellazione_media_realizzazione").append(noCancellaMediaArgomento);
                $("#apri_box_cancellazione_media_realizzazione").click();
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

function aggiornaRealizzazione(posizione, nome, nome_en, nome_fr, descrizione_breve, descrizione_breve_en, descrizione_breve_fr, descrizione, descrizione_en, descrizione_fr) {

  
  
    var ID_categoria = localStorage.getItem('id_categoria_realizzazione_modifica_singolo');
   
    $.ajax({
        type: "POST",
        data: '{posizione:"' + posizione + '",nome:"' + nome + '",nome_en:"' + nome_en + '",nome_fr:"' + nome_fr + '",id_categoria:"' + ID_categoria + '",descrizione_breve:"' + descrizione_breve + '",descrizione_breve_en:"' + descrizione_breve_en + '",descrizione_breve_fr:"' + descrizione_breve_fr + '",descrizione:"' + descrizione + '",descrizione_en:"' + descrizione_en + '",descrizione_fr:"' + descrizione_fr + '", ID_utente:"' + localStorage.getItem("ID_utente") + '", ID_realizzazione: "' + localStorage.getItem('id_modifica_argomento') + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/aggiorno_prodotto.aspx/updateRealizzazione',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;
          
            if (ritorno == "Si") {
                var siCaricamento = "<div class='modal-content'><h4>Realizzazione Aggiornata </h4><p>Realizzazione aggiornata correttamente</p></div>";
                siCaricamento += "<div class='modal-footer'> <a href='#dashboard' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_aggiornamento_realizzazione").html("");
                $("#box_aggiornamento_realizzazione").append(siCaricamento);
                $("#apri_box_aggiornamento_realizzazione").click();
            } else {
                var noCaricamento = "<div class='modal-content'><h4>Realizzazione non aggiornato </h4><p>Realizzazione non aggiornata.<br>Si prega di riprovare </p></div>";
                noCaricamento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_aggiornamento_realizzazione").html("");
                $("#box_aggiornamento_realizzazione").append(noCaricamento);
                $("#apri_box_aggiornamento_realizzazione").click();
            }

        },
        error: function (xhr, textStatus, error) {
            alert(xhr.statusText);
            alert(textStatus);
            alert(error);
        }
    });
}

// FINE REALIZZAZIONI

// INIZIO SERVIZI

$(document).on("pagebeforeshow", "#servizi", function () {
    localStorage.setItem("categoria_realizzazione", "");
    $(".appendi_categorie_realizzazioni").html("");
    $(".appendi_immagini_categoria").html("");
    $(".appendi_lingue").html("");
    $(".append_categoria_aggiunta_realizzazione").html("");
    $("#titolo_servizio").val("");
    $("#titolo_en_servizio").val("");
    $("#titolo_fr_servizio").val("");
    tinyMCE.get('descrizione_servizio').setContent("");
    tinyMCE.get('descrizione_en_servizio').setContent("");
    tinyMCE.get('descrizione_fr_servizio').setContent("");
    tinyMCE.get('descrizione_breve_servizio').setContent("");
    tinyMCE.get('descrizione_breve_en_servizio').setContent("");
    tinyMCE.get('descrizione_breve_fr_servizio').setContent("");
    $("#uploadFotoRealizzazione").hide();
    //Cancello le foto rimaste nella tabella media del cellulare caricate in precedenza
    db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
    db.transaction(
        // Metodo di chiamata asincrona
        function (tx) {
            tx.executeSql("DELETE FROM categorie_realizzazioni", []);
        },
        function () {
            // alert("Non è stato possibile cancellare la notizia. Riprova");

        },
        function () {
            // alert("Cancellazione effettua");
        }
    )
    selezionoLingue();
});

$(document).on("pageshow", "#servizi", function () {
    // Seleziono i dati delle categorie della gallery
    var foto = "<img class='circle avatar' src='http://simplyappweb.mvclienti.com/Account/fotoOperatori/" + localStorage.getItem("foto_utente") + "' rel='external' alt=''>";
    $(".appendi_foto_utente_nome").html("");
    $(".appendi_foto_utente_nome").append(foto);
    $("#footer_gallery").addClass("footer_home");

});

$(document).on("pagebeforeshow", "#storicoServizi", function () {
    // Ripulisco la pagina dalle parti dinamiche
    $("#si_fixed_footer_servizi").show();
    $("#no_fixed_footer_servizi").hide();
    $("#stato_attivo_filtro").removeClass("active");
    $("#stato_non_attivo_filtro").removeClass("active");
    $("#ricerca").val("");
    $(".appendi_servizi").html("");
    localStorage.setItem("argomento_filtri", "servizi");



});

$(document).on("pageshow", "#storicoServizi", function () {
    // Seleziono i dati delle categorie della gallery
    var foto = "<img class='circle avatar' src='http://simplyappweb.mvclienti.com/Account/fotoOperatori/" + localStorage.getItem("foto_utente") + "' rel='external' alt=''>";
    $(".appendi_foto_utente_nome").html("");
    $(".appendi_foto_utente_nome").append(foto);
    recuperaServizi();
});

$(document).on("pagebeforeshow", "#modifica_servizio", function () {
    var foto = "<img class='circle avatar' src='http://simplyappweb.mvclienti.com/Account/fotoOperatori/" + localStorage.getItem("foto_utente") + "' rel='external' alt=''>";
    $(".appendi_foto_utente_nome").html("");
    $(".appendi_lingue").html("");
    $(".appendi_foto_utente_nome").append(foto);
    var titolo = "<h1>Modifica " + localStorage.getItem("nome_argomento_modifica") + "</h1>";
    $(".appendi_categorie_realizzazioni_modifica").html("");
    $(".appendi_img_modifica_realizzazione").html("");
    selezionoServizioModifica();
    selezionoLingue();

});

function caricaSulSitoServizio(posizione, titolo, titolo_en, titolo_fr, descrizione_breve, descrizione_breve_en, descrizione_breve_fr, descrizione, descrizione_en, descrizione_fr) {

   
  
    $.ajax({
        type: "POST",
        data: '{posizione:"' + posizione + '", titolo:"' + titolo + '", titolo_en:"' + titolo_en + '", titolo_fr:"' + titolo_fr + '", descrizione_breve:"' + descrizione_breve + '",descrizione_breve_en:"' + descrizione_breve_en + '",descrizione_breve_fr:"' + descrizione_breve_fr + '",descrizione:"' + descrizione + '",descrizione_en:"' + descrizione_en + '",descrizione_fr:"' + descrizione_fr + '",ID_utente:"' + localStorage.getItem("ID_utente") + '", user:"' + localStorage.getItem("username") + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/carica_argomento_app.aspx/caricaServizioProva',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;
         
            if (ritorno == "Si") {
                var siCaricamento = "<div class='modal-content'><h4>Servizio Caricato </h4><p>Servizio Caricato con successo</p></div>";
                siCaricamento += "<div class='modal-footer'> <a href='#storicoServizi'  class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_caricamento_servizio").html("");
                $("#box_caricamento_servizio").append(siCaricamento);
                $("#apri_box_caricamento_servizio").click();
            } else {
                var noCaricamento = "<div class='modal-content'><h4>Servizio non caricato </h4><p>Servizio non caricato.<br>Si prega di riprovare </p></div>";
                noCaricamento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_caricamento_servizio").html("");
                $("#box_caricamento_servizio").append(noCaricamento);
                $("#apri_box_caricamento_servizio").click();
            }

        },
        error: function (e) {

        }
    });
}

function recuperaServizi() {
    $(".appendi_servizi").html("");
    // Faccio la selezione dal server delle new di questo utente
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/storico_servizi.aspx?id_utente=" + localStorage.getItem("ID_utente") + "", function (dati) {
        var blocco_servizi = "";
        var lunghezza = dati.length;
        var Realizzazioni = "Servizi";

        $.each(dati, function (i, servizi) {


            blocco_servizi += "<div class='blog-card animated fadein delay-1'><div class='blog-header'><div class='blog-author'><span class='titolo_storico'>" + servizi.titolo + "</span></div></div>";

            blocco_servizi += "<div class='blog-image'>  <img src='http://simplyappweb.mvclienti.com/Account/Uploads/Servizi/galleria_img/immagini/" + servizi.immagine + "' rel='external' alt=''/></div>";

            blocco_servizi += "<div class='blog-preview p-20'><p>" + servizi.descrizione_breve + "</p><div class='btn_storico'><a href='#' onclick='modificaServizio(\"" + servizi.ID + "\");' class='waves-effect waves-light btn accent-color'><span class='ion-edit'></span></a><a href='#' onclick='cancellaServizio(\"" + servizi.ID + "\");' class='waves-effect waves-light btn accent-color'><span class='ion-close-circled'></span></a></div></div></div>";
        });
        if (lunghezza == 0) {
            blocco_servizi += "<div class='modal-content'><h4>No Servizi </h4><p>Non vi sono servizi salvati!!</p></div>";
            blocco_servizi += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#no_servizi").html("");
            $("#no_servizi").append(blocco_servizi);
            $("#apri_no_servizi").click();
        }

        if (lunghezza != 0) {

            $(".appendi_servizi").append(blocco_servizi);
            $("#si_fixed_footer_servizi").hide();
            $("#no_fixed_footer_servizi").show();
        }

    });
}

$("#flip-storico-servizi").bind("change", function (event, ui) {
    $("#filtri_servizi").toggle();
    var stato_flip = $("#flip-storico-servizi").prop("checked");
    if (stato_flip == true) {

    }
    if (stato_flip == false) {


    }

});

function filtraArgomentoServizio(stato, tipo) {


    if (stato == "si" && tipo == "Attivo") {
        $("#stato_attivo_filtro_servizi").addClass("active");
        $("#stato_non_attivo_filtro_servizi").removeClass("active");
    }
    if (stato == "si" && tipo == "Non Attivo") {
        $("#stato_attivo_filtro_servizi").removeClass("active");
        $("#stato_non_attivo_filtro_servizi").addClass("active");
    }

    var argomento_giusto = "servizi"
    var ricerca_valore = $("#ricerca_servizio").val();
    if (ricerca_valore != "") {
        ricerca = ricerca_valore;
    } else {
        ricerca = "";
    }

    var argomento = localStorage.getItem("argomento_filtri");

    $(".appendi_servizi").html("");

    $.getJSON("http://simplyappweb.mvclienti.com/webservices/storico_servizi_filtri.aspx?id_utente=" + localStorage.getItem("ID_utente") + "&stato=" + stato + "&ricerca=" + ricerca + "&tipo_argomento=" + argomento + "&tipo_stato=" + tipo + "", function (dati) {
        var blocco_servizi = "";
        var lunghezza = dati.length;


        $.each(dati, function (i, argomenti_filtrati) {


            blocco_servizi += "<div class='blog-card animated fadein delay-1'><div class='blog-header'><div class='blog-author'><span class='titolo_storico'>" + argomenti_filtrati.titolo + "</span> </div></div>";

            blocco_servizi += "<div class='blog-image'>  <img src='http://simplyappweb.mvclienti.com/Account/Uploads/Servizi/galleria_img/immagini/" + argomenti_filtrati.immagine + "' rel='external' alt=''/></div>";

            blocco_servizi += "<div class='blog-preview p-20'><p>" + argomenti_filtrati.descrizione_breve + "</p><div class='btn_storico'><a href='#' onclick='modificaServizio(\"" + argomenti_filtrati.ID + "\");' class='waves-effect waves-light btn primary-color'><span class='ion-edit'></span></a><a href='#' onclick='cancellaServizio(\"" + argomenti_filtrati.ID + "\");' class='waves-effect waves-light btn primary-color'><span class='ion-close-circled'></span></a></div></div></div>";
        });
        if (lunghezza == 0) {
            blocco_servizi += "<div class='modal-content'><h4>No " + localStorage.getItem("argomento_filtri") + " </h4><p>Nessun\a " + localStorage.getItem("argomento_filtri") + "  trovata dopo la ricerca!!</p></div>";
            blocco_servizi += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#no_servizi_cat").html("");
            $("#no_servizi_cat").append(blocco_servizi);
            $("#apri_no_servizi_cat").click();
            $("#si_fixed_footer_servizi").show();
            $("#no_fixed_footer_servizi").hide();
        }

        if (lunghezza != 0) {
            $(".appendi_servizi").append(blocco_servizi);
            $("#si_fixed_footer_servizi").hide();
            $("#no_fixed_footer_servizi").show();
        }

    });

}

function cancellaServizio(ID_servizio) {
    $.ajax({
        type: "POST",
        data: '{ID:"' + ID_servizio + '", ID_utente:"' + localStorage.getItem("ID_utente") + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/servizi_app.aspx/cancellaServizio',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;
            if (ritorno == "si") {
                var siCancellaNews = "<div class='modal-content'><h4>Servizio eliminato </h4><p>Servizio eliminato con successo!!</p></div>";
                siCancellaNews += "<div class='modal-footer'> <a href='#' onclick='recuperaServizi()' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_cancellazione_servizio").html("");
                $("#box_cancellazione_servizio").append(siCancellaNews);
                $("#apri_box_cancellazione_servizio").click();
            } else {
                var noCancellaNews = "<div class='modal-content'><h4>Servizio non eliminato </h4><p>Servizio non eliminato!!<br>Si prega di riprovare. </p></div>";
                noCancellaNews += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_cancellazione_servizio").html("");
                $("#box_cancellazione_servizio").append(noCancellaNews);
                $("#apri_box_cancellazione_servizio").click();
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

function modificaServizio(ID) {

    localStorage.setItem('id_modifica_argomento', ID);
    $.mobile.pageContainer.pagecontainer("change", "#modifica_servizio", {
        transition: 'flip',

    });

}

function selezionoServizioModifica() {

    var ID = localStorage.getItem("ID_utente");
    var id_prodotto = localStorage.getItem('id_modifica_argomento');
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/seleziono_servizio.aspx?id_servizio=" + id_prodotto + "&ID_utente=" + ID + "", function (dati) {
        // var blocco_news = "";
        // Continuo da qui
        var lunghezza = dati.length;

        $.each(dati, function (i, argomento) {
            tinyMCE.triggerSave();
            $("#lbl_servizio_posizione").addClass("active");
            $("#posizione_servizio_modifica").val(argomento.posizione);
            $("#lbl_servizio_titolo").addClass("active");
            $("#titolo_servizio_modifica").val(argomento.titolo);
            $("#lbl_servizio_titolo_en").addClass("active");
            $("#titolo_en_servizio_modifica").val(argomento.titolo_en);
            $("#lbl_servizio_titolo_fr").addClass("active");
            $("#titolo_fr_servizio_modifica").val(argomento.titolo_fr); 
            tinyMCE.get('descrizione_breve_servizio_modifica').setContent(argomento.descrizione_breve);
            tinyMCE.get('descrizione_breve_en_servizio_modifica').setContent(argomento.descrizione_breve_en);
            tinyMCE.get('descrizione_breve_fr_servizio_modifica').setContent(argomento.descrizione_breve_fr);
            tinyMCE.get('descrizione_servizio_modifica').setContent(argomento.descrizione);
            tinyMCE.get('descrizione_en_servizio_modifica').setContent(argomento.descrizione_en);
            tinyMCE.get('descrizione_fr_servizio_modifica').setContent(argomento.descrizione_fr);

        });

    });
    // Qua faccio funzione seleziono media dell' argomento
    selezionoMediaServizio();

}

function selezionoMediaServizio() {

    var id_argomento = localStorage.getItem('id_modifica_argomento')
    var argomento = "Servizi";
    var ID = localStorage.getItem("ID_utente");
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/seleziono_media_argomento.aspx?id_argomento=" + id_argomento + "&argomento=" + argomento + "&ID_utente=" + ID + "", function (dati) {
        // var blocco_news = "";
        var lunghezza = dati.length;
        var immagine = "";
        $.each(dati, function (i, media) {

            immagine = "<div class='grid-item gallery-item-card ' id='" + media.ID + "'> <img src='http://simplyappweb.mvclienti.com/Account/Uploads/Servizi/galleria_img/immagini/" + media.immagine + "' rel='external' alt='image'>";
            immagine += "<div onclick='cancellaFotoModificaServizio(\"" + media.ID + "\");'  class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_modifica_servizio").append(immagine);
        });

    });
}

function cancellaFotoModificaServizio(ID) {

    $("#" + ID + "").hide();
    var argomento = "Servizi";
    // La vado a cancellare sul server
    // Cancello News 
    $.ajax({
        type: "POST",
        data: '{ID:"' + ID + '",ID_utente: "' + localStorage.getItem('ID_utente') + '",argomento: "' + argomento + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/servizi_app.aspx/cancelloMediaArgomento',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;

            if (ritorno == "si") {
                var siCancellaMediaArgomento = "<div class='modal-content'><h4>Foto eliminata </h4><p>Foto eliminta con successo!!</p></div>";
                siCancellaMediaArgomento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_cancellazione_media_servizio").html("");
                $("#box_cancellazione_media_servizio").append(siCancellaMediaArgomento);
                $("#apri_box_cancellazione_media_servizio").click();
            } else {
                var noCancellaMediaArgomento = "<div class='modal-content'><h4>Foto non eliminata </h4><p>Foto non eliminata!!<br>Si prega di riprovare. </p></div>";
                noCancellaMediaArgomento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_cancellazione_media_servizio").html("");
                $("#box_cancellazione_media_servizio").append(noCancellaMediaArgomento);
                $("#apri_box_cancellazione_media_servizio").click();
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

function aggiornaServizio(posizione, titolo, titolo_en, titolo_fr, descrizione_breve, descrizione_breve_en, descrizione_breve_fr, descrizione, descrizione_en, descrizione_fr) {


    
    $.ajax({
        type: "POST",
        data: '{posizione:"' + posizione + '",titolo:"' + titolo + '",titolo_en:"' + titolo_en + '",titolo_fr:"' + titolo_fr + '", descrizione_breve:"' + descrizione_breve + '",descrizione_breve_en:"' + descrizione_breve_en + '",descrizione_breve_fr:"' + descrizione_breve_fr + '",descrizione:"' + descrizione + '",descrizione_en:"' + descrizione_en + '",descrizione_fr:"' + descrizione_fr + '", ID_utente:"' + localStorage.getItem("ID_utente") + '", ID_servizio: "' + localStorage.getItem('id_modifica_argomento') + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/aggiorno_prodotto.aspx/updateServizio',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;

            if (ritorno == "Si") {
                var siCaricamento = "<div class='modal-content'><h4>Servizio Aggiornato </h4><p>Servizio aggiornato correttamente</p></div>";
                siCaricamento += "<div class='modal-footer'> <a href='#dashboard' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_aggiornamento_servizio").html("");
                $("#box_aggiornamento_servizio").append(siCaricamento);
                $("#apri_box_aggiornamento_servizio").click();
            } else {
                var noCaricamento = "<div class='modal-content'><h4>Servizio non aggiornato </h4><p>Servizio non aggiornato.<br>Si prega di riprovare </p></div>";
                noCaricamento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_aggiornamento_servizio").html("");
                $("#box_aggiornamento_servizio").append(noCaricamento);
                $("#apri_box_aggiornamento_servizio").click();
            }

        },
        error: function (e) {

        }
    });
}

// FINE SERVIZI

// INIZIO SERVIZI CON CATEGORIE

$(document).on("pagebeforeshow", "#serviziCat", function () {
    localStorage.setItem("categoria_servizi_cat", "");
    $(".appendi_categorie_servizi_cat").html("");
    $(".appendi_immagini_categoria").html("");
    $(".append_categoria_aggiunta_servizi_cat").html("");
    $("#titolo_gallery").val("");
    $("#uploadFotoServiziCat").hide();
    var stato_flip = $("#flip-aggiungi-categoria-servizi").prop("checked");
    if (stato_flip == true) {
        $("#flip-aggiungi-categoria-servizi").prop("checked", false);
        $(".ui-flipswitch").removeClass("ui-flipswitch-active");
    }
    //Cancello le foto rimaste nella tabella media del cellulare caricate in precedenza
    db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
    db.transaction(
        // Metodo di chiamata asincrona
        function (tx) {
            tx.executeSql("DELETE FROM categorie_servizi", []);
        },
        function () {
            // alert("Non è stato possibile cancellare la notizia. Riprova");

        },
        function () {
            // alert("Cancellazione effettua");
        }
    )

});

$(document).on("pageshow", "#serviziCat", function () {
    // Seleziono i dati delle categorie della gallery
    var foto = "<img class='circle avatar' src='http://simplyappweb.mvclienti.com/Account/fotoOperatori/" + localStorage.getItem("foto_utente") + "' rel='external' alt=''>";
    $(".appendi_foto_utente_nome").html("");
    $(".appendi_foto_utente_nome").append(foto);
    $("#footer_gallery").addClass("footer_home");
    caricoCategorieServiziCat();
});

$(document).on("pagebeforeshow", "#storicoServiziCat", function () {
    // Ripulisco la pagina dalle parti dinamiche
    $("#si_fixed_footer_servizi_cat").show();
    $("#no_fixed_footer_servizi_cat").hide();
    $("#stato_attivo_filtro_servizi_cat").removeClass("active");
    $("#stato_non_attivo_filtro_servizi_cat").removeClass("active");
    $("#ricerca_servizi_cat").val("");
    $(".appendi_categorie_servizi_cat_filtri").html("");
    $(".appendi_servizi_cat").html("");
    localStorage.setItem("id_precedente", "");
    localStorage.setItem("argomento_filtri", "servizi_cat");
    selezionoCategoriePerFiltriServiziCat();

});

$(document).on("pageshow", "#storicoServiziCat", function () {
    // Seleziono i dati delle categorie della gallery
    var foto = "<img class='circle avatar' src='http://simplyappweb.mvclienti.com/Account/fotoOperatori/" + localStorage.getItem("foto_utente") + "' rel='external' alt=''>";
    $(".appendi_foto_utente_nome").html("");
    $(".appendi_foto_utente_nome").append(foto);
    recuperaServiziCat();
});

$(document).on("pagebeforeshow", "#modifica_servizio_cat", function () {
    var foto = "<img class='circle avatar' src='http://simplyappweb.mvclienti.com/Account/fotoOperatori/" + localStorage.getItem("foto_utente") + "' rel='external' alt=''>";
    $(".appendi_foto_utente_nome").html("");
    $(".appendi_lingue").html("");
    $(".appendi_foto_utente_nome").append(foto);
    var titolo = "<h1>Modifica " + localStorage.getItem("nome_argomento_modifica") + "</h1>";
    $(".appendi_categorie_servizio_cat_modifica").html("");
    $(".appendi_img_modifica_servizio_cat").html("");
    selezionoCategorieSingolaServizioCat();
    selezionoLingue();
    selezionoServizioCatModifica();

});

function caricoCategorieServiziCat() {
    // Carico nella tabella categorie_gallery

    $.getJSON("http://simplyappweb.mvclienti.com/webservices/categorie_servizi.aspx?id_utente=" + localStorage.getItem("ID_utente") + "", function (dati) {
        var li_dati = "";

        $.each(dati, function (i, categoria) {
            // Inserisco dati nel db sqllite dell' App

            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {

                    tx.executeSql("INSERT INTO categorie_servizi (identificativo,nome_categoria,user) VALUES (?,?,?)", [categoria.ID, categoria.nome_categoria, categoria.user]);
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
        selezioneCategorieServiziCat();
    });
}

function selezioneCategorieServiziCat() {

    db.transaction(selezionoCatServiziCat);
}

function selezionoCatServiziCat(tx) {

    // Selezione le categorie aggiornate nella tabella categoria_gallery del telefono
    tx.executeSql("SELECT * FROM categorie_servizi", [],
        function (tx, dati) {
            var len = dati.rows.length;

            var tab_categorie = "<div  class='controls'><label class='lbl_tasti'>Categorie:</label><br>";
            if (len != 0) {
                /* Qua compongo grafica tab categorie */
                for (var i = 0; i < len; i++) {
                    //  alert("ciclo");
                    tab_categorie += " <button style='margin-bottom:10px; margin-top:15px' onclick='clickCategoriaServiziCat(\"" + dati.rows.item(i).identificativo + "\")' class='filter' id='catServizi_cat" + dati.rows.item(i).identificativo + "' >" + dati.rows.item(i).nome_categoria + "</button>"

                }

                tab_categorie += "</div>";
              
            }
            $(".appendi_categorie_servizi_cat").append(tab_categorie);
        },
        function () {
            alert("Errore" + e.message);
        })

    // Qua faccio due selezioni se è ceccato social o se non è ceccato social


}

function caricaCategoriaServiziCatSito(nome_categoria_servizi_cat, posizione_categoria_servizi_cat) {

    $.ajax({
        type: "POST",
        data: '{nome:"' + nome_categoria_servizi_cat + '", posizione: "' + posizione_categoria_servizi_cat + '", user: "' + localStorage.getItem('username') + '", ID_utente: "' + localStorage.getItem('ID_utente') + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/servizi_app.aspx/inseriscoCategoriaServiziCat',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;
            localStorage.setItem("categoria_servizi_cat", ritorno);
            var categoria_aggiunta = "<div  class='controls'><label>Categorie Aggiunta:</label>";
            categoria_aggiunta += "<button style='margin-bottom:10px; margin-top:15px' class='filter active' id='" + ritorno + "' >" + nome_categoria_servizi_cat + "</button>"
            $(".append_categoria_aggiunta_servizi_cat").append(categoria_aggiunta);
            localStorage.setItem("categoria_servizi_cat", ritorno);
          


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

$("#flip-aggiungi-categoria-servizi").bind("change", function (event, ui) {
    localStorage.setItem('argomento', 'servizi');
    $.mobile.pageContainer.pagecontainer("change", "#categorie", {
        transition: 'flip',
    });

});

function caricaSulSitoServiziCat(posizione, nome, nome_en, nome_fr, descrizione_breve, descrizione_breve_en, descrizione_breve_fr, descrizione, descrizione_en, descrizione_fr) {


    $.ajax({
        type: "POST",
        data: '{posizione:"' + posizione + '",nome:"' + nome + '",nome_en:"' + nome_en + '",nome_fr:"' + nome_fr + '", ID_categoria:"' + localStorage.getItem('categoria_servizi_cat') + '", descrizione_breve:"' + descrizione_breve + '",descrizione_breve_en:"' + descrizione_breve_en + '",descrizione_breve_fr:"' + descrizione_breve_fr + '",descrizione:"' + descrizione + '",descrizione_en:"' + descrizione_en + '",descrizione_fr:"' + descrizione_fr + '",ID_utente:"' + localStorage.getItem("ID_utente") + '", user:"' + localStorage.getItem("username") + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/carica_argomento_app.aspx/caricaServiziCat',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;

            if (ritorno == "Si") {
                var siCaricamento = "<div class='modal-content'><h4>Servizio Caricato </h4><p>Servizio Caricato con successo</p></div>";
                siCaricamento += "<div class='modal-footer'> <a href='#storicoServiziCat'  class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_caricamento_servizi_cat").html("");
                $("#box_caricamento_servizi_cat").append(siCaricamento);
                $("#apri_box_caricamento_servizi_cat").click();
            } else {
                var noCaricamento = "<div class='modal-content'><h4>Argomento non caricato </h4><p>Servizio non caricato.<br>Si prega di riprovare </p></div>";
                noCaricamento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_caricamento_servizi_cat").html("");
                $("#box_caricamento_servizi_cat").append(noCaricamento);
                $("#apri_box_caricamento_servizi_cat").click();
            }

        },
        error: function (e) {

        }
    });

   
}

function clickCategoriaServiziCat(categoria) {

   
    localStorage.setItem('categoria_servizi_cat', categoria);
    $("#catServizi_cat" + categoria + "").addClass("active");

}

function selezionoCategoriePerFiltriServiziCat() {
    // Faccio la selezione dal server delle new di questo utente

    $.getJSON("http://simplyappweb.mvclienti.com/webservices/categorie_servizi.aspx?id_utente=" + localStorage.getItem("ID_utente") + "", function (dati) {
        var id_selezionato = "";
        var tab_categorie = "<div  class='controls'><label class='lbl_tasti'>Filtri per Categoria:</label><br>";
        $.each(dati, function (i, categorie) {
            // Inserisco dati nel db sqllite dell' App
            tab_categorie += "<button style='margin-bottom:10px; margin-top:15px' onclick='clickFiltroPerCategoriaServiziCat(\"" + categorie.ID + "\")' class='filter' id='catservizi_cat" + categorie.ID + "' >" + categorie.nome_categoria + "</button>"
        });
        tab_categorie += "</div>";
        $(".appendi_categorie_servizi_cat_filtri").append(tab_categorie);
        // Qua seleziono i dati della singola foto con una funzione

    });
}

function recuperaServiziCat() {
    $(".appendi_servizi_cat").html("");
    // Faccio la selezione dal server delle new di questo utente
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/storico_servizi_cat.aspx?id_utente=" + localStorage.getItem("ID_utente") + "", function (dati) {
        var blocco_servizi = "";
        var lunghezza = dati.length;
        var Servizi = "Servizi";

        $.each(dati, function (i, servizi) {


            blocco_servizi += "<div class='blog-card animated fadein delay-1'><div class='blog-header'><div class='blog-author'><span class='titolo_storico'>" + servizi.nome + "</span> <span class='small'>" + servizi.nome_categoria + "</span></div></div>";

            blocco_servizi += "<div class='blog-image'>  <img src='http://simplyappweb.mvclienti.com/Account/Uploads/Servizi_cat/galleria_img/immagini/" + servizi.immagine + "' rel='external' alt=''/></div>";

            blocco_servizi += "<div class='blog-preview p-20'><p>" + servizi.descrizione_breve + "</p><div class='btn_storico'><a href='#' onclick='modificaServizioCat(\"" + servizi.ID + "\",\"" + servizi.nome_categoria + "\");' class='waves-effect waves-light btn accent-color'><span class='ion-edit'></span></a><a href='#' onclick='cancellaServizio_cat(\"" + servizi.ID + "\");' class='waves-effect waves-light btn accent-color'><span class='ion-close-circled'></span></a></div></div></div>";
        });
        if (lunghezza == 0) {
            blocco_servizi += "<div class='modal-content'><h4>No Realizzazioni </h4><p>Non vi sono realizzazioni salvate!!</p></div>";
            blocco_servizi += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#no_servizi_cat").html("");
            $("#no_servizi_cat").append(blocco_servizi);
            $("#apri_no_servizi_cat").click();
        }

        if (lunghezza != 0) {

            $(".appendi_servizi_cat").append(blocco_servizi);
            $("#si_fixed_footer_servizi_cat").hide();
            $("#no_fixed_footer_servizi_cat").show();
        }

    });
}

$("#flip-storico-servizi-cat").bind("change", function (event, ui) {
    $("#filtri_servizi_cat").toggle();
    var stato_flip = $("#flip-storico-servizi-cat").prop("checked");
    if (stato_flip == true) {

    }
    if (stato_flip == false) {


    }

});

function filtraArgomentoServiziCat(stato, tipo) {


    if (stato == "si" && tipo == "Attivo") {
        $("#stato_attivo_filtro_servizi_cat").addClass("active");
        $("#stato_non_attivo_filtro_servizi_cat").removeClass("active");
    }
    if (stato == "si" && tipo == "Non Attivo") {
        $("#stato_attivo_filtro_servizi_cat").removeClass("active");
        $("#stato_non_attivo_filtro_servizi_cat").addClass("active");
    }

    var argomento_giusto = "servizi_cat"
    var ricerca_valore = $("#ricerca_servizi_cat").val();
    if (ricerca_valore != "") {
        ricerca = ricerca_valore;
    } else {
        ricerca = "";
    }

    var argomento = localStorage.getItem("argomento_filtri");

    $(".appendi_servizi_cat").html("");
   
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/storico_servizi_cat_filtri.aspx?id_utente=" + localStorage.getItem("ID_utente") + "&stato=" + stato + "&ricerca=" + ricerca + "&tipo_argomento=" + argomento + "&tipo_stato=" + tipo + "", function (dati) {
        var blocco_servizi = "";
        var lunghezza = dati.length;


        $.each(dati, function (i, argomenti_filtrati) {


            blocco_servizi += "<div class='blog-card animated fadein delay-1'><div class='blog-header'><div class='blog-author'><span class='titolo_storico'>" + argomenti_filtrati.nome + "</span> <span class='small'>" + argomenti_filtrati.nome_categoria + "</span></div></div>";

            blocco_servizi += "<div class='blog-image'>  <img src='http://simplyappweb.mvclienti.com/Account/Uploads/Servizi_cat/galleria_img/immagini/" + argomenti_filtrati.immagine + "' rel='external' alt=''/></div>";

            blocco_servizi += "<div class='blog-preview p-20'><p>" + argomenti_filtrati.descrizione_breve + "</p><div class='btn_storico'><a href='#' onclick='modificaServizioCat(\"" + argomenti_filtrati.ID + "\",\"" + argomenti_filtrati.nome_categoria + "\");' class='waves-effect waves-light btn primary-color'><span class='ion-edit'></span></a><a href='#' onclick='cancellaServizio_cat(\"" + argomenti_filtrati.ID + "\");' class='waves-effect waves-light btn primary-color'><span class='ion-close-circled'></span></a></div></div></div>";
        });
        if (lunghezza == 0) {
            blocco_servizi += "<div class='modal-content'><h4>No Servizi </h4><p>Nessun servizio  trovata dopo la ricerca!!</p></div>";
            blocco_servizi += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#no_servizi_c_cat").html("");
            $("#no_servizi_c_cat").append(blocco_servizi);
            $("#apri_no_servizi_c_cat").click();
            $("#si_fixed_footer_servizi_cat").show();
            $("#no_fixed_footer_servizi_cat").hide();
        }

        if (lunghezza != 0) {
            $(".appendi_servizi_cat").append(blocco_servizi);
            $("#si_fixed_footer_servizi_cat").hide();
            $("#no_fixed_footer_servizi_cat").show();
        }

    });

}

function clickFiltroPerCategoriaServiziCat(ID_categoria) {


    $("#catservizi_cat" + ID_categoria + "").addClass("active");
    if (localStorage.getItem("id_precedente") != "") {
        $("#catservizi_cat" + localStorage.getItem("id_precedente") + "").removeClass("active");
    }
    localStorage.setItem("id_precedente", ID_categoria);
    $(".appendi_servizi_cat").html("");
    // Applico filtri
    // Faccio la selezione dal server delle new di questo utente
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/storico_servizi_filtri_categorie.aspx?id_utente=" + localStorage.getItem("ID_utente") + "&id_categoria=" + ID_categoria + "", function (dati) {
        var blocco_servizi = "";
        var lunghezza = dati.length;
        var Prodotti = "Servizi";

        $.each(dati, function (i, servizi) {

            blocco_servizi += "<div class='blog-card animated fadein delay-1'><div class='blog-header'><div class='blog-author'><span class='titolo_storico'>" + servizi.nome + "</span> <span class='small'>" + servizi.nome_categoria + "</span></div></div>";

            blocco_servizi += "<div class='blog-image'>  <img src='http://simplyappweb.mvclienti.com/Account/Uploads/Servizi_cat/galleria_img/immagini/" + servizi.immagine + "' rel='external' alt=''/></div>";

            blocco_servizi += "<div class='blog-preview p-20'><p>" + servizi.descrizione_breve + "</p><div class='btn_storico'><a href='#' onclick='modificaServizioCat(\"" + servizi.ID + "\",\"" + servizi.nome_categoria + "\");' class='waves-effect waves-light btn accent-color'><span class='ion-edit'></span></a><a href='#' onclick='cancellaServizio_cat(\"" + servizi.ID + "\");' class='waves-effect waves-light btn accent-color'><span class='ion-close-circled'></span></a></div></div></div>";


        });

        if (lunghezza == 0) {
            blocco_servizi += "<div class='modal-content'><h4>No Servizi </h4><p>Non vi sono servizi per questa categoria!!</p></div>";
            blocco_servizi += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#no_servizi_c_cat").html("");
            $("#no_servizi_c_cat").append(blocco_servizi);
            $("#apri_no_servizi_c_cat").click();
            $("#si_fixed_footer_servizi_cat").show();
            $("#no_fixed_footer_servizi_cat").hide();
        }

        if (lunghezza != 0) {

            $(".appendi_servizi_cat").append(blocco_servizi);
            $("#si_fixed_footer_servizi_cat").hide();
            $("#no_fixed_footer_servizi_cat").show();
        }



    });
}

function cancellaServizio_cat(ID_realizzazione) {
    $.ajax({
        type: "POST",
        data: '{ID:"' + ID_realizzazione + '", ID_utente:"' + localStorage.getItem("ID_utente") + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/servizi_app.aspx/cancellaServizioCat',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;
          
            if (ritorno == "si") {
                var siCancellaNews = "<div class='modal-content'><h4>Servizio eliminato </h4><p>Servizio eliminato con successo!!</p></div>";
                siCancellaNews += "<div class='modal-footer'> <a href='#' onclick='recuperaServiziCat()' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_cancellazione_servizi_cat").html("");
                $("#box_cancellazione_servizi_cat").append(siCancellaNews);
                $("#apri_box_cancellazione_servizi_cat").click();
            } else {
                var noCancellaNews = "<div class='modal-content'><h4>Servizio non eliminato </h4><p>servizio non eliminato!!<br>Si prega di riprovare. </p></div>";
                noCancellaNews += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_cancellazione_servizi_cat").html("");
                $("#box_cancellazione_servizi_cat").append(noCancellaNews);
                $("#apri_box_cancellazione_servizi_cat").click();
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

function modificaServizioCat(ID, nome_categoria) {

    // Imposto il local storage per la modifica
    localStorage.setItem("nome_categoria_singola_servizio_cat", nome_categoria);
    localStorage.setItem('id_modifica_argomento', ID);

    $.mobile.pageContainer.pagecontainer("change", "#modifica_servizio_cat", {
        transition: 'flip',

    });

}

function selezionoCategorieSingolaServizioCat() {
    var nome_categoria = localStorage.getItem("nome_categoria_singola_servizio_cat")

    // Faccio la selezione dal server delle new di questo utente
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/categorie_servizi.aspx?id_utente=" + localStorage.getItem("ID_utente") + "", function (dati) {
        var id_selezionato = "";
        var tab_categorie = "<div  class='controls'><label class='lbl_tasti'>Categorie:</label><br>";

        var count = 0

        $.each(dati, function (i, categorie) {

            // Inserisco dati nel db sqllite dell' App
            if (nome_categoria == categorie.nome_categoria) {

                tab_categorie += "<button style='margin-bottom:10px; margin-top:15px' onclick='clickCategoriaModificaServizioCat(\"" + categorie.ID + "\")' class='active filter' id='catServizioCat" + categorie.ID + "' >" + categorie.nome_categoria + "</button>"
                localStorage.setItem('id_categoria_selezionato', categorie.ID);
                localStorage.setItem('id_categoria_servizio_cat_modifica_singolo', categorie.ID);

            } else {

                tab_categorie += "<button style='margin-bottom:10px; margin-top:15px' onclick='clickCategoriaModificaServizioCat(\"" + categorie.ID + "\")' class='filter' id='catServizioCat" + categorie.ID + "' >" + categorie.nome_categoria + "</button>"
            }


        });
        tab_categorie += "</div>";


      

        $(".appendi_categorie_servizio_cat_modifica").append(tab_categorie);
        // Qua seleziono i dati della singola foto con una funzione

    });
}

function selezionoServizioCatModifica() {

    var ID = localStorage.getItem("ID_utente");
    var id_prodotto = localStorage.getItem('id_modifica_argomento');
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/seleziono_servizio_cat.aspx?id_prodotto=" + id_prodotto + "&ID_utente=" + ID + "", function (dati) {
        // var blocco_news = "";
        // Continuo da qui
        var lunghezza = dati.length;

        $.each(dati, function (i, argomento) {
            tinyMCE.triggerSave();
            $("#lbl_servizio_cat_posizione").addClass("active");
            $("#posizione_servizio_cat_modifica").val(argomento.posizione);
            $("#lbl_servizio_cat_nome").addClass("active");
            $("#nome_servizio_cat_modifica").val(argomento.nome);
            $("#lbl_servizio_cat_nome_en").addClass("active");
            $("#nome_en_servizio_cat_modifica").val(argomento.nome_en);
            $("#lbl_servizio_cat_nome_fr").addClass("active");
            $("#nome_fr_servizio_cat_modifica").val(argomento.nome_fr);
            tinyMCE.get('descrizione_breve_servizio_cat_modifica').setContent(argomento.descrizione_breve);
            tinyMCE.get('descrizione_breve_en_servizio_cat_modifica').setContent(argomento.descrizione_breve_en);
            tinyMCE.get('descrizione_breve_fr_servizio_cat_modifica').setContent(argomento.descrizione_breve_fr);       
            tinyMCE.get('descrizione_servizio_cat_modifica').setContent(argomento.descrizione);
            tinyMCE.get('descrizione_en_servizio_cat_modifica').setContent(argomento.descrizione_en);
            tinyMCE.get('descrizione_fr_servizio_cat_modifica').setContent(argomento.descrizione_fr);

        });

    });
    // Qua faccio funzione seleziono media dell' argomento
    selezionoMediaServizioCat();

}

function selezionoMediaServizioCat() {

    var id_argomento = localStorage.getItem('id_modifica_argomento')
    var argomento = "Servizi_cat";
    var ID = localStorage.getItem("ID_utente");
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/seleziono_media_argomento.aspx?id_argomento=" + id_argomento + "&argomento=" + argomento + "&ID_utente=" + ID + "", function (dati) {
        // var blocco_news = "";
        var lunghezza = dati.length;
        var immagine = "";
        $.each(dati, function (i, media) {

            immagine = "<div class='grid-item gallery-item-card ' id='" + media.ID + "'> <img src='http://simplyappweb.mvclienti.com/Account/Uploads/Servizi_cat/galleria_img/immagini/" + media.immagine + "' rel='external' alt='image'>";
            immagine += "<div onclick='cancellaFotoModificaServizioCat(\"" + media.ID + "\");'  class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_modifica_servizio_cat").append(immagine);
        });

    });
}

function clickCategoriaModificaServizioCat(ID_categoria) {

    localStorage.setItem('id_categoria_servizio_cat_modifica_singolo', ID_categoria);
    id_selezionato = localStorage.getItem('id_categoria_selezionato');
    document.getElementById("catServizioCat" + id_selezionato).classList.remove("active");
    document.getElementById("catServizioCat" + ID_categoria).classList.add("active");
}

function cancellaFotoModificaServizioCat(ID) {

    $("#" + ID + "").hide();
    var argomento = "Servizi_cat";
    // La vado a cancellare sul server
    // Cancello News 
    $.ajax({
        type: "POST",
        data: '{ID:"' + ID + '",ID_utente: "' + localStorage.getItem('ID_utente') + '",argomento: "' + argomento + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/servizi_app.aspx/cancelloMediaArgomento',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;

            if (ritorno == "si") {
                var siCancellaMediaArgomento = "<div class='modal-content'><h4>Foto eliminata </h4><p>Foto eliminta con successo!!</p></div>";
                siCancellaMediaArgomento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_cancellazione_media_servizio_cat").html("");
                $("#box_cancellazione_media_servizio_cat").append(siCancellaMediaArgomento);
                $("#apri_box_cancellazione_media_servizio_cat").click();
            } else {
                var noCancellaMediaArgomento = "<div class='modal-content'><h4>Foto non eliminata </h4><p>Foto non eliminata!!<br>Si prega di riprovare. </p></div>";
                noCancellaMediaArgomento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_cancellazione_media_servizio_cat").html("");
                $("#box_cancellazione_media_servizio_cat").append(noCancellaMediaArgomento);
                $("#apri_box_cancellazione_media_servizio_cat").click();
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

function aggiornaServizioCat(posizione, nome, nome_en, nome_fr, descrizione_breve, descrizione_breve_en, descrizione_breve_fr, descrizione, descrizione_en, descrizione_fr) {


    
    var ID_categoria = localStorage.getItem('id_categoria_servizio_cat_modifica_singolo');

    $.ajax({
        type: "POST",
        data: '{posizione:"' + posizione + '",nome:"' + nome + '",nome_en:"' + nome_en + '",nome_fr:"' + nome_fr + '",id_categoria:"' + ID_categoria + '",descrizione_breve:"' + descrizione_breve + '",descrizione_breve_en:"' + descrizione_breve_en + '",descrizione_breve_fr:"' + descrizione_breve_fr + '",descrizione:"' + descrizione + '", descrizione_en:"' + descrizione_fr + '", descrizione_fr:"' + descrizione_fr + '", ID_utente:"' + localStorage.getItem("ID_utente") + '", ID_servizio: "' + localStorage.getItem('id_modifica_argomento') + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/aggiorno_prodotto.aspx/updateServizioCat',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;
         
            if (ritorno == "Si") {
                var siCaricamento = "<div class='modal-content'><h4>Servizio Aggiornato </h4><p>Servizio aggiornato correttamente</p></div>";
                siCaricamento += "<div class='modal-footer'> <a href='#dashboard' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_aggiornamento_servizio_cat").html("");
                $("#box_aggiornamento_servizio_cat").append(siCaricamento);
                $("#apri_box_aggiornamento_servizio_cat").click();
            } else {
                var noCaricamento = "<div class='modal-content'><h4>Servizio non aggiornato </h4><p>Servizio non aggiornato.<br>Si prega di riprovare </p></div>";
                noCaricamento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_aggiornamento_servizio_cat").html("");
                $("#box_aggiornamento_servizio_cat").append(noCaricamento);
                $("#apri_box_aggiornamento_servizio_cat").click();
            }

        },
        error: function (e) {

        }
    });
}

// FINE SERVIZI CON CATEGORIE

// INIZIO CERTIFICAZIONI

$(document).on("pagebeforeshow", "#certificazioni", function () {
    localStorage.setItem("categoria_realizzazione", "");
    $(".appendi_categorie_realizzazioni").html("");
    $(".appendi_immagini_categoria").html("");
    $(".appendi_lingue").html("");
    $(".append_categoria_aggiunta_realizzazione").html("");
    $("#posizione_certificazione").val("");
    $("#titolo_certificazione").val("");
    $("#titolo_en_certificazione").val("");
    $("#titolo_fr_certificazione").val("");
    tinyMCE.get('descrizione_breve_certificazione').setContent("");
    tinyMCE.get('descrizione_breve_en_certificazione').setContent("");
    tinyMCE.get('descrizione_breve_fr_certificazione').setContent("");
    tinyMCE.get('descrizione_certificazione').setContent("");
    tinyMCE.get('descrizione_en_certificazione').setContent("");
    tinyMCE.get('descrizione_fr_certificazione').setContent("");
    $("#uploadFotoRealizzazione").hide();
    //Cancello le foto rimaste nella tabella media del cellulare caricate in precedenza
    db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
    db.transaction(
        // Metodo di chiamata asincrona
        function (tx) {
            tx.executeSql("DELETE FROM categorie_realizzazioni", []);
        },
        function () {
            // alert("Non è stato possibile cancellare la notizia. Riprova");

        },
        function () {
            // alert("Cancellazione effettua");
        }
    )
    selezionoLingue();
});

$(document).on("pageshow", "#certificazioni", function () {
    // Seleziono i dati delle categorie della gallery
    var foto = "<img class='circle avatar' src='http://simplyappweb.mvclienti.com/Account/fotoOperatori/" + localStorage.getItem("foto_utente") + "' rel='external' alt=''>";
    $(".appendi_foto_utente_nome").html("");
    $(".appendi_foto_utente_nome").append(foto);
    $("#footer_gallery").addClass("footer_home");

});

$(document).on("pagebeforeshow", "#storicoCertificazioni", function () {
    // Ripulisco la pagina dalle parti dinamiche
    $("#si_fixed_footer_certificazioni").show();
    $("#no_fixed_footer_certificazioni").hide();
    $("#stato_attivo_filtro").removeClass("active");
    $("#stato_non_attivo_filtro").removeClass("active");
    $("#ricerca_certificazione").val("");
    $(".appendi_certificazioni").html("");
    localStorage.setItem("argomento_filtri", "certificazioni");



});

$(document).on("pageshow", "#storicoCertificazioni", function () {
    // Seleziono i dati delle categorie della gallery
    var foto = "<img class='circle avatar' src='http://simplyappweb.mvclienti.com/Account/fotoOperatori/" + localStorage.getItem("foto_utente") + "' rel='external' alt=''>";
    $(".appendi_foto_utente_nome").html("");
    $(".appendi_foto_utente_nome").append(foto);
    recuperaCertificazioni();
});

$(document).on("pagebeforeshow", "#modifica_certificazione", function () {
    var foto = "<img class='circle avatar' src='http://simplyappweb.mvclienti.com/Account/fotoOperatori/" + localStorage.getItem("foto_utente") + "' rel='external' alt=''>";
    $(".appendi_foto_utente_nome").html("");
    $(".appendi_foto_utente_nome").append(foto);
    var titolo = "<h1>Modifica " + localStorage.getItem("nome_argomento_modifica") + "</h1>";

    $(".appendi_img_modifica_certificazione").html("");
    $(".appendi_lingue").html("");
    selezionoLingue();
    selezionoCertificazioneModifica();

});

function clickCertificazioni() {
    localStorage.setItem('argomento', 'Certificazioni');
    $("#prodotti").addClass("active");
    $.mobile.pageContainer.pagecontainer("change", "#certificazioni", {
        transition: 'flip',
    });

}

function clickAppartamenti() {
    localStorage.setItem('argomento', 'Appartamenti');
    $.mobile.pageContainer.pagecontainer("change", "#appartamenti", {
        transition: 'flip',
    });

}

function clickCertificazioniStorico() {

    $.mobile.pageContainer.pagecontainer("change", "#storicoCertificazioni", {
        transition: 'flip',
    });
}

function clickAppartamentiStorico() {

    $.mobile.pageContainer.pagecontainer("change", "#storicoAppartamenti", {
        transition: 'flip',
    });
}


function caricaSulSitoCertificazione(posizione, titolo, titolo_en, titolo_fr, descrizione_breve, descrizione_breve_en, descrizione_breve_fr, descrizione, descrizione_en, descrizione_fr) {


   
    $.ajax({
        type: "POST",
        data: '{posizione:"' + posizione + '", titolo:"' + titolo + '", titolo_en:"' + titolo_en + '", titolo_fr:"' + titolo_fr + '", descrizione_breve:"' + descrizione_breve + '", descrizione_breve_en:"' + descrizione_breve_en + '", descrizione_breve_fr:"' + descrizione_breve_fr + '",descrizione:"' + descrizione + '", descrizione_en:"' + descrizione_en + '", descrizione_fr:"' + descrizione_fr + '",ID_utente:"' + localStorage.getItem("ID_utente") + '", user:"' + localStorage.getItem("username") + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/carica_argomento_app.aspx/caricaCertificazione',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;

            if (ritorno == "Si") {
                var siCaricamento = "<div class='modal-content'><h4>Certificazione Caricata </h4><p>Certificazione caricata con successo</p></div>";
                siCaricamento += "<div class='modal-footer'> <a href='#storicoCertificazioni'  class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_caricamento_certificazione").html("");
                $("#box_caricamento_certificazione").append(siCaricamento);
                $("#apri_box_caricamento_certificazione").click();
            } else {
                var noCaricamento = "<div class='modal-content'><h4>Certificazione non caricata </h4><p>Certificazione non caricata.<br>Si prega di riprovare </p></div>";
                noCaricamento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_caricamento_certificazione").html("");
                $("#box_caricamento_certificazione").append(noCaricamento);
                $("#apri_box_caricamento_servizio").click();
            }

        },
        error: function (e) {

        }
    });
}

function recuperaCertificazioni() {
    $(".appendi_certificazioni").html("");
    // Faccio la selezione dal server delle new di questo utente
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/storico_certificazioni.aspx?id_utente=" + localStorage.getItem("ID_utente") + "", function (dati) {
        var blocco_certificazioni = "";
        var lunghezza = dati.length;
        var Certificazioni = "Certificazioni";

        $.each(dati, function (i, certificazioni) {


            blocco_certificazioni += "<div class='blog-card animated fadein delay-1'><div class='blog-header'><div class='blog-author'><span class='titolo_storico'>" + certificazioni.titolo + "</span></div></div>";

            blocco_certificazioni += "<div class='blog-image'>  <img src='http://simplyappweb.mvclienti.com/Account/Uploads/Certificazioni/galleria_img/immagini/" + certificazioni.immagine + "' rel='external' alt=''/></div>";

            blocco_certificazioni += "<div class='blog-preview p-20'><p>" + certificazioni.descrizione_breve + "</p><div class='btn_storico'><a href='#' onclick='modificaCertificazione(\"" + certificazioni.ID + "\");' class='waves-effect waves-light btn accent-color'><span class='ion-edit'></span></a><a href='#' onclick='cancellaCertificazione(\"" + certificazioni.ID + "\");' class='waves-effect waves-light btn accent-color'><span class='ion-close-circled'></span></a></div></div></div>";
        });
        if (lunghezza == 0) {
            blocco_certificazioni += "<div class='modal-content'><h4>No Servizi </h4><p>Non vi sono servizi salvati!!</p></div>";
            blocco_certificazioni += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#no_certificazioni").html("");
            $("#no_certificazioni").append(blocco_certificazioni);
            $("#apri_no_certificazioni").click();
        }

        if (lunghezza != 0) {

            $(".appendi_certificazioni").append(blocco_certificazioni);
            $("#si_fixed_footer_certificazioni").hide();
            $("#no_fixed_footer_certificazioni").show();
        }

    });
}

$("#flip-storico-certificazioni").bind("change", function (event, ui) {
    $("#filtri_certificazioni").toggle();
    var stato_flip = $("#flip-storico-certificazioni").prop("checked");
    if (stato_flip == true) {

    }
    if (stato_flip == false) {


    }

});

function filtraArgomentoCertificazione(stato, tipo) {


    if (stato == "si" && tipo == "Attivo") {
        $("#stato_attivo_filtro_certificazioni").addClass("active");
        $("#stato_non_attivo_filtro_certificazioni").removeClass("active");
    }
    if (stato == "si" && tipo == "Non Attivo") {
        $("#stato_attivo_filtro_certificazioni").removeClass("active");
        $("#stato_non_attivo_filtro_certificazioni").addClass("active");
    }

    var argomento_giusto = "certificazioni"
    var ricerca_valore = $("#ricerca_certificazione").val();
    if (ricerca_valore != "") {
        ricerca = ricerca_valore;
    } else {
        ricerca = "";
    }

    var argomento = localStorage.getItem("argomento_filtri");

    $(".appendi_certificazioni").html("");
   
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/storico_certificazioni_filtri.aspx?id_utente=" + localStorage.getItem("ID_utente") + "&stato=" + stato + "&ricerca=" + ricerca + "&tipo_argomento=" + argomento + "&tipo_stato=" + tipo + "", function (dati) {
        var blocco_certificazioni = "";
        var lunghezza = dati.length;

     

        $.each(dati, function (i, argomenti_filtrati) {

         
            blocco_certificazioni += "<div class='blog-card animated fadein delay-1'><div class='blog-header'><div class='blog-author'><span class='titolo_storico'>" + argomenti_filtrati.titolo + "</span> </div></div>";

            blocco_certificazioni += "<div class='blog-image'>  <img src='http://simplyappweb.mvclienti.com/Account/Uploads/Certificazioni/galleria_img/immagini/" + argomenti_filtrati.immagine + "' rel='external' alt=''/></div>";

            blocco_certificazioni += "<div class='blog-preview p-20'><p>" + argomenti_filtrati.descrizione_breve + "</p><div class='btn_storico'><a href='#' onclick='modificaCertificazione(\"" + argomenti_filtrati.ID + "\");' class='waves-effect waves-light btn primary-color'><span class='ion-edit'></span></a><a href='#' onclick='cancellaCertificazione(\"" + argomenti_filtrati.ID + "\");' class='waves-effect waves-light btn primary-color'><span class='ion-close-circled'></span></a></div></div></div>";
        });
        if (lunghezza == 0) {
            blocco_certificazioni += "<div class='modal-content'><h4>No Certificazioni </h4><p>Nessun\a certificazione trovata dopo la ricerca!!</p></div>";
            blocco_certificazioni += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#no_certificazioni_cat").html("");
            $("#no_certificazioni_cat").append(blocco_certificazioni);
            $("#apri_no_certificazioni_cat").click();
            $("#si_fixed_footer_certificazioni").show();
            $("#no_fixed_footer_certificazioni").hide();
        }

        if (lunghezza != 0) {
            $(".appendi_certificazioni").append(blocco_certificazioni);
            $("#si_fixed_footer_certificazioni").hide();
            $("#no_fixed_footer_certificazioni").show();
        }

    });

}

function cancellaCertificazione(ID_servizio) {
    $.ajax({
        type: "POST",
        data: '{ID:"' + ID_servizio + '", ID_utente:"' + localStorage.getItem("ID_utente") + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/servizi_app.aspx/cancellaCertificazione',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;
            if (ritorno == "si") {
                var siCancellaNews = "<div class='modal-content'><h4>Certificazione eliminata </h4><p>Certificazione eliminata con successo!!</p></div>";
                siCancellaNews += "<div class='modal-footer'> <a href='#' onclick='recuperaCertificazioni()' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_cancellazione_certificazione").html("");
                $("#box_cancellazione_certificazione").append(siCancellaNews);
                $("#apri_box_cancellazione_certificazione").click();
            } else {
                var noCancellaNews = "<div class='modal-content'><h4>Certificazione non eliminata </h4><p>Certificazione non eliminata!!<br>Si prega di riprovare. </p></div>";
                noCancellaNews += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_cancellazione_certificazione").html("");
                $("#box_cancellazione_certificazione").append(noCancellaNews);
                $("#apri_box_cancellazione_certificazione").click();
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

function modificaCertificazione(ID) {

    
    localStorage.setItem('id_modifica_argomento', ID);
    $.mobile.pageContainer.pagecontainer("change", "#modifica_certificazione", {
        transition: 'flip',

    });

}

function selezionoCertificazioneModifica() {

    var ID = localStorage.getItem("ID_utente");
    var id_prodotto = localStorage.getItem('id_modifica_argomento');
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/seleziono_certificazione.aspx?id_servizio=" + id_prodotto + "&ID_utente=" + ID + "", function (dati) {
        // var blocco_news = "";
        // Continuo da qui
        var lunghezza = dati.length;

        $.each(dati, function (i, argomento) {
            tinyMCE.triggerSave();
            $("#lbl_certificazione_posizione").addClass("active");
            $("#posizione_certificazione_modifica").val(argomento.posizione);
            $("#lbl_certificazione_titolo").addClass("active");
            $("#titolo_certificazione_modifica").val(argomento.titolo);

            $("#lbl_certificazione_titolo_en").addClass("active");
            $("#titolo_en_certificazione_modifica").val(argomento.titolo_en);

            $("#lbl_certificazione_titolo_fr").addClass("active");
            $("#titolo_fr_certificazione_modifica").val(argomento.titolo_fr);

            
            tinyMCE.get('descrizione_breve_certificazione_modifica').setContent(argomento.descrizione_breve);
            tinyMCE.get('descrizione_breve_en_certificazione_modifica').setContent(argomento.descrizione_breve_en);
            tinyMCE.get('descrizione_breve_fr_certificazione_modifica').setContent(argomento.descrizione_breve_fr);
            tinyMCE.get('descrizione_certificazione_modifica').setContent(argomento.descrizione);
            tinyMCE.get('descrizione_en_certificazione_modifica').setContent(argomento.descrizione_en);
            tinyMCE.get('descrizione_fr_certificazione_modifica').setContent(argomento.descrizione_fr);

        });

    });
    // Qua faccio funzione seleziono media dell' argomento
    selezionoMediaCertificazione();

}

function selezionoMediaCertificazione() {

    var id_argomento = localStorage.getItem('id_modifica_argomento')
    var argomento = "Certificazioni";
    var ID = localStorage.getItem("ID_utente");
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/seleziono_media_argomento.aspx?id_argomento=" + id_argomento + "&argomento=" + argomento + "&ID_utente=" + ID + "", function (dati) {
        // var blocco_news = "";
        var lunghezza = dati.length;
        var immagine = "";
        $.each(dati, function (i, media) {

            immagine = "<div class='grid-item gallery-item-card ' id='" + media.ID + "'> <img src='http://simplyappweb.mvclienti.com/Account/Uploads/Certificazioni/galleria_img/immagini/" + media.immagine + "' rel='external' alt='image'>";
            immagine += "<div onclick='cancellaFotoModificaCertificazione(\"" + media.ID + "\");'  class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_modifica_certificazione").append(immagine);
        });

    });
}

function cancellaFotoModificaCertificazione(ID) {

    $("#" + ID + "").hide();
    var argomento = "Certificazioni";
    // La vado a cancellare sul server
    // Cancello News 
    $.ajax({
        type: "POST",
        data: '{ID:"' + ID + '",ID_utente: "' + localStorage.getItem('ID_utente') + '",argomento: "' + argomento + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/servizi_app.aspx/cancelloMediaArgomento',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;

            if (ritorno == "si") {
                var siCancellaMediaArgomento = "<div class='modal-content'><h4>Foto eliminata </h4><p>Foto eliminta con successo!!</p></div>";
                siCancellaMediaArgomento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_cancellazione_media_certificazione").html("");
                $("#box_cancellazione_media_certificazione").append(siCancellaMediaArgomento);
                $("#apri_box_cancellazione_media_certificazione").click();
            } else {
                var noCancellaMediaArgomento = "<div class='modal-content'><h4>Foto non eliminata </h4><p>Foto non eliminata!!<br>Si prega di riprovare. </p></div>";
                noCancellaMediaArgomento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_cancellazione_media_certificazione").html("");
                $("#box_cancellazione_media_certificazione").append(noCancellaMediaArgomento);
                $("#apri_box_cancellazione_media_certificazione").click();
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

function aggiornaCertificazione(posizione, titolo, titolo_en, titolo_fr, descrizione_breve, descrizione_breve_en, descrizione_breve_fr, descrizione, descrizione_en, descrizione_fr) {


    
    $.ajax({
        type: "POST",
        data: '{posizione:"' + posizione + '",titolo:"' + titolo + '", titolo_en:"' + titolo_en + '", titolo_fr:"' + titolo_fr + '", descrizione_breve:"' + descrizione_breve + '", descrizione_breve_en:"' + descrizione_breve_en + '", descrizione_breve_fr:"' + descrizione_breve_fr + '", descrizione:"' + descrizione + '", descrizione_en:"' + descrizione_en + '", descrizione_fr:"' + descrizione_fr + '", ID_utente:"' + localStorage.getItem("ID_utente") + '", ID_servizio: "' + localStorage.getItem('id_modifica_argomento') + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/aggiorno_prodotto.aspx/updateCertificazione',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;

            if (ritorno == "Si") {
                var siCaricamento = "<div class='modal-content'><h4>Certificazione Aggiornata </h4><p>Certificazione aggiornata correttamente</p></div>";
                siCaricamento += "<div class='modal-footer'> <a href='#dashboard' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_aggiornamento_certificazione").html("");
                $("#box_aggiornamento_certificazione").append(siCaricamento);
                $("#apri_box_aggiornamento_certificazione").click();
            } else {
                var noCaricamento = "<div class='modal-content'><h4>Certificazione non aggiornata </h4><p>Certificazione non aggiornato.<br>Si prega di riprovare </p></div>";
                noCaricamento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_aggiornamento_certificazione").html("");
                $("#box_aggiornamento_certificazione").append(noCaricamento);
                $("#apri_box_aggiornamento_certificazione").click();
            }

        },
        error: function (e) {

        }
    });
}

// FINE CERTIFICAZIONI

// INIZIO GESTIONE CATEGORIE

$(document).on("pagebeforeshow", "#categorie", function () {
    // Ripulisco la pagina dalle parti dinamiche
    $("#si_fixed_footer_categorie").show();
    $("#no_fixed_footer_categorie").hide();
    $("#stato_attivo_filtro_categorie").removeClass("active");
    $("#stato_non_attivo_filtro_categorie").removeClass("active");
    $("#ricerca_categoria").val("");
    $(".appendi_categorie").html("");
    $(".appendi_argomento_categoria").html("");
    $(".appendi_argomento_categoria").append(localStorage.getItem("argomento"));
    localStorage.setItem('modifica_categoira', 'No');
    localStorage.setItem("argomento_filtri", "categorie");
});

$(document).on("pageshow", "#categorie", function () {
    // Seleziono i dati delle categorie della gallery
    var foto = "<img class='circle avatar' src='http://simplyappweb.mvclienti.com/Account/fotoOperatori/" + localStorage.getItem("foto_utente") + "' rel='external' alt=''>";
    $(".appendi_foto_utente_nome").html("");
    $(".appendi_foto_utente_nome").append(foto);
    recuperaCategorie();
});

$(document).on("pagebeforeshow", "#gestione_categorie", function () {
    var foto = "<img class='circle avatar' src='http://simplyappweb.mvclienti.com/Account/fotoOperatori/" + localStorage.getItem("foto_utente") + "' rel='external' alt=''>";
    $(".appendi_foto_utente_nome").html("");
    $(".appendi_foto_utente_nome").append(foto);
    $(".appendi_argomento_categoria").html("");
    $(".appendi_argomento_categoria").append(localStorage.getItem("argomento"));
    $(".appendi_img_categoria").html("");
    $(".appendi_lingue").html("");
    $("#posizione_categoria").val("");
    $("#nome_categoria").val("");
    $("#nome_categoria_en").val("");
    $("#nome_categoria_fr").val("");
    $("#filtri_categorie").hide();
    tinyMCE.get('descrizione_breve_categoria').setContent("");
    tinyMCE.get('descrizione_breve_en_categoria').setContent("");
    tinyMCE.get('descrizione_breve_fr_categoria').setContent("");
    selezionoLingue();
    if (localStorage.getItem('modifica_categoira') == "Si") {
        selezionoCategoria();
    }
    

});

$("#flip-storico-categorie").bind("change", function (event, ui) {
    $("#filtri_categorie").toggle();
});

function filtraArgomentoCategoria(stato, tipo) {

    var cartella_foto = "";
    if (localStorage.getItem("argomento") == "realizzazioni") {
        cartella_foto = "Realizzazioni";
    };
    if (localStorage.getItem("argomento") == "servizi") {
        cartella_foto = "Servizi_cat";
    };
    if (localStorage.getItem("argomento") == "prodotti") {
        cartella_foto = "Prodotti";
    };
    if (stato == "si" && tipo == "Attivo") {
        $("#stato_attivo_filtro_categorie").addClass("active");
        $("#stato_non_attivo_filtro_categorie").removeClass("active");
    }
    if (stato == "si" && tipo == "Non Attivo") {
        $("#stato_attivo_filtro_categorie").removeClass("active");
        $("#stato_non_attivo_filtro_categorie").addClass("active");
    }

    var argomento_giusto = "servizi"
    var ricerca_valore = $("#ricerca_categoria").val();
    if (ricerca_valore != "") {
        ricerca = ricerca_valore;
    } else {
        ricerca = "";
    }

    var argomento = localStorage.getItem("argomento")

    $(".appendi_categorie").html("");

    $.getJSON("http://simplyappweb.mvclienti.com/webservices/categorie_filtri.aspx?id_utente=" + localStorage.getItem("ID_utente") + "&stato=" + stato + "&ricerca=" + ricerca + "&tipo_argomento=" + argomento + "&tipo_stato=" + tipo + "", function (dati) {
        var blocco_categorie = "";
        var lunghezza = dati.length;


        $.each(dati, function (i, categorie) {


            blocco_categorie += "<div class='blog-card animated fadein delay-1'><div class='blog-header'><div class='blog-author'><span class='titolo_storico'>" + categorie.nome_categoria + "</span></div></div>";

            blocco_categorie += "<div class='blog-image'>  <img src='http://simplyappweb.mvclienti.com/Account/Uploads/" + cartella_foto + "/galleria_img/immagini/" + categorie.immagine + "' rel='external' alt=''/></div>";

            blocco_categorie += "<div class='blog-preview p-20'><p>" + categorie.descrizione_breve + "</p><div class='btn_storico'><a href='#' onclick='modificaCategoria(\"" + categorie.ID + "\");' class='waves-effect waves-light btn accent-color'><span class='ion-edit'></span></a><a href='#' onclick='cancellaCategoria(\"" + categorie.ID + "\");' class='waves-effect waves-light btn accent-color'><span class='ion-close-circled'></span></a></div></div></div>";
        });
        if (lunghezza == 0) {
            blocco_categorie += "<div class='modal-content'><h4>No categorie </h4><p>Nessuna categoria  trovata dopo la ricerca!!</p></div>";
            blocco_categorie += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#no_categorie").html("");
            $("#no_categorie").append(blocco_categorie);
            $("#apri_no_categorie").click();
           
        }

        if (lunghezza != 0) {
            $(".appendi_categorie").append(blocco_categorie);
            $("#si_fixed_footer_categorie").hide();
            $("#no_fixed_footer_categorie").show();
        }

    });

}

function recuperaCategorie() {
    $(".appendi_categorie").html("");
    var cartella_foto = "";
    if (localStorage.getItem("argomento") == "realizzazioni") {
        cartella_foto = "Realizzazioni";
    };
    if (localStorage.getItem("argomento") == "servizi") {
        cartella_foto = "Servizi_cat";
    };
    if (localStorage.getItem("argomento") == "prodotti") {
        cartella_foto = "Prodotti";
    };
    if (localStorage.getItem("argomento") == "approfondimenti") {
        cartella_foto = "Approfondimenti";
    };
    // Faccio la selezione dal server delle new di questo utente
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/storico_categorie.aspx?id_utente=" + localStorage.getItem("ID_utente") + "&argomento_categoria=" + localStorage.getItem("argomento") + "", function (dati) {
        var blocco_categorie = "";
        var lunghezza = dati.length;
      
        
        $.each(dati, function (i, categorie) {


            blocco_categorie += "<div class='blog-card animated fadein delay-1'><div class='blog-header'><div class='blog-author'><span class='titolo_storico'>" + categorie.nome_categoria + "</span></div></div>";

            blocco_categorie += "<div class='blog-image'>  <img src='http://simplyappweb.mvclienti.com/Account/Uploads/" + cartella_foto + "/galleria_img/immagini/" + categorie.immagine + "' rel='external' alt=''/></div>";

            blocco_categorie += "<div class='blog-preview p-20'><p>" + categorie.descrizione_breve + "</p><div class='btn_storico'><a href='#' onclick='modificaCategoria(\"" + categorie.ID + "\");' class='waves-effect waves-light btn accent-color'><span class='ion-edit'></span></a><a href='#' onclick='cancellaCategoria(\"" + categorie.ID + "\");' class='waves-effect waves-light btn accent-color'><span class='ion-close-circled'></span></a></div></div></div>";
        });
        if (lunghezza == 0) {
            blocco_categorie += "<div class='modal-content'><h4>No Categorie </h4><p>Non vi sono categorie salvate!!</p></div>";
            blocco_categorie += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#no_categorie").html("");
            $("#no_categorie").append(blocco_categorie);
            $("#apri_no_categorie").click();
            $("#si_fixed_footer_categorie").show();
            $("#no_fixed_footer_categorie").hide();
        }

        if (lunghezza != 0) {

            $(".appendi_categorie").append(blocco_categorie);
            $("#si_fixed_footer_categorie").hide();
            $("#no_fixed_footer_categorie").show();
        }

    });
}

function cancellaCategoria(ID_servizio) {
    $.ajax({
        type: "POST",
        data: '{ID:"' + ID_servizio + '", ID_utente:"' + localStorage.getItem("ID_utente") + '", argomento_categoria:"' + localStorage.getItem("argomento") + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/servizi_app.aspx/cancellaCategoria',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;
            if (ritorno == "si") {
                var siCancellaNews = "<div class='modal-content'><h4>Categoria eliminata </h4><p>Categoria eliminata con successo!!</p></div>";
                siCancellaNews += "<div class='modal-footer'> <a href='#' onclick='recuperaCategorie()' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_cancellazione_categoria").html("");
                $("#box_cancellazione_categoria").append(siCancellaNews);
                $("#apri_box_cancellazione_categoria").click();
            } else {
                var noCancellaNews = "<div class='modal-content'><h4>Categoria non eliminata </h4><p>Categoria non eliminata!!<br>Si prega di riprovare. </p></div>";
                noCancellaNews += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_cancellazione_categoria").html("");
                $("#box_cancellazione_categoria").append(noCancellaNews);
                $("#apri_box_cancellazione_categoria").click();
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

function modificaCategoria(ID) {


    localStorage.setItem('id_modifica_argomento', ID);
    localStorage.setItem('modifica_categoira', 'Si');
    $.mobile.pageContainer.pagecontainer("change", "#gestione_categorie", {
        transition: 'flip',

    });

}

function selezionoCategoria() {
    var cartella_foto = "";
    if (localStorage.getItem("argomento") == "realizzazioni") {
        cartella_foto = "Realizzazioni";
    };
    if (localStorage.getItem("argomento") == "servizi") {
        cartella_foto = "Servizi_cat";
    };
    if (localStorage.getItem("argomento") == "prodotti") {
        cartella_foto = "Prodotti";
    };
    if (localStorage.getItem("argomento") == "approfondimenti") {
        cartella_foto = "Approfondimenti";
    };
    var ID = localStorage.getItem("ID_utente");
    var id_prodotto = localStorage.getItem('id_modifica_argomento');
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/seleziono_categoria.aspx?id_servizio=" + id_prodotto + "&ID_utente=" + ID + "&argomento_categoria=" + localStorage.getItem("argomento") + "", function (dati) {
        var immagine = "";
        var lunghezza = dati.length;
       
        $.each(dati, function (i, argomento) {
            tinyMCE.triggerSave();
            $("#lbl_categoria_posizione").addClass("active");
            $("#posizione_categoria").val(argomento.posizione);
            $("#lbl_categoria_nome").addClass("active");
            $("#nome_categoria").val(argomento.nome_categoria);
            $("#lbl_categoria_nome_en").addClass("active");
            $("#nome_categoria_en").val(argomento.nome_categoria_en);
            $("#lbl_categoria_nome_fr").addClass("active");
            $("#nome_categoria_fr").val(argomento.nome_categoria_fr);
            tinyMCE.get('descrizione_breve_categoria').setContent(argomento.descrizione_breve);
            tinyMCE.get('descrizione_breve_categoria_en').setContent(argomento.descrizione_breve_en);
            tinyMCE.get('descrizione_breve_categoria_fr').setContent(argomento.descrizione_breve_fr);
            if (argomento.immagine != "")
            {
                immagine = "<div class='grid-item gallery-item-card ' id='" + argomento.ID + "'> <img src='http://simplyappweb.mvclienti.com/Account/Uploads/" + cartella_foto + "/galleria_img/immagini/" + argomento.immagine + "' rel='external' alt='image'>";
                immagine += "<div onclick='cancellaFotoCategoria(\"" + argomento.ID + "\");'  class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
                $(".appendi_img_categoria").append(immagine);
            }
           

        });

    });
   

}

function cancellaFotoCategoria(ID) {

    $("#" + ID + "").hide();
    var argomento = localStorage.getItem("argomento")
    // La vado a cancellare sul server
    // Cancello News 
    $.ajax({
        type: "POST",
        data: '{ID:"' + ID + '",ID_utente: "' + localStorage.getItem('ID_utente') + '",argomento: "' + argomento + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/servizi_app.aspx/cancelloMediaCategoria',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;

            if (ritorno == "si") {
                var siCancellaMediaArgomento = "<div class='modal-content'><h4>Foto eliminata </h4><p>Foto eliminta con successo!!</p></div>";
                siCancellaMediaArgomento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_cancellazione_media_categoria").html("");
                $("#box_cancellazione_media_categoria").append(siCancellaMediaArgomento);
                $("#apri_box_cancellazione_media_categoria").click();
            } else {
                var noCancellaMediaArgomento = "<div class='modal-content'><h4>Foto non eliminata </h4><p>Foto non eliminata!!<br>Si prega di riprovare. </p></div>";
                noCancellaMediaArgomento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_cancellazione_media_categoria").html("");
                $("#box_cancellazione_media_categoria").append(noCancellaMediaArgomento);
                $("#apri_box_cancellazione_media_categoria").click();
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

function caricaSulSitoCategoria(posizione, nome, nome_en, nome_fr, descrizione_breve, descrizione_breve_en, descrizione_breve_fr) {


    
    $.ajax({
        type: "POST",
        data: '{posizione:"' + posizione + '", nome:"' + nome + '", nome_en:"' + nome_en + '", nome_fr:"' + nome_fr + '", descrizione_breve:"' + descrizione_breve + '", descrizione_breve_en:"' + descrizione_breve_en + '", descrizione_breve_fr:"' + descrizione_breve_fr + '", modifica:"' + localStorage.getItem('modifica_categoira') + '", ID_utente:"' + localStorage.getItem("ID_utente") + '", user:"' + localStorage.getItem("username") + '", argomento_categoria:"' + localStorage.getItem("argomento") + '", id_categoria:"' + localStorage.getItem('id_modifica_argomento') + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/carica_argomento_app.aspx/caricaCategoria',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;
          
            if (ritorno == "Si") {
                if (localStorage.getItem('modifica_categoira') == "No")
                {
                    var siCaricamento = "<div class='modal-content'><h4>Categoria Caricata </h4><p>Categoria caricata con successo</p></div>";
                    siCaricamento += "<div class='modal-footer'> <a href='#dashboard'  class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                    $("#box_caricamento_categoria").html("");
                    $("#box_caricamento_categoria").append(siCaricamento);
                    $("#apri_box_caricamento_categoria").click();
                }
                if (localStorage.getItem('modifica_categoira') == "Si") {
                    var siCaricamento = "<div class='modal-content'><h4>Categoria Aggiornata </h4><p>Categoria aggiornata con successo</p></div>";
                    siCaricamento += "<div class='modal-footer'> <a href='#dashboard'  class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                    $("#box_aggiornamento_categoria").html("");
                    $("#box_aggiornamento_categoria").append(siCaricamento);
                    $("#apri_box_aggiornamento_categoria").click();
                }
               
            } else {
                if (localStorage.getItem('modifica_categoira') == "No")
                {
                    var noCaricamento = "<div class='modal-content'><h4>Categoria non caricata </h4><p>Categoria non caricata.<br>Si prega di riprovare </p></div>";
                    noCaricamento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                    $("#box_caricamento_categoria").html("");
                    $("#box_caricamento_categoria").append(noCaricamento);
                    $("#apri_box_caricamento_categoria").click();
                }
                if(localStorage.getItem('modifica_categoira') == "Si")
                {
                    var noCaricamento = "<div class='modal-content'><h4>Categoria non aggiornata </h4><p>Categoria non aggiornata.<br>Si prega di riprovare </p></div>";
                    noCaricamento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                    $("#box_aggiornamento_categoria").html("");
                    $("#box_aggiornamento_categoria").append(noCaricamento);
                    $("#apri_box_aggiornamento_categoria").click();
                }
              
            }

        },
        error: function (e) {

        }
    });
}

// FINE GESTIONE CATEGORIE

// INIZIO PRENOTAZIONI

$(document).on("pagebeforeshow", "#prenotazioni", function () {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }
    var data = yyyy + '-' + mm + '-' + dd;
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek'
        },
        defaultDate: data,
        editable: false,
        navLinks: true, // can click day/week names to navigate views
        eventLimit: true, // allow "more" link when too many events
        events: {
            url: 'http://simplyappweb.mvclienti.com/webservices/get_prenotazioni_app.aspx?id_utente=' + localStorage.getItem('ID_utente') + '',
            color: 'red',    // an option!
            textColor: 'black',  // an option!

            error: function () {
                $('#script-warning').show();
            }
        },
        eventClick: function (event) {
            if (event.url) {
                var url = event.url
                var id_prenotazione = url.replace("#dettaglio_prenotazione", "");

                localStorage.setItem('ID_prenotazione', id_prenotazione);
                window.open("#dettaglio_prenotazione");
                return true;

            }
        },
        loading: function (bool) {
            $('#loading').toggle(bool);
        }
    });

});

$(document).on("pagebeforeshow", "#dettaglio_prenotazione", function () {
   
    // Seleziono i dati delle categorie della gallery
    var foto = "<img class='circle avatar' src='http://simplyappweb.mvclienti.com/Account/fotoOperatori/" + localStorage.getItem("foto_utente") + "' rel='external' alt=''>";
    $(".appendi_foto_utente_nome").html("");
    $(".appendi_foto_utente_nome").append(foto);
    recuperaPrenotazione();
});

function recuperaPrenotazione() {
    $(".appendi_prenotazione").html("");
    var cartella_foto = "";
    $("#nome_prenotazione").val("");
    $("#cognome_prenotazione").val("");
    $("#telefono_prenotazione").val("");
    $("#email_prenotazione").val("");
    // Faccio la selezione dal server delle new di questo utente
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/recupera_prenotazione.aspx?id_utente=" + localStorage.getItem("ID_utente") + "&ID_prenotazione=" +  localStorage.getItem('ID_prenotazione') + "", function (dati) {
        var blocco_prenotazione = "";
        var lunghezza = dati.length;

     
        $.each(dati, function (i, prenotazione) {
            
           
            blocco_prenotazione +="<ul class='collapsible checkout-header animated fadeindown delay-2' data-collapsible='accordion'><li id='dropli' onclick='apriDrop()'>"

            blocco_prenotazione += "<div class='collapsible-header'> Sommario prenotazione<i class='ion-android-arrow-dropdown'></i><span class='checkout-price right'>"+prenotazione.totale+" €</span> </div>";

            blocco_prenotazione += "<div class='collapsible-body z-depth-1'><div class='checkout-details'> <img class='checkout-image' src='http://simplyappweb.mvclienti.com/Account/Uploads/Appartamenti/galleria_img/immagini/" + prenotazione.immagine + "' alt=''><div class='checkout-product-title'><h6>" + prenotazione.nome_appartamento + "</h6><span>Check-in: " + prenotazione.check_in + "</span><br><span>Check-out: " + prenotazione.check_out + "</span><br><span>N notti: " + prenotazione.n_notti + "</span><br><span>N persone: " + prenotazione.n_persone + "</span><br>N bambini minori di 3 anni: " + prenotazione.n_bambini + "</span><br>N bambini maggiori di 3 anni: " + prenotazione.n_bambini_maggiori_3 + "</span><br>Servizi aggiuntivi: " + prenotazione.servizi_aggiuntivi + "</span><br>Pagamento: " + prenotazione.metodo_pagamento + "</span></div></div>";

            blocco_prenotazione += "<div class='subtotal'><h6>Sub totale <span class='right'>" + prenotazione.subtotale + " €</span></h6><span>Costo servizio aggiuntivo <span class='right'>" + prenotazione.prezzo_aggiuntivo_infante + " €</span></span><span>N bamibini minori di 3 anni <span class='right'>" + prenotazione.n_bambini + "</span></span><span>Costo servizio aggiuntivo totale <span class='right'>" + prenotazione.prezzo_aggiuntivo_infante_tot + " €</span></span></div>";
            
            blocco_prenotazione += "<div class='total'><h4>Totale <span class='right'>" + prenotazione.totale + " €</span></h4></div></div></li></ul>";
            $("#nome_prenotazione").val(prenotazione.nome);
            $("#cognome_prenotazione").val(prenotazione.cognome);
            $("#telefono_prenotazione").val(prenotazione.telefono);
            $("#email_prenotazione").val(prenotazione.email);
        });
      
        if (lunghezza != 0) {
          
            $(".appendi_prenotazione").append(blocco_prenotazione);
        
        }

    });
}

function apriDrop ()
{
   
    var stato = $(".z-depth-1").css("display");
    if (stato == "block")
    {
        $("#dropli").removeClass("active");
        $(".collapsible-header").removeClass("active");
        $(".z-depth-1").css("display", "none");
    } else
    {
        $("#dropli").addClass("active");
        $(".collapsible-header").addClass("active");
        $(".z-depth-1").css("display", "block");
   }
    
}

// FINE PRENOTAZIONI

// INIZIO APPARTAMENTI

$(document).on("pagebeforeshow", "#appartamenti", function () {

    // Seleziono i dati delle categorie della gallery
    var foto = "<img class='circle avatar' src='http://simplyappweb.mvclienti.com/Account/fotoOperatori/" + localStorage.getItem("foto_utente") + "' rel='external' alt=''>";
    $(".appendi_foto_utente_nome").html("");
    $(".appendi_foto_utente_nome").append(foto);
    $(".appendi_img_appartamento").html("");
    $(".appendi_lingue").html("");
    $("#posizione_appartamento").val("");
    $("#nome_appartamento").val("");
    $("#prezzo_appartamento").val("");
    $("#prezzo_scontato_appartamento").val("");
    $("#prezzo_aggiuntivo_infante_appartamento").val("");
    $("#n_locali_appartamento").val("");
    $("#n_bagni_appartamento").val("");
    $("#n_posti__letto_appartamento").val("");
    $("#metri_quadri_appartamento").val("");
    tinyMCE.get('comfort_appartamento').setContent("");
    tinyMCE.get('comfort_en_appartamento').setContent("");
    tinyMCE.get('comfort_fr_appartamento').setContent("");
    tinyMCE.get('descrizione').setContent("");
    tinyMCE.get('descrizione_en').setContent("");
    tinyMCE.get('descrizione_fr').setContent("");
    tinyMCE.get('servizi_aggiuntivi_appartamento').setContent("");
    tinyMCE.get('servizi_aggiuntivi_en_appartamento').setContent("");
    tinyMCE.get('servizi_aggiuntivi_fr_appartamento').setContent("");
    $('#lastminute').prop('checked', false);
    selezionoLingue();
    recuperaPrenotazione();
});

$(document).on("pagebeforeshow", "#storicoAppartamenti", function () {
    // Ripulisco la pagina dalle parti dinamiche
    $("#si_fixed_footer_appartamenti").show();
    $("#no_fixed_footer_appartamenti").hide();
    $("#stato_attivo_filtro_appartamenti").removeClass("active");
    $("#stato_non_attivo_filtro_appartamenti").removeClass("active");
    $("#ricerca_appartamenti").val("");
    $(".appendi_appartamenti").html("");
    localStorage.setItem("argomento_filtri", "appartamenti");



});

$(document).on("pageshow", "#storicoAppartamenti", function () {
    // Seleziono i dati delle categorie della gallery
    var foto = "<img class='circle avatar' src='http://simplyappweb.mvclienti.com/Account/fotoOperatori/" + localStorage.getItem("foto_utente") + "' rel='external' alt=''>";
    $(".appendi_foto_utente_nome").html("");
    $(".appendi_foto_utente_nome").append(foto);
    recuperaAppartamenti();
});

$(document).on("pagebeforeshow", "#modifica_appartamento", function () {
    var foto = "<img class='circle avatar' src='http://simplyappweb.mvclienti.com/Account/fotoOperatori/" + localStorage.getItem("foto_utente") + "' rel='external' alt=''>";
    $(".appendi_foto_utente_nome").html("");
    $(".appendi_foto_utente_nome").append(foto);
    var titolo = "<h1>Modifica " + localStorage.getItem("nome_argomento_modifica") + "</h1>";
    $(".appendi_img_appartamento_slider_modifica").html("");
    $(".appendi_img_modifica_appartamento").html("");
    $(".appendi_lingue").html("");
    selezionoLingue();
    selezionoAppartamentoModifica();

});

$("#flip-appartamenti").bind("change", function (event, ui) {
    $("#box_carica_immagine_slider_appartamento").toggle();
    var stato_flip = $("#flip-appartamenti").prop("checked");
    if (stato_flip == true) {

    }
    if (stato_flip == false) {


    }

});

function clickLastMinute()
{
    
}

function caricaSulSitoAppartamento(posizione, nome, prezzo, prezzo_scontato, prezzo_aggiuntivo_infante, n_locali, n_bagni, n_posti_letto, metri_quadri, comfort, comfort_en, comfort_fr, descrizione, descrizione_en, descrizione_fr, servizi_aggiuntivi, servizi_aggiuntivi_en, servizi_aggiuntivi_fr) {
    var Lastminute;
    if ($('#lastminute').is(":checked")) {
        Lastminute = 1
    } else {
        Lastminute = 0
    }
 
    $.ajax({
        type: "POST",
        data: '{posizione:"' + posizione + '", nome:"' + nome + '", prezzo:"' + prezzo + '", prezzo_scontato:"' + prezzo_scontato + '", prezzo_aggiuntivo_infante:"' + prezzo_aggiuntivo_infante + '", n_locali:"' + n_locali + '", n_bagni:"' + n_bagni + '", n_posti_letto:"' + n_posti_letto + '", metri_quadri:"' + metri_quadri + '", comfort:"' + comfort + '", comfort_en:"' + comfort_en + '", comfort_fr:"' + comfort_fr + '", descrizione:"' + descrizione + '", descrizione_en:"' + descrizione_en + '", descrizione_fr:"' + descrizione_fr + '", checkPromozione:"' + Lastminute + '", servizi_aggiuntivi:"' + servizi_aggiuntivi + '", servizi_aggiuntivi_en:"' + servizi_aggiuntivi_en + '", servizi_aggiuntivi_fr:"' + servizi_aggiuntivi_fr + '", ID_utente:"' + localStorage.getItem("ID_utente") + '", user:"' + localStorage.getItem("username") + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/carica_argomento_app.aspx/caricaAppartamento',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;
          
            if (ritorno == "Si") {
                var siCaricamento = "<div class='modal-content'><h4>Appartamento Caricato </h4><p>Appartamento caricato con successo</p></div>";
                siCaricamento += "<div class='modal-footer'> <a href='#storicoAppartamenti'  class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_caricamento_appartamento").html("");
                $("#box_caricamento_appartamento").append(siCaricamento);
                $("#apri_box_caricamento_appartamento").click();
            } else {
                var noCaricamento = "<div class='modal-content'><h4>Appartamento non caricato </h4><p>Appartamento non caricato.<br>Si prega di riprovare </p></div>";
                noCaricamento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_caricamento_appartamento").html("");
                $("#box_caricamento_appartamento").append(noCaricamento);
                $("#apri_box_caricamento_appartamento").click();
            }

        },
        error: function (xhr, textStatus, error) {
            alert(xhr.statusText);
            alert(textStatus);
            alert(error);
        }
    });
}

function recuperaAppartamenti() {
    $(".appendi_appartamenti").html("");
    // Faccio la selezione dal server delle new di questo utente
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/storico_appartamenti.aspx?id_utente=" + localStorage.getItem("ID_utente") + "", function (dati) {
        var blocco_appartamenti = "";
        var lunghezza = dati.length;
        var Appartamenti = "Appartamenti";

        $.each(dati, function (i, appartamenti) {


            blocco_appartamenti += "<div class='blog-card animated fadein delay-1'><div class='blog-header'><div class='blog-author'><span class='titolo_storico'>" + appartamenti.nome + "</span></div></div>";

            blocco_appartamenti += "<div class='blog-image'>  <img src='http://simplyappweb.mvclienti.com/Account/Uploads/Appartamenti/galleria_img/immagini/" + appartamenti.immagine + "' rel='external' alt=''/></div>";

            blocco_appartamenti += "<div class='blog-preview p-20'><p>" + appartamenti.descrizione + "</p><div class='btn_storico'><a href='#' onclick='modificaAppartamento(\"" + appartamenti.ID + "\");' class='waves-effect waves-light btn accent-color'><span class='ion-edit'></span></a><a href='#' onclick='cancellaAppartamento(\"" + appartamenti.ID + "\");' class='waves-effect waves-light btn accent-color'><span class='ion-close-circled'></span></a></div></div></div>";
        });
        if (lunghezza == 0) {
            blocco_appartamenti += "<div class='modal-content'><h4>No Appartamenti </h4><p>Non vi sono appartamenti salvati!!</p></div>";
            blocco_appartamenti += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#no_appartamenti").html("");
            $("#no_appartamenti").append(blocco_appartamenti);
            $("#apri_no_appartamenti").click();
        }

        if (lunghezza != 0) {

            $(".appendi_appartamenti").append(blocco_appartamenti);
            $("#si_fixed_footer_appartamenti").hide();
            $("#no_fixed_footer_appartamenti").show();
        }

    });
}

$("#flip-storico-appartamenti").bind("change", function (event, ui) {
    $("#filtri_appartamenti").toggle();
    var stato_flip = $("#flip-storico-appartamenti").prop("checked");
    if (stato_flip == true) {

    }
    if (stato_flip == false) {


    }

});

function filtraArgomentoAppartamento(stato, tipo) {


    if (stato == "si" && tipo == "Attivo") {
        $("#stato_attivo_filtro_appartamenti").addClass("active");
        $("#stato_non_attivo_filtro_appartamenti").removeClass("active");
    }
    if (stato == "si" && tipo == "Non Attivo") {
        $("#stato_attivo_filtro_appartamenti").removeClass("active");
        $("#stato_non_attivo_filtro_appartamenti").addClass("active");
    }

    var argomento_giusto = "appartamenti"
    var ricerca_valore = $("#ricerca_appartamento").val();
    if (ricerca_valore != "") {
        ricerca = ricerca_valore;
    } else {
        ricerca = "";
    }

    var argomento = localStorage.getItem("argomento_filtri");

    $(".appendi_appartamenti").html("");

    $.getJSON("http://simplyappweb.mvclienti.com/webservices/storico_appartamenti_filtri.aspx?id_utente=" + localStorage.getItem("ID_utente") + "&stato=" + stato + "&ricerca=" + ricerca + "&tipo_argomento=" + argomento + "&tipo_stato=" + tipo + "", function (dati) {
        var blocco_appartamenti = "";
        var lunghezza = dati.length;



        $.each(dati, function (i, argomenti_filtrati) {


            blocco_appartamenti += "<div class='blog-card animated fadein delay-1'><div class='blog-header'><div class='blog-author'><span class='titolo_storico'>" + argomenti_filtrati.nome + "</span> </div></div>";

            blocco_appartamenti += "<div class='blog-image'>  <img src='http://simplyappweb.mvclienti.com/Account/Uploads/Appartamenti/galleria_img/immagini/" + argomenti_filtrati.immagine + "' rel='external' alt=''/></div>";

            blocco_appartamenti += "<div class='blog-preview p-20'><p>" + argomenti_filtrati.descrizione + "</p><div class='btn_storico'><a href='#' onclick='modificaAppartamento(\"" + argomenti_filtrati.ID + "\");' class='waves-effect waves-light btn primary-color'><span class='ion-edit'></span></a><a href='#' onclick='cancellaAppartamento(\"" + argomenti_filtrati.ID + "\");' class='waves-effect waves-light btn primary-color'><span class='ion-close-circled'></span></a></div></div></div>";
        });
        if (lunghezza == 0) {
            blocco_appartamenti += "<div class='modal-content'><h4>No Appartamenti </h4><p>Nessun appartamento trovato dopo la ricerca!!</p></div>";
            blocco_appartamenti += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#no_appartamenti_filtri").html("");
            $("#no_appartamenti_filtri").append(blocco_appartamenti);
            $("#apri_no_appartamenti_filtri").click();
            $("#si_fixed_footer_appartamenti").show();
            $("#no_fixed_footer_appartamenti").hide();
        }

        if (lunghezza != 0) {
            $(".appendi_appartamenti").append(blocco_appartamenti);
            $("#si_fixed_footer_appartamenti").hide();
            $("#no_fixed_footer_appartamenti").show();
        }

    });

}

function cancellaAppartamento(ID_servizio) {
    $.ajax({
        type: "POST",
        data: '{ID:"' + ID_servizio + '", ID_utente:"' + localStorage.getItem("ID_utente") + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/servizi_app.aspx/cancellaAppartamento',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;
            if (ritorno == "si") {
                var siCancellaNews = "<div class='modal-content'><h4>Appartamento eliminato </h4><p>Appartamento eliminato con successo!!</p></div>";
                siCancellaNews += "<div class='modal-footer'> <a href='#' onclick='recuperaAppartamenti()' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_cancellazione_appartamento").html("");
                $("#box_cancellazione_appartamento").append(siCancellaNews);
                $("#apri_box_cancellazione_appartamento").click();
            } else {
                var noCancellaNews = "<div class='modal-content'><h4>Appartamento non eliminato </h4><p>Appartamento non eliminato!!<br>Si prega di riprovare. </p></div>";
                noCancellaNews += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_cancellazione_appartamento").html("");
                $("#box_cancellazione_appartamento").append(noCancellaNews);
                $("#apri_box_cancellazione_appartamento").click();
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

function modificaAppartamento(ID) {


    localStorage.setItem('id_modifica_argomento', ID);
    $.mobile.pageContainer.pagecontainer("change", "#modifica_appartamento", {
        transition: 'flip',

    });

}

$("#flip-appartamenti-modifica").bind("change", function (event, ui) {
    $("#box_carica_immagine_slider_appartamento_modifica").toggle();
    var stato_flip = $("#flip-appartamenti-modifica").prop("checked");
    if (stato_flip == true) {

    }
    if (stato_flip == false) {


    }

});

function selezionoAppartamentoModifica() {

    var ID = localStorage.getItem("ID_utente");
    var id_prodotto = localStorage.getItem('id_modifica_argomento');
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/seleziono_appartamento.aspx?id_servizio=" + id_prodotto + "&ID_utente=" + ID + "", function (dati) {
        // var blocco_news = "";
        // Continuo da qui
        var lunghezza = dati.length;
        var immagine_slide = "";
        $.each(dati, function (i, argomento) {
            tinyMCE.triggerSave();
            $("#lbl_posizione_appartamento_modifica").addClass("active");
            $("#posizione_appartamento_modifica").val(argomento.posizione);
            $("#lbl_nome_appartamento_modifica").addClass("active");
            $("#nome_appartamento_modifica").val(argomento.nome);
            $("#lbl_prezzo_appartamento_modifica").addClass("active");
            $("#prezzo_appartamento_modifica").val(argomento.prezzo);
            $("#lbl_prezzo_scontato_appartamento_modifica").addClass("active");
            $("#prezzo_scontato_appartamento_modifica").val(argomento.prezzo_scontato);
            $("#lbl_prezzo_aggiuntivo_infante_appartamento_modifica").addClass("active");
            $("#prezzo_aggiuntivo_infante_appartamento_modifica").val(argomento.prezzo_aggiuntivo_infante);
            $("#lbl_n_locali_appartamento_modifica").addClass("active");
            $("#n_locali_appartamento_modifica").val(argomento.n_locali);
            $("#lbl_n_bagni_appartamento_modifica").addClass("active");
            $("#n_bagni_appartamento_modifica").val(argomento.n_bagni);
            $("#lbl_n_posti_letto_appartamento_modifica").addClass("active");
            $("#n_posti_letto_appartamento_modifica").val(argomento.n_posti_letto);
            $("#lbl_metri_quadri_appartamento_modifica").addClass("active");
            $("#metri_quadri_appartamento_modifica").val(argomento.metri_quadri);
            tinyMCE.get('comfort_appartamento_modifica').setContent(argomento.comfort);
            tinyMCE.get('comfort_en_appartamento_modifica').setContent(argomento.comfort_en);
            tinyMCE.get('comfort_fr_appartamento_modifica').setContent(argomento.comfort_fr);
            tinyMCE.get('descrizione_appartamento_modifica').setContent(argomento.descrizione);
            tinyMCE.get('descrizione_en_appartamento_modifica').setContent(argomento.descrizione_en);
            tinyMCE.get('descrizione_fr_appartamento_modifica').setContent(argomento.descrizione_fr);
            tinyMCE.get('servizi_aggiuntivi_appartamento_modifica').setContent(argomento.servizi_aggiuntivi_infante);
            tinyMCE.get('servizi_aggiuntivi_en_appartamento_modifica').setContent(argomento.servizi_aggiuntivi_infante_en);
            tinyMCE.get('servizi_aggiuntivi_fr_appartamento_modifica').setContent(argomento.servizi_aggiuntivi_infante_fr);
            if(argomento.checkPromozione == "1")
            {
                $('#lastminute_modifica').prop('checked', true);
            }

            // Immafgine slide
            if (argomento.immagine_slide != "")
            {
                immagine = "<div class='grid-item gallery-item-card ' id='" + argomento.ID + "'> <img src='http://simplyappweb.mvclienti.com/Account/Uploads/Appartamenti/galleria_img/immagini/" + argomento.immagine_slide + "' rel='external' alt='image'>";
                immagine += "<div onclick='cancellaFotoSlideAppartamento(\"" + argomento.ID + "\");'  class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
                $(".appendi_img_appartamento_slider_modifica").append(immagine);
            }
          

        });

    });
    // Qua faccio funzione seleziono media dell' argomento
     selezionoMediaAppartamento();

}

function selezionoMediaAppartamento() {

    var id_argomento = localStorage.getItem('id_modifica_argomento')
    var argomento = "Appartamenti";
    var ID = localStorage.getItem("ID_utente");
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/seleziono_media_argomento.aspx?id_argomento=" + id_argomento + "&argomento=" + argomento + "&ID_utente=" + ID + "", function (dati) {
        // var blocco_news = "";
        var lunghezza = dati.length;
        var immagine = "";
        $.each(dati, function (i, media) {

            immagine = "<div class='grid-item gallery-item-card ' id='" + media.ID + "'> <img src='http://simplyappweb.mvclienti.com/Account/Uploads/Appartamenti/galleria_img/immagini/" + media.immagine + "' rel='external' alt='image'>";
            immagine += "<div onclick='cancellaFotoModificaAppartamenti(\"" + media.ID + "\");'  class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_modifica_appartamento").append(immagine);
        });

    });
}

function cancellaFotoSlideAppartamento(ID)
{
    $("#" + ID + "").hide();
    var argomento = "Appartamenti";
    // La vado a cancellare sul server
    // Cancello News 
    box_carica_immagine_slider_appartamento_modifica.setAttribute('style', 'display:none;');
    $(".ui-flipswitch").removeClass("ui-flipswitch-active");
    $.ajax({
        type: "POST",
        data: '{ID:"' + ID + '",ID_utente: "' + localStorage.getItem('ID_utente') + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/servizi_app.aspx/cancelloImmagineSlideAppartamento',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;

            if (ritorno == "si") {
                var siCancellaMediaArgomento = "<div class='modal-content'><h4>Foto Slider eliminata </h4><p>Foto slider appartamento eliminta con successo!!</p></div>";
                siCancellaMediaArgomento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_cancellazione_immagine_slide_appartamento").html("");
                $("#box_cancellazione_immagine_slide_appartamento").append(siCancellaMediaArgomento);
                $("#apri_box_cancellazione_immagine_slide_appartamento").click();
            } else {
                var noCancellaMediaArgomento = "<div class='modal-content'><h4>Foto Slider non eliminata </h4><p>Foto slider appartamento non eliminata!!<br>Si prega di riprovare. </p></div>";
                noCancellaMediaArgomento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_cancellazione_immagine_slide_appartamento").html("");
                $("#box_cancellazione_immagine_slide_appartamento").append(noCancellaMediaArgomento);
                $("#apri_box_cancellazione_immagine_slide_appartamento").click();
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

function cancellaFotoModificaAppartamenti(ID) {

    $("#" + ID + "").hide();
    var argomento = "Appartamenti";
    // La vado a cancellare sul server
    // Cancello News 
    $.ajax({
        type: "POST",
        data: '{ID:"' + ID + '",ID_utente: "' + localStorage.getItem('ID_utente') + '",argomento: "' + argomento + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/servizi_app.aspx/cancelloMediaArgomento',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;

            if (ritorno == "si") {
                var siCancellaMediaArgomento = "<div class='modal-content'><h4>Foto eliminata </h4><p>Foto eliminta con successo!!</p></div>";
                siCancellaMediaArgomento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_cancellazione_media_appartamento").html("");
                $("#box_cancellazione_media_appartamento").append(siCancellaMediaArgomento);
                $("#apri_box_cancellazione_media_appartamento").click();
            } else {
                var noCancellaMediaArgomento = "<div class='modal-content'><h4>Foto non eliminata </h4><p>Foto non eliminata!!<br>Si prega di riprovare. </p></div>";
                noCancellaMediaArgomento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_cancellazione_media_appartamento").html("");
                $("#box_cancellazione_media_appartamento").append(noCancellaMediaArgomento);
                $("#apri_box_cancellazione_media_appartamento").click();
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

function aggiornaAppartamento(posizione, nome, prezzo, prezzo_scontato, prezzo_aggiuntivo_infante, n_locali, n_bagni, n_posti_letto, metri_quadri, comfort, comfort_en, comfort_fr, descrizione, descrizione_en, descrizione_fr, servizi_aggiuntivi, servizi_aggiuntivi_en, servizi_aggiuntivi_fr) {

   
    var Lastminute;
    if ($('#lastminute_modifica').is(":checked")) {
        Lastminute = 1
    } else {
        Lastminute = 0
    }
    $.ajax({
        type: "POST",
        data: '{posizione:"' + posizione + '", nome:"' + nome + '", prezzo:"' + prezzo + '", prezzo_scontato:"' + prezzo_scontato + '", prezzo_aggiuntivo_infante:"' + prezzo_aggiuntivo_infante + '", n_locali:"' + n_locali + '", n_bagni:"' + n_bagni + '", n_posti_letto:"' + n_posti_letto + '", metri_quadri:"' + metri_quadri + '", comfort:"' + comfort + '", comfort_en:"' + comfort_en + '", comfort_fr:"' + comfort_fr + '", descrizione:"' + descrizione + '", descrizione_en:"' + descrizione_en + '", descrizione_fr:"' + descrizione_fr + '", checkPromozione:"' + Lastminute + '", servizi_aggiuntivi:"' + servizi_aggiuntivi + '", servizi_aggiuntivi_en:"' + servizi_aggiuntivi_en + '", servizi_aggiuntivi_fr:"' + servizi_aggiuntivi_fr + '", ID_utente:"' + localStorage.getItem("ID_utente") + '", ID_servizio: "' + localStorage.getItem('id_modifica_argomento') + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/aggiorno_prodotto.aspx/updateAppartamento',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;
          
            if (ritorno == "Si") {
                var siCaricamento = "<div class='modal-content'><h4>Appartamento Aggiornato </h4><p>Appartamento aggiornato correttamente</p></div>";
                siCaricamento += "<div class='modal-footer'> <a href='#dashboard' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_aggiornamento_appartamento").html("");
                $("#box_aggiornamento_appartamento").append(siCaricamento);
                $("#apri_box_aggiornamento_appartamento").click();
            } else {
                var noCaricamento = "<div class='modal-content'><h4>Appartamento non aggiornato </h4><p>Appartamento non aggiornato.<br>Si prega di riprovare </p></div>";
                noCaricamento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_aggiornamento_appartamento").html("");
                $("#box_aggiornamento_appartamento").append(noCaricamento);
                $("#apri_box_aggiornamento_appartamento").click();
            }

        },
        error: function (xhr, textStatus, error) {
            alert(xhr.statusText);
            alert(textStatus);
            alert(error);
        }
    });
}
                                  
// FINE APPARTAMENTI                                   
                              
// INIZIO APPROFONDIMENTI

$(document).on("pagebeforeshow", "#approfondimenti", function () {
    localStorage.setItem("categoria_approfondimenti", "");
    $(".appendi_categorie_approfondimenti").html("");
    $(".appendi_lingue").html("");
    $(".appendi_immagini_categoria").html("");
    $(".append_categoria_aggiunta_approfondimenti").html("");
    $("#uploadFotoApprofondimenti").hide();
    $("#posizione_approfondimenti").val("");
    $("#titolo_approfondimenti").val("");
    $("#titolo_en_approfondimenti").val("");
    $("#titolo_fr_approfondimenti").val("");
    $("#link_approfondimenti").val("");
    $("#video_approfondimenti").val("");
    $("#data_approfondimenti").val("");
    tinyMCE.get('descrizione_approfondimenti').setContent("");
    tinyMCE.get('descrizione_en_approfondimenti').setContent("");
    tinyMCE.get('descrizione_fr_approfondimenti').setContent("");
    tinyMCE.get('descrizione_breve_approfondimenti').setContent("");
    tinyMCE.get('descrizione_breve_en_approfondimenti').setContent("");
    tinyMCE.get('descrizione_breve_fr_approfondimenti').setContent("");
    var stato_flip = $("#flip-aggiungi-approfondimenti").prop("checked");
    if (stato_flip == true) {
        $("#flip-aggiungi-approfondimenti").prop("checked", false);
        $(".ui-flipswitch").removeClass("ui-flipswitch-active");
    }
    //Cancello le foto rimaste nella tabella media del cellulare caricate in precedenza
    db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
    db.transaction(
        // Metodo di chiamata asincrona
        function (tx) {
            tx.executeSql("DELETE FROM categorie_approfondimenti", []);
        },
        function () {
            // alert("Non è stato possibile cancellare la notizia. Riprova");

        },
        function () {
            // alert("Cancellazione effettua");
        }
    )
    selezionoLingue();
    caricoCategorieApprofondimenti();
});

$(document).on("pagebeforeshow", "#storicoApprofondimenti", function () {
    // Ripulisco la pagina dalle parti dinamiche
    $("#si_fixed_footer_approfondimenti").show();
    $("#no_fixed_footer_approfondimenti").hide();
    $("#stato_attivo_filtro_approfondimenti").removeClass("active");
    $("#stato_non_attivo_filtro_approfondimenti").removeClass("active");
    $("#ricerca_servizi_cat").val("");
    $(".appendi_categorie_approfondimenti_filtri").html("");
    $(".appendi_approfondimenti").html("");
    localStorage.setItem("id_precedente", "");
    localStorage.setItem("argomento_filtri", "approfondimenti");
    selezionoCategoriePerFiltriApprofondimenti();

});

$(document).on("pageshow", "#storicoApprofondimenti", function () {
    // Seleziono i dati delle categorie della gallery
    var foto = "<img class='circle avatar' src='http://simplyappweb.mvclienti.com/Account/fotoOperatori/" + localStorage.getItem("foto_utente") + "' rel='external' alt=''>";
    $(".appendi_foto_utente_nome").html("");
    $(".appendi_foto_utente_nome").append(foto);
    recuperaApprofondimenti();
});

function caricoCategorieApprofondimenti() {
    // Carico nella tabella categorie_gallery
   
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/categorie_approfondimenti.aspx?id_utente=" + localStorage.getItem("ID_utente") + "", function (dati) {
        var li_dati = "";

        $.each(dati, function (i, categoria) {
            // Inserisco dati nel db sqllite dell' App

            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {

                    tx.executeSql("INSERT INTO categorie_approfondimenti (identificativo,nome_categoria,user) VALUES (?,?,?)", [categoria.ID, categoria.nome_categoria, categoria.user]);
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
        selezioneCategorieApprofondimenti();
    });
}

function selezioneCategorieApprofondimenti() {
   
    db.transaction(selezionoCatApprofondimenti);
}

function selezionoCatApprofondimenti(tx) {
   
    // Selezione le categorie aggiornate nella tabella categoria_gallery del telefono
    tx.executeSql("SELECT * FROM categorie_approfondimenti", [],
        function (tx, dati) {
            var len = dati.rows.length;

            var tab_categorie = "<div  class='controls'><label class='lbl_tasti'>Categorie:</label><br>";
            if (len != 0) {
                /* Qua compongo grafica tab categorie */
                for (var i = 0; i < len; i++) {
                    //  alert("ciclo");
                    tab_categorie += " <button style='margin-bottom:10px; margin-top:15px' onclick='clickCategoriaApprofondimenti(\"" + dati.rows.item(i).identificativo + "\")' class='filter' id='catApprofondimenti" + dati.rows.item(i).identificativo + "' >" + dati.rows.item(i).nome_categoria + "</button>"

                }

                tab_categorie += "</div>";

            }
            $(".appendi_categorie_approfondimenti").append(tab_categorie);
        },
        function () {
            alert("Errore" + e.message);
        })

    // Qua faccio due selezioni se è ceccato social o se non è ceccato social


}

function caricaSulSitoApprofondimenti(posizione, titolo, titolo_en, titolo_fr, link, video, data, descrizione_breve, descrizione_breve_en, descrizione_breve_fr, descrizione, descrizione_en, descrizione_fr) {

    
    $.ajax({
        type: "POST",
        data: '{posizione:"' + posizione + '",titolo:"' + titolo + '", titolo_en:"' + titolo_en + '", titolo_fr:"' + titolo_fr + '", link:"' + link + '", video:"' + video + '", data:"' + data + '", ID_categoria:"' + localStorage.getItem('categoria_approfondimenti') + '", descrizione_breve:"' + descrizione_breve + '", descrizione_breve_en:"' + descrizione_breve_en + '", descrizione_breve_fr:"' + descrizione_breve_fr + '", descrizione:"' + descrizione + '", descrizione_en:"' + descrizione_en + '", descrizione_fr:"' + descrizione_fr + '", ID_utente:"' + localStorage.getItem("ID_utente") + '", user:"' + localStorage.getItem("username") + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/carica_argomento_app.aspx/Approfondimenti',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;
           
            if (ritorno == "Si") {
                var siCaricamento = "<div class='modal-content'><h4>Approfondimento Caricato </h4><p>Approfondimento Caricato con successo</p></div>";
                siCaricamento += "<div class='modal-footer'> <a href='#storicoApprofondimenti'  class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_caricamento_approfondimenti").html("");
                $("#box_caricamento_approfondimenti").append(siCaricamento);
                $("#apri_box_caricamento_approfondimenti").click();
            } else {
                var noCaricamento = "<div class='modal-content'><h4>Approfondimento non caricato </h4><p>Approfondimento non caricato.<br>Si prega di riprovare </p></div>";
                noCaricamento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_caricamento_approfondimenti").html("");
                $("#box_caricamento_approfondimenti").append(noCaricamento);
                $("#apri_box_caricamento_approfondimenti").click();
            }

        },
        error: function (xhr, textStatus, error) {
            alert(xhr.statusText);
            alert(textStatus);
            alert(error);
        }
    });


}

function clickCategoriaApprofondimenti(categoria) {

    if (localStorage.getItem('categoria_approfondimenti') != "")
    {
        var categoria_precedente = localStorage.getItem('categoria_approfondimenti');
        $("#catApprofondimenti" + categoria_precedente + "").removeClass("active");
    }
   
    localStorage.setItem('categoria_approfondimenti', categoria);
    $("#catApprofondimenti" + categoria + "").addClass("active");
   
}

$("#flip-aggiungi-categoria-approfondimenti").bind("change", function (event, ui) {
    localStorage.setItem('argomento', 'approfondimenti');
    $.mobile.pageContainer.pagecontainer("change", "#categorie", {
        transition: 'flip',
    });

});

function selezionoCategoriePerFiltriApprofondimenti() {
    // Faccio la selezione dal server delle new di questo utente

    $.getJSON("http://simplyappweb.mvclienti.com/webservices/categorie_approfondimenti.aspx?id_utente=" + localStorage.getItem("ID_utente") + "", function (dati) {
        var id_selezionato = "";
        var tab_categorie = "<div  class='controls'><label class='lbl_tasti'>Filtri per Categoria:</label><br>";
        $.each(dati, function (i, categorie) {
            // Inserisco dati nel db sqllite dell' App
            tab_categorie += "<button style='margin-bottom:10px; margin-top:15px' onclick='clickFiltroPerCategoriaApprofondimenti(\"" + categorie.ID + "\")' class='filter' id='catapprofondimenti" + categorie.ID + "' >" + categorie.nome_categoria + "</button>"
        });
        tab_categorie += "</div>";
        $(".appendi_categorie_approfondimenti_filtri").append(tab_categorie);
        // Qua seleziono i dati della singola foto con una funzione

    });
}

function clickFiltroPerCategoriaApprofondimenti(ID_categoria) {


    $("#catapprofondimenti" + ID_categoria + "").addClass("active");
    if (localStorage.getItem("id_precedente") != "") {
        $("#catapprofondimenti" + localStorage.getItem("id_precedente") + "").removeClass("active");
    }
    localStorage.setItem("id_precedente", ID_categoria);
    $(".appendi_approfondimenti").html("");
    
    // Applico filtri
    // Faccio la selezione dal server delle new di questo utente
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/storico_approfondimenti_filtri_categorie.aspx?id_utente=" + localStorage.getItem("ID_utente") + "&id_categoria=" + ID_categoria + "", function (dati) {
        var blocco_approfondimenti = "";
        var lunghezza = dati.length;
        var Prodotti = "Approfondimenti";

        $.each(dati, function (i, approfondimenti) {
            
            blocco_approfondimenti += "<div class='blog-card animated fadein delay-1'><div class='blog-header'><div class='blog-author'><span class='titolo_storico'>" + approfondimenti.titolo + "</span> <span class='small'>" + approfondimenti.nome_categoria + "</span></div></div>";

            blocco_approfondimenti += "<div class='blog-image'>  <img src='http://simplyappweb.mvclienti.com/Account/Uploads/Approfondimenti/galleria_img/immagini/" + approfondimenti.immagine + "' rel='external' alt=''/></div>";

            blocco_approfondimenti += "<div class='blog-preview p-20'><p>" + approfondimenti.descrizione_breve + "</p><div class='btn_storico'><a href='#' onclick='modificaApprofondimento(\"" + approfondimenti.ID + "\",\"" + approfondimenti.nome_categoria + "\");' class='waves-effect waves-light btn accent-color'><span class='ion-edit'></span></a><a href='#' onclick='cancellaApprofondimento(\"" + approfondimenti.ID + "\");' class='waves-effect waves-light btn accent-color'><span class='ion-close-circled'></span></a></div></div></div>";


        });

        if (lunghezza == 0) {
            blocco_approfondimenti += "<div class='modal-content'><h4>No Approfondimenti </h4><p>Non vi sono approfondimenti per questa categoria!!</p></div>";
            blocco_approfondimenti += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#no_approfondimenti_c_cat").html("");
            $("#no_approfondimenti_c_cat").append(blocco_approfondimenti);
            $("#apri_no_approfondimenti_c_cat").click();
            $("#si_fixed_footer_approfondimenti").show();
            $("#no_fixed_footer_approfondimenti").hide();
        }

        if (lunghezza != 0) {

            $(".appendi_approfondimenti").append(blocco_approfondimenti);
            $("#si_fixed_footer_approfondimenti").hide();
            $("#no_fixed_footer_approfondimenti").show();
        }



    });
}

function recuperaApprofondimenti() {
    $(".appendi_approfondimenti").html("");
   
    // Faccio la selezione dal server delle new di questo utente
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/storico_approfondimenti.aspx?id_utente=" + localStorage.getItem("ID_utente") + "", function (dati) {
        var blocco_approfondimenti = "";
        var lunghezza = dati.length;
        var Approfondimenti = "Approfondimenti";

        $.each(dati, function (i, approfondimenti) {

           
            blocco_approfondimenti += "<div class='blog-card animated fadein delay-1'><div class='blog-header'><div class='blog-author'><span class='titolo_storico'>" + approfondimenti.titolo + "</span> <span class='small'>" + approfondimenti.nome_categoria + "</span></div></div>";

            blocco_approfondimenti += "<div class='blog-image'>  <img src='http://simplyappweb.mvclienti.com/Account/Uploads/Approfondimenti/galleria_img/immagini/" + approfondimenti.immagine + "' rel='external' alt=''/></div>";

            blocco_approfondimenti += "<div class='blog-preview p-20'><p>" + approfondimenti.descrizione_breve + "</p><div class='btn_storico'><a href='#' onclick='modificaApprofondimento(\"" + approfondimenti.ID + "\",\"" + approfondimenti.nome_categoria + "\");' class='waves-effect waves-light btn accent-color'><span class='ion-edit'></span></a><a href='#' onclick='cancellaApprofondimento(\"" + approfondimenti.ID + "\");' class='waves-effect waves-light btn accent-color'><span class='ion-close-circled'></span></a></div></div></div>";
        });
        if (lunghezza == 0) {
            blocco_approfondimenti += "<div class='modal-content'><h4>No Approfondimenti </h4><p>Non vi sono approfondimenti salvati!!</p></div>";
            blocco_approfondimenti += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#no_approfondimenti").html("");
            $("#no_approfondimenti").append(blocco_approfondimenti);
            $("#apri_no_approfondimenti").click();
        }

        if (lunghezza != 0) {

            $(".appendi_approfondimenti").append(blocco_approfondimenti);
            $("#si_fixed_footer_approfondimenti").hide();
            $("#no_fixed_footer_approfondimenti").show();
        }

    });
}

function cancellaApprofondimento(ID_approfondimento) {
    $.ajax({
        type: "POST",
        data: '{ID:"' + ID_approfondimento + '", ID_utente:"' + localStorage.getItem("ID_utente") + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/servizi_app.aspx/cancellaApprofondimento',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;
           
            if (ritorno == "si") {
                var siCancellaNews = "<div class='modal-content'><h4>Approfondimento eliminato </h4><p>Approfondimento eliminato con successo!!</p></div>";
                siCancellaNews += "<div class='modal-footer'> <a href='#' onclick='recuperaApprofondimenti()' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_cancellazione_approfondimenti").html("");
                $("#box_cancellazione_approfondimenti").append(siCancellaNews);
                $("#apri_box_cancellazione_approfondimenti").click();
            } else {
                var noCancellaNews = "<div class='modal-content'><h4>Approfondimento non eliminato </h4><p>Approfondimento non eliminato!!<br>Si prega di riprovare. </p></div>";
                noCancellaNews += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_cancellazione_approfondimenti").html("");
                $("#box_cancellazione_approfondimenti").append(noCancellaNews);
                $("#apri_box_cancellazione_approfondimenti").click();
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
                               
$("#flip-storico-approfondimenti").bind("change", function (event, ui) {
    $("#filtri_approfondimenti").toggle();
    var stato_flip = $("#flip-storico-approfondimenti").prop("checked");
    if (stato_flip == true) {

    }
    if (stato_flip == false) {


    }

});

function filtraArgomentoApprofondimenti(stato, tipo) {


    if (stato == "si" && tipo == "Attivo") {
        $("#stato_attivo_filtro_approfondimenti").addClass("active");
        $("#stato_non_attivo_filtro_approfondimenti").removeClass("active");
    }
    if (stato == "si" && tipo == "Non Attivo") {
        $("#stato_attivo_filtro_approfondimenti").removeClass("active");
        $("#stato_non_attivo_filtro_approfondimenti").addClass("active");
    }

    var argomento_giusto = "approfondimenti"
    var ricerca_valore = $("#ricerca_approfondimenti").val();
    if (ricerca_valore != "") {
        ricerca = ricerca_valore;
    } else {
        ricerca = "";
    }

    var argomento = localStorage.getItem("argomento_filtri");

    $(".appendi_approfondimenti").html("");

    $.getJSON("http://simplyappweb.mvclienti.com/webservices/storico_approfondimenti_filtri.aspx?id_utente=" + localStorage.getItem("ID_utente") + "&stato=" + stato + "&ricerca=" + ricerca + "&tipo_argomento=" + argomento + "&tipo_stato=" + tipo + "", function (dati) {
        var blocco_approfondimenti = "";
        var lunghezza = dati.length;


        $.each(dati, function (i, argomenti_filtrati) {

          
            blocco_approfondimenti += "<div class='blog-card animated fadein delay-1'><div class='blog-header'><div class='blog-author'><span class='titolo_storico'>" + argomenti_filtrati.titolo + "</span> <span class='small'>" + argomenti_filtrati.nome_categoria + "</span></div></div>";

            blocco_approfondimenti += "<div class='blog-image'>  <img src='http://simplyappweb.mvclienti.com/Account/Uploads/Approfondimenti/galleria_img/immagini/" + argomenti_filtrati.immagine + "' rel='external' alt=''/></div>";

            blocco_approfondimenti += "<div class='blog-preview p-20'><p>" + argomenti_filtrati.descrizione_breve + "</p><div class='btn_storico'><a href='#' onclick='modificaApprofondimento(\"" + argomenti_filtrati.ID + "\",\"" + argomenti_filtrati.nome_categoria + "\");' class='waves-effect waves-light btn primary-color'><span class='ion-edit'></span></a><a href='#' onclick='cancellaApprofondimento(\"" + argomenti_filtrati.ID + "\");' class='waves-effect waves-light btn primary-color'><span class='ion-close-circled'></span></a></div></div></div>";
        });
        if (lunghezza == 0) {
            blocco_approfondimenti += "<div class='modal-content'><h4>No Approfondimenti </h4><p>Nessun approfondimento  trovato dopo la ricerca!!</p></div>";
            blocco_approfondimenti += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#no_approfondimenti_c_cat").html("");
            $("#no_approfondimenti_c_cat").append(blocco_approfondimenti);
            $("#apri_no_approfondimenti_c_cat").click();
            $("#si_fixed_footer_approfondimenti").show();
            $("#no_fixed_footer_approfondimenti").hide();
        }

        if (lunghezza != 0) {
            $(".appendi_approfondimenti").append(blocco_approfondimenti);
            $("#si_fixed_footer_approfondimenti").hide();
            $("#no_fixed_footer_approfondimenti").show();
        }

    });

}

function modificaApprofondimento(ID, nome_categoria) {

    // Imposto il local storage per la modifica
    localStorage.setItem("nome_categoria_singola_approfondimento", nome_categoria);
    localStorage.setItem('id_modifica_argomento', ID);

    $.mobile.pageContainer.pagecontainer("change", "#modifica_approfondimento", {
        transition: 'flip',

    });

}

$(document).on("pagebeforeshow", "#modifica_approfondimento", function () {
    var foto = "<img class='circle avatar' src='http://simplyappweb.mvclienti.com/Account/fotoOperatori/" + localStorage.getItem("foto_utente") + "' rel='external' alt=''>";
    $(".appendi_foto_utente_nome").html("");
    $(".appendi_lingue").html("");
    $(".appendi_foto_utente_nome").append(foto);
    var titolo = "<h1>Modifica " + localStorage.getItem("nome_argomento_modifica") + "</h1>";
    $(".appendi_categorie_approfondimento_modifica").html("");
    $(".appendi_img_modifica_approfondimento").html("");
    selezionoCategorieSingolaApprofondimento();
    selezionoLingue();
    selezionoApprofondimentoModifica();

});

function selezionoCategorieSingolaApprofondimento() {
    var nome_categoria = localStorage.getItem("nome_categoria_singola_approfondimento")

    // Faccio la selezione dal server delle new di questo utente
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/categorie_approfondimenti.aspx?id_utente=" + localStorage.getItem("ID_utente") + "", function (dati) {
        var id_selezionato = "";
        var tab_categorie = "<div  class='controls'><label class='lbl_tasti'>Categorie:</label><br>";

        var count = 0

        $.each(dati, function (i, categorie) {

            // Inserisco dati nel db sqllite dell' App
            if (nome_categoria == categorie.nome_categoria) {

                tab_categorie += "<button style='margin-bottom:10px; margin-top:15px' onclick='clickCategoriaModificaApprofondimento(\"" + categorie.ID + "\")' class='active filter' id='catApprofondimento" + categorie.ID + "' >" + categorie.nome_categoria + "</button>"
                localStorage.setItem('id_categoria_selezionato', categorie.ID);
                localStorage.setItem('id_categoria_approfondimento_modifica_singolo', categorie.ID);

            } else {

                tab_categorie += "<button style='margin-bottom:10px; margin-top:15px' onclick='clickCategoriaModificaApprofondimento(\"" + categorie.ID + "\")' class='filter' id='catApprofondimento" + categorie.ID + "' >" + categorie.nome_categoria + "</button>"
            }


        });
        tab_categorie += "</div>";




        $(".appendi_categorie_approfondimento_modifica").append(tab_categorie);
        // Qua seleziono i dati della singola foto con una funzione

    });
}

function clickCategoriaModificaApprofondimento(ID_categoria) {

    
    localStorage.setItem('id_categoria_approfondimento_modifica_singolo', ID_categoria);
    id_selezionato = localStorage.getItem('id_categoria_selezionato');
    document.getElementById("catApprofondimento" + id_selezionato).classList.remove("active");
    document.getElementById("catApprofondimento" + ID_categoria).classList.add("active");
}

function selezionoApprofondimentoModifica() {

    var ID = localStorage.getItem("ID_utente");
    var id_prodotto = localStorage.getItem('id_modifica_argomento');
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/seleziono_approfondimento.aspx?id_prodotto=" + id_prodotto + "&ID_utente=" + ID + "", function (dati) {
        // var blocco_news = "";
        // Continuo da qui
        var lunghezza = dati.length;

        $.each(dati, function (i, argomento) {
            tinyMCE.triggerSave();
            $("#lbl_approfondimento_posizione").addClass("active");
            $("#posizione_approfondimento_modifica").val(argomento.posizione);
            $("#lbl_approfondimento_titolo").addClass("active");
            $("#titolo_approfondimento_modifica").val(argomento.titolo);
            $("#lbl_approfondimento_titolo_en").addClass("active");
            $("#titolo_en_approfondimento_modifica").val(argomento.titolo_en);
            $("#lbl_approfondimento_titolo_fr").addClass("active");
            $("#titolo_fr_approfondimento_modifica").val(argomento.titolo_fr);
            $("#lbl_approfondimento_link").addClass("active");
            $("#link_approfondimento_modifica").val(argomento.link);
            $("#lbl_approfondimento_video").addClass("active");
            $("#video_approfondimento_modifica").val(argomento.video);
            $("#lbl_approfondimento_data").addClass("active");
            $("#data_approfondimento_modifica").val(argomento.data);
            tinyMCE.get('descrizione_breve_approfondimento_modifica').setContent(argomento.descrizione_breve);
            tinyMCE.get('descrizione_breve_en_approfondimento_modifica').setContent(argomento.descrizione_breve_en);
            tinyMCE.get('descrizione_breve_fr_approfondimento_modifica').setContent(argomento.descrizione_breve_fr);
            tinyMCE.get('descrizione_servizio_cat_modifica').setContent(argomento.descrizione);
          

        });

    });
    // Qua faccio funzione seleziono media dell' argomento
    selezionoMediaApprofondimento();

}

function selezionoMediaApprofondimento() {

    var id_argomento = localStorage.getItem('id_modifica_argomento')
    var argomento = "Approfondimenti";
    var ID = localStorage.getItem("ID_utente");
    $.getJSON("http://simplyappweb.mvclienti.com/webservices/seleziono_media_argomento.aspx?id_argomento=" + id_argomento + "&argomento=" + argomento + "&ID_utente=" + ID + "", function (dati) {
        // var blocco_news = "";
        var lunghezza = dati.length;
        var immagine = "";
        $.each(dati, function (i, media) {

            immagine = "<div class='grid-item gallery-item-card ' id='" + media.ID + "'> <img src='http://simplyappweb.mvclienti.com/Account/Uploads/Approfondimenti/galleria_img/immagini/" + media.immagine + "' rel='external' alt='image'>";
            immagine += "<div onclick='cancellaFotoModificaServizioCat(\"" + media.ID + "\");'  class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_modifica_approfondimento").append(immagine);
        });

    });
}

function cancellaFotoModificaServizioCat(ID) {

    $("#" + ID + "").hide();
    var argomento = "Approfondimenti";
    // La vado a cancellare sul server
    // Cancello News 
    $.ajax({
        type: "POST",
        data: '{ID:"' + ID + '",ID_utente: "' + localStorage.getItem('ID_utente') + '",argomento: "' + argomento + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/servizi_app.aspx/cancelloMediaArgomento',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;

            if (ritorno == "si") {
                var siCancellaMediaArgomento = "<div class='modal-content'><h4>Foto eliminata </h4><p>Foto eliminta con successo!!</p></div>";
                siCancellaMediaArgomento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_cancellazione_media_approfondimento").html("");
                $("#box_cancellazione_media_approfondimento").append(siCancellaMediaArgomento);
                $("#apri_box_cancellazione_media_approfondimento").click();
            } else {
                var noCancellaMediaArgomento = "<div class='modal-content'><h4>Foto non eliminata </h4><p>Foto non eliminata!!<br>Si prega di riprovare. </p></div>";
                noCancellaMediaArgomento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_cancellazione_media_approfondimento").html("");
                $("#box_cancellazione_media_approfondimento").append(noCancellaMediaArgomento);
                $("#apri_box_cancellazione_media_approfondimento").click();
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

function aggiornaApprofondimento(posizione, titolo, titolo_en, titolo_fr, link, video, data, descrizione_breve, descrizione_breve_en, descrizione_breve_fr, descrizione, descrizione_en, descrizione_fr) {


    
    var ID_categoria = localStorage.getItem('id_categoria_approfondimento_modifica_singolo');

    $.ajax({
        type: "POST",
        data: '{posizione:"' + posizione + '",titolo:"' + titolo + '",titolo_en:"' + titolo_en + '",titolo_fr:"' + titolo_fr + '",link:"' + link + '",video:"' + video + '",data:"' + data + '",id_categoria:"' + ID_categoria + '",descrizione_breve:"' + descrizione_breve + '",descrizione_breve_en:"' + descrizione_breve_en + '",descrizione_breve_fr:"' + descrizione_breve_fr + '",descrizione:"' + descrizione + '",descrizione_en:"' + descrizione_en + '",descrizione_fr:"' + descrizione_fr + '", ID_utente:"' + localStorage.getItem("ID_utente") + '", ID_servizio: "' + localStorage.getItem('id_modifica_argomento') + '"}',
        url: 'http://simplyappweb.mvclienti.com/webservices/aggiorno_prodotto.aspx/updateApprofondimento',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var ritorno = data.d;

            if (ritorno == "Si") {
                var siCaricamento = "<div class='modal-content'><h4>Approfondimento Aggiornato </h4><p>Approfondimento aggiornato correttamente</p></div>";
                siCaricamento += "<div class='modal-footer'> <a href='#dashboard' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_aggiornamento_approfondimento").html("");
                $("#box_aggiornamento_approfondimento").append(siCaricamento);
                $("#apri_box_aggiornamento_approfondimento").click();
            } else {
                var noCaricamento = "<div class='modal-content'><h4>Approfondimento non aggiornato </h4><p>Approfondimento non aggiornato.<br>Si prega di riprovare </p></div>";
                noCaricamento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_aggiornamento_approfondimento").html("");
                $("#box_aggiornamento_approfondimento").append(noCaricamento);
                $("#apri_box_aggiornamento_approfondimento").click();
            }

        },
        error: function (xhr, textStatus, error) {
            alert(xhr.statusText);
            alert(textStatus);
            alert(error);
        }
    });
}

// FINE APPROFONDIMENTI
                             