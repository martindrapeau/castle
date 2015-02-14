(function() {
	Backbone.levels || (Backbone.levels = []);
	Backbone.levels.push({"level":1,"time":0,"name":"Village","tileWidth":64,"tileHeight":64,"width":60,"height":20,"backgroundImage":"#background","x":0,"y":-580,"viewportTop":0,"viewportRight":0,"viewportLeft":0,"backgroundColor":"rgba(2, 10, 23, 1)","sprites":[{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":0,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":64,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":128,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":192,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":256,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":320,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":384,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":448,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":512,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":576,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":640,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":704,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":768,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":832,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":896,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":960,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":1024,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":1088,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":1152,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":1216,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":1280,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":1344,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":1408,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":1472,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":1536,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":1600,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":1664,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":1728,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":1792,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":1856,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":1920,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":1984,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":2048,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":2112,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":2176,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":2240,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":2304,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":2368,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":2432,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":2496,"y":1088},{"name":"bc-brick4","state":"idle","sequenceIndex":0,"x":2560,"y":1024},{"name":"bc-brick4","state":"idle","sequenceIndex":0,"x":2560,"y":960},{"name":"bc-brick1","state":"idle","sequenceIndex":0,"x":2560,"y":896},{"name":"bc-brick2","state":"idle","sequenceIndex":0,"x":2624,"y":896},{"name":"bc-brick3","state":"idle","sequenceIndex":0,"x":2688,"y":896},{"name":"bc-brick6","state":"idle","sequenceIndex":0,"x":2688,"y":960},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":2624,"y":960},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":2624,"y":1024},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":2624,"y":1088},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":2752,"y":1024},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":2816,"y":1024},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":2880,"y":1024},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":2944,"y":1024},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":3008,"y":1024},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":3072,"y":1024},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":3136,"y":1024},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":3200,"y":1024},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3200,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3136,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3072,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3008,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2944,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2880,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2816,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2752,"y":1088},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":3328,"y":1024},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":3328,"y":1088},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":3392,"y":1088},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":3392,"y":1024},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":3456,"y":1024},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":3456,"y":1088},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":3520,"y":1088},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":3520,"y":1024},{"name":"f-fence2","state":"idle","sequenceIndex":0,"x":2176,"y":1024},{"name":"f-fence2","state":"idle","sequenceIndex":0,"x":2112,"y":1024},{"name":"f-stump1","state":"idle","sequenceIndex":0,"x":1728,"y":1024},{"name":"f-stump2","state":"idle","sequenceIndex":0,"x":1792,"y":1024},{"name":"f-fence1","state":"idle","sequenceIndex":0,"x":2048,"y":1024},{"name":"f-fence1","state":"idle","sequenceIndex":0,"x":1984,"y":1024},{"name":"h-2","state":"idle","sequenceIndex":0,"x":512,"y":704},{"name":"h-3","state":"idle","sequenceIndex":0,"x":1024,"y":704},{"name":"f-bush1","state":"idle","sequenceIndex":0,"x":1472,"y":1024},{"name":"f-bush2","state":"idle","sequenceIndex":0,"x":1536,"y":1024},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":3648,"y":1024},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":3712,"y":1024},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":3776,"y":1024},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3648,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3712,"y":1088},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3776,"y":1088},{"name":"h-wall","state":"idle","sequenceIndex":0,"x":3264,"y":832},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":3584,"y":1024},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3584,"y":1088},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":3264,"y":1024},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":3264,"y":1088},{"name":"bc-brick4","state":"idle","sequenceIndex":0,"x":3264,"y":768},{"name":"bc-brick4","state":"idle","sequenceIndex":0,"x":3264,"y":640},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":3328,"y":768},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":3328,"y":704},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":3328,"y":640},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":3392,"y":704},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":3392,"y":768},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":3456,"y":768},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":3456,"y":704},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":3456,"y":640},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":3392,"y":640},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":3328,"y":576},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":3392,"y":576},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":3456,"y":576},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":3456,"y":512},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":3392,"y":512},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":3328,"y":512},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":3328,"y":448},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":3392,"y":448},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":3456,"y":448},{"name":"bc-brick4","state":"idle","sequenceIndex":0,"x":3264,"y":576},{"name":"bc-brick4","state":"idle","sequenceIndex":0,"x":3264,"y":512},{"name":"bc-brick4","state":"idle","sequenceIndex":0,"x":3264,"y":448},{"name":"bc-brick1","state":"idle","sequenceIndex":0,"x":3264,"y":384},{"name":"bc-brick2","state":"idle","sequenceIndex":0,"x":3328,"y":384},{"name":"bc-brick2","state":"idle","sequenceIndex":0,"x":3392,"y":384},{"name":"bc-brick3","state":"idle","sequenceIndex":0,"x":3520,"y":384},{"name":"bc-brick2","state":"idle","sequenceIndex":0,"x":3456,"y":384},{"name":"bc-brick6","state":"idle","sequenceIndex":0,"x":3520,"y":448},{"name":"bc-brick6","state":"idle","sequenceIndex":0,"x":3520,"y":512},{"name":"bc-brick6","state":"idle","sequenceIndex":0,"x":3520,"y":576},{"name":"bc-brick6","state":"idle","sequenceIndex":0,"x":3520,"y":640},{"name":"bc-brick6","state":"idle","sequenceIndex":0,"x":3520,"y":704},{"name":"bc-brick6","state":"idle","sequenceIndex":0,"x":3520,"y":768},{"name":"f-sign2","state":"idle","sequenceIndex":0,"x":3712,"y":960},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":0,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":64,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":128,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":256,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":192,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":320,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":384,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":448,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":512,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":576,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":640,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":704,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":768,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":832,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":896,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":960,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1024,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1088,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1152,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1216,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1280,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1344,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1408,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1600,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1664,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1856,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1920,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2240,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2304,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2368,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2432,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2496,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2752,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2752,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2816,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2816,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2880,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2880,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2944,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2944,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3008,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3008,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3072,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3072,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3136,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3136,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3200,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3200,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3584,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3584,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3648,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3648,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3712,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3712,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3776,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":3776,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2496,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2368,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2304,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2240,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2176,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2432,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1984,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2048,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2112,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2176,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2112,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":2048,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1984,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1920,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1856,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1792,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1728,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1728,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1792,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1664,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1600,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1472,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1536,"y":1152},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1536,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1472,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1408,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1344,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1280,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1216,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1152,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1088,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":1024,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":960,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":832,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":896,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":768,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":704,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":640,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":576,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":512,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":448,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":384,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":320,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":256,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":192,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":128,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":64,"y":1216},{"name":"f-ground2","state":"idle","sequenceIndex":0,"x":0,"y":1216},{"name":"a-crate-coin","state":"idle","sequenceIndex":0,"x":448,"y":1024},{"name":"a-hay","state":"idle","sequenceIndex":0,"x":2496,"y":1024},{"name":"a-hay","state":"idle","sequenceIndex":0,"x":2496,"y":960},{"name":"a-hay","state":"idle","sequenceIndex":0,"x":2432,"y":1024},{"name":"a-crate-coin","state":"idle","sequenceIndex":0,"x":3200,"y":960},{"name":"a-crate-coin","state":"idle","sequenceIndex":0,"x":3200,"y":896},{"name":"a-crate","state":"idle","sequenceIndex":0,"x":3136,"y":960},{"name":"a-crate","state":"idle","sequenceIndex":0,"x":3200,"y":832},{"name":"a-crate","state":"idle","sequenceIndex":0,"x":3136,"y":896},{"name":"hero1","state":"idle-right","sequenceIndex":0,"x":192,"y":964,"nextState":"idle-right","velocity":0,"acceleration":0,"yVelocity":0,"yAcceleration":0},{"name":"h-1","state":"idle","sequenceIndex":0,"x":0,"y":704},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":2560,"y":1152},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":2624,"y":1152},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":2688,"y":1152},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":2688,"y":1216},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":2624,"y":1216},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":2560,"y":1216},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":2688,"y":1088},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":2688,"y":1024},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":2560,"y":1088},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":3264,"y":1152},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":3264,"y":1216},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":3328,"y":1216},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":3328,"y":1152},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":3392,"y":1152},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":3392,"y":1216},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":3456,"y":1216},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":3456,"y":1152},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":3520,"y":1152},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":3520,"y":1216},{"name":"bc-brick4","state":"idle","sequenceIndex":0,"x":3264,"y":704}],"state":"pause","viewportBottom":0});
}).call(this);