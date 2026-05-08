import Cookies from "js-cookie";

export function formatCurrency(amount: number | string) {
    const locale = Cookies.get("locale") || "en";
    const usdAmount = Number(amount);
    const exchangeRate = 4100;

    if (locale === "kh") {
        const khrAmount = usdAmount * exchangeRate;
        return `៛${khrAmount.toLocaleString("en-US")}`;
    }

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(usdAmount);
}