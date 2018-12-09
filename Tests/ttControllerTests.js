var should = require('should'),
sinon = require('sinon');

describe('Tarantula Conrtoller Teststs:', function(){
    describe('Post', function(){
        it('should not allow an empty name on Post', function(){
            var Tarantula = function(tarantula){this.save = function(){}};
        
            var req = {
                body: {
                    habitat: "terrestrial"  
                }
            }
           var res = {
               status: sinon.spy(),
               send:sinon.spy()
           }
           var ttController = require('../Controllers/ttController')(Tarantula);
           ttController.post(req,res);
           
           res.status.calledWith(400).should.equal(true, 'Bad status' + res.status.args[0][0]);
           res.send.calledWith('Name is required').should.equal(true);
        })
    })
})