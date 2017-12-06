'use strict';
module.exports = function(app) {
    var schReload = require('../controllers/schReloadController.js');

    //API
    app.set('view engine', 'ejs');
    app.route('/api/files/find/:fileName')
        .get(schReload.find_a_file)
        .post(schReload.find_a_file);

    // app.route('api/photos/:photoName')

    // app.route('/api/teachers/find/:teacherId')
    //     .get(schReload.find_a_teacher_api)
    //     .post(schReload.find_a_teacher_api);

    // app.route('/api/groups/find/:groupName')
    //     .get(schReload.find_a_group_api)
    //     .post(schReload.find_a_group_api)
    //     .put(schReload.update_a_day)
    //     .delete(schReload.delete_a_day);

    app.route('/api/files')
        .get(schReload.list_all_files_api)
        .post(schReload.list_all_files_api);

    app.route('/api/groups')
        .get(schReload.list_all_groups_api)
        .post(schReload.list_all_groups_api);

    app.route('/api/teachers')
        .get(schReload.list_all_teachers_api)
        .post(schReload.list_all_teachers_api);

    app.route('/api/events')
        .get(schReload.list_all_events_api)
        .post(schReload.list_all_events_api);
    //NON API


    app.route('/days')
        .get(schReload.list_all_days_api)
        .post(schReload.create_a_day);

    app.route('/files')
        .delete(schReload.delete_a_file);
        // .post(schReload.create_a_file);



    app.route('/test')
        .get(schReload.find_a_group_api_1401)
        .post(schReload.find_a_group_api_1401)
        .put(schReload.update_a_day)
        .delete(schReload.delete_a_day);

    app.route('/days/:dayId')
        .get(schReload.find_a_day)
        .put(schReload.update_a_day)
        .delete(schReload.delete_a_day);


    // app.route('/groups/:groupName')
    //     .get(schReload.find_a_group)
    //     .put(schReload.update_a_day)
    //     .delete(schReload.delete_a_day);

// TEST

    app.route('/api/teachers/create')
        .get(schReload.teacher_creation);

    app.route('/api/events/create')
        .get(schReload.event_creation);

    app.route('/api/files/create')
        .get(schReload.file_creation);

    app.route('/api/groups/create')
        .get(schReload.group_creation);

    app.route('/groups/:groupName')
        .get(schReload.show_single_group)
        .post(schReload.show_single_group);

    app.route('/teachers/:id')
        .get(schReload.show_single_teacher);

    app.route('/groups')
        .get(schReload.list_all_groups);

    app.route('/teachers')
        .get(schReload.list_all_teachers);

    app.route('/events')
        .get(schReload.list_all_events);

    app.route('/files')
        .get(schReload.list_all_files);
};
