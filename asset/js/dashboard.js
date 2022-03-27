//URL paths


function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str));
};

function UnicodeDecodeB64(str) {
    return decodeURIComponent(atob(str));
};


$(window).on('load', function() {
    var apikey = sessionStorage.getItem("apikey");
    var accid = sessionStorage.getItem("accid");
    console.log(UnicodeDecodeB64(apikey));
    console.log(UnicodeDecodeB64(accid));
    get_user_stock(accid);
});

function logout(){
    sessionStorage.removeItem("apikey");
    sessionStorage.removeItem("accid");
    window.location.replace("index.html");
}


async function doAjax(url, method){
    return $.ajax({
        url: url,
        type: method || 'GET',
        dataType: 'json',
    });
}

async function get_user_stock(accid){
    var accid = UnicodeDecodeB64(accid);
    var loginURL = 'http://localhost:8000/api/v1/user_stock/';
    const website = loginURL + accid;
    try {
        const result = await doAjax(website, 'GET');
        console.log(result)
        if (result.code === 200) {
            console.log(result["user_stocks"]);
            var user_stocks = result["user_stocks"];
            var rows = "";
                for (const stock of user_stocks) {
                    var price = parseFloat(stock.purchased_price)
                    console.log(price);
                    eachRow ="<td>" + stock.user_stockid + "</td>" +
                                "<td>" + stock.accid + "</td>" +
                                "<td>" + stock.tradeid + "</td>" +
                                "<td>" + stock.stock_symbol + "</td>"+
                                "<td>" + stock.stock_quantity + "</td>" +
                                "<td>" + price + "</td>" +
                                "<td>" + stock.currency + "</td>";
                    rows += "<tr>" + eachRow + "</tr>";
                }
                    // add all the rows to the table
                $('#user_stocks_table_body').append(rows);

        }

    } catch (error) {
        console.log('error')
        console.log("pause2");
        alert("Error: " + error);
    }
}