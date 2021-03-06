Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound'
});

Router.route('/', function () {
    this.render('landingPageTemplate');
    }, {
        name: 'landingRoute'
    });
Router.route('/regapplicant', function () {
    this.render('NewApplicantTemplate');
    }, {
        name: 'Insertinapplicant',
      waitOn: function(){
        	return Meteor.subscribe("Insertinapplicant");
	}
        
    });
Router.route('/regemployer', function () {
    this.render('NewEmployerTemplate');
    }, {
        name: 'Insertinemployer',
      waitOn: function(){
        	return Meteor.subscribe("Insertinemployer");
	}
        
    });
Router.route('/loginemployer',function () {
    this.render('employerLoginTemplate');
    }, {
        name: 'employerLoginRoute',
        onBeforeAction: function(){
            if (Meteor.user()) {
                // User logged in... Move into landing...
                this.redirect('employerLandingRoute');
                this.stop();
            }
            else {
                this.next();
            }
        }
});
Router.route('/employer/landing',function(){
    this.render('employerLandingTemplate');
    },
    {
        name: 'employerLandingRoute',
        waitOn : function(){
            if (Meteor.user() && Roles.userIsInRole(Meteor.user(), ['employer']) ){
                return Meteor.subscribe('employerOffersListing');
            }
        }
    });
Router.route('/addemployeraccount/:employer',function(){
        this.render("addEmployerAccountTemplate",{data: {employerID: this.params.employer}});
    },
    {
        name: "addEmployerAccountRoute",
        waitOn: function(){
          //  if (Meteor.user() && Roles.userIsInRole(Meteor.user(),'patient'))
                return Meteor.subscribe("addEmployerDetails", this.params.employer);
        }
    }
    );
Router.route('/employer/profile', function () {
    this.render('employerProfileTemplate');
    }, {
        name: 'employerprofile',
       waitOn: function(){
		return Meteor.subscribe("employerprofile");
	}
    });












