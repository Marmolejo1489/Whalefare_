jQuery(function($){
    var page = $('#options-page'); //pagina = options body
    var newQuery = page.find('.new'); //newQuery = Agregar Nuevo Dato
    var tpl = page.find('.template'); //tpl = filas
    tpl.hide();
    var id = 0;

    //nueva query
    function createQuery(id){
        if ($('#row-' + id).length > 0){
            return $('#row-' + id);
          }
          var c = tpl.clone();
          c.removeClass('template');
          tpl.parent().append(c); //inserta el nuevo dato
          c.show(); //lo muestra en el html
          c.attr('id', 'row-' + id);
          c.find('.url').attr('name', 'url-' + id);
          c.find('.query').attr('name', 'query-' + id);
          c.find('.value').attr('name', 'value-' + id);

          //eliminar un dato del localStorage
          c.find('.remove').click(function(){
            c.remove();
            var id = c.attr('id').replace(/row-/, '');
            localStorage.removeItem('url-' + id);
            localStorage.removeItem('query-' + id);
            localStorage.removeItem('value-' + id);
          });
          return c;
    }
    newQuery.click(function(){
        createQuery(++id);
        return false;
    });

    //encuentra input de tipo checkbox en la pagina para checkearlos cuando se llenen los datos
    page.find('input[type=checkbox]').each(function(){
        var key = $(this).attr('name');
        localStorage[key] = localStorage[key] || '';
        if (localStorage[key]){
          $(this).attr('checked', 'checked');
        }
        $(this).change(function(){
          if ($(this).attr('checked')){
            localStorage[key] = 'checked';
          }else{
            localStorage[key] = '';
          }
        });
    });

    //encuentra el input de tipo texto en la página y recupera el valor que se le asignó
    //con anterioridad
    page.find('input[type=text]').live('keyup', function(){
        var key = $(this).attr('name');
        localStorage[key] = $(this).val();
    });

    //recorre el localStorage buscando los datos que coinciden para recuperarlos
    for (var k in localStorage){
        if (k.match(/^(query|url|value)-(\d+)/)){
          var type = RegExp.$1;
          var id = RegExp.$2;
          var c = createQuery(id);
          c.find('.' + type).val(localStorage[k]);
        }
    };

    //si no hay nada guardado se agrega este dato primero por default
    if (id == 0){
        var c = createQuery(++id);
        c.find('.url').val('https://www.facebook.com/');
        c.find('query').val('input[name=email]');
        c.find('.value').val('ejemplo@gmail.com');
        c.find('input').trigger('keyup');
    }
});