var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var mongoUser   =   require("./models/mongoUser");
var mongoTeam   =   require("./models/mongoTeam");
var mongoProfile=   require("./models/mongoProfile");
var mongoLeave  =   require("./models/mongoLeave");
// var mongouserSetting  = require("./models/mongouserSetting");
var router      =   express.Router();

var mongoose    =   require("mongoose");
mongoose.connect('mongodb://localhost:27017/demoDb');
//CORS middleware for expres...
app.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, sid");
 res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
 next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

router.get("/",function(req,res){
    res.json({"error" : false,"message" : "Hello World"});
});

router.route("/token")
    .get(function(req,res){
        var response = {};
        mongoUser.find({},function(err,data){
        // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"user" : data};
            }
            res.json(response);
        });
    })

    .post(function(req,res){
          var db = new mongoUser();
          var response = {};
          mongoUser.find({username:req.body.username,password:req.body.password },function(err,data){
            console.log('data',data[0]._id);
             if(err) {
                 response = err;
             }
              if(data.length){
                 response = { access_token: data[0]._id };
               }
             res.json(response);
          });
        });
        // .post(function(req,res){
        //       var db = new mongoUser();
        //       var response = {};
        //       mongoUser.find({username:req.body.username,password:req.body.password },function(err,data){
        //         console.log('data',data[0]._id);
        //          if(err) {
        //              response = err;
        //          }
        //           if(admin=="true"){
        //              response = { access_token: data[0]._id };
        //            }
        //          res.json(response);
        //       });
        //     });
    //   router.route("/token/:id")
    //   .get(function(req,res){
    //     var response = {};
    //     mongoUser.findById(req.params.id,function(err,data){
    //     // This will run Mongo Query to fetch data based on ID.
    //         if(err) {
    //             response = {"error" : true,"message" : "Error fetching data"};
    //         } else {
    //             response = {"error" : false,"message" : data};
    //         }
    //         res.json(response);
    //     });
    // })
  //   .put(function(req,res){
  //     var response = {};
  //     // first find out record exists or not
  //     // if it does then update the record
  //     mongoUser.findById(req.params.id,function(err,data){
  //         if(err) {
  //             response = {"error" : true,"message" : "Error fetching data"};
  //         } else {
  //           // console.log("vbfgvb", req.body);
  //         // we got data from Mongo.
  //         // change it accordingly.
  //             if(req.body.loginName !== undefined) {
  //                 // case where email needs to be updated.
  //                 data.login= req.body.loginName;
  //             }
  //             if(req.body.password !== undefined) {
  //                 // case where password needs to be updated
  //                 data.password = req.body.password;
  //             }
  //             // console.log(data, "data");
  //             // save the data
  //             data.save(function(err){
  //                 if(err) {
  //                     response = {"error" : true,"message" : "Error updating data"};
  //                 } else {
  //                     response = {"error" : false,"message" : "Data is updated for "+req.params.id};
  //                 }
  //                 res.json(response);
  //             })
  //         }
  //     });
  // })
      //
      //   .delete(function(req,res){
      //     var response = {};
      //     // find the data
      //     mongoUser.findById(req.params.id,function(err,data){
      //         if(err) {
      //             response = {"error" : true,"message" : "Error fetching data"};
      //         } else {
      //             // data exists, remove it.
      //             mongoUser.remove({_id : req.params.id},function(err){
      //                 if(err) {
      //                     response = {"error" : true,"message" : "Error deleting data"};
      //                 } else {
      //                     response = {"error" : true,"message" : "Data associated with "+req.params.id+"is deleted"};
      //                 }
      //                 res.json(response);
      //             });
      //         }
      //     });
      // })

      router.route("/teams")
        .get(function(req,res){
          var response={};
          mongoTeam.find({},function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"teams" : data};
            }
            res.json(response);
          });
        })

        .post(function(req,res){
              var db = new mongoTeam();
              var response = {};
              db.teamName = req.body.teamname;
              db.profiles = req.body.profiles;
              db.save(function(err){
                  if(err) {
                      response = {"error" : true,"message" : "Error adding data"};
                  } else {
                      response = {"message" : "Data added"};
                  }
                  res.json(response);
              });
          });

          router.route("/profiles")
            .get(function(req,res){
              var response={};
              mongoProfile.find({},function(err,data){
                if(err) {
                    response = {"error" : true,"message" : "Error fetching data"};
                } else {
                    response = {"profiles" : data};
                }
                res.json(response);
              });
            })

            .put(function(req,res){
                  var db = new mongoProfile();
                  var response = {};
                  db.firstname = req.body.firstname;
                  db.lastname = req.body.lastname;
                  db.email = req.body.email;
                  db.dob = req.body.dob;
                  db.job = req.body.job;
                  db.description = req.body.desc;
                  db.address = req.body.address;
                  db.save(function(err){
                      if(err) {
                          response = {"error" : true,"message" : "Error adding data"};
                      } else {
                          response = {"message" : "Data added"};
                      }
                      res.json(response);
                  });
              });

              router.route("/profiles/:id")
              .get(function(req,res){
                var response = {};
                mongoProfile.findById(req.params.id,function(err,data){
                // This will run Mongo Query to fetch data based on ID.
                    if(err) {
                        response = {"error" : true,"message" : "Error fetching data"};
                    } else {
                        response = {"profiles" : data};
                    }
                    res.json(response);
                });
            })
            router.route("/users")
                .get(function(req,res){
                    var response = {};
                    mongoUser.find({},function(err,data){
                        if(err) {
                            response = {"error" : true,"message" : "Error fetching data"};
                        } else {
                            response = {"users" : data};
                        }
                        res.json(response);
                    });
                })

                .post(function(req,res){
                      var db = new mongoUser();
                      var response = {};
                      db.firstname=req.body.firstname;
                      db.lastname=req.body.lastname;
                      db.email=req.body.email;
                      db.username=req.body.username;
                      db.admin = req.body.admin;
                      db.password=req.body.password;
                      db.save(function(err){
                          if(err) {
                              response = {"error" : true,"message" : "Error adding data"};
                          } else {
                              response = {"message" : "Data added"};
                          }
                          res.json(response);
                      });
                  });

            router.route("/users/:id")
                .get(function(req,res){
                var response={};
                mongoUser.findById(req.params.id,function(err,data){
                  if(err) {
                      response = {"error" : true,"message" : "Error fetching data"};
                  } else {
                      response = {"users" : data};
                  }
                  res.json(response);
                });
              })
              // .post(function(req,res){
              //       var db = new userDetails();
              //       var response = {};
              //       db.firstname = req.body.firstname;
              //       db.department = req.body.department;
              //       db.address = req.body.address;
              //       db.dob = req.body.dob;
              //       db.gender = req.body.gender;
              //       db.phoneNumber = req.body.phoneNumber;
              //       db.email = req.body.email;
              //       db.save(function(err){
              //           if(err) {
              //               response = {"error" : true,"message" : "Error adding data"};
              //           } else {
              //               response = {"message" : "Data added"};
              //           }
              //           res.json(response);
              //       });
              //   });
              .put(function(req,res){
                var response = {};
                mongoUser.findById(req.params.id,function(err,data){
                    if(err) {
                        response = {"error" : true,"message" : "Error fetching data"};
                    } else {

                         data.firstname= req.body.user.firstname||data.firstname;
                         data.department= req.body.user.department||data.department;
                         data.email=req.body.user.email||data.email;
                         data.dob= req.body.user.dob||data.dob;
                         data.gender= req.body.user.gender||data.gender;
                         data.job= req.body.user.job|| data.job;
                         data.address =  req.body.user.address || data.address;
                         data.phoneNumber =  req.body.user.phoneNumber || data.phoneNumber;

                    //  console.log('data',data,req.body.user.job);

                        data.save(function(err){
                            if(err) {
                                response = {"error" : true,"message" : "Error updating data"};
                            } else {
                                response = {"error" : false,"message" : "Data is updated for "+req.params.id};
                            }
                            res.json(response);
                        })
                    }
                });
            })

            router.route("/leavehistories")
              .get(function(req,res){
                    // console.log("sdsfsdf", req.query.userId);
                    var response = {};
                    mongoLeave.find({userId:req.query.userId},function(err,data){
                        if(err) {
                            response = {"error" : true,"message" : "Error fetching data"};
                        } else {
                            // console.log("data",data);
                            response = {"leavehistories":data};
                        }
                        res.json(response);
                    });
                })

                .post(function(req,res){

                      var db = new mongoLeave();
                      var response = {};
                      db.name = req.body.name;
                      db.department = req.body.department;
                      db.reason = req.body.reason;
                      db.date = req.body.date;
                      db.days = req.body.days;
                      db.userId = req.body.userId;
                      db.save(function(err){
                          if(err) {
                              response = {"error" : true,"message" : "Error adding data"};
                          } else {
                              response = {"message" : "Data added"};
                          }
                          res.json(response);
                      });
                  });
                  router.route("/leavehistories/:id")
                      .get(function(req,res){
                      var response={};
                      mongoLeave.find({userId:req.params.id},function(err,data){
                        if(err) {
                            response = {"error" : true,"message" : "Error fetching data"};
                        } else {
                          console.log(data, "gfgdf");
                            response = {"leavehistories" : data};
                        }
                        res.json(response);
                      });
                    })
                  //   router.route("/userSettings")
                  // .get(function(req,res){
                  //   var response={};
                  //   mongouserSetting.find({},function(err,data){
                  //     if(err) {
                  //         response = {"error" : true,"message" : "Error fetching data"};
                  //     } else {
                  //         response = {"userSettings" : data};
                  //     }
                  //     res.json(response);
                  //   });
                  // })
                  //       .post(function(req,res){
                  //
                  //             var db = new mongouserSetting();
                  //             var response = {};
                  //
                  //             db.save(function(err){
                  //                 if(err) {
                  //                     response = {"error" : true,"message" : "Error adding data"};
                  //                 } else {
                  //                     response = {"message" : "Data added"};
                  //                 }
                  //                 res.json(response);
                  //             });
                  //         });
                          // router.route("/leavemessages")
                          //     .get(function(req,res){
                          //         // console.log("sdsfsdf", req.query.userId);
                          //         var response = {};
                          //         // mongoLeave.find({textSearch:req.query},function(err,data){
                          //           console.log('asdfgh',req.query.textSearch);
                          //           var textSearch =req.query.textSearch;
                          //           console.log("dvf", textSearch);
                          //           if(req.query.textSearch){
                          //             //   mongoLeave.find({name:new RegExp(textSearch,'i')
                          //             // }).exec(function(err, collection) {
                          //             //     console.log('asd',collection);
                          //             //           res.send(collection);
                          //             //
                          //             //   })
                          //             var re = new RegExp(req.params.search, 'i');
                          //
                          //            mongoLeave.find([{ 'department':{ $regex: re }}]).exec(function(err, collection) {
                          //              console.log('cvb',collection);
                          //                res.json(collection);
                          //             });
                          //           } else{
                          //            mongoLeave.find({},function(err,data){
                          //                if(err) {
                          //                    response = {"error" : true,"message" : "Error fetching data"};
                          //                } else {
                          //                    // console.log("data",data);
                          //                    response = {"leavemessage":data};
                          //                }
                          //                res.json(response);
                          //            });
                          //          }
                          //         // });
                          //     })
                          router.route("/leavemessages")
                              .get(function(req,res){
                                if(typeof req.query.textSearch == "undefined"){
                                    var  searchCondition ={};
                                }else{
                                          var query = new RegExp(req.query.textSearch,'i');
                                          var terms = req.query.textSearch.split(" ");
                                          terms = terms.map(function(textSearch) {
                                          return new RegExp(textSearch, "i");
                                       });
                                      //  var searchCondition = {
                                      //   name: {
                                      //       $all: terms
                                      //   },
                                      //   days:{
                                      //       $all: terms
                                      //   }
                                      // };


                                          var searchCondition = {
                                                    $or: [{
                                                        name: {
                                                            $all: terms
                                                        }
                                                    }, {
                                                        days: {
                                                            $all: terms
                                                        }
                                                    },{
                                                        reason: {
                                                            $all: terms
                                                        }
                                                    }]
                                                };
                                            console.log('searchCondition',searchCondition);

                                }
                                     mongoLeave.find(searchCondition, function(err, search) {
                                       if (err)
                                         res.send(err);
                                         var SearchJson=[];
                                         search.forEach(function(leave){
                                            SearchJson.push({_id:leave._id, name:leave.name,approve:leave.approve, days:leave.days, reason:leave.reason});
                                         })
                                          response = {"leavemessages":SearchJson};
                                         console.log('SearchJson',response);
                                       res.json(response);
                                     });
                              })

                              .post(function(req,res){

                                    var db = new mongoLeave();
                                    var response = {};
                                    db.name = req.body.name;
                                    db.department = req.body.department;
                                    db.reason = req.body.reason;
                                    db.date = req.body.date;
                                    db.days = req.body.days;
                                    db.userId = req.body.userId;
                                    db.approve = req.body.approve;
                                    db.save(function(err){
                                        if(err) {
                                            response = {"error" : true,"message" : "Error adding data"};
                                        } else {
                                            response = {"message" : "Data added"};
                                        }
                                        res.json(response);
                                    });
                                });
                                router.route("/leavemessages/:id")
                                .get(function(req,res){
                                var response={};
                                mongoLeave.findById(req.params.id,function(err,data){
                                  if(err) {
                                      response = {"error" : true,"message" : "Error fetching data"};
                                  } else {
                                      response = {"leavemessage" : data};
                                  }
                                  res.json(response);
                                });
                             })
                              .put(function(req,res){
                                var response = {};
                                mongoLeave.findById(req.params.id,function(err,data){
                                    if(err) {
                                        response = {"error" : true,"message" : "Error fetching data"};
                                    } else {
                                         data.approve= req.body.reason||data.reason;
                                         data.approve= req.body.days||data.days;

                                         data.approve= req.body.date||data.date;
                                         data.approve= req.body.approve||data.approve;
                                         console.log('datassssssssssss',data,req.body.days);

                                        data.save(function(err){
                                            if(err) {
                                                response = {"error" : true,"message" : "Error updating data"};
                                            } else {
                                                response = {"message" : "Data is updated for "+req.params.id};
                                            }
                                            res.json(response);
                                        })
                                    }
                                });
                            })



app.use('/api',router);

app.listen(8000);
console.log("Listening to PORT 8000");
