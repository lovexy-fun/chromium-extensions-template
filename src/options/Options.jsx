const hello = chrome.i18n.getMessage("optionsHello");

function Options () {
    return (
        <div>{ hello }</div>
    );
}

export default Options;