var mapreduce = require('mapred')(); // Leave blank for max performance 


//el mapReduce va a funcionar de la siguiente forma

//0. Sacar el tamanio de la tabla records
//0.1. Partirlo en partes de 50.
//0.2 sacar los datos y meterlos en un objeto como information. Imagino que es un keyValue
//2. hacer Map, sumando las repeticiones
//3. Hacer Reduce juntando los resultados
 
// Information to process ===================================================== 





module.exports  = {


    // Main function

    getMostFrequentSensor: function (){

        var informationSensors = [
            ['paq1', '2 3 1 3 2 5 4 3 2 1 1 1 1 2 3 2 2 1 1 3 4'],
            ['paq2', '2 3 1 4 3 1 4 3 2 1 3 5 1 2 3 2 3 1 1 3 2'],
            ['paq3', '2 3 1 3 2 5 4 3 2 2 3 1 4 3 1 4 3 1 1 3 4'],
            ['paq4', '1 4 3 1 1 3 4 3 2 2 3 1 4 3 1 4 3 1 1 3 4'],
            ['paq5', '1 1 3 4 3 2 2 3 1 3 5 1 2 3 2 4 3 1 2 2 3']
        ];

        var map = function(key, value) {
        console.log('value is ' + value);
        var list = [], aux = {};
        value = value.split(' ');
        value.forEach(function(w){
            aux[w] = (aux[w] || 0) + 1;
        });
        for(var k in aux){
            list.push([k, aux[k]]);
        }
        return list;
        };

        var reduce = function(key, values){
            var sum = 0;
            values.forEach(function(e){
                sum += e;
            });
            return sum;
        };


        // MapReduce call ============================================================= 

        mapreduce(informationSensors, map, reduce, function(result){
            console.log(result);
            return result;
        });
    }

};




 




 
 
