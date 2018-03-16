(function ($) {

    // For improving the visual highlighting when a validation error occurs:

    var defaultOptions = {
        errorClass: 'has-error',
        highlight: function (element, errorClass, validClass) {
            $(element).closest('.form-group')
                .removeClass(validClass)
                .addClass('has-error');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).closest('.form-group')
            .removeClass('has-error');
        }
    };

    $.validator.setDefaults(defaultOptions);

    $.validator.unobtrusive.options = {
        errorClass: defaultOptions.errorClass
    };


})(jQuery);