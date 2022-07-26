import Notify from 'simple-notify'
import 'simple-notify/dist/simple-notify.min.css'

export const spaces = ()=>{
    return (<>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>)
}

export const formatNumber = (number, numberFormat, decimals=0, smallfixed=false)=>{
    if (number < 0) return "-" + formatNumber(-number, decimals, numberFormat)
    number *= 1.0000000001 //hopefully less Javascript Jank

    const sNumberString = Math.floor(number).toExponential(10)
    if (number===Infinity) {
        return "Infinity"
    } else if (isNaN(number)) {
        return "NaN"
    } else if (smallfixed && number < 1e6) {
        return number.toFixed(decimals)
    } else if (number < 1e6 && (decimals > 0 || numberFormat === "SCIENTIFIC")) {
        return number.toFixed(0)
    } else {
        const aNumberSplits = sNumberString.split("e+")
        const fMultiplier = parseFloat(aNumberSplits[0]) * 1.0000000001
        const iExponent = parseInt(aNumberSplits[1])
        const aSymbols = ["","K","M","B","T","Q","P","S","V","O","N","D"]
        const aExtras = [1,10,100]
        let sSymbol
        let iExtra
        switch (numberFormat) {
            case "SCIENTIFIC":
                sSymbol = "e" + iExponent
                iExtra = 1
                break;
            case "AMBIGUOUS":
                if (number >= 1e36) {
                    sSymbol = "e?"
                    iExtra = 1
                } else {
                    sSymbol = "?"
                    iExtra = aExtras[iExponent % 3]
                }
                break;
            default: //includes LETTER
                if (number >= 1e36) {
                    sSymbol = "e" + iExponent
                    iExtra = 1
                } else {
                    sSymbol = aSymbols[Math.floor(iExponent / 2.9999)]
                    iExtra = aExtras[iExponent % 3]
                    break;
                }
        }
        if (!decimals && (fMultiplier * iExtra) % 0.1 > 0.005) {
            decimals = 2
        } else if (!decimals && (fMultiplier * iExtra) % 1 > 0.05) {
            decimals = 1
        }
        return (fMultiplier * iExtra).toFixed(decimals) + sSymbol
    }
}

export const notify = {
    success: function(title, text) {
        this.showNotification({status:'success',title:title, text:text})
    },
    warning: function(title, text) {
        this.showNotification({status:'warning',title:title, text:text})
    },
    error: function(title, text) {
        this.showNotification({status:'error',title:title, text:text})
    },
    showNotification: (props) => {
        return new Notify({
            status: 'success',
            effect: 'fade',
            speed: 1000,
            //customClass: "",
            showCloseButton: false,//
            autoclose: true,//
            autotimeout: 2000,
            type: 1,
            ...props
        })
    }
}

export const secondsToHms = (seconds)=>{
    if (seconds === Infinity) return "Infinity"
    if (isNaN(seconds)) return "NaN"

    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600*24));
    var h = Math.floor(seconds % (3600*24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    
    var dDisplay = d > 0 ? d + "d" : "";
    var hDisplay = d > 0 || h > 0 ? h + "h": "";
    var mDisplay = d > 0 || h > 0 || m > 0 ? m + "m" : "";
    var sDisplay = s + "s";
    var hZero = dDisplay && h < 10 ? "0" : "";
    var mZero = hDisplay && m < 10 ? "0" : "";
    var sZero = mDisplay && s < 10 ? "0" : "";
    return dDisplay + hZero + hDisplay + mZero + mDisplay + sZero + sDisplay;
}