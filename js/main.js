(function($) {
  $.when(
    $.getJSON( 'js/vendor/cldr/en/currencies.json' ),
    $.getJSON( 'js/vendor/cldr/en/numbers.json' ),
    $.getJSON( 'js/vendor/cldr/supplemental/plurals.json' ),
    $.getJSON( 'js/vendor/cldr/supplemental/currencyData.json' ),
    $.getJSON( 'js/vendor/cldr/supplemental/likelySubtags.json' )
  ).then(function() {
    // Normalize $.get results, we only need the JSON, not the request statuses.
    return [].slice.apply( arguments, [ 0 ] ).map(function( result ) {
      return result[ 0 ];
    });
    // eslint-disable-next-line no-undef
  }).then( Globalize.load ).then(function() {
    Globalize.locale('en');
    dropdownEl = $('.currency-dropdown');
    input = $('input');
    display = $('.display-name');

    dropdownEl.on('change', event => {
      iso = $(event.target).val()
      val = Number(input.val());
      if (val) {
        display.html(Globalize.formatCurrency(val, iso));
      }
    });
    input.on('blur', event => {
      iso = dropdownEl.val();
      val = Number(input.val());
      display.html(Globalize.formatCurrency(val, iso));
    });

  });

// eslint-disable-next-line no-undef
}(jQuery));
