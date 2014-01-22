/*
 * Post routes
 *
 */

//
// GET /createpost
//
exports.createpost = function(req, res) {
    var nconf = require('nconf');

    var azAccountName = nconf.get('azAccountName'),
        azAccountKey = nconf.get('azAccountKey'),
        azure = require('azure'),
        AzureTableRepo = require('./../repositories/azureTableRepo.js');
    console.log(azAccountName);
    console.log(azAccountKey);

    var postRepo = new AzureTableRepo(azure.createTableService(azAccountName, azAccountKey), 'posts', 'BlogIqitDk');
    var post = {
        slug: 'test-post-01',
        title: 'This is my post',
        content: 'Go for it - 01',
        publishDate: new Date(2014, 01, 19)
    }
    postRepo.add(post, function(error) {
        console.log(error);
        res.render('createPost', { title: 'Created', post: post});    
    })
};

//
// GET /post/:id
//
exports.getpost = function(req, res) {
    var nconf = require('nconf');

    var azAccountName = nconf.get('azAccountName'),
        azAccountKey = nconf.get('azAccountKey'),
        azure = require('azure'),
        AzureTableRepo = require('./../repositories/azureTableRepo.js');

    var postRepo = new AzureTableRepo(azure.createTableService(azAccountName, azAccountKey), 'posts', 'BlogIqitDk');
    postRepo.get(req.params.id, function(post) {
        var viewModel = {
            id: req.params.id,
            post: post
        };
        console.log(post);
        res.render('post', { model: viewModel });
    });
}

//
// GET /posts
//
exports.getall = function(req, res) {
    var nconf = require('nconf');

    var azAccountName = nconf.get('azAccountName'),
        azAccountKey = nconf.get('azAccountKey'),
        azure = require('azure'),
        AzureTableRepo = require('./../repositories/azureTableRepo.js');

    var postRepo = new AzureTableRepo(azure.createTableService(azAccountName, azAccountKey), 'posts', 'BlogIqitDk');
    postRepo.getList(function(items) {
        console.log(items);
        var viewModel = {
            posts: items
        }
        res.render('posts', { model: viewModel });
    });
}