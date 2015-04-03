(function() {
	window._levels || (window._levels = []);
	var sprites = [{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":0,"y":1024},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":0,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":64,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":128,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":192,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":256,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":320,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":384,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":448,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":64,"y":1024},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":128,"y":1024},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":192,"y":1024},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":256,"y":1024},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":320,"y":1024},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":384,"y":1024},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":448,"y":1024},{"name":"f-grass3","state":"idle","sequenceIndex":0,"x":512,"y":1024},{"name":"f-ground8","state":"idle","sequenceIndex":0,"x":512,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":576,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":640,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":704,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":768,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":832,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":896,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":960,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":1024,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":1088,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":1152,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":1216,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":1280,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":1344,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":1408,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":1472,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":1536,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":1600,"y":1088},{"name":"f-bush1","state":"idle","sequenceIndex":0,"x":640,"y":1024},{"name":"f-bush2","state":"idle","sequenceIndex":0,"x":704,"y":1024},{"name":"f-bush2","state":"idle","sequenceIndex":0,"x":0,"y":960},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":1664,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":1728,"y":1088},{"name":"f-stump2","state":"idle","sequenceIndex":0,"x":1344,"y":1024},{"name":"f-stump1","state":"idle","sequenceIndex":0,"x":1280,"y":1024},{"name":"f-ground1","state":"idle","sequenceIndex":0,"x":1792,"y":1024},{"name":"f-ground7","state":"idle","sequenceIndex":0,"x":1792,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1856,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1920,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1984,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2048,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2112,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1856,"y":1024},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1920,"y":1024},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1984,"y":1024},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2048,"y":1024},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2112,"y":1024},{"name":"f-grass1","state":"idle","sequenceIndex":0,"x":1792,"y":960},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":1856,"y":960},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":1920,"y":960},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":1984,"y":960},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":2048,"y":960},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2176,"y":1024},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2176,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2240,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2240,"y":1024},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2304,"y":1024},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2304,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2368,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2368,"y":1024},{"name":"f-grass1","state":"idle","sequenceIndex":0,"x":2112,"y":768},{"name":"f-ground1","state":"idle","sequenceIndex":0,"x":2112,"y":896},{"name":"f-ground1","state":"idle","sequenceIndex":0,"x":2112,"y":832},{"name":"f-ground7","state":"idle","sequenceIndex":0,"x":2112,"y":960},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2176,"y":960},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2176,"y":896},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2176,"y":832},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2240,"y":832},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2240,"y":896},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2240,"y":960},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2304,"y":960},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2368,"y":960},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2368,"y":896},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2304,"y":896},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2304,"y":832},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2368,"y":832},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":2176,"y":768},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":2240,"y":768},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":2304,"y":768},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":2368,"y":768},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":2432,"y":768},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":2496,"y":768},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":2560,"y":768},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":2624,"y":768},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":2688,"y":768},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":2752,"y":768},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2432,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2432,"y":1024},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2432,"y":960},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2432,"y":896},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2432,"y":832},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2496,"y":832},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2496,"y":896},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2496,"y":960},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2496,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2496,"y":1024},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2560,"y":1024},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2560,"y":960},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2560,"y":832},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2560,"y":896},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2624,"y":896},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2624,"y":832},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2688,"y":832},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2752,"y":832},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2752,"y":896},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2688,"y":896},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2624,"y":960},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2688,"y":960},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2752,"y":960},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2752,"y":1024},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2688,"y":1024},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2624,"y":1024},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2560,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2624,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2688,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2752,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2816,"y":832},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2816,"y":896},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2816,"y":1024},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2816,"y":960},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2816,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2880,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3008,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2944,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3072,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2880,"y":1024},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2880,"y":960},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2880,"y":896},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2880,"y":832},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3136,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":2816,"y":768},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":2880,"y":768},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":2944,"y":768},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":3008,"y":768},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":3072,"y":768},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":3200,"y":768},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":3136,"y":768},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":3264,"y":768},{"name":"f-grass3","state":"idle","sequenceIndex":0,"x":3328,"y":768},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3328,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3392,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":3392,"y":1024},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":3456,"y":1024},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":3520,"y":1024},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":3584,"y":1024},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":3648,"y":1024},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":3712,"y":1024},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":3776,"y":1024},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3456,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3520,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3584,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3648,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3712,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3776,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":3840,"y":1024},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":3968,"y":1024},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":3904,"y":1024},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":4032,"y":1024},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":4096,"y":1024},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":4160,"y":1024},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":4224,"y":1024},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":4288,"y":1024},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":4352,"y":1024},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":4416,"y":1024},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":4480,"y":1024},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":4544,"y":1024},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3840,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3904,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3968,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":4032,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":4096,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":4160,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":4224,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":4288,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":4352,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":4416,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":4480,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":4544,"y":1088},{"name":"f-sign2","state":"idle","sequenceIndex":0,"x":6272,"y":1024},{"name":"f-sign1","state":"idle","sequenceIndex":0,"x":128,"y":960},{"name":"spider","state":"walk-left","sequenceIndex":7,"x":1803.9999999999993,"y":896},{"name":"spider","state":"walk-left","sequenceIndex":0,"x":3200,"y":660},{"name":"spider","state":"walk-left","sequenceIndex":0,"x":4992,"y":786},{"name":"spider","state":"walk-left","sequenceIndex":0,"x":4160,"y":960},{"name":"f-grass3","state":"idle","sequenceIndex":0,"x":4608,"y":1024},{"name":"f-water","state":"idle","sequenceIndex":0,"x":4672,"y":1088},{"name":"f-water","state":"idle","sequenceIndex":0,"x":4736,"y":1088},{"name":"f-water","state":"idle","sequenceIndex":0,"x":4800,"y":1088},{"name":"f-water","state":"idle","sequenceIndex":0,"x":4864,"y":1088},{"name":"f-water","state":"idle","sequenceIndex":0,"x":4928,"y":1088},{"name":"f-water","state":"idle","sequenceIndex":0,"x":4992,"y":1088},{"name":"f-water","state":"idle","sequenceIndex":0,"x":5056,"y":1088},{"name":"f-water","state":"idle","sequenceIndex":0,"x":5120,"y":1088},{"name":"f-water","state":"idle","sequenceIndex":0,"x":5184,"y":1088},{"name":"f-water","state":"idle","sequenceIndex":0,"x":5248,"y":1088},{"name":"f-water","state":"idle","sequenceIndex":0,"x":5312,"y":1088},{"name":"f-grass5","state":"idle","sequenceIndex":0,"x":4992,"y":832},{"name":"f-grass6","state":"idle","sequenceIndex":0,"x":5056,"y":832},{"name":"f-grass4","state":"idle","sequenceIndex":0,"x":5184,"y":832},{"name":"f-grass5","state":"idle","sequenceIndex":0,"x":5248,"y":832},{"name":"f-grass6","state":"idle","sequenceIndex":0,"x":5312,"y":832},{"name":"f-water","state":"idle","sequenceIndex":0,"x":5376,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":5696,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":5760,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":5824,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":5888,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":5952,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":6016,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":6080,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":6144,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":6208,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":6272,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":6336,"y":1088},{"name":"f-stump1","state":"idle","sequenceIndex":0,"x":5760,"y":1024},{"name":"f-stump2","state":"idle","sequenceIndex":0,"x":3904,"y":960},{"name":"f-stump1","state":"idle","sequenceIndex":0,"x":3840,"y":960},{"name":"f-bush1","state":"idle","sequenceIndex":0,"x":4224,"y":960},{"name":"f-bush2","state":"idle","sequenceIndex":0,"x":4288,"y":960},{"name":"f-bush1","state":"idle","sequenceIndex":0,"x":6336,"y":1024},{"name":"f-bush1","state":"idle","sequenceIndex":0,"x":1664,"y":1024},{"name":"f-bush2","state":"idle","sequenceIndex":0,"x":1728,"y":1024},{"name":"f-bush2","state":"idle","sequenceIndex":0,"x":3072,"y":704},{"name":"f-bush1","state":"idle","sequenceIndex":0,"x":3008,"y":704},{"name":"f-bush1","state":"idle","sequenceIndex":0,"x":2368,"y":704},{"name":"f-bush2","state":"idle","sequenceIndex":0,"x":2432,"y":704},{"name":"f-stump1","state":"idle","sequenceIndex":0,"x":3200,"y":704},{"name":"f-stump2","state":"idle","sequenceIndex":0,"x":3264,"y":704},{"name":"h-2","state":"idle","sequenceIndex":0,"x":2496,"y":384},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2944,"y":1024},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2944,"y":960},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2944,"y":896},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2944,"y":832},{"name":"f-ground7","state":"idle","sequenceIndex":0,"x":3264,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3200,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":0,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":0,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":64,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":64,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":128,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":128,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":192,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":192,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":256,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":256,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":320,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":320,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":384,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":384,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":448,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":448,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":512,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":512,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":576,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":576,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":640,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":640,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":704,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":704,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":768,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":768,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":832,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":832,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":896,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":896,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":960,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":960,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1024,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1024,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1088,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1088,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1152,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1152,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1216,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1216,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1280,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1280,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1344,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1344,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1408,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1408,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1472,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1472,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1536,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1536,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1600,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1600,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1664,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1664,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1728,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1728,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1792,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1792,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1856,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1856,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1920,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1920,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1984,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1984,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2048,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2048,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2112,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2112,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2176,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2176,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2240,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2240,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2304,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2304,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2368,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2368,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2432,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2432,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2496,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2496,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2560,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2560,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2624,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2624,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2688,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2688,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2752,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2752,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2816,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2816,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2880,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2880,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2944,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2944,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3008,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3008,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3072,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3072,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3136,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3136,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3200,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3200,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3264,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3264,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3328,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3328,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3392,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3392,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3456,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3456,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3584,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3520,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3520,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3584,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3648,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3648,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3712,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3712,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3776,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3776,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3840,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3840,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3904,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3904,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3968,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3968,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":4032,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":4032,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":4096,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":4096,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":4160,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":4160,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":4224,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":4224,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":4288,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":4288,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":4352,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":4352,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":4416,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":4416,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":4480,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":4480,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":4544,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":4544,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":4608,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":4608,"y":1152},{"name":"f-ground8","state":"idle","sequenceIndex":0,"x":4608,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":5440,"y":1216},{"name":"f-grass1","state":"idle","sequenceIndex":0,"x":5440,"y":1024},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":5504,"y":1024},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":5568,"y":1024},{"name":"f-grass3","state":"idle","sequenceIndex":0,"x":5632,"y":1024},{"name":"f-ground7","state":"idle","sequenceIndex":0,"x":5440,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":5440,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":5504,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":5568,"y":1088},{"name":"f-ground8","state":"idle","sequenceIndex":0,"x":5632,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":5504,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":5504,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":5568,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":5632,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":5568,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":5696,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":5632,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":5696,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":5760,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":5760,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":5824,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":5824,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":5888,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":5888,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":5952,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":5952,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":6016,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":6016,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":6080,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":6080,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":6144,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":6144,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":6208,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":6208,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":6272,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":6272,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":6336,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":6336,"y":1152},{"name":"hero1","state":"idle-right","sequenceIndex":1,"x":0,"y":900,"nextState":"idle-right","velocity":0,"acceleration":0,"yVelocity":0,"yAcceleration":0},{"name":"f-water2","state":"idle","sequenceIndex":0,"x":4672,"y":1216},{"name":"f-water2","state":"idle","sequenceIndex":0,"x":4672,"y":1152},{"name":"f-water2","state":"idle","sequenceIndex":0,"x":4736,"y":1152},{"name":"f-water2","state":"idle","sequenceIndex":0,"x":4736,"y":1216},{"name":"f-water2","state":"idle","sequenceIndex":0,"x":4800,"y":1216},{"name":"f-water2","state":"idle","sequenceIndex":0,"x":4800,"y":1152},{"name":"f-water2","state":"idle","sequenceIndex":0,"x":4928,"y":1152},{"name":"f-water2","state":"idle","sequenceIndex":0,"x":4864,"y":1216},{"name":"f-water2","state":"idle","sequenceIndex":0,"x":4864,"y":1152},{"name":"f-water2","state":"idle","sequenceIndex":0,"x":4928,"y":1216},{"name":"f-water2","state":"idle","sequenceIndex":0,"x":4992,"y":1216},{"name":"f-water2","state":"idle","sequenceIndex":0,"x":4992,"y":1152},{"name":"f-water2","state":"idle","sequenceIndex":0,"x":5056,"y":1152},{"name":"f-water2","state":"idle","sequenceIndex":0,"x":5056,"y":1216},{"name":"f-water2","state":"idle","sequenceIndex":0,"x":5120,"y":1216},{"name":"f-water2","state":"idle","sequenceIndex":0,"x":5120,"y":1152},{"name":"f-water2","state":"idle","sequenceIndex":0,"x":5184,"y":1152},{"name":"f-water2","state":"idle","sequenceIndex":0,"x":5184,"y":1216},{"name":"f-water2","state":"idle","sequenceIndex":0,"x":5248,"y":1216},{"name":"f-water2","state":"idle","sequenceIndex":0,"x":5312,"y":1152},{"name":"f-water2","state":"idle","sequenceIndex":0,"x":5248,"y":1152},{"name":"f-water2","state":"idle","sequenceIndex":0,"x":5312,"y":1216},{"name":"f-water2","state":"idle","sequenceIndex":0,"x":5376,"y":1152},{"name":"f-water2","state":"idle","sequenceIndex":0,"x":5376,"y":1216},{"name":"f-stump2","state":"idle","sequenceIndex":0,"x":5824,"y":1024},{"name":"f-grass4","state":"idle","sequenceIndex":0,"x":4800,"y":832},{"name":"f-grass5","state":"idle","sequenceIndex":0,"x":4864,"y":832},{"name":"f-grass5","state":"idle","sequenceIndex":0,"x":4928,"y":832},{"name":"spider","state":"walk-left","sequenceIndex":0,"x":960,"y":1024},{"name":"a-hay-coin","state":"idle","sequenceIndex":0,"x":576,"y":1024},{"name":"a-hay-coin","state":"idle","sequenceIndex":0,"x":640,"y":1024},{"name":"a-hay-spider","state":"idle","sequenceIndex":0,"x":704,"y":1024},{"name":"a-hay","state":"idle","sequenceIndex":0,"x":640,"y":960},{"name":"a-hay-coin","state":"idle","sequenceIndex":0,"x":576,"y":960},{"name":"f-grass1","state":"idle","sequenceIndex":0,"x":3264,"y":1024},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":3328,"y":1024},{"name":"h-cave","state":"idle","sequenceIndex":0,"x":3008,"y":832},{"name":"a-hay-coin","state":"idle","sequenceIndex":0,"x":3392,"y":960},{"name":"a-hay-coin","state":"idle","sequenceIndex":0,"x":3392,"y":896},{"name":"a-hay","state":"idle","sequenceIndex":0,"x":3456,"y":960},{"name":"a-hay","state":"idle","sequenceIndex":0,"x":3392,"y":832},{"name":"a-hay","state":"idle","sequenceIndex":0,"x":3456,"y":896},{"name":"a-hay","state":"idle","sequenceIndex":0,"x":1984,"y":896},{"name":"a-hay","state":"idle","sequenceIndex":0,"x":2048,"y":896},{"name":"a-hay-coin","state":"idle","sequenceIndex":0,"x":2048,"y":832}];
	window._levels.push({"tileWidth":64,"tileHeight":64,"width":100,"height":20,"backgroundImage":"#background-forest","puzzle":false,"level":5,"time":0,"name":"Forest","x":0,"y":-580,"viewportTop":0,"viewportRight":0,"viewportLeft":0,"backgroundColor":"#070A0D","sprites":sprites,"state":"pause","viewportBottom":0});
}).call(this);