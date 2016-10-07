var _ = require('underscore');

var arr =[1,false,2,'',null,[[[5]]] ,[[6],0]]
arr = _.compact([1,false,2,'',null,5 ,6,0]);
console.log(arr);
arr1 =[1,2,[[3]],4,5,[6,[7,[8]]]];
arr1 = _.flatten(arr1);
console.log(arr1);
var each = _.each([1, 2, 3], function(num){
	return num;

});
console.log(each);
var sum = _.reduce([1,22,4], function(memo, num){ return memo + num; }, 0);

console.log(sum);
var list = [[0, 1], [1,2],[9,0], [4, 5]];
var flat = _.reduceRight(list, function(a, b) { return a.concat(b); }, []);
console.log(flat);
var even = _.find([1, 3, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
console.log(even);


array = [{title: "Cymbeline", author: "Shakespeare", year: 1611},
    {title: "The Tempest", author: "Shakespeare", year: 1611} ,
    {title: "Cymbeline", author: "Shakeswell", year: 1611},
    {title: "The Tempest", author: "Shakespeare", year: 1623}]

array = _.where(array, {author: "Shakespeare", year: 1611});
console.log("result :" ,array);

var even = _.reject([13,2, 3, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
console.log(even);
even = _.some([null, 0, false]);
console.log(even);
even = _.some([null, 0,1, false]);
console.log(even);
even = _.contains([1, 2, 3], 3,2);
console.log("contains :",even);
even = _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
console.log(even);
even = _.invoke( [_.flatten([[5, 1, 7], [3, 2, 0]])], 'sort');
console.log("flatten_invoke :",even);
var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
even = _.pluck(stooges, 'name');
console.log("pluck :",even);
even = _.max(stooges, function(stooge){ return stooge.age; });
console.log("max :",even);
