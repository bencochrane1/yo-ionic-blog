"use strict";

angular.module('starter.services',[])

.factory('Blog',['$http','PARSE_CREDENTIALS',function ($http, PARSE_CREDENTIALS){
    return {
        getAll: function () {
            return $http.get('https://api.parse.com/1/classes/Blog',{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                }
            });
        },
        get: function (id) {
            return $http.get('https://api.parse.com/1/classes/Blog/'+id,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                }
            });
        },
        create: function (data) {
            return $http.post('https://api.parse.com/1/classes/Blog',data,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
        },
        edit: function (id, data){
            return $http.put('https://api.parse.com/1/classes/Blog/'+id,data,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
        },
        delete:function(id){
            return $http.delete('https://api.parse.com/1/classes/Blog/'+id,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
        }
    }
}])

.value('PARSE_CREDENTIALS',{
    APP_ID: 'DDdiHytqB0wH4cw8huPgxWukH47T6eoJHFkN7Rmm',
    REST_API_KEY:'p5dn7Zh39cSE9P6SqHnX7F2A4QR6fifGwMYQiy0b'
});
