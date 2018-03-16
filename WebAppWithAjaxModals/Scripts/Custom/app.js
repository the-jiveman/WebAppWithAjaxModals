'use strict';

var App = App || {};

App.Constants = {
    LoadingNoticeTemplate: '<p class="loadingNotice"><i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i> Loading...</p>',
    LoadingButtonTemplate: '<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true" title="Loading, please wait..."></i> <span class="sr-only">Loading, please wait...</span>',
    AjaxSuccessMessageTemplate: '<p class="text-center alert alert-success">Saved successfully!</p>',
    AjaxErrorMessageTemplate: '<p class="text-center alert alert-danger">Error encountered: {{message}}</p>'
};

// Stores reference to the root of the web application in relation to the IIS site root
App.ApplicationBasePath = '';

App.Initialize = function (pathFromHostSiteRoot, environmentLabel) {
    App.ApplicationBasePath = pathFromHostSiteRoot;
    App.SetEnvironmentLabel(environmentLabel);
    App.Modal.Initialize();
    App.RegisterGlobalEvents();
};

App.RegisterGlobalEvents = function() {
    // Highlight the Bootstrap Panels by changing the color based on current focus
    $(document).on('click focus', '.panel-default', function () {
        $('.panel-primary').toggleClass('panel-primary panel-default');
        $(this).toggleClass('panel-default panel-primary');
    });
};

App.GetApplicationRelativeUrl = function (relativePath) {
    return App.ApplicationBasePath + relativePath;
};

App.RedirectToApplicationRelativeUrl = function (relativePath) {
    window.location = App.GetApplicationRelativeUrl(relativePath);
};

App.InitializeJqueryUnobtrusiveValidation = function (form) {
    form.removeData('validator').removeData('unobtrusiveValidation');
    if ($.validator) {
        $.validator.unobtrusive.parse(form);
    }
}

App.LoadAjaxDataTable = function (containerIdentifier, contentUrl, dataTableOptions) {
    var $container = $(containerIdentifier);
    $container.html(App.Constants.LoadingNoticeTemplate);

    App.GetAjaxData(contentUrl, function (resultContent) {
        $container.html(resultContent);

        var $table = $('table', $container);
        App.InitializeDataTable($table, dataTableOptions);
        $table.show();
    });
}

App.InitializeDataTable = function ($element, options) {
    // Initialize date formats:
    $.fn.dataTable.moment('M/D/YYYY');
    $.fn.dataTable.moment('MM/DD/YYYY');
    $.fn.dataTable.moment('M/D/YYYY h:mm a');

    // Create a new options object only if there isn't one already:
    options = options || {};

    // Add options that we want to apply globally to all data tables throughout the app:
    options.columnDefs = options.columnDefs || [];
    options.columnDefs.push({ targets: ['noSortColumn'], orderable: false });  // Disable sorting on all columns that have class 'noSortColumn'
    options.columnDefs.push({ targets: ['noSearchColumn'], searchable: false });  // Disable search on all columns that have class 'noSearchColumn'
    options.pagingType = 'numbers';

    // Initialize DataTable
    var dataTable = $element.DataTable(options);

    // Initialize inidividual column filters in the footer (if present in the HTML table):
    dataTable.columns().every(function () {
        var column = this;
        if (column.footer() !== null) {

            $('select', column.footer()).on('change', function() {
                var searchVal = $.fn.dataTable.util.escapeRegex($(this).val());
                var regexSearchVal = searchVal ? '^' + searchVal + '$' : '';
                column.search(regexSearchVal, true, false).draw();
            });
            $('input', column.footer()).on('keyup', function () {
                var searchVal = $(this).val();
                column.search(searchVal).draw();
            });
        }
    });


    return dataTable;
};

App.GetAjaxData = function (dataUrl, callback) {
    $.ajax({
        url: dataUrl,
        method: 'GET',
        cache: false
    }).done(function (resultData) {
        callback(resultData);
    }).fail(function (xhr, status, p3, p4) {
        var err = 'Error ' + ' ' + status + ' ' + p3 + ' ' + p4;
        if (xhr.responseText && xhr.responseText[0] === '{')
            err = JSON.parse(xhr.responseText).message;
        console.log(err);
    });
};

App.SetEnvironmentLabel = function (labelName) {
    if (labelName) {
        var environmentLabelCss = '\
            <style>\
                body:after{\
                    content: "' + labelName + '";\
                    position: fixed;\
                    width: 80px;\
                    height: 25px;\
                    background: #EE8E4A;\
                    top: 7px;\
                    left: -20px;\
                    text-align: center;\
                    font-size: 12px;\
                    font-family: sans-serif;\
                    text-transform: uppercase;\
                    font-weight: bold;\
                    color: #fff;\
                    line-height: 27px;\
                    -ms-transform:rotate(-45deg);\
                    -webkit-transform:rotate(-45deg);\
                    transform:rotate(-45deg);\
                }\
            </style>';

        $('html > head').append(environmentLabelCss);
    }
};