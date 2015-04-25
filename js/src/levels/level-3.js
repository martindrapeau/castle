(function() {
	window._levels || (window._levels = []);
	var sprites = [{"name":"bc-brick5","state":"idle","x":0,"y":1216},{"name":"bc-brick5","state":"idle","x":0,"y":1152},{"name":"bc-brick2","state":"idle","x":0,"y":1024},{"name":"bc-brick5","state":"idle","x":64,"y":1088},{"name":"bc-brick5","state":"idle","x":64,"y":1152},{"name":"bc-brick5","state":"idle","x":64,"y":1216},{"name":"bc-brick5","state":"idle","x":192,"y":1216},{"name":"bc-brick5","state":"idle","x":128,"y":1216},{"name":"bc-brick5","state":"idle","x":128,"y":1088},{"name":"bc-brick5","state":"idle","x":192,"y":1088},{"name":"bc-brick5","state":"idle","x":192,"y":1152},{"name":"bc-brick5","state":"idle","x":256,"y":1216},{"name":"bc-brick5","state":"idle","x":256,"y":1152},{"name":"bc-brick5","state":"idle","x":256,"y":1088},{"name":"bc-brick5","state":"idle","x":320,"y":1152},{"name":"bc-brick5","state":"idle","x":320,"y":1216},{"name":"bc-brick5","state":"idle","x":384,"y":1216},{"name":"bc-brick5","state":"idle","x":384,"y":1152},{"name":"bc-brick5","state":"idle","x":384,"y":1088},{"name":"bc-brick5","state":"idle","x":448,"y":1152},{"name":"bc-brick5","state":"idle","x":448,"y":1088},{"name":"bc-brick5","state":"idle","x":448,"y":1216},{"name":"bc-brick5","state":"idle","x":512,"y":1216},{"name":"bc-brick5","state":"idle","x":512,"y":1088},{"name":"bc-brick5","state":"idle","x":576,"y":1088},{"name":"bc-brick5","state":"idle","x":576,"y":1152},{"name":"bc-brick5","state":"idle","x":576,"y":1216},{"name":"bc-brick5","state":"idle","x":640,"y":1216},{"name":"bc-brick5","state":"idle","x":640,"y":1152},{"name":"bc-brick5","state":"idle","x":640,"y":1088},{"name":"bc-brick5","state":"idle","x":704,"y":1088},{"name":"bc-brick5","state":"idle","x":704,"y":1152},{"name":"bc-brick5","state":"idle","x":704,"y":1216},{"name":"bc-brick5","state":"idle","x":768,"y":1216},{"name":"bc-brick5","state":"idle","x":768,"y":1152},{"name":"bc-brick2","state":"idle","x":64,"y":1024},{"name":"bc-brick2","state":"idle","x":128,"y":1024},{"name":"bc-brick2","state":"idle","x":192,"y":1024},{"name":"bc-brick2","state":"idle","x":256,"y":1024},{"name":"bc-brick2","state":"idle","x":320,"y":1024},{"name":"bc-brick2","state":"idle","x":384,"y":1024},{"name":"bc-brick2","state":"idle","x":448,"y":1024},{"name":"bc-brick2","state":"idle","x":512,"y":1024},{"name":"bc-brick2","state":"idle","x":576,"y":1024},{"name":"bc-brick2","state":"idle","x":640,"y":1024},{"name":"bc-brick2","state":"idle","x":704,"y":1024},{"name":"bc-brick2","state":"idle","x":768,"y":1024},{"name":"bc-block1","state":"idle","x":0,"y":1088},{"name":"bc-block1","state":"idle","x":128,"y":1152},{"name":"bc-block2","state":"idle","x":320,"y":1088},{"name":"bc-block2","state":"idle","x":512,"y":1152},{"name":"bc-block1","state":"idle","x":768,"y":1088},{"name":"bc-brick5","state":"idle","x":832,"y":1088},{"name":"bc-brick5","state":"idle","x":832,"y":1152},{"name":"bc-brick5","state":"idle","x":832,"y":1216},{"name":"bc-brick5","state":"idle","x":896,"y":1216},{"name":"bc-brick5","state":"idle","x":896,"y":1152},{"name":"bc-brick5","state":"idle","x":896,"y":1088},{"name":"bc-brick5","state":"idle","x":960,"y":1088},{"name":"bc-brick5","state":"idle","x":960,"y":1216},{"name":"bc-brick2","state":"idle","x":832,"y":1024},{"name":"bc-brick2","state":"idle","x":896,"y":1024},{"name":"bc-brick2","state":"idle","x":960,"y":1024},{"name":"bc-pillar2","state":"idle","x":832,"y":896},{"name":"bc-pillar1","state":"idle","x":832,"y":832},{"name":"bc-brick7","state":"idle","x":832,"y":768},{"name":"bc-brick8","state":"idle","x":896,"y":768},{"name":"bc-brick8","state":"idle","x":960,"y":768},{"name":"bc-brick8","state":"idle","x":1024,"y":768},{"name":"bc-brick9","state":"idle","x":1088,"y":768},{"name":"bc-pillar1","state":"idle","x":1088,"y":832},{"name":"bc-pillar2","state":"idle","x":1088,"y":896},{"name":"bc-brick2","state":"idle","x":1024,"y":1024},{"name":"bc-brick2","state":"idle","x":1088,"y":1024},{"name":"bc-brick2","state":"idle","x":1152,"y":1024},{"name":"bc-brick5","state":"idle","x":1024,"y":1088},{"name":"bc-brick5","state":"idle","x":1024,"y":1152},{"name":"bc-brick5","state":"idle","x":1024,"y":1216},{"name":"bc-brick5","state":"idle","x":1088,"y":1216},{"name":"bc-brick5","state":"idle","x":1088,"y":1152},{"name":"bc-brick5","state":"idle","x":1088,"y":1088},{"name":"bc-brick5","state":"idle","x":1152,"y":1088},{"name":"bc-brick5","state":"idle","x":1152,"y":1152},{"name":"bc-brick5","state":"idle","x":1152,"y":1216},{"name":"bc-brick5","state":"idle","x":1216,"y":1216},{"name":"bc-brick5","state":"idle","x":1216,"y":1152},{"name":"bc-brick5","state":"idle","x":1280,"y":1088},{"name":"bc-brick5","state":"idle","x":1280,"y":1152},{"name":"bc-brick5","state":"idle","x":1280,"y":1216},{"name":"bc-brick5","state":"idle","x":1344,"y":1216},{"name":"bc-brick5","state":"idle","x":1344,"y":1152},{"name":"bc-brick5","state":"idle","x":1344,"y":1088},{"name":"bc-brick5","state":"idle","x":1408,"y":1088},{"name":"bc-brick5","state":"idle","x":1408,"y":1152},{"name":"bc-brick5","state":"idle","x":1408,"y":1216},{"name":"bc-brick5","state":"idle","x":1472,"y":1088},{"name":"bc-brick5","state":"idle","x":1472,"y":1216},{"name":"bc-brick5","state":"idle","x":1536,"y":1088},{"name":"bc-brick5","state":"idle","x":1536,"y":1216},{"name":"bc-brick5","state":"idle","x":1536,"y":1152},{"name":"bc-brick5","state":"idle","x":1600,"y":1088},{"name":"bc-brick5","state":"idle","x":1600,"y":1152},{"name":"bc-brick5","state":"idle","x":1600,"y":1216},{"name":"bc-brick2","state":"idle","x":1216,"y":1024},{"name":"bc-brick2","state":"idle","x":1280,"y":1024},{"name":"bc-brick2","state":"idle","x":1344,"y":1024},{"name":"bc-brick2","state":"idle","x":1408,"y":1024},{"name":"bc-brick2","state":"idle","x":1472,"y":1024},{"name":"bc-brick2","state":"idle","x":1536,"y":1024},{"name":"bc-brick2","state":"idle","x":1600,"y":1024},{"name":"f-sign1","state":"idle","x":64,"y":960},{"name":"hero1","state":"idle-right","x":128,"y":900,"nextState":"idle-right","velocity":0,"acceleration":0,"yVelocity":0,"yAcceleration":0},{"name":"bc-block2","state":"idle","x":960,"y":1152},{"name":"bc-block2","state":"idle","x":1216,"y":1088},{"name":"bc-block1","state":"idle","x":1472,"y":1152},{"name":"bc-brick5","state":"idle","x":1664,"y":1088},{"name":"bc-brick5","state":"idle","x":1664,"y":1152},{"name":"bc-brick5","state":"idle","x":1664,"y":1216},{"name":"bc-brick5","state":"idle","x":1728,"y":1216},{"name":"bc-brick5","state":"idle","x":1728,"y":1152},{"name":"bc-brick5","state":"idle","x":1792,"y":1152},{"name":"bc-brick5","state":"idle","x":1856,"y":1216},{"name":"bc-brick5","state":"idle","x":1856,"y":1152},{"name":"bc-brick5","state":"idle","x":1920,"y":1152},{"name":"bc-brick5","state":"idle","x":1920,"y":1216},{"name":"bc-brick5","state":"idle","x":1728,"y":1088},{"name":"bc-brick5","state":"idle","x":1792,"y":1088},{"name":"bc-brick5","state":"idle","x":1856,"y":1088},{"name":"bc-brick5","state":"idle","x":1920,"y":1088},{"name":"bc-brick5","state":"idle","x":2112,"y":1088},{"name":"bc-brick5","state":"idle","x":1984,"y":1088},{"name":"bc-brick1","state":"idle","x":1728,"y":960},{"name":"bc-brick1","state":"idle","x":1920,"y":896},{"name":"bc-brick1","state":"idle","x":2112,"y":832},{"name":"bc-brick2","state":"idle","x":1792,"y":960},{"name":"bc-brick2","state":"idle","x":1856,"y":960},{"name":"bc-brick2","state":"idle","x":1984,"y":896},{"name":"bc-brick2","state":"idle","x":2048,"y":896},{"name":"bc-brick2","state":"idle","x":2176,"y":832},{"name":"bc-brick2","state":"idle","x":2240,"y":832},{"name":"bc-brick5","state":"idle","x":1856,"y":1024},{"name":"bc-brick5","state":"idle","x":1920,"y":1024},{"name":"bc-brick5","state":"idle","x":1984,"y":1024},{"name":"bc-brick5","state":"idle","x":1920,"y":960},{"name":"bc-brick5","state":"idle","x":1984,"y":960},{"name":"bc-brick5","state":"idle","x":2048,"y":1024},{"name":"bc-brick5","state":"idle","x":2048,"y":960},{"name":"bc-brick5","state":"idle","x":1984,"y":1152},{"name":"bc-brick5","state":"idle","x":1984,"y":1216},{"name":"bc-brick5","state":"idle","x":2048,"y":1216},{"name":"bc-brick5","state":"idle","x":2048,"y":1152},{"name":"bc-brick5","state":"idle","x":2112,"y":1152},{"name":"bc-brick5","state":"idle","x":2112,"y":1216},{"name":"bc-brick5","state":"idle","x":2176,"y":1216},{"name":"bc-brick5","state":"idle","x":2176,"y":1152},{"name":"bc-brick5","state":"idle","x":2176,"y":1088},{"name":"bc-brick5","state":"idle","x":2112,"y":1024},{"name":"bc-brick5","state":"idle","x":2176,"y":1024},{"name":"bc-brick5","state":"idle","x":2176,"y":960},{"name":"bc-brick5","state":"idle","x":2112,"y":960},{"name":"bc-brick5","state":"idle","x":2112,"y":896},{"name":"bc-brick5","state":"idle","x":2176,"y":896},{"name":"bc-brick5","state":"idle","x":2240,"y":896},{"name":"bc-brick5","state":"idle","x":2240,"y":1024},{"name":"bc-brick5","state":"idle","x":2240,"y":1152},{"name":"bc-brick5","state":"idle","x":2240,"y":1088},{"name":"bc-brick5","state":"idle","x":2240,"y":1216},{"name":"bc-brick5","state":"idle","x":2304,"y":1216},{"name":"bc-brick5","state":"idle","x":2304,"y":1152},{"name":"bc-brick5","state":"idle","x":2304,"y":1088},{"name":"bc-brick5","state":"idle","x":2304,"y":1024},{"name":"bc-brick5","state":"idle","x":2304,"y":960},{"name":"bc-brick5","state":"idle","x":2304,"y":896},{"name":"bc-brick5","state":"idle","x":2368,"y":896},{"name":"bc-brick5","state":"idle","x":2368,"y":960},{"name":"bc-brick5","state":"idle","x":2368,"y":1024},{"name":"bc-brick5","state":"idle","x":2368,"y":1152},{"name":"bc-brick5","state":"idle","x":2368,"y":1216},{"name":"bc-brick5","state":"idle","x":2432,"y":1216},{"name":"bc-brick5","state":"idle","x":2432,"y":1152},{"name":"bc-brick5","state":"idle","x":2432,"y":1088},{"name":"bc-brick5","state":"idle","x":2432,"y":1024},{"name":"bc-brick5","state":"idle","x":2432,"y":896},{"name":"bc-brick5","state":"idle","x":2432,"y":960},{"name":"bc-block1","state":"idle","x":1792,"y":1024},{"name":"bc-brick5","state":"idle","x":1728,"y":1024},{"name":"bc-brick2","state":"idle","x":1664,"y":1024},{"name":"bc-block1","state":"idle","x":2240,"y":960},{"name":"bc-block2","state":"idle","x":2048,"y":1088},{"name":"bc-block2","state":"idle","x":2368,"y":1088},{"name":"bc-block2","state":"idle","x":2496,"y":896},{"name":"bc-block2","state":"idle","x":1792,"y":1216},{"name":"bc-brick5","state":"idle","x":2496,"y":960},{"name":"bc-brick5","state":"idle","x":2496,"y":1024},{"name":"bc-brick5","state":"idle","x":2496,"y":1088},{"name":"bc-brick5","state":"idle","x":2496,"y":1152},{"name":"bc-brick5","state":"idle","x":2496,"y":1216},{"name":"bc-brick5","state":"idle","x":2624,"y":1216},{"name":"bc-brick5","state":"idle","x":2560,"y":1216},{"name":"bc-brick5","state":"idle","x":2560,"y":1152},{"name":"bc-brick5","state":"idle","x":2560,"y":1088},{"name":"bc-brick5","state":"idle","x":2624,"y":1152},{"name":"bc-brick5","state":"idle","x":2624,"y":1088},{"name":"bc-brick5","state":"idle","x":2560,"y":1024},{"name":"bc-brick5","state":"idle","x":2624,"y":1024},{"name":"bc-brick5","state":"idle","x":2624,"y":960},{"name":"bc-brick5","state":"idle","x":2560,"y":960},{"name":"bc-brick5","state":"idle","x":2560,"y":896},{"name":"bc-brick5","state":"idle","x":2624,"y":896},{"name":"bc-pillar2","state":"idle","x":2560,"y":512},{"name":"bc-pillar2","state":"idle","x":2688,"y":448},{"name":"bc-pillar2","state":"idle","x":2560,"y":448},{"name":"bc-pillar1","state":"idle","x":2560,"y":384},{"name":"bc-pillar1","state":"idle","x":2688,"y":384},{"name":"bc-brick7","state":"idle","x":2560,"y":320},{"name":"bc-brick8","state":"idle","x":2624,"y":320},{"name":"bc-brick8","state":"idle","x":2688,"y":320},{"name":"bc-brick8","state":"idle","x":2816,"y":320},{"name":"bc-brick8","state":"idle","x":2752,"y":320},{"name":"bc-brick8","state":"idle","x":2880,"y":320},{"name":"bc-brick8","state":"idle","x":2944,"y":320},{"name":"bc-brick8","state":"idle","x":3008,"y":320},{"name":"bc-block2","state":"idle","x":2560,"y":256},{"name":"bc-block2","state":"idle","x":2688,"y":256},{"name":"bc-block1","state":"idle","x":2624,"y":256},{"name":"bc-block1","state":"idle","x":2752,"y":256},{"name":"bc-block1","state":"idle","x":3008,"y":256},{"name":"bc-block1","state":"idle","x":3136,"y":256},{"name":"bc-block1","state":"idle","x":3392,"y":256},{"name":"bc-brick8","state":"idle","x":3072,"y":320},{"name":"bc-brick8","state":"idle","x":3136,"y":320},{"name":"bc-brick8","state":"idle","x":3200,"y":320},{"name":"bc-brick8","state":"idle","x":3264,"y":320},{"name":"bc-brick8","state":"idle","x":3328,"y":320},{"name":"bc-block2","state":"idle","x":2816,"y":256},{"name":"bc-block2","state":"idle","x":3072,"y":256},{"name":"bc-block2","state":"idle","x":3200,"y":256},{"name":"bc-block2","state":"idle","x":3328,"y":256},{"name":"bc-block2","state":"idle","x":3264,"y":256},{"name":"bc-block2","state":"idle","x":2880,"y":256},{"name":"bc-block2","state":"idle","x":2944,"y":256},{"name":"bc-pillar2","state":"idle","x":2944,"y":768},{"name":"bc-brick5","state":"idle","x":2688,"y":896},{"name":"bc-brick5","state":"idle","x":2688,"y":960},{"name":"bc-pillar2","state":"idle","x":3072,"y":768},{"name":"bc-pillar2","state":"idle","x":3072,"y":832},{"name":"bc-pillar2","state":"idle","x":2944,"y":832},{"name":"bc-brick5","state":"idle","x":2752,"y":960},{"name":"bc-brick5","state":"idle","x":2688,"y":1024},{"name":"bc-brick5","state":"idle","x":2688,"y":1088},{"name":"bc-brick5","state":"idle","x":2688,"y":1152},{"name":"bc-brick5","state":"idle","x":2752,"y":1152},{"name":"bc-brick5","state":"idle","x":2688,"y":1216},{"name":"bc-brick5","state":"idle","x":2816,"y":1216},{"name":"bc-brick5","state":"idle","x":2752,"y":1216},{"name":"bc-brick5","state":"idle","x":2752,"y":1088},{"name":"bc-brick5","state":"idle","x":2816,"y":1088},{"name":"bc-brick5","state":"idle","x":2752,"y":1024},{"name":"bc-pillar2","state":"idle","x":2944,"y":896},{"name":"bc-pillar2","state":"idle","x":3072,"y":896},{"name":"bc-brick2","state":"idle","x":2944,"y":1024},{"name":"bc-brick2","state":"idle","x":3072,"y":1024},{"name":"bc-brick2","state":"idle","x":3008,"y":1024},{"name":"bc-brick2","state":"idle","x":3136,"y":1024},{"name":"bc-brick2","state":"idle","x":3200,"y":1024},{"name":"bc-brick2","state":"idle","x":3264,"y":1024},{"name":"bc-spikes","state":"idle","x":3008,"y":960},{"name":"bc-spikes","state":"idle","x":3136,"y":960},{"name":"bc-spikes","state":"idle","x":3200,"y":960},{"name":"bc-brick5","state":"idle","x":2880,"y":1088},{"name":"bc-brick5","state":"idle","x":2880,"y":1152},{"name":"bc-brick5","state":"idle","x":2880,"y":1216},{"name":"bc-brick5","state":"idle","x":2944,"y":1216},{"name":"bc-brick5","state":"idle","x":2944,"y":1152},{"name":"bc-brick5","state":"idle","x":2944,"y":1088},{"name":"bc-brick5","state":"idle","x":3008,"y":1152},{"name":"bc-brick5","state":"idle","x":3008,"y":1216},{"name":"bc-brick5","state":"idle","x":3072,"y":1216},{"name":"bc-brick5","state":"idle","x":3072,"y":1088},{"name":"bc-brick5","state":"idle","x":3072,"y":1152},{"name":"bc-brick5","state":"idle","x":3136,"y":1088},{"name":"bc-brick5","state":"idle","x":3136,"y":1152},{"name":"bc-brick5","state":"idle","x":3136,"y":1216},{"name":"bc-brick5","state":"idle","x":3200,"y":1216},{"name":"bc-brick5","state":"idle","x":3200,"y":1088},{"name":"bc-brick5","state":"idle","x":3200,"y":1152},{"name":"bc-brick5","state":"idle","x":3264,"y":1088},{"name":"bc-brick5","state":"idle","x":3264,"y":1152},{"name":"bc-brick5","state":"idle","x":3264,"y":1216},{"name":"bc-brick5","state":"idle","x":3328,"y":1216},{"name":"bc-brick5","state":"idle","x":3328,"y":1088},{"name":"bc-brick5","state":"idle","x":3392,"y":1088},{"name":"bc-brick5","state":"idle","x":3392,"y":1152},{"name":"bc-brick5","state":"idle","x":3392,"y":1216},{"name":"bc-brick5","state":"idle","x":3456,"y":1216},{"name":"bc-brick5","state":"idle","x":3456,"y":1152},{"name":"bc-brick5","state":"idle","x":3456,"y":1088},{"name":"bc-brick2","state":"idle","x":3328,"y":1024},{"name":"bc-brick2","state":"idle","x":3392,"y":1024},{"name":"bc-brick2","state":"idle","x":3456,"y":1024},{"name":"bc-pillar2","state":"idle","x":3264,"y":768},{"name":"bc-pillar2","state":"idle","x":3264,"y":832},{"name":"bc-pillar2","state":"idle","x":3264,"y":896},{"name":"bc-pillar3","state":"idle","x":3264,"y":960},{"name":"bc-pillar3","state":"idle","x":3072,"y":960},{"name":"bc-pillar3","state":"idle","x":2944,"y":960},{"name":"bc-pillar3","state":"idle","x":3392,"y":960},{"name":"bc-spikes","state":"idle","x":3328,"y":960},{"name":"bc-pillar2","state":"idle","x":3392,"y":896},{"name":"bc-pillar2","state":"idle","x":3392,"y":832},{"name":"bc-pillar2","state":"idle","x":3392,"y":768},{"name":"bc-pillar1","state":"idle","x":2944,"y":384},{"name":"bc-pillar2","state":"idle","x":2944,"y":448},{"name":"bc-pillar2","state":"idle","x":3072,"y":448},{"name":"bc-pillar2","state":"idle","x":3264,"y":448},{"name":"bc-pillar2","state":"idle","x":3392,"y":448},{"name":"bc-pillar1","state":"idle","x":3072,"y":384},{"name":"bc-pillar1","state":"idle","x":3264,"y":384},{"name":"bc-pillar1","state":"idle","x":3392,"y":384},{"name":"bc-brick9","state":"idle","x":3392,"y":320},{"name":"bc-pillar2","state":"idle","x":3712,"y":768},{"name":"bc-pillar2","state":"idle","x":3712,"y":832},{"name":"bc-pillar2","state":"idle","x":3712,"y":896},{"name":"bc-pillar3","state":"idle","x":3712,"y":960},{"name":"bc-brick2","state":"idle","x":3520,"y":1024},{"name":"bc-brick2","state":"idle","x":3584,"y":1024},{"name":"bc-brick2","state":"idle","x":3712,"y":1024},{"name":"bc-brick2","state":"idle","x":3648,"y":1024},{"name":"bc-spikes","state":"idle","x":3456,"y":960},{"name":"bc-spikes","state":"idle","x":3520,"y":960},{"name":"bc-spikes","state":"idle","x":3648,"y":960},{"name":"bc-brick5","state":"idle","x":3520,"y":1088},{"name":"bc-brick5","state":"idle","x":3520,"y":1216},{"name":"bc-brick5","state":"idle","x":3520,"y":1152},{"name":"bc-brick5","state":"idle","x":3584,"y":1152},{"name":"bc-brick5","state":"idle","x":3584,"y":1216},{"name":"bc-brick5","state":"idle","x":3648,"y":1216},{"name":"bc-brick5","state":"idle","x":3648,"y":1088},{"name":"bc-brick5","state":"idle","x":3712,"y":1088},{"name":"bc-brick5","state":"idle","x":3648,"y":1152},{"name":"bc-brick5","state":"idle","x":3712,"y":1216},{"name":"bc-brick5","state":"idle","x":3712,"y":1152},{"name":"bc-brick5","state":"idle","x":3776,"y":1088},{"name":"bc-brick5","state":"idle","x":3840,"y":1088},{"name":"bc-brick5","state":"idle","x":3776,"y":1152},{"name":"bc-brick5","state":"idle","x":3840,"y":1216},{"name":"bc-brick5","state":"idle","x":3776,"y":1216},{"name":"bc-brick2","state":"idle","x":3776,"y":1024},{"name":"bc-pillar1","state":"idle","x":3712,"y":384},{"name":"bc-pillar1","state":"idle","x":3840,"y":384},{"name":"bc-pillar2","state":"idle","x":3712,"y":448},{"name":"bc-pillar2","state":"idle","x":3840,"y":448},{"name":"bc-pillar3","state":"idle","x":3840,"y":960},{"name":"bc-pillar2","state":"idle","x":3840,"y":896},{"name":"bc-pillar2","state":"idle","x":3840,"y":832},{"name":"bc-pillar2","state":"idle","x":3840,"y":768},{"name":"bc-brick7","state":"idle","x":3712,"y":320},{"name":"bc-brick8","state":"idle","x":3776,"y":320},{"name":"bc-brick8","state":"idle","x":3840,"y":320},{"name":"bc-brick8","state":"idle","x":3904,"y":320},{"name":"bc-brick8","state":"idle","x":3968,"y":320},{"name":"bc-brick8","state":"idle","x":4032,"y":320},{"name":"bc-brick8","state":"idle","x":4096,"y":320},{"name":"bc-brick8","state":"idle","x":4160,"y":320},{"name":"bc-brick8","state":"idle","x":4224,"y":320},{"name":"bc-brick8","state":"idle","x":4288,"y":320},{"name":"bc-brick8","state":"idle","x":4352,"y":320},{"name":"bc-brick8","state":"idle","x":4416,"y":320},{"name":"bc-brick8","state":"idle","x":4544,"y":320},{"name":"bc-brick8","state":"idle","x":4480,"y":320},{"name":"bc-block1","state":"idle","x":3712,"y":256},{"name":"bc-block1","state":"idle","x":3840,"y":256},{"name":"bc-block1","state":"idle","x":3968,"y":256},{"name":"bc-block1","state":"idle","x":4096,"y":256},{"name":"bc-block1","state":"idle","x":4224,"y":256},{"name":"bc-block1","state":"idle","x":4352,"y":256},{"name":"bc-block1","state":"idle","x":4480,"y":256},{"name":"bc-block2","state":"idle","x":4544,"y":256},{"name":"bc-block2","state":"idle","x":4416,"y":256},{"name":"bc-block2","state":"idle","x":4288,"y":256},{"name":"bc-block2","state":"idle","x":4160,"y":256},{"name":"bc-block2","state":"idle","x":4032,"y":256},{"name":"bc-block2","state":"idle","x":3904,"y":256},{"name":"bc-block2","state":"idle","x":3776,"y":256},{"name":"bc-spikes","state":"idle","x":3776,"y":960},{"name":"bc-brick5","state":"idle","x":3904,"y":1088},{"name":"bc-brick5","state":"idle","x":3968,"y":1088},{"name":"bc-brick5","state":"idle","x":3904,"y":1152},{"name":"bc-brick5","state":"idle","x":3904,"y":1216},{"name":"bc-brick5","state":"idle","x":3968,"y":1216},{"name":"bc-brick5","state":"idle","x":3968,"y":1152},{"name":"bc-brick5","state":"idle","x":4032,"y":1152},{"name":"bc-brick5","state":"idle","x":4032,"y":1216},{"name":"bc-brick5","state":"idle","x":4096,"y":1216},{"name":"bc-brick5","state":"idle","x":4096,"y":1152},{"name":"bc-brick5","state":"idle","x":4160,"y":1152},{"name":"bc-brick5","state":"idle","x":4160,"y":1216},{"name":"bc-brick5","state":"idle","x":4224,"y":1216},{"name":"bc-brick5","state":"idle","x":4224,"y":1152},{"name":"bc-brick5","state":"idle","x":4288,"y":1152},{"name":"bc-brick5","state":"idle","x":4288,"y":1216},{"name":"bc-brick5","state":"idle","x":4352,"y":1216},{"name":"bc-brick5","state":"idle","x":4352,"y":1152},{"name":"bc-brick5","state":"idle","x":4352,"y":1088},{"name":"bc-brick5","state":"idle","x":4160,"y":1088},{"name":"bc-brick5","state":"idle","x":4096,"y":1088},{"name":"bc-brick5","state":"idle","x":4224,"y":1088},{"name":"bc-brick2","state":"idle","x":3840,"y":1024},{"name":"bc-brick2","state":"idle","x":3904,"y":1024},{"name":"bc-brick2","state":"idle","x":3968,"y":1024},{"name":"bc-brick2","state":"idle","x":4032,"y":1024},{"name":"bc-brick2","state":"idle","x":4096,"y":1024},{"name":"bc-brick2","state":"idle","x":4224,"y":1024},{"name":"bc-brick2","state":"idle","x":4160,"y":1024},{"name":"bc-brick2","state":"idle","x":4288,"y":1024},{"name":"bc-brick2","state":"idle","x":4352,"y":1024},{"name":"bc-spikes","state":"idle","x":3904,"y":960},{"name":"bc-spikes","state":"idle","x":3968,"y":960},{"name":"bc-spikes","state":"idle","x":4096,"y":960},{"name":"bc-spikes","state":"idle","x":4160,"y":960},{"name":"bc-spikes","state":"idle","x":4288,"y":960},{"name":"bc-spikes","state":"idle","x":4352,"y":960},{"name":"bc-brick2","state":"idle","x":4416,"y":1024},{"name":"bc-brick2","state":"idle","x":4480,"y":1024},{"name":"bc-brick2","state":"idle","x":4544,"y":1024},{"name":"bc-brick4","state":"idle","x":4608,"y":960},{"name":"bc-brick4","state":"idle","x":4608,"y":896},{"name":"bc-brick4","state":"idle","x":4608,"y":832},{"name":"bc-brick4","state":"idle","x":4608,"y":768},{"name":"bc-brick1","state":"idle","x":4608,"y":704},{"name":"bc-brick2","state":"idle","x":4672,"y":704},{"name":"bc-brick2","state":"idle","x":4736,"y":704},{"name":"bc-pillar1","state":"idle","x":4672,"y":384},{"name":"bc-pillar2","state":"idle","x":4672,"y":448},{"name":"bc-pillar2","state":"idle","x":4672,"y":512},{"name":"bc-pillar2","state":"idle","x":4672,"y":576},{"name":"bc-pillar3","state":"idle","x":4672,"y":640},{"name":"bc-pillar1","state":"idle","x":4800,"y":384},{"name":"bc-pillar2","state":"idle","x":4800,"y":448},{"name":"bc-pillar2","state":"idle","x":4800,"y":512},{"name":"bc-pillar2","state":"idle","x":4800,"y":576},{"name":"bc-pillar3","state":"idle","x":4800,"y":640},{"name":"bc-brick8","state":"idle","x":4608,"y":320},{"name":"bc-brick8","state":"idle","x":4672,"y":320},{"name":"bc-brick8","state":"idle","x":4736,"y":320},{"name":"bc-brick9","state":"idle","x":4800,"y":320},{"name":"bc-block1","state":"idle","x":4672,"y":256},{"name":"bc-block1","state":"idle","x":4800,"y":256},{"name":"bc-block2","state":"idle","x":4736,"y":256},{"name":"bc-block2","state":"idle","x":4608,"y":256},{"name":"bc-brick5","state":"idle","x":4416,"y":1088},{"name":"bc-brick5","state":"idle","x":4608,"y":1024},{"name":"bc-brick5","state":"idle","x":4544,"y":1088},{"name":"bc-brick5","state":"idle","x":4480,"y":1088},{"name":"bc-brick5","state":"idle","x":4416,"y":1152},{"name":"bc-brick5","state":"idle","x":4416,"y":1216},{"name":"bc-brick5","state":"idle","x":4544,"y":1216},{"name":"bc-brick5","state":"idle","x":4480,"y":1216},{"name":"bc-brick5","state":"idle","x":4608,"y":1216},{"name":"bc-brick5","state":"idle","x":4544,"y":1152},{"name":"bc-brick5","state":"idle","x":4608,"y":1088},{"name":"bc-brick5","state":"idle","x":4608,"y":1152},{"name":"bc-brick5","state":"idle","x":4672,"y":1216},{"name":"bc-brick5","state":"idle","x":4672,"y":1152},{"name":"bc-brick5","state":"idle","x":4672,"y":1088},{"name":"bc-brick5","state":"idle","x":4672,"y":1024},{"name":"bc-brick5","state":"idle","x":4672,"y":960},{"name":"bc-brick5","state":"idle","x":4672,"y":896},{"name":"bc-brick5","state":"idle","x":4672,"y":832},{"name":"bc-brick5","state":"idle","x":4736,"y":768},{"name":"bc-brick5","state":"idle","x":4800,"y":768},{"name":"bc-brick5","state":"idle","x":4800,"y":832},{"name":"bc-brick5","state":"idle","x":4736,"y":832},{"name":"bc-brick5","state":"idle","x":4736,"y":896},{"name":"bc-brick5","state":"idle","x":4800,"y":896},{"name":"bc-brick5","state":"idle","x":4800,"y":960},{"name":"bc-brick5","state":"idle","x":4736,"y":960},{"name":"bc-brick5","state":"idle","x":4736,"y":1024},{"name":"bc-brick5","state":"idle","x":4800,"y":1024},{"name":"bc-brick5","state":"idle","x":4800,"y":1088},{"name":"bc-brick5","state":"idle","x":4736,"y":1088},{"name":"bc-brick5","state":"idle","x":4800,"y":1152},{"name":"bc-brick5","state":"idle","x":4800,"y":1216},{"name":"bc-brick5","state":"idle","x":4736,"y":1216},{"name":"bc-brick3","state":"idle","x":4800,"y":704},{"name":"bc-brick3","state":"idle","x":4864,"y":768},{"name":"bc-brick3","state":"idle","x":4928,"y":832},{"name":"bc-brick3","state":"idle","x":4992,"y":896},{"name":"bc-brick3","state":"idle","x":5056,"y":960},{"name":"bc-brick5","state":"idle","x":4864,"y":832},{"name":"bc-brick5","state":"idle","x":4864,"y":896},{"name":"bc-brick5","state":"idle","x":4928,"y":896},{"name":"bc-brick5","state":"idle","x":4928,"y":960},{"name":"bc-brick5","state":"idle","x":4992,"y":960},{"name":"bc-brick5","state":"idle","x":4992,"y":1024},{"name":"bc-brick5","state":"idle","x":4928,"y":1024},{"name":"bc-brick5","state":"idle","x":4864,"y":1024},{"name":"bc-brick5","state":"idle","x":4864,"y":1088},{"name":"bc-brick5","state":"idle","x":4864,"y":1152},{"name":"bc-brick5","state":"idle","x":4864,"y":1216},{"name":"bc-brick5","state":"idle","x":4928,"y":1216},{"name":"bc-brick5","state":"idle","x":4928,"y":1088},{"name":"bc-brick5","state":"idle","x":4928,"y":1152},{"name":"bc-brick5","state":"idle","x":4992,"y":1088},{"name":"bc-brick5","state":"idle","x":4992,"y":1152},{"name":"bc-brick5","state":"idle","x":4992,"y":1216},{"name":"bc-brick5","state":"idle","x":5056,"y":1152},{"name":"bc-brick5","state":"idle","x":5056,"y":1088},{"name":"bc-brick5","state":"idle","x":5056,"y":1024},{"name":"bc-brick5","state":"idle","x":5056,"y":1216},{"name":"bc-brick5","state":"idle","x":5120,"y":1216},{"name":"bc-brick5","state":"idle","x":5120,"y":1152},{"name":"bc-brick5","state":"idle","x":5120,"y":1088},{"name":"bc-brick2","state":"idle","x":5120,"y":1024},{"name":"bc-brick2","state":"idle","x":5184,"y":1024},{"name":"bc-brick2","state":"idle","x":5248,"y":1024},{"name":"bc-brick2","state":"idle","x":5312,"y":1024},{"name":"bc-brick2","state":"idle","x":5376,"y":1024},{"name":"bc-brick2","state":"idle","x":5440,"y":1024},{"name":"bc-brick2","state":"idle","x":5504,"y":1024},{"name":"bc-brick2","state":"idle","x":5568,"y":1024},{"name":"bc-brick2","state":"idle","x":5632,"y":1024},{"name":"bc-brick2","state":"idle","x":5696,"y":1024},{"name":"bc-brick5","state":"idle","x":5184,"y":1088},{"name":"bc-brick5","state":"idle","x":5184,"y":1216},{"name":"bc-brick5","state":"idle","x":5248,"y":1216},{"name":"bc-brick5","state":"idle","x":5248,"y":1088},{"name":"bc-brick5","state":"idle","x":5248,"y":1152},{"name":"bc-brick5","state":"idle","x":5312,"y":1216},{"name":"bc-brick5","state":"idle","x":5312,"y":1152},{"name":"bc-brick5","state":"idle","x":5312,"y":1088},{"name":"bc-brick5","state":"idle","x":5376,"y":1088},{"name":"bc-brick5","state":"idle","x":5376,"y":1152},{"name":"bc-brick5","state":"idle","x":5376,"y":1216},{"name":"bc-brick5","state":"idle","x":5440,"y":1216},{"name":"bc-brick5","state":"idle","x":5440,"y":1152},{"name":"bc-brick5","state":"idle","x":5504,"y":1088},{"name":"bc-brick5","state":"idle","x":5504,"y":1152},{"name":"bc-brick5","state":"idle","x":5504,"y":1216},{"name":"bc-brick5","state":"idle","x":5568,"y":1216},{"name":"bc-brick5","state":"idle","x":5568,"y":1152},{"name":"bc-brick5","state":"idle","x":5568,"y":1088},{"name":"bc-brick5","state":"idle","x":5632,"y":1088},{"name":"bc-brick5","state":"idle","x":5632,"y":1152},{"name":"bc-brick5","state":"idle","x":5632,"y":1216},{"name":"bc-brick5","state":"idle","x":5696,"y":1216},{"name":"bc-brick5","state":"idle","x":5696,"y":1088},{"name":"bc-spikes","state":"idle","x":4480,"y":960},{"name":"bc-spikes","state":"idle","x":4544,"y":960},{"name":"f-sign2","state":"idle","x":5568,"y":960},{"name":"bc-brick7","state":"idle","x":2944,"y":640},{"name":"bc-brick8","state":"idle","x":3008,"y":640},{"name":"bc-brick9","state":"idle","x":3072,"y":640},{"name":"bc-brick7","state":"idle","x":3264,"y":640},{"name":"bc-brick8","state":"idle","x":3328,"y":640},{"name":"bc-brick8","state":"idle","x":3392,"y":640},{"name":"bc-brick8","state":"idle","x":3456,"y":640},{"name":"bc-brick8","state":"idle","x":3520,"y":640},{"name":"bc-brick8","state":"idle","x":3584,"y":640},{"name":"bc-brick8","state":"idle","x":3648,"y":640},{"name":"bc-brick8","state":"idle","x":3712,"y":640},{"name":"bc-brick8","state":"idle","x":3776,"y":640},{"name":"bc-brick9","state":"idle","x":3840,"y":640},{"name":"bc-pillar2","state":"idle","x":3840,"y":512},{"name":"bc-pillar2","state":"idle","x":3712,"y":512},{"name":"bc-pillar2","state":"idle","x":3392,"y":512},{"name":"bc-pillar2","state":"idle","x":3264,"y":512},{"name":"bc-pillar2","state":"idle","x":3072,"y":512},{"name":"bc-pillar2","state":"idle","x":2944,"y":512},{"name":"bc-pillar3","state":"idle","x":2944,"y":576},{"name":"bc-pillar3","state":"idle","x":3072,"y":576},{"name":"bc-pillar3","state":"idle","x":3264,"y":576},{"name":"bc-pillar3","state":"idle","x":3392,"y":576},{"name":"bc-pillar3","state":"idle","x":3712,"y":576},{"name":"bc-pillar3","state":"idle","x":3840,"y":576},{"name":"bc-pillar1","state":"idle","x":2944,"y":704},{"name":"bc-pillar1","state":"idle","x":3072,"y":704},{"name":"bc-pillar1","state":"idle","x":3264,"y":704},{"name":"bc-pillar1","state":"idle","x":3392,"y":704},{"name":"bc-pillar1","state":"idle","x":3712,"y":704},{"name":"bc-pillar1","state":"idle","x":3840,"y":704},{"name":"bc-pillar-solid2","state":"idle","x":4416,"y":896},{"name":"bc-pillar-solid2","state":"idle","x":4224,"y":896},{"name":"bc-pillar-solid3","state":"idle","x":4032,"y":960},{"name":"bc-pillar-solid3","state":"idle","x":4224,"y":960},{"name":"bc-pillar-solid3","state":"idle","x":4416,"y":960},{"name":"bc-pillar-solid1","state":"idle","x":4416,"y":832},{"name":"bc-pillar-solid1","state":"idle","x":4224,"y":768},{"name":"bc-pillar-solid1","state":"idle","x":4032,"y":704},{"name":"bc-pillar-solid2","state":"idle","x":4032,"y":768},{"name":"bc-pillar-solid2","state":"idle","x":4032,"y":832},{"name":"bc-pillar-solid2","state":"idle","x":4032,"y":896},{"name":"bc-pillar-solid2","state":"idle","x":4224,"y":832},{"name":"a-coin-bag","state":"idle","x":4032,"y":656},{"name":"a-coin-bag","state":"idle","x":4224,"y":720},{"name":"a-coin-bag","state":"idle","x":4416,"y":784},{"name":"spider","state":"walk-left","x":4736,"y":640},{"name":"bat","state":"fly-left","x":5056,"y":-64},{"name":"bat","state":"fly-left","x":4736,"y":320},{"name":"bat","state":"fly-left","x":1152,"y":256},{"name":"bat","state":"fly-left","x":5696,"y":512},{"name":"bat","state":"fly-left","x":3584,"y":704},{"name":"bc-spikes","state":"idle","x":3584,"y":960},{"name":"bc-block1","state":"idle","x":4672,"y":768},{"name":"bc-block1","state":"idle","x":4864,"y":960},{"name":"bc-block1","state":"idle","x":4480,"y":1152},{"name":"bc-block1","state":"idle","x":5184,"y":1152},{"name":"bc-block2","state":"idle","x":4736,"y":1152},{"name":"bc-block2","state":"idle","x":5440,"y":1088},{"name":"bc-block2","state":"idle","x":5696,"y":1152},{"name":"bc-block2","state":"idle","x":4288,"y":1088},{"name":"bc-block2","state":"idle","x":3840,"y":1152},{"name":"bc-block2","state":"idle","x":3584,"y":1088},{"name":"bc-block1","state":"idle","x":4032,"y":1088},{"name":"bc-block1","state":"idle","x":3328,"y":1152},{"name":"bc-block1","state":"idle","x":3008,"y":1088},{"name":"bc-block2","state":"idle","x":2816,"y":1152},{"name":"bc-brick2","state":"idle","x":2496,"y":832},{"name":"bc-brick2","state":"idle","x":2560,"y":832},{"name":"bc-brick2","state":"idle","x":2624,"y":832},{"name":"bc-brick2","state":"idle","x":2688,"y":832},{"name":"bc-brick3","state":"idle","x":2752,"y":832},{"name":"bc-brick5","state":"idle","x":2816,"y":1024},{"name":"bc-brick3","state":"idle","x":2880,"y":960},{"name":"bc-brick2","state":"idle","x":2816,"y":960},{"name":"bc-brick6","state":"idle","x":2752,"y":896},{"name":"bc-brick5","state":"idle","x":2880,"y":1024},{"name":"bc-brick2","state":"idle","x":2304,"y":832},{"name":"bc-brick2","state":"idle","x":2368,"y":832},{"name":"bc-brick2","state":"idle","x":2432,"y":832},{"name":"spider","state":"walk-left","x":2432,"y":768},{"name":"bc-pillar3","state":"idle","x":2688,"y":768},{"name":"bc-pillar3","state":"idle","x":2560,"y":768},{"name":"bc-pillar2","state":"idle","x":2688,"y":576},{"name":"bc-pillar2","state":"idle","x":2688,"y":640},{"name":"bc-pillar2","state":"idle","x":2688,"y":704},{"name":"bc-pillar2","state":"idle","x":2688,"y":512},{"name":"bc-pillar2","state":"idle","x":2560,"y":576},{"name":"bc-pillar2","state":"idle","x":2560,"y":640},{"name":"bc-pillar2","state":"idle","x":2560,"y":704},{"name":"bc-pillar3","state":"idle","x":1088,"y":960},{"name":"bc-pillar3","state":"idle","x":832,"y":960},{"name":"a-block-coin","state":"idle","x":1280,"y":960},{"name":"a-vase-coin","state":"idle","x":896,"y":704},{"name":"a-vase-death","state":"idle","x":1024,"y":704},{"name":"a-vase-spider","state":"idle","x":2368,"y":768},{"name":"a-block-coin","state":"idle","x":3520,"y":576},{"name":"a-block","state":"idle","x":3520,"y":512},{"name":"a-vase-coin-bag","state":"idle","x":2880,"y":896},{"name":"a-vase","state":"idle","x":1856,"y":896},{"name":"a-vase-coin","state":"idle","x":2048,"y":832},{"name":"a-vase-death","state":"idle","x":3136,"y":192},{"name":"a-vase-coin","state":"idle","x":2752,"y":192},{"name":"a-coin","state":"idle","x":2560,"y":208},{"name":"a-coin","state":"idle","x":2624,"y":208},{"name":"a-vase-coin","state":"idle","x":3968,"y":192},{"name":"a-vase-spider","state":"idle","x":4160,"y":192},{"name":"a-vase-spider","state":"idle","x":4352,"y":192},{"name":"a-coin","state":"idle","x":4736,"y":208},{"name":"a-coin","state":"idle","x":4800,"y":208},{"name":"a-coin","state":"idle","x":4672,"y":208},{"name":"a-coin","state":"idle","x":4608,"y":208},{"name":"a-coin","state":"idle","x":4544,"y":208},{"name":"a-vase","state":"idle","x":5376,"y":960},{"name":"a-vase","state":"idle","x":5440,"y":960},{"name":"a-vase-coin","state":"idle","x":5376,"y":910},{"name":"bc-block2","state":"idle","x":3584,"y":576},{"name":"bc-block2","state":"idle","x":3584,"y":512},{"name":"bc-block2","state":"idle","x":3584,"y":448},{"name":"a-block-coin","state":"idle","x":3456,"y":576},{"name":"a-coin","state":"idle","x":3264,"y":208},{"name":"a-coin","state":"idle","x":3328,"y":208},{"name":"a-coin","state":"idle","x":3392,"y":208},{"name":"a-coin","state":"idle","x":3712,"y":208},{"name":"a-coin","state":"idle","x":3776,"y":208},{"name":"a-coin","state":"idle","x":3840,"y":208},{"name":"a-vase-health","state":"idle","x":2944,"y":192}];
	window._levels.push({"tileWidth":64,"tileHeight":64,"width":90,"height":20,"backgroundImage":"#backgrounds","backgroundImageY":300,"backgroundImageWidth":1024,"backgroundImageHeight":300,"backgroundImageStretch":false,"puzzle":false,"level":3,"name":"Agora","x":0,"y":-580,"viewportTop":0,"viewportRight":0,"viewportLeft":0,"backgroundColor":"#0C1B2E","sprites":sprites,"state":"pause","viewportBottom":0,"time":0});
}).call(this);