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
var contatore_foto_scattate_app = 0;
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
    receivedEvent: function (id) {
      
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
                   
                   // alert(localStorage.getItem("sito_check"));
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
                             ft.upload(imageURI, "http://simplyappweb.mvclienti.com/webservices/upload_file.asmx/UploadFoto", win, fail, options);
                      }
                     
                     }
                    
                 },
                 function () {
                     alert("Errore" + e.message);
                 });
            }
          

        function win(r) {
           /*  alert("si");
              alert("Code = " + r.responseCode); 
             alert("Response = " + r.response);*/
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
           // alert("An error has occurred: Code = " = error.code);
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

    // Prodotto Inserisci

    takePictureProdotto: function () {
      
            navigator.camera.getPicture(onSuccess, onFail, {
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI,
                saveToPhotoAlbum: true,
                correctOrientation: true,

            });
        

        function onSuccess(imageURI) {

            var id = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            var id_corretto = id.replace(".jpg", "");
            var immagine = "";
            var ID_user = localStorage.getItem("ID_utente");
            var tipo = localStorage.getItem("argomento");
            contatore_foto_scattate++;
            immagine = "<div class='grid-item gallery-item-card ' id='" + id_corretto + "'> <img src='" + imageURI + "' alt='image'>";
            immagine += "<div onclick='app.cancellaFotoProdotto(\"" + imageURI + "\");'  class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_prodotto").append(immagine);
            /*Qua salvo le foto nel db per poi essere caricate */
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {

                    tx.executeSql("INSERT INTO media (nome_file,ID_user,tipo) VALUES (?,?,?)", [imageURI, ID_user, tipo]);
                    if (localStorage.getItem("sito_check") == 1) {
                        uploadFotoProdotto.setAttribute('style', 'display:block;');
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
             // alert("Errore: " + message);
        }


    },

    openFilePickerProdotto: function () {
     
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
            var tipo = localStorage.getItem("argomento");
            contatore_foto_scattate++;

            immagine = "<div class='grid-item gallery-item-card' id='" + id_corretto + "'> <img src='" + imageURI + "' alt='image'>";
            immagine += "<div onclick='app.cancellaFotoProdotto(\"" + imageURI + "\");' class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_prodotto").append(immagine);
            /*Qua salvo le foto nel db per poi essere caricate */
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {

                    tx.executeSql("INSERT INTO media (nome_file,ID_user,tipo) VALUES (?,?,?)", [imageURI, ID_user, tipo]);

                  
                    if (localStorage.getItem("sito_check") == 1) {


                        uploadFotoProdotto.setAttribute('style', 'display:block;');
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
          //  alert("Errore: " + message);
        }
    },

    caricaImmagineProdotto: function () {
        uploadFotoProdotto.setAttribute('style', 'display:none;');
        loadingImgProdotto.setAttribute('style', 'display:block;');
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
                         ft.upload(imageURI, "http://simplyappweb.mvclienti.com/webservices/upload_file.asmx/caricoImmaginiProdrotti", win, fail, options);
                     }

                 }

             },
             function () {
                 alert("Errore" + e.message);
             });
        }


        function win(r) {
            // alert("si");
            //  alert("Code = " + r.responseCode); 
           // alert("Response = " + r.response);
            contatore_upload_foto++;
            if (r.responseCode == 200 && contatore_upload_foto == contatore_foto_scattate) {
                loadingImgProdotto.setAttribute('style', 'display:none;');
                var siUpload = "<div class='modal-content'><h4>Upload " + contatore_upload_foto + " Foto </h4><p>" + contatore_upload_foto + " Foto caricata/e con successo!!</p></div>";
                siUpload += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_upload_foto_prodotti").html("");
                $("#box_upload_foto_prodotti").append(siUpload);
                $("#apri_box_upload_foto_prodotti").click();
                contatore_upload_foto = 0;
                contatore_foto_scattate = 0;
            }
        }

        function fail(error) {
            //  alert("An error has occurred: Code = " = error.code);
        }

    },

    cancellaFotoProdotto: function (img) {

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

    // Modifica Prodotto

    takePictureModificaProdotto: function () {

        navigator.camera.getPicture(onSuccessModificaProdotto, onFailModificaProdotto, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            saveToPhotoAlbum: true,
            correctOrientation: true,


        });
        function onSuccessModificaProdotto(imageURI) {

            var id = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            var id_corretto = id.replace(".jpg", "");
            var immagine = "";
            var ID_user = localStorage.getItem("ID_utente");
            var tipo = "Prodotti";
            contatore_foto_scattate++;
            immagine = "<div class='grid-item gallery-item-card ' id='" + id_corretto + "'> <img src='" + imageURI + "' alt='image'>";
            immagine += "<div onclick='app.cancellaFotoModificaProdotto(\"" + imageURI + "\");'  class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_modifica_prodotto").append(immagine);
            /*Qua salvo le foto nel db per poi essere caricate */
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {

                    tx.executeSql("INSERT INTO media (nome_file,ID_user,tipo) VALUES (?,?,?)", [imageURI, ID_user, tipo]);
                    uploadFotoModificaFileProdotto.setAttribute('style', 'display:block;');
                    $(".appendi_img_modifica_prodotto").hide();

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

        function onFailModificaProdotto(message) {
            //  alert("Errore: " + message);
        }


    },

    openFilePickerModificaProdotto: function () {
        navigator.camera.getPicture(onSuccessModificaPickProdotto, onFailModificaPickProdotto, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            allowEdit: true,
            correctOrientation: true

        });
        function onSuccessModificaPickProdotto(imageURI) {

            var id = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            var id_corretto = id.replace(".jpg", "");
            var immagine = "";
            var ID_user = localStorage.getItem("ID_utente");
            var tipo = "Prodotti"
            contatore_foto_scattate++;
            immagine = "<div class='grid-item gallery-item-card' id='" + id_corretto + "'> <img src='" + imageURI + "' alt='image'>";
            immagine += "<div onclick='app.cancellaFotoModificaProdotto(\"" + imageURI + "\");' class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_modifica_prodotto").append(immagine);
            /*Qua salvo le foto nel db per poi essere caricate */
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {

                    tx.executeSql("INSERT INTO media (nome_file,ID_user,tipo) VALUES (?,?,?)", [imageURI, ID_user, tipo]);

                    $(".appendi_img_modifica_prodotto").hide();
                    uploadFotoModificaFileProdotto.setAttribute('style', 'display:block;');
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

        function onFailModificaPickProdotto(message) {
            //  alert("Errore: " + message);
        }
    },

    caricaImmagineModificaProdotto: function () {

        loadingImgModificaProdotto.setAttribute('style', 'display:block;');
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
                         params.argomento = "Prodotti"
                         params.ID_user = dati.rows.item(i).ID_user;
                         options.params = params;
                         options.chunkedMode = false;
                         var ft = new FileTransfer();
                        
                         ft.upload(imageURI, "http://simplyappweb.mvclienti.com/webservices/upload_file.asmx/caricaImmagineModificaProdotto", win, fail, options);
                     }

                 }

             },
             function () {
                 alert("Errore" + e.message);
             });
        }


        function win(r) {
           /*  alert("si");
             alert("Code = " + r.responseCode); 
             alert("Response = " + r.response);
             alert("Sent = " + r.bytesSent);
             alert(r.response);*/
            contatore_upload_foto++
            if (r.responseCode == 200 && contatore_upload_foto == contatore_foto_scattate) {
                uploadFotoModificaFileProdotto.setAttribute('style', 'display:none;');
                loadingImgModificaProdotto.setAttribute('style', 'display:none;');
                var siUpload = "<div class='modal-content'><h4>" + contatore_upload_foto + " Upload Foto </h4><p>" + contatore_upload_foto + " Foto caricata/e con successo!!</p></div>";
                siUpload += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_upload_foto_modifica_prodotto").html("");
                $("#box_upload_foto_modifica_prodotto").append(siUpload);
                $("#apri_box_upload_foto_modifica_prodotto").click();
                $(".appendi_img_modifica_prodotto").show();
                contatore_foto_scattate = 0;
                contatore_upload_foto = 0;
            }
        }

        function fail(error) {
            //  alert("An error has occurred: Code = " = error.code);
        }

    },

    cancellaFotoModificaProdotto: function (img) {

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

    // Realizzazione Inserisci

    takePictureRealizzazione: function () {

        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            saveToPhotoAlbum: true,
            correctOrientation: true,

        });


        function onSuccess(imageURI) {

            var id = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            var id_corretto = id.replace(".jpg", "");
            var immagine = "";
            var ID_user = localStorage.getItem("ID_utente");
            var tipo = localStorage.getItem("argomento");
            contatore_foto_scattate++;
            immagine = "<div class='grid-item gallery-item-card ' id='" + id_corretto + "'> <img src='" + imageURI + "' alt='image'>";
            immagine += "<div onclick='app.cancellaFotoRealizzazione(\"" + imageURI + "\");'  class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_realizzazione").append(immagine);
            /*Qua salvo le foto nel db per poi essere caricate */
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {

                    tx.executeSql("INSERT INTO media (nome_file,ID_user,tipo) VALUES (?,?,?)", [imageURI, ID_user, tipo]);
                    if (localStorage.getItem("sito_check") == 1) {
                        uploadFotoRealizzazione.setAttribute('style', 'display:block;');
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

    openFilePickerRealizzazione: function () {

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
            var tipo = localStorage.getItem("argomento");
            contatore_foto_scattate++;

            immagine = "<div class='grid-item gallery-item-card' id='" + id_corretto + "'> <img src='" + imageURI + "' alt='image'>";
            immagine += "<div onclick='app.cancellaFotoRealizzazione(\"" + imageURI + "\");' class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_realizzazione").append(immagine);
            /*Qua salvo le foto nel db per poi essere caricate */
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {

                    tx.executeSql("INSERT INTO media (nome_file,ID_user,tipo) VALUES (?,?,?)", [imageURI, ID_user, tipo]);

                  
                    if (localStorage.getItem("sito_check") == 1) {


                        uploadFotoRealizzazione.setAttribute('style', 'display:block;');
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

    caricaImmagineRealizzazione: function () {
        uploadFotoRealizzazione.setAttribute('style', 'display:none;');
        loadingImgRealizzazione.setAttribute('style', 'display:block;');
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
                         ft.upload(imageURI, "http://simplyappweb.mvclienti.com/webservices/upload_file.asmx/CaricoImmaginiRealizzazioni", win, fail, options);
                     }

                 }

             },
             function () {
                 alert("Errore" + e.message);
             });
        }


        function win(r) {
            // alert("si");
            //  alert("Code = " + r.responseCode); 
            // alert("Response = " + r.response);
            contatore_upload_foto++;
            if (r.responseCode == 200 && contatore_upload_foto == contatore_foto_scattate) {
                loadingImgRealizzazione.setAttribute('style', 'display:none;');
                var siUpload = "<div class='modal-content'><h4>Upload " + contatore_upload_foto + " Foto </h4><p>" + contatore_upload_foto + " Foto caricata/e con successo!!</p></div>";
                siUpload += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_upload_foto_realizzazioni").html("");
                $("#box_upload_foto_realizzazioni").append(siUpload);
                $("#apri_box_upload_foto_realizzazioni").click();
                contatore_upload_foto = 0;
                contatore_foto_scattate = 0;
            }
        }

        function fail(error) {
            //  alert("An error has occurred: Code = " = error.code);
        }

    },

    cancellaFotoRealizzazione: function (img) {

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

    // Modifica Realizzazione

    takePictureModificaRealizzazione: function () {

        navigator.camera.getPicture(onSuccessModificaProdotto, onFailModificaProdotto, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            saveToPhotoAlbum: true,
            correctOrientation: true,


        });
        function onSuccessModificaProdotto(imageURI) {

            var id = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            var id_corretto = id.replace(".jpg", "");
            var immagine = "";
            var ID_user = localStorage.getItem("ID_utente");
            var tipo = "Prodotti";
            contatore_foto_scattate++;
            immagine = "<div class='grid-item gallery-item-card ' id='" + id_corretto + "'> <img src='" + imageURI + "' alt='image'>";
            immagine += "<div onclick='app.cancellaFotoModificaRealizzazione(\"" + imageURI + "\");'  class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_modifica_realizzazione").append(immagine);
            /*Qua salvo le foto nel db per poi essere caricate */
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {

                    tx.executeSql("INSERT INTO media (nome_file,ID_user,tipo) VALUES (?,?,?)", [imageURI, ID_user, tipo]);
                    uploadFotoModificaFileRealizzazione.setAttribute('style', 'display:block;');
                    $(".appendi_img_modifica_realizzazione").hide();

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

        function onFailModificaProdotto(message) {
            //  alert("Errore: " + message);
        }


    },

    openFilePickerModificaRealizzazione: function () {
        navigator.camera.getPicture(onSuccessModificaPickProdotto, onFailModificaPickProdotto, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            allowEdit: true,
            correctOrientation: true

        });
        function onSuccessModificaPickProdotto(imageURI) {

            var id = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            var id_corretto = id.replace(".jpg", "");
            var immagine = "";
            var ID_user = localStorage.getItem("ID_utente");
            var tipo = "Realizzazioni"
            contatore_foto_scattate++;
            immagine = "<div class='grid-item gallery-item-card' id='" + id_corretto + "'> <img src='" + imageURI + "' alt='image'>";
            immagine += "<div onclick='app.cancellaFotoModificaRealizzazione(\"" + imageURI + "\");' class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_modifica_realizzazione").append(immagine);
            /*Qua salvo le foto nel db per poi essere caricate */
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {

                    tx.executeSql("INSERT INTO media (nome_file,ID_user,tipo) VALUES (?,?,?)", [imageURI, ID_user, tipo]);

                    $(".appendi_img_modifica_realizzazione").hide();
                    uploadFotoModificaFileRealizzazione.setAttribute('style', 'display:block;');
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

        function onFailModificaPickProdotto(message) {
            //  alert("Errore: " + message);
        }
    },

    caricaImmagineModificaRealizzazione: function () {

        loadingImgModificaRealizzazione.setAttribute('style', 'display:block;');
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
                         params.argomento = "Realizzazioni";
                         params.ID_user = dati.rows.item(i).ID_user;
                         options.params = params;
                         options.chunkedMode = false;
                         var ft = new FileTransfer();

                         ft.upload(imageURI, "http://simplyappweb.mvclienti.com/webservices/upload_file.asmx/caricaImmagineModificaRealizzazione", win, fail, options);
                     }

                 }

             },
             function () {
                 alert("Errore" + e.message);
             });
        }


        function win(r) {
           /*   alert("si");
              alert("Code = " + r.responseCode); 
              alert("Response = " + r.response);
              alert("Sent = " + r.bytesSent);
              alert(r.response);*/
            contatore_upload_foto++
            if (r.responseCode == 200 && contatore_upload_foto == contatore_foto_scattate) {
                uploadFotoModificaFileRealizzazione.setAttribute('style', 'display:none;');
                loadingImgModificaRealizzazione.setAttribute('style', 'display:none;');
                var siUpload = "<div class='modal-content'><h4>" + contatore_upload_foto + " Upload Foto </h4><p>" + contatore_upload_foto + " Foto caricata/e con successo!!</p></div>";
                siUpload += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_upload_foto_modifica_realizzazione").html("");
                $("#box_upload_foto_modifica_realizzazione").append(siUpload);
                $("#apri_box_upload_foto_modifica_realizzazione").click();
                $(".appendi_img_modifica_realizzazione").show();
                contatore_foto_scattate = 0;
                contatore_upload_foto = 0;
            }
        }

        function fail(error) {
            //  alert("An error has occurred: Code = " = error.code);
        }

    },

    cancellaFotoModificaRealizzazione: function (img) {

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

    // Servizi

    takePictureServizio: function () {

        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            saveToPhotoAlbum: true,
            correctOrientation: true,

        });


        function onSuccess(imageURI) {

            var id = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            var id_corretto = id.replace(".jpg", "");
            var immagine = "";
            var ID_user = localStorage.getItem("ID_utente");
            var tipo = localStorage.getItem("argomento");
            contatore_foto_scattate++;
            immagine = "<div class='grid-item gallery-item-card ' id='" + id_corretto + "'> <img src='" + imageURI + "' alt='image'>";
            immagine += "<div onclick='app.cancellaFotoServizio(\"" + imageURI + "\");'  class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_servizio").append(immagine);
            /*Qua salvo le foto nel db per poi essere caricate */
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {

                    tx.executeSql("INSERT INTO media (nome_file,ID_user,tipo) VALUES (?,?,?)", [imageURI, ID_user, tipo]);
                    if (localStorage.getItem("sito_check") == 1) {
                        uploadFotoServizio.setAttribute('style', 'display:block;');
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

    openFilePickerServizio: function () {

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
            var tipo = localStorage.getItem("argomento");
            contatore_foto_scattate++;

            immagine = "<div class='grid-item gallery-item-card' id='" + id_corretto + "'> <img src='" + imageURI + "' alt='image'>";
            immagine += "<div onclick='app.cancellaFotoServizio(\"" + imageURI + "\");' class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_servizio").append(immagine);
            /*Qua salvo le foto nel db per poi essere caricate */
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {

                    tx.executeSql("INSERT INTO media (nome_file,ID_user,tipo) VALUES (?,?,?)", [imageURI, ID_user, tipo]);


                    if (localStorage.getItem("sito_check") == 1) {


                        uploadFotoServizio.setAttribute('style', 'display:block;');
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

    caricaImmagineServizio: function () {
        uploadFotoServizio.setAttribute('style', 'display:none;');
        loadingImgServizio.setAttribute('style', 'display:block;');
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
                         ft.upload(imageURI, "http://simplyappweb.mvclienti.com/webservices/upload_file.asmx/CaricoImmaginiServizi", win, fail, options);
                     }

                 }

             },
             function () {
                 alert("Errore" + e.message);
             });
        }


        function win(r) {
            /* alert("si");
              alert("Code = " + r.responseCode); 
             alert("Response = " + r.response);*/
            contatore_upload_foto++;
            if (r.responseCode == 200 && contatore_upload_foto == contatore_foto_scattate) {
                loadingImgServizio.setAttribute('style', 'display:none;');
                var siUpload = "<div class='modal-content'><h4>Upload " + contatore_upload_foto + " Foto </h4><p>" + contatore_upload_foto + " Foto caricata/e con successo!!</p></div>";
                siUpload += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_upload_foto_servizi").html("");
                $("#box_upload_foto_servizi").append(siUpload);
                $("#apri_box_upload_foto_servizi").click();
                contatore_upload_foto = 0;
                contatore_foto_scattate = 0;
            }
        }

        function fail(error) {
            //  alert("An error has occurred: Code = " = error.code);
        }

    },

    cancellaFotoServizio: function (img) {

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

    // Modifica Servizio

    takePictureModificaServizio: function () {

        navigator.camera.getPicture(onSuccessModificaProdotto, onFailModificaProdotto, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            saveToPhotoAlbum: true,
            correctOrientation: true,


        });
        function onSuccessModificaProdotto(imageURI) {

            var id = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            var id_corretto = id.replace(".jpg", "");
            var immagine = "";
            var ID_user = localStorage.getItem("ID_utente");
            var tipo = "Prodotti";
            contatore_foto_scattate++;
            immagine = "<div class='grid-item gallery-item-card ' id='" + id_corretto + "'> <img src='" + imageURI + "' alt='image'>";
            immagine += "<div onclick='app.cancellaFotoModificaServizio(\"" + imageURI + "\");'  class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_modifica_servizio").append(immagine);
            /*Qua salvo le foto nel db per poi essere caricate */
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {

                    tx.executeSql("INSERT INTO media (nome_file,ID_user,tipo) VALUES (?,?,?)", [imageURI, ID_user, tipo]);
                    uploadFotoModificaFileServizio.setAttribute('style', 'display:block;');
                    $(".appendi_img_modifica_servizio").hide();

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

        function onFailModificaProdotto(message) {
            //  alert("Errore: " + message);
        }


    },

    openFilePickerModificaServizio: function () {
        navigator.camera.getPicture(onSuccessModificaPickProdotto, onFailModificaPickProdotto, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            allowEdit: true,
            correctOrientation: true

        });
        function onSuccessModificaPickProdotto(imageURI) {

            var id = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            var id_corretto = id.replace(".jpg", "");
            var immagine = "";
            var ID_user = localStorage.getItem("ID_utente");
            var tipo = "Realizzazioni"
            contatore_foto_scattate++;
            immagine = "<div class='grid-item gallery-item-card' id='" + id_corretto + "'> <img src='" + imageURI + "' alt='image'>";
            immagine += "<div onclick='app.cancellaFotoModificaServizio(\"" + imageURI + "\");' class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_modifica_servizio").append(immagine);
            /*Qua salvo le foto nel db per poi essere caricate */
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {

                    tx.executeSql("INSERT INTO media (nome_file,ID_user,tipo) VALUES (?,?,?)", [imageURI, ID_user, tipo]);

                    $(".appendi_img_modifica_servizio").hide();
                    uploadFotoModificaFileServizio.setAttribute('style', 'display:block;');
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

        function onFailModificaPickProdotto(message) {
            //  alert("Errore: " + message);
        }
    },

    caricaImmagineModificaServizio: function () {

        loadingImgModificaServizio.setAttribute('style', 'display:block;');
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
                         params.argomento = "Servizi";
                         params.ID_user = dati.rows.item(i).ID_user;
                         options.params = params;
                         options.chunkedMode = false;
                         var ft = new FileTransfer();

                         ft.upload(imageURI, "http://simplyappweb.mvclienti.com/webservices/upload_file.asmx/caricaImmagineModificaServizio", win, fail, options);
                     }

                 }

             },
             function () {
                 alert("Errore" + e.message);
             });
        }


        function win(r) {
             /*  alert("si");
               alert("Code = " + r.responseCode); 
               alert("Response = " + r.response);
               alert("Sent = " + r.bytesSent);
               alert(r.response);*/
            contatore_upload_foto++
            if (r.responseCode == 200 && contatore_upload_foto == contatore_foto_scattate) {
                uploadFotoModificaFileServizio.setAttribute('style', 'display:none;');
                loadingImgModificaServizio.setAttribute('style', 'display:none;');
                var siUpload = "<div class='modal-content'><h4>" + contatore_upload_foto + " Upload Foto </h4><p>" + contatore_upload_foto + " Foto caricata/e con successo!!</p></div>";
                siUpload += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_upload_foto_modifica_servizio").html("");
                $("#box_upload_foto_modifica_servizio").append(siUpload);
                $("#apri_box_upload_foto_modifica_servizio").click();
                $(".appendi_img_modifica_servizio").show();
                contatore_foto_scattate = 0;
                contatore_upload_foto = 0;
            }
        }

        function fail(error) {
            //  alert("An error has occurred: Code = " = error.code);
        }

    },

    cancellaFotoModificaServizio: function (img) {

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

    // Servizi Cat Inserisci

    takePictureServiziCat: function () {

        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            saveToPhotoAlbum: true,
            correctOrientation: true,

        });


        function onSuccess(imageURI) {

            var id = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            var id_corretto = id.replace(".jpg", "");
            var immagine = "";
            var ID_user = localStorage.getItem("ID_utente");
            var tipo = localStorage.getItem("argomento");
            contatore_foto_scattate++;
            immagine = "<div class='grid-item gallery-item-card ' id='" + id_corretto + "'> <img src='" + imageURI + "' alt='image'>";
            immagine += "<div onclick='app.cancellaFotoServiziCat(\"" + imageURI + "\");'  class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_servizi_cat").append(immagine);
            /*Qua salvo le foto nel db per poi essere caricate */
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {

                    tx.executeSql("INSERT INTO media (nome_file,ID_user,tipo) VALUES (?,?,?)", [imageURI, ID_user, tipo]);
                    if (localStorage.getItem("sito_check") == 1) {
                        uploadFotoServiziCat.setAttribute('style', 'display:block;');
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

    openFilePickerServiziCat: function () {

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
            var tipo = localStorage.getItem("argomento");
            contatore_foto_scattate++;

            immagine = "<div class='grid-item gallery-item-card' id='" + id_corretto + "'> <img src='" + imageURI + "' alt='image'>";
            immagine += "<div onclick='app.cancellaFotoServiziCat(\"" + imageURI + "\");' class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_servizi_cat").append(immagine);
            /*Qua salvo le foto nel db per poi essere caricate */
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {

                    tx.executeSql("INSERT INTO media (nome_file,ID_user,tipo) VALUES (?,?,?)", [imageURI, ID_user, tipo]);


                    if (localStorage.getItem("sito_check") == 1) {


                        uploadFotoServiziCat.setAttribute('style', 'display:block;');
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

    caricaImmagineServiziCat: function () {
        uploadFotoServiziCat.setAttribute('style', 'display:none;');
        loadingImgServiziCat.setAttribute('style', 'display:block;');
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
                         ft.upload(imageURI, "http://simplyappweb.mvclienti.com/webservices/upload_file.asmx/CaricoImmaginiServiziCat", win, fail, options);
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
            if (r.responseCode == 200 && contatore_upload_foto == contatore_foto_scattate) {
                loadingImgServiziCat.setAttribute('style', 'display:none;');
                var siUpload = "<div class='modal-content'><h4>Upload " + contatore_upload_foto + " Foto </h4><p>" + contatore_upload_foto + " Foto caricata/e con successo!!</p></div>";
                siUpload += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_upload_foto_servizi_cat").html("");
                $("#box_upload_foto_servizi_cat").append(siUpload);
                $("#apri_box_upload_foto_servizi_cat").click();
                contatore_upload_foto = 0;
                contatore_foto_scattate = 0;
            }
        }

        function fail(error) {
            //  alert("An error has occurred: Code = " = error.code);
        }

    },

    cancellaFotoServiziCat: function (img) {

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

    // Modifica Servizio Cat

    takePictureModificaServizioCat: function () {

        navigator.camera.getPicture(onSuccessModificaProdotto, onFailModificaProdotto, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            saveToPhotoAlbum: true,
            correctOrientation: true,


        });
        function onSuccessModificaProdotto(imageURI) {

            var id = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            var id_corretto = id.replace(".jpg", "");
            var immagine = "";
            var ID_user = localStorage.getItem("ID_utente");
            var tipo = "Servizi_cat";
            contatore_foto_scattate++;
            immagine = "<div class='grid-item gallery-item-card ' id='" + id_corretto + "'> <img src='" + imageURI + "' alt='image'>";
            immagine += "<div onclick='app.cancellaFotoModificaServizioCat(\"" + imageURI + "\");'  class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_modifica_servizio_cat").append(immagine);
            /*Qua salvo le foto nel db per poi essere caricate */
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {

                    tx.executeSql("INSERT INTO media (nome_file,ID_user,tipo) VALUES (?,?,?)", [imageURI, ID_user, tipo]);
                    uploadFotoModificaFileServizioCat.setAttribute('style', 'display:block;');
                    $(".appendi_img_modifica_servizio_cat").hide();

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

        function onFailModificaProdotto(message) {
            //  alert("Errore: " + message);
        }


    },

    openFilePickerModificaServizioCat: function () {
        navigator.camera.getPicture(onSuccessModificaPickProdotto, onFailModificaPickProdotto, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            allowEdit: true,
            correctOrientation: true

        });
        function onSuccessModificaPickProdotto(imageURI) {

            var id = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            var id_corretto = id.replace(".jpg", "");
            var immagine = "";
            var ID_user = localStorage.getItem("ID_utente");
            var tipo = "Servizi_cat"
            contatore_foto_scattate++;
            immagine = "<div class='grid-item gallery-item-card' id='" + id_corretto + "'> <img src='" + imageURI + "' alt='image'>";
            immagine += "<div onclick='app.cancellaFotoModificaServizioCat(\"" + imageURI + "\");' class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_modifica_servizio_cat").append(immagine);
            /*Qua salvo le foto nel db per poi essere caricate */
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {

                    tx.executeSql("INSERT INTO media (nome_file,ID_user,tipo) VALUES (?,?,?)", [imageURI, ID_user, tipo]);

                    $(".appendi_img_modifica_servizio_cat").hide();
                    uploadFotoModificaFileServizioCat.setAttribute('style', 'display:block;');
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

        function onFailModificaPickProdotto(message) {
            //  alert("Errore: " + message);
        }
    },

    caricaImmagineModificaServizioCat: function () {

        loadingImgModificaServizioCat.setAttribute('style', 'display:block;');
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
                         params.argomento = "Servizi_cat";
                         params.ID_user = dati.rows.item(i).ID_user;
                         options.params = params;
                         options.chunkedMode = false;
                         var ft = new FileTransfer();

                         ft.upload(imageURI, "http://simplyappweb.mvclienti.com/webservices/upload_file.asmx/caricaImmagineModificaServizioCat", win, fail, options);
                     }

                 }

             },
             function () {
                 alert("Errore" + e.message);
             });
        }


        function win(r) {
             /*  alert("si");
               alert("Code = " + r.responseCode); 
               alert("Response = " + r.response);
               alert("Sent = " + r.bytesSent);
               alert(r.response);*/
            contatore_upload_foto++
            if (r.responseCode == 200 && contatore_upload_foto == contatore_foto_scattate) {
                uploadFotoModificaFileServizioCat.setAttribute('style', 'display:none;');
                loadingImgModificaServizioCat.setAttribute('style', 'display:none;');
                var siUpload = "<div class='modal-content'><h4>" + contatore_upload_foto + " Upload Foto </h4><p>" + contatore_upload_foto + " Foto caricata/e con successo!!</p></div>";
                siUpload += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_upload_foto_modifica_servizo_cat").html("");
                $("#box_upload_foto_modifica_servizio_cat").append(siUpload);
                $("#apri_box_upload_foto_modifica_servizio_cat").click();
                $(".appendi_img_modifica_servizio_cat").show();
                contatore_foto_scattate = 0;
                contatore_upload_foto = 0;
            }
        }

        function fail(error) {
            //  alert("An error has occurred: Code = " = error.code);
        }

    },

    cancellaFotoModificaServizioCat: function (img) {

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

    // Certificazioni

    takePictureCertificazione: function () {

        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            saveToPhotoAlbum: true,
            correctOrientation: true,

        });


        function onSuccess(imageURI) {

            var id = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            var id_corretto = id.replace(".jpg", "");
            var immagine = "";
            var ID_user = localStorage.getItem("ID_utente");
            var tipo = localStorage.getItem("argomento");
            contatore_foto_scattate++;
            immagine = "<div class='grid-item gallery-item-card ' id='" + id_corretto + "'> <img src='" + imageURI + "' alt='image'>";
            immagine += "<div onclick='app.cancellaFotoServizio(\"" + imageURI + "\");'  class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_certificazione").append(immagine);
            /*Qua salvo le foto nel db per poi essere caricate */
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {

                    tx.executeSql("INSERT INTO media (nome_file,ID_user,tipo) VALUES (?,?,?)", [imageURI, ID_user, tipo]);
                    if (localStorage.getItem("sito_check") == 1) {
                        uploadFotoCertificazione.setAttribute('style', 'display:block;');
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

    openFilePickerCertificazione: function () {

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
            var tipo = localStorage.getItem("argomento");
            contatore_foto_scattate++;

            immagine = "<div class='grid-item gallery-item-card' id='" + id_corretto + "'> <img src='" + imageURI + "' alt='image'>";
            immagine += "<div onclick='app.cancellaFotoServizio(\"" + imageURI + "\");' class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_certificazione").append(immagine);
            /*Qua salvo le foto nel db per poi essere caricate */
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {

                    tx.executeSql("INSERT INTO media (nome_file,ID_user,tipo) VALUES (?,?,?)", [imageURI, ID_user, tipo]);


                    if (localStorage.getItem("sito_check") == 1) {


                        uploadFotoCertificazione.setAttribute('style', 'display:block;');
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

    caricaImmagineCertificazione: function () {
        uploadFotoCertificazione.setAttribute('style', 'display:none;');
        loadingImgCertificazione.setAttribute('style', 'display:block;');
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
                         ft.upload(imageURI, "http://simplyappweb.mvclienti.com/webservices/upload_file.asmx/CaricoImmaginiCertificazioni", win, fail, options);
                     }

                 }

             },
             function () {
                 alert("Errore" + e.message);
             });
        }


        function win(r) {
          /*  alert("si");
            alert("Code = " + r.responseCode);
            alert("Response = " + r.response);*/
            contatore_upload_foto++;
            if (r.responseCode == 200 && contatore_upload_foto == contatore_foto_scattate) {
                loadingImgCertificazione.setAttribute('style', 'display:none;');
                var siUpload = "<div class='modal-content'><h4>Upload " + contatore_upload_foto + " Foto </h4><p>" + contatore_upload_foto + " Foto caricata/e con successo!!</p></div>";
                siUpload += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_upload_foto_certificazione").html("");
                $("#box_upload_foto_certificazione").append(siUpload);
                $("#apri_box_upload_foto_certificazione").click();
                contatore_upload_foto = 0;
                contatore_foto_scattate = 0;
            }
        }

        function fail(error) {
            //  alert("An error has occurred: Code = " = error.code);
        }

    },

    cancellaFotoCertificazione: function (img) {

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

    // Modifica Servizio

    takePictureModificaCertificazione: function () {

        navigator.camera.getPicture(onSuccessModificaProdotto, onFailModificaProdotto, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            saveToPhotoAlbum: true,
            correctOrientation: true,


        });
        function onSuccessModificaProdotto(imageURI) {

            var id = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            var id_corretto = id.replace(".jpg", "");
            var immagine = "";
            var ID_user = localStorage.getItem("ID_utente");
            var tipo = "Certificazioni";
            contatore_foto_scattate++;
            immagine = "<div class='grid-item gallery-item-card ' id='" + id_corretto + "'> <img src='" + imageURI + "' alt='image'>";
            immagine += "<div onclick='app.cancellaFotoModificaCertificazione(\"" + imageURI + "\");'  class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_modifica_certificazione").append(immagine);
            /*Qua salvo le foto nel db per poi essere caricate */
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {

                    tx.executeSql("INSERT INTO media (nome_file,ID_user,tipo) VALUES (?,?,?)", [imageURI, ID_user, tipo]);
                    uploadFotoModificaFileCertificazione.setAttribute('style', 'display:block;');
                    $(".appendi_img_modifica_certificazione").hide();

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

        function onFailModificaProdotto(message) {
            //  alert("Errore: " + message);
        }


    },

    openFilePickerModificaCertificazione: function () {
        navigator.camera.getPicture(onSuccessModificaPickProdotto, onFailModificaPickProdotto, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            allowEdit: true,
            correctOrientation: true

        });
        function onSuccessModificaPickProdotto(imageURI) {

            var id = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            var id_corretto = id.replace(".jpg", "");
            var immagine = "";
            var ID_user = localStorage.getItem("ID_utente");
            var tipo = "Certificazioni"
            contatore_foto_scattate++;
            immagine = "<div class='grid-item gallery-item-card' id='" + id_corretto + "'> <img src='" + imageURI + "' alt='image'>";
            immagine += "<div onclick='app.cancellaFotoModificaCertificazione(\"" + imageURI + "\");' class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_modifica_certificazione").append(immagine);
            /*Qua salvo le foto nel db per poi essere caricate */
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {

                    tx.executeSql("INSERT INTO media (nome_file,ID_user,tipo) VALUES (?,?,?)", [imageURI, ID_user, tipo]);

                    $(".appendi_img_modifica_certificazione").hide();
                    uploadFotoModificaFileCertificazione.setAttribute('style', 'display:block;');
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

        function onFailModificaPickProdotto(message) {
            //  alert("Errore: " + message);
        }
    },

    caricaImmagineModificaCertificazione: function () {

        loadingImgModificaCertificazione.setAttribute('style', 'display:block;');
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
                         params.argomento = "Certificazioni";
                         params.ID_user = dati.rows.item(i).ID_user;
                         options.params = params;
                         options.chunkedMode = false;
                         var ft = new FileTransfer();

                         ft.upload(imageURI, "http://simplyappweb.mvclienti.com/webservices/upload_file.asmx/caricaImmagineModificaCertificazione", win, fail, options);
                     }

                 }

             },
             function () {
                 alert("Errore" + e.message);
             });
        }


        function win(r) {
            /*  alert("si");
              alert("Code = " + r.responseCode); 
              alert("Response = " + r.response);
              alert("Sent = " + r.bytesSent);
              alert(r.response);*/
            contatore_upload_foto++
            if (r.responseCode == 200 && contatore_upload_foto == contatore_foto_scattate) {
                uploadFotoModificaFileCertificazione.setAttribute('style', 'display:none;');
                loadingImgModificaCertificazione.setAttribute('style', 'display:none;');
                var siUpload = "<div class='modal-content'><h4>" + contatore_upload_foto + " Upload Foto </h4><p>" + contatore_upload_foto + " Foto caricata/e con successo!!</p></div>";
                siUpload += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_upload_foto_modifica_certificazione").html("");
                $("#box_upload_foto_modifica_certificazione").append(siUpload);
                $("#apri_box_upload_foto_modifica_certificazione").click();
                $(".appendi_img_modifica_certificazione").show();
                contatore_foto_scattate = 0;
                contatore_upload_foto = 0;
            }
        }

        function fail(error) {
            //  alert("An error has occurred: Code = " = error.code);
        }

    },

    cancellaFotoModificaCertificazione: function (img) {

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

    // Categorie

   

    takePictureCategoria: function () {

        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            saveToPhotoAlbum: true,
            correctOrientation: true,

        });


        function onSuccess(imageURI) {

            var id = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            var id_corretto = id.replace(".jpg", "");
            var immagine = "";
            var ID_user = localStorage.getItem("ID_utente");
            var tipo = localStorage.getItem("argomento");
            contatore_foto_scattate++;
            immagine = "<div class='grid-item gallery-item-card ' id='" + id_corretto + "'> <img src='" + imageURI + "' alt='image'>";
            immagine += "<div onclick='app.cancellaFotoServizio(\"" + imageURI + "\");'  class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_categoria").append(immagine);
            /*Qua salvo le foto nel db per poi essere caricate */
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {

                    tx.executeSql("INSERT INTO media (nome_file,ID_user,tipo) VALUES (?,?,?)", [imageURI, ID_user, tipo]);
                    if (localStorage.getItem("sito_check") == 1) {
                        uploadFotoCategoria.setAttribute('style', 'display:block;');
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

    openFileCategoria: function () {

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
            var tipo = localStorage.getItem("argomento");
            contatore_foto_scattate++;

            immagine = "<div class='grid-item gallery-item-card' id='" + id_corretto + "'> <img src='" + imageURI + "' alt='image'>";
            immagine += "<div onclick='app.cancellaFotoServizio(\"" + imageURI + "\");' class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_categoria").append(immagine);
            /*Qua salvo le foto nel db per poi essere caricate */
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {

                    tx.executeSql("INSERT INTO media (nome_file,ID_user,tipo) VALUES (?,?,?)", [imageURI, ID_user, tipo]);


                    if (localStorage.getItem("sito_check") == 1) {


                        uploadFotoCategoria.setAttribute('style', 'display:block;');
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

    caricaImmagineCategoria: function () {
        uploadFotoCategoria.setAttribute('style', 'display:none;');
        loadingImgCategoria.setAttribute('style', 'display:block;');
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
                         params.argomento = localStorage.getItem("argomento");
                         params.ID_user = dati.rows.item(i).ID_user;

                         options.params = params;
                         options.chunkedMode = false;

                         var ft = new FileTransfer();
                         ft.upload(imageURI, "http://simplyappweb.mvclienti.com/webservices/upload_file.asmx/CaricoImmaginiCategorie", win, fail, options);
                     }

                 }

             },
             function () {
                 alert("Errore" + e.message);
             });
        }


        function win(r) {
          /*  alert("si");
            alert("Code = " + r.responseCode);
            alert("Response = " + r.response);*/
            contatore_upload_foto++;
            if (r.responseCode == 200 && contatore_upload_foto == contatore_foto_scattate) {
                loadingImgCategoria.setAttribute('style', 'display:none;');
                var siUpload = "<div class='modal-content'><h4>Upload " + contatore_upload_foto + " Foto </h4><p>" + contatore_upload_foto + " Foto caricata/e con successo!!</p></div>";
                siUpload += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_upload_foto_categoria").html("");
                $("#box_upload_foto_categoria").append(siUpload);
                $("#apri_box_upload_foto_categoria").click();
                contatore_upload_foto = 0;
                contatore_foto_scattate = 0;
            }
        }

        function fail(error) {
            //  alert("An error has occurred: Code = " = error.code);
        }

    },

    cancellaFotoCertificazione: function (img) {

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


    // Appartamenti

    takePictureAppartamentoSlider: function () {

        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            saveToPhotoAlbum: true,
            correctOrientation: true,

        });


        function onSuccess(imageURI) {

            var id = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            var id_corretto = id.replace(".jpg", "");
            var immagine = "";
            var ID_user = localStorage.getItem("ID_utente");
            var tipo = localStorage.getItem("argomento");
            contatore_foto_scattate++;
            immagine = "<div class='grid-item gallery-item-card ' id='" + id_corretto + "'> <img src='" + imageURI + "' alt='image'>";
            immagine += "<div  onclick='app.cancellaFotoAppartamentoSlider(\"" + imageURI + "\");'  class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_appartamento_slider").append(immagine);
            /*Qua salvo le foto nel db per poi essere caricate */
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {

                    tx.executeSql("INSERT INTO media (nome_file,ID_user,tipo) VALUES (?,?,?)", [imageURI, ID_user, tipo]);
                    if (localStorage.getItem("sito_check") == 1) {
                        uploadFotoAppartamentoSlide.setAttribute('style', 'display:block;');
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

    openFilePickerAppartamentoSlider: function () {

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
            var tipo = localStorage.getItem("argomento");
            contatore_foto_scattate++;

            immagine = "<div class='grid-item gallery-item-card' id='" + id_corretto + "'> <img src='" + imageURI + "' alt='image'>";
            immagine += "<div  onclick='app.cancellaFotoAppartamentoSlider(\"" + imageURI + "\");' class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_appartamento_slider").append(immagine);
            /*Qua salvo le foto nel db per poi essere caricate */
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {

                    tx.executeSql("INSERT INTO media (nome_file,ID_user,tipo) VALUES (?,?,?)", [imageURI, ID_user, tipo]);


                    if (localStorage.getItem("sito_check") == 1) {


                        uploadFotoAppartamentoSlide.setAttribute('style', 'display:block;');
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

    caricaImmagineAppartamentoSlider: function () {
        uploadFotoAppartamentoSlide.setAttribute('style', 'display:none;');
        loadingImgAppartamentoSlide.setAttribute('style', 'display:block;');
        box_carica_immagine_slider_appartamento.setAttribute('style', 'display:none;');
        $(".ui-flipswitch").removeClass("ui-flipswitch-active");
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
                         params.argomento = "Slide";
                         params.ID_user = dati.rows.item(i).ID_user;

                         options.params = params;
                         options.chunkedMode = false;

                         var ft = new FileTransfer();
                         ft.upload(imageURI, "http://simplyappweb.mvclienti.com/webservices/upload_file.asmx/CaricoImmagineSliderAppartamento", win, fail, options);
                     }

                 }

             },
             function () {
                 alert("Errore" + e.message);
             });
        }


        function win(r) {
            /*  alert("si");
              alert("Code = " + r.responseCode);
              alert("Response = " + r.response);*/
            contatore_upload_foto++;
            if (r.responseCode == 200 && contatore_upload_foto == contatore_foto_scattate) {
                loadingImgAppartamentoSlide.setAttribute('style', 'display:none;');
                var siUpload = "<div class='modal-content'><h4>Upload " + contatore_upload_foto + " Foto </h4><p>" + contatore_upload_foto + " Foto Slider caricata con successo!!</p></div>";
                siUpload += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_upload_foto_appartamento_slide").html("");
                $("#box_upload_foto_appartamento_slide").append(siUpload);
                $("#apri_box_upload_foto_appartamento_slide").click();
                contatore_upload_foto = 0;
                contatore_foto_scattate = 0;
                $(".gallery-item-header").click();
               
            }
        }

        function fail(error) {
            //  alert("An error has occurred: Code = " = error.code);
        }

    },

    cancellaFotoAppartamentoSlider: function (img) {

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

    takePictureAppartamento: function () {

        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            saveToPhotoAlbum: true,
            correctOrientation: true,

        });


        function onSuccess(imageURI) {

            var id = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            var id_corretto = id.replace(".jpg", "");
            var immagine = "";
            var ID_user = localStorage.getItem("ID_utente");
            var tipo = localStorage.getItem("argomento");
            contatore_foto_scattate_app++;
            immagine = "<div class='grid-item gallery-item-card ' id='" + id_corretto + "'> <img src='" + imageURI + "' alt='image'>";
            immagine += "<div onclick='app.cancellaFotoAppartamento(\"" + imageURI + "\");'  class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_appartamento").append(immagine);
            /*Qua salvo le foto nel db per poi essere caricate */
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {

                    tx.executeSql("INSERT INTO media (nome_file,ID_user,tipo) VALUES (?,?,?)", [imageURI, ID_user, tipo]);
                    if (localStorage.getItem("sito_check") == 1) {
                        uploadFotoAppartamento.setAttribute('style', 'display:block;');
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

    openFilePickerAppartamento: function () {

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
            var tipo = localStorage.getItem("argomento");
            contatore_foto_scattate_app++;

            immagine = "<div class='grid-item gallery-item-card' id='" + id_corretto + "'> <img src='" + imageURI + "' alt='image'>";
            immagine += "<div onclick='app.cancellaFotoAppartamento(\"" + imageURI + "\");' class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_appartamento").append(immagine);
            /*Qua salvo le foto nel db per poi essere caricate */
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {

                    tx.executeSql("INSERT INTO media (nome_file,ID_user,tipo) VALUES (?,?,?)", [imageURI, ID_user, tipo]);


                    if (localStorage.getItem("sito_check") == 1) {


                        uploadFotoAppartamento.setAttribute('style', 'display:block;');
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

    caricaImmagineAppartamento: function () {
        uploadFotoAppartamento.setAttribute('style', 'display:none;');
        loadingImgAppartamento.setAttribute('style', 'display:block;');
      
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
                         params.argomento = "Slide";
                         params.ID_user = dati.rows.item(i).ID_user;

                         options.params = params;
                         options.chunkedMode = false;

                         var ft = new FileTransfer();
                         ft.upload(imageURI, "http://simplyappweb.mvclienti.com/webservices/upload_file.asmx/CaricoImmagineAppartamento", win, fail, options);
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
              contatore_upload_foto++;
             // alert(contatore_upload_foto);
             // alert(contatore_foto_scattate_app);
              if (r.responseCode == 200 && contatore_upload_foto == contatore_foto_scattate_app) {
                loadingImgAppartamento.setAttribute('style', 'display:none;');
                var siUpload = "<div class='modal-content'><h4>Upload " + contatore_upload_foto + " Foto </h4><p>" + contatore_upload_foto + " Foto Slider caricata con successo!!</p></div>";
                siUpload += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_upload_foto_appartamento").html("");
                $("#box_upload_foto_appartamento").append(siUpload);
                $("#apri_box_upload_foto_appartamento").click();
                contatore_upload_foto = 0;
                contatore_foto_scattate_app = 0;
               
            }
        }

        function fail(error) {
            //  alert("An error has occurred: Code = " = error.code);
        }

    },

    cancellaFotoAppartamento: function (img) {

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

    takePictureAppartamentoSliderModifica: function () {

        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            saveToPhotoAlbum: true,
            correctOrientation: true,

        });


        function onSuccess(imageURI) {

            var id = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            var id_corretto = id.replace(".jpg", "");
            var immagine = "";
            var ID_user = localStorage.getItem("ID_utente");
            var tipo = localStorage.getItem("argomento");
            contatore_foto_scattate++;
            immagine = "<div class='grid-item gallery-item-card ' id='" + id_corretto + "'> <img src='" + imageURI + "' alt='image'>";
            immagine += "<div  onclick='app.cancellaFotoAppartamentoSliderModifica(\"" + imageURI + "\");'  class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_appartamento_slider_modifica").append(immagine);
            /*Qua salvo le foto nel db per poi essere caricate */
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {

                    tx.executeSql("INSERT INTO media (nome_file,ID_user,tipo) VALUES (?,?,?)", [imageURI, ID_user, tipo]);
                    if (localStorage.getItem("sito_check") == 1) {
                        uploadFotoAppartamentoSlideModifca.setAttribute('style', 'display:block;');
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

    openFilePickerAppartamentoSliderModifica: function () {

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
            var tipo = localStorage.getItem("argomento");
            contatore_foto_scattate++;

            immagine = "<div class='grid-item gallery-item-card' id='" + id_corretto + "'> <img src='" + imageURI + "' alt='image'>";
            immagine += "<div  onclick='app.cancellaFotoAppartamentoSliderModifica(\"" + imageURI + "\");' class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_appartamento_slider_modifica").append(immagine);
            /*Qua salvo le foto nel db per poi essere caricate */
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {

                    tx.executeSql("INSERT INTO media (nome_file,ID_user,tipo) VALUES (?,?,?)", [imageURI, ID_user, tipo]);


                    if (localStorage.getItem("sito_check") == 1) {


                        uploadFotoAppartamentoSlideModifica.setAttribute('style', 'display:block;');
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

    caricaImmagineAppartamentoSliderModifica: function () {
        uploadFotoAppartamentoSlideModifica.setAttribute('style', 'display:none;');
        loadingImgAppartamentoSlideModifica.setAttribute('style', 'display:block;');
        box_carica_immagine_slider_appartamento_modifica.setAttribute('style', 'display:none;');
        $(".ui-flipswitch").removeClass("ui-flipswitch-active");
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
                         params.argomento = "Slide";
                         params.ID_user = dati.rows.item(i).ID_user;

                         options.params = params;
                         options.chunkedMode = false;

                         var ft = new FileTransfer();
                         ft.upload(imageURI, "http://simplyappweb.mvclienti.com/webservices/upload_file.asmx/CaricoImmagineSliderAppartamento", win, fail, options);
                     }

                 }

             },
             function () {
                 alert("Errore" + e.message);
             });
        }


        function win(r) {
            /*  alert("si");
              alert("Code = " + r.responseCode);
              alert("Response = " + r.response);*/
            contatore_upload_foto++;
            if (r.responseCode == 200 && contatore_upload_foto == contatore_foto_scattate) {
                loadingImgAppartamentoSlideModifica.setAttribute('style', 'display:none;');
                var siUpload = "<div class='modal-content'><h4>Upload " + contatore_upload_foto + " Foto </h4><p>" + contatore_upload_foto + " Foto Slider caricata con successo!!</p></div>";
                siUpload += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_upload_foto_appartamento_slide_modifica").html("");
                $("#box_upload_foto_appartamento_slide_modifica").append(siUpload);
                $("#apri_box_upload_foto_appartamento_slide_modifica").click();
                contatore_upload_foto = 0;
                contatore_foto_scattate = 0;
                $(".gallery-item-header").click();

            }
        }

        function fail(error) {
            //  alert("An error has occurred: Code = " = error.code);
        }

    },

    cancellaFotoAppartamentoSliderModifica: function (img) {

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

    takePictureModificaAppartamento: function () {

        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            saveToPhotoAlbum: true,
            correctOrientation: true,

        });


        function onSuccess(imageURI) {

            var id = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            var id_corretto = id.replace(".jpg", "");
            var immagine = "";
            var ID_user = localStorage.getItem("ID_utente");
            var tipo = localStorage.getItem("argomento");
            contatore_foto_scattate_app++;
            immagine = "<div class='grid-item gallery-item-card ' id='" + id_corretto + "'> <img src='" + imageURI + "' alt='image'>";
            immagine += "<div onclick='app.cancellaFotoAppartamentoModifica(\"" + imageURI + "\");'  class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_modifica_appartamento").append(immagine);
            /*Qua salvo le foto nel db per poi essere caricate */
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {

                    tx.executeSql("INSERT INTO media (nome_file,ID_user,tipo) VALUES (?,?,?)", [imageURI, ID_user, tipo]);
                    if (localStorage.getItem("sito_check") == 1) {
                        uploadFotoModificaFileAppartamento.setAttribute('style', 'display:block;');
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

    openFilePickerModificaAppartamento: function () {

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
            var tipo = localStorage.getItem("argomento");
            contatore_foto_scattate_app++;

            immagine = "<div class='grid-item gallery-item-card' id='" + id_corretto + "'> <img src='" + imageURI + "' alt='image'>";
            immagine += "<div onclick='app.cancellaFotoAppartamentoModifica(\"" + imageURI + "\");' class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_modifica_appartamento").append(immagine);
            /*Qua salvo le foto nel db per poi essere caricate */
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {

                    tx.executeSql("INSERT INTO media (nome_file,ID_user,tipo) VALUES (?,?,?)", [imageURI, ID_user, tipo]);


                    if (localStorage.getItem("sito_check") == 1) {


                        uploadFotoModificaFileAppartamento.setAttribute('style', 'display:block;');
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

    caricaImmagineModificaAppartamento: function () {
        uploadFotoModificaFileAppartamento.setAttribute('style', 'display:none;');
        loadingImgModificaAppartamento.setAttribute('style', 'display:block;');

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
                         params.argomento = "Slide";
                         params.ID_user = dati.rows.item(i).ID_user;

                         options.params = params;
                         options.chunkedMode = false;

                         var ft = new FileTransfer();
                         ft.upload(imageURI, "http://simplyappweb.mvclienti.com/webservices/upload_file.asmx/CaricoImmagineAppartamento", win, fail, options);
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
            contatore_upload_foto++;
            // alert(contatore_upload_foto);
            // alert(contatore_foto_scattate_app);
            if (r.responseCode == 200 && contatore_upload_foto == contatore_foto_scattate_app) {
                loadingImgAppartamento.setAttribute('style', 'display:none;');
                var siUpload = "<div class='modal-content'><h4>Upload " + contatore_upload_foto + " Foto </h4><p>" + contatore_upload_foto + " Foto Slider caricata con successo!!</p></div>";
                siUpload += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_upload_foto_modifica_appartamento").html("");
                $("#box_upload_foto_modifica_appartamento").append(siUpload);
                $("#apri_box_upload_foto_modifica_appartamento").click();
                contatore_upload_foto = 0;
                contatore_foto_scattate_app = 0;

            }
        }

        function fail(error) {
            //  alert("An error has occurred: Code = " = error.code);
        }

    },

    cancellaFotoAppartamentoModifica: function (img) {

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

    // Approfondimenti Inserisci

    takePictureApprofondimenti: function () {

        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            saveToPhotoAlbum: true,
            correctOrientation: true,

        });


        function onSuccess(imageURI) {

            var id = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            var id_corretto = id.replace(".jpg", "");
            var immagine = "";
            var ID_user = localStorage.getItem("ID_utente");
            var tipo = localStorage.getItem("argomento");
            contatore_foto_scattate++;
            immagine = "<div class='grid-item gallery-item-card ' id='" + id_corretto + "'> <img src='" + imageURI + "' alt='image'>";
            immagine += "<div onclick='app.cancellaFotoApprofondimenti(\"" + imageURI + "\");'  class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_approfondimenti").append(immagine);
            /*Qua salvo le foto nel db per poi essere caricate */
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {

                    tx.executeSql("INSERT INTO media (nome_file,ID_user,tipo) VALUES (?,?,?)", [imageURI, ID_user, tipo]);
                    if (localStorage.getItem("sito_check") == 1) {
                        uploadFotoApprofondimenti.setAttribute('style', 'display:block;');
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

    openFilePickerApprofondimenti: function () {

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
            var tipo = localStorage.getItem("argomento");
            contatore_foto_scattate++;

            immagine = "<div class='grid-item gallery-item-card' id='" + id_corretto + "'> <img src='" + imageURI + "' alt='image'>";
            immagine += "<div onclick='app.cancellaFotoApprofondimenti(\"" + imageURI + "\");' class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_approfondimenti").append(immagine);
            /*Qua salvo le foto nel db per poi essere caricate */
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {

                    tx.executeSql("INSERT INTO media (nome_file,ID_user,tipo) VALUES (?,?,?)", [imageURI, ID_user, tipo]);


                    if (localStorage.getItem("sito_check") == 1) {


                        uploadFotoApprofondimenti.setAttribute('style', 'display:block;');
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

    caricaImmagineApprofondimenti: function () {
        uploadFotoApprofondimenti.setAttribute('style', 'display:none;');
        loadingImgApprofondimenti.setAttribute('style', 'display:block;');
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
                         ft.upload(imageURI, "http://simplyappweb.mvclienti.com/webservices/upload_file.asmx/CaricoImmaginiApprofondimenti", win, fail, options);
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
            if (r.responseCode == 200 && contatore_upload_foto == contatore_foto_scattate) {
                loadingImgApprofondimenti.setAttribute('style', 'display:none;');
                var siUpload = "<div class='modal-content'><h4>Upload " + contatore_upload_foto + " Foto </h4><p>" + contatore_upload_foto + " Foto caricata/e con successo!!</p></div>";
                siUpload += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_upload_foto_approfondimenti").html("");
                $("#box_upload_foto_approfondimenti").append(siUpload);
                $("#apri_box_upload_foto_approfondimenti").click();
                contatore_upload_foto = 0;
                contatore_foto_scattate = 0;
            }
        }

        function fail(error) {
            //  alert("An error has occurred: Code = " = error.code);
        }

    },

    cancellaFotoApprofondimenti: function (img) {

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


    // Modifica Approfondimento

    takePictureModificaApprofondimento: function () {

        navigator.camera.getPicture(onSuccessModificaProdotto, onFailModificaProdotto, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            saveToPhotoAlbum: true,
            correctOrientation: true,


        });
        function onSuccessModificaProdotto(imageURI) {

            var id = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            var id_corretto = id.replace(".jpg", "");
            var immagine = "";
            var ID_user = localStorage.getItem("ID_utente");
            var tipo = "Approfondimenti";
            contatore_foto_scattate++;
            immagine = "<div class='grid-item gallery-item-card ' id='" + id_corretto + "'> <img src='" + imageURI + "' alt='image'>";
            immagine += "<div onclick='app.cancellaFotoModificaApprofondimento(\"" + imageURI + "\");'  class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_modifica_approfondimento").append(immagine);
            /*Qua salvo le foto nel db per poi essere caricate */
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {

                    tx.executeSql("INSERT INTO media (nome_file,ID_user,tipo) VALUES (?,?,?)", [imageURI, ID_user, tipo]);
                    uploadFotoModificaFileApprofondimento.setAttribute('style', 'display:block;');
                    $(".appendi_img_modifica_approfondimento").hide();

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

        function onFailModificaProdotto(message) {
            //  alert("Errore: " + message);
        }


    },

    openFilePickerModificaApprofondimento: function () {
        navigator.camera.getPicture(onSuccessModificaPickProdotto, onFailModificaPickProdotto, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            allowEdit: true,
            correctOrientation: true

        });
        function onSuccessModificaPickProdotto(imageURI) {

            var id = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            var id_corretto = id.replace(".jpg", "");
            var immagine = "";
            var ID_user = localStorage.getItem("ID_utente");
            var tipo = "Approfondimenti"
            contatore_foto_scattate++;
            immagine = "<div class='grid-item gallery-item-card' id='" + id_corretto + "'> <img src='" + imageURI + "' alt='image'>";
            immagine += "<div onclick='app.cancellaFotoModificaApprofondimento(\"" + imageURI + "\");' class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_modifica_servizio_cat").append(immagine);
            /*Qua salvo le foto nel db per poi essere caricate */
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {

                    tx.executeSql("INSERT INTO media (nome_file,ID_user,tipo) VALUES (?,?,?)", [imageURI, ID_user, tipo]);

                    $(".appendi_img_modifica_approfondimento").hide();
                    uploadFotoModificaFileApprofondimento.setAttribute('style', 'display:block;');
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

        function onFailModificaPickProdotto(message) {
            //  alert("Errore: " + message);
        }
    },

    caricaImmagineModificaApprofondimento: function () {

        loadingImgModificaApprofondimento.setAttribute('style', 'display:block;');
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
                         params.argomento = "Servizi_cat";
                         params.ID_user = dati.rows.item(i).ID_user;
                         options.params = params;
                         options.chunkedMode = false;
                         var ft = new FileTransfer();

                         ft.upload(imageURI, "http://simplyappweb.mvclienti.com/webservices/upload_file.asmx/caricaImmagineModificaApprofondimento", win, fail, options);
                     }

                 }

             },
             function () {
                 alert("Errore" + e.message);
             });
        }


        function win(r) {
           /*  alert("si");
              alert("Code = " + r.responseCode); 
              alert("Response = " + r.response);
              alert("Sent = " + r.bytesSent);
              alert(r.response);*/
            contatore_upload_foto++
            if (r.responseCode == 200 && contatore_upload_foto == contatore_foto_scattate) {
                uploadFotoModificaFileApprofondimento.setAttribute('style', 'display:none;');
                loadingImgModificaApprofondimento.setAttribute('style', 'display:none;');
                var siUpload = "<div class='modal-content'><h4>" + contatore_upload_foto + " Upload Foto </h4><p>" + contatore_upload_foto + " Foto caricata/e con successo!!</p></div>";
                siUpload += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_upload_foto_modifica_approfondimento").html("");
                $("#box_upload_foto_modifica_approfondimento").append(siUpload);
                $("#apri_box_upload_foto_modifica_approfondimento").click();
                $(".appendi_img_modifica_approfondimento").show();
                contatore_foto_scattate = 0;
                contatore_upload_foto = 0;
            }
        }

        function fail(error) {
            //  alert("An error has occurred: Code = " = error.code);
        }

    },

    cancellaFotoModificaApprofondimento: function (img) {

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

    // Servizi

    takePictureMarchio: function () {

        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            saveToPhotoAlbum: true,
            correctOrientation: true,

        });


        function onSuccess(imageURI) {

            var id = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            var id_corretto = id.replace(".jpg", "");
            var immagine = "";
            var ID_user = localStorage.getItem("ID_utente");
            var tipo = localStorage.getItem("argomento");
            contatore_foto_scattate++;
            immagine = "<div class='grid-item gallery-item-card ' id='" + id_corretto + "'> <img src='" + imageURI + "' alt='image'>";
            immagine += "<div onclick='app.cancellaFotoMarchio(\"" + imageURI + "\");'  class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_marchio").append(immagine);
            /*Qua salvo le foto nel db per poi essere caricate */
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {

                    tx.executeSql("INSERT INTO media (nome_file,ID_user,tipo) VALUES (?,?,?)", [imageURI, ID_user, tipo]);
                    if (localStorage.getItem("sito_check") == 1) {
                        uploadFotoMarchio.setAttribute('style', 'display:block;');
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

    openFilePickerMarchio: function () {

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
            var tipo = localStorage.getItem("argomento");
            contatore_foto_scattate++;

            immagine = "<div class='grid-item gallery-item-card' id='" + id_corretto + "'> <img src='" + imageURI + "' alt='image'>";
            immagine += "<div onclick='app.cancellaFotoMarchio(\"" + imageURI + "\");' class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_marchio").append(immagine);
            /*Qua salvo le foto nel db per poi essere caricate */
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {

                    tx.executeSql("INSERT INTO media (nome_file,ID_user,tipo) VALUES (?,?,?)", [imageURI, ID_user, tipo]);


                    if (localStorage.getItem("sito_check") == 1) {


                        uploadFotoMarchio.setAttribute('style', 'display:block;');
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

    caricaImmagineMarchio: function () {
        uploadFotoMarchio.setAttribute('style', 'display:none;');
        loadingImgMarchio.setAttribute('style', 'display:block;');
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
                         ft.upload(imageURI, "http://simplyappweb.mvclienti.com/webservices/upload_file.asmx/CaricoImmaginiMarchi", win, fail, options);
                     }

                 }

             },
             function () {
                 alert("Errore" + e.message);
             });
        }


        function win(r) {
          /*  alert("si");
              alert("Code = " + r.responseCode); 
             alert("Response = " + r.response);*/
            contatore_upload_foto++;
            if (r.responseCode == 200 && contatore_upload_foto == contatore_foto_scattate) {
                loadingImgMarchio.setAttribute('style', 'display:none;');
                var siUpload = "<div class='modal-content'><h4>Upload " + contatore_upload_foto + " Foto </h4><p>" + contatore_upload_foto + " Foto caricata/e con successo!!</p></div>";
                siUpload += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_upload_foto_marchi").html("");
                $("#box_upload_foto_marchi").append(siUpload);
                $("#apri_box_upload_foto_marchi").click();
                contatore_upload_foto = 0;
                contatore_foto_scattate = 0;
            }
        }

        function fail(error) {
            //  alert("An error has occurred: Code = " = error.code);
        }

    },

    cancellaFotoMarchio: function (img) {

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

    // Modifica Marchio

    takePictureModificaMarchio: function () {

        navigator.camera.getPicture(onSuccessModificaProdotto, onFailModificaProdotto, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            saveToPhotoAlbum: true,
            correctOrientation: true,


        });
        function onSuccessModificaProdotto(imageURI) {

            var id = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            var id_corretto = id.replace(".jpg", "");
            var immagine = "";
            var ID_user = localStorage.getItem("ID_utente");
            var tipo = "Prodotti";
            contatore_foto_scattate++;
            immagine = "<div class='grid-item gallery-item-card ' id='" + id_corretto + "'> <img src='" + imageURI + "' alt='image'>";
            immagine += "<div onclick='app.cancellaFotoModificaMarchio(\"" + imageURI + "\");'  class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_modifica_marchio").append(immagine);
            /*Qua salvo le foto nel db per poi essere caricate */
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {

                    tx.executeSql("INSERT INTO media (nome_file,ID_user,tipo) VALUES (?,?,?)", [imageURI, ID_user, tipo]);
                    uploadFotoModificaFileMarchio.setAttribute('style', 'display:block;');
                  

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

        function onFailModificaProdotto(message) {
            //  alert("Errore: " + message);
        }


    },

    openFilePickerModificaMarchio: function () {
        navigator.camera.getPicture(onSuccessModificaPickProdotto, onFailModificaPickProdotto, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            allowEdit: true,
            correctOrientation: true

        });
        function onSuccessModificaPickProdotto(imageURI) {

            var id = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            var id_corretto = id.replace(".jpg", "");
            var immagine = "";
            var ID_user = localStorage.getItem("ID_utente");
            var tipo = "Marchi"
            contatore_foto_scattate++;
            immagine = "<div class='grid-item gallery-item-card' id='" + id_corretto + "'> <img src='" + imageURI + "' alt='image'>";
            immagine += "<div onclick='app.cancellaFotoModificaMarchio(\"" + imageURI + "\");' class='gallery-item-header'><div class='gallery-item-author'><span><i class='ion-close-circled'></span></div></div></div>";
            $(".appendi_img_modifica_marchio").append(immagine);
            /*Qua salvo le foto nel db per poi essere caricate */
            db = window.openDatabase("SimplyAppWeb", "1.0", "Database simpliappweb", 200000);
            db.transaction(
                // Metodo di chiamata asincrona
                function (tx) {

                    tx.executeSql("INSERT INTO media (nome_file,ID_user,tipo) VALUES (?,?,?)", [imageURI, ID_user, tipo]);

                
                    uploadFotoModificaFileMarchio.setAttribute('style', 'display:block;');
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

        function onFailModificaPickProdotto(message) {
            //  alert("Errore: " + message);
        }
    },

    caricaImmagineModificaMarchio: function () {

        loadingImgModificaMarchio.setAttribute('style', 'display:block;');
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
                         params.argomento = "Marchi";
                         params.ID_user = dati.rows.item(i).ID_user;
                         options.params = params;
                         options.chunkedMode = false;
                         var ft = new FileTransfer();

                         ft.upload(imageURI, "http://simplyappweb.mvclienti.com/webservices/upload_file.asmx/caricaImmagineModificaMarchio", win, fail, options);
                     }

                 }

             },
             function () {
                 alert("Errore" + e.message);
             });
        }


        function win(r) {
            /*  alert("si");
              alert("Code = " + r.responseCode); 
              alert("Response = " + r.response);
              alert("Sent = " + r.bytesSent);
              alert(r.response);*/
            contatore_upload_foto++
            if (r.responseCode == 200 && contatore_upload_foto == contatore_foto_scattate) {
                uploadFotoModificaFileMarchio.setAttribute('style', 'display:none;');
                loadingImgModificaMarchio.setAttribute('style', 'display:none;');
                var siUpload = "<div class='modal-content'><h4>" + contatore_upload_foto + " Upload Foto </h4><p>" + contatore_upload_foto + " Foto caricata/e con successo!!</p></div>";
                siUpload += "<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
                $("#box_upload_foto_modifica_marchio").html("");
                $("#box_upload_foto_modifica_marchio").append(siUpload);
                $("#apri_box_upload_foto_modifica_marchio").click();
                $(".appendi_img_modifica_marchio").show();
                contatore_foto_scattate = 0;
                contatore_upload_foto = 0;
            }
        }

        function fail(error) {
            //  alert("An error has occurred: Code = " = error.code);
        }

    },

    cancellaFotoModificaMarchio: function (img) {

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
};


