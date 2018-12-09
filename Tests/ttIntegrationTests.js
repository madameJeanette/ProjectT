var should = require('should'),
    request =  require('supertest'),
    app = require('../app.js'),
    mongoose = require('mongoose'),
    Tarantula = mongoose.model('Tarantula'),
    agent = request.agent(app);

 describe('Tarantula CRUD Test', function(){
        it('Should allow a Tarantula to be posted and return a collected and _id', function(done){
            
            var tarantulaPost = {name: 'new spooder', latinName: 'very scientific sounding name', habitat:'tree dweller'};

            agent.post('/api/tarantulas')
            .send(tarantulaPost)
            .expect(200)
            .end(function(err, results){
               // results.body.collected.should.equal(false);
                results.body.should.have.property('_id');
                done()
            })

        })
        afterEach(function(done){
            Tarantula.remove().exec();
            done();
        })
            
    })
