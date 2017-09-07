/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var contatore_upload_foto = 0;
var contatore_foto_scattate = 0;

var app = {
    
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    // Parte news - eventi - promo

    takePicture: function () {
        if (localStorage.getItem("argomento") == "") {
            var scegli_argomento = "<div class='modal-content'><h4>Attenzione </h4><p>Scegli argomento prima di scattare la foto!! </p></div>";
            scegli_argomento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#scegli_argomento").html("");
            $("#scegli_argomento").append(scegli_argomento);
            $("#apri_scegli_argomento").click();
        } else {
            navigator.camera.getPicture(onSuccess, onFail, {
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI,
                saveToPhotoAlbum: true,
                correctOrientation: true,

            });
        }
       
        function onSuccess(imageURI) {
           
            var id = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            var id_corretto = id.replace(".jpg", "");
            var immagine = "";
            var ID_user = localStorage.getItem("ID_utente");
            var tipo = localStorage.getItem("argomento");
            contatore_foto_scattate++;
            immagine = "<div class='grid-item gallery-item-card ' id='" + id_corretto + "'> <img src='" + imageURI + "' alt='image'>";
            immagine += "<div onclick='app.cancellaFoto(\"" + imageURI + "\");'  class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img").append(immagine);
            /*Qua salvo le foto nel db per poi essere caricate */
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {
                   
                    tx.executeSql("INSERT INTO media (nome_file,ID_user,tipo) VALUES (?,?,?)", [imageURI, ID_user, tipo]);
                    if (localStorage.getItem("sito_check") == 1)
                    {
                        uploadFoto.setAttribute('style', 'display:block;');
                    }
                   
                },
                function (e) {
                    // Scommenta per vedere eventuale errore
                   alert("Errore" + e.message);
                },
                function () {
                    // Scommenta per vedere il corretto inserimento
                   // alert("Immagine inserita nel db");
                }
            )
        }

        function onFail(message) {
          //  alert("Errore: " + message);
        }
      
        
    },

    openFilePicker: function () {
        if (localStorage.getItem("argomento") == "") {
            var scegli_argomento = "<div class='modal-content'><h4>Attenzione </h4><p>Scegli argomento prima di selezionare la foto!! </p></div>";
            scegli_argomento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#scegli_argomento").html("");
            $("#scegli_argomento").append(scegli_argomento);
            $("#apri_scegli_argomento").click();
        } else {
            navigator.camera.getPicture(onSuccess, onFail, {
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
                encodingType: Camera.EncodingType.JPEG,
                mediaType: Camera.MediaType.PICTURE,
                allowEdit: true,
                correctOrientation: true

            });
        }
       
        function onSuccess(imageURI) {
          
            var id = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            var id_corretto = id.replace(".jpg", "");
            var immagine = "";
            var ID_user = localStorage.getItem("ID_utente");
            var tipo = localStorage.getItem("argomento");
            contatore_foto_scattate++;
        
            immagine = "<div class='grid-item gallery-item-card' id='" + id_corretto + "'> <img src='" + imageURI + "' alt='image'>";
            immagine += "<div onclick='app.cancellaFoto(\"" + imageURI + "\");' class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img").append(immagine);
            /*Qua salvo le foto nel db per poi essere caricate */
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {
                 
                    tx.executeSql("INSERT INTO media (nome_file,ID_user,tipo) VALUES (?,?,?)", [imageURI, ID_user, tipo]);
                   
                    alert(localStorage.getItem("sito_check"));
                    if (localStorage.getItem("sito_check") == 1) {
                      
                     
                          uploadFoto.setAttribute('style', 'display:block;');
                    }

                },
                function (e) {
                    // Scommenta per vedere eventuale errore
                   // alert("Errore" + e.message);
                },
                function () {
                    // Scommenta per vedere il corretto inserimento
                    // alert("Immagine inserita nel db");
                }
            )
            
        }

        function onFail(message) {
           // alert("Errore: " + message);
        }
    },

    caricaImmagine: function () {
        uploadFoto.setAttribute('style', 'display:none;');
        loadingImg.setAttribute('style', 'display:block;');
        db.transaction(selezionoImg, erroreSelezioneDati, successoSelezioneDati);
        
        function selezionoImg(tx) {
            // Serve per contare se almeno c'è uno tra news/promo/eventi/gallery/ per poi append html
          
               
                tx.executeSql("SELECT * FROM media ", [],
                 function (tx, dati) {
                     var len = dati.rows.length;
                     var checkBox = "";
                     if (len != 0) {
                         for (var i = 0; i < len; i++) {
                             var imageURI = dati.rows.item(i).nome_file
                           
                             var options = new FileUploadOptions();
                             options.fileKey = "file";
                             options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
                             options.mimeType = "image/jpeg";

                             var headers = { 'headerParam': 'headerValue' };

                             options.headers = headers;

                             var ft = new FileTransfer();
                             ft.onprogress = function (progressEvent) {
                                 if (progressEvent.lengthComputable) {
                                  
                                     var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
                                   
                                     statusDom.innerHTML = perc + "% loaded...";
                                 } else {
                                     if (statusDom.innerHTML == "") {
                                         statusDom.innerHTML = "Loading";
                                     } else {
                                         statusDom.innerHTML += ".";
                                     }
                                 }
                             };

                             var params = new Object();
                             params.argomento = dati.rows.item(i).tipo;
                             params.ID_user = dati.rows.item(i).ID_user;
                            
                             options.params = params;
                             options.chunkedMode = false;
                           
                             var ft = new FileTransfer();
                             ft.upload(imageURI, "http://simplyappweb.mvclienti.com/webservices/upload_file.asmx/HelloWorld", win, fail, options);
                      }
                     
                     }
                    
                 },
                 function () {
                     alert("Errore" + e.message);
                 });
            }
          

        function win(r) {
            //  alert("si");
            //  alert("Code = " + r.responseCode); 
            // alert("Response = " + r.response);
            contatore_upload_foto++;
            if (r.responseCode == 200 && contatore_upload_foto==contatore_foto_scattate) {
                loadingImg.setAttribute('style', 'display:none;');
                var siUpload = "<div class='modal-content'><h4>Upload " + contatore_upload_foto + " Foto </h4><p>"+contatore_upload_foto+" Foto caricata/e con successo!!</p></div>";
                siUpload += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_upload_foto").html("");
                $("#box_upload_foto").append(siUpload);
                $("#apri_box_upload_foto").click();
                contatore_upload_foto = 0;
                contatore_foto_scattate = 0;
            } 
        }

        function fail(error) {
          //  alert("An error has occurred: Code = " = error.code);
        }
        
    },

    cancellaFoto: function (img)
    {
      
        contatore_foto_scattate = contatore_foto_scattate - 1;
        var nome_file_cancellare = img
        var id = img.substr(img.lastIndexOf('/') + 1);
        var id_corretto = id.replace(".jpg", "");
        db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
        db.transaction(
            // Metodo di chiamata asincrona
            function (tx) {
                tx.executeSql("DELETE FROM media WHERE nome_file=?", [nome_file_cancellare]);
            },
            function () {
               // alert("Non è stato possibile cancellare la notizia. Riprova");

            },
            function () {
               // alert("Cancellazione effettua");
                $("#" + id_corretto + "").hide();
            }
        )
       
        
    },

  
 
    // Fine parte news - eventi - promo

    // Parte Gallery

    takePictureGallery: function () {
    
    navigator.camera.getPicture(onSuccessGallery, onFailGallery, {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        correctOrientation: true,
       
       
            
    });
    function onSuccessGallery(imageURI) {
        $("#footer_gallery").removeClass("footer_home");
        var id = imageURI.substr(imageURI.lastIndexOf('/') + 1);
        var id_corretto = id.replace(".jpg", "");
        var immagine = "";
        var ID_user = localStorage.getItem("ID_utente");
        var ID_categoria = localStorage.getItem("categoria_gallery");
        contatore_foto_scattate++;
           
        immagine = "<div class='grid-item gallery-item-card ' id='" + id_corretto + "'> <img src='" + imageURI + "' alt='image'>";
        immagine += "<div onclick='app.cancellaFotoGallery(\"" + imageURI + "\");'  class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
        $(".appendi_immagini_categoria").append(immagine);
        /*Qua salvo le foto della gallery nel db per poi essere caricate */
        db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
        db.transaction(
            // Metodo di chiamata asincrona
            function (tx) {
                   
                tx.executeSql("INSERT INTO gallery (immagine,ID_categoria, ID_utente) VALUES (?,?,?)", [imageURI, ID_categoria, ID_user]);
                uploadFotoGallery.setAttribute('style', 'display:block;');          
            },
            function (e) {
                // Scommenta per vedere eventuale errore
                alert("Errore" + e.message);
            },
            function () {
                // Scommenta per vedere il corretto inserimento
                // alert("Immagini inserita nel db nella tabella gallery");
            }
        )
    }

    function onFailGallery(message) {
       // alert("Errore: " + message);
    }
      
        
    },

    openFilePickerGallery: function () {
        $("#footer_gallery").removeClass("footer_home");
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            allowEdit: true,
            correctOrientation: true

        });
        function onSuccess(imageURI) {

            var id = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            var id_corretto = id.replace(".jpg", "");
            var immagine = "";
            var ID_user = localStorage.getItem("ID_utente");
            var ID_categoria = localStorage.getItem("categoria_gallery");
            contatore_foto_scattate++;

            immagine = "<div class='grid-item gallery-item-card ' id='" + id_corretto + "'> <img src='" + imageURI + "' alt='image'>";
            immagine += "<div onclick='app.cancellaFotoGallery(\"" + imageURI + "\");'  class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_immagini_categoria").append(immagine);
            /*Qua salvo le foto della gallery nel db per poi essere caricate */
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {

                    tx.executeSql("INSERT INTO gallery (immagine,ID_categoria, ID_utente) VALUES (?,?,?)", [imageURI, ID_categoria, ID_user]);
                    uploadFotoGallery.setAttribute('style', 'display:block;');
                },
                function (e) {
                    // Scommenta per vedere eventuale errore
                    alert("Errore" + e.message);
                },
                function () {
                    // Scommenta per vedere il corretto inserimento
                    // alert("Immagini inserita nel db nella tabella gallery");
                }
            )

        }

        function onFail(message) {
           // alert("Errore: " + message);
        }
    },

    caricaImmaginiGallery: function () {
      
        if (localStorage.getItem('categoria_gallery') != "")
        {
           
            uploadFotoGallery.setAttribute('style', 'display:none;');
            loadingImgGallery.setAttribute('style', 'display:block;');
            db.transaction(selezionoImmagineGallery);

            function selezionoImmagineGallery(tx) {

                tx.executeSql("SELECT * FROM gallery ", [],
                 function (tx, dati) {
                     var len = dati.rows.length;
                     if (len != 0) {

                         for (var i = 0; i < len; i++) {
                             var imageURI = dati.rows.item(i).immagine
                             
                             var options = new FileUploadOptions();
                             options.fileKey = "file";
                             options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
                             options.mimeType = "image/jpeg";

                             var headers = { 'headerParam': 'headerValue' };

                             options.headers = headers;

                             var ft = new FileTransfer();
                             ft.onprogress = function (progressEvent) {
                                 if (progressEvent.lengthComputable) {
                                
                                     var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
                                    
                                     statusDom.innerHTML = perc + "% loaded...";
                                 } else {
                                     if (statusDom.innerHTML == "") {
                                         statusDom.innerHTML = "Loading";
                                     } else {
                                         statusDom.innerHTML += ".";
                                     }
                                 }
                             };

                             var params = new Object();
                             params.ID_categoria = localStorage.getItem("categoria_gallery");
                             params.ID_user = dati.rows.item(i).ID_utente;
                             options.params = params;
                             options.chunkedMode = false;

                             var ft = new FileTransfer();
                             ft.upload(imageURI, "http://simplyappweb.mvclienti.com/webservices/upload_file.asmx/CaricoImmaginiGallery", winGallery, failGallery, options);
                         }

                     }

                 },
                 function () {
                     alert("Errore" + e.message);
                 });
            }
        } else {
            // Selezionare la categoria alert
            var scegli_argomento = "<div class='modal-content'><h4>Condivisione Fallita </h4><p>Scegli uan categoria per la foto!! </p></div>";
            scegli_argomento += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#scegli_categoria_gallery").html("");
            $("#scegli_categoria_gallery").append(scegli_argomento);
            $("#apri_scegli_categoria_gallery").click();
        }
      

        // Riuscita upload
        function winGallery(r) {
            //  alert("si");
            // alert("Code = " + r.responseCode); 
            //  alert("Response = " + r.response);
            //  alert("Sent = " + r.bytesSent);
            // alert(r.response);
           
            contatore_upload_foto++;
            if (r.responseCode == 200 && contatore_upload_foto == contatore_foto_scattate) {
                loadingImgGallery.setAttribute('style', 'display:none;');
                var siUpload = "<div class='modal-content'><h4>" + contatore_upload_foto +" Upload Foto Gallery </h4><p>"+contatore_upload_foto+" Foto caricata/e con successo!!</p></div>";
                siUpload += "<div class='modal-footer'> <a href='#dashboard' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_upload_foto_gallery").html("");
                $("#box_upload_foto_gallery").append(siUpload);
                $("#apri_box_upload_foto_gallery").click();
                contatore_upload_foto = 0;
                contatore_foto_scattate = 0;
               
            }
        }

        // Errore upload
       function failGallery(error) {
         //   alert("An error has occurred: Code = " = error.code);
        }

    },

    cancellaFotoGallery: function (img) {

        contatore_foto_scattate = contatore_foto_scattate - 1;
        if (contatore_foto_scattate == 0)
        {
            $("#footer_gallery").addClass("footer_home");
            uploadFotoGallery.setAttribute('style', 'display:none;');
        }
        var nome_file_cancellare = img
        var id = img.substr(img.lastIndexOf('/') + 1);
        var id_corretto = id.replace(".jpg", "");
        db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
        db.transaction(
            // Metodo di chiamata asincrona
            function (tx) {
                tx.executeSql("DELETE FROM gallery WHERE immagine=?", [nome_file_cancellare]);
            },
            function () {
               // alert("Non è stato possibile cancellare la notizia. Riprova");

            },
            function () {
               // alert("Cancellazione effettua");
               
                $("#" + id_corretto + "").hide();

            }
        )


    },

    // Modifica

    takePictureModifica: function () {

        navigator.camera.getPicture(onSuccessModifica, onFailModifica, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            saveToPhotoAlbum: true,
            correctOrientation: true,
        

        });
        function onSuccessModifica(imageURI) {

            var id = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            var id_corretto = id.replace(".jpg", "");
            var immagine = "";
            var ID_user = localStorage.getItem("ID_utente");
            var tipo = localStorage.getItem("argomento");
            contatore_foto_scattate++;
            immagine = "<div class='grid-item gallery-item-card ' id='" + id_corretto + "'> <img src='" + imageURI + "' alt='image'>";
            immagine += "<div onclick='app.cancellaFotoModifica(\"" + imageURI + "\");'  class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_modifica_nuove").append(immagine);
            /*Qua salvo le foto nel db per poi essere caricate */
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {

                    tx.executeSql("INSERT INTO media (nome_file,ID_user,tipo) VALUES (?,?,?)", [imageURI, ID_user, tipo]);
                    uploadFotoModificaFile.setAttribute('style', 'display:block;');
                    $(".appendi_img_modifica").hide();

                },
                function (e) {
                    // Scommenta per vedere eventuale errore
                    alert("Errore" + e.message);
                },
                function () {
                    // Scommenta per vedere il corretto inserimento
                    // alert("Immagine inserita nel db");
                }
            )
        }

        function onFailModifica(message) {
          //  alert("Errore: " + message);
        }


    },

    openFilePickerModifica: function () {
        navigator.camera.getPicture(onSuccessModificaPick, onFailModificaPick, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            allowEdit: true,
            correctOrientation: true

        });
        function onSuccessModificaPick(imageURI) {

            var id = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            var id_corretto = id.replace(".jpg", "");
            var immagine = "";
            var ID_user = localStorage.getItem("ID_utente");
            var tipo = localStorage.getItem('nome_argomento_modifica');
            contatore_foto_scattate++;
            immagine = "<div class='grid-item gallery-item-card' id='" + id_corretto + "'> <img src='" + imageURI + "' alt='image'>";
            immagine += "<div onclick='app.cancellaFotoModifica(\"" + imageURI + "\");' class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_modifica_nuove").append(immagine);
            /*Qua salvo le foto nel db per poi essere caricate */
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {
                  
                    tx.executeSql("INSERT INTO media (nome_file,ID_user,tipo) VALUES (?,?,?)", [imageURI, ID_user, tipo]);
                  
                    $(".appendi_img_modifica").hide();
                    uploadFotoModificaFile.setAttribute('style', 'display:block;');
                },
                function (e) {
                    // Scommenta per vedere eventuale errore
                    alert("Errore" + e.message);
                },
                function () {
                    // Scommenta per vedere il corretto inserimento
                    // alert("Immagine inserita nel db");
                }
            )

        }

        function onFailModificaPick(message) {
          //  alert("Errore: " + message);
        }
    },

    caricaImmagineModifica: function () {
    
         loadingImgModifica.setAttribute('style', 'display:block;');
        db.transaction(selezionoImgModifica, erroreSelezioneDati, successoSelezioneDati);

        function selezionoImgModifica(tx) {
            // Serve per contare se almeno c'è uno tra news/promo/eventi/gallery/ per poi append html

           
            tx.executeSql("SELECT * FROM media ", [],
             function (tx, dati) {
                 var len = dati.rows.length;
                 var checkBox = "";
                 if (len != 0) {
                     for (var i = 0; i < len; i++) {
                         var imageURI = dati.rows.item(i).nome_file
                         
                         var options = new FileUploadOptions();
                         options.fileKey = "file";
                         options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
                         options.mimeType = "image/jpeg";

                         var headers = { 'headerParam': 'headerValue' };

                         options.headers = headers;

                         var ft = new FileTransfer();
                         ft.onprogress = function (progressEvent) {
                             if (progressEvent.lengthComputable) {

                                 var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);

                                 statusDom.innerHTML = perc + "% loaded...";
                             } else {
                                 if (statusDom.innerHTML == "") {
                                     statusDom.innerHTML = "Loading";
                                 } else {
                                     statusDom.innerHTML += ".";
                                 }
                             }
                         };
                         var params = new Object();
                         params.argomento = localStorage.getItem('nome_argomento_modifica');
                         params.ID_user = dati.rows.item(i).ID_user;
                         options.params = params;
                         options.chunkedMode = false;
                         var ft = new FileTransfer();
                         ft.upload(imageURI, "http://simplyappweb.mvclienti.com/webservices/upload_file.asmx/caricaImmagineModifica", win, fail, options);
                     }

                 }

             },
             function () {
                 alert("Errore" + e.message);
             });
        }


        function win(r) {
            // alert("si");
            // alert("Code = " + r.responseCode); 
            // alert("Response = " + r.response);
            // alert("Sent = " + r.bytesSent);
            // alert(r.response);
            contatore_upload_foto++
            if (r.responseCode == 200 && contatore_upload_foto==contatore_foto_scattate) {
                uploadFotoModificaFile.setAttribute('style', 'display:none;');
                loadingImgModifica.setAttribute('style', 'display:none;');
                var siUpload = "<div class='modal-content'><h4>"+contatore_upload_foto+" Upload Foto </h4><p>"+contatore_upload_foto+" Foto caricata/e con successo!!</p></div>";
                siUpload += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_upload_foto_modifica").html("");
                $("#box_upload_foto_modifica").append(siUpload);
                $("#apri_box_upload_foto_modifica").click();
                $(".appendi_img_modifica").show();
                contatore_foto_scattate = 0;
                contatore_upload_foto = 0;
            }
        }

        function fail(error) {
          //  alert("An error has occurred: Code = " = error.code);
        }

    },

    cancellaFotoModifica: function (img) {

        var nome_file_cancellare = img
        var id = img.substr(img.lastIndexOf('/') + 1);
        var id_corretto = id.replace(".jpg", "");
        db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
        db.transaction(
            // Metodo di chiamata asincrona
            function (tx) {
                tx.executeSql("DELETE FROM media WHERE nome_file=?", [nome_file_cancellare]);
            },
            function () {
                // alert("Non è stato possibile cancellare la notizia. Riprova");

            },
            function () {
                // alert("Cancellazione effettua");

                $("#" + id_corretto + "").hide();

            }
        )


    },

    // Modifica singola foto Gallery

    takePictureModificaFotoSingola: function () {

        navigator.camera.getPicture(onSuccessModificaFotoSingola, onFailModificaFotoSingola, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            saveToPhotoAlbum: true,
            correctOrientation: true,

        });
        function onSuccessModificaFotoSingola(imageURI) {

          
            var blocco_img = "";
            $(".appendi_immmagine_modifica_singola").html("");
            blocco_img += "<div class='grid-item gallery-item-card'><div class='box_height_img'> <img src='" + imageURI + "' rel='external' alt='image'/></div>";
            $(".appendi_immmagine_modifica_singola").append(blocco_img);
            uploadFotoSingolaModificaGallery.setAttribute('style', 'display:block;');
            localStorage.setItem("foto_singola_da_caricare", imageURI);
         
       
        }

        function onFailModificaFotoSingola(message) {
          //  alert("Errore: " + message);
        }


    },

    openFilePickerModificaFotoSingola: function () {

        navigator.camera.getPicture(onSuccessModificaFotoSingolaPick, onFailModificaFotoSingolaPick, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            allowEdit: true,
            correctOrientation: true

        });
        function onSuccessModificaFotoSingolaPick(imageURI) {


            var blocco_img = "";
            $(".appendi_immmagine_modifica_singola").html("");
            blocco_img += "<div class='grid-item gallery-item-card'><div class='box_height_img'> <img src='"+imageURI+"' rel='external' alt='image'/></div>";      
            $(".appendi_immmagine_modifica_singola").append(blocco_img);
            uploadFotoSingolaModificaGallery.setAttribute('style', 'display:block;');
            localStorage.setItem("foto_singola_da_caricare", imageURI);
         

            /*Qua salvo le foto nel db per poi essere caricate */

        }

        function onFailModificaFotoSingolaPick(message) {
          //  alert("Errore: " + message);
        }


    },

    caricaImmagineModificaFotoSingola: function () {
        loadingImgModificaFotoSingola.setAttribute('style', 'display:block;');
        var imageURI = localStorage.getItem("foto_singola_da_caricare");
        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";
        var headers = { 'headerParam': 'headerValue' };
        options.headers = headers;
        var params = new Object();
        params.hold_foto = localStorage.getItem("foto_da_cancellare_se_sostituita");
        params.ID_gallery = localStorage.getItem("ID_foto_singola_gallery");
        params.ID_user = localStorage.getItem("ID_utente");
        options.params = params;
        var ft = new FileTransfer();
        options.chunkedMode = false;
        var ft = new FileTransfer();
        ft.upload(imageURI, "http://simplyappweb.mvclienti.com/webservices/upload_file.asmx/caricoSingolaImmagineGallery", win, fail, options);

        function win(r) {
            // alert("si");
            // alert("Code = " + r.responseCode); 
            // alert("Response = " + r.response);
            // alert("Sent = " + r.bytesSent);
            // alert(r.response);
            if (r.responseCode == 200) {
                uploadFotoSingolaModificaGallery.setAttribute('style', 'display:none;');
                loadingImgModificaFotoSingola.setAttribute('style', 'display:none;');
                var siUpload = "<div class='modal-content'><h4>Upload Foto </h4><p>Foto caricata con successo!!</p></div>";
                siUpload += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_upload_foto_singola_gallery").html("");
                $("#box_upload_foto_singola_gallery").append(siUpload);
                $("#apri_box_upload_foto_singola_gallery").click();
                
            }
        }

        function fail(error) {
         //   alert("An error has occurred: Code = " = error.code);
        }
    },


};


