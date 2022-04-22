var matchRowHeader = _.template('<tr><th>Sitio Web</th><th>Usuario</th><th>Contraseña</th><th>Eliminar</th></tr>\n');

var matchRowTemplate = _.template('<tr>\n' + 
                                  '  <td><a href="<%= url %>" target="_new" title="<%= notes %>"><%= domain %></a></td>\n'+
                                  '  <td id="username"><%= displayUsername %></td>\n'+  
                                  '  <td><button class="clippy btn btn-warning btn-xs" data-clipboard-text="<%= password %>">Copiar</button></td>\n'+
                                  '  <td><button class="deletebutton btn btn-danger btn-xs" data-id="<%= _id %>" data-rev="<%= _rev %>">X</button>\n'+
                                  '  </td>\n'+                               
                                  '</tr>');
                                  
var emptyVaultTemplate = _.template('<div class="container"><div class="alert alert-info emptyvault">Tu bóveda está vacía. <br /><br />Agrega una nueva contraseña dando click en el ícono <span class="glyphicon glyphicon-plus" aria-hidden="true"></span> de la barra superior.</div></div>');
                                  
var noMatchesTemplate = _.template('<div class="container"><div class="alert alert-info emptyvault">No hay coincidencias para <b><%= domain %></b>.<br /><br /> Guarda tus contraseñas dando click en el ícono <span class="glyphicon glyphicon-plus" aria-hidden="true"></span> en la barra superior.</div></div>');


var replicationStartedTemplate = _.template('<div class="alert alert-info repstatus">Starting replication</div>');                                  

var replicationChangeTemplate = _.template('<div class="alert alert-info repstatus">Change: <br /> <br /><%= info %></div>');                                  

var replicationCompleteTemplate = _.template('<div class="alert alert-success repstatus">Complete!</div>');                                  
                                  
var replicationErrorTemplate = _.template('<div class="alert alert-danger repstatus">Error: <br /> <br /><%= info %></div>');