chrome.extension.sendRequest({
    "action": "getOptions",
    "args": []
}, function(response){
    var queries = {}
    for (var k in response){
      if (k.match(/^(query|url|value)-(\d+)/)){
        var type = RegExp.$1;
        var id = RegExp.$2;
        queries[id] = queries[id] || {}
        queries[id][type] = response[k];
      }
    };
    /* 
    Si la direccion url de una pagina coincide con alguna de las que han sigo guardadas
    entonces se recuperaran los datos que se guardaron junto con esa dirección
    */
    for (id in queries){
      var q = queries[id]
      if (document.location.href.match(new RegExp(q['url']))){
        $(q['query']).val(q['value']);
      }
    }
});