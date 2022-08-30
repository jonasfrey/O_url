import O_url from "./O_url.module.js"


var a_s_url = [

    "http://www.foufos.gr",
    "https://www.foufos.gr",
    "http://foufos.gr",
    "http://www.foufos.gr/kino",
    "http://werer.gr",
    "www.foufos.gr",
    "www.mp3.com",
    "www.t.co",
    "http://t.co",
    "http://www.t.co",
    "https://www.t.co",
    "www.aa.com",
    "http://aa.com",
    "http://www.aa.com",
    "https://www.aa.com",
    "www.foufos",
    "www.foufos-.gr",
    "www.-foufos.gr",
    "foufos.gr",
    "http://www.foufos",
    "http://foufos",
    "www.mp3#.com"
]

for(var s_url of a_s_url){
    var o_url = new O_url(s_url)
    console.log(JSON.stringify(o_url, null, 4))
}