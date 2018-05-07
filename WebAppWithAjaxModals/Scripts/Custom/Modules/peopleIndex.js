'use strict';

var App = App || {};


App.PeopleIndex = (function ($) {

    var init = function () {
        loadPeopleGrid();
        registerPersonEvents();
    };

    function registerPersonEvents() {
        var personSavePostUrl = App.GetApplicationRelativeUrl('People/Save');
        App.Modal.RegisterRemoteModalForm('.btnAddPerson', 'Add Person', App.Modal.Templates.saveForm, personSavePostUrl, loadPeopleGrid);
        App.Modal.RegisterRemoteModalForm('.btnEditPerson', 'Edit Person', App.Modal.Templates.saveForm, personSavePostUrl, loadPeopleGrid);

        var personDeletePostUrl = App.GetApplicationRelativeUrl('People/DeleteConfirm');
        App.Modal.RegisterRemoteModalForm('.btnDeletePerson', 'Delete Person', App.Modal.Templates.deleteForm, personDeletePostUrl, loadPeopleGrid);
    }

    function loadPeopleGrid() {
        var peopleIndexUrl = App.GetApplicationRelativeUrl('People/AllPeople');
        App.LoadAjaxDataTable('#peopleTableWrapper', peopleIndexUrl, {
            order: [0, 'desc']
        });
    }


    return {
        Initialize: init
    };

})(jQuery);