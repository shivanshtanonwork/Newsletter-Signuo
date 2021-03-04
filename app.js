const express = require("express")
const bodyParser =  require("body-parser")
const request = require("request")
const https = require("https")
const port = process.env.PORT

const app = express()

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res)=> {
  res.sendFile(__dirname + '/signup.html')
})

app.post('/', (req,res) => {
  const firstName = req.body.fName
  const lastName = req.body.lName
  const email = req.body.email

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fiedls: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  }
  const jsonData = JSON.stringify(data)

  const url = "https://us1.api.mailchimp.com/3.0/lists/8e04311fd4"

  const options = {
    method: "POST",
    auth: "shivansh1:91fb37289227ff4e4f65a17213b8b630-us1"
  }

const request = https.request(url, options, (response) => {

  if (response.statusCode === 200){
    res.sendFile(__dirname + "/success.html")
  } else {
    res.sendFile(__dirname + "/failure.html")
  }

    response.on("data", (data)=>{
      console.log(JSON.parse(data))
    })
  })

  request.write(jsonData)
  request.end()

})

app.post('/failure', (req,res)=> {
  res.redirect('/')
})

app.listen(port || 3000, () => {
  console.log("Listening on port 3000 ")
})


//API key
// 222680d96dd8fe21387dda40e6af805c-us1

//List ID
// 8e04311fd4
