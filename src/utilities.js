import Notify from 'simple-notify'
import 'simple-notify/dist/simple-notify.min.css'

export const spaces = ()=>{
    return (<>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>)
}

export const formatNumber = (number, decimals=0)=>{
    if (number < 0) return "-" + formatNumber(-number)
    number *= 1.0000000001 //hopefully less Javascript Jank

    const sNumberString = Math.floor(number).toExponential(6)
    if (number===Infinity) {
        return "Infinity"
    } else if (isNaN(number)) {
        return "NaN"
    } else if (number < 1e6 && decimals > 0) {
        return number.toFixed(0)
    } else {
        const aNumberSplits = sNumberString.split("e+")
        const fMultiplier = parseFloat(aNumberSplits[0]) * 1.0000000001
        const iExponent = parseInt(aNumberSplits[1])
        const aSymbols = ["","K","M","B","T","Q","P","H","S","O","N","D"]
        const sSymbol = aSymbols[Math.floor(iExponent / 2.9999)]
        const aExtras = [1,10,100]
        const iExtra = aExtras[iExponent % 3]
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