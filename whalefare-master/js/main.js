var renderDocumentList = function(data, searchtxt) {
 
  // tamaño total de la bd
  vaultSize(function(err, size) {
    
    // se muestra el tamaño total
    $('#vaultsizebadge').html(size);
    
    if (!data || data.length == 0) {
  
      if (size == 0) {
        var html = emptyVaultTemplate({ domain: searchtxt});
      } else {
        var html = noMatchesTemplate({ domain: searchtxt});
      }          
  
    } else {

      // se renderiza como una tabla con las contraseñas
      var html = '<table class="table">';
      html += matchRowHeader({});
      for(var i in data) {
        //if (data[i].username.length > 12 && data[i].iuser.length > 12 && data[i].ipass.length > 12 && data[i].password.length > 20) {
        if (data[i].username.length > 12 && data[i].password.length > 20) {
          let user = data[i].displayUsername = data[i].username.substring(0,15) + "...";
          //let pass = data[i].displayPassword = data[i].password.substring(0,15) + "...";
          //console.log(user);
          //console.log(pass);
          //data[i].displayIuser = data[i].iuser.substring(0,15) + "...";
          //data[i].displayIpass = data[i].ipass.substring(0,15) + "...";
        } else {
          let user = data[i].displayUsername = data[i].username;
          //let pass = data[i].displayPassword = data[i].password;
          //data[i].displayIuser = data[i].iuser;
          //data[i].displayIpass = data[i].ipass;
          //console.log(user);
          //console.log(pass);
        }
        html += matchRowTemplate(data[i]);
      }
      html += "</table>";

      // copiar como texto la contraseña
      new Clipboard('.clippy');
  
    }

    // se muestran las contraseñas guardadas
    $('#status').html(html);

    // se activan los botones de eliminar
    $(".deletebutton").bind("click", function(e) {
      vaultRemove($(this).attr('data-id'), $(this).attr('data-rev'), function(err, data) {
        showMainPage();
      })
    });

  });
}

// se renderiza la página princiapl y los documentos guardados se filtran de acuerdo a su url
var showMainPage = function() {

  // función para identificar la pestaña activa del navegador y su url
  getCurrentTabUrl(function(err, url) {
    if(err || !url) return;
  
    // se obtiene la url de esa pestaña
    var domain = extractDomainName(url);

    loadSession(function(err, session) {
    
      //  se encuentran todos los datos ya guardados que coincidan con la misma url
      vaultFilter(domain, session.hash,  function(err, data) {
      
        renderDocumentList(data, domain);
                
      });
    
    });
  });

};

var showLoginPanel = function() {
  
  $('#loginmodal').modal({})
  $('#loginmodalbutton').attr("disabled", false);
  
  $('#loginpassword').val("");
  
  $('#loginalert').html("Por favor, ingresa una contraseña. Con esta, podrás iniciar sesión y acceder a tu bóveda de contraseñas.");
  $('#loginalert').removeClass("alert-danger");
  $('#loginalert').addClass("alert-info");
  
};

// cuando la página haya cargado
$( document ).ready(function() {
  
  loadSession(function(err, session) {
    if (err || session == null) {
      showLoginPanel();
    } else {
      showMainPage();
    }
    
  });

  // click al botón de agregar
  $("#addbutton").bind("click", function() {
    
    // se oculta la página principal y se muestra el form de agregar una nueva contraseña
    $('#addmodal').modal({})
    
    $('#url').val("");
    $('#username').val("");
    $('#password').val("");
    $('#notes').val("");
    getCurrentTabUrl(function(err, url) {
      $('#url').val(url);
    });
  });
  
  // click al boton de buscar
  $("#addmodalbutton").bind("click", function() {
    $('#addform').submit();
  });
  
  // click al boton de login
  $("#loginmodalbutton").bind("click", function() {
    $('#loginform').submit();
  });
  
  // click al boton de logout
  $("#logoutbutton").bind("click", function() {
    
    // se termina la sesión
    clearSession(function(err, data) {
       showLoginPanel();
    });
  });
  
  // se presiona el boton para enviar el form de agregar
  $('#addform').bind("submit", function(event) {
    event.preventDefault();
    
    // se crea un documento para agregar a la base de datos
    var doc = {
      url: $('#url').val(),
      domain: "",
      username: $('#username').val(),
      password: $('#password').val(),
      iuser: $('#iuser').val(),
      ipass: $('#ipass').val(),
      notes: $('#notes').val()
    }
    doc.domain = extractDomainName(doc.url);
    
    // se escribe en la bd
    loadSession(function(err, session) {
      vaultWrite(doc, session.hash, function(err,data) {
      
        $('#addmodal').modal('hide');
        
        // se renderiza la pagina principal
        showMainPage();
      });
    })

  });
  
  // se presiona el boton de login
  $('#loginform').bind("submit", function(event) {
    event.preventDefault();
    
    $('#loginmodalbutton').attr("disabled", true);
    
    var password = $('#loginpassword').val();
    
    vaultSize(function(err, vaultsize) {
      if(err) return;
      
      // si ya hay datos guardados anteriormente
      if (vaultsize > 0) {
        
        // comprobar si se puede descifrar el documento correctamente
        var hash = hashPassword(password);
        vaultRead("verify", hash, function(err, data) {
          if (!err && data && data.password && data.password == "volt") {
            saveSession({ hash: hash}, function(err, data) {
              $('#loginmodal').modal('hide');
              showMainPage();
            });
          } else {
            $('#loginalert').addClass("alert-danger");
            $('#loginalert').html("Contraseña Incorrecta");
            $('#loginmodalbutton').attr("disabled", false);
          }
        })
      } else {
        // de no ser así, se crea un documento con los siguientes datos
        var hash = hashPassword(password);
        vaultWrite({_id: "verify", domain:"test.com", url:"http://test.com", password:"volt"}, hash, function(err, data) {
          saveSession({ hash: hash}, function(err, data) {
            $('#loginmodal').modal('hide');
            showMainPage();
          });
        });
        
      }
      $('#loginbutton').attr("disabled", false);
      
    })
  
  });
  
  

});