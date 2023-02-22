import PopupStyle from "./Popup.scss";

const hello = chrome.i18n.getMessage("popupHello");

function Popup () {
    return (
        <div className={ PopupStyle['hello-red'] }>{ hello }</div>
    );
}

export default Popup;