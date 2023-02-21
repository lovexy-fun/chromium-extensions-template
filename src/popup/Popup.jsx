const hello = chrome.i18n.getMessage("popupHello");

function Popup () {
    return (
        <div>{ hello }</div>
    );
}

export default Popup;