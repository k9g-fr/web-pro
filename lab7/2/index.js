const express = require('express')
const app = express()
const port = 3000
const path = require('path');
// Serve static files from multiple directories
app.use(express.static('public'));
app.use(express.static('files'));
// Or specify a virtual path prefix
app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '/public/index.html'));
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}, press Ctrl-C to terminate....`)
})