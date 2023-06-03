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
        return o_url.f_update_a_s_ip().then(function(){
            console.log(o_url)
            assertEquals(o_url.a_s_ipv4.indexOf("1.1.1.1")!=-1,true)
        }).catch(function(o_e){

            // console.log(o_e)
            console.log("an error happened")
        }).finally(
            function(){
                console.log('finally')
                assertEquals(1, 1)
            
            }
            
        )

    }
);

console.log("if you see no output run with 'deno test -A mytest.js'")
var o_url = new O_url("https://one.one.one.one")
o_url.f_update_a_s_ip().then(
    function(){
        console.log(o_url)
        assertEquals(o_url.a_s_ipv4.indexOf("1.1.1.1")!=-1,true)
    }, 
    function(){
        console.log("an error happened")
    
    }).catch(function(o_e){

    // console.log(o_e)
    console.log("an error happened")
}).finally(
    function(){
        console.log('finally')
        assertEquals(1, 1)
    
    }
    
)