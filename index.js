var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    fs = require('fs');
    Task = require('./api/models/schReloadModel.js'); //created model loading here

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://192.168.0.103/sch_test_test');
mongoose.connect('mongodb://localhost/sch_test_test_test_test_test');

// mongoose.connect('mongodb://podmoskovye:60K32K2ye3Ro@sch-shard-00-00-sflz6.mongodb.net:27017,sch-shard-00-01-sflz6.mongodb.net:27017,sch-shard-00-02-sflz6.mongodb.net:27017/test?ssl=true&replicaSet=sch-shard-0&authSource=admin');

var path = require('path');
var routes = require('./api/routers/schReloadRouter.js'); //importing route
var routesNormal = require('./api/routers/schNormal.js'); //importing route
const fileUpload = require('express-fileupload');


routes(app); //register the route

app.get('/', function (req, res) {
    res.render("index");
});


app.get('/x', function (req, res) {
    var mongoose = require('mongoose'),
        events = mongoose.model('eventSchema');
    events.deleteMany({})
        .then(function(result) {
            res.send(result);
        });


});


// exports.group_creation = function (req, res) {



app.use(fileUpload());


//TODO redo this stuff
app.post('/api/files/create', function(req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    var mongoose = require('mongoose'),
        file = mongoose.model('fileSchema');

    var sampleFile = req.files.file,
        fileNameFull = sampleFile.name,
        fileName = fileNameFull.replace(/\..+$/, ''), //trimming extensions
        filePath = 'saved\\' + fileNameFull,
        fileDescription = req.body.fileDescription;

  //moving shit
    sampleFile.mv(filePath, function(err) {
        if (err)
            return res.status(500).send(err);

        var newFile = new file({
            fileName: fileName,
            fileNameFull: fileNameFull,
            filePath: filePath,
            fileDescription: fileDescription
        });

        newFile.save(function(err, file) {
            if (err) res.send(err);
            // res.send( file.fileName + ' was uploaded!');
            res.redirect("/");

            // res.json(file);
        });



    });
});

app.post('/api/events/create', function(req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    var mongoose = require('mongoose'),
        file = mongoose.model('fileSchema'),
        event = mongoose.model('eventSchema');

    var sampleFile = req.files.file,
        fileNameFull = sampleFile.name,
        fileName = fileNameFull.replace(/\..+$/, ''), //trimming extensions
        filePath = 'saved\\' + fileNameFull;

    //moving shit
    sampleFile.mv(filePath, function(err) {
        if (err)
            return res.status(500).send(err);

        var newFile = new file({
            fileName: fileName,
            fileNameFull: fileNameFull,
            filePath: filePath

        });

        newFile.save(function(err, file) {
            if (err) res.send(err);

            // res.json(file);
        });
    });

    var newEvent = new event({
        title:req.body.title,
        groups:req.body.groups,
        titlePhoto:fileNameFull,
        text:req.body.text,
        date:req.body.date
    });

    newEvent.save(function(err, event) {
        if (err) res.send(err);
        console.log(event);
        // res.json("event created");
        res.redirect("/");
    });

});

app.post('/api/teachers/create', function(req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    var mongoose = require('mongoose'),
        file = mongoose.model('fileSchema'),
        teacher = mongoose.model('teacherSchema');

    var sampleFile = req.files.file,
        fileNameFull = sampleFile.name,
        fileName = fileNameFull.replace(/\..+$/, ''), //trimming extensions
        filePath = 'saved\\' + fileNameFull;

    //moving shit
    sampleFile.mv(filePath, function(err) {
        if (err)
            return res.status(500).send(err);

        var newFile = new file({
            fileName: fileName,
            fileNameFull: fileNameFull,
            filePath: filePath

    });

        newFile.save(function(err, file) {
            if (err) res.send(err);

            // res.json(file);
        });
    });

    var newTeacher = new teacher({
        fullName:req.body.fullName,
        // group:req.body.group,
        photo:fileNameFull,
        email:req.body.email,
        birthDay:req.body.birthDay
    });

    newTeacher.save(function(err, teach) {
        if (err) res.send(err);
        console.log(teach);
        res.redirect("/");
    });

});

app.post('/api/groups/create', function(req, res) {
    var mongoose = require('mongoose'),
        group = mongoose.model('groupSchema');




    var newGroup = new group({
        groupName:req.body.groupName,
        files:req.body.files,
        teacher:req.body.teachers,
        notes:req.body.notes
    });

    console.log(newGroup);

    newGroup.save(function(err, file) {
        if (err) res.send(err);
        res.redirect("/");
    });

});



// app.get('/api/files/create', function(req, res){
//     res.sendFile('E:\\New folder\\RESTfirst-master\\RESTfirst-master\\public\\files_creator.html');
// });
//
// app.get('/api/events/create', function(req, res){
//     res.sendFile('E:\\New folder\\RESTfirst-master\\RESTfirst-master\\public\\events_creator.html');
// });
//
// app.get('/api/teachers/create', function(req, res){
//     res.sendFile('E:\\New folder\\RESTfirst-master\\RESTfirst-master\\public\\teacher_creator.html');
// });




app.post('/api/download/:fileName', function(req, res) {
    if (fs.existsSync('saved//' + req.params.fileName)){
        // console.log(req.params.fileName);
        res.sendfile('saved//' + req.params.fileName);
    }else{
        res.send('{message: no file}');
    }

});

app.get('/api/download/:fileName', function(req, res) {
    if (fs.existsSync('saved//' + req.params.fileName)){
        // console.log(req.params.fileName);
        res.download('saved//' + req.params.fileName);
    }else{
        res.send('{message: no file}');
    }
});

app.get('/api/view/:fileName', function(req, res) {
    if (fs.existsSync('saved//' + req.params.fileName)){
        // console.log(req.params.fileName);
        res.sendfile('saved//' + req.params.fileName);
    }else{
        res.send('{message: no file}');
    }
});

// app.post('/events', function(req, res) {
//     if (!req.files)
//         return res.status(400).send('No files were uploaded.');
//
//
//     var mongoose = require('mongoose'),
//         file = mongoose.model('fileSchema');
//
//         // console.log(req.files.photo[0]);
//         // console.log(req.files.photo[1]);
//         for(var x = 0; x <=req.files.photo-1; x++){
//             console.log(req.files.photo[x])
//         }
//     // for(var i = 0; i <= req.files - 1; i++) {
//     //     var f = req.files.photo[0];
//     //     console.log(f);
//     // }
//         // console.log(f.filePath);
//         // if (!fs.existsSync(f.filePath)) {
//         //     file.remove({
//         //         fileName: f.fileName
//         //     }, function (err, fil) {
//         //         if (err) res.send(err);
//         //
//         //     });
//         // }
//     // }
//   //   var sampleFile = req.files.file,
//   //       fileNameFull = sampleFile.name,
//   //       fileName = fileNameFull.replace(/\..+$/, ''), //trimming extensions
//   //       filePath = 'saved\\' + fileNameFull,
//   //       fileDescription = req.body.fileDescription;
//   //
//   // //moving shit
//   //   sampleFile.mv(filePath, function(err) {
//   //       if (err)
//   //           return res.status(500).send(err);
//   //
//   //       var newFile = new file({
//   //           fileName: fileName,
//   //           fileNameFull: fileNameFull,
//   //           filePath: filePath,
//   //           fileDescription: fileDescription
//   //       });
//   //
//   //       newFile.save(function(err, file) {
//   //           if (err) res.send(err);
//   //           res.send( file.fileName + ' was uploaded!');
//   //           // res.json(file);
//   //       });
//   //
//   //
//
//     // });
// });


app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});



app.listen(port);


console.log('RESTfull API server started on: ' + port);
