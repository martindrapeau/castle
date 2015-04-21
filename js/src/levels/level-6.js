(function() {
	window._levels || (window._levels = []);
	var sprites = [{"name":"f-ground2","state":"idle","x":0,"y":1216},{"name":"f-ground2","state":"idle","x":0,"y":1152},{"name":"f-ground2","state":"idle","x":0,"y":1088},{"name":"f-ground2","state":"idle","x":64,"y":1088},{"name":"f-ground2","state":"idle","x":64,"y":1152},{"name":"f-ground2","state":"idle","x":64,"y":1216},{"name":"f-grass2","state":"idle","x":0,"y":1024},{"name":"f-grass2","state":"idle","x":64,"y":1024},{"name":"f-grass2","state":"idle","x":128,"y":1024},{"name":"f-ground2","state":"idle","x":128,"y":1088},{"name":"f-ground2","state":"idle","x":128,"y":1152},{"name":"f-ground2","state":"idle","x":128,"y":1216},{"name":"f-ground2","state":"idle","x":192,"y":1216},{"name":"f-ground2","state":"idle","x":192,"y":1152},{"name":"f-ground2","state":"idle","x":256,"y":1088},{"name":"f-ground2","state":"idle","x":192,"y":1088},{"name":"f-ground2","state":"idle","x":320,"y":1088},{"name":"f-ground2","state":"idle","x":256,"y":1216},{"name":"f-ground2","state":"idle","x":256,"y":1152},{"name":"f-ground2","state":"idle","x":320,"y":1152},{"name":"f-ground2","state":"idle","x":320,"y":1216},{"name":"f-ground2","state":"idle","x":384,"y":1216},{"name":"f-ground2","state":"idle","x":384,"y":1152},{"name":"f-ground2","state":"idle","x":384,"y":1088},{"name":"f-ground2","state":"idle","x":448,"y":1088},{"name":"f-ground2","state":"idle","x":448,"y":1152},{"name":"f-ground2","state":"idle","x":448,"y":1216},{"name":"f-ground2","state":"idle","x":512,"y":1216},{"name":"f-ground2","state":"idle","x":512,"y":1152},{"name":"f-ground2","state":"idle","x":576,"y":1152},{"name":"f-ground2","state":"idle","x":512,"y":1088},{"name":"f-ground2","state":"idle","x":576,"y":1088},{"name":"f-ground2","state":"idle","x":576,"y":1216},{"name":"f-ground2","state":"idle","x":640,"y":1216},{"name":"f-ground2","state":"idle","x":640,"y":1152},{"name":"f-ground2","state":"idle","x":640,"y":1088},{"name":"f-ground2","state":"idle","x":704,"y":1088},{"name":"f-ground2","state":"idle","x":704,"y":1152},{"name":"f-ground2","state":"idle","x":704,"y":1216},{"name":"f-grass3","state":"idle","x":768,"y":1024},{"name":"f-water2","state":"idle","x":832,"y":1216},{"name":"f-ground2","state":"idle","x":768,"y":1216},{"name":"f-grass2","state":"idle","x":704,"y":1024},{"name":"f-grass2","state":"idle","x":640,"y":1024},{"name":"f-grass2","state":"idle","x":576,"y":1024},{"name":"f-grass2","state":"idle","x":512,"y":1024},{"name":"f-grass2","state":"idle","x":448,"y":1024},{"name":"f-grass2","state":"idle","x":384,"y":1024},{"name":"f-grass2","state":"idle","x":320,"y":1024},{"name":"f-grass2","state":"idle","x":256,"y":1024},{"name":"f-grass2","state":"idle","x":192,"y":1024},{"name":"f-water2","state":"idle","x":896,"y":1216},{"name":"f-water2","state":"idle","x":960,"y":1216},{"name":"f-water2","state":"idle","x":1216,"y":1216},{"name":"f-water2","state":"idle","x":1280,"y":1216},{"name":"f-water","state":"idle","x":960,"y":1152},{"name":"f-water","state":"idle","x":896,"y":1152},{"name":"f-water","state":"idle","x":832,"y":1152},{"name":"f-ground8","state":"idle","x":768,"y":1152},{"name":"f-ground3","state":"idle","x":768,"y":1088},{"name":"f-water","state":"idle","x":1216,"y":1152},{"name":"f-water","state":"idle","x":1280,"y":1152},{"name":"f-water","state":"idle","x":1344,"y":1152},{"name":"f-water","state":"idle","x":1408,"y":1152},{"name":"f-water","state":"idle","x":1472,"y":1152},{"name":"f-water2","state":"idle","x":1344,"y":1216},{"name":"f-water2","state":"idle","x":1408,"y":1216},{"name":"f-water2","state":"idle","x":1472,"y":1216},{"name":"f-grass1","state":"idle","x":1600,"y":1088},{"name":"f-ground7","state":"idle","x":1600,"y":1152},{"name":"f-grass2","state":"idle","x":1664,"y":1088},{"name":"f-grass2","state":"idle","x":1728,"y":1088},{"name":"f-grass3","state":"idle","x":1792,"y":1088},{"name":"f-ground8","state":"idle","x":1792,"y":1152},{"name":"f-ground2","state":"idle","x":1664,"y":1152},{"name":"f-ground2","state":"idle","x":1728,"y":1152},{"name":"f-ground2","state":"idle","x":1600,"y":1216},{"name":"f-ground2","state":"idle","x":1664,"y":1216},{"name":"f-ground2","state":"idle","x":1792,"y":1216},{"name":"f-ground2","state":"idle","x":1728,"y":1216},{"name":"f-water2","state":"idle","x":1536,"y":1216},{"name":"f-water","state":"idle","x":1536,"y":1152},{"name":"f-water","state":"idle","x":1856,"y":1152},{"name":"f-water","state":"idle","x":1920,"y":1152},{"name":"f-water","state":"idle","x":1984,"y":1152},{"name":"f-water","state":"idle","x":2048,"y":1152},{"name":"f-water","state":"idle","x":2176,"y":1152},{"name":"f-water","state":"idle","x":2112,"y":1152},{"name":"f-water2","state":"idle","x":1856,"y":1216},{"name":"f-water2","state":"idle","x":1920,"y":1216},{"name":"f-water2","state":"idle","x":1984,"y":1216},{"name":"f-water2","state":"idle","x":2048,"y":1216},{"name":"f-water2","state":"idle","x":2112,"y":1216},{"name":"f-water2","state":"idle","x":2176,"y":1216},{"name":"f-water2","state":"idle","x":2240,"y":1216},{"name":"f-water2","state":"idle","x":2304,"y":1216},{"name":"f-water2","state":"idle","x":2432,"y":1216},{"name":"f-water2","state":"idle","x":2368,"y":1216},{"name":"f-water2","state":"idle","x":2496,"y":1216},{"name":"f-water2","state":"idle","x":2560,"y":1216},{"name":"f-water2","state":"idle","x":2624,"y":1216},{"name":"f-water2","state":"idle","x":2688,"y":1216},{"name":"f-water2","state":"idle","x":2752,"y":1216},{"name":"f-water2","state":"idle","x":2816,"y":1216},{"name":"f-water2","state":"idle","x":2880,"y":1216},{"name":"f-water2","state":"idle","x":3008,"y":1216},{"name":"f-water2","state":"idle","x":2944,"y":1216},{"name":"f-water2","state":"idle","x":3072,"y":1216},{"name":"f-water2","state":"idle","x":3136,"y":1216},{"name":"f-water2","state":"idle","x":3200,"y":1216},{"name":"f-water2","state":"idle","x":3264,"y":1216},{"name":"f-water2","state":"idle","x":3392,"y":1216},{"name":"f-water2","state":"idle","x":3328,"y":1216},{"name":"f-water2","state":"idle","x":3456,"y":1216},{"name":"f-water2","state":"idle","x":3520,"y":1216},{"name":"f-water2","state":"idle","x":3712,"y":1216},{"name":"f-water2","state":"idle","x":3648,"y":1216},{"name":"f-water2","state":"idle","x":3584,"y":1216},{"name":"f-water","state":"idle","x":3712,"y":1152},{"name":"f-water","state":"idle","x":3648,"y":1152},{"name":"f-water","state":"idle","x":3584,"y":1152},{"name":"f-water","state":"idle","x":3520,"y":1152},{"name":"f-water","state":"idle","x":3456,"y":1152},{"name":"f-water","state":"idle","x":3392,"y":1152},{"name":"f-water","state":"idle","x":3328,"y":1152},{"name":"f-water","state":"idle","x":3264,"y":1152},{"name":"f-water","state":"idle","x":3200,"y":1152},{"name":"f-water","state":"idle","x":3136,"y":1152},{"name":"f-water","state":"idle","x":3072,"y":1152},{"name":"f-water","state":"idle","x":3008,"y":1152},{"name":"f-water","state":"idle","x":2944,"y":1152},{"name":"f-water","state":"idle","x":2880,"y":1152},{"name":"f-water","state":"idle","x":2816,"y":1152},{"name":"f-water","state":"idle","x":2752,"y":1152},{"name":"f-water","state":"idle","x":2688,"y":1152},{"name":"f-water","state":"idle","x":2624,"y":1152},{"name":"f-water","state":"idle","x":2560,"y":1152},{"name":"f-water","state":"idle","x":2496,"y":1152},{"name":"f-water","state":"idle","x":2432,"y":1152},{"name":"f-water","state":"idle","x":2368,"y":1152},{"name":"f-water","state":"idle","x":2304,"y":1152},{"name":"f-water","state":"idle","x":2240,"y":1152},{"name":"f-water","state":"idle","x":4672,"y":1152},{"name":"f-water","state":"idle","x":4736,"y":1152},{"name":"f-water","state":"idle","x":4800,"y":1152},{"name":"f-water","state":"idle","x":4864,"y":1152},{"name":"f-water","state":"idle","x":4928,"y":1152},{"name":"f-water","state":"idle","x":4992,"y":1152},{"name":"f-water","state":"idle","x":5056,"y":1152},{"name":"f-grass1","state":"idle","x":3776,"y":1088},{"name":"f-grass2","state":"idle","x":3840,"y":1088},{"name":"f-grass2","state":"idle","x":3904,"y":1088},{"name":"f-grass2","state":"idle","x":3968,"y":1088},{"name":"f-grass2","state":"idle","x":4032,"y":1088},{"name":"f-grass2","state":"idle","x":4096,"y":1088},{"name":"f-grass2","state":"idle","x":4224,"y":1088},{"name":"f-grass2","state":"idle","x":4160,"y":1088},{"name":"f-grass2","state":"idle","x":4288,"y":1088},{"name":"f-ground7","state":"idle","x":3776,"y":1152},{"name":"f-ground2","state":"idle","x":3776,"y":1216},{"name":"f-ground2","state":"idle","x":3840,"y":1152},{"name":"f-ground2","state":"idle","x":3904,"y":1152},{"name":"f-ground2","state":"idle","x":3904,"y":1216},{"name":"f-ground2","state":"idle","x":3840,"y":1216},{"name":"f-ground2","state":"idle","x":3968,"y":1216},{"name":"f-ground2","state":"idle","x":3968,"y":1152},{"name":"f-ground2","state":"idle","x":4032,"y":1152},{"name":"f-ground2","state":"idle","x":4032,"y":1216},{"name":"f-ground2","state":"idle","x":4096,"y":1216},{"name":"f-ground2","state":"idle","x":4096,"y":1152},{"name":"f-ground2","state":"idle","x":4160,"y":1152},{"name":"f-ground2","state":"idle","x":4160,"y":1216},{"name":"f-ground2","state":"idle","x":4224,"y":1216},{"name":"f-ground2","state":"idle","x":4224,"y":1152},{"name":"f-ground2","state":"idle","x":4288,"y":1152},{"name":"f-ground2","state":"idle","x":4288,"y":1216},{"name":"f-ground2","state":"idle","x":4352,"y":1152},{"name":"f-ground2","state":"idle","x":4352,"y":1216},{"name":"f-ground2","state":"idle","x":4416,"y":1216},{"name":"f-ground2","state":"idle","x":4416,"y":1152},{"name":"f-ground2","state":"idle","x":4480,"y":1152},{"name":"f-ground2","state":"idle","x":4480,"y":1216},{"name":"f-ground2","state":"idle","x":4544,"y":1152},{"name":"f-ground2","state":"idle","x":4544,"y":1216},{"name":"f-ground2","state":"idle","x":4608,"y":1216},{"name":"f-grass3","state":"idle","x":4608,"y":1088},{"name":"f-ground8","state":"idle","x":4608,"y":1152},{"name":"f-grass2","state":"idle","x":4544,"y":1088},{"name":"f-grass2","state":"idle","x":4480,"y":1088},{"name":"f-grass2","state":"idle","x":4416,"y":1088},{"name":"f-grass2","state":"idle","x":4352,"y":1088},{"name":"f-water2","state":"idle","x":4672,"y":1216},{"name":"f-water2","state":"idle","x":4736,"y":1216},{"name":"f-water2","state":"idle","x":4800,"y":1216},{"name":"f-water2","state":"idle","x":4864,"y":1216},{"name":"f-water2","state":"idle","x":4928,"y":1216},{"name":"f-water2","state":"idle","x":4992,"y":1216},{"name":"f-water2","state":"idle","x":5056,"y":1216},{"name":"f-water2","state":"idle","x":5120,"y":1216},{"name":"f-water2","state":"idle","x":5184,"y":1216},{"name":"f-water2","state":"idle","x":5248,"y":1216},{"name":"f-water2","state":"idle","x":5312,"y":1216},{"name":"f-water2","state":"idle","x":5376,"y":1216},{"name":"f-water2","state":"idle","x":5440,"y":1216},{"name":"f-water2","state":"idle","x":5504,"y":1216},{"name":"f-water2","state":"idle","x":5568,"y":1216},{"name":"f-water2","state":"idle","x":5632,"y":1216},{"name":"f-water2","state":"idle","x":5696,"y":1216},{"name":"f-water2","state":"idle","x":5760,"y":1216},{"name":"f-water2","state":"idle","x":5824,"y":1216},{"name":"f-water2","state":"idle","x":5952,"y":1216},{"name":"f-water2","state":"idle","x":5888,"y":1216},{"name":"f-water2","state":"idle","x":6016,"y":1216},{"name":"f-water2","state":"idle","x":6144,"y":1216},{"name":"f-water2","state":"idle","x":6080,"y":1216},{"name":"f-water2","state":"idle","x":6208,"y":1216},{"name":"f-water2","state":"idle","x":6272,"y":1216},{"name":"f-water2","state":"idle","x":6336,"y":1216},{"name":"f-water2","state":"idle","x":6400,"y":1216},{"name":"f-water2","state":"idle","x":6464,"y":1216},{"name":"f-water2","state":"idle","x":6528,"y":1216},{"name":"f-water2","state":"idle","x":6592,"y":1216},{"name":"f-water2","state":"idle","x":6656,"y":1216},{"name":"f-water2","state":"idle","x":6720,"y":1216},{"name":"f-water2","state":"idle","x":6784,"y":1216},{"name":"f-water2","state":"idle","x":6848,"y":1216},{"name":"f-water2","state":"idle","x":6912,"y":1216},{"name":"f-water2","state":"idle","x":6976,"y":1216},{"name":"f-water2","state":"idle","x":7040,"y":1216},{"name":"f-grass1","state":"idle","x":7104,"y":1088},{"name":"f-grass2","state":"idle","x":7168,"y":1088},{"name":"f-grass2","state":"idle","x":7232,"y":1088},{"name":"f-grass2","state":"idle","x":7360,"y":1088},{"name":"f-grass2","state":"idle","x":7296,"y":1088},{"name":"f-grass2","state":"idle","x":7424,"y":1088},{"name":"f-grass2","state":"idle","x":7488,"y":1088},{"name":"f-grass2","state":"idle","x":7552,"y":1088},{"name":"f-grass2","state":"idle","x":7616,"y":1088},{"name":"f-ground2","state":"idle","x":7616,"y":1152},{"name":"f-ground2","state":"idle","x":7616,"y":1216},{"name":"f-ground2","state":"idle","x":7552,"y":1216},{"name":"f-ground2","state":"idle","x":7552,"y":1152},{"name":"f-ground2","state":"idle","x":7488,"y":1216},{"name":"f-ground2","state":"idle","x":7424,"y":1216},{"name":"f-ground2","state":"idle","x":7488,"y":1152},{"name":"f-ground2","state":"idle","x":7424,"y":1152},{"name":"f-ground2","state":"idle","x":7360,"y":1152},{"name":"f-ground2","state":"idle","x":7296,"y":1152},{"name":"f-ground2","state":"idle","x":7232,"y":1152},{"name":"f-ground2","state":"idle","x":7168,"y":1152},{"name":"f-ground2","state":"idle","x":7104,"y":1216},{"name":"f-ground2","state":"idle","x":7168,"y":1216},{"name":"f-ground2","state":"idle","x":7232,"y":1216},{"name":"f-ground2","state":"idle","x":7296,"y":1216},{"name":"f-ground2","state":"idle","x":7360,"y":1216},{"name":"f-ground7","state":"idle","x":7104,"y":1152},{"name":"f-water","state":"idle","x":7040,"y":1152},{"name":"f-water","state":"idle","x":6976,"y":1152},{"name":"f-water","state":"idle","x":6912,"y":1152},{"name":"f-water","state":"idle","x":6848,"y":1152},{"name":"f-water","state":"idle","x":6784,"y":1152},{"name":"f-water","state":"idle","x":6720,"y":1152},{"name":"f-water","state":"idle","x":6656,"y":1152},{"name":"f-water","state":"idle","x":6592,"y":1152},{"name":"f-water","state":"idle","x":6464,"y":1152},{"name":"f-water","state":"idle","x":6528,"y":1152},{"name":"f-water","state":"idle","x":6400,"y":1152},{"name":"f-water","state":"idle","x":6336,"y":1152},{"name":"f-water","state":"idle","x":6272,"y":1152},{"name":"f-water","state":"idle","x":6208,"y":1152},{"name":"f-water","state":"idle","x":6144,"y":1152},{"name":"f-water","state":"idle","x":6080,"y":1152},{"name":"f-water","state":"idle","x":6016,"y":1152},{"name":"f-water","state":"idle","x":5952,"y":1152},{"name":"f-water","state":"idle","x":5888,"y":1152},{"name":"f-water","state":"idle","x":5824,"y":1152},{"name":"f-water","state":"idle","x":5760,"y":1152},{"name":"f-water","state":"idle","x":5696,"y":1152},{"name":"f-water","state":"idle","x":5632,"y":1152},{"name":"f-water","state":"idle","x":5568,"y":1152},{"name":"f-water","state":"idle","x":5440,"y":1152},{"name":"f-water","state":"idle","x":5504,"y":1152},{"name":"f-water","state":"idle","x":5376,"y":1152},{"name":"f-water","state":"idle","x":5312,"y":1152},{"name":"f-water","state":"idle","x":5248,"y":1152},{"name":"f-water","state":"idle","x":5184,"y":1152},{"name":"f-water","state":"idle","x":5120,"y":1152},{"name":"f-sign2","state":"idle","x":7488,"y":1024},{"name":"f-bush1","state":"idle","x":7296,"y":1024},{"name":"f-bush2","state":"idle","x":7360,"y":1024},{"name":"f-bush2","state":"idle","x":4608,"y":1024},{"name":"f-bush1","state":"idle","x":4544,"y":1024},{"name":"f-bush2","state":"idle","x":3904,"y":1024},{"name":"f-bush1","state":"idle","x":3840,"y":1024},{"name":"f-sign1","state":"idle","x":3968,"y":1024},{"name":"f-sign1","state":"idle","x":64,"y":960},{"name":"f-bush1","state":"idle","x":384,"y":960},{"name":"f-bush2","state":"idle","x":448,"y":960},{"name":"h-2","state":"idle","x":4032,"y":704},{"name":"a-barrel-coin","state":"idle","x":4480,"y":1024},{"name":"a-barrel","state":"idle","x":7232,"y":1024},{"name":"a-barrel","state":"idle","x":576,"y":896},{"name":"a-barrel-coin","state":"idle","x":512,"y":960},{"name":"hero1","state":"idle-right","x":192,"y":900,"nextState":"idle-right","velocity":0,"acceleration":0,"yVelocity":0,"yAcceleration":0},{"name":"f-water2","state":"idle","x":1024,"y":1216},{"name":"f-water2","state":"idle","x":1088,"y":1216},{"name":"f-water2","state":"idle","x":1152,"y":1216},{"name":"f-water","state":"idle","x":1024,"y":1152},{"name":"f-water","state":"idle","x":1088,"y":1152},{"name":"f-water","state":"idle","x":1152,"y":1152},{"name":"bat","state":"fly-left","x":768,"y":448},{"name":"bat","state":"fly-left","x":1472,"y":448},{"name":"bat","state":"fly-left","x":2240,"y":448},{"name":"bat","state":"fly-left","x":2944,"y":448},{"name":"bat","state":"fly-left","x":3712,"y":448},{"name":"bat","state":"fly-left","x":4352,"y":448},{"name":"bat","state":"fly-left","x":5056,"y":448},{"name":"bat","state":"fly-left","x":5888,"y":448},{"name":"bat","state":"fly-left","x":6656,"y":448},{"name":"bat","state":"fly-left","x":7488,"y":448},{"name":"spider","state":"walk-left","x":3840,"y":1024},{"name":"spider","state":"walk-left","x":1728,"y":1024},{"name":"h-barge","state":"idle-right","x":832,"y":1088},{"name":"h-barge","state":"idle-right","x":1856,"y":1088},{"name":"h-barge","state":"idle-right","x":4672,"y":1088},{"name":"a-barrel-health","state":"idle","x":2048,"y":1044},{"name":"a-barrel-coin","state":"idle","x":1984,"y":1044},{"name":"a-barrel-coin","state":"idle","x":2048,"y":980},{"name":"a-barrel","state":"idle","x":1024,"y":1044},{"name":"a-barrel-death","state":"idle","x":960,"y":1044},{"name":"a-barrel-coin","state":"idle","x":1024,"y":980},{"name":"a-barrel-coin","state":"idle","x":576,"y":960},{"name":"a-barrel-spider","state":"idle","x":640,"y":960},{"name":"a-barrel-spider","state":"idle","x":4544,"y":1024},{"name":"a-barrel-coin","state":"idle","x":4480,"y":960},{"name":"a-barrel-death","state":"idle","x":4416,"y":1024},{"name":"a-hay-spider","state":"idle","x":4864,"y":1044},{"name":"a-hay","state":"idle","x":4864,"y":980},{"name":"a-hay-coin","state":"idle","x":4800,"y":1044},{"name":"bat","state":"fly-left","x":5504,"y":448}];
	window._levels.push({"tileWidth":64,"tileHeight":64,"width":120,"height":20,"backgroundImage":"#backgrounds","backgroundImageY":300,"backgroundImageHeight":480,"puzzle":false,"level":6,"time":0,"name":"Small Lake","x":0,"y":-580,"viewportTop":0,"viewportRight":0,"viewportLeft":0,"backgroundColor":"#070A0D","sprites":sprites,"state":"pause","viewportBottom":0});
}).call(this);