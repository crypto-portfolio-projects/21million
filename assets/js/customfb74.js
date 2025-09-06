$(document).ready(function () {
    // forms
    $(".form-js").submit(function (event) {
        event.preventDefault();
        
        var form = $(this);
        var formSubmitButton = $(form).closest('form').find(':submit');
        $(formSubmitButton).attr('disabled', true);
        var formData = $(form).serialize();
        var formUrl = $(form).attr('action');

        submitForm(form, formSubmitButton, formUrl, formData);
    });
    
    function submitForm(form, formSubmitButton, formUrl, formData) {
        $.ajax({
            type: "POST",
            url: formUrl,
            data: formData,
            dataType: "json",
            encode: true,
            cache: false
        }).done(function (data) {
            console.log(data);
            if (!data.success) {
                $($(form).closest('form').find('.form-response')).html('<div class="alert alert-danger alert-dismissible fade show"> ' + data.err_msg + '</div>');
            } else {
                if (data.redirect) {
                    location.href = data.redirect_url;
                } else {
                    $($(form).closest('form').find('.form-response')).html('<div class="alert alert-success alert-dismissible fade show"> ' + data.err_msg + '</div>');
                }
            }
            $(formSubmitButton).attr('disabled', false);
        });
    }

});