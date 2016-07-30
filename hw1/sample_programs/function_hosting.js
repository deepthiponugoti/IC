func1();
func2();
function func1() {
	console.log("function1 hoisted");
}
var func2 = function(){
	console.log("function2 hoisted");
}
