(function() {
	window._levels || (window._levels = []);
	var sprites = [{"name":"bc-brick5","state":"idle","x":64,"y":1216},{"name":"bc-brick5","state":"idle","x":0,"y":1216},{"name":"bc-brick5","state":"idle","x":0,"y":1152},{"name":"bc-brick5","state":"idle","x":64,"y":1152},{"name":"bc-brick5","state":"idle","x":128,"y":1152},{"name":"bc-brick5","state":"idle","x":128,"y":1216},{"name":"bc-brick5","state":"idle","x":0,"y":1088},{"name":"bc-brick5","state":"idle","x":64,"y":1088},{"name":"bc-brick5","state":"idle","x":128,"y":1088},{"name":"bc-brick5","state":"idle","x":192,"y":1152},{"name":"bc-brick5","state":"idle","x":192,"y":1216},{"name":"bc-brick2","state":"idle","x":0,"y":1024},{"name":"bc-brick2","state":"idle","x":128,"y":1024},{"name":"bc-brick2","state":"idle","x":64,"y":1024},{"name":"bc-brick2","state":"idle","x":192,"y":1024},{"name":"bc-brick2","state":"idle","x":256,"y":1024},{"name":"bc-brick2","state":"idle","x":320,"y":1024},{"name":"bc-brick2","state":"idle","x":384,"y":1024},{"name":"bc-brick2","state":"idle","x":448,"y":1024},{"name":"bc-brick2","state":"idle","x":512,"y":1024},{"name":"bc-brick2","state":"idle","x":576,"y":1024},{"name":"bc-brick2","state":"idle","x":640,"y":1024},{"name":"bc-brick2","state":"idle","x":704,"y":1024},{"name":"bc-brick2","state":"idle","x":768,"y":1024},{"name":"bc-brick2","state":"idle","x":832,"y":1024},{"name":"bc-brick5","state":"idle","x":256,"y":1088},{"name":"bc-brick5","state":"idle","x":256,"y":1216},{"name":"bc-brick5","state":"idle","x":256,"y":1152},{"name":"bc-brick5","state":"idle","x":320,"y":1088},{"name":"bc-brick5","state":"idle","x":320,"y":1152},{"name":"bc-brick5","state":"idle","x":320,"y":1216},{"name":"bc-brick5","state":"idle","x":384,"y":1216},{"name":"bc-brick5","state":"idle","x":384,"y":1152},{"name":"bc-brick5","state":"idle","x":384,"y":1088},{"name":"bc-brick5","state":"idle","x":448,"y":1088},{"name":"bc-brick5","state":"idle","x":448,"y":1216},{"name":"bc-brick5","state":"idle","x":512,"y":1216},{"name":"bc-brick5","state":"idle","x":512,"y":1088},{"name":"bc-brick5","state":"idle","x":512,"y":1152},{"name":"bc-brick5","state":"idle","x":576,"y":1088},{"name":"bc-brick5","state":"idle","x":576,"y":1152},{"name":"bc-brick5","state":"idle","x":576,"y":1216},{"name":"bc-brick5","state":"idle","x":640,"y":1216},{"name":"bc-brick5","state":"idle","x":640,"y":1152},{"name":"bc-brick5","state":"idle","x":640,"y":1088},{"name":"bc-brick5","state":"idle","x":704,"y":1152},{"name":"bc-brick5","state":"idle","x":704,"y":1216},{"name":"bc-brick5","state":"idle","x":768,"y":1216},{"name":"bc-brick5","state":"idle","x":768,"y":1152},{"name":"bc-brick5","state":"idle","x":768,"y":1088},{"name":"bc-brick5","state":"idle","x":832,"y":1088},{"name":"bc-brick5","state":"idle","x":832,"y":1152},{"name":"bc-brick5","state":"idle","x":832,"y":1216},{"name":"bc-brick5","state":"idle","x":896,"y":1216},{"name":"bc-brick5","state":"idle","x":896,"y":1152},{"name":"bc-brick5","state":"idle","x":896,"y":1088},{"name":"bc-brick2","state":"idle","x":896,"y":1024},{"name":"bc-brick2","state":"idle","x":960,"y":1024},{"name":"bc-brick2","state":"idle","x":1024,"y":1024},{"name":"bc-brick2","state":"idle","x":1088,"y":1024},{"name":"bc-brick2","state":"idle","x":1152,"y":1024},{"name":"bc-brick2","state":"idle","x":1216,"y":1024},{"name":"bc-brick2","state":"idle","x":1280,"y":1024},{"name":"bc-brick5","state":"idle","x":960,"y":1088},{"name":"bc-brick5","state":"idle","x":960,"y":1216},{"name":"bc-brick5","state":"idle","x":1024,"y":1216},{"name":"bc-brick5","state":"idle","x":1024,"y":1088},{"name":"bc-brick5","state":"idle","x":1024,"y":1152},{"name":"bc-brick5","state":"idle","x":1088,"y":1088},{"name":"bc-brick5","state":"idle","x":1088,"y":1152},{"name":"bc-brick5","state":"idle","x":1088,"y":1216},{"name":"bc-brick5","state":"idle","x":1152,"y":1216},{"name":"bc-brick5","state":"idle","x":1152,"y":1088},{"name":"bc-brick5","state":"idle","x":1152,"y":1152},{"name":"bc-brick5","state":"idle","x":1216,"y":1152},{"name":"bc-brick5","state":"idle","x":1216,"y":1216},{"name":"bc-brick5","state":"idle","x":1280,"y":1216},{"name":"bc-brick5","state":"idle","x":1280,"y":1152},{"name":"bc-brick5","state":"idle","x":1280,"y":1088},{"name":"h-wall","state":"idle","x":832,"y":832},{"name":"bc-brick4","state":"idle","x":832,"y":768},{"name":"bc-brick4","state":"idle","x":832,"y":704},{"name":"bc-brick4","state":"idle","x":832,"y":640},{"name":"bc-brick4","state":"idle","x":832,"y":576},{"name":"bc-brick4","state":"idle","x":832,"y":512},{"name":"bc-brick1","state":"idle","x":832,"y":384},{"name":"bc-brick2","state":"idle","x":896,"y":384},{"name":"bc-brick2","state":"idle","x":960,"y":384},{"name":"bc-brick2","state":"idle","x":1024,"y":384},{"name":"bc-brick2","state":"idle","x":1088,"y":384},{"name":"bc-brick2","state":"idle","x":1152,"y":384},{"name":"bc-brick2","state":"idle","x":1216,"y":384},{"name":"bc-brick2","state":"idle","x":1280,"y":384},{"name":"bc-brick2","state":"idle","x":1344,"y":384},{"name":"bc-brick5","state":"idle","x":1024,"y":768},{"name":"bc-brick5","state":"idle","x":896,"y":768},{"name":"bc-brick5","state":"idle","x":896,"y":704},{"name":"bc-brick5","state":"idle","x":960,"y":704},{"name":"bc-brick5","state":"idle","x":1024,"y":704},{"name":"bc-brick5","state":"idle","x":1024,"y":640},{"name":"bc-brick5","state":"idle","x":896,"y":640},{"name":"bc-brick5","state":"idle","x":960,"y":640},{"name":"bc-brick5","state":"idle","x":896,"y":576},{"name":"bc-brick5","state":"idle","x":1024,"y":576},{"name":"bc-brick5","state":"idle","x":1024,"y":512},{"name":"bc-brick5","state":"idle","x":960,"y":512},{"name":"bc-brick5","state":"idle","x":896,"y":512},{"name":"bc-brick2","state":"idle","x":1408,"y":1024},{"name":"bc-brick2","state":"idle","x":1472,"y":1024},{"name":"bc-brick2","state":"idle","x":1536,"y":1024},{"name":"bc-brick2","state":"idle","x":1600,"y":1024},{"name":"bc-brick2","state":"idle","x":1664,"y":1024},{"name":"bc-brick2","state":"idle","x":1728,"y":1024},{"name":"bc-brick2","state":"idle","x":1792,"y":1024},{"name":"bc-brick2","state":"idle","x":1856,"y":1024},{"name":"bc-brick2","state":"idle","x":1344,"y":1024},{"name":"bc-brick5","state":"idle","x":1344,"y":1088},{"name":"bc-brick5","state":"idle","x":1344,"y":1216},{"name":"bc-brick5","state":"idle","x":1344,"y":1152},{"name":"bc-brick5","state":"idle","x":1408,"y":1088},{"name":"bc-brick5","state":"idle","x":1408,"y":1216},{"name":"bc-brick5","state":"idle","x":1472,"y":1216},{"name":"bc-brick5","state":"idle","x":1472,"y":1152},{"name":"bc-brick5","state":"idle","x":1472,"y":1088},{"name":"bc-brick5","state":"idle","x":1536,"y":1088},{"name":"bc-brick5","state":"idle","x":1536,"y":1152},{"name":"bc-brick5","state":"idle","x":1536,"y":1216},{"name":"bc-brick5","state":"idle","x":1600,"y":1216},{"name":"bc-brick5","state":"idle","x":1600,"y":1152},{"name":"bc-brick5","state":"idle","x":1600,"y":1088},{"name":"bc-brick5","state":"idle","x":1664,"y":1088},{"name":"bc-brick5","state":"idle","x":1664,"y":1152},{"name":"bc-brick5","state":"idle","x":1664,"y":1216},{"name":"bc-brick5","state":"idle","x":1728,"y":1216},{"name":"bc-brick5","state":"idle","x":1728,"y":1088},{"name":"bc-brick5","state":"idle","x":1728,"y":1152},{"name":"bc-brick5","state":"idle","x":1792,"y":1216},{"name":"bc-brick5","state":"idle","x":1792,"y":1152},{"name":"bc-brick5","state":"idle","x":1856,"y":1088},{"name":"bc-brick5","state":"idle","x":1856,"y":1152},{"name":"bc-brick5","state":"idle","x":1856,"y":1216},{"name":"bc-brick2","state":"idle","x":1408,"y":384},{"name":"bc-brick8","state":"idle","x":1152,"y":448},{"name":"bc-brick8","state":"idle","x":1216,"y":448},{"name":"bc-brick8","state":"idle","x":1088,"y":448},{"name":"bc-brick8","state":"idle","x":1024,"y":448},{"name":"bc-brick8","state":"idle","x":960,"y":448},{"name":"bc-brick8","state":"idle","x":896,"y":448},{"name":"bc-brick7","state":"idle","x":832,"y":448},{"name":"bc-brick8","state":"idle","x":1280,"y":448},{"name":"bc-brick8","state":"idle","x":1344,"y":448},{"name":"bc-brick8","state":"idle","x":1408,"y":448},{"name":"bc-brick8","state":"idle","x":1472,"y":448},{"name":"bc-brick8","state":"idle","x":1536,"y":448},{"name":"bc-brick8","state":"idle","x":1600,"y":448},{"name":"bc-brick8","state":"idle","x":1664,"y":448},{"name":"bc-brick8","state":"idle","x":1728,"y":448},{"name":"bc-brick8","state":"idle","x":1792,"y":448},{"name":"bc-brick8","state":"idle","x":1856,"y":448},{"name":"bc-brick8","state":"idle","x":1920,"y":448},{"name":"bc-brick8","state":"idle","x":1984,"y":448},{"name":"bc-brick8","state":"idle","x":2048,"y":448},{"name":"bc-brick8","state":"idle","x":2112,"y":448},{"name":"bc-brick8","state":"idle","x":2176,"y":448},{"name":"bc-brick8","state":"idle","x":2240,"y":448},{"name":"bc-brick8","state":"idle","x":2304,"y":448},{"name":"bc-brick2","state":"idle","x":1472,"y":384},{"name":"bc-brick2","state":"idle","x":1536,"y":384},{"name":"bc-brick2","state":"idle","x":1600,"y":384},{"name":"bc-brick2","state":"idle","x":1664,"y":384},{"name":"bc-brick2","state":"idle","x":1728,"y":384},{"name":"bc-brick2","state":"idle","x":1792,"y":384},{"name":"bc-brick2","state":"idle","x":1856,"y":384},{"name":"bc-brick2","state":"idle","x":1920,"y":384},{"name":"bc-brick2","state":"idle","x":2048,"y":384},{"name":"bc-brick2","state":"idle","x":1984,"y":384},{"name":"bc-brick2","state":"idle","x":2112,"y":384},{"name":"bc-brick2","state":"idle","x":2176,"y":384},{"name":"bc-brick2","state":"idle","x":2240,"y":384},{"name":"bc-brick2","state":"idle","x":2304,"y":384},{"name":"bc-brick2","state":"idle","x":1920,"y":1024},{"name":"bc-brick2","state":"idle","x":1984,"y":1024},{"name":"bc-brick2","state":"idle","x":2048,"y":1024},{"name":"bc-brick2","state":"idle","x":2112,"y":1024},{"name":"bc-brick2","state":"idle","x":2176,"y":1024},{"name":"bc-brick2","state":"idle","x":2240,"y":1024},{"name":"bc-brick2","state":"idle","x":2304,"y":1024},{"name":"bc-brick2","state":"idle","x":2368,"y":1024},{"name":"bc-brick2","state":"idle","x":2432,"y":1024},{"name":"bc-brick2","state":"idle","x":2496,"y":1024},{"name":"bc-brick2","state":"idle","x":2560,"y":1024},{"name":"bc-brick5","state":"idle","x":1920,"y":1088},{"name":"bc-brick5","state":"idle","x":1920,"y":1216},{"name":"bc-brick5","state":"idle","x":1920,"y":1152},{"name":"bc-brick5","state":"idle","x":1984,"y":1088},{"name":"bc-brick5","state":"idle","x":1984,"y":1152},{"name":"bc-brick5","state":"idle","x":1984,"y":1216},{"name":"bc-brick5","state":"idle","x":2048,"y":1216},{"name":"bc-brick5","state":"idle","x":2048,"y":1088},{"name":"bc-brick5","state":"idle","x":2112,"y":1088},{"name":"bc-brick5","state":"idle","x":2112,"y":1152},{"name":"bc-brick5","state":"idle","x":2112,"y":1216},{"name":"bc-brick5","state":"idle","x":2176,"y":1216},{"name":"bc-brick5","state":"idle","x":2176,"y":1088},{"name":"bc-brick5","state":"idle","x":2176,"y":1152},{"name":"bc-brick5","state":"idle","x":2240,"y":1088},{"name":"bc-brick5","state":"idle","x":2240,"y":1152},{"name":"bc-brick5","state":"idle","x":2240,"y":1216},{"name":"bc-brick5","state":"idle","x":2304,"y":1216},{"name":"bc-brick5","state":"idle","x":2304,"y":1088},{"name":"bc-brick5","state":"idle","x":2304,"y":1152},{"name":"bc-brick5","state":"idle","x":2368,"y":1216},{"name":"bc-brick5","state":"idle","x":2368,"y":1152},{"name":"bc-brick5","state":"idle","x":2432,"y":1088},{"name":"bc-brick5","state":"idle","x":2432,"y":1152},{"name":"bc-brick5","state":"idle","x":2496,"y":1088},{"name":"bc-brick5","state":"idle","x":2560,"y":1088},{"name":"bc-brick5","state":"idle","x":2560,"y":1152},{"name":"bc-brick5","state":"idle","x":2496,"y":1152},{"name":"bc-brick5","state":"idle","x":2432,"y":1216},{"name":"bc-brick5","state":"idle","x":2496,"y":1216},{"name":"bc-brick5","state":"idle","x":2560,"y":1216},{"name":"bc-brick5","state":"idle","x":2624,"y":1088},{"name":"bc-brick5","state":"idle","x":2624,"y":1216},{"name":"bc-brick5","state":"idle","x":2688,"y":1216},{"name":"bc-brick5","state":"idle","x":2688,"y":1152},{"name":"bc-brick5","state":"idle","x":2688,"y":1088},{"name":"bc-brick5","state":"idle","x":2752,"y":1088},{"name":"bc-brick5","state":"idle","x":2752,"y":1152},{"name":"bc-brick5","state":"idle","x":2752,"y":1216},{"name":"bc-brick5","state":"idle","x":2816,"y":1088},{"name":"bc-brick5","state":"idle","x":2816,"y":1152},{"name":"bc-brick5","state":"idle","x":2816,"y":1216},{"name":"bc-brick5","state":"idle","x":2880,"y":1088},{"name":"bc-brick5","state":"idle","x":2880,"y":1216},{"name":"bc-brick5","state":"idle","x":2880,"y":1152},{"name":"bc-brick2","state":"idle","x":2624,"y":1024},{"name":"bc-brick2","state":"idle","x":2688,"y":1024},{"name":"bc-brick2","state":"idle","x":2752,"y":1024},{"name":"bc-brick2","state":"idle","x":2816,"y":1024},{"name":"bc-brick2","state":"idle","x":2880,"y":1024},{"name":"bc-brick2","state":"idle","x":2944,"y":1024},{"name":"bc-brick2","state":"idle","x":3008,"y":1024},{"name":"bc-brick2","state":"idle","x":3072,"y":1024},{"name":"bc-brick2","state":"idle","x":3136,"y":1024},{"name":"bc-brick2","state":"idle","x":3200,"y":1024},{"name":"bc-brick2","state":"idle","x":3264,"y":1024},{"name":"bc-brick2","state":"idle","x":3328,"y":1024},{"name":"bc-brick2","state":"idle","x":3392,"y":1024},{"name":"bc-brick2","state":"idle","x":3456,"y":1024},{"name":"bc-brick2","state":"idle","x":3648,"y":1024},{"name":"bc-brick2","state":"idle","x":3776,"y":1024},{"name":"bc-brick2","state":"idle","x":4096,"y":1024},{"name":"bc-brick2","state":"idle","x":4224,"y":1024},{"name":"bc-brick2","state":"idle","x":4352,"y":1024},{"name":"bc-brick2","state":"idle","x":4480,"y":1024},{"name":"bc-brick2","state":"idle","x":4544,"y":1024},{"name":"bc-brick2","state":"idle","x":4608,"y":1024},{"name":"bc-brick2","state":"idle","x":4672,"y":1024},{"name":"bc-brick2","state":"idle","x":4736,"y":1024},{"name":"bc-brick2","state":"idle","x":4800,"y":1024},{"name":"bc-brick2","state":"idle","x":4864,"y":1024},{"name":"bc-brick5","state":"idle","x":2944,"y":1152},{"name":"bc-brick5","state":"idle","x":2944,"y":1216},{"name":"bc-brick5","state":"idle","x":3008,"y":1216},{"name":"bc-brick5","state":"idle","x":3008,"y":1088},{"name":"bc-brick5","state":"idle","x":3008,"y":1152},{"name":"bc-brick5","state":"idle","x":3072,"y":1088},{"name":"bc-brick5","state":"idle","x":3072,"y":1216},{"name":"bc-brick5","state":"idle","x":3136,"y":1216},{"name":"bc-brick5","state":"idle","x":3136,"y":1152},{"name":"bc-brick5","state":"idle","x":3136,"y":1088},{"name":"bc-brick5","state":"idle","x":3200,"y":1088},{"name":"bc-brick5","state":"idle","x":3200,"y":1152},{"name":"bc-brick5","state":"idle","x":3200,"y":1216},{"name":"bc-brick5","state":"idle","x":3264,"y":1216},{"name":"bc-brick5","state":"idle","x":3264,"y":1152},{"name":"bc-brick5","state":"idle","x":3264,"y":1088},{"name":"bc-brick5","state":"idle","x":3328,"y":1152},{"name":"bc-brick5","state":"idle","x":3328,"y":1216},{"name":"bc-brick5","state":"idle","x":3392,"y":1216},{"name":"bc-brick5","state":"idle","x":3392,"y":1088},{"name":"bc-brick5","state":"idle","x":3392,"y":1152},{"name":"bc-brick5","state":"idle","x":3456,"y":1088},{"name":"bc-brick5","state":"idle","x":3456,"y":1152},{"name":"bc-brick5","state":"idle","x":3456,"y":1216},{"name":"bc-brick5","state":"idle","x":3520,"y":1216},{"name":"bc-brick5","state":"idle","x":3520,"y":1088},{"name":"bc-brick5","state":"idle","x":3520,"y":1152},{"name":"bc-brick5","state":"idle","x":3584,"y":1088},{"name":"bc-brick5","state":"idle","x":3584,"y":1216},{"name":"bc-brick5","state":"idle","x":3648,"y":1216},{"name":"bc-brick5","state":"idle","x":3648,"y":1088},{"name":"bc-brick5","state":"idle","x":3648,"y":1152},{"name":"bc-brick5","state":"idle","x":3712,"y":1088},{"name":"bc-brick5","state":"idle","x":3712,"y":1152},{"name":"bc-brick5","state":"idle","x":3712,"y":1216},{"name":"bc-brick5","state":"idle","x":3776,"y":1216},{"name":"bc-brick5","state":"idle","x":3776,"y":1088},{"name":"bc-brick5","state":"idle","x":3776,"y":1152},{"name":"bc-brick5","state":"idle","x":3840,"y":1152},{"name":"bc-brick5","state":"idle","x":3840,"y":1216},{"name":"bc-brick5","state":"idle","x":3904,"y":1216},{"name":"bc-brick5","state":"idle","x":3904,"y":1088},{"name":"bc-brick5","state":"idle","x":3904,"y":1152},{"name":"bc-brick5","state":"idle","x":3968,"y":1088},{"name":"bc-brick5","state":"idle","x":3968,"y":1152},{"name":"bc-brick5","state":"idle","x":3968,"y":1216},{"name":"bc-brick5","state":"idle","x":4032,"y":1216},{"name":"bc-brick5","state":"idle","x":4032,"y":1088},{"name":"bc-brick5","state":"idle","x":4032,"y":1152},{"name":"bc-brick5","state":"idle","x":4096,"y":1088},{"name":"bc-brick5","state":"idle","x":4096,"y":1216},{"name":"bc-brick5","state":"idle","x":4160,"y":1088},{"name":"bc-brick5","state":"idle","x":4160,"y":1152},{"name":"bc-brick5","state":"idle","x":4160,"y":1216},{"name":"bc-brick5","state":"idle","x":4224,"y":1216},{"name":"bc-brick5","state":"idle","x":4224,"y":1088},{"name":"bc-brick5","state":"idle","x":4224,"y":1152},{"name":"bc-brick5","state":"idle","x":4288,"y":1216},{"name":"bc-brick5","state":"idle","x":4288,"y":1152},{"name":"bc-brick5","state":"idle","x":4288,"y":1088},{"name":"bc-brick5","state":"idle","x":4352,"y":1088},{"name":"bc-brick5","state":"idle","x":4352,"y":1216},{"name":"bc-brick5","state":"idle","x":4416,"y":1216},{"name":"bc-brick5","state":"idle","x":4416,"y":1152},{"name":"bc-brick5","state":"idle","x":4480,"y":1088},{"name":"bc-brick5","state":"idle","x":4480,"y":1152},{"name":"bc-brick5","state":"idle","x":4480,"y":1216},{"name":"bc-brick5","state":"idle","x":4544,"y":1216},{"name":"bc-brick5","state":"idle","x":4544,"y":1152},{"name":"bc-brick5","state":"idle","x":4544,"y":1088},{"name":"bc-brick5","state":"idle","x":4608,"y":1088},{"name":"bc-brick5","state":"idle","x":4608,"y":1216},{"name":"bc-brick5","state":"idle","x":4608,"y":1152},{"name":"bc-brick5","state":"idle","x":4672,"y":1088},{"name":"bc-brick5","state":"idle","x":4672,"y":1216},{"name":"bc-brick5","state":"idle","x":4736,"y":1216},{"name":"bc-brick5","state":"idle","x":4736,"y":1152},{"name":"bc-brick5","state":"idle","x":4736,"y":1088},{"name":"bc-brick5","state":"idle","x":4800,"y":1088},{"name":"bc-brick5","state":"idle","x":4800,"y":1152},{"name":"bc-brick5","state":"idle","x":4800,"y":1216},{"name":"bc-brick5","state":"idle","x":4864,"y":1216},{"name":"bc-brick5","state":"idle","x":4864,"y":1152},{"name":"bc-brick8","state":"idle","x":2368,"y":448},{"name":"bc-brick8","state":"idle","x":2432,"y":448},{"name":"bc-brick8","state":"idle","x":2496,"y":448},{"name":"bc-brick8","state":"idle","x":2624,"y":448},{"name":"bc-brick8","state":"idle","x":2560,"y":448},{"name":"bc-brick8","state":"idle","x":2688,"y":448},{"name":"bc-brick8","state":"idle","x":2752,"y":448},{"name":"bc-brick8","state":"idle","x":2816,"y":448},{"name":"bc-brick8","state":"idle","x":2880,"y":448},{"name":"bc-brick8","state":"idle","x":2944,"y":448},{"name":"bc-brick2","state":"idle","x":2368,"y":384},{"name":"bc-brick2","state":"idle","x":2432,"y":384},{"name":"bc-brick2","state":"idle","x":2496,"y":384},{"name":"bc-brick2","state":"idle","x":2560,"y":384},{"name":"bc-brick2","state":"idle","x":2624,"y":384},{"name":"bc-brick2","state":"idle","x":2688,"y":384},{"name":"bc-brick2","state":"idle","x":2752,"y":384},{"name":"bc-brick2","state":"idle","x":2816,"y":384},{"name":"bc-brick2","state":"idle","x":2880,"y":384},{"name":"bc-brick2","state":"idle","x":2944,"y":384},{"name":"bc-brick9","state":"idle","x":3008,"y":448},{"name":"bc-brick3","state":"idle","x":3008,"y":384},{"name":"bc-brick6","state":"idle","x":3008,"y":512},{"name":"bc-brick6","state":"idle","x":1088,"y":512},{"name":"bc-brick6","state":"idle","x":1088,"y":576},{"name":"bc-brick6","state":"idle","x":1088,"y":640},{"name":"bc-brick6","state":"idle","x":1088,"y":704},{"name":"bc-brick6","state":"idle","x":1088,"y":768},{"name":"h-wall","state":"idle","x":2752,"y":832},{"name":"bc-brick6","state":"idle","x":3008,"y":768},{"name":"bc-brick6","state":"idle","x":3008,"y":704},{"name":"bc-brick6","state":"idle","x":3008,"y":640},{"name":"bc-brick6","state":"idle","x":3008,"y":576},{"name":"bc-brick5","state":"idle","x":2944,"y":768},{"name":"bc-brick5","state":"idle","x":2816,"y":768},{"name":"bc-brick5","state":"idle","x":2816,"y":704},{"name":"bc-brick5","state":"idle","x":2880,"y":704},{"name":"bc-brick5","state":"idle","x":2944,"y":704},{"name":"bc-brick5","state":"idle","x":2944,"y":640},{"name":"bc-brick5","state":"idle","x":2880,"y":640},{"name":"bc-brick5","state":"idle","x":2816,"y":640},{"name":"bc-brick5","state":"idle","x":2944,"y":576},{"name":"bc-brick5","state":"idle","x":2816,"y":576},{"name":"bc-brick5","state":"idle","x":2816,"y":512},{"name":"bc-brick5","state":"idle","x":2880,"y":512},{"name":"bc-brick5","state":"idle","x":2944,"y":512},{"name":"bc-brick4","state":"idle","x":2752,"y":512},{"name":"bc-brick4","state":"idle","x":2752,"y":576},{"name":"bc-brick4","state":"idle","x":2752,"y":640},{"name":"bc-brick4","state":"idle","x":2752,"y":704},{"name":"bc-brick4","state":"idle","x":2752,"y":768},{"name":"bc-block1","state":"idle","x":4864,"y":1088},{"name":"bc-block1","state":"idle","x":4096,"y":1152},{"name":"bc-block1","state":"idle","x":3584,"y":1152},{"name":"bc-block1","state":"idle","x":3072,"y":1152},{"name":"bc-block1","state":"idle","x":2880,"y":576},{"name":"bc-block1","state":"idle","x":2368,"y":1088},{"name":"bc-block1","state":"idle","x":1792,"y":1088},{"name":"bc-block1","state":"idle","x":1408,"y":1152},{"name":"bc-block1","state":"idle","x":1216,"y":1088},{"name":"bc-block1","state":"idle","x":960,"y":1152},{"name":"bc-block1","state":"idle","x":704,"y":1088},{"name":"bc-block1","state":"idle","x":448,"y":1152},{"name":"bc-block1","state":"idle","x":192,"y":1088},{"name":"bc-block2","state":"idle","x":960,"y":768},{"name":"bc-block2","state":"idle","x":960,"y":576},{"name":"bc-block2","state":"idle","x":2048,"y":1152},{"name":"bc-block2","state":"idle","x":2624,"y":1152},{"name":"bc-block2","state":"idle","x":2944,"y":1088},{"name":"bc-block2","state":"idle","x":2880,"y":768},{"name":"bc-block2","state":"idle","x":3328,"y":1088},{"name":"bc-block2","state":"idle","x":3840,"y":1088},{"name":"bc-block2","state":"idle","x":4416,"y":1088},{"name":"bc-block2","state":"idle","x":4672,"y":1152},{"name":"f-sign2","state":"idle","x":5568,"y":960},{"name":"f-sign1","state":"idle","x":64,"y":960},{"name":"a-block-key","state":"idle","x":448,"y":960},{"name":"hero1","state":"idle-right","x":128,"y":900,"nextState":"idle-right","velocity":0,"acceleration":0,"yVelocity":0,"yAcceleration":0},{"name":"bc-pillar-solid3","state":"idle","x":1984,"y":960},{"name":"bc-pillar-solid1","state":"idle","x":1984,"y":896},{"name":"bc-pillar3","state":"idle","x":1728,"y":960},{"name":"bc-pillar2","state":"idle","x":1728,"y":896},{"name":"bc-pillar2","state":"idle","x":1728,"y":832},{"name":"bc-pillar2","state":"idle","x":1728,"y":768},{"name":"bc-pillar2","state":"idle","x":2240,"y":896},{"name":"bc-pillar2","state":"idle","x":2240,"y":832},{"name":"bc-pillar2","state":"idle","x":2240,"y":768},{"name":"bc-pillar3","state":"idle","x":2240,"y":960},{"name":"bc-pillar1","state":"idle","x":2240,"y":704},{"name":"bc-pillar1","state":"idle","x":1728,"y":704},{"name":"bc-pillar-solid3","state":"idle","x":1536,"y":960},{"name":"bc-pillar-solid2","state":"idle","x":1536,"y":896},{"name":"bc-pillar-solid1","state":"idle","x":1536,"y":832},{"name":"bc-pillar-solid1","state":"idle","x":2432,"y":832},{"name":"bc-pillar-solid2","state":"idle","x":2432,"y":896},{"name":"bc-pillar-solid3","state":"idle","x":2432,"y":960},{"name":"bc-spikes","state":"idle","x":1920,"y":960},{"name":"bc-spikes","state":"idle","x":2048,"y":960},{"name":"bc-brick7","state":"idle","x":1728,"y":640},{"name":"bc-brick9","state":"idle","x":2240,"y":640},{"name":"bc-brick8","state":"idle","x":1792,"y":640},{"name":"bc-brick8","state":"idle","x":1856,"y":640},{"name":"bc-brick8","state":"idle","x":1920,"y":640},{"name":"bc-brick8","state":"idle","x":1984,"y":640},{"name":"bc-brick8","state":"idle","x":2048,"y":640},{"name":"bc-brick8","state":"idle","x":2112,"y":640},{"name":"bc-brick8","state":"idle","x":2176,"y":640},{"name":"a-coin","state":"idle","x":1728,"y":592},{"name":"a-coin","state":"idle","x":1792,"y":592},{"name":"a-coin","state":"idle","x":1856,"y":592},{"name":"a-coin","state":"idle","x":1920,"y":592},{"name":"a-coin","state":"idle","x":2048,"y":592},{"name":"a-coin","state":"idle","x":2112,"y":592},{"name":"a-coin","state":"idle","x":2176,"y":592},{"name":"a-coin","state":"idle","x":2240,"y":592},{"name":"a-crate-health","state":"idle","x":2368,"y":960},{"name":"a-crate-coin-bag","state":"idle","x":2304,"y":960},{"name":"a-crate-coin","state":"idle","x":2304,"y":896},{"name":"a-barrel-death","state":"idle","x":1344,"y":960},{"name":"a-barrel-death","state":"idle","x":1344,"y":896},{"name":"a-barrel-spider","state":"idle","x":1600,"y":960},{"name":"a-barrel","state":"idle","x":1600,"y":896},{"name":"a-barrel-coin","state":"idle","x":1408,"y":960},{"name":"a-barrel-coin","state":"idle","x":1408,"y":896},{"name":"a-barrel-coin","state":"idle","x":1408,"y":832},{"name":"a-crate-spider","state":"idle","x":2496,"y":960},{"name":"a-crate","state":"idle","x":2560,"y":960},{"name":"a-crate-coin","state":"idle","x":2560,"y":896},{"name":"a-coin-bag","state":"idle","x":2432,"y":784},{"name":"a-coin-bag","state":"idle","x":1536,"y":784},{"name":"bc-brick2","state":"idle","x":4928,"y":1024},{"name":"bc-brick2","state":"idle","x":4992,"y":1024},{"name":"bc-brick2","state":"idle","x":5056,"y":1024},{"name":"bc-brick2","state":"idle","x":5120,"y":1024},{"name":"bc-brick2","state":"idle","x":5184,"y":1024},{"name":"bc-brick2","state":"idle","x":5248,"y":1024},{"name":"bc-brick2","state":"idle","x":5312,"y":1024},{"name":"bc-brick2","state":"idle","x":5376,"y":1024},{"name":"bc-brick2","state":"idle","x":5440,"y":1024},{"name":"bc-brick2","state":"idle","x":5504,"y":1024},{"name":"bc-brick2","state":"idle","x":5568,"y":1024},{"name":"bc-brick2","state":"idle","x":5632,"y":1024},{"name":"bc-brick2","state":"idle","x":5696,"y":1024},{"name":"bc-brick5","state":"idle","x":4928,"y":1088},{"name":"bc-brick5","state":"idle","x":4928,"y":1152},{"name":"bc-brick5","state":"idle","x":4992,"y":1152},{"name":"bc-brick5","state":"idle","x":4928,"y":1216},{"name":"bc-brick5","state":"idle","x":4992,"y":1216},{"name":"bc-brick5","state":"idle","x":5056,"y":1152},{"name":"bc-brick5","state":"idle","x":4992,"y":1088},{"name":"bc-brick5","state":"idle","x":5056,"y":1088},{"name":"bc-brick5","state":"idle","x":5056,"y":1216},{"name":"bc-brick5","state":"idle","x":5120,"y":1216},{"name":"bc-brick5","state":"idle","x":5120,"y":1152},{"name":"bc-brick5","state":"idle","x":5120,"y":1088},{"name":"bc-brick5","state":"idle","x":5184,"y":1088},{"name":"bc-brick5","state":"idle","x":5184,"y":1152},{"name":"bc-brick5","state":"idle","x":5184,"y":1216},{"name":"bc-brick5","state":"idle","x":5248,"y":1216},{"name":"bc-brick5","state":"idle","x":5248,"y":1152},{"name":"bc-brick5","state":"idle","x":5248,"y":1088},{"name":"bc-brick5","state":"idle","x":5312,"y":1088},{"name":"bc-brick5","state":"idle","x":5312,"y":1152},{"name":"bc-brick5","state":"idle","x":5312,"y":1216},{"name":"bc-brick5","state":"idle","x":5376,"y":1216},{"name":"bc-brick5","state":"idle","x":5376,"y":1152},{"name":"bc-brick5","state":"idle","x":5376,"y":1088},{"name":"bc-brick5","state":"idle","x":5440,"y":1088},{"name":"bc-brick5","state":"idle","x":5440,"y":1152},{"name":"bc-brick5","state":"idle","x":5440,"y":1216},{"name":"bc-brick5","state":"idle","x":5504,"y":1216},{"name":"bc-brick5","state":"idle","x":5504,"y":1152},{"name":"bc-brick5","state":"idle","x":5504,"y":1088},{"name":"bc-brick5","state":"idle","x":5568,"y":1088},{"name":"bc-brick5","state":"idle","x":5568,"y":1152},{"name":"bc-brick5","state":"idle","x":5568,"y":1216},{"name":"bc-brick5","state":"idle","x":5632,"y":1216},{"name":"bc-brick5","state":"idle","x":5632,"y":1152},{"name":"bc-brick5","state":"idle","x":5632,"y":1088},{"name":"bc-brick5","state":"idle","x":5696,"y":1088},{"name":"bc-brick5","state":"idle","x":5696,"y":1152},{"name":"bc-brick5","state":"idle","x":5696,"y":1216},{"name":"a-chess-coin-bag","state":"idle","x":1856,"y":960},{"name":"a-chess-coin-bag","state":"idle","x":2112,"y":960},{"name":"a-block-key","state":"idle","x":1984,"y":576},{"name":"bc-pillar-solid3","state":"idle","x":3520,"y":960},{"name":"bc-pillar-solid1","state":"idle","x":3520,"y":896},{"name":"bc-pillar-solid3","state":"idle","x":3648,"y":960},{"name":"bc-pillar-solid2","state":"idle","x":3648,"y":896},{"name":"bc-pillar-solid1","state":"idle","x":3648,"y":832},{"name":"bc-pillar-solid3","state":"idle","x":3776,"y":960},{"name":"bc-pillar-solid2","state":"idle","x":3776,"y":896},{"name":"bc-pillar-solid2","state":"idle","x":3776,"y":832},{"name":"bc-pillar-solid1","state":"idle","x":3776,"y":768},{"name":"bc-spikes","state":"idle","x":3840,"y":1024},{"name":"bc-spikes","state":"idle","x":3712,"y":1024},{"name":"bc-spikes","state":"idle","x":3584,"y":1024},{"name":"bc-brick3","state":"idle","x":3520,"y":1024},{"name":"bc-brick2","state":"idle","x":3904,"y":1024},{"name":"bc-spikes","state":"idle","x":3968,"y":1024},{"name":"bc-spikes","state":"idle","x":4032,"y":1024},{"name":"bc-pillar-solid3","state":"idle","x":3904,"y":960},{"name":"bc-pillar-solid2","state":"idle","x":3904,"y":896},{"name":"bc-pillar-solid2","state":"idle","x":3904,"y":832},{"name":"bc-pillar-solid1","state":"idle","x":3904,"y":768},{"name":"bc-pillar-solid3","state":"idle","x":4096,"y":960},{"name":"bc-pillar-solid2","state":"idle","x":4096,"y":896},{"name":"bc-pillar-solid2","state":"idle","x":4096,"y":832},{"name":"bc-pillar-solid1","state":"idle","x":4096,"y":768},{"name":"bc-spikes","state":"idle","x":4160,"y":1024},{"name":"bc-pillar-solid3","state":"idle","x":4224,"y":960},{"name":"bc-pillar-solid2","state":"idle","x":4224,"y":896},{"name":"bc-spikes","state":"idle","x":4288,"y":1024},{"name":"bc-pillar-solid3","state":"idle","x":4352,"y":960},{"name":"bc-brick5","state":"idle","x":4352,"y":1152},{"name":"bc-pillar-solid2","state":"idle","x":4224,"y":832},{"name":"bc-pillar-solid1","state":"idle","x":4224,"y":768},{"name":"bc-pillar-solid1","state":"idle","x":4352,"y":832},{"name":"bc-pillar-solid2","state":"idle","x":4352,"y":896},{"name":"bc-spikes","state":"idle","x":4416,"y":1024},{"name":"bc-pillar-solid3","state":"idle","x":4480,"y":960},{"name":"bc-pillar-solid1","state":"idle","x":4480,"y":896},{"name":"bc-pillar3","state":"idle","x":4864,"y":960},{"name":"bc-pillar3","state":"idle","x":5120,"y":960},{"name":"bc-pillar2","state":"idle","x":4864,"y":896},{"name":"bc-pillar2","state":"idle","x":5120,"y":896},{"name":"bc-pillar1","state":"idle","x":4864,"y":832},{"name":"bc-pillar1","state":"idle","x":5120,"y":832},{"name":"a-block","state":"idle","x":4928,"y":896},{"name":"a-block","state":"idle","x":5056,"y":896},{"name":"a-block-health","state":"idle","x":4992,"y":896},{"name":"a-block","state":"idle","x":4928,"y":832},{"name":"a-block","state":"idle","x":4992,"y":832},{"name":"a-block","state":"idle","x":5056,"y":832},{"name":"bc-block2","state":"idle","x":4992,"y":960},{"name":"bc-brick8","state":"idle","x":4928,"y":768},{"name":"bc-brick8","state":"idle","x":4992,"y":768},{"name":"bc-brick8","state":"idle","x":5056,"y":768},{"name":"bc-brick7","state":"idle","x":4864,"y":768},{"name":"bc-brick9","state":"idle","x":5120,"y":768},{"name":"a-block-spider","state":"idle","x":4928,"y":960},{"name":"a-block-spider","state":"idle","x":5056,"y":960},{"name":"spider","state":"walk-left","x":3392,"y":960},{"name":"bat","state":"fly-left","x":2688,"y":448},{"name":"bat","state":"fly-left","x":2176,"y":448},{"name":"bat","state":"fly-left","x":1664,"y":576},{"name":"bat","state":"fly-left","x":5696,"y":256},{"name":"bat","state":"fly-left","x":5056,"y":256},{"name":"bat","state":"fly-left","x":4544,"y":256},{"name":"bat","state":"fly-left","x":3648,"y":256},{"name":"a-blue-sword","state":"idle","x":1984,"y":838}];
	window._levels.push({"tileWidth":64,"tileHeight":64,"width":90,"height":20,"backgroundImage":"#background-town","puzzle":false,"level":2,"name":"Warehouse","x":0,"y":-580,"viewportTop":0,"viewportRight":0,"viewportLeft":0,"backgroundColor":"rgba(2, 10, 23, 1)","sprites":sprites,"state":"pause","viewportBottom":0,"time":0});
}).call(this);