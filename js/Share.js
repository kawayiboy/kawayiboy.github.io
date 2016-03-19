var sharetext = 'http://kawayiboy.github.io/qrcodegen.html';

function initShareWidget(d, s, id, widgetUrl) {
    var js,
        fjs = d.getElementsByTagName(s)[0],
        p = /^http:/.test(d.location) ? 'http' : 'https';
    if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = p + '://' + widgetUrl;
        // insert the widget before first widget
        fjs.parentNode.insertBefore(js, fjs);
    }
}

function openUrl(url, openAsPopup) {
    if (openAsPopup) {
        // open as a popup window
        window.open(url, 'shareWin', 'width=500,height=500,toolbar=1,resizable=0');
    } else {
        // open in new tab
        var win = window.open(url, '_blank');
        win.focus();
    }
}

! function(d, s, id) {
    $('#facebook-link').attr('href', 'https://www.facebook.com/sharer/sharer.php?u=' + sharetext);
    $('#facebook-link').click(function(e) {
        e.preventDefault();
        openUrl($(this).attr('href'), true);
    });
    initShareWidget(d, s, id, 'connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5');
}(document, 'script', 'facebook-jssdk');

! function(d, s, id) {
    $('#twitter-link').attr('href', 'https://twitter.com/share');
    $('#twitter-link').attr('data-text', sharetext);
    $('#twitter-link').click(function(e) {
        e.preventDefault();
        openUrl($(this).attr('href'), true);
    });
    initShareWidget(d, s, id, 'platform.twitter.com/widgets.js');
}(document, 'script', 'twitter-wjs');

$('#email-icon').click(function() {
    var subject = 'share qrcodegen';
    var subjectEncoded = encodeURIComponent(subject);

    var url = 'mailto:tenglu2@gmail.com?subject=' + subjectEncoded + '&body=' + sharetext;
    window.location.replace(url);
});

function copyToClipboard() {
    var success = true,
        range = document.createRange(),
        selection;

    // For IE.
    if (window.clipboardData) {
        window.clipboardData.setData('Text', sharetext);
    } else {
        // Create a temporary element off screen.
        var tmpElem = $('<div>');
        tmpElem.css({
            position: 'absolute',
            left: '-1000px',
            top: '-1000px',
        });
        // Add the input value to the temp element.
        tmpElem.text(sharetext);
        $('body').append(tmpElem);
        // Select temp element.
        range.selectNodeContents(tmpElem.get(0));
        selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        // Lets copy.
        try {
            success = document.execCommand('copy', false, null);
        } catch (e) {
            console.log(e);
        }
        if (success) {
            alert('copyed ' + sharetext + ' to clipboard');
            // remove temp element.
            tmpElem.remove();
        }
    }
}

$('#copy-icon').click(function() {
    copyToClipboard();
});
