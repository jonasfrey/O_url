import {O_url} from "./O_url.module.js"


// var a_s_url = [

//     "http://www.foufos.gr",
//     "https://www.foufos.gr",
//     "http://foufos.gr",
//     "http://www.foufos.gr/kino",
//     "http://werer.gr",
//     "www.foufos.gr",
//     "www.mp3.com",
//     "www.t.co",
//     "http://t.co",
//     "http://www.t.co",
//     "https://www.t.co",
//     "www.aa.com",
//     "http://aa.com",
//     "http://www.aa.com",
//     "https://www.aa.com",
//     "www.foufos",
//     "www.foufos-.gr",
//     "www.-foufos.gr",
//     "foufos.gr",
//     "http://www.foufos",
//     "http://foufos",
//     "www.mp3#.com"
// ]

// for(var s_url of a_s_url){
//     var o_url = new O_url(s_url)
//     console.log(JSON.stringify(o_url, null, 4))
// }



import { assertEquals } from "https://deno.land/std@0.154.0/testing/asserts.ts";


Deno.test(
    "dns test",
    async () => {
        var o_url = new O_url("https://one.one.one.one")
        await o_url.f_update_a_s_ip()
        console.log(o_url)
        assertEquals(o_url.a_s_ipv4.indexOf("1.1.1.1")!=-1,true)

    }
);

Deno.test(
    "general test ",
    async () => {
        var o_url = new O_url("https://maxmuster:geheim@www.example.com:8080/index.html?p1=A&p2=B#ressource")
        assertEquals(o_url.s_domainname, "www.example.com")
        assertEquals(o_url.s_protocol, "https")
        assertEquals(o_url.s_username, "maxmuster")
        assertEquals(o_url.s_password, "geheim")
        assertEquals(o_url.s_port, "8080")
        assertEquals(o_url.n_port, 8080)
        assertEquals(o_url.s_path, "/index.html")
        assertEquals(o_url.s_query, "?p1=A&p2=B")
        assertEquals(o_url.s_fragment, "#ressource")
        // assertEquals(o_url.o_folder_file.s_folder_name, "")
        // assertEquals(o_url.o_folder_file.s_file_name, "index.html")
    }
);


Deno.test(
    "geo location test",
    async () => {
        var o_url = new O_url("https://one.one.one.one")
        await o_url.f_update_o_geolocation()
        console.log(o_url.o_geolocation)
        assertEquals(["1.1.1.1", "1.0.0.1"].indexOf(o_url.o_geolocation.ip) != -1, true)
        assertEquals(o_url.o_geolocation.country, "US")
        assertEquals(o_url.o_geolocation.city, "Los Angeles")
        assertEquals(o_url.o_geolocation.region, "California")

    }
);



await Deno.test(
    "dns async test",
    async () => {
        var o_url = new O_url("https://one.one.one.one")
        return o_url.f_update_a_s_ip().then(
            function(){
                assertEquals("", "")
                // assertEquals(o.a_s_ipv4.filter(s => s == '1.1.1.1'),['1.1.1.1'])
            }
        )
    }
);


Deno.test(
    "geo location async test",
    async () => {
        var o_url = new O_url("https://one.one.one.one")
        return o_url.f_update_o_geolocation().then(function(){
            console.log(o_url.o_geolocation)
            assertEquals(["1.1.1.1", "1.0.0.1"].indexOf(o_url.o_geolocation.ip) != -1, true)
            assertEquals(o_url.o_geolocation.country, "US")
            assertEquals(o_url.o_geolocation.city, "Los Angeles")
            assertEquals(o_url.o_geolocation.region, "California")
        })


    }
);
console.log("done")