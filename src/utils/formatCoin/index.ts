

export function formatCoin(coin: number, currencyCode: string) {
    let languageCode;
    let currency 
    let symbol
    switch (currencyCode) {
        case "USD":
            languageCode = "en-US"; 
            currency = currencyCode
            break;
        case "EUR":
            languageCode = "fr-FR"; 
            currency = currencyCode
            break;
        case "BRL":
            languageCode = "pt-BR"; 
            currency = currencyCode
            break;
        case "GBP":
            languageCode = "en-GB"; 
            currency = currencyCode
            break;
        case "JPY":
            languageCode = "ja-JP"; 
            currency = currencyCode
            break;
        case "AUD":
            languageCode = "en-AU"; 
            currency = currencyCode
            break;
        case "CAD":
            languageCode = "en-CA"; 
            currency = currencyCode
            break;
        case "CHF":
            languageCode = "de-CH"; 
            currency = currencyCode
            break;
        case "CNY":
            languageCode = "zh-CN";
            currency = currencyCode
            break;
        case "INR":
            languageCode = "hi-IN"; 
            currency = currencyCode
          break;
          case "AED":
        languageCode = "ar-AE";
        currency = currencyCode;
        symbol = "د.إ";
        break;
      case "AFN":
        languageCode = "ps-AF";
        currency = currencyCode;
        symbol = "؋";
        break;
      case "ARS":
        languageCode = "es-AR";
        currency = currencyCode;
        symbol = "$";
        break;
      case "BHD":
        languageCode = "ar-BH";
        currency = currencyCode;
        symbol = ".د.ب";
        break;
      case "BOB":
        languageCode = "es-BO";
        currency = currencyCode;
        symbol = "Bs.";
        break;
      case "BTC":
        languageCode = "en";
        currency = currencyCode;
        symbol = "₿";
        break;
        default:
            languageCode = "en-US";  
            currency = "USD"
  
    }
    const formattedCoin = new Intl.NumberFormat(languageCode, {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(coin);
  
    return `${symbol? symbol : ""}${formattedCoin}`
  }