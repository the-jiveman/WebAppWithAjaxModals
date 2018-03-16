'use strict';

var App = App || {};


App.PeopleIndex = (function ($) {

    var init = function () {
        loadPeople();
        registerPersonEvents();
    };

    function registerPersonEvents() {
        var personSaveUrl = App.GetApplicationRelativeUrl('People/Save');
        App.Modal.RegisterRemoteModalForm('#btnAddPerson', 'Add New Person', App.Modal.Templates.saveForm, personSaveUrl, loadPeople);

        var personDeleteUrl = App.GetApplicationRelativeUrl('People/DeleteConfirm');
        App.Modal.RegisterRemoteModalForm('.btnDeletePerson', 'Delete Person', App.Modal.Templates.deleteForm, personDeleteUrl, loadPeople);
    }

    function loadPeople() {
        var peopleIndexUrl = App.GetApplicationRelativeUrl('People/AllPeople');
        App.LoadAjaxDataTable('#peopleTableWrapper', peopleIndexUrl, {
            order: [[0, 'desc']]
        });
    }


    return {
        Initialize: init
    };

})(jQuery);