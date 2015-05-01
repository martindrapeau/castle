(function() {
	window._levels || (window._levels = []);
	var sprites = [{"name":"f-grass2","state":"idle","x":0,"y":1088},{"name":"f-grass2","state":"idle","x":64,"y":1088},{"name":"f-grass2","state":"idle","x":128,"y":1088},{"name":"f-grass2","state":"idle","x":192,"y":1088},{"name":"f-grass2","state":"idle","x":256,"y":1088},{"name":"f-grass2","state":"idle","x":320,"y":1088},{"name":"f-grass2","state":"idle","x":384,"y":1088},{"name":"f-grass2","state":"idle","x":448,"y":1088},{"name":"f-grass2","state":"idle","x":512,"y":1088},{"name":"f-grass2","state":"idle","x":576,"y":1088},{"name":"f-grass2","state":"idle","x":640,"y":1088},{"name":"f-grass2","state":"idle","x":704,"y":1088},{"name":"f-grass2","state":"idle","x":768,"y":1088},{"name":"f-grass2","state":"idle","x":832,"y":1088},{"name":"f-ground2","state":"idle","x":0,"y":1152},{"name":"f-ground2","state":"idle","x":0,"y":1216},{"name":"f-ground2","state":"idle","x":64,"y":1152},{"name":"f-ground2","state":"idle","x":64,"y":1216},{"name":"f-ground2","state":"idle","x":128,"y":1216},{"name":"f-ground2","state":"idle","x":128,"y":1152},{"name":"f-ground2","state":"idle","x":192,"y":1152},{"name":"f-ground2","state":"idle","x":192,"y":1216},{"name":"f-ground2","state":"idle","x":256,"y":1216},{"name":"f-ground2","state":"idle","x":256,"y":1152},{"name":"f-ground2","state":"idle","x":320,"y":1152},{"name":"f-ground2","state":"idle","x":320,"y":1216},{"name":"f-ground2","state":"idle","x":384,"y":1216},{"name":"f-ground2","state":"idle","x":384,"y":1152},{"name":"f-ground2","state":"idle","x":448,"y":1152},{"name":"f-ground2","state":"idle","x":448,"y":1216},{"name":"f-ground2","state":"idle","x":512,"y":1152},{"name":"f-ground2","state":"idle","x":512,"y":1216},{"name":"f-ground2","state":"idle","x":576,"y":1216},{"name":"f-ground2","state":"idle","x":576,"y":1152},{"name":"f-ground2","state":"idle","x":640,"y":1152},{"name":"f-ground2","state":"idle","x":640,"y":1216},{"name":"f-ground2","state":"idle","x":704,"y":1216},{"name":"f-ground2","state":"idle","x":704,"y":1152},{"name":"f-ground2","state":"idle","x":768,"y":1152},{"name":"f-ground2","state":"idle","x":768,"y":1216},{"name":"f-ground2","state":"idle","x":832,"y":1216},{"name":"f-ground2","state":"idle","x":832,"y":1152},{"name":"f-ground2","state":"idle","x":896,"y":1216},{"name":"f-sign1","state":"idle","x":64,"y":1024},{"name":"f-water","state":"idle","x":960,"y":1152},{"name":"f-ground8","state":"idle","x":896,"y":1152},{"name":"f-grass3","state":"idle","x":896,"y":1088},{"name":"f-water2","state":"idle","x":960,"y":1216},{"name":"f-water2","state":"idle","x":1024,"y":1216},{"name":"f-water2","state":"idle","x":1088,"y":1216},{"name":"f-grass1","state":"idle","x":1152,"y":1088},{"name":"f-ground7","state":"idle","x":1152,"y":1152},{"name":"f-ground2","state":"idle","x":1152,"y":1216},{"name":"f-ground2","state":"idle","x":1216,"y":1216},{"name":"f-ground2","state":"idle","x":1216,"y":1152},{"name":"f-ground2","state":"idle","x":1280,"y":1152},{"name":"f-ground2","state":"idle","x":1280,"y":1216},{"name":"f-ground2","state":"idle","x":1344,"y":1216},{"name":"f-ground2","state":"idle","x":1344,"y":1152},{"name":"f-water","state":"idle","x":1088,"y":1152},{"name":"f-water","state":"idle","x":1024,"y":1152},{"name":"f-grass2","state":"idle","x":1216,"y":1088},{"name":"f-grass2","state":"idle","x":1280,"y":1088},{"name":"f-grass2","state":"idle","x":1344,"y":1088},{"name":"f-grass1","state":"idle","x":1408,"y":1024},{"name":"f-ground7","state":"idle","x":1408,"y":1088},{"name":"f-grass2","state":"idle","x":1472,"y":1024},{"name":"f-grass2","state":"idle","x":1536,"y":1024},{"name":"f-grass1","state":"idle","x":1600,"y":960},{"name":"f-ground7","state":"idle","x":1600,"y":1024},{"name":"f-ground2","state":"idle","x":1408,"y":1152},{"name":"f-ground2","state":"idle","x":1408,"y":1216},{"name":"f-ground2","state":"idle","x":1472,"y":1088},{"name":"f-ground2","state":"idle","x":1472,"y":1152},{"name":"f-ground2","state":"idle","x":1472,"y":1216},{"name":"f-ground2","state":"idle","x":1536,"y":1216},{"name":"f-ground2","state":"idle","x":1536,"y":1088},{"name":"f-ground2","state":"idle","x":1536,"y":1152},{"name":"f-ground2","state":"idle","x":1600,"y":1088},{"name":"f-ground2","state":"idle","x":1600,"y":1152},{"name":"f-ground2","state":"idle","x":1600,"y":1216},{"name":"f-ground2","state":"idle","x":1664,"y":1216},{"name":"f-ground2","state":"idle","x":1664,"y":1088},{"name":"f-ground2","state":"idle","x":1664,"y":1152},{"name":"f-ground2","state":"idle","x":1664,"y":1024},{"name":"f-ground2","state":"idle","x":1728,"y":1024},{"name":"f-ground2","state":"idle","x":1728,"y":1088},{"name":"f-ground2","state":"idle","x":1728,"y":1152},{"name":"f-ground2","state":"idle","x":1728,"y":1216},{"name":"f-ground2","state":"idle","x":1792,"y":1216},{"name":"f-ground2","state":"idle","x":1792,"y":1088},{"name":"f-ground2","state":"idle","x":1792,"y":1152},{"name":"f-ground2","state":"idle","x":1792,"y":1024},{"name":"f-grass2","state":"idle","x":1664,"y":960},{"name":"f-grass2","state":"idle","x":1728,"y":960},{"name":"f-grass1","state":"idle","x":1792,"y":896},{"name":"f-ground7","state":"idle","x":1792,"y":960},{"name":"f-ground2","state":"idle","x":1856,"y":960},{"name":"f-ground2","state":"idle","x":1856,"y":1024},{"name":"f-ground2","state":"idle","x":1856,"y":1088},{"name":"f-ground2","state":"idle","x":1856,"y":1152},{"name":"f-ground2","state":"idle","x":1856,"y":1216},{"name":"f-ground2","state":"idle","x":1920,"y":1216},{"name":"f-ground2","state":"idle","x":2048,"y":1216},{"name":"f-ground2","state":"idle","x":1984,"y":1216},{"name":"f-ground2","state":"idle","x":1984,"y":1152},{"name":"f-ground2","state":"idle","x":1920,"y":1152},{"name":"f-ground2","state":"idle","x":2048,"y":1152},{"name":"f-ground2","state":"idle","x":2048,"y":1088},{"name":"f-ground2","state":"idle","x":1984,"y":1088},{"name":"f-ground2","state":"idle","x":1920,"y":1088},{"name":"f-ground2","state":"idle","x":1920,"y":1024},{"name":"f-ground2","state":"idle","x":1984,"y":1024},{"name":"f-ground2","state":"idle","x":2048,"y":1024},{"name":"f-ground2","state":"idle","x":2048,"y":960},{"name":"f-ground2","state":"idle","x":1984,"y":960},{"name":"f-ground2","state":"idle","x":1920,"y":960},{"name":"f-grass2","state":"idle","x":1856,"y":896},{"name":"f-grass2","state":"idle","x":1920,"y":896},{"name":"f-grass2","state":"idle","x":1984,"y":896},{"name":"f-grass2","state":"idle","x":2048,"y":896},{"name":"f-fence1","state":"idle","x":1856,"y":832},{"name":"f-fence2","state":"idle","x":1920,"y":832},{"name":"f-fence1","state":"idle","x":1984,"y":832},{"name":"f-fence2","state":"idle","x":2048,"y":832},{"name":"f-ground2","state":"idle","x":2112,"y":960},{"name":"f-ground2","state":"idle","x":2112,"y":1024},{"name":"f-ground2","state":"idle","x":2112,"y":1088},{"name":"f-ground2","state":"idle","x":2112,"y":1152},{"name":"f-ground2","state":"idle","x":2112,"y":1216},{"name":"f-ground2","state":"idle","x":2176,"y":1152},{"name":"f-ground2","state":"idle","x":2176,"y":1216},{"name":"f-ground2","state":"idle","x":2176,"y":1088},{"name":"f-ground2","state":"idle","x":2176,"y":1024},{"name":"f-ground2","state":"idle","x":2176,"y":960},{"name":"f-ground2","state":"idle","x":2240,"y":960},{"name":"f-ground2","state":"idle","x":2240,"y":1024},{"name":"f-ground2","state":"idle","x":2240,"y":1088},{"name":"f-ground2","state":"idle","x":2240,"y":1152},{"name":"f-ground2","state":"idle","x":2240,"y":1216},{"name":"f-ground2","state":"idle","x":2304,"y":1216},{"name":"f-ground2","state":"idle","x":2304,"y":1152},{"name":"f-ground2","state":"idle","x":2304,"y":1088},{"name":"f-ground2","state":"idle","x":2304,"y":1024},{"name":"f-ground2","state":"idle","x":2304,"y":960},{"name":"f-grass2","state":"idle","x":2112,"y":896},{"name":"f-grass2","state":"idle","x":2176,"y":896},{"name":"f-grass2","state":"idle","x":2240,"y":896},{"name":"f-grass2","state":"idle","x":2304,"y":896},{"name":"f-grass2","state":"idle","x":2368,"y":896},{"name":"f-grass2","state":"idle","x":2432,"y":896},{"name":"f-grass2","state":"idle","x":2496,"y":896},{"name":"f-grass2","state":"idle","x":2560,"y":896},{"name":"f-grass2","state":"idle","x":2688,"y":896},{"name":"f-grass2","state":"idle","x":2624,"y":896},{"name":"f-grass2","state":"idle","x":2752,"y":896},{"name":"f-grass2","state":"idle","x":2816,"y":896},{"name":"f-grass2","state":"idle","x":2880,"y":896},{"name":"f-grass2","state":"idle","x":2944,"y":896},{"name":"f-grass2","state":"idle","x":3008,"y":896},{"name":"f-grass2","state":"idle","x":3072,"y":896},{"name":"f-grass2","state":"idle","x":3136,"y":896},{"name":"f-grass2","state":"idle","x":3200,"y":896},{"name":"f-grass2","state":"idle","x":3264,"y":896},{"name":"f-grass2","state":"idle","x":3328,"y":896},{"name":"f-grass2","state":"idle","x":3392,"y":896},{"name":"f-grass2","state":"idle","x":3456,"y":896},{"name":"f-grass2","state":"idle","x":3520,"y":896},{"name":"f-ground2","state":"idle","x":2368,"y":960},{"name":"f-ground2","state":"idle","x":2368,"y":1024},{"name":"f-ground2","state":"idle","x":2368,"y":1088},{"name":"f-ground2","state":"idle","x":2368,"y":1152},{"name":"f-ground2","state":"idle","x":2368,"y":1216},{"name":"f-ground2","state":"idle","x":2432,"y":1216},{"name":"f-ground2","state":"idle","x":2432,"y":1088},{"name":"f-ground2","state":"idle","x":2432,"y":1152},{"name":"f-ground2","state":"idle","x":2432,"y":1024},{"name":"f-ground2","state":"idle","x":2432,"y":960},{"name":"f-ground2","state":"idle","x":2496,"y":960},{"name":"f-ground2","state":"idle","x":2496,"y":1024},{"name":"f-ground2","state":"idle","x":2496,"y":1088},{"name":"f-ground2","state":"idle","x":2496,"y":1152},{"name":"f-ground2","state":"idle","x":2496,"y":1216},{"name":"f-ground2","state":"idle","x":2560,"y":1216},{"name":"f-ground2","state":"idle","x":2560,"y":1152},{"name":"f-ground2","state":"idle","x":2560,"y":1088},{"name":"f-ground2","state":"idle","x":2560,"y":960},{"name":"f-ground2","state":"idle","x":2560,"y":1024},{"name":"f-ground2","state":"idle","x":2624,"y":960},{"name":"f-ground2","state":"idle","x":2624,"y":1024},{"name":"f-ground2","state":"idle","x":2624,"y":1152},{"name":"f-ground2","state":"idle","x":2624,"y":1088},{"name":"f-ground2","state":"idle","x":2688,"y":1088},{"name":"f-ground2","state":"idle","x":2688,"y":1024},{"name":"f-ground2","state":"idle","x":2752,"y":960},{"name":"f-ground2","state":"idle","x":2688,"y":960},{"name":"f-ground2","state":"idle","x":2752,"y":1024},{"name":"f-ground2","state":"idle","x":2752,"y":1088},{"name":"f-ground2","state":"idle","x":2688,"y":1152},{"name":"f-ground2","state":"idle","x":2752,"y":1152},{"name":"f-ground2","state":"idle","x":2752,"y":1216},{"name":"f-ground2","state":"idle","x":2688,"y":1216},{"name":"f-ground2","state":"idle","x":2624,"y":1216},{"name":"f-ground2","state":"idle","x":2816,"y":1216},{"name":"f-ground2","state":"idle","x":2944,"y":1216},{"name":"f-ground2","state":"idle","x":2880,"y":1216},{"name":"f-ground2","state":"idle","x":2880,"y":1152},{"name":"f-ground2","state":"idle","x":2816,"y":1152},{"name":"f-ground2","state":"idle","x":2944,"y":1152},{"name":"f-ground2","state":"idle","x":2944,"y":1088},{"name":"f-ground2","state":"idle","x":2880,"y":1088},{"name":"f-ground2","state":"idle","x":2816,"y":1088},{"name":"f-ground2","state":"idle","x":2816,"y":1024},{"name":"f-ground2","state":"idle","x":2880,"y":1024},{"name":"f-ground2","state":"idle","x":2944,"y":1024},{"name":"f-ground2","state":"idle","x":2944,"y":960},{"name":"f-ground2","state":"idle","x":2816,"y":960},{"name":"f-ground2","state":"idle","x":2880,"y":960},{"name":"f-ground2","state":"idle","x":3008,"y":960},{"name":"f-ground2","state":"idle","x":3072,"y":960},{"name":"f-ground2","state":"idle","x":3200,"y":960},{"name":"f-ground2","state":"idle","x":3136,"y":960},{"name":"f-ground2","state":"idle","x":3136,"y":1024},{"name":"f-ground2","state":"idle","x":3072,"y":1024},{"name":"f-ground2","state":"idle","x":3008,"y":1024},{"name":"f-ground2","state":"idle","x":3008,"y":1088},{"name":"f-ground2","state":"idle","x":3072,"y":1088},{"name":"f-ground2","state":"idle","x":3136,"y":1088},{"name":"f-ground2","state":"idle","x":3136,"y":1152},{"name":"f-ground2","state":"idle","x":3008,"y":1152},{"name":"f-ground2","state":"idle","x":3072,"y":1152},{"name":"f-ground2","state":"idle","x":3072,"y":1216},{"name":"f-ground2","state":"idle","x":3008,"y":1216},{"name":"f-ground2","state":"idle","x":3136,"y":1216},{"name":"f-ground2","state":"idle","x":3200,"y":1216},{"name":"f-ground2","state":"idle","x":3200,"y":1088},{"name":"f-ground2","state":"idle","x":3200,"y":1152},{"name":"f-ground2","state":"idle","x":3200,"y":1024},{"name":"f-ground2","state":"idle","x":3264,"y":960},{"name":"f-ground2","state":"idle","x":3264,"y":1024},{"name":"f-ground2","state":"idle","x":3264,"y":1088},{"name":"f-ground2","state":"idle","x":3264,"y":1152},{"name":"f-ground2","state":"idle","x":3328,"y":1216},{"name":"f-ground2","state":"idle","x":3264,"y":1216},{"name":"f-ground2","state":"idle","x":3328,"y":1152},{"name":"f-ground2","state":"idle","x":3392,"y":1216},{"name":"f-ground2","state":"idle","x":3392,"y":1152},{"name":"f-ground2","state":"idle","x":3392,"y":1088},{"name":"f-ground2","state":"idle","x":3328,"y":1088},{"name":"f-ground2","state":"idle","x":3328,"y":1024},{"name":"f-ground2","state":"idle","x":3392,"y":1024},{"name":"f-ground2","state":"idle","x":3392,"y":960},{"name":"f-ground2","state":"idle","x":3328,"y":960},{"name":"f-ground2","state":"idle","x":3456,"y":960},{"name":"f-ground2","state":"idle","x":3520,"y":960},{"name":"f-ground2","state":"idle","x":3520,"y":1024},{"name":"f-ground2","state":"idle","x":3456,"y":1024},{"name":"f-ground2","state":"idle","x":3456,"y":1088},{"name":"f-ground2","state":"idle","x":3520,"y":1088},{"name":"f-ground2","state":"idle","x":3520,"y":1152},{"name":"f-ground2","state":"idle","x":3456,"y":1152},{"name":"f-ground2","state":"idle","x":3456,"y":1216},{"name":"f-ground2","state":"idle","x":3520,"y":1216},{"name":"h-2-coin-bag","state":"idle","x":2304,"y":512},{"name":"h-1-coin-bag","state":"idle","x":3200,"y":512},{"name":"h-3-key","state":"idle","x":2752,"y":512},{"name":"f-grass2","state":"idle","x":3584,"y":896},{"name":"f-grass2","state":"idle","x":3648,"y":896},{"name":"f-grass2","state":"idle","x":3712,"y":896},{"name":"f-grass2","state":"idle","x":3776,"y":896},{"name":"f-grass2","state":"idle","x":3840,"y":896},{"name":"f-grass2","state":"idle","x":3904,"y":896},{"name":"f-grass2","state":"idle","x":3968,"y":896},{"name":"f-grass2","state":"idle","x":4032,"y":896},{"name":"f-grass2","state":"idle","x":4096,"y":896},{"name":"f-grass2","state":"idle","x":4160,"y":896},{"name":"f-grass2","state":"idle","x":4224,"y":896},{"name":"f-fence1","state":"idle","x":2112,"y":832},{"name":"f-fence2","state":"idle","x":2176,"y":832},{"name":"f-fence1","state":"idle","x":2240,"y":832},{"name":"a-hay","state":"idle","x":3840,"y":832},{"name":"a-hay","state":"idle","x":3968,"y":832},{"name":"a-hay","state":"idle","x":3904,"y":768},{"name":"a-hay","state":"idle","x":3968,"y":768},{"name":"a-hay","state":"idle","x":4032,"y":768},{"name":"a-hay","state":"idle","x":4032,"y":704},{"name":"a-hay","state":"idle","x":4032,"y":640},{"name":"a-hay","state":"idle","x":3968,"y":640},{"name":"f-fence1","state":"idle","x":3712,"y":832},{"name":"f-fence2","state":"idle","x":3776,"y":832},{"name":"f-fence1","state":"idle","x":4096,"y":832},{"name":"f-fence2","state":"idle","x":4160,"y":832},{"name":"f-grass2","state":"idle","x":4288,"y":896},{"name":"f-grass3","state":"idle","x":4352,"y":896},{"name":"f-grass2","state":"idle","x":4416,"y":960},{"name":"f-grass2","state":"idle","x":4480,"y":960},{"name":"f-grass2","state":"idle","x":4544,"y":960},{"name":"f-grass3","state":"idle","x":4608,"y":960},{"name":"f-ground8","state":"idle","x":4352,"y":960},{"name":"f-ground2","state":"idle","x":4224,"y":960},{"name":"f-ground2","state":"idle","x":4288,"y":960},{"name":"f-ground2","state":"idle","x":4288,"y":1024},{"name":"f-ground2","state":"idle","x":4224,"y":1024},{"name":"f-ground2","state":"idle","x":4224,"y":1088},{"name":"f-ground2","state":"idle","x":4288,"y":1088},{"name":"f-ground2","state":"idle","x":4288,"y":1152},{"name":"f-ground2","state":"idle","x":4224,"y":1152},{"name":"f-ground2","state":"idle","x":4224,"y":1216},{"name":"f-ground2","state":"idle","x":4288,"y":1216},{"name":"f-ground2","state":"idle","x":4352,"y":1216},{"name":"f-ground2","state":"idle","x":4352,"y":1088},{"name":"f-ground2","state":"idle","x":4352,"y":1024},{"name":"f-ground2","state":"idle","x":4352,"y":1152},{"name":"f-ground2","state":"idle","x":4416,"y":1152},{"name":"f-ground2","state":"idle","x":4416,"y":1088},{"name":"f-ground2","state":"idle","x":4416,"y":1024},{"name":"f-ground2","state":"idle","x":4416,"y":1216},{"name":"f-ground2","state":"idle","x":4480,"y":1216},{"name":"f-ground2","state":"idle","x":4480,"y":1152},{"name":"f-ground2","state":"idle","x":4480,"y":1088},{"name":"f-ground2","state":"idle","x":4480,"y":1024},{"name":"f-ground2","state":"idle","x":4544,"y":1024},{"name":"f-ground2","state":"idle","x":4544,"y":1088},{"name":"f-ground2","state":"idle","x":4544,"y":1152},{"name":"f-ground2","state":"idle","x":4544,"y":1216},{"name":"f-ground2","state":"idle","x":4160,"y":960},{"name":"f-ground2","state":"idle","x":4096,"y":960},{"name":"f-ground2","state":"idle","x":4032,"y":960},{"name":"f-ground2","state":"idle","x":4032,"y":1024},{"name":"f-ground2","state":"idle","x":4096,"y":1024},{"name":"f-ground2","state":"idle","x":4160,"y":1024},{"name":"f-ground2","state":"idle","x":4160,"y":1088},{"name":"f-ground2","state":"idle","x":4096,"y":1088},{"name":"f-ground2","state":"idle","x":4032,"y":1088},{"name":"f-ground2","state":"idle","x":4032,"y":1152},{"name":"f-ground2","state":"idle","x":4096,"y":1152},{"name":"f-ground2","state":"idle","x":4160,"y":1152},{"name":"f-ground2","state":"idle","x":4160,"y":1216},{"name":"f-ground2","state":"idle","x":4032,"y":1216},{"name":"f-ground2","state":"idle","x":4096,"y":1216},{"name":"f-ground2","state":"idle","x":3968,"y":1216},{"name":"f-ground2","state":"idle","x":3968,"y":1152},{"name":"f-ground2","state":"idle","x":3968,"y":1088},{"name":"f-ground2","state":"idle","x":3968,"y":1024},{"name":"f-ground2","state":"idle","x":3968,"y":960},{"name":"f-ground2","state":"idle","x":3904,"y":960},{"name":"f-ground2","state":"idle","x":3904,"y":1024},{"name":"f-ground2","state":"idle","x":3904,"y":1088},{"name":"f-ground2","state":"idle","x":3904,"y":1152},{"name":"f-ground2","state":"idle","x":3904,"y":1216},{"name":"f-ground2","state":"idle","x":3840,"y":1216},{"name":"f-ground2","state":"idle","x":3776,"y":1216},{"name":"f-ground2","state":"idle","x":3776,"y":1152},{"name":"f-ground2","state":"idle","x":3840,"y":1152},{"name":"f-ground2","state":"idle","x":3840,"y":1088},{"name":"f-ground2","state":"idle","x":3776,"y":1088},{"name":"f-ground2","state":"idle","x":3776,"y":1024},{"name":"f-ground2","state":"idle","x":3840,"y":1024},{"name":"f-ground2","state":"idle","x":3840,"y":960},{"name":"f-ground2","state":"idle","x":3776,"y":960},{"name":"f-ground2","state":"idle","x":3584,"y":960},{"name":"f-ground2","state":"idle","x":3648,"y":960},{"name":"f-ground2","state":"idle","x":3712,"y":960},{"name":"f-ground2","state":"idle","x":3712,"y":1024},{"name":"f-ground2","state":"idle","x":3648,"y":1024},{"name":"f-ground2","state":"idle","x":3584,"y":1024},{"name":"f-ground2","state":"idle","x":3648,"y":1088},{"name":"f-ground2","state":"idle","x":3584,"y":1088},{"name":"f-ground2","state":"idle","x":3584,"y":1152},{"name":"f-ground2","state":"idle","x":3584,"y":1216},{"name":"f-ground2","state":"idle","x":3648,"y":1216},{"name":"f-ground2","state":"idle","x":3648,"y":1152},{"name":"f-ground2","state":"idle","x":3712,"y":1152},{"name":"f-ground2","state":"idle","x":3712,"y":1216},{"name":"f-ground2","state":"idle","x":3712,"y":1088},{"name":"f-ground3","state":"idle","x":4608,"y":1024},{"name":"f-ground8","state":"idle","x":4608,"y":1152},{"name":"f-ground3","state":"idle","x":4608,"y":1088},{"name":"f-ground2","state":"idle","x":4608,"y":1216},{"name":"f-water","state":"idle","x":4672,"y":1152},{"name":"f-water","state":"idle","x":4736,"y":1152},{"name":"f-water","state":"idle","x":4800,"y":1152},{"name":"f-water2","state":"idle","x":4800,"y":1216},{"name":"f-water2","state":"idle","x":4736,"y":1216},{"name":"f-water2","state":"idle","x":4672,"y":1216},{"name":"f-grass1","state":"idle","x":4864,"y":960},{"name":"f-ground1","state":"idle","x":4864,"y":1024},{"name":"f-ground1","state":"idle","x":4864,"y":1088},{"name":"f-ground7","state":"idle","x":4864,"y":1152},{"name":"f-ground2","state":"idle","x":4864,"y":1216},{"name":"f-ground2","state":"idle","x":4928,"y":1216},{"name":"f-ground8","state":"idle","x":4928,"y":1152},{"name":"f-ground3","state":"idle","x":4928,"y":1088},{"name":"f-ground3","state":"idle","x":4928,"y":1024},{"name":"f-grass3","state":"idle","x":4928,"y":960},{"name":"f-grass1","state":"idle","x":5248,"y":960},{"name":"f-ground1","state":"idle","x":5248,"y":1024},{"name":"f-ground1","state":"idle","x":5248,"y":1088},{"name":"f-ground7","state":"idle","x":5248,"y":1152},{"name":"f-ground2","state":"idle","x":5248,"y":1216},{"name":"f-ground2","state":"idle","x":5312,"y":1216},{"name":"f-water","state":"idle","x":4992,"y":1152},{"name":"f-water","state":"idle","x":5056,"y":1152},{"name":"f-water","state":"idle","x":5120,"y":1152},{"name":"f-water","state":"idle","x":5184,"y":1152},{"name":"f-water2","state":"idle","x":5184,"y":1216},{"name":"f-water2","state":"idle","x":5120,"y":1216},{"name":"f-water2","state":"idle","x":5056,"y":1216},{"name":"f-water2","state":"idle","x":4992,"y":1216},{"name":"f-ground2","state":"idle","x":5312,"y":1152},{"name":"f-ground2","state":"idle","x":5312,"y":1088},{"name":"f-ground2","state":"idle","x":5376,"y":1088},{"name":"f-ground2","state":"idle","x":5376,"y":1152},{"name":"f-ground2","state":"idle","x":5376,"y":1216},{"name":"f-ground2","state":"idle","x":5440,"y":1216},{"name":"f-ground2","state":"idle","x":5440,"y":1152},{"name":"f-ground2","state":"idle","x":5440,"y":1088},{"name":"f-ground2","state":"idle","x":5504,"y":1088},{"name":"f-ground2","state":"idle","x":5504,"y":1152},{"name":"f-ground2","state":"idle","x":5504,"y":1216},{"name":"f-ground2","state":"idle","x":5568,"y":1216},{"name":"f-ground2","state":"idle","x":5568,"y":1152},{"name":"f-ground2","state":"idle","x":5568,"y":1088},{"name":"f-ground2","state":"idle","x":5632,"y":1088},{"name":"f-ground2","state":"idle","x":5632,"y":1216},{"name":"f-ground2","state":"idle","x":5632,"y":1152},{"name":"f-ground2","state":"idle","x":5696,"y":1152},{"name":"f-ground2","state":"idle","x":5696,"y":1216},{"name":"f-ground2","state":"idle","x":5696,"y":1088},{"name":"f-ground2","state":"idle","x":5696,"y":1024},{"name":"f-ground2","state":"idle","x":5568,"y":1024},{"name":"f-ground2","state":"idle","x":5632,"y":1024},{"name":"f-ground2","state":"idle","x":5504,"y":1024},{"name":"f-ground2","state":"idle","x":5440,"y":1024},{"name":"f-ground2","state":"idle","x":5376,"y":1024},{"name":"f-ground2","state":"idle","x":5312,"y":1024},{"name":"f-grass2","state":"idle","x":5312,"y":960},{"name":"f-grass2","state":"idle","x":5376,"y":960},{"name":"f-grass2","state":"idle","x":5440,"y":960},{"name":"f-grass2","state":"idle","x":5504,"y":960},{"name":"f-grass2","state":"idle","x":5568,"y":960},{"name":"f-grass2","state":"idle","x":5632,"y":960},{"name":"f-grass2","state":"idle","x":5696,"y":960},{"name":"f-sign2","state":"idle","x":5568,"y":896},{"name":"f-bush1","state":"idle","x":1216,"y":1024},{"name":"f-bush2","state":"idle","x":1280,"y":1024},{"name":"f-bush2","state":"idle","x":448,"y":1024},{"name":"f-bush1","state":"idle","x":384,"y":1024},{"name":"hero1","state":"idle-right","x":0,"y":964,"nextState":"idle-right","velocity":0,"acceleration":0,"yVelocity":0,"yAcceleration":0},{"name":"a-hay-coin","state":"idle","x":3904,"y":832},{"name":"a-hay-coin","state":"idle","x":3840,"y":768},{"name":"a-hay-spider","state":"idle","x":3648,"y":832},{"name":"a-hay-health","state":"idle","x":4032,"y":832},{"name":"a-hay-death","state":"idle","x":3968,"y":704},{"name":"orc","state":"walk-left","x":1984,"y":780},{"name":"orc","state":"walk-left","x":3264,"y":780}];
	window._levels.push({"tileWidth":64,"tileHeight":64,"width":90,"height":20,"backgroundImage":"#backgrounds","backgroundImageY":0,"backgroundImageWidth":1024,"backgroundImageHeight":300,"backgroundImageStretch":false,"puzzle":false,"level":9,"name":"Village 2","x":0,"y":-580,"viewportTop":0,"viewportRight":0,"viewportLeft":0,"backgroundColor":"#4BACC6","sprites":sprites,"state":"pause","viewportBottom":0,"time":0});
}).call(this);