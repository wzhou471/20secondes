var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology : true,
    useNewUrlParser: true,
}

mongoose.connect('mongodb+srv://wzhou:7JBemOkFRwR2SNzQ@cluster0-6maiz.mongodb.net/20secondes?retryWrites=true&w=majority',
    options,
    function(err){
        console.log(err);
    }
)

module.exports = mongoose