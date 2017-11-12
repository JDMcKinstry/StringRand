# StringRand
Adds method to String Object that makes getting a Random String a Breeze!


#### TODO: Update this with more info

##### See also: http://spyk3lc.blogspot.com/2016/02/epic-random-string-generator-9001-its.html


###### Examples 

```javascript
randomString();	//	"9zu93KX9r70x{1yE"
randomString(5);	//	"Zm5'H"
randomString(5, { upper: false, numbers: false, symbols: false });	//	"yxhwr"
randomString(5, { lower: false, numbers: false, symbols: false });	//	"LMHHP"
randomString(5, { upper: false, lower: false, symbols: false });	//	"87989"
randomString(5, { upper: false, lower: false, numbers: false });	//	"/~_+$"
randomString('Custom STRING');	//	"TRo SuINsCtmG"
randomString(10, '01');	//	"0000100101"
```
