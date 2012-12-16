function ClickToSelect(parent) {

    var active = false;

    function SelectText(text) {
        var doc = document,
            range, selection;
        if (doc.body.createTextRange) {
            range = document.body.createTextRange();
            range.moveToElementText(text);
            range.select();
        } else if (window.getSelection) {
            selection = window.getSelection();
            range = document.createRange();
            range.selectNodeContents(text);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
    function select(e) {
        if (active) {
            e.preventDefault();
            SelectText(e.target);
        }
    }
    parent.addEventListener('selectstart', select, false);
    parent.addEventListener('click', select, false);

    return {
        on: function(){active = true ; return this;},
        off:function(){active = false; return this;},
    };

}

var handle = ClickToSelect(document.body).on();
