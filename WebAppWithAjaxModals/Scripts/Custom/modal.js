'use strict';

var App = App || {};

App.Modal = function ($) {

    var $modal = $('#modalForm');
    var $modalForm = $modal.find('form');
    var $modalBody = $modal.find('.modal-body');
    var $modalTitle = $modal.find('.modal-title');
    var $modalFooter = $modal.find('.modal-footer');
    var $formSubmitBtn;
    var formSubmitBtnTempHtml;

    var settings = {
        formPostUrl: undefined,
        modalCloseCallback: undefined,
        runCallbackOnModalClose: false
    };

    var htmlTemplates = {
        loadingNotice:
            '<p class="loadingNotice"><i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i> Loading...</p>',
        simpleOkButton:
            '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>',
        saveAndCancelButtons:
            '<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>\n' +
            '<button type="submit" class="btn btn-primary">Save</button>',
        deleteAndCancelButtons:
            '<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>\n' +
            '<button type="submit" class="btn btn-danger">Delete</button>',
        defaultSubmitButtonInnerHtml:
            'Save'
    };

    var templates = Object.freeze({
        okOnly: 'simpleOkButton',
        saveForm: 'saveAndCancelButtons',
        deleteForm: 'deleteAndCancelButtons'
    });


    function init() {
        $modal.on('show.bs.modal', function () {
            clearModalContent();
            setModalBody(htmlTemplates.loadingNotice);
        });

        $modal.on('hidden.bs.modal', function () {
            clearModalContent();
            if (settings.runCallbackOnModalClose && settings.modalCloseCallback) {
                settings.modalCloseCallback();
            }
        });

        $modalForm.on('submit', function (e) {
            e.preventDefault();
            var $form = $(this);

            if (!$form.valid()) return;

            disableFooterButtons();

            $.post(settings.formPostUrl, $form.serialize())
                .done(function (response) {
                    enableFooterButtons();

                    if (typeof (response) === 'string') {
                        setModalBody(response);
                    } else {
                        if (response.Success) {
                            displaySuccessMessage();
                            settings.runCallbackOnModalClose = true;
                        } else
                            displayErrorMessage(response.Message);
                    }
                })
                .fail(function (xhr, status, returnData) {
                    enableFooterButtons();

                    console.log('Error in function Modal.interceptFormSubmit');
                    console.log('Post Url: ' + settings.formPostUrl);
                    console.log('Response status: ' + status);
                    console.log('Response data: ' + returnData);
                    alert('Unexpected error. Review error log for more details.');
                });
        });
    }

    function registerRemoteModalForm(triggerButton, title, modalTemplateName, submitUrl, afterSubmitCallback) {
        $(document).on('click', triggerButton, function () {
            resetModalCloseCallback(submitUrl, afterSubmitCallback);
            showModal();

            var remoteContentUrl = $(this).data('modalContentUrl');
            if (!remoteContentUrl) {
                throw 'Error';
            }

            App.GetAjaxData(remoteContentUrl, function (content) {
                setModalContent(content, title);
                showFooterButtons(modalTemplateName);
            });
        });
    }

    function resetModalCloseCallback(formPostUrl, callback) {
        settings.formPostUrl = formPostUrl;
        settings.modalCloseCallback = callback;
        settings.runCallbackOnModalClose = false;
    }

    function clearModalContent() {
        $modalTitle.html('');
        $modalBody.html('');
        $modalFooter.html('');
    }

    function disableFooterButtons() {
        formSubmitBtnTempHtml = $formSubmitBtn.html();
        $formSubmitBtn.html(App.Constants.LoadingButtonTemplate);
        $('.modal-footer button').each(function () {
            $(this).prop('disabled', 'disabled');
        });
    }
    
    function enableFooterButtons() {
        var buttonHtml = formSubmitBtnTempHtml;
        if (!buttonHtml) {
            buttonHtml = htmlTemplates.defaultSubmitButtonInnerHtml;
        }

        $formSubmitBtn.html(buttonHtml);
        $('.modal-footer button').each(function () {
            $(this).removeAttr('disabled');
        });
    }

    function showFooterButtons(templateName) {
        var buttonsHtml;

        switch (templateName) {
        case templates.okOnly:
            buttonsHtml = htmlTemplates.simpleOkButton;
            break;
        case templates.saveForm:
            buttonsHtml = htmlTemplates.saveAndCancelButtons;
            break;
        case templates.deleteForm:
            buttonsHtml = htmlTemplates.deleteAndCancelButtons;
            break;
        default:
            buttonsHtml = htmlTemplates.simpleOkButton;
        }

        $modalFooter.html(buttonsHtml);
        $formSubmitBtn = $modal.find('button[type=submit]');
    }

    function setModalContent(bodyContent, title, footerContent) {
        $modalTitle.html('<h4>' + title + '</h4>');
        setModalBody(bodyContent);
        if (footerContent) $modalFooter.html(footerContent);
    }

    function setModalBody(bodyContent) {
        $modalBody.html(bodyContent);
        App.InitializeJqueryUnobtrusiveValidation($modalForm);
    }

    function displaySuccessMessage() {
        setModalBody(App.Constants.AjaxSuccessMessageTemplate);
        $modalFooter.html(htmlTemplates.simpleOkButton);
    };

    function displayErrorMessage(message) {
        setModalBody(App.Constants.AjaxErrorMessageTemplate.replace('{{message}}', message));
        $modalFooter.html(htmlTemplates.simpleOkButton);
    };

    function showModal() {
        $modal.modal();
    }

    function hideModal() {
        $modal.modal('hide');
    }


    return {
        Initialize: init,
        Templates: templates,
        RegisterRemoteModalForm: registerRemoteModalForm
    };

}(jQuery);