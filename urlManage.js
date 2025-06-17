const url=require("url")
const querystring=require("querystring")

const exampleURL="http://example.com:8080?name=mazaharul&age=21"

//url information in object format 
// lagacy way
url.parse(exampleURL) 

//morden way (suggest)
new URL(exampleURL)

//query string module  lagacy way
const genQuery={
  isMain:true,
  isFail:false
}

//genate object into query string
querystring.stringify(genQuery)

//extrac query into object
const newq=querystring.parse(querystring.stringify(genQuery))

//custom queystirng 
const customQuery = 'id:123;item:book;color:blue'; 

querystring.parse(customQuery,";",":")
//escape
const string="dkd%kd akdkdk"
const encode=querystring.escape(string)
//unescape
querystring.unescape(encode)
//modden way to handle query or search params
const demoqury="name=maza&age=21"

//get queries
const quries=new URLSearchParams(demoqury) //return a map (key-value pair collection)
//get single query properties
quries.get("name") // query propery name

