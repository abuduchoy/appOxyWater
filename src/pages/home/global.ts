export var global = {

    url: function (pages) {
        // var url = "http://192.168.194.1/oxy/db_access_mobile.php?page=barang";
        // var url = "http://192.168.141.1/oxy/db_access_mobile.php?page=barang";
        // var url = "http://localhost/oxy/db_access_mobile.php?page=barang";
        
        // var url = 'http://192.168.194.1/oxy/db_access_mobile.php?page=' + pages;
        var url = 'http://localhost/oxy/db_access_mobile.php?page=' + pages;
        // var url = 'http://192.168.14.1/oxy/db_access_mobile.php?page=' + pages;
        return url;
    },

    images: function() {
        // var image = 'http://192.168.194.1/oxy/public/images/';
        // var image = 'http://192.168.14.1/oxy/public/images/';
        var image = 'http://localhost/oxy/public/images/';

        return image;
    }
}