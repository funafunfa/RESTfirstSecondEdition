'use strict';

var mongoose = require('mongoose'),
    day = mongoose.model('daySchema'),
    file = mongoose.model('fileSchema'),
    teacher = mongoose.model('teacherSchema'),
    lesson = mongoose.model('lessonSchema'),
    week = mongoose.model('weekSchema'),
    group = mongoose.model('groupSchema'),
    event = mongoose.model('eventSchema');
var fs = require("fs");
var Log = require('log')
    , log = new Log('info');
var path = require('path');



//List


exports.list_all_weeks = function(req, res) {
    week.find({}, function(err, week) {
        if (err)
            res.send(err);
        res.json(week);
    });
};

//Find
exports.find_a_day = function(req, res) {
    day.findById(req.params.dayId, function(err, day) {
        if (err)
            res.send(err);
        res.json(day);
    });
};

exports.find_a_group = function(req, res) {

    group.findOne({ 'groupName': req.params.groupName }, function (err, group) {
        if (err){
            res.send(err);
        }
        res.render('groupScheduleNames.ejs', { group: group });
    });

};

exports.find_a_teacher = function(req, res) {
    // group.findOne(req.params.groupName, function(err, group) {
    //     if (err){
    //         res.send(err);
    //     }
    //     // res.render('groupScheduleNames.ejs', { group: group });
    //     res.send(group);
    // });

    group.findOne({ 'groupName': req.params.groupName }, function (err, group) {
        if (err){
            res.send(err);
        }
        res.render('groupScheduleNames.ejs', { group: group });
    });

};

exports.find_a_file = function (req, res) {
    file.findOne({ 'fileName': req.params.fileName }, function (err, file) {
        if (err){
            res.send(err);
        }
        res.send(file);
    });
};

//Update
exports.update_a_day = function(req, res) {
    day.findOneAndUpdate({_id: req.params.dayId}, req.body, {new: true}, function(err, day) {
        if (err)
            res.send(err);
        res.json(day);
    });
};


//Delete
exports.delete_a_day = function(req, res) {
    day.remove({
        _id: req.params.dayId
    }, function(err, day) {
        if (err)
            res.send(err);
        res.json({ message: 'day was successfully removed' });
    });
};

exports.delete_a_file = function(req, res) {
    file.remove({
        fileName: req.params.fileName
    }, function(err, file) {
        if (err)
            res.send(err);
        res.json({ message: 'file was successfully removed' });
    });
};

//Find API
exports.find_a_group_api = function(req, res) {

    group.findOne(req.params.groupId, function (err, group) {
        if (err){
            res.send(err);
        }
        res.send(group);
    });

};

exports.find_a_day_api = function(req, res) {
    day.findById(req.params.dayId, function(err, day) {
        if (err)
            res.send(err);
        res.json(day);
    });
};

exports.find_a_teacher_api = function(req, res) {
    teacher.findById(req.params.teacherId, function(err, teacher) {
        if (err)
            res.send(err);
        res.json(teacher);
    });
};

exports.find_a_file_api = function (req, res) {
    file.findById(req.params.fileId, function (err, file) {
        if (err){
            res.send(err);
        }
        res.send(file);
    });
};

//List API
exports.list_all_groups_api = function(req, res) {
    group.find({}, function(err, day) {
        if (err)
            res.send(err);
        res.json(day);
    });
};

exports.list_all_days_api = function(req, res) {
    day.find({}, function(err, day) {
        if (err)
            res.send(err);
        res.json(day);
    });
};

exports.list_all_files_api = function(req, res) {
    file.find({}, function(err, files) {
        if (err) res.send(err);

        for(var i = 0; i <= files.length - 1; i++) {
            var f = files[i];
            // console.log(f._id);
            console.log(f.filePath);
            if (!fs.existsSync(f.filePath)) {
                file.remove({
                    fileName: f.fileName
                }, function (err, fil) {
                    if (err) res.send(err);

                });
            }
        }
        file.find({}, function(err, files) {
            res.send(files);
        });
    })
};

exports.list_all_teachers_api = function(req, res) {
    teacher.find({}, function(err, teacher) {
        if (err)
            res.send(err);
        res.json(teacher);
    });
};

//Create
exports.create_a_day = function(req, res) {
    // var newDay = new day({
    //         dayName: req.body.dayName,
    //         lessons: {
    //             first: {
    //                 name: req.body.firstName,
    //                 teacher:req.body.firstTeacher,
    //                 auditory: req.body.firstAuditory,
    //                 notes: req.body.firstNotes
    //             },second: {
    //                 name: req.body.secondName,
    //                 teacher: req.body.secondTeacher,
    //                 auditory: req.body.secondAuditory,
    //                 notes: req.body.secondNotes
    //             },third: {
    //                 name: req.body.thirdName,
    //                 teacher: req.body.thirdTeacher,
    //                 auditory: req.body.thirdAuditory,
    //                 notes: req.body.thirdNotes
    //             },fourth: {
    //                 name: req.body.fourthName,
    //                 teacher: req.body.fourthTeacher,
    //                 auditory: req.body.fourthAuditory,
    //                 notes: req.body.fourthNotes
    //             },fifth: {
    //                 name: req.body.fifthName,
    //                 teacher: req.body.fifthTeacher,
    //                 auditory: req.body.fifthAuditory,
    //                 notes: req.body.fifthNotes
    //             },sixth: {
    //                 name: req.body.sixthName,
    //                 teacher: req.body.sixthTeacher,
    //                 auditory: req.body.sixthAuditory,
    //                 notes: req.body.sixthNotes
    //             },seventh: {
    //                 name: req.body.seventhName,
    //                 teacher: req.body.seventhTeacher,
    //                 auditory: req.body.seventhAuditory,
    //                 notes: req.body.seventhNotes
    //             },eights: {
    //                 name: req.body.eightsName,
    //                 teacher: req.body.eightsTeacher,
    //                 auditory: req.body.eightsAuditory,
    //                 notes: req.body.eightsNotes
    //             }
    //         }, info:{
    //             status: req.body.infoStatus,
    //             notes: req.body.infoNotes
    //         }
    //     });
    var newLessonOne = new lesson({
        name: req.body.firstName,
        teacher:req.body.firstTeacher,
        auditory: req.body.firstAuditory,
        notes: req.body.firstNotes
    });
    var newLessonTwo = new lesson({
        name: req.body.secondName,
        teacher: req.body.secondTeacher,
        auditory: req.body.secondAuditory,
        notes: req.body.secondNotes
    });
    var newLessonThree = new lesson({
        name: req.body.thirdName,
        teacher: req.body.thirdTeacher,
        auditory: req.body.thirdAuditory,
        notes: req.body.thirdNotes
    });
    var newLessonFour = new lesson({
        name: req.body.fourthName,
        teacher: req.body.fourthTeacher,
        auditory: req.body.fourthAuditory,
        notes: req.body.fourthNotes
    });
    var newLessonFive = new lesson({
        name: req.body.fifthName,
        teacher: req.body.fifthTeacher,
        auditory: req.body.fifthAuditory,
        notes: req.body.fifthNotes
    });
    var newLessonSix = new lesson({
        name: req.body.sixthName,
        teacher: req.body.sixthTeacher,
        auditory: req.body.sixthAuditory,
        notes: req.body.sixthNotes
    });


    var newDay = new day({
        dayName: req.body.dayName,
        lessons: [newLessonOne, newLessonTwo, newLessonThree, newLessonFour, newLessonFive, newLessonSix]
        , info:{
            status: req.body.infoStatus,
            notes: req.body.infoNotes
        }
    });
    newDay.save(function(err, day) {
        if (err)
            res.send(err);
        res.json(day);
    });
};

exports.create_a_week = function (req, res) {

    var weekOne = new week({
        week: [
            daySchema,
            daySchema,
            daySchema,
            daySchema,
            daySchema,
            daySchema
        ],
        info:{
            status: {
                type: String,
                enum: ['even', 'odd'],
                default: ['even']
            },
            notes: String
        },
        createdDate: {
            type: Date,
            default: Date.now
        }
    });
};

exports.create_a_group = function (req, res) {

    var firstDayOneLessonOne = new lesson({
        name: req.body.firstNameMonOne,
        teacher:req.body.firstTeacherMonOne,
        auditory: req.body.firstAuditoryMonOne,
        notes: req.body.firstNotesMonOne
    });
    var firstDayOneLessonTwo = new lesson({
        name: req.body.secondNameMonOne,
        teacher: req.body.secondTeacherMonOne,
        auditory: req.body.secondAuditoryMonOne,
        notes: req.body.secondNotesMonOne
    });
    var firstDayOneLessonThree = new lesson({
        name: req.body.thirdNameMonOne,
        teacher: req.body.thirdTeacherMonOne,
        auditory: req.body.thirdAuditoryMonOne,
        notes: req.body.thirdNotesMonOne
    });
    var firstDayOneLessonFour = new lesson({
        name: req.body.fourthNameMonOne,
        teacher: req.body.fourthTeacherMonOne,
        auditory: req.body.fourthAuditoryMonOne,
        notes: req.body.fourthNotesMonOne
    });
    var firstDayOneLessonFive = new lesson({
        name: req.body.fifthNameMonOne,
        teacher: req.body.fifthTeacherMonOne,
        auditory: req.body.fifthAuditoryMonOne,
        notes: req.body.fifthNotesMonOne
    });
    var firstDayOneLessonSix = new lesson({
        name: req.body.sixthNameMonOne,
        teacher: req.body.sixthTeacherMonOne,
        auditory: req.body.sixthAuditoryMonOne,
        notes: req.body.sixthNotesMonOne
    });

    var secondDayOneLessonOne = new lesson({
        name: req.body.firstNameTueOne,
        teacher: req.body.firstTeacherTueOne,
        auditory: req.body.firstAuditoryTueOne,
        notes: req.body.firstNotesTueOne
    });
    var secondDayOneLessonTwo = new lesson({
        name: req.body.secondNameTueOne,
        teacher: req.body.secondTeacherTueOne,
        auditory: req.body.secondAuditoryTueOne,
        notes: req.body.secondNotesTueOne
    });
    var secondDayOneLessonThree = new lesson({
        name: req.body.thirdNameTueOne,
        teacher: req.body.thirdTeacherTueOne,
        auditory: req.body.thirdAuditoryTueOne,
        notes: req.body.thirdNotesTueOne
    });
    var secondDayOneLessonFour = new lesson({
        name: req.body.fourthNameTueOne,
        teacher: req.body.fourthTeacherTueOne,
        auditory: req.body.fourthAuditoryTueOne,
        notes: req.body.fourthNotesTueOne
    });
    var secondDayOneLessonFive = new lesson({
        name: req.body.fifthNameTueOne,
        teacher: req.body.fifthTeacherTueOne,
        auditory: req.body.fifthAuditoryTueOne,
        notes: req.body.fifthNotesTueOne
    });
    var secondDayOneLessonSix = new lesson({
        name: req.body.sixthNameTueOne,
        teacher: req.body.sixthTeacherTueOne,
        auditory: req.body.sixthAuditoryTueOne,
        notes: req.body.sixthNotesTueOne
    });

    var thirdDayOneLessonOne = new lesson({
        name: req.body.firstNameWedOne,
        teacher: req.body.firstTeacherWedOne,
        auditory: req.body.firstAuditoryWedOne,
        notes: req.body.firstNotesWedOne
    });
    var thirdDayOneLessonTwo = new lesson({
        name: req.body.secondNameWedOne,
        teacher: req.body.secondTeacherWedOne,
        auditory: req.body.secondAuditoryWedOne,
        notes: req.body.secondNotesWedOne
    });
    var thirdDayOneLessonThree = new lesson({
        name: req.body.thirdNameWedOne,
        teacher: req.body.thirdTeacherWedOne,
        auditory: req.body.thirdAuditoryWedOne,
        notes: req.body.thirdNotesWedOne
    });
    var thirdDayOneLessonFour = new lesson({
        name: req.body.fourthNameWedOne,
        teacher: req.body.fourthTeacherWedOne,
        auditory: req.body.fourthAuditoryWedOne,
        notes: req.body.fourthNotesWedOne
    });
    var thirdDayOneLessonFive = new lesson({
        name: req.body.fifthNameWedOne,
        teacher: req.body.fifthTeacherWedOne,
        auditory: req.body.fifthAuditoryWedOne,
        notes: req.body.fifthNotesWedOne
    });
    var thirdDayOneLessonSix = new lesson({
        name: req.body.sixthNameWedOne,
        teacher: req.body.sixthTeacherWedOne,
        auditory: req.body.sixthAuditoryWedOne,
        notes: req.body.sixthNotesWedOne
    });

    var fourthDayOneLessonOne = new lesson({
        name: req.body.firstNameThuOne,
        teacher: req.body.firstTeacherThuOne,
        auditory: req.body.firstAuditoryThuOne,
        notes: req.body.firstNotesThuOne
    });
    var fourthDayOneLessonTwo = new lesson({
        name: req.body.secondNameThuOne,
        teacher: req.body.secondTeacherThuOne,
        auditory: req.body.secondAuditoryThuOne,
        notes: req.body.secondNotesThuOne
    });
    var fourthDayOneLessonThree = new lesson({
        name: req.body.thirdNameThuOne,
        teacher: req.body.thirdTeacherThuOne,
        auditory: req.body.thirdAuditoryThuOne,
        notes: req.body.thirdNotesThuOne
    });
    var fourthDayOneLessonFour = new lesson({
        name: req.body.fourthNameThuOne,
        teacher: req.body.fourthTeacherThuOne,
        auditory: req.body.fourthAuditoryThuOne,
        notes: req.body.fourthNotesThuOne
    });
    var fourthDayOneLessonFive = new lesson({
        name: req.body.fifthNameThuOne,
        teacher: req.body.fifthTeacherThuOne,
        auditory: req.body.fifthAuditoryThuOne,
        notes: req.body.fifthNotesThuOne
    });
    var fourthDayOneLessonSix = new lesson({
        name: req.body.sixthNameThuOne,
        teacher: req.body.sixthTeacherThuOne,
        auditory: req.body.sixthAuditoryThuOne,
        notes: req.body.sixthNotesThuOne
    });

    var fifthDayOneLessonOne = new lesson({
        name: req.body.firstNameFriOne,
        teacher:req.body.firstTeacherFriOne,
        auditory: req.body.firstAuditoryFriOne,
        notes: req.body.firstNotesFriOne
    });
    var fifthDayOneLessonTwo = new lesson({
        name: req.body.secondNameFriOne,
        teacher: req.body.secondTeacherFriOne,
        auditory: req.body.secondAuditoryFriOne,
        notes: req.body.secondNotesFriOne
    });
    var fifthDayOneLessonThree = new lesson({
        name: req.body.thirdNameFriOne,
        teacher: req.body.thirdTeacherFriOne,
        auditory: req.body.thirdAuditoryFriOne,
        notes: req.body.thirdNotesFriOne
    });
    var fifthDayOneLessonFour = new lesson({
        name: req.body.fourthNameFriOne,
        teacher: req.body.fourthTeacherFriOne,
        auditory: req.body.fourthAuditoryFriOne,
        notes: req.body.fourthNotesFriOne
    });
    var fifthDayOneLessonFive = new lesson({
        name: req.body.fifthNameFriOne,
        teacher: req.body.fifthTeacherFriOne,
        auditory: req.body.fifthAuditoryFriOne,
        notes: req.body.fifthNotesFriOne
    });
    var fifthDayOneLessonSix = new lesson({
        name: req.body.sixthNameFriOne,
        teacher: req.body.sixthTeacherFriOne,
        auditory: req.body.sixthAuditoryFriOne,
        notes: req.body.sixthNotesFriOne

    });

    var sixthDayOneLessonOne = new lesson({name: req.body.firstNameSatOne,
        teacher:req.body.firstTeacherSatOne,
        auditory: req.body.firstAuditorySatOne,
        notes: req.body.firstNotesSatOne

    });
    var sixthDayOneLessonTwo = new lesson({name: req.body.secondNameSatOne,
        teacher: req.body.secondTeacherSatOne,
        auditory: req.body.secondAuditorySatOne,
        notes: req.body.secondNotesSatOne

    });
    var sixthDayOneLessonThree = new lesson({name: req.body.thirdNameSatOne,
        teacher: req.body.thirdTeacherSatOne,
        auditory: req.body.thirdAuditorySatOne,
        notes: req.body.thirdNotesSatOne

    });
    var sixthDayOneLessonFour = new lesson({name: req.body.fourthNameSatOne,
        teacher: req.body.fourthTeacherSatOne,
        auditory: req.body.fourthAuditorySatOne,
        notes: req.body.fourthNotesSatOne

    });
    var sixthDayOneLessonFive = new lesson({name: req.body.fifthNameSatOne,
        teacher: req.body.fifthTeacherSatOne,
        auditory: req.body.fifthAuditorySatOne,
        notes: req.body.fifthNotesSatOne

    });
    var sixthDayOneLessonSix = new lesson({
        name: req.body.sixthNameSatOne,
        teacher: req.body.sixthTeacherSatOne,
        auditory: req.body.sixthAuditorySatOne,
        notes: req.body.sixthNotesSatOne
    });





    var firstDayTwoLessonOne = new lesson({
        name: req.body.firstNameMonTwo,
        teacher:req.body.firstTeacherMonTwo,
        auditory: req.body.firstAuditoryMonTwo,
        notes: req.body.firstNotesMonTwo
    });
    var firstDayTwoLessonTwo = new lesson({
        name: req.body.secondNameMonTwo,
        teacher: req.body.secondTeacherMonTwo,
        auditory: req.body.secondAuditoryMonTwo,
        notes: req.body.secondNotesMonTwo
    });
    var firstDayTwoLessonThree = new lesson({
        name: req.body.thirdNameMonTwo,
        teacher: req.body.thirdTeacherMonTwo,
        auditory: req.body.thirdAuditoryMonTwo,
        notes: req.body.thirdNotesMonTwo
    });
    var firstDayTwoLessonFour = new lesson({
        name: req.body.fourthNameMonTwo,
        teacher: req.body.fourthTeacherMonTwo,
        auditory: req.body.fourthAuditoryMonTwo,
        notes: req.body.fourthNotesMonTwo
    });
    var firstDayTwoLessonFive = new lesson({
        name: req.body.fifthNameMonTwo,
        teacher: req.body.fifthTeacherMonTwo,
        auditory: req.body.fifthAuditoryMonTwo,
        notes: req.body.fifthNotesMonTwo
    });
    var firstDayTwoLessonSix = new lesson({
        name: req.body.sixthNameMonTwo,
        teacher: req.body.sixthTeacherMonTwo,
        auditory: req.body.sixthAuditoryMonTwo,
        notes: req.body.sixthNotesMonTwo
    });

    var secondDayTwoLessonOne = new lesson({
        name: req.body.firstNameTueTwo,
        teacher:req.body.firstTeacherTueTwo,
        auditory: req.body.firstAuditoryTueTwo,
        notes: req.body.firstNotesTueTwo
    });
    var secondDayTwoLessonTwo = new lesson({
        name: req.body.secondNameTueTwo,
        teacher: req.body.secondTeacherTueTwo,
        auditory: req.body.secondAuditoryTueTwo,
        notes: req.body.secondNotesTueTwo
    });
    var secondDayTwoLessonThree = new lesson({
        name: req.body.thirdNameTueTwo,
        teacher: req.body.thirdTeacherTueTwo,
        auditory: req.body.thirdAuditoryTueTwo,
        notes: req.body.thirdNotesTueTwo
    });
    var secondDayTwoLessonFour = new lesson({
        name: req.body.fourthNameTueTwo,
        teacher: req.body.fourthTeacherTueTwo,
        auditory: req.body.fourthAuditoryTueTwo,
        notes: req.body.fourthNotesTueTwo
    });
    var secondDayTwoLessonFive = new lesson({
        name: req.body.fifthNameTueTwo,
        teacher: req.body.fifthTeacherTueTwo,
        auditory: req.body.fifthAuditoryTueTwo,
        notes: req.body.fifthNotesTueTwo
    });
    var secondDayTwoLessonSix = new lesson({
        name: req.body.sixthNameTueTwo,
        teacher: req.body.sixthTeacherTueTwo,
        auditory: req.body.sixthAuditoryTueTwo,
        notes: req.body.sixthNotesTueTwo
    });

    var thirdDayTwoLessonOne = new lesson({
        name: req.body.firstNameWedTwo,
        teacher:req.body.firstTeacherWedTwo,
        auditory: req.body.firstAuditoryWedTwo,
        notes: req.body.firstNotesWedTwo
    });
    var thirdDayTwoLessonTwo = new lesson({
        name: req.body.secondNameWedTwo,
        teacher: req.body.secondTeacherWedTwo,
        auditory: req.body.secondAuditoryWedTwo,
        notes: req.body.secondNotesWedTwo
    });
    var thirdDayTwoLessonThree = new lesson({
        name: req.body.thirdNameWedTwo,
        teacher: req.body.thirdTeacherWedTwo,
        auditory: req.body.thirdAuditoryWedTwo,
        notes: req.body.thirdNotesWedTwo
    });
    var thirdDayTwoLessonFour = new lesson({
        name: req.body.fourthNameWedTwo,
        teacher: req.body.fourthTeacherWedTwo,
        auditory: req.body.fourthAuditoryWedTwo,
        notes: req.body.fourthNotesWedTwo
    });
    var thirdDayTwoLessonFive = new lesson({
        name: req.body.fifthNameWedTwo,
        teacher: req.body.fifthTeacherWedTwo,
        auditory: req.body.fifthAuditoryWedTwo,
        notes: req.body.fifthNotesWedTwo
    });
    var thirdDayTwoLessonSix = new lesson({
        name: req.body.sixthNameWedTwo,
        teacher: req.body.sixthTeacherWedTwo,
        auditory: req.body.sixthAuditoryWedTwo,
        notes: req.body.sixthNotesWedTwo
    });

    var fourthDayTwoLessonOne = new lesson({
        name: req.body.firstNameThuTwo,
        teacher:req.body.firstTeacherThuTwo,
        auditory: req.body.firstAuditoryThuTwo,
        notes: req.body.firstNotesThuTwo
    });
    var fourthDayTwoLessonTwo = new lesson({
        name: req.body.secondNameTueTwo,
        teacher: req.body.secondTeacherTueTwo,
        auditory: req.body.secondAuditoryTueTwo,
        notes: req.body.secondNotesTueTwo
    });
    var fourthDayTwoLessonThree = new lesson({
        name: req.body.thirdNameTueTwo,
        teacher: req.body.thirdTeacherTueTwo,
        auditory: req.body.thirdAuditoryTueTwo,
        notes: req.body.thirdNotesTueTwo
    });
    var fourthDayTwoLessonFour = new lesson({
        name: req.body.fourthNameTueTwo,
        teacher: req.body.fourthTeacherTueTwo,
        auditory: req.body.fourthAuditoryTueTwo,
        notes: req.body.fourthNotesTueTwo
    });
    var fourthDayTwoLessonFive = new lesson({
        name: req.body.fifthNameTueTwo,
        teacher: req.body.fifthTeacherTueTwo,
        auditory: req.body.fifthAuditoryTueTwo,
        notes: req.body.fifthNotesTueTwo
    });
    var fourthDayTwoLessonSix = new lesson({
        name: req.body.sixthNameTueTwo,
        teacher: req.body.sixthTeacherTueTwo,
        auditory: req.body.sixthAuditoryTueTwo,
        notes: req.body.sixthNotesTueTwo
    });

    var fifthDayTwoLessonOne = new lesson({
        name: req.body.firstNameFriTwo,
        teacher:req.body.firstTeacherFriTwo,
        auditory: req.body.firstAuditoryFriTwo,
        notes: req.body.firstNotesFriTwo
    });
    var fifthDayTwoLessonTwo = new lesson({
        name: req.body.secondNameFriTwo,
        teacher: req.body.secondTeacherFriTwo,
        auditory: req.body.secondAuditoryFriTwo,
        notes: req.body.secondNotesFriTwo
    });
    var fifthDayTwoLessonThree = new lesson({
        name: req.body.thirdNameFriTwo,
        teacher: req.body.thirdTeacherFriTwo,
        auditory: req.body.thirdAuditoryFriTwo,
        notes: req.body.thirdNotesFriTwo
    });
    var fifthDayTwoLessonFour = new lesson({
        name: req.body.fourthNameFriTwo,
        teacher: req.body.fourthTeacherFriTwo,
        auditory: req.body.fourthAuditoryFriTwo,
        notes: req.body.fourthNotesFriTwo
    });
    var fifthDayTwoLessonFive = new lesson({
        name: req.body.fifthNameFriTwo,
        teacher: req.body.fifthTeacherFriTwo,
        auditory: req.body.fifthAuditoryFriTwo,
        notes: req.body.fifthNotesFriTwo
    });
    var fifthDayTwoLessonSix = new lesson({
        name: req.body.sixthNameFriTwo,
        teacher: req.body.sixthTeacherFriTwo,
        auditory: req.body.sixthAuditoryFriTwo,
        notes: req.body.sixthNotesFriTwo
    });

    var sixthDayTwoLessonOne = new lesson({
        name: req.body.firstNameSatTwo,
        teacher:req.body.firstTeacherSatTwo,
        auditory: req.body.firstAuditorySatTwo,
        notes: req.body.firstNotesSatTwo
    });
    var sixthDayTwoLessonTwo = new lesson({
        name: req.body.secondNameSatTwo,
        teacher: req.body.secondTeacherSatTwo,
        auditory: req.body.secondAuditorySatTwo,
        notes: req.body.secondNotesSatTwo
    });
    var sixthDayTwoLessonThree = new lesson({
        name: req.body.thirdNameSatTwo,
        teacher: req.body.thirdTeacherSatTwo,
        auditory: req.body.thirdAuditorySatTwo,
        notes: req.body.thirdNotesSatTwo
    });
    var sixthDayTwoLessonFour = new lesson({
        name: req.body.fourthNameSatTwo,
        teacher: req.body.fourthTeacherSatTwo,
        auditory: req.body.fourthAuditorySatTwo,
        notes: req.body.fourthNotesSatTwo
    });
    var sixthDayTwoLessonFive = new lesson({
        name: req.body.fifthNameSatTwo,
        teacher: req.body.fifthTeacherSatTwo,
        auditory: req.body.fifthAuditorySatTwo,
        notes: req.body.fifthNotesSatTwo
    });
    var sixthDayTwoLessonSix = new lesson({
        name: req.body.sixthNameSatTwo,
        teacher: req.body.sixthTeacherSatTwo,
        auditory: req.body.sixthAuditorySatTwo,
        notes: req.body.sixthNotesSatTwo
    });


    var firstDayOne = new day({
        dayName: "monday",
        lessons: [firstDayOneLessonOne, firstDayOneLessonTwo, firstDayOneLessonThree, firstDayOneLessonFour, firstDayOneLessonFive, firstDayOneLessonSix]
        , info:{
            notes: req.body.infoNotesMonOne
        }
    });
    var secondDayOne = new day({
        dayName: "tuesday",
        lessons: [secondDayOneLessonOne, secondDayOneLessonTwo, secondDayOneLessonThree, secondDayOneLessonFour, secondDayOneLessonFive, secondDayOneLessonSix],
        info:{
            notes: req.body.infoNotesTueOne
        }
    });
    var thirdDayOne = new day({
        dayName: "wednesday",
        lessons: [thirdDayOneLessonOne, thirdDayOneLessonTwo, thirdDayOneLessonThree, thirdDayOneLessonFour, thirdDayOneLessonFive, thirdDayOneLessonSix],
        info:{
            notes: req.body.infoNotesWedOne
        }
    });
    var fourthDayOne = new day({
        dayName: "thursday",
        lessons: [fourthDayOneLessonOne, fourthDayOneLessonTwo, fourthDayOneLessonThree, fourthDayOneLessonFour, fourthDayOneLessonFive, fourthDayOneLessonSix],

        info:{
            notes: req.body.infoNotesThuOne
        }
    });
    var fifthDayOne = new day({
        dayName: "friday",
        lessons: [fifthDayOneLessonOne, fifthDayOneLessonTwo, fifthDayOneLessonThree, fifthDayOneLessonFour, fifthDayOneLessonFive, fifthDayOneLessonSix],
        info:{
            notes: req.body.infoNotesFriOne
        }
    });
    var sixthDayOne = new day({
        dayName: "saturday",
        lessons: [sixthDayOneLessonOne, sixthDayOneLessonTwo, sixthDayOneLessonThree, sixthDayOneLessonFour, sixthDayOneLessonFive, sixthDayOneLessonSix],

        info:{
            notes: req.body.infoNotesSatOne
        }
    });

    var firstDayTwo = new day({
        dayName: "monday",
        lessons: [firstDayTwoLessonOne, firstDayTwoLessonTwo, firstDayTwoLessonThree, firstDayTwoLessonFour, firstDayTwoLessonFive, firstDayTwoLessonSix],

        info:{
            notes: req.body.infoNotesMonTwo
        }
    });
    var secondDayTwo = new day({
        dayName: "tuesday",
        lessons: [secondDayTwoLessonOne, secondDayTwoLessonTwo, secondDayTwoLessonThree, secondDayTwoLessonFour, secondDayTwoLessonFive, secondDayTwoLessonSix],

        info:{
            notes: req.body.infoNotesTueTwo
        }
    });
    var thirdDayTwo = new day({
        dayName: "wednesday",
        lessons: [thirdDayTwoLessonOne, thirdDayTwoLessonTwo, thirdDayTwoLessonThree, thirdDayTwoLessonFour, thirdDayTwoLessonFive, thirdDayTwoLessonSix],

        info:{
            notes: req.body.infoNotesWedTwo
        }
    });
    var fourthDayTwo = new day({
        dayName: "thursday",
        lessons: [fourthDayTwoLessonOne, fourthDayTwoLessonTwo, fourthDayTwoLessonThree, fourthDayTwoLessonFour, fourthDayTwoLessonFive, fourthDayTwoLessonSix],

        info:{
            notes: req.body.infoNotesThuTwo
        }
    });
    var fifthDayTwo = new day({
        dayName: "friday",
        lessons: [fifthDayTwoLessonOne, fifthDayTwoLessonTwo, fifthDayTwoLessonThree, fifthDayTwoLessonFour, fifthDayTwoLessonFive, fifthDayTwoLessonSix],

        info:{
            notes: req.body.infoNotesFriTwo
        }
    });
    var sixthDayTwo =    new day({
        dayName: "saturday",
        lessons: [sixthDayTwoLessonOne, sixthDayTwoLessonTwo, sixthDayTwoLessonThree, sixthDayTwoLessonFour, sixthDayTwoLessonFive, sixthDayTwoLessonSix],

        info:{
            notes: req.body.infoNotesSatTwo
        }
    });


    var weekOne = new week({
        week: [
            firstDayOne,
            secondDayOne,
            thirdDayOne,
            fourthDayOne,
            fifthDayOne,
            sixthDayOne
        ],
        info:{
            status: "even"
        }
    });
    var weekTwo = new week({
        week: [
            firstDayTwo,
            secondDayTwo,
            thirdDayTwo,
            fourthDayTwo,
            fifthDayTwo,
            sixthDayTwo
        ],
        info:{
            status: "odd"
        }
    });

    var groupNot = new group({
        groupName: req.body.nameGroup,
        evenWeek: weekOne,
        oddWeek: weekTwo,
        info:{
            notes: req.body.groupNotes
        }
    });

    groupNot.save(function(err, day) {
        if (err)
            res.send(err);
        res.json(day);
    });
};

// exports.create_a_file = function (req, res) {
//         if (!req.body.files)
//             return res.status(400).send('No files were uploaded.');
//
//         var sampleFile = req.param.files.file,
//             fileNameFull = sampleFile.name,
//             fileName = fileNameFull.replace(/\..+$/, ''), //trimming extensions
//             filePath = 'saved\\' + fileNameFull,
//             fileDescription = req.body.fileDescription;
//
//         //moving shit
//         sampleFile.mv(filePath, function(err) {
//             if (err)
//                 return res.status(500).send(err);
//
//             var newFile = new file({
//                 fileName: fileName,
//                 fileNameFull: fileNameFull,
//                 filePath: filePath,
//                 fileDescription: fileDescription
//             });
//
//             newFile.save(function(err, file) {
//                 if (err) res.send(err);
//                 res.send( file.fileName + ' was uploaded!');
//                 // res.json(file);
//             });
//
//
//
//         });
// };
//
exports.create_a_teacher = function (req, res) {
    var newTeacher = new teacher({
        fullName: req.body.fullName,
        group:req.body.group,
        teacherPlace:req.body.teacherPlace,
        email:req.body.email,
        birthDay:req.body.birthDay
    });

    newTeacher.save(function(err, teacher) {
        if (err)
            res.send(err);
        res.json(teacher);
    });
};

//Test

exports.find_a_group_api_1401 = function(req, res) {
    // group.findOne(req.params.groupName, function(err, group) {
    //     if (err){
    //         res.send(err);
    //     }
    //     // res.render('groupScheduleNames.ejs', { group: group });
    //     res.send(group);
    // });

    group.findOne({'groupName': "ПС-1401"}, function (err, group) {
        if (err) {
            res.send(err);
        }
        res.send(group);
        // res.render('groupScheduleNames.ejs', { group: group });
    });

};





exports.teacher_creation = function (req, res) {
    res.sendFile('E:\\New folder\\RESTfirst-master\\RESTfirst-master\\public\\teacher_creator.html');

};

exports.file_creation = function (req, res) {
    res.sendFile('E:\\New folder\\RESTfirst-master\\RESTfirst-master\\public\\file_creator.html');

};

exports.event_creation = function (req, res) {

    var mongoose = require('mongoose'),
        group = mongoose.model('groupSchema');
    var groups;
    group.find({}, function(err, group) {
        if (err)
            res.send(err);
        groups = group;
        res.render('event_creator', {groups: groups});
    });};
    // res.sendFile('E:\\New folder\\RESTfirst-master\\RESTfirst-master\\public\\event_creator.html');};

exports.group_creation = function (req, res) {
    var mongoose = require('mongoose'),
        teacher = mongoose.model('teacherSchema'),
        file = mongoose.model('fileSchema');
    var docs, teachs;
    teacher.find({}, function(err, teacher) {
        if (err)
            res.send(err);
        teachs = teacher;

        file.find({}, function(err, files) {
            if (err) res.send(err);

            for(var i = 0; i <= files.length - 1; i++) {
                var f = files[i];
                // console.log(f._id);
                // console.log(f.filePath);
                if (!fs.existsSync(f.filePath)) {
                    file.remove({
                        fileName: f.fileName
                    }, function (err, fil) {
                        if (err) res.send(err);

                    });
                }
            }
            file.find({}, function(err, files) {
                docs = files;

                res.render('group_creator', {docs : docs, teachs: teachs});
                // console.log("docs");
                // console.log(docs);
                // console.log("teachs");
                // console.log(teachs);
            });
        });
    });


};




exports.show_single_group = function (req, res) {
    var mongoose = require('mongoose'),
        group = mongoose.model('groupSchema'),
        event = mongoose.model('eventSchema'),
        file = mongoose.model('fileSchema');
    var ObjectId = require('mongodb').ObjectID;
    var my_group;
    var docs = [];
    group.find({groupName : req.params.groupName}, function(err, group) {
        if (err)
            res.send(err);
        my_group = group[0];
        // console.log(my_group);

        file.find({}, function(err, files) {
            if (err) res.send(err);

            for(var i = 0; i <= files.length - 1; i++) {
                var f = files[i];
                // console.log(f._id);
                // console.log(f.filePath);
                if (!fs.existsSync(f.filePath)) {
                    file.remove({
                        fileName: f.fileName
                    }, function (err, fil) {
                        if (err) res.send(err);

                    });
                }
            }
            for(var i = 0; i <= files.length - 1; i++) {
                var f = files[i];
                // console.log(f._id);
                // console.log(f.filePath);
                if (!fs.existsSync(f.filePath)) {
                    file.remove({
                        fileName: f.fileName
                    }, function (err, fil) {
                        if (err) res.send(err);

                    });
                }
            }
            var arr = [];
            for(var x = 0; x <= my_group.files.length - 1; x++) {
                var f = my_group.files[x];
            }
            var file_ids = my_group.files.map(function (item){ return ObjectId(item)});
            file.find({ "_id": { "$in": file_ids } },function(err, file) {
                var teachers_ids = my_group.teacher;
                // console.log(teachers_ids);
                teacher.find({ "_id": { "$in": teachers_ids } },function(err, teachers) {
                    // event.find({ "groups": { "$in": my_group._id } },function(err, events) {
                    //     console.log(events);
                    //     res.render('group_single', {docs : file, group: my_group, teachers: teachers, events: events});
                    // });

                    setTimeout(function(){
                        event.find({},function(err, events) {
                            var events_id = [];
                            // console.log(events);
                            for (var z = 0; z < events.length; z++){
                                for (var v = 0; v < events[z].groups.length; v++){
                                    // console.log(events[z].groups);
                                    if (events[z].groups[v]==my_group._id){
                                        events_id.push(events[z]);
                                    }
                                }
                            }
                            console.log(events_id);
                            res.render('group_single', {docs : file, group: my_group, teachers: teachers, even: events_id});
                        });
                    } ,10);

                });
                });


        });
    });


};

exports.show_single_teacher = function (req, res) {
    var mongoose = require('mongoose'),
        group = mongoose.model('groupSchema'),
        file = mongoose.model('fileSchema');
    var ObjectId = require('mongodb').ObjectID;
    var my_teacher;
    var docs = [];
    teacher.findOne({_id : req.params.id}, function(err, teacher) {
        if (err)
            res.send(err);
        my_teacher = teacher;
        console.log(my_teacher);
        // res.send(my_teacher);
        res.render('teacher_single', {teacher: my_teacher});
    });


};

exports.list_all_events_api = function(req, res) {
    event.find({}, function(err, event) {
        if (err)
            res.send(err);
        res.json(event);
    });
};

exports.list_all_groups = function(req, res) {
    group.find({}, function(err, group) {
        if (err)
            res.send(err);
        res.render("group_all", {group: group});
    });
};

exports.list_all_teachers = function(req, res) {
    teacher.find({}, function(err, teacher) {
        if (err)
            res.send(err);
        res.render("teacher_all", {teacher: teacher});
    });
};

exports.list_all_events = function(req, res) {
    event.find({}, function(err, event) {
        if (err)
            res.send(err);
        res.render("event_all", {even: event});
    });
};

exports.list_all_files = function(req, res) {
    file.find({}, function(err, doc) {
        if (err)
            res.send(err);
        res.render("files_all", {docs: doc});
    });
};