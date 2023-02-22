import OptionsStyle from "./Options.scss";

const hello = chrome.i18n.getMessage("optionsHello");

function Options () {
    return (
        <div className={OptionsStyle['hello-red']}>{ hello }</div>
    );
}

export default Options;